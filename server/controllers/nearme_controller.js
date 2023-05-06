import { queryNearbyUsers } from "../models/user_model.js";
import { Cache } from "../utils/cache.js";
import axios from "axios";

import { CustomError } from "../middleware/errorHandler.js";

const reverseGeocode = async (latitude, longitude) => {
  const response = await axios(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
    // &localityLanguage=zh
  );
  if (response.status !== 200) {
    throw CustomError.BadRequestError(
      `Unable to detect location! status: ${response.description}`
    );
  }
  const { city, locality, countryCode } = response.data;
  return { city, locality, countryCode };
};

const getNearbyUsers = async (req, res) => {
  let { userId, latitude, longitude } = req.body;

  // 如果用戶數夠多，再細分成 city 甚至是 locality，目前都是用 countryCode 作為 Key
  const { city, locality, countryCode } = await reverseGeocode(
    latitude,
    longitude
  );

  const geoaddResponse = await Cache.geoadd(
    countryCode,
    longitude,
    latitude,
    userId
  );
  if (geoaddResponse !== 0 && geoaddResponse != 1) {
    throw CustomError.BadRequestError("Unable to update location.");
  }

  const meAndNearbyUsers = await Cache.geosearch(
    countryCode,
    "FROMMEMBER",
    userId,
    "BYRADIUS",
    50,
    "km",
    "ASC"
  );

  if (!meAndNearbyUsers.length) {
    return res.json({
      msg: "No one nearby.",
      city,
      locality,
      nearbyUsersData,
    });
  }

  const nearbyUsers = meAndNearbyUsers.filter((id) => id !== userId);

  const nearbyUsersData = await queryNearbyUsers(nearbyUsers);

  return res.json({
    msg: "Location updated successfully.",
    city,
    locality,
    nearbyUsersData,
  });
};

export { getNearbyUsers };
