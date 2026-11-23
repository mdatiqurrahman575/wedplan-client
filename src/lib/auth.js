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

let client = new MongoClient(uri, options);
let db = client.db(dbName);

export async function ensureMongoConnected() {
  if (!client || (client.topology && client.topology.isClosed())) {
    client = new MongoClient(uri, options);
    db = client.db(dbName);
  }
  await client.connect();
}

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: (process.env.BETTER_AUTH_URL || "https://vercel.app").trim(),
  secret: (process.env.BETTER_AUTH_SECRET || "").trim(),
  trustedOrigins: ["https://vercel.app", "http://localhost:3000"],
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
