# Pre-requeriments
1. Docker.
2. (optional) Node.
3. (optional) Java 17.
3. (optional) Maven.
---
# Run guide
I have dockerized the hole project, so it can be runned partially or totally in a container. Only the database must be **always** in a Docker container becouse it's the heaviest part to configure in the project if it hasn't been dockerized.
<br/>
Depending on which part of the project you want to run in a container, you have to change the database's url. 
<br/>
By default, the database's url is setted to run the database in a container and the rest of the project outside.
<br/>
But if you want to run the backend too or the hole project in Docker, the only thing you have to do is go to the `application.properties` file (`backend/src/main/resources/application.properties`), comment the line above the title **URL - MYSQL DOCKER & SPRING DESKTOP** and decomment the line above the title **URL - MYSQL DOCKER & SPRING DOCKER**.

## Running the database
1. Inside the project's root directory, go to the SQL one:  `cd backend/src/main/SQL/`
2. Build the Docker container: `docker build -t database:test .`
3. Run the container: `docker run --name db -p 3307:3306 -d database:test`
By default, the database have only one user who is the admin, with email `admin@example.com` and password `admin`.
> To stop/turn off the container: `docker stop db`
> To re-run/restart the container: `docker restart db`

## Running with Docker
You can run in Docker:
- Only the database (mandatory).
- The backend + the database.
- The hole project.
#### Running the backend
1. Create the network where the database and Spring will comunicate: `docker network create spring-mysql`
2. Run the steps 1 and 2 from the database running explanation
3. This time to run the database container we will add the network param that we just created: `docker run -d --network spring-mysql -p 3307:3306 --name db database:test`
4. Being in the SQL/ directory, go to the backend root one: `cd ../../../`
5. Build the Docker container: `docker build -t backend:test .`
6. Run the container: `docker run -p 8080:8080 --network spring-mysql --name backend -d backend:test mvn spring-boot:run`
<br/>

**This process will took a while becouse Maven have to install all the project's dependencies and then run it.**
> To stop/turn off the container: `docker stop backend`
<br/>

> To re-run/restart the container: `docker restart backend`
#### Running the hole project
1. Follow all the previous section' steps to run the backend and the database.
2. Inside the project's root directory, go to the frontend one: `cd frontend`
3. Build the Docker container: `docker build -t frontend:test .`
4. Run the container: `docker run -d -p 5173:5173 --name frontend frontend:test`
5. Open your browser and search for `localhost:5173`
> To stop/turn off the container: `docker stop frontend`
<br/>

> To re-run/restart the container: `docker restart frontend`
## Running with Node and Maven
1. Clone the project.
2. Inside the project's root directory, go to the frontend one: `cd frontend`
3. Install the Node packages: `npm install`
4. Run the frontend with Node: `npm run dev`
5. Follow all the steps to run the database in Docker.
6. Inside the project root directory, go to the backend directory: `cd backend`
7. Run the project: `./mvnw spring-boot:run`
**This process will took a while becouse Maven have to install all the project's dependencies and then run it.**
