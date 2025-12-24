# ISET Rades - Application de Gestion des Sessions de Formation

## 📋 Vue d'ensemble

Application Angular complète pour la gestion des formations, sessions et inscriptions à l'ISET de Rades.

## 🎯 Fonctionnalités

### 🌐 Partie Publique

1. **Page d'Accueil** (`/accueil`)
   - Présentation du programme de formation
   - Appels à l'action

2. **Page Formations** (`/formations`)
   - Liste de toutes les formations
   - Recherche par mot-clé
   - Accès aux détails de chaque formation

3. **Page Détails Formation** (`/formations/:id`)
   - Titre, description, charge horaire
   - Bouton pour télécharger le programme PDF
   - Liste des sessions avec formateurs et dates
   - Affichage du nombre de places disponibles
   - Bouton d'inscription (désactivé si session pleine - 15 candidats max)

4. **Formulaire d'Inscription** (`/inscription/:sessionId`)
   - Demande : Nom, Prénom, Email
   - Validation des formulaires
   - Vérification de la capacité des sessions
   - Message de succès après inscription

### 🔐 Partie Administration (`/admin-space`)

1. **Admin Component** - Page principale avec menu
2. **Gestion des Formateurs** (`/admin-space/formateurs`)
   - CRUD complet (Créer, Lire, Modifier, Supprimer)
   - Liste des formateurs existants
   - Formulaire de gestion

3. **Gestion des Formations & Sessions** (`/admin-space/formations-sessions`)
   - Gestion des formations (CRUD)
   - Gestion des sessions (CRUD)
   - Visualisation des candidats inscrits à chaque session
   - Interface multi-panels

## 🏗️ Architecture

### Structure des Dossiers

```
src/app/
├── services/              # Services métier
│   ├── formations.service.ts
│   ├── sessions.service.ts
│   ├── formateurs.service.ts
│   └── inscriptions.service.ts
├── models/               # Interfaces TypeScript
│   ├── formation.model.ts
│   ├── session.model.ts
│   ├── formateur.model.ts
│   └── inscription.model.ts
├── accueil/             # Composant d'accueil
├── formations/          # Liste des formations
├── formations-detail/   # Détails d'une formation
├── inscription/         # Formulaire d'inscription
├── navbar/              # Barre de navigation
├── admin/               # Admin principal
├── admin-formateurs/    # Gestion des formateurs
└── admin-formations-sessions/ # Gestion formations/sessions
```

### Services

- **FormationsService** - Gestion des formations avec recherche
- **SessionsService** - Gestion des sessions avec vérification de capacité
- **FormateursService** - Gestion des formateurs
- **InscriptionsService** - Gestion des inscriptions avec vérification

## 🚀 Fonctionnalités Techniques

### Reactive Programming
- Utilisation de RxJS Observables
- Gestion des souscriptions avec `takeUntil`
- BehaviorSubject pour les états partagés

### Validation
- Formulaires réactifs (Reactive Forms)
- Validation personnalisée
- Messages d'erreur dynamiques

### État Métier
- Vérification de la capacité maximale des sessions (15 candidats)
- Désactivation automatique du bouton d'inscription quand session pleine
- Gestion des candidats par session

### Routing
- Routes paramétrées (formations/:id, inscription/:sessionId)
- Navigation fluide entre composants

## 🎨 Styles

- Design modern et responsive
- Gradient violet/rose principal
- Responsive design (mobile, tablette, desktop)
- Palette de couleurs cohérente

## 📊 Données Exemple

L'application fournit des données exemple :
- 4 formations disponibles
- 6 sessions réparties
- 3 formateurs
- Plusieurs inscriptions existantes

## 🔧 Installation et Utilisation

```bash
# Installation des dépendances
npm install

# Lancer en développement
npm start

# Builder pour production
npm run build
```

## 📱 Routes Principales

| Route | Composant | Description |
|-------|-----------|-------------|
| `/` | Redirection | Vers accueil |
| `/accueil` | AccueilComponent | Page d'accueil |
| `/formations` | FormationsComponent | Liste formations |
| `/formations/:id` | FormationsDetailComponent | Détails formation |
| `/inscription/:sessionId` | InscriptionComponent | Inscription session |
| `/admin-space` | AdminComponent | Admin principal |
| `/admin-space/formateurs` | AdminFormateursComponent | Gestion formateurs |
| `/admin-space/formations-sessions` | AdminFormationsSessionsComponent | Gestion formations/sessions |

## 💡 Points Clés de Développement

1. **Gestion d'état décentralisée** avec Services
2. **Composants réutilisables** et modulaires
3. **Validation robuste** des formulaires
4. **Gestion des erreurs** utilisateur
5. **Interface admin intuitive** pour la gestion de contenu

## 📝 Notes

- L'application fonctionne sans authentification pour la partie admin
- Les données sont stockées en mémoire (BehaviorSubject)
- Le programme PDF est un placeholder (alerte utilisateur)
- La capacité des sessions est fixée à 15 candidats maximum

---

**Développé avec Angular standalone components et Reactive Forms**
