import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import Cryptr from "cryptr";
import dayjs from "dayjs";

import cardServices from "../services/cardServices.js";

dotenv.config();

export function formatedData(typeData: string, data?: string): string {
  if (typeData === "card name") {
    return cardServices.formattingCardName(data);
  } else if (typeData === "expiration date") {
    const cardLifespan = 5;
    return dayjs().add(cardLifespan, "year").format("MM/YY");
  } else if (typeData === "card number") {
    const cardNumberMask = "63[7-9]#-####-####-###L";
    return faker.finance.creditCardNumber(cardNumberMask);
  } else if (typeData === "CVV") {
    return faker.finance.creditCardCVV();
  }
}

export function encryptValue(value: string, type: "encrypt" | "decrypt") {
  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  if (type === "encrypt") {
    return cryptr.encrypt(value);
  } else if (type === "decrypt") {
    return cryptr.decrypt(value);
  }
}

export function validateQueryParams(values:any[], names: string[]): string[] {
  const response = [];
  for (let i = 0; i < values.length; i++) {
    if (!values[i] || typeof values[i] !== "string") {
      throw {
        type: "Unprocessable Entity",
        message: `${names[i]} required ${
          typeof values[i] !== "string" ? "as string" : ""
        } in query string`,
      };
    }else{
      response.push(values[i]);
    }
  }
  return response;
}
