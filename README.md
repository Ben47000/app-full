# App-full

Presentation du projet.

Mise en place d'une application uniquement coté serveur et son rendu également.

L'application aura un accés à une BDD en SQL avec mysql2.
La vue utilisée sera EJS.
Les routes gérées par express.
Un systeme d'authentification sera en place, la protection du mot de passe sera le hachage avec bcrypt.
Le maintient des seessions utilisateurs sera avec express-session.

Les données sensibles stockées dans un fichier d'environnement avec dotenv.

Pour le coté pratique utilisation de nodemon en mode développement.

La thématique sera un blog.
L'architecture sera MVC (Model, View, Controller).

L'admin est le seul à autorisé à poster des articles.

Ces articles :

    - peuvent être commentés par des utilisateurs connecté uniquement.
    - auront une images
    - le nom de l'auteur
    - une date et l'heure de publication
    - le titre
    - le contenu
    - seront liés à **une** catégorie

Les commentaires : - auront le nom de l'utilisateur - la date et son heure de publication - le message

Un utilisateur se connectera avec :

    - un alias (username)
    - un password

## SCHEMA

### MCD

Les entités :

    - user
    - story
    - comment

Caridnalités :

    - Un user peut comment une story comme plusieurs. **0N**
    - Une story peut etre comment par plusieurs user. **0N**

    - une story n'est lié qu'à une seule catégory. **11**
    - une catégory peut être lié à une story comme plusieurs. **0N**

user **N** <--------> **N** story
story **1** <--------> **N** category

### MLD

User(id, username, password)

User_Story(#User_id, #Story_id, message, publishDate) --> `comment`

Story(id, title, content, publishDate, author, img, #Category_id)

Category(id, label)

<!--Comment(id, `author`, message, publishDate, #Story_id)-->

## BACK-OFFICE (panneau d'administration)

Un BO simple, permettant au propriétaire du site de manipuler les article du blog :

    - Create (Création d'un article)
    - Read (Lecture d'un article)
    - Update (Mise à jour d'un article)
    - Delete (Supression d'un article)

### BONUS

CRUD sur lles catégories (tags)

Ce qui formera un CRUD complet !
