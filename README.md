# GOFA Academy - Football Management App

Application Flutter complète pour la gestion de l'académie de football GOFA basée à Mbour, Sénégal.

## Structure du projet

- `lib/models/` : Classes de données (Joueur, Match, etc.)
- `lib/services/` : Service Supabase pour les appels API cloud.
- `lib/screens/` : Les 14 écrans de l'application (Dashboard, Galerie, Profils, etc.)
- `lib/widgets/` : Composants UI réutilisables (MatchCard, JoueurCard).
- `lib/theme/` : Design system (Bleu #1A5F7A et Jaune #F9D56E).

## Configuration Supabase

1. Créez un projet sur [Supabase](https://supabase.com).
2. Exécutez le script SQL fourni dans l'onglet `SQL Editor` de votre console Supabase.
3. Copiez vos clés `API URL` et `Anon Key` dans `lib/main.dart`.

## Installation et lancement

```bash
# Récupérer les dépendances
flutter pub get

# Lancer l'application
flutter run
```

## Fonctionnalités majeures

- **Suivi des Joueurs** : Stats complètes, catégories U15-U19, profil détaillé.
- **Gestion des Matchs** : Scores, calendrier, compétitions.
- **Classements** : Tableau dynamique avec gestion de multiples ligues.
- **Académie** : Présentation historique, staff et valeurs.
- **Galerie** : Photos classées par événements.
- **Contact** : Appels directs, email et localisation GPS.
