FROM mysql:latest


ENV MYSQL_ROOT_PASSWORD=password 
ENV MYSQL_DATABASE=chatapp


EXPOSE 3306