import { Product, UserProduct, UserLike } from "../models/models.js";

const getProducts = async (req, res) => {
    try {
        let { page } = req.query;

        const newQuery = {...req.query};
        delete newQuery.page;

        page = page || 1;
        const limit = 20;
        let offset = page * limit - limit;

        const products = await Product.findAll({where: {...newQuery}, limit, offset});

        res.json(products);
    } catch (error) {
        console.log({message: "Ошибка получения продуктов"});
    };
};

const getProduct = async (req, res) => {
    try {
        const { id } = req.body;

        const product = await Product.findOne({where: {id}});
        
        res.json(product);
    } catch (error) {
        console.log({message: "Ошибка получения продукта"});
    };
};

const addProductToCart = async (req, res) => {
    try {
        const {UserId, ProductId} = req.body;

        await UserProduct.create({UserId, ProductId});

        res.json({message: "Продукт добавлен в корзину"});
    } catch (error) {
        console.log({message: "Ошибка добавления продукта в корзину, пожалуйста, попробуйте позже"});
    };
};

const removeProductFromCart = async (req, res) => {
    try {
        const {UserId, ProductId} = req.body;

        await UserProduct.destroy({where: {UserId, ProductId}});

        res.json({message: "Продукт удален из корзины"});
    } catch (error) {
        console.log({message: "Ошибка удаления продукта из корзины, пожалуйста, попробуйте позже"});
    };
};

const getProductsFromCart = async (req, res) => {
    try {
        let { page } = req.body;

        page = page || 1;
        const limit = 20;
        let offset = page * limit - limit;

        const cartProducts = await UserProduct.findAll({include: [{model: Product}], limit, offset});

        res.json(cartProducts);
    } catch (error) {
        console.log({message: "Ошибка получения продуктов в корзины"});
    };
};

const addProductToLiked = async (req, res) => {
    try {
        const {UserId, ProductId} = req.body;

        await UserLike.create({UserId, ProductId});

        res.json({message: "Продукт добавлен в понравившиеся"});
    } catch (error) {
        res.json({message: "Ошибка добавления продукта в понравившиеся, пожалуйста, попробуйте позже"});
    };
};

const removeProductFromLiked = async (req, res) => {
    try {
        const {UserId, ProductId} = req.body;

        await UserLike.destroy({where: {UserId, ProductId}});

        res.json({message: "Продукт удален из понравившихся"});
    } catch (error) {
        res.json({message: "Ошибка удаления продукта их понравившихся, пожалуйста, попробуйте позже"});
    };
};

const getProductsFromLiked = async (req, res) => {
    try {
        let { page, isObject, UserId } = req.query;

        page = page || 1;
        const limit = 20;
        let offset = page * limit - limit;

        if(isObject){
            const likedProducts = await UserLike.findAll({where: {UserId}});

            const userLikes = {};

            likedProducts.forEach((item) => {
                userLikes[item.ProductId] = true;
            });

            return res.json(userLikes);
        };
        
        const likedProducts = await UserLike.findAll({where: {UserId}, include: [{model: Product}], limit, offset});
        const likedProductsLength = await UserLike.findAll({where: {UserId}});

        res.json({likedProducts: likedProducts, contentLength: likedProductsLength.length});
    } catch (error) {
        res.json({message: "Ошибка получения понравившихся продуктов"});
    };
};

const addProductInCartNumber = async (req, res) => {
    try {
        const { ProductId } = req.body;

        await UserProduct.increment({productNumber: 1}, { where: { ProductId } })

        res.json({message: "Количество продукта увеличено"});
    } catch (error) {
        res.json({message: "Ошибка увеличения количества продукта, пожалуйста, попробуйте позже"});
    };
};

const removeProductInCartNumber = async (req, res) => {
    try {
        const { ProductId } = req.body;

        await UserProduct.decrement({productNumber: 1}, { where: { ProductId } });

        res.json({message: "Количество продукта уменьшено"});   
    } catch (error) {
        res.json({message: "Ошибка уменьшения количества продукта, пожалуйста, попробуйте позже"});
    };
};

export {
    getProducts, 
    getProduct, 
    addProductToCart, 
    removeProductFromCart, 
    getProductsFromCart, 
    addProductToLiked, 
    removeProductFromLiked, 
    getProductsFromLiked, 
    removeProductInCartNumber, 
    addProductInCartNumber
}