import express  from "express";
import morgan  from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import createHTTPError from "http-errors";
import routes from "./routes/index.js";

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

//api v1 routes
app.use("/api/v1", routes);


// error handling
app.use(async(req, res, next)=>{
    next(createHTTPError.NotFound("this route does not exist"));
});
app.use( async (err, req, res, next)=>{
    res.status(err.status || 500);
    res.send({
        error : {
            status: err.status ||500,
            message: err.message
        }
    });
})

export default app;