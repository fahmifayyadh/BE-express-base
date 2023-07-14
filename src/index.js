import dotenv from "dotenv";
import app from "./app.js";


//env config
dotenv.config();

//env variables
const PORT = process.env.PORT || 1000;

app.listen(PORT, ()=>{
    console.log('server running at port '+PORT);
})

export default app;