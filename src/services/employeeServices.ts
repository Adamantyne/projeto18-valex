import { findById } from "../repositories/employeeRepository.js";

async function validateEmployee(apiKey: string, employeeId: number) {
  const employeeInfos = await findById(employeeId);
  if (!employeeInfos) {
    throw {
      type: "Not Found",
      message: "employee not found",
    };
  } else if (!apiKey || apiKey !== employeeInfos.companyKey) {
    throw {
      type: "Unprocessable Entity",
      message: "invalid api key or the worker doesn't work at the company",
    };
  }
  return employeeInfos;
}

const employeeServices = { validateEmployee };

export default employeeServices;