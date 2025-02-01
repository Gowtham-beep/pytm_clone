import { Router } from "express";
import {getBalance,transfer} from '../../controller/account.js'
import Authenticate from "../../middlewares/authenticate.js";
import asyncHandler from "../../utils/asyncHandler.js";

const router=Router()

router.get("/balance",Authenticate,asyncHandler(getBalance))
router.post("/transfer",Authenticate,asyncHandler(transfer))

export default router