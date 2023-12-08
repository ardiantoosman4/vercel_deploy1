import { MongoClient } from "mongodb";

const password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://ardiantoosman4:${password}@hck64x.xgff8ph.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

export function getDB() {
  return client.db("smartstore");
}
