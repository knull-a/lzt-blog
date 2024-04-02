import * as crypto from "crypto";

export const generateSalt = () => crypto.randomBytes(16).toString("hex");
