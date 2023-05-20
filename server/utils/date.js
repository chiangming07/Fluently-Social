import dayjs from "dayjs";

const getTodayDate = () => {
  const today = dayjs();
  return today.format("YYYY/MM/DD");
};

export default getTodayDate;
