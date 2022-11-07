import { Router } from "express";
import { register, login, getMe, updateUser } from "../controllers/authController.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/get-me', getMe);
router.post('/update', updateUser);

export default router;