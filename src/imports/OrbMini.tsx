import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uExcite;

  varying vec2 vUv;

  vec3 permute3(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

  float snoise2d(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute3(permute3(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy / uResolution) * 2.0 - 1.0;
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;

    float t = uTime;
    float dist = length(uv);
    float angle = atan(uv.y, uv.x);

    float baseRadius = 0.15;
    float ampMul = 1.0 + uExcite * 1.0;
    float d = 0.0;

    float spd1 = 0.60 + 0.15 * snoise2d(vec2(t * 0.008, 20.0));
    float amp1 = (0.011 + 0.008 * snoise2d(vec2(t * 0.03, 0.0))) * ampMul;
    d += amp1 * sin(1.0 * angle - t * spd1);

    float spd2 = 0.50 + 0.12 * snoise2d(vec2(t * 0.01, 23.0));
    float amp2 = (0.009 + 0.006 * snoise2d(vec2(t * 0.04, 3.0))) * ampMul;
    d += amp2 * sin(2.0 * angle + t * spd2 + 2.0);

    float spd3 = 0.85 + 0.18 * snoise2d(vec2(t * 0.012, 26.0));
    float amp3 = (0.006 + 0.004 * snoise2d(vec2(t * 0.05, 6.0))) * ampMul;
    d += amp3 * sin(3.0 * angle - t * spd3 + 1.2);

    float spd4 = 0.75 + 0.15 * snoise2d(vec2(t * 0.01, 29.0));
    float amp4 = (0.005 + 0.003 * snoise2d(vec2(t * 0.06, 9.0))) * ampMul;
    d += amp4 * sin(4.0 * angle + t * spd4 + 4.5);

    float spd5 = 0.95 + 0.12 * snoise2d(vec2(t * 0.015, 32.0));
    d += 0.003 * ampMul * sin(5.0 * angle - t * spd5 + 0.8);

    float spd6 = 1.05 + 0.10 * snoise2d(vec2(t * 0.015, 35.0));
    d += 0.0025 * ampMul * sin(6.0 * angle + t * spd6 + 3.3);

    float rawD = d;
    float k = 200.0;
    d = log(1.0 + exp(k * d)) / k;
    float rimRadius = baseRadius + d;
    float height = d;

    float sd = dist - rimRadius;

    float baseThick = 0.008;
    float thickMul = clamp(1.0 + rawD * 40.0, 0.45, 2.5);
    float thick = baseThick * thickMul + height * 0.25;
    float t2 = thick * thick + 0.000001;

    float core  = exp(-sd * sd / (t2 * 0.6));
    float mid   = exp(-sd * sd / (t2 * 3.0));
    float outer = exp(-sd * sd / (t2 * 12.0));
    float haze  = exp(-sd * sd / (t2 * 40.0));

    float interiorCut = smoothstep(baseRadius - 0.04, baseRadius - 0.003, dist);
    mid   *= mix(1.0, interiorCut, 0.5);
    outer *= interiorCut;
    haze  *= interiorCut;

    vec3 coreCol  = vec3(1.0, 1.0, 1.0);
    vec3 midCol   = vec3(0.88, 0.90, 0.96);
    vec3 outerCol = vec3(0.55, 0.58, 0.68);
    vec3 hazeCol  = vec3(0.30, 0.32, 0.40);

    vec3 rimColor = vec3(0.0);
    rimColor += coreCol  * core  * 2.8;
    rimColor += midCol   * mid   * 1.0;
    rimColor += outerCol * outer * 0.45;
    rimColor += hazeCol  * haze  * 0.15;

    vec3 color = rimColor;
    float alpha = clamp(core + mid * 0.7 + outer * 0.3 + haze * 0.1, 0.0, 1.0);
    alpha = clamp(alpha, 0.0, 1.0);

    color = color / (color + vec3(0.8));
    color = pow(color, vec3(0.95));

    gl_FragColor = vec4(color, alpha);
  }
`;

interface OrbMiniProps {
  size?: number;
  className?: string;
  hover?: boolean;
}

export default function OrbMini({ size = 28, className = "", hover = false }: OrbMiniProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const hoverRef = useRef(hover);
  hoverRef.current = hover;
  const exciteRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // CSS size = size × size (fits the div exactly, no overflow clipping).
    // Physical resolution = size × dpr × scale for sharpness.
    const scale = size <= 64 ? 2.0 : 3.0;
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    const pw = Math.floor(size * dpr * scale);
    const ph = Math.floor(size * dpr * scale);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, premultipliedAlpha: false });
    renderer.setSize(size, size);
    renderer.setPixelRatio(dpr * scale);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.pointerEvents = "none";

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geo = new THREE.PlaneGeometry(2, 2);
    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(pw, ph) },
        uExcite: { value: 0.0 },
      },
      transparent: true,
      depthWrite: false,
    });
    const quad = new THREE.Mesh(geo, mat);
    scene.add(quad);

    let visible = true;
    const observer = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    observer.observe(container);

    const clock = new THREE.Clock();
    let lastTime = 0;
    let waveTime = 0;

    function animate() {
      frameRef.current = requestAnimationFrame(animate);
      if (!visible) return;
      const elapsed = clock.getElapsedTime();
      const dt = Math.min(elapsed - lastTime, 0.05);
      lastTime = elapsed;

      const target = hoverRef.current ? 1.0 : 0.0;
      const speed = hoverRef.current ? 8.0 : 3.0;
      exciteRef.current += (target - exciteRef.current) * Math.min(speed * dt, 1.0);

      waveTime += dt * (1.0 + exciteRef.current * 0.8);
      mat.uniforms.uTime.value = waveTime;
      mat.uniforms.uExcite.value = exciteRef.current;
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      try {
        cancelAnimationFrame(frameRef.current);
        observer.disconnect();
        renderer.dispose();
        geo.dispose();
        mat.dispose();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      } catch { /* ignore */ }
    };
  }, [size]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: size, height: size, flexShrink: 0 }}
    />
  );
}
