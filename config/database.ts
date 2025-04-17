import { Sequelize } from "sequelize";
import dotenv from "dotenv"
dotenv.config();

const sequelize = new Sequelize(
 process.env.DATABASE_NAME, // database name
 process.env.DATABASE_USERNAME, 
 process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql'
  }
);

sequelize.authenticate().then(() => {
    console.log('Connect Success.');
 }).catch((error) => {
    console.error('Connect Error ', error);
 });

export default sequelize;