import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Tour = sequelize.define("Tour", {
    id : {
        type : DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title : {
        type : DataTypes.STRING, // <=> varchar(255)
        allowNull: false
    }, 
    code : {
        type : DataTypes.STRING(10),
    },
    images : {
        type : DataTypes.TEXT('long')
    },
    price : {
        type : DataTypes.INTEGER
    },
    discount : {
        type : DataTypes.INTEGER
    },
    information : {
        type : DataTypes.TEXT('long')
    },
    schedule : {
        type : DataTypes.TEXT('long')
    },
    timeStart : {
        type : DataTypes.DATE
    },
    stock : {
        type : DataTypes.INTEGER
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
    tableName : "tours",
    timestamps: true
})

export default Tour;