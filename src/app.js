import express  from "express";
import morgan  from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";

const app = express();

//morgan
if (process.env.NODE_ENV=='production') {
    app.use(morgan("dev"));
}

//helmet
app.use(helmet());

//parse json request body
app.use(express.json());

//parse json request body
app.use(express.urlencoded({ extends : true}));

//sanitize request data
app.use(mongoSanitize());

//enable cookie parsher
app.use(cookieParser());

//gzip compression
app.use(compression());

//file-upload
app.use(fileUpload({
    useTempFiles : true
}));

//cors
app.use(cors());

app.post('/testing', (req, res)=>{
    res.send(res.body);
})

export default app;