import { auth, ensureMongoConnected } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

export const GET = async (req, context) => {
  await ensureMongoConnected();
  return handler.GET(req, context);
};

export const POST = async (req, context) => {
  await ensureMongoConnected();
  return handler.POST(req, context);
};
