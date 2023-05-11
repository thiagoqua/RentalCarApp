# Pre-requeriments
1. Docker.
2. (optional) Node.
3. (optional) Java 17.
3. (optional) Maven.
---
# Run guide
I have dockerized the hole project, so it can be runned partially or totally in a container. Only the database must be always in a Docker container becouse it's the heaviest part to configure in the project if it hasn't been dockerized.
Depending on which part of the project you want to run in a container, you have to change the database's url. 
By default, the database's url is setted to run the database in a container and the rest of the project outside.
But if you want to run the backend too or the hole project in Docker, the only thing you have to do is go to the `application.properties` file (backend/src/main/resources/application.properties), comment the line above the title **URL - MYSQL DOCKER & SPRING DESKTOP** and decomment the line above the title **URL - MYSQL DOCKER & SPRING DOCKER**.
## Docker
You can run in Docker:
- Only the database (default).
- The backend + the database.
- (**TODO**) The hole project.
#### Executing only the database in Docker
1. Inside the project's root directory, go to the SQL one:  `cd backend/src/main/SQL/`
2. Build the Docker container: `docker build -t database:test .`
3. Run the container: `docker run --name db -p 3307:3306 -d database:test`
> To stop/turn off the container: `docker stop db`
> To re-run/restart the container: `docker restart db`
#### Executing the backend and the database in Docker
1. Create the network where the database and Spring will comunicate: `docker network create spring-mysql`
2. Run the steps 1 and 2 from the database running explanation. 
3. This time to run the database container we will add the network param that we just created: `docker run -d --network spring-mysql -p 3307:3306 --name db database:test`
4. Being in the SQL/ directory, go to the backend root one: `cd ../../../`
5. Build the Docker container: `docker build -t backend:test`
6. Run the container: `docker run -p 8080:8080 --network spring-mysql --name backend -d backend:test mvn spring-boot:run`
**This process will took a while becouse Maven have to install all the project's dependencies and then run it.**
> To stop/turn off the container: `docker stop backend`
> To re-run/restart the container: `docker restart backend`
## Node and Maven
**TODO**
---
# TODO: 
- finish the styles
- put the hole project in docker.
- (optional) create an admin user who can confirm the payment of the reserve
