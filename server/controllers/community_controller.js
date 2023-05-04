import { queryAllUsers } from "../models/user_model.js";
import { Cache } from "../utils/cache.js";

const calculateJaccard = (user, otherUsers) => {
  let otherUsersTopic = otherUsers.map((otherUser) => {
    return { userId: otherUser.id, topic: otherUser.topic };
  });
  const userTopicSet = new Set(user.topic);
  const otherUsersTopicSet = otherUsersTopic.map((otherUser) => {
    return {
      userId: otherUser.userId,
      set: new Set(otherUser.topic),
    };
  });

  let scores = [];
  for (const otherUser of otherUsersTopicSet) {
    const unionSet = new Set([...userTopicSet, ...otherUser.set]);
    const intersectionSet = new Set(
      [...otherUser.set].filter((topic) => userTopicSet.has(topic))
    );
    const Jaccard = intersectionSet.size / unionSet.size;
    scores.push({
      userId: otherUser.userId,
      Jaccard,
    });
  }

  const matchedUsers = otherUsers.map((user) => {
    const matchedScore = scores.find((score) => score.userId === user.id);
    return {
      _id: user.id,
      username: user.username,
      speaking: user.speaking,
      learning: user.learning,
      topic: user.topic,
      avatar: user.avatar,
      online: user.online,
      Jaccard: matchedScore.Jaccard,
    };
  });

  matchedUsers.sort((a, b) => {
    return b.Jaccard - a.Jaccard;
  });

  return matchedUsers;
};

const getAllUsers = async (req, res) => {
  const { userId, speaking = [], learning = [], topic } = req.body;
  let users = await queryAllUsers(speaking, learning);
  if (userId) {
    const user = { userId, topic };
    const sortedUsers = await calculateJaccard(user, users);
    return res.json(sortedUsers);
  }
  return res.json(users);
};

export { getAllUsers };
