import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Account = sequelize.define("Account", {
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
    token : {
        type : DataTypes.STRING(20)
    },
    avatar : {
        type : DataTypes.TEXT('long')
    },
    role_id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : "roles",
            key : "id"
        }
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
    tableName : "accounts",
    timestamps : true
})

export default Account