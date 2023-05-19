import dotenv from "dotenv";
dotenv.config();

import amqp from "amqplib";
import { emitToRoom } from "../socket.js";

const consumeFromQueue = async () => {
  try {
    const connection = await amqp.connect(
      `amqp://${process.env.AMQP_USERNAME}:${process.env.AMQP_PASSWORD}@${process.env.AMQP_HOST}:${process.env.AMQP_PORT}`
    );
    const channel = await connection.createChannel();

    const exchange = "fanout_exchange";

    await channel.assertExchange(exchange, "fanout", { durable: false });

    const { queue } = await channel.assertQueue("", {
      exclusive: false,
    });

    await channel.bindQueue(queue, exchange, "");

    channel.consume(
      queue,
      (msg) => {
        if (msg) {
          const data = msg.content.toString();
          const parsedMessage = JSON.parse(data);
          if (parsedMessage.type === "match") {
            const { type, socketId, partnerId, roomId } = parsedMessage;
            emitToRoom(socketId, type, roomId);
            emitToRoom(partnerId, type, roomId);
          } else {
            const { type, roomId } = parsedMessage;
            emitToRoom(roomId, type, parsedMessage);
          }
          channel.ack(msg);
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Failed to consume messages:", error);
  }
};

const publishToExchange = async (exchange, message) => {
  try {
    const connection = await amqp.connect(
      `amqp://${process.env.AMQP_USERNAME}:${process.env.AMQP_PASSWORD}@${process.env.AMQP_HOST}:${process.env.AMQP_PORT}`
    );
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, "fanout", { durable: false });

    channel.publish(exchange, "", Buffer.from(JSON.stringify(message)));

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error("Failed to publish message:", error);
  }
};

export { consumeFromQueue, publishToExchange };
