import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const uri = (process.env.MONGODB_URI || "").trim();
const dbName = (process.env.DB_NAME || "wedplanDB").trim();

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

// Vercel Serverless-এ কোনো কারণে কানেকশন বন্ধ হলে স্বয়ংক্রিয়ভাবে পুনরায় কানেক্ট করা
const connectedClient = await clientPromise;
if (connectedClient.topology && connectedClient.topology.isClosed()) {
  const freshClient = new MongoClient(uri, options);
  global._mongoClientPromise = freshClient.connect();
}

const db = (await global._mongoClientPromise).db(dbName);

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: (
    process.env.BETTER_AUTH_URL || "https://wedplan-client-bay.vercel.app"
  ).trim(),
  secret: (process.env.BETTER_AUTH_SECRET || "").trim(),
  trustedOrigins: [
    "https://wedplan-client-bay.vercel.app",
    "http://localhost:3000",
  ],
  rateLimit: {
    enabled: false,
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: (process.env.GOOGLE_CLIENT_ID || "").trim(),
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET || "").trim(),
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "Customer",
        input: true,
      },
      isBlocked: {
        type: "boolean",
        defaultValue: false,
        input: false,
      },
      businessName: {
        type: "string",
        required: false,
        input: true,
      },
      subscriptionPlan: {
        type: "string",
        defaultValue: "Free",
        input: false,
      },
    },
  },
  plugins: [jwt()],
});
