import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Role = sequelize.define("Role", {
    id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    title : {
        type : DataTypes.STRING,
        allowNull : false
    },
    description : {
        type : DataTypes.TEXT('long')
    },
    permission : {
        type : DataTypes.TEXT('long')
    },
    deleted : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    },
    deletedAt : {
        type : DataTypes.DATE
    }
},{
    tableName : "roles",
    timestamps : true
})

export default Role;