import bcrypt from "bcryptjs-react";

export function hashPassword(word) {
  let hash = bcrypt.hashSync("bacon", 8);
  return hash;
}

export function getTimeDiff(timestamp) {
  const now = new Date();
  const uploadedDate = new Date(timestamp);
  const timeDiff = now.getTime() - uploadedDate.getTime();
  const oneMinute = 1000 * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;

  if (timeDiff >= oneDay) {
    const dayDiff = Math.floor(timeDiff / oneDay);
    return dayDiff === 1 ? `${dayDiff} day ago` : `${dayDiff} days ago`;
  }

  if (timeDiff >= oneHour) {
    const hourDiff = Math.floor(timeDiff / oneHour);
    return hourDiff === 1 ? `${hourDiff} hour ago` : `${hourDiff} hours ago`;
  }

  const minDiff = Math.floor(timeDiff / oneMinute);
  return minDiff === 1 ? `${minDiff} minute ago` : `${minDiff} minutes ago`;
}
