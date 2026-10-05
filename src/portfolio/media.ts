import shotR2jc from "../assets/shot-r2jc.webp";
import shotOrdine from "../assets/shot-ordine.webp";
import vidR2jcWebm from "../assets/vid-r2jc.webm";
import vidR2jcMp4 from "../assets/vid-r2jc.mp4";
import posterR2jc from "../assets/poster-r2jc.webp";
import vidOrdineWebm from "../assets/vid-ordine.webm";
import vidOrdineMp4 from "../assets/vid-ordine.mp4";
import posterOrdine from "../assets/poster-ordine.webp";
import vidOrdineDarkWebm from "../assets/vid-ordine-dark.webm";
import vidOrdineDarkMp4 from "../assets/vid-ordine-dark.mp4";
import posterOrdineDark from "../assets/poster-ordine-dark.webp";
import vidVrdWebm from "../assets/vid-vrd.webm";
import vidVrdMp4 from "../assets/vid-vrd.mp4";
import posterVrd from "../assets/poster-vrd.webp";

/* Which recording illustrates which project. Its own module (no content
   imports) so both the CV's cards and the portfolio can read it without the
   two importing each other. */

export type Clip = { webm: string; mp4: string; poster: string };

export type Media = {
  shot?: string;
  video?: Clip;
  /* Where a project's own site has a dark face, its preview follows the
     portfolio's theme instead of clashing with it. */
  videoDark?: Clip;
  url?: string;
  /* Which projects get a full plate; the rest are listed compactly. */
  featured?: boolean;
};

/* Keyed by the company name as the CV spells it, so this map is the only
   thing that has to know a project exists. No entry simply means no media. */
export const media: Record<string, Media> = {
  "VRD - Ingénieurs conseils": {
    featured: true,
    url: "https://vrd-ingenieurs.vercel.app/",
    shot: posterVrd,
    video: { webm: vidVrdWebm, mp4: vidVrdMp4, poster: posterVrd },
  },
  "Ordine AI": {
    featured: true,
    url: "https://www.ordine-ai.ch/",
    shot: shotOrdine,
    video: { webm: vidOrdineWebm, mp4: vidOrdineMp4, poster: posterOrdine },
    videoDark: { webm: vidOrdineDarkWebm, mp4: vidOrdineDarkMp4, poster: posterOrdineDark },
  },
  "R2JC": {
    featured: true,
    url: "https://r2jc.ch",
    shot: shotR2jc,
    video: { webm: vidR2jcWebm, mp4: vidR2jcMp4, poster: posterR2jc },
  },
};
