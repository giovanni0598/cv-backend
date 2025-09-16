import { FastifyInstance } from "fastify";
import { SQSClient } from "@aws-sdk/client-sqs";

export async function registerSqs(app: FastifyInstance) {
  const sqs = new SQSClient({ region: process.env.AWS_REGION });
  app.decorate("sqs", sqs);
}

declare module "fastify" {
  interface FastifyInstance {
    sqs: SQSClient;
  }
}
