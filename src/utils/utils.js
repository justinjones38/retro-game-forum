import bcrypt from "bcryptjs-react";

export function hashPassword(password) {
  const hash = bcrypt.hashSync(password, 8);
  return hash;
}

export function checkPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
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

export function getMonthandDate(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const joinedDate = new Date(date);
  const month = months[joinedDate.getMonth()];
  const year = joinedDate.getFullYear();
  return `${month} ${year}`;
}
