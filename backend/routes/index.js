import {Router} from 'express'
import auth from './Auth/routes.js'
import user from './user/routes.js'
import account from './Account/routes.js'


const router=Router()

router.use("/auth",auth)
router.use("/user",user)
router.use("/account",account)

export default router