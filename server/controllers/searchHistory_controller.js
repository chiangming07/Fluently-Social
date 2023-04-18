import { queryHistory } from "../models/message_model.js";

const searchHistory = async (req, res) => {
  try {
    const { roomId, keyword } = req.query;
    const searchResult = await queryHistory(roomId, keyword);
    return res.json(searchResult);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export { searchHistory };
