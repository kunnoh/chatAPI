FROM postgres:latest

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=WRSHfzdgdd
ENV POSTGRES_DB=chatdb

# Copy the SQL script to initialize the database schema
# COPY init.sql /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port
EXPOSE 5432

CMD ["postgres"]