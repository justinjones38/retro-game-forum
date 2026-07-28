import bcrypt from "bcryptjs-react";

export function hashPassword(word) {
  let hash = bcrypt.hashSync('bacon', 8);
  return hash;
}