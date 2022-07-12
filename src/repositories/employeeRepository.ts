import { connection } from "../database.js";

export interface Employee {
  id: number;
  fullName: string;
  cpf: string;
  email: string;
  companyId: number;
  companyKey: string;
}

export interface EmployeeCards{
  id:number,
  type:string
}

export async function findById(id: number) {
  const result = await connection.query<Employee, [number]>(
    `SELECT employees.*,companies.name,companies."apiKey" as "companyKey"
    FROM employees 
    JOIN companies ON employees."companyId" = companies.id
    WHERE employees.id=$1`,
    [id]
  );

  return result.rows[0];
}

export async function findCardsById(id: number) {
  const result = await connection.query<EmployeeCards, [number]>(
    `SELECT cards.id,cards.type FROM employees
    JOIN cards ON employees.id = cards."employeeId"
    WHERE employees.id=$1;`,
    [id]
  );
  console.log(result);
  return result.rows;
}
