FROM postgres:14.7-alpine

# ENV POSTGRES_USER admin
# ENV POSTGRES_PASSWORD admin 
# ENV POSTGRES_DB couturier-db

RUN mkdir -p /var/lib/postgresql/data && \
    chown -R postgres:postgres /var/lib/postgresql

#PGDATA=/var/lib/postgresql/data/pgdata

USER postgres

#COPY backup/ANS_Migration_Out_20230310 /docker-entrypoint-initdb.d/
EXPOSE 5432

CMD ["postgres", "-c", "listen_addresses=*", "-c", "max_connections=5000"]

EXPOSE 5432