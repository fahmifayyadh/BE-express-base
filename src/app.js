import express  from "express";

const app = express();

app.get('/testing', (req, res)=>{
    res.send('Hi hehe');
})

export default app;