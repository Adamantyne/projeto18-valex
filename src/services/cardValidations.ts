import dotenv from "dotenv";
import dayjs from "dayjs";


import {
  findByTypeAndEmployeeId,
  TransactionTypes,
  insert,
  findById,
  Card,
} from "../repositories/cardRepository.js";
import { formatedData, encryptValue } from "../utils/cardUtuils.js";

dotenv.config();

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

async function validateCardUnlock(isBlocked: boolean) {
  if (isBlocked) {
    throw {
      type: "Unauthorized",
      message: "card is block",
    };
  }
}

async function validateCardActive(cardData: Card) {
  if (!cardData.password) {
    throw {
      type: "Unauthorized",
      message: "card not active",
    };
  }
}

function validateCardExpiration(cardData: Card) {
  const todayDate = dayjs().format("MM/YY");
  if (todayDate > cardData.expirationDate) {
    throw {
      type: "Unauthorized",
      message: `card already expired /`,
    };
  }
  return;
}

function blockCardValidate(cardData: Card, block: boolean) {
  if (cardData.isBlocked === block) {
    throw {
      type: "Unauthorized",
      message: `card already ${block ? "blocked" : "unlocked"} /`,
    };
  }
}

const cardValidations = {
  validateCardType,
  validateCardId,
  blockCardValidate,
  validateCardExpiration,
  validateCardUnlock,
  validateCardActive,
};

export default cardValidations;
