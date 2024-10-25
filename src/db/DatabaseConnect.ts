import mongoose, { Mongoose } from "mongoose";

export default class DatabaseConnect {
  private static instance: DatabaseConnect;
  private mongoClient: Mongoose | null = null;

  private constructor() {}

  public static getInstance(): DatabaseConnect {
    if (!DatabaseConnect.instance) {
      DatabaseConnect.instance = new DatabaseConnect();
    }
    return DatabaseConnect.instance;
  }

  public async connect(uri: string): Promise<Mongoose> {
    if (this.mongoClient) {
      return this.mongoClient;
    }

    try {
      this.mongoClient = await mongoose.connect(uri, {
        dbName: "superzero",
      });
      console.log("Connected to MongoDB");
      return this.mongoClient;
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }

  public getClient(): Mongoose | null {
    return this.mongoClient;
  }
}
