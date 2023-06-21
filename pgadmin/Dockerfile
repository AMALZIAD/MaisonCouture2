FROM dpage/pgadmin4:latest

# Ajouter des fichiers de configuration personnalisés

# Définir les variables d'environnement
ENV PGADMIN_DEFAULT_EMAIL='pgadmin4@pgadmin.org'
ENV PGADMIN_DEFAULT_PASSWORD='admin'
ENV PGADMIN_LISTEN_PORT=5050
ENV PGADMIN_LISTEN_ADDRESS=0.0.0.0
EXPOSE 5050

# Démarrer PgAdmin
CMD ["/usr/local/bin/pgadmin4"]
