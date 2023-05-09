# Pre-requeriments
1. Docker.
2. (optional) Node.
3. (optional) Java17.
3. (optional) Maven.
---
# Run guide
## Docker
The project can be runned completly or partially on Docker. Only the database must be in Docker becouse it's the heaviest part to configure in the project.
You can run in Docker:
- Only the database (default).
- (**TODO**) The backend + the database.
- (**TODO**) The hole project.
#### Executing the database in Docker
1. Inside the project's root directory, go to the SQL directory:  `cd backend/src/main/SQL/`
2. Build the Docker container: `docker build -t database:test .`
3. Run the container: `docker run --name db -p 3307:3306 -d database:test`
> To turn off: `docker stop db`
## Node and Maven
**TODO**
---
# TODO: 
- finish the styles
- put (backend and database) and the hole project in docker.
- (optional) create an admin user who can confirm the payment of the reserve
