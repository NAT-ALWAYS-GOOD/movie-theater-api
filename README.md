# API Movie Theater

## URL API
```
https://mtapi.inclinus.fr
```

## Swagger
```
https://mtapi.inclinus.fr/api
```

## Lancer l'APP en local 

### Variables d'environnement
Créez un fichier .env à la racine du projet avec les variables d'environnement suivantes (que vous configurerez à votre convenance)
```
MYSQL_ROOT_PASSWORD=rootpassword
MYSQL_DATABASE=database
MYSQL_USER=user
MYSQL_PASSWORD=password
MYSQL_PORT=3307
PMA_PORT=8088
API_PORT=3000
JWT_SECRET=jwtSecret
```

### Lancer le docker-compose.yml
```
docker compose up -d
```

Accéder à l'API sur le port configuré

```
http://localhost:3000
```
