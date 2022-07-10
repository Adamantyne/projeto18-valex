import { connection } from "../database.js";

export interface Employee {
  id: number;
  fullName: string;
  cpf: string;
  email: string;
  companyId: number;
  companyKey: string;
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
