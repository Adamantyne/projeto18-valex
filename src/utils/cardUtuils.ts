import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

import cardServices from "../services/cardServices.js";

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