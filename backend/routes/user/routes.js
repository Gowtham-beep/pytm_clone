import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import {updateinfo} from '../../controller/user.js'
import Authenticate from "../../middlewares/authenticate.js";

const router=Router()

router.put("/updateinfo",Authenticate,asyncHandler(updateinfo))

export default router