# PPROJ



## Réalisé:
* Le projet est contenu dans un repo git privé, les secrets de développements sont cachés et n'apparaissent pas.
* Le backend est mis en place, chaque table a son propre CRUD.
* Il "suffit" de lier le tout au front.

### 2.2.1

* Partie Auhtentication (Création de compte, Connexion, OAuth via Google)

### 2.2.2
* Listes par défaut, affichage sur l'application web
* Création de liste (faisable depuis le front)

### 2.2.3
* Action utilisateur: 
  * Ajouter à une liste
  * Possibilité de noter 
  * critiquer l'œuvre 
* Espace communautaire: voir notes, commentaires, critique de l'oeuvre
* Page détails disponible pour chaque œuvre remplie via les données de l'api


### 2.2.7
* Barre de recherche (en cours)

### 2.2.8
* Recherche avancée 
  * via filtre
  * des utilisateurs publics
  * des listes publiques

### 2.2.9
* Affichage des données de profil 
* Gestion profil (modification des infos)
* Exportation des données personnelles json (liste oeuvres notées)

### 2.3.7
* Limitation des appels api (mise en place d'un cache)

### 2.3.1 
* Application en 3 parties distinctes:
  * front: react
  * back: express
  * bdd: mongo
* Logique métier dans backend et rien d'important directement dans le front (juste traitement des données pour les afficher)

### 2.3.2

* Containérisation du projet
  * Démarrage des 3 services via "Docker compose up"

### 3
* Manuel utilisateur

## Pas encore fait:

### 2.2.2
* Tableau de bord (stats de collection de l'utilisateur)

### 2.2.4
* Système de Follow
* Fil d'actualité
* Interaction sur actions des autres utilisateurs
* Messagerie privée

### 2.2.5
* Administration -> ban / mettre en avant
* Utilisateurs -> Signalement

### 2.2.6
* Système de notifications


### 3
* Documentation technique