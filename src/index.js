import dotenv from "dotenv";
import app from "./app.js";
import logger from "./configs/logger.config.js";


//env config
dotenv.config();

//env variables
const PORT = process.env.PORT || 1000;

let server = app.listen(PORT, ()=>{
    logger.info('server running at port '+PORT);
})


//error handing server
const  exitHandler = ()=>{
    if (server){
        logger.info("server closed");
        process.exit(1);
    }else{
        process.exit(1);
    }
}
const unexpectedErrorHandler = (error) =>{
    logger.error(error);
    exitHandler();
} 

process.on("uncaughtException",unexpectedErrorHandler)
process.on("unhandledRejection",unexpectedErrorHandler)

//sigterm
process.on("SIGTERM", ()=>{
    if (server){
        logger.info("server closed");
        process.exit(1);
    }
})