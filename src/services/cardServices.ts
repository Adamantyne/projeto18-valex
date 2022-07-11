import dotenv from "dotenv";
import dayjs from "dayjs";
import bcrypt from "bcrypt";

import { findByCardId as findPayments} from "../repositories/paymentRepository.js";
import { findByCardId as findRecharge} from "../repositories/rechargeRepository.js";

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



async function validateCardId(id: number) {
  const cardData = await findById(id);
  if (!cardData) {
    throw {
      type: "Not Found",
      message: "id card not found",
    };
  }
  return cardData;
}



function activeCardValidate(cardData: Card, CVV: string) {
  const cardCVV = encryptValue(cardData.securityCode, "decrypt");
  const todayDate = dayjs().format("MM/YY");
  if (
    CVV !== cardCVV ||
    cardData.password ||
    todayDate > cardData.expirationDate
  ) {
    let errorMessage = "";
    if (CVV !== cardCVV) errorMessage += `invalid CVV /`;
    if (cardData.password) errorMessage += `card already active /`;
    if (todayDate > cardData.expirationDate)
      errorMessage = `card already expired /`;

    throw {
      type: "Unauthorized",
      message: errorMessage,
    };
  }
  return;
}



function authCardValidate(
  cardData: Card,
  password: string
) {
  const validPassword = bcrypt.compareSync(password, cardData.password);
  const todayDate = dayjs().format("MM/YY");
  if (
    !validPassword ||
    todayDate > cardData.expirationDate
  ) {
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

function blockCardValidate(cardData: Card,block: boolean){
  if (
    cardData.isBlocked === block
  ) {

    throw {
      type: "Unauthorized",
      message: `card already ${block ? "blocked" : "unlocked"} /`,
    };
  }
}

async function blockService(id:number,password:string,block:boolean) {
  const cardData = await validateCardId(id);
  authCardValidate(cardData, password);
  blockCardValidate(cardData,block);
}



async function balanceService(id:number) {

  const transactions = await findPayments(id);
  const recharges = await findRecharge(id);

  let balanceIn=0;
  let balanceOut=0;

  transactions.forEach(transaction => {
    balanceOut -= transaction.amount;
  });
  recharges.forEach(recharge => {
    balanceIn += recharge.amount;
  });
  
  const balance = balanceIn - balanceOut;

  return{
    balance,transactions,recharges
  }
}



const cardServices = {
  validateCardType,
  postCardService,
  formattingCardName,
  validateCardId,
  activeCardValidate,
  blockCardValidate,
  authCardValidate,
  blockService,
  balanceService
};

export default cardServices;
