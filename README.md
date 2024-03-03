## Crée le conteneur docker mysql : 
````
docker run --name hapi-mysql -e MYSQL_USER=user_name -e MYSQL_PASSWORD=password -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=user -d -p 3308:3306 mysql:8 mysqld --default-authentication-plugin=mysql_native_password
````

Pensser à renomer le fichier .env-keep en .env et à le remplir avec les bonnes informations

## Pour acceder aux routes qui nescécite d'être authentifier:
Vous pouvez obtenir un token a partir de la route /user/login
Un token est valide pendant 4 heures
### Postman:
dans l'onglet Headers ajouter la key "Authorization" avec la valeur: "Bearer votre_token"  (sans les ")
### Swagger:
Sur /documentation, en haut à droite cliquer sur Authorize et rentrer la valeur : "Bearer votre_token"  (sans les ")

## Lancer le projet:
npm start

