# CV + Portfolio — reprise

Dépôt : `https://github.com/sacha-riccardo-leone/resume.git` (branche `main`, propre).
Lancer : `npm run dev` → `localhost:5173`. Build : `npm run build`.

## Dernière session — 2026-10-05 00:30

**Où j'en suis**
- Le site a **quatre vues** : une porte d'entrée (`/`), le CV (`/cv`), « Expérience complète » (`/work`) et une page 404 pour tout le reste. `/cv` et `/work` sont des liens directs qui sautent la porte — c'est l'URL à mettre dans les candidatures. Les anciens liens `?cv` et `?work` continuent de fonctionner et sont réécrits vers la nouvelle forme au chargement.
- **Le CV est la seule source de contenu.** Le portfolio lit `translations` depuis `src/imports/MainComponentNameCv.tsx` ; modifier le CV met à jour les deux vues dans les 4 langues. `src/portfolio/content.ts` ne garde que les vidéos et les quelques phrases propres à la page.
- **PDF refait** en pages explicites (`.print-page`) avec un paginateur mesuré : 2 pages A4, marges ≥ 12,3 mm, rien n'est coupé même si le contenu grandit. Vérifié aussi en US Letter.
- **Thème clair / sombre** sur les deux vues, choix mémorisé, préférence système respectée. Le PDF n'est pas touché (tout est sous `@media screen`).
- Portfolio : aperçus vidéo réels des sites (VRD, Ordine, R2JC), projets dépliables, bento, cartes de compétences à accent, curseur personnalisé sur tout le site, grain.

**Prochaine étape**
1. Décider où remettre **« 100 % »** (taux d'activité) : la phrase de dispo ne le dit plus, et c'est un point que la recruteuse avait demandé. Options : une ligne dans le bloc contact, ou l'accoler au titre (« Développeur d'applications · 100 % »). → `src/imports/MainComponentNameCv.tsx`, champ `availability` ou `title` (×4 langues).
2. Trancher le cadrage **VRD** : « Mandats professionnels » ou « Projets & entrepreneuriat ». Le `HANDOFF.md` du dépôt VRD dit que le site est **spéculatif** (« pas un remplacement commandé »). Le rôle est écrit « Développeur web — site vitrine » (neutre) en attendant.
3. Exporter le PDF depuis **Firefox et Safari** pour confirmer la pagination (seul Chromium a été vérifié ici).

**Bloqué / à décider**
- Effets **dither / depth-map** (R3F) : discutés, jamais commencés. R3F v8 obligatoire (React 18, pas 19).
- Le CV garde son `fadeIn()` d'entrée (séquence liée à l'animation de frappe du nom) au lieu de `TextAnimate` — à convertir ou non.
- `npm audit` : 5 vulnérabilités héritées (chaîne `three` / `vite`).

**Pièges**
- `python` = celui d'Inkscape, **sans pip**. Utiliser `C:/Users/leone/AppData/Local/Python/pythoncore-3.14-64/python.exe` (PyMuPDF y est installé).
- Vérifier un PDF : Chrome headless `--print-to-pdf`, puis PyMuPDF pour compter pages / mesurer marges / sortir des PNG. Les captures d'écran du panneau Browser **expirent** (le panneau ne compose pas).
- Playwright utilise le Chrome du système (`channel: "chrome"`) → pas de téléchargement de navigateur.
- La **timeline vidéo de Playwright retarde** d'environ 9 s sur celle du script : toujours repérer la fenêtre d'un extrait en échantillonnant des images, jamais au chronomètre du script.
- Des **clés React identiques entre frères** cassent la réconciliation en silence (c'est ce qui a bloqué la traduction des titres animés).
- Les **backticks dans un message de commit** sont mangés par bash → utiliser `git commit -F -` avec un heredoc.
- `git push` échoue parfois (timeout, ou un 403 sous l'identité « solentoqi-web ») → relancer, ça passe.
