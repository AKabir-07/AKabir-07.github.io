# Guide GitHub ultra-détaillé — pour débutant complet

Ce dossier (`kabir-amoussa.github.io`) est maintenant connecté : je peux écrire directement
dedans à chaque fois qu'on fait une modification. Tu n'as plus jamais besoin de télécharger
un zip. Il ne te reste que la partie Git/GitHub à faire toi-même (voir ci-dessous), car je n'ai
pas accès à ton compte GitHub.

**Ton pseudo GitHub est `AKabir-07`.** ⚠️ Le nom du dossier local (`kabir-amoussa.github.io`) ne
correspond pas à ton pseudo réel — ce n'est pas grave, le nom du dossier sur ton PC n'a pas
besoin de correspondre. Ce qui compte, c'est le nom du **repository sur GitHub**, qui doit être
exactement `AKabir-07.github.io` (voir Étape 2).

---

## Étape 1 — Trouver ton nom d'utilisateur GitHub

1. Va sur [github.com](https://github.com) et connecte-toi.
2. Clique sur ta photo de profil en haut à droite : ton nom d'utilisateur s'affiche en haut du
   menu, ou regarde l'URL de ton profil : `https://github.com/TON-USERNAME`.

---

## Étape 2 — Le repository sur GitHub

Tu as déjà créé un repo, mais avec le mauvais nom (`kabir-amoussa.github.io`). Il faut le renommer :

1. Va sur `https://github.com/AKabir-07/kabir-amoussa.github.io`
2. Onglet **Settings** du repo → tout en haut, champ **Repository name**
3. Remplace par, exactement (respecte la casse) :
   ```
   AKabir-07.github.io
   ```
4. Clique **Rename**

Vérifie ensuite que le repo est bien **Public** (Settings → General → tu dois voir "Public" dans la section Danger Zone ou visibilité).

---

## Étape 3 — Installer Git sur ton PC

1. [git-scm.com/download/win](https://git-scm.com/download/win) → télécharge, installe avec les
   options par défaut (Next, Next, Install).
2. Vérifie dans PowerShell :
   ```
   git --version
   ```

## Étape 4 — Configurer Git (une seule fois)

⚠️ Ces informations sont visibles publiquement sur GitHub sur **chaque commit** que tu fais.
Utilise ton pseudo (pas ton nom complet) et une adresse email « noreply » fournie par GitHub
(Settings → Emails → coche "Keep my email addresses private", l'adresse à copier apparaît
juste au-dessus, du type `1234567+AKabir-07@users.noreply.github.com`) :

```
git config --global user.name "AKabir-07"
git config --global user.email "TON-ADRESSE-NOREPLY@users.noreply.github.com"
```

## Étape 5 — Ouvrir PowerShell dans ce dossier

1. Ouvre ce dossier dans l'Explorateur Windows : `C:\Users\kabir\Projet portfolio BTS\kabir-amoussa.github.io`
2. Clique dans la barre d'adresse en haut, tape `powershell`, appuie sur **Entrée**.
3. Vérifie avec `dir` que tu vois bien `index.html`, `css`, `js`, `assets`.

## Étape 6 — Envoyer les fichiers sur GitHub

Dans PowerShell, dans ce dossier :

```
git init
git add .
git commit -m "Premier commit : structure initiale du portfolio BTS SIO SISR"
git branch -M main
git remote add origin https://github.com/AKabir-07/AKabir-07.github.io.git
git push -u origin main
```

Une fenêtre de connexion GitHub peut s'ouvrir dans ton navigateur la première fois — connecte-toi, autorise, reviens dans PowerShell.

## Étape 7 — Vérifier

1. `https://github.com/AKabir-07/AKabir-07.github.io` → les fichiers doivent apparaître.
2. **Settings → Pages** du repo : Source = `Deploy from a branch`, branche `main`, `/ (root)` (normalement automatique).
3. Attends 1-2 min, ouvre `https://akabir-07.github.io` → ton site est en ligne.

## Étape 8 — Pour chaque future modification

Comme le dossier est connecté, je modifie directement les fichiers ici. Toi, à chaque fois
qu'on a fini un changement, tu ouvres PowerShell dans ce dossier et tu fais :

```
git add .
git commit -m "Description précise du changement"
git push
```

Exemples de messages de commit :
```
git commit -m "Ajout du projet 1 : maquette réseau Packet Tracer"
git commit -m "Complétion du tableau E5 avec les missions du stage juin 2026"
git commit -m "Rédaction du projet E6 : chiffrement BitLocker To Go"
```

Le site se met à jour tout seul sur `https://akabir-07.github.io` en 1-2 minutes après chaque `push`.
