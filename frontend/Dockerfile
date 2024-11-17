# Utiliser l'image officielle Node.js
FROM node:20

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de package et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application écoute
EXPOSE 5173

# Commande pour démarrer l'application
CMD ["npm", "run", "dev"]
