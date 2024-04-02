import * as crypto from "crypto";
import * as util from "util";
import { generateSalt } from "./generateSalt";
const pbkdf2 = util.promisify(crypto.pbkdf2);

export const hashPassword = async (
  password: crypto.BinaryLike,
  salt?: crypto.BinaryLike
) => {
  if (!salt) {
    salt = generateSalt();
  }
  const hash = (await pbkdf2(password, salt, 1000, 64, "sha256")).toString(
    "hex"
  );
  return { salt, hash };
};
