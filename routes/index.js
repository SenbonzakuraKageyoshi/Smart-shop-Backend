import Router from 'express';
import productsRouter from './productsRouter.js';
import authRouter from './authRouter.js';

const router = Router();

router.use('/products', productsRouter);
router.use('/auth', authRouter);

export default router;