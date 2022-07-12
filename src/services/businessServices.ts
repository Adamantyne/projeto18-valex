import { findById } from "../repositories/businessRepository.js";

async function validateBusiness(id: number, cardType: string) {
  const businessesData = await findById(id);
  if (!businessesData) {
    throw {
      type: "Not Found",
      message: "business not found",
    };
  } else if (businessesData.type !== cardType) {
    throw {
      type: "Unauthorized",
      message: "business and card types are different",
    };
  }
}

const businessService = { validateBusiness };

export default businessService;
