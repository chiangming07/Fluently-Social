import { v4 as uuidv4 } from "uuid";

// getOriginalRoomId(myId, partnerId){
//   query
//   return roomId
// }
// storeNewRoomId(myId, partnerId){
// roomId = uuidv4();
//   insert
//   return roomId
// }
const getRoomId = async (req, res) => {
  // const { myId, partnerId } = req.body;
  // console.log("myId", myId);
  // TODO: query 資料庫
  // 找到原本的 roomID
  // let roomId = await getOriginalRoomId(myId, partnerId);
  let roomId = uuidv4();
  // if (!roomId) {
  //   let roomId = await storeNewRoomId(myId, partnerId);
  // }
  // 生一個新的 roomId 並存資料庫
  //
  return res.json({ roomId });
};

export { getRoomId };
