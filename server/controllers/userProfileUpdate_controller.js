import { CustomError } from "../middleware/errorHandler.js";
import {
  updateUserPreference,
  updateUserAvatar,
} from "../models/user_model.js";

const updateAvatar = async (req, res) => {
  const { _id, imageURL } = req.body;
  const result = await updateUserAvatar(_id, imageURL);
  return res.json(result);
};

const updatePreference = async (req, res) => {
  const { _id, speaking, learning, topic } = req.body;
  if (!_id || speaking.length < 1 || learning.length < 1)
    throw CustomError.BadRequestError("All fields are required.");
  const user = await updateUserPreference(_id, speaking, learning, topic);
  return res.json(user);
};

export { updateAvatar, updatePreference };
