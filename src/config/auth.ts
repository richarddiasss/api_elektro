import crypto from "crypto";
import { Request } from "express";
import * as fs from "fs";
import * as path from "path";

const PRIV_KEY = fs.readFileSync(
  path.join(__dirname, "..", "..", "id_rsa_priv.pem"),
  "utf-8"
);

const generatePassword = (password: string) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: hash,
  };
};


const checkPassword = (password: string, hash: string, salt: string) => {
  const hashFromRequest = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hashFromRequest === hash;
};

export default {
  generatePassword,
  checkPassword,
};