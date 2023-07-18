import express from "express";
import authRouter from "./auth.route.js";

const router= express.Router();

router.get('/', (req, res)=>{
    res.status(200).json({message: "server ready"})
})


router.use("/auth", authRouter);

export default router;