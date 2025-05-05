import { DataTypes, DATE } from "sequelize";
import sequelize from "../config/database";
import slugify from "slugify";


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
        allowNull : true
    },
    deleted : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    },
    deletedAt : {
        type : DataTypes.DATE
    }
}, {
    tableName : "categories",
    timestamps : true
})

// sinh slug
Category.beforeCreate((category) => {
    category["slug"] = slugify(`${category["title"]}-${Date.now()}`, {
        lower : true,
        strict : true
    })
})

export default Category