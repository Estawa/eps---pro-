# EPS Pro — Fonctionnalités & journal des changements

> Ce fichier doit être mis à jour à **chaque** modification apportée à l'application :
> une nouvelle fonction, une correction de bug, ou une évolution d'une fonction existante.
> La version affichée dans l'application (constante `APP_VERSION` dans `src/App.jsx`,
> visible en petit à côté de « by C. Guilhem » en haut de l'écran) doit être incrémentée
> à chaque mise à jour livrée.

Version actuelle : **1.2.1**

---

## 1. Vue d'ensemble des fonctionnalités

### Accueil
- Emploi du temps de la semaine affiché sous forme de tableau (jours × heures)
- Navigation semaine précédente / suivante (par 1), retour rapide à « cette semaine »
- Saut direct à une date précise
- Sélecteur d'alternance Semaine A / B / Auto
- Bannière vacances / jour férié (jour même)
- Nom de l'établissement et année scolaire en cours affichés au-dessus de l'EDT

### Gestion de classe (Classe/Groupe classe, Appel, Trombinoscope)
- Classes simples et groupes classe (jusqu'à 5 classes d'origine réunies)
- Fiche classe : PP, CPE, délégués, photo, renommage
- Import d'une liste d'appel complète (Excel/CSV/ODS) avec mapping des colonnes et aperçu avant validation
- Appel avec statuts Présent / Sans tenue / Dispensé / Absent, compteur d'oublis de tenue par cycle
- Gestion des dispenses (ponctuelles ou par période), avec photo de justificatif dupliquée dans Documents
- Annotations rapides horodatées (positif/négatif), contextualisées à l'activité du cycle en cours
- Fiche générale d'appel par classe, consultable par cycle

### Emploi du temps (onglet Outils)
- Ajout de créneaux manuel ou import Excel/CSV/ODS
- Alternance semaine A/B calculée automatiquement à partir de la rentrée
- Gestion des vacances et jours fériés
- **Création de Cycles** (nouveau) : pour chaque classe/groupe classe, définition de périodes
  (dates début/fin) associées à une activité, qui pilotent automatiquement l'activité affichée
  dans l'emploi du temps sans avoir à modifier chaque créneau. Gère les classes à deux séances
  hebdomadaires avec une activité distincte par séance. Alerte en cas de trou ou de chevauchement
  entre cycles d'une même classe. Duplication de la programmation de cycles vers d'autres classes
  (dates et activités modifiables ensuite indépendamment).

### Documents
- Fichiers de tout type, prise de photo, organisation en dossiers/sous-dossiers
- Impression de tout document, dossier "Dispenses EPS" avec récapitulatif imprimable

### Outils
- Minuteur (modes Simple/Tabata/EMOM/Test VMA/Vaussenat)
- Chronomètre multi-temps avec classement, vitesse calculée, sauvegarde par classe
- Bloc-note (texte + photo/vidéo)
- Éditeur de tableaux d'évaluation (formules, agrégats, pondérations, min/max)

### Liens
- Liens vers les autres applications (Suivi AS, Muscu Pro, VMA Pro, Fractionné GPS Pro)
- Liens personnalisés ajoutables librement

### Autres
- Stockage local persistant (IndexedDB) + synchronisation en ligne (Firebase/Firestore)
- Assistant de rentrée (établissement, année scolaire, vacances, fériés, archivage annuel)
- Code PIN à l'ouverture, mode jour/sombre
- Numéro de version affiché discrètement en haut de l'écran

---

## 2. Journal des versions

