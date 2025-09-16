import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { CommandBus, ProfileCommand } from "../domain/commands";

export class SqsCommandBus implements CommandBus {
  constructor(private readonly sqs: SQSClient, private readonly queueUrl: string) {}
  async publish(cmd: ProfileCommand): Promise<void> {
    await this.sqs.send(new SendMessageCommand({
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify(cmd),
    }));
  }
}
