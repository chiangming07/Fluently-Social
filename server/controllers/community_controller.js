import { CustomError } from "../middleware/errorHandler.js";
import { queryAllUsers } from "../models/user_model.js";

const getAllUsers = async (req, res) => {
  // 若有登入給相似配對，沒登入就給所有
  // throw CustomError.BadRequestError("All fields are required.");
  const { speaking = [], learning = [] } = req.body;
  const user = await queryAllUsers(speaking, learning);
  return res.json(user);
};

export { getAllUsers };
