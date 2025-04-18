import { DataTypes, DATE } from "sequelize";
import sequelize from "../config/database";


const Category = sequelize.define("Category", {
    id : {
        type : DataTypes.NUMBER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    title : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    image : {
        type : DataTypes.STRING(500)
    },
    description : {
        type : DataTypes.TEXT("long")
    },
    status : {
        type : DataTypes.STRING(10)
    },
    position : {
        type : DataTypes.INTEGER
    },

    slug : {
        type : DataTypes.STRING,
        allowNull : false
    },
    deleted : {
        type : DataTypes.BOOLEAN
    },
    deletedAt : {
        type : DataTypes.DATE
    }
}, {
    tableName : "categories",
    timestamps : true
})

export default Category