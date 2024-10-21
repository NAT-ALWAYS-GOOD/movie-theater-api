# API Movie Theater

## Swagger
```
http://localhost:${API_PORT}/api
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

### Lancez le docker-compose.yml
```
docker compose up -d
```

### Lancez l'API
```
npm run start:dev
```

### Accédez à l'API sur le port configuré

```
http://localhost:${API_PORT}
```
