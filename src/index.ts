import "express-async-errors";
import express,{json} from "express";
import cors from "cors";
import chalk from "chalk";

import router from "./routes/index.js";
import handleError from "./middlewares/handleError.js";

const app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(handleError);

const port:number = +process.env.PORT || 5000;
app.listen(port, () => {
  console.log(chalk.blue(`Server is up on port: ${port}`));
});