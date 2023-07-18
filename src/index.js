import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
import logger from "./configs/logger.config.js";


//env config
dotenv.config();

//env variables
const {DATABASE_URL} = process.env;
const PORT = process.env.PORT || 1000;

let server = app.listen(PORT, ()=>{
    logger.info('server running at port '+PORT);
})

//mongodb connection
mongoose.connection.on('error', (err)=>{
    logger.error('Error connection to mongoDB');
})
mongoose.connect(DATABASE_URL, {
    useNewUrlParser : true,
    useUnifiedTopology :true
}).then(()=>{ 
    logger.info("connected to mongoDB");
});

//mongo DB Debug mode
if(process.env.NODE_ENV !== 'production'){
    mongoose.set("debug", true);
}

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
process.on("SIGTERM", ()=> {
    if (server){
        logger.info("server closed");
        process.exit(1);
    }
})