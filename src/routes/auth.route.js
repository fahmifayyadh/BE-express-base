import express from "express";
import trimRequest from "trim-request";
import { login, logout, refreshToken, register } from "../controllers/auth.controller.js";

const router= express.Router();

router.get('/', trimRequest.all,(req, res)=>{
    res.status(200).json(req.body)
})
router.route('/register').post(trimRequest.all, register);
router.route('/login').post(trimRequest.all ,login);
router.route('/logout').post(trimRequest.all ,logout);
router.route('/refresh-token').post(trimRequest.all ,refreshToken);

export default router;