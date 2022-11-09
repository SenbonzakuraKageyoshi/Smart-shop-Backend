import bcrypt from 'bcrypt';
import { User } from "../models/models.js";
import { generateToken } from "../utils/generateToken.js";
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {
        const {userName, userEmail, userNumber, userPassword} = req.body;

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(userPassword, salt);

        const user = await User.create({userName, userEmail, userNumber, userPasswordHash: passwordHash});

        const token = generateToken(user.dataValues.id);
        
        res.json({...user.dataValues, token});
    } catch (error) {
        res.status(500).json({message: "Не удалось зарегистрироваться, пожалуйста, попробуйте позже"}); 
    }
};

const login = async (req, res) => {
    try {
        const {userEmail, userPassword} = req.body;

        const user = await User.findOne({where: {userEmail}});

        if(!user){
            return res.status(404).json({message: 'Неверный логин, телефон, или пароль'});
        };

        const isValidPass = await bcrypt.compare(userPassword, user.dataValues.userPasswordHash);

        if(!isValidPass){
            return res.status(404).json({message: 'Неверный логин, телефон, или пароль'});
        };

        const token = generateToken(user.dataValues.id);
        
        res.json({...user.dataValues, token});
    } catch (error) {
        res.status(500).json({message: "Не удалось авторизоваться, пожалуйста, попробуйте позже"}); 
    };
};

const getMe = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if(!token) {
            return res.status(404).json({message: 'Пользователь не найден'})
        };

        const {id} = jwt.verify(token, '1a2b-3c4d-5e6f-7g8h');
        
        const user = await User.findOne({where: {id}});

        if(!user){
            return res.status(404).json({message: 'Пользователь не найден'})
        };

        res.json({...user.dataValues});
    } catch (error) {
        res.status(404).json({message: "Не удалось получить данные о пользователе, пожалуйста, попробуйте позже"}); 
    };
};

const updateUser = async (req, res) => {
    try {
        const {...args} = req.body;
        await User.update(
        {
            userName: args.userName,
            userEmail: args.userEmail,
            userNumber: args.userNumber,
            userCity: args.userCity,
            userCityIndex: args.userCityIndex,
            userAdress: args.userAdress,
            paymentMethod: args.paymentMethod,
            userCardRequisites: args.userCardRequisites,
            userOrdersNumber: args.userOrdersNumber,
        },{where: {id: args.id}});

        const newUser = await User.findOne({where: {id: args.id}})
        res.json(newUser.dataValues);
    } catch (error) {
        console.log(error)
    }
}

export {register, login, getMe, updateUser};