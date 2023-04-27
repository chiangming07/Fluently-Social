import { v4 as uuidv4 } from "uuid";

import { Cache } from "../utils/cache.js";
import { getSocketServer } from "../socket.js";

import { CustomError } from "../middleware/errorHandler.js";

// --- 沒用到的 function --> 創房間存 Cache
const createRoom = async (socketId, partnerId) => {
  const roomId = uuidv4();
  const room = { id: roomId, users: [socketId, partnerId] };
  await Cache.set(`room:${roomId}`, JSON.stringify(room));
  return roomId;
};

// waiting list 如果有大量的等待用戶時，可能要用分頁或分區，以免一次查詢太多資料
const matchPartner = async (req, res) => {
  const { socketId, speaking, learning } = req.body;

  const myKey = `${speaking}${learning}`;
  const partnerKey = `${learning}${speaking}`;

  res.cookie("socketId", socketId);

  if (!speaking || !learning)
    throw CustomError.BadRequestError("All fields are required.");

  const doesExist = await Cache.hexists("waitingListMap", socketId);
  if (doesExist === 1) {
    throw CustomError.BadRequestError(
      "Matching in progress. Please refresh the page and select a different matching option if you wish to switch."
    );
  }

  const waitingList = await Cache.lrange(partnerKey, 0, -1);
  if (waitingList.length === 0) {
    await Cache.rpush(myKey, socketId);
    await Cache.hset("waitingListMap", socketId, 1);
    return res.json({
      msg: "Added to the waiting list. Please wait for a match.",
    });
  }

  if (waitingList.length > 0) {
    const partnerId = await Cache.lpop(partnerKey);
    const roomId = await createRoom(socketId, partnerId);

    const io = getSocketServer();
    io.emit("match", roomId);
    return res.json({ roomId });
  }
};

const clearMatch = async (req, res) => {
  const socketId = req.cookies.socketId;
  const response = await Cache.hdel("waitingListMap", socketId);

  if (response !== 1)
    throw CustomError.BadRequestError(
      "Failed to clear matching data from Redis."
    );
  res.clearCookie("socketId");
  return res.json({
    msg: "Successfully cleared the matching data in Redis.",
  });
};

export { matchPartner, clearMatch };

// sorted set version
// const getPartner = async (req, res) => {
//     const { socketId, speaking, learning } = req.body;
//     // res.cookie("socketId", socketId);
//     if (!speaking || !learning)
//       throw CustomError.BadRequestError("All fields are required.");

//     const waitingList = await showList();

//     for (let waitingJSON of waitingList) {
//       const waitingObj = JSON.parse(waitingJSON);
//       const partnerId = waitingObj.socketId;
//       const partnerSpeaking = waitingObj.speaking;
//       const partnerLearning = waitingObj.learning;
//       if (socketId === partnerId) {
//         return res.status(400).json({
//           error: "正在進行配對中，若想切換配對選擇，請刷新頁面後再次選擇",
//         });
//       }
//       if (speaking === partnerLearning && learning === partnerSpeaking) {
//         const roomId = await createRoom(socketId, partnerId);
//         const response = await Cache.zrem("waiting_list", waitingJSON);
//         if (response !== 1) {
//           return res
//             .status(500)
//             .json({ error: "成功擋住 Race condition 辣！！" });
//         }
//         const io = getSocketServer();
//         io.to(socketId).emit("create-anonymous-room", roomId);
//         io.to(partnerId).emit("create-anonymous-room", roomId);
//         return res.json({ msg: "配對成功", roomId });
//       }
//     }
//     const response = await insertList(req.body);
//     if (response !== 1) {
//       return res.status(400).json({ error: "您的資料填寫不完全，無法進行配對" });
//     }
//     return res.json({ msg: "已加入 waiting list，請稍候" });
//   };
