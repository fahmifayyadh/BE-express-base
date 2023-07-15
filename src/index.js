import dotenv from "dotenv";
import app from "./app.js";
import logger from "./configs/logger.config.js";


//env config
dotenv.config();

//env variables
const PORT = process.env.PORT || 1000;

app.listen(PORT, ()=>{
    logger.info('server running at port '+PORT);
})

export default app;