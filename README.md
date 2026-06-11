# PPROJ3: SUPIFY

## Instructions de lancement de l'application web: 

1. Cloner le repo.
2. Lancer cette commande à la racine du repo :

```bash
    docker compose up
```

3. Acceder à l'application via l'url suivante :

```
    http://localhost:3000/
```

## Choix techniques

* ***Base de donnée: Mongo***
* ***Backend: Express js***
* ***Frontend: React***

# Pages
## Accueil
```
    http://localhost:3000/
```
Permet à l'utilisateur de :
- Rechercher un jeu.
    - Filtrer les resultats
- Rechercher des utilisateurs publics 
- Rechercher des listes publiques.
- Choisir quels résultats sont affichés (Jeux / Utilisateurs / Listes) 

## Détails
```
    http://localhost:3000/Details?id={id}
```

- Affiche les détails du jeu séléctionné :
    - Séléction du jeu via le query parameter *{id}* 
    - Permet d'accèder à la page détails de(s) l'éditeur(s) du jeu
    - Permet à l'utilisateur d'acceder au site du jeu 
    - Le frontend interroge le backend qui lui renvoie les informations relatives au jeu
        - Image de présentation du jeu
        - Description/présentation du jeu
        - Note de la communauté RAWG
        - Bandes anonces du jeu
        - Succès du jeu
        - Plateformes sur lesquelles le jeu est disponible
        - Magasins sur lesquelles le jeu est disponible
        - Catégories du jeu
        - Studio de développement 
        - Editeur(s)

- Permet à l'utilisateur d'ajouter le jeu à l'une de ses listes personnelles
- Permet à l'utilisateur de publier un avis sur le jeu 

- Affiche les critiques des autres utilisateurs ayant leur compte public

Si l'id ne correspond à aucun jeu, redirection vers la page "Not Found"

## Compte
```
    http://localhost:3000/Account
```

3 pages en une :
- Connexion
- Création de compte
- Détails du profil

### Connexion
- Permet à l'utilisateur de se connecter à son compte via :
    - Son login / mot de passe 
    - Son compte google

### Création de compte
Permet à l'utilisateur de créer un compte en entrant :
- Un nom d'utilisateur
- Un Login
- Un Mot de passe


### Détails du profil
Affiche:
- Les information du compte utilisateur
- Les listes crées par l'utilisateur

Permet :
- La modification des information de compte 
    - Avatar / Bio / Mot de passe / Visibilité du compte
- L'exportation au format Json les information personnelles du compte
- La création d'une liste pour l'utilisateur
- D'accéder aux listes de l'utilisateur 

## Liste 
Affiche : 
- Tous les jeux présents dans la liste

Permet :
- De modifier la visibilité de la liste (si ce n'est pas une liste crée par défaut)
- De supprimer un jeu de la liste

## Editeur
Affiche : 
- La liste des jeux publiés par l'éditeur