import { DataTypes } from "sequelize";
import sequelize from "../config/database";


const Cart = sequelize.define("Cart", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id : {
        type : DataTypes.INTEGER,
        allowNull: false,
        references : {
            model : "users",
            key : "id"
        }
    },
    products : {
        type : DataTypes.TEXT('long')
    },
    deletedAt : {
        type : DataTypes.DATE
    }
}, {
    tableName : "carts",
    timestamps : true
})

export default Cart;