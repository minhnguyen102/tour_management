import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    code : {
        type : DataTypes.STRING(20),
        allowNull : false
    },
    fullName : {
        type : DataTypes.STRING(50),
        allowNull : false
    },
    phone : {
        type : DataTypes.STRING(15),
        allowNull : false
    },
    note : {
        type : DataTypes.STRING(500)
    },
    status : {
        type : DataTypes.STRING(20)
    },
    deleted : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    },
    accept : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    },
    deletedAt : {
        type : DataTypes.DATE
    }
}, {
    tableName : "orders",
    timestamps : true
})

export default Order