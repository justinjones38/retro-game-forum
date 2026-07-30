import bcrypt from "bcryptjs-react";

export function hashPassword(word) {
  let hash = bcrypt.hashSync("bacon", 8);
  return hash;
}

export function getTimeDiff(timestamp) {
  const now = new Date();
  const uploadedDate = new Date(timestamp);
  console.log(now, uploadedDate);
  const timeDiff = now.getTime() - uploadedDate.getTime();
  const oneMinute = 1000 * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;

  if (timeDiff >= oneDay) {
    const dayDiff = Math.floor(timeDiff / oneDay);
    return dayDiff === 1 ? `${dayDiff} hour` : `${dayDiff} hours`;
  }

  if (timeDiff >= oneHour) {
    console.log(timeDiff, oneHour)
    const hourDiff = Math.floor(timeDiff / oneHour);
    return hourDiff === 1 ? `${hourDiff} hour` : `${hourDiff} hours`;
  }

  const minDiff = Math.floor(timeDiff / oneMinute);
  return minDiff === 1 ? `${minDiff} minutes` : `${minDiff} minutes`;
}
