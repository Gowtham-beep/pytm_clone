import {Router} from 'express'
import auth from './Auth/routes.js'
import user from './user/routes.js'


const router=Router()

router.use("/auth",auth)
router.use("/user",user)

export default router