### v1.4.0 — 04/09/2026
- Import de liste : ajout de 3 nouvelles cibles de colonne — **Classe**, **Date de naissance**
  et **Sexe** — reconnues automatiquement sur les exports Pronote (colonnes "Classe de
  rattachement", "Né(e) le", "Sexe") et affichées sur la fiche élève
- Nouvel onglet **Recherche** (à côté de Trombi, dans Gestion de classe) : recherche d'élèves
  toutes classes confondues par nom/prénom, classe EPS, classe réelle et sexe, avec accès
  direct à la fiche élève depuis les résultats

### v1.3.0 — 04/09/2026
- Correction d'un bug important : lors d'un import de liste (mode "Remplacer"), les élèves déjà
  présents étaient recréés avec un nouvel identifiant interne, ce qui déconnectait leur photo,
  leurs notes, leurs annotations, leurs dispenses et leur historique d'appel — la fiche élève
  apparaissait alors vide même si le nom était correct. Les élèves reconnus dans le fichier
  gardent désormais leur identifiant et toutes leurs données existantes
- Nouvel écran d'**aperçu tableau brut** du fichier importé (toutes les colonnes/lignes telles
  quelles) avant de choisir les colonnes à utiliser
- Le mapping se fait désormais **colonne par colonne** : pour chaque colonne du fichier, on
  choisit ce qu'elle représente (Nom, Prénom, Nom+Prénom combinés, Classe d'origine, Téléphone
  élève, Téléphone parent, ou "Autre info à conserver sur la fiche")
- Gestion automatique des exports Pronote avec une colonne "Élèves" combinant nom et prénom
  (ex. "ABATAN Noemie") : séparation automatique nom/prénom
- Les colonnes choisies comme "Autre info" (date de naissance, sexe, e-mail, régime...) sont
  désormais conservées et affichées dans une nouvelle section "Informations importées" sur la
  fiche élève
- L'import "Mettre à jour / ajouter" retrouve les élèves déjà présents (par nom/prénom) et ne
  modifie que les champs renseignés dans le fichier : une cellule vide n'efface jamais une
  valeur déjà saisie dans l'appli
- L'aperçu final indique désormais, pour chaque ligne, s'il s'agit d'une mise à jour d'un élève
  existant ou d'un nouvel élève

### v1.2.1 — 04/09/2026
- Correction du bug d'import CSV (import de liste d'appel ET import des téléphones) : le
  fichier n'était lu qu'avec l'outil dédié Excel/ODS, ce qui pouvait échouer silencieusement
  sur un CSV « à la française » (séparateur point-virgule, accents mal encodés) sans afficher
  d'erreur, donnant l'impression que rien ne se passait
- Le CSV est désormais lu et découpé indépendamment (détection automatique du séparateur
  virgule/point-virgule, détection de l'encodage UTF-8/Windows-1252)
- Ajout d'un message d'erreur explicite si la lecture du fichier échoue (au lieu de rester
  silencieux)

### v1.2.0 — 04/09/2026
- Nouvelle fonction **Import de liste d'appel** sur la fiche classe :
  - bouton dédié "Importer une liste d'appel (Excel / CSV / ODS)"
  - lecture du fichier puis écran de mapping des colonnes (Nom, Prénom, Classe d'origine
    pour les groupes classe, Téléphone élève, Téléphone parent), avec pré-détection
    automatique des en-têtes courants
  - aperçu de la liste avec cases à cocher pour exclure des lignes avant validation
  - choix entre "Ajouter aux élèves existants" ou "Remplacer la liste" (avec confirmation
    pour le remplacement)
  - pour un groupe classe, rattachement automatique de chaque élève à sa classe d'origine
    si le nom importé correspond à une classe d'origine déjà créée

### v1.1.0 — 31/08/2026
- Ajout du numéro de version discret dans l'application (affiché en haut, à côté de la signature)
- Création de ce fichier CHANGELOG.md
- Nouvelle fonction **Création de Cycles** dans l'outil Emploi du temps :
  - bouton dédié sous "Ajouter un créneau" / "Importer"
  - définition de cycles (dates début/fin + activité) par classe/groupe classe
  - prise en charge des classes à deux séances/semaine avec activité distincte par séance
  - alerte en cas de trou ou de chevauchement entre cycles
  - duplication de la programmation de cycles vers d'autres classes
  - les activités affichées dans l'emploi du temps (accueil + écran de gestion) suivent
    désormais automatiquement le cycle en cours à la date concernée, sauf saisie manuelle
    explicite sur un créneau
- Ajout de la navigation par semaine sur l'accueil (semaine précédente/suivante, retour à
  "cette semaine") et d'un champ pour sauter directement à une date précise
