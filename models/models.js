import { DataTypes } from "sequelize";
import sequelize from '../db.js';

const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    userName: {type: DataTypes.STRING, allowNull: false},
    userEmail: {type: DataTypes.STRING, allowNull: false},
    userNumber: {type: DataTypes.STRING, allowNull: false},
    userPasswordHash: {type: DataTypes.STRING, allowNull: false},
    userCity: {type: DataTypes.STRING, allowNull: false, defaultValue: 'Не указан'},
    userCityIndex: {type: DataTypes.STRING, allowNull: false, defaultValue: 'Не указан'},
    userAdress: {type: DataTypes.STRING, allowNull: false, defaultValue: 'Не указан'},
    paymentMethod: {type: DataTypes.STRING, allowNull: false, defaultValue: 'Не указан'},
    userCardRequisites: {type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    userOrdersNumber: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
});

const Product = sequelize.define('Product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    productName: {type: DataTypes.STRING, allowNull: false},
    productCategory: {type: DataTypes.STRING, allowNull: false},
    productPrice: {type: DataTypes.STRING, allowNull: false},
    productNumber: {type: DataTypes.INTEGER, allowNull: false},
    isHit: {type: DataTypes.BOOLEAN, allowNull: true},
    isNew: {type: DataTypes.BOOLEAN, allowNull: true},
    imageSrc: {type: DataTypes.STRING},
});

const UserProduct = sequelize.define('UserProduct', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    productNumber: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
});

const UserLike = sequelize.define('UserLike', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
});

User.belongsToMany(Product, {through: UserProduct});
Product.belongsToMany(User, {through: UserProduct});

UserProduct.belongsTo(User, {foreignKey: 'UserId'});
UserProduct.belongsTo(Product, {foreignKey: 'ProductId'});

User.belongsToMany(Product, {through: UserLike});
Product.belongsToMany(User, {through: UserLike});

UserLike.belongsTo(User, {foreignKey: 'UserId'});
UserLike.belongsTo(Product, {foreignKey: 'ProductId'});

export {
    User, Product, UserProduct, UserLike
}