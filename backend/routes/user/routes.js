import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import {updateinfo,getuserbynames,getProfile} from '../../controller/user.js'
import Authenticate from "../../middlewares/authenticate.js";

const router=Router()

router.put("/updateinfo",Authenticate,asyncHandler(updateinfo))
router.get('/users',Authenticate,asyncHandler(getuserbynames))
router.get('/users/me',Authenticate,asyncHandler(getProfile))

export default router