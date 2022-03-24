# Microservices Communication


<p>
  This project has the objective of pratice the communication asynchronously between distinct micro services.
</p>

Technologies used:

- [x] TypeScript
- [x] RabbitMq
- [x] MongoDB
- [x] Logs
- [x] Swagger Doc: https://danielmarquesz.github.io/microservices-events/
- [x] Authentication
- [x] Docker

## How to run?

Create a `.env` file inside of each micro service and fill with the variables below:

- DATABASE_URL: With the MongoDB connection.
- RABBIT_MQ_URI: With the rabbitMq connection.
- JWT_SECRET: You can create a secrete for athentication.
- JWT_TIME: You can set any time here.

Then enter in the directory when the project is an run `docker-compose up`.





