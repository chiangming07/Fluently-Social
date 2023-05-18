import { v4 as uuidv4 } from "uuid";

import { Cache } from "../utils/cache.js";
import { publishToExchange } from "../utils/pubsub.js";

import { CustomError } from "../middleware/errorHandler.js";

const addToWaitingList = async (myKey, socketId) => {
  try {
    await Cache.rpush(myKey, socketId);
    await Cache.hset("waitingListMap", socketId, 1);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const createAnonymousChatRoom = async (socketId, partnerId) => {
  const roomId = uuidv4();
  await Cache.hset("anonymousChatRoom", socketId, roomId, partnerId, roomId);
  return roomId;
};

// waiting list 如果有大量的等待用戶時，可能要用分頁或分區，以免一次查詢太多資料
const matchPartner = async (req, res) => {
  const { socketId, speaking, learning } = req.body;

  const myKey = `${speaking}${learning}`;
  const partnerKey = `${learning}${speaking}`;

  const matchingData = { myKey, socketId };
  res.cookie("match", JSON.stringify(matchingData), {
    maxAge: 1000 * 60 * 60 * 24,
  });

  if (!speaking || !learning)
    throw CustomError.BadRequestError("All fields are required.");

  const doesExist = await Cache.hexists("waitingListMap", socketId);
  if (doesExist === 1) {
    throw CustomError.BadRequestError(
      'Matching in progress. Please click "UNMATCH" below and select a different matching option if you wish to switch.'
    );
  }

  const waitingList = await Cache.lrange(partnerKey, 0, -1);

  if (waitingList.length === 0) {
    const success = await addToWaitingList(myKey, socketId);
    // FIXME: 以下要寫嗎？還是報錯直接丟給最外層就好
    if (!success) {
      return res.status(500).json({
        error: "Failed to add user to waiting list.",
      });
    }

    return res.json({
      msg: "Added to the waiting list. Please wait for a match.",
    });
  }

  if (waitingList.length > 0) {
    await Cache.hdel("waitingListMap", socketId);
    const partnerId = await Cache.lpop(partnerKey);

    if (partnerId === null) {
      await addToWaitingList(myKey, socketId);
      return res.json({
        msg: "Added to the waiting list. Please wait for a match.",
      });
    }

    await Cache.hdel("waitingListMap", partnerId);

    const roomId = await createAnonymousChatRoom(socketId, partnerId);
    const message = { type: "match", socketId, partnerId, roomId };
    await publishToExchange("fanout_exchange", message);
    return res.json({ roomId });
  }
};

const clearMatch = async (req, res) => {
  const { socketId, myKey } = JSON.parse(req.cookies.match);
  const result = await Cache.hdel("waitingListMap", socketId);
  const response = await Cache.lrem(myKey, 0, socketId);
  if (result !== 1 || response !== 1)
    throw CustomError.BadRequestError(
      "Failed to clear matching data from Redis."
    );
  res.clearCookie("match");

  return res.json({
    msg: "Successfully cleared the matching data in Redis.",
  });
};

export { matchPartner, clearMatch };
