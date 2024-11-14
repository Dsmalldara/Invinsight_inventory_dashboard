import { Router } from "express";
import { expenses } from "../contollers/expenseController";

const router = Router();
router.get('/', expenses)

export default router;