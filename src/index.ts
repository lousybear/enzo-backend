import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { resolvers, typeDefs } from "./graphql/index";
import DatabaseConnect from "./db/DatabaseConnect";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;
const dbConnString = process.env.MONGO_URI || "";

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  app.use(cors());
  app.use(express.json());

  const dbInstance = DatabaseConnect.getInstance();
  await dbInstance.connect(dbConnString);

  app.use("/graphql", expressMiddleware(server));

  app.get("/test", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`🤖 Server is up and running at http://localhost:${port}`);
  });
};

startServer();
