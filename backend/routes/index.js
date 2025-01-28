import {Router} from 'express'
import auth from './Auth/routes.js'

const router=Router()

router.use("/auth",auth)

export default router