import Cryptr from "cryptr";
import dotenv from "dotenv";
dotenv.config();

import {
  findByTypeAndEmployeeId,
  TransactionTypes,
  insert,
} from "../repositories/cardRepository.js";
import { formatedData } from "../utils/cardUtuils.js";

async function postCardService(
  fullName: string,
  employeeId: number,
  type: TransactionTypes
) {
  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  const formatedName = formatedData("card name", fullName);
  const expirationDate = formatedData("expiration date");
  const cardNumber = formatedData("card number");
  const CVV = formatedData("CVV");
  const cryptCVV = cryptr.encrypt(CVV);

  await insert({
    employeeId,
    number: cardNumber,
    cardholderName: formatedName,
    securityCode: cryptCVV,
    expirationDate,
    isVirtual: false,
    originalCardId: employeeId,
    isBlocked: true,
    type,
  });
}

function formattingCardName(name: string) {
  const names: string[] = name.split(" ");
  let middleName = "";
  for (let i = 1; i < names.length - 1; i++) {
    if (names[i].length > 2) {
      middleName = names[i][0];
      break;
    }
  }
  const formattedName = `${names[0]} ${middleName} ${names[names.length - 1]}`;
  return formattedName;
}

async function validateCardType(type: TransactionTypes, employeeId: number) {
  const card = await findByTypeAndEmployeeId(type, employeeId);
  if (card) {
    throw {
      type: "Unauthorized",
      message: `employee already has a card of the type ${type}`,
    };
  }
  return;
}

const cardServices = { validateCardType, postCardService, formattingCardName };

export default cardServices;
