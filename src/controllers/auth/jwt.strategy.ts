/** @format */
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { UnauthorizedError } from "../../errors";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../../.env"),
});

const secret = process.env.JWT_SECRET;
const encryptionKey = process.env.ENCRYPTION_KEY;

// Function to encrypt data
const encrypt = (text: string) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(encryptionKey),
    iv,
  );
  let encryptedString = cipher.update(text);
  encryptedString = Buffer.concat([encryptedString, cipher.final()]);
  return iv.toString("hex") + ":" + encryptedString.toString("hex");
};

// Function to decrypt data
const decrypt = (text: string) => {
  const parts = text.split(":");
  const iv = Buffer.from(parts.shift(), "hex");
  const encryptedString = Buffer.from(parts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(encryptionKey),
    iv,
  );
  let decryptedData = decipher.update(encryptedString);

  decryptedData = Buffer.concat([decryptedData, decipher.final()]);

  return decryptedData.toString();
};

// Function to encrypt the signed JWT twice
const doubleEncryptJwt = (signedToken: string) => {
  const encryptedString = encrypt(signedToken);
  return encrypt(encryptedString);
};

export const signToken = (payload: any) => {
  try {
    const signedToken = jwt.sign(payload, secret, { expiresIn: "1h" });

    return doubleEncryptJwt(signedToken);
  } catch (err) {
    console.log(err);
  }
};

export const decryptToken = (token: string) => {
  try {
    const decryptedOnce = decrypt(token);
    const decryptedTwice = decrypt(decryptedOnce);

    return jwt.verify(decryptedTwice, secret, { ignoreExpiration: false });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      // Invalid token format or signature
      throw new UnauthorizedError("Invalid token format or signature.");
    } else if (error.name === "TokenExpiredError") {
      // Token has expired
      throw new UnauthorizedError("Authorization token is expired.");
    } else {
      // Other decryption or verification errors
      throw new UnauthorizedError("Token decryption or verification failed.");
    }
  }
};
