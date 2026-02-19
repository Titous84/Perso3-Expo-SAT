# Documentation des changements réalisés

## 1) Inscriptions
- **Anonymat des participants**
  - Ajout d'un drapeau `isAnonymous` côté front et backend.
  - Le formulaire d'inscription permet maintenant de cocher l'inscription anonyme.
  - Les requêtes de liste des équipes masquent prénom/nom/DA quand `is_anonymous=1`.
- **Consentement photo à clauses multiples**
  - Le formulaire propose 3 niveaux: publication, usage interne, refus total.
  - Persisté dans `picture_consent_scope` tout en gardant la compatibilité avec `picture_consent` (booléen).

## 2) Réinitialisation de fin d'évènement
- Ajout d'un bouton **"Réinitialiser les données annuelles"** dans l'onglet des paramètres.
- Ajout d'une route API `POST /administrators/reset-annual`.
- Ajout d'une méthode backend transactionnelle qui purge les données annuelles (équipes, liens, évaluations, résultats, participants) sans supprimer les comptes administrateurs.

## 3) Base de données
- Renommage de la table SQL principale `survey` vers `evaluationgrids` dans le schéma SQL et les principaux repositories backend.
- Ajout du champ `present_current_edition` dans `judge` pour distinguer le juge actif en BD et le juge réellement présent cette année.
- Ajout des champs `picture_consent_scope` et `is_anonymous` dans `users`.

## 4) Administration / interface
- Onglet renommé de **"Administrateurs"** à **"Paramètres généraux"**.
- Persistance de l'onglet actif dans l'URL via `?onglet=...`.
- Barre de navigation du haut réalignée verticalement et regroupée à droite (design plus uniforme).

## Fichiers modifiés
- Backend:
  - `backend/api/config/routes.php`
  - `backend/api/src/Actions/Administrators/PostResetAnnualDataAction.php`
  - `backend/api/src/Services/UserService.php`
  - `backend/api/src/Repositories/UserRepository.php`
  - `backend/api/src/Repositories/SignUpTeamRepository.php`
  - `backend/api/src/Repositories/TeamsListRepository.php`
  - `backend/api/src/Repositories/FormRepository.php`
  - `backend/api/src/Repositories/EvaluationGridRepository.php`
  - `backend/api/src/Repositories/SendRepository.php`
  - `backend/api/src/Models/TeamMember.php`
  - `backend/api/src/Models/Judge.php`
- Frontend:
  - `front/src/components/signup/team-member.tsx`
  - `front/src/pages/ParticipantRegistration/ParticipantRegistrationPage.tsx`
  - `front/src/types/sign-up/team-member.ts`
  - `front/src/pages/AdministrationMain/AdministrationMainPage.tsx`
  - `front/src/components/AdministrationMainPage/AdministrationNavigationSidebar.tsx`
  - `front/src/types/AdministrationMainPage/AdministrationMainPageTabs.ts`
  - `front/src/pages/AdministratorsList/AdministratorsListPage.tsx`
  - `front/src/api/users/userService.ts`
  - `front/src/components/NavigationBar/NavigationBar.module.css`
  - `front/src/pages/JudgesList/JudgesListPage.tsx`
  - `front/src/types/judge.ts`
  - `front/src/types/judgeUpdate.ts`
- SQL:
  - `exposat.sql`
