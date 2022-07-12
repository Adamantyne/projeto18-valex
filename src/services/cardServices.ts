import dotenv from "dotenv";
import dayjs from "dayjs";
import bcrypt from "bcrypt";

import { findByCardId as findPayments } from "../repositories/paymentRepository.js";
import { findByCardId as findRecharge } from "../repositories/rechargeRepository.js";
import cardValidations from "./cardValidations.js"

dotenv.config();

import {
  findByTypeAndEmployeeId,
  TransactionTypes,
  insert,
  findById,
  Card,
} from "../repositories/cardRepository.js";
import { formatedData, encryptValue } from "../utils/cardUtuils.js";

async function postCardService(
  fullName: string,
  employeeId: number,
  type: TransactionTypes
) {
  const formatedName = formatedData("card name", fullName);
  const expirationDate = formatedData("expiration date");
  const cardNumber = formatedData("card number");
  const CVV = formatedData("CVV");
  const cryptCVV = encryptValue(CVV, "encrypt");
  console.log(CVV);

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

function activeCardValidate(cardData: Card, CVV: string) {
  const cardCVV = encryptValue(cardData.securityCode, "decrypt");
  if (CVV !== cardCVV || cardData.password) {
    let errorMessage = "";
    if (CVV !== cardCVV) errorMessage += `invalid CVV /`;
    if (cardData.password) errorMessage += `card already active /`;

    throw {
      type: "Unauthorized",
      message: errorMessage,
    };
  }
  return;
}

function authCardValidate(cardData: Card, password: string) {
  const validPassword = bcrypt.compareSync(password, cardData.password);
  const todayDate = dayjs().format("MM/YY");
  if (!validPassword || todayDate > cardData.expirationDate) {
    let errorMessage = "";
    if (todayDate > cardData.expirationDate)
      errorMessage = `card already expired /`;
    if (!validPassword) errorMessage = `invalid password /`;

    throw {
      type: "Unauthorized",
      message: errorMessage,
    };
  }
  return;
}

async function blockService(id: number, password: string, block: boolean) {
  const cardData = await cardValidations.validateCardId(id);
  cardValidations.validateCardActive(cardData);
  authCardValidate(cardData, password);
  cardValidations.validateCardExpiration(cardData);
  cardValidations.blockCardValidate(cardData, block);
}

async function balanceService(id: number) {
  const transactions = await findPayments(id);
  const recharges = await findRecharge(id);

  let balanceIn = 0;
  let balanceOut = 0;

  transactions.forEach((transaction) => {
    balanceOut -= transaction.amount;
  });
  recharges.forEach((recharge) => {
    balanceIn += recharge.amount;
  });

  const balance = balanceIn - balanceOut;

  return {
    balance,
    transactions,
    recharges,
  };
}

const cardServices = {
  postCardService,
  formattingCardName,
  activeCardValidate,
  authCardValidate,
  blockService,
  balanceService
};

export default cardServices;
