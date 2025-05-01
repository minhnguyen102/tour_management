import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Tour_Category = sequelize.define("Tour", {
    tour_id : {
        type : DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references :{
            model: "tours",
            key : "id"
        }
    },
    category_id : {
        type : DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references : {
            model : "categories",
            key : "id"
        }
    },
}, {
    tableName : "tour_categories",
    timestamps: false
})



export default Tour_Category;