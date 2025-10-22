import dotenv from "dotenv";
import fastify from "fastify";
import { connectDB } from "./plugins/db";
import userRoutes from "./routes/userRoutes";
import subscriptionRoutes from "./routes/subscriptionRoutes";

dotenv.config();

const server = fastify();

server.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

server.register(userRoutes);
server.register(subscriptionRoutes);

const start = async () => {
  try {
    await connectDB();
    console.log("Database connected");
    const PORT = await server.listen({
      port: Number(process.env.PORT) || 3000,
      host: "0.0.0.0",
    });
    console.log(`Server is running on ${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
