# CV + Portfolio — reprise

Dépôt : `https://github.com/sacha-riccardo-leone/resume.git` (branche `main`, propre).
Lancer : `npm run dev` → `localhost:5173`. Build : `npm run build`. PDF : `npm run pdf`.

## Dernière session — 2026-10-08 21:30

**Où j'en suis**
- **Le PDF tient sur une seule page A4**, dans les 4 langues. `npm run pdf` échoue si ce n'est plus le cas : c'est le garde-fou. Marge restante ≈ 3–4 mm, donc tout ajout de contenu se mesure, jamais à l'œil. La page 2 ne s'ouvre que si l'expérience déborde (rien n'est jamais coupé).
- **Le PDF est un fichier servi, plus un `window.print()`** : 4 PDF pré-générés dans `public/`, le bouton pointe dessus. iOS rendait le print DOM n'importe comment. ~93 kB pièce, 10 liens cliquables (contacts, site, et chaque nom de projet pointe vers le site du projet).
- **Corrections de fond ce coup-ci** : XEFI est un **stage** (4–22 mai 2026), pas un mandat freelance — l'attestation le dit, et les puces ont été réécrites depuis elle. L'entrée Anthropic dit maintenant **« Cours Anthropic Academy »** et la section s'appelle **Formation continue** : ce ne sont pas des certifications.
- **Web** : photo cliquable qui ouvre la photo entière (`<dialog>` natif), bouton **Retour** dans le header, section **Contact** déplacée en bas (entre Centres d'intérêt et Références), flou sous le header quand le contenu passe dessous, **Vercel Analytics** branché (`@vercel/analytics/react`, pas `/next`).
- **LinkedIn** : chantier séparé, en cours via Claude in Chrome → voir `Work pipeline/jobs/linkedin.md`.

**Prochaine étape**
1. **LinkedIn, étape 2** : relancer Claude in Chrome avec le prompt et les décisions déjà prises (titre validé, Open to Work débloqué) → tout est dans `Work pipeline/jobs/linkedin.md`. C'est le chantier qui bouge le plus l'aiguille en ce moment.
2. Décider où remettre **« 100 % »** (taux d'activité, demandé par la recruteuse) : ligne dans le bloc contact, ou accolé au titre. → `src/imports/MainComponentNameCv.tsx`, champ `availability` ou `title` (×4 langues).
3. Trancher le cadrage **VRD** : « Mandats professionnels » ou « Projets & entrepreneuriat » (le HANDOFF du dépôt VRD dit que le site est spéculatif).
4. Exporter le PDF depuis **Firefox et Safari** (seul Chromium a été vérifié).

**Bloqué / à décider**
- **Compétences manquantes** sur le CV : React, Next.js, FastAPI, Odoo, Stripe, pytest ne sont nulle part, alors que les expériences les prouvent. Python, TypeScript, JavaScript et Supabase ont été ajoutés ; le reste attend un arbitrage (place limitée dans la sidebar).
- **VRD** : le site n'est pas encore sur le domaine du client (vrd-ingenieurs.ch sert toujours du Wix) → ne pas le mettre en avant publiquement sans leur accord.
- Effets **dither / depth-map** (R3F v8) : discutés, jamais commencés.
- `npm audit` : vulnérabilités héritées (chaîne `three` / `vite`).

**Pièges**
- `python` = celui d'Inkscape, **sans pip**. Utiliser `C:/Users/leone/AppData/Local/Python/pythoncore-3.14-64/python.exe` (PyMuPDF y est installé).
- **Ne pas passer le site en police variable** : Chrome embarque alors les polices du PDF en **Type3** (175 → 376 kB) et les parseurs ATS lisent mal le Type3. La face variable ne sert qu'au 404. Détail dans `src/styles/fonts.css`.
- Un **clic synthétique** (`el.click()`, et parfois `.click()` de Playwright) ne donne pas d'activation utilisateur : l'API Presse-papiers refuse, et le clic peut rater en silence. Vérifier avec `mouse.move` → `down` → `up`.
- La console du panneau Browser **garde les messages d'une navigation à l'autre** : encadrer un test avec des `console.log` repères, sinon on débogue une erreur déjà corrigée.
- Un `<dialog>` modal est dans le **top layer** : le curseur personnalisé ne peut pas s'afficher au-dessus, quel que soit le z-index.
- Les **backticks dans un message de commit** sont mangés par bash → `git commit -F -` avec un heredoc.
- Fermer le PDF dans le visualiseur avant `npm run pdf` : sinon **EBUSY** et l'export échoue (bruyamment, au moins).
