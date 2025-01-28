import {Router} from 'express'
import {signin,signup,updateinfo} from '../../controller/auth.js'

const router= Router()
router.post('/signup',signup)
router.post('/signin',signin)
router.post('/updateinfo',updateinfo)

export default router