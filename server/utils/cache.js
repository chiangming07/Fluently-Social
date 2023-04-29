import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

// let tls;
// if (process.env.VER === "develop") {
//   tls = {};
// }
const Cache = new Redis({
  port: process.env.CACHE_PORT,
  host: process.env.CACHE_HOST,
  username: process.env.CACHE_USER,
  password: process.env.CACHE_PASSWORD,
  //   tls,
  db: 0, // Defaults to 0
  retryStrategy: function (times) {
    if (times < 10) {
      console.log(`Redis connection lost. Retrying in 1 second...`);
      return 1000;
    } else {
      const delay = Math.min(Math.pow(2, times - 10) * 1000, 60000);
      console.log(`Redis connection lost. Retrying in ${delay} ms...`);
      return delay;
    }
  },
});

export { Cache };
