const dns = require("dns");

// Force Node to use Google's DNS servers
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const { MongoClient } = require("mongodb");
require("dotenv").config();
console.log("URI:", process.env.MONGODB_URI);
console.log("DB_NAME:", process.env.DB_NAME);
const client = new MongoClient(process.env.MONGODB_URI);

let db;

async function connectDB() {
  try {
    await client.connect();

    db = client.db(process.env.DB_NAME);

    console.log("✅ MongoDB Atlas Connected Successfully");
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error);
    process.exit(1);
  }
}

function getDB() {
  return db;
}

module.exports = {
  connectDB,
  getDB,
};