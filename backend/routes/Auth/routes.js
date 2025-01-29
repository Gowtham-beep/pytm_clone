import {Router} from 'express'
import {signin,signup} from '../../controller/auth.js'
import asyncHandler from '../utils/asyncHandler.js'


const router= Router()
router.post('/signup',asyncHandler(signup))
router.post('/signin',signin)


export default router