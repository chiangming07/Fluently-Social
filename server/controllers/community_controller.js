import { CustomError } from "../middleware/errorHandler.js";
import { queryAllUsers } from "../models/user_model.js";

const getAllUsers = async (req, res) => {
  // 若有登入給相似配對，沒登入就給所有
  // throw CustomError.BadRequestError("All fields are required.");
  console.log(req.body);
  const { speaking = [], learning = [] } = req.body;
  console.log(speaking, learning);
  const user = await queryAllUsers(speaking, learning);
  return res.json(user);
};

export { getAllUsers };
