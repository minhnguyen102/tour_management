import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const User = sequelize.define("User", {
    id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    fullname : {
        type : DataTypes.STRING(100),
        allowNull : false
    },
    email : {
        type : DataTypes.STRING(100),
        allowNull : false
    },
    password : {
        type : DataTypes.STRING(255),
        allowNull : false
    },
    tokenUser : {
        type : DataTypes.STRING(20)
    },
    avatar : {
        type : DataTypes.TEXT('long')
    },
    status : {
        type : DataTypes.STRING(20)
    },
    deleted : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    },
    deletedAt : {
        type : DataTypes.DATE
    }
}, {
    tableName : "users",
    timestamps : true
})

export default User