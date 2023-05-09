FROM mysql:8.0.29
COPY data.sql /docker-entrypoint-initdb.d/init.sql
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=db_rentalcar
ENV MYSQL_USER=springuser
ENV MYSQL_PASSWORD=springtesting2202