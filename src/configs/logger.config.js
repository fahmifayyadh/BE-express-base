import winston from "winston";

const enumerateErrorFormat = winston.format((info)=>{
  if (info instanceof Error) {
    Object.assign(info, { message : info.stack});
  }
  return info;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV == "developement"?"debug":"info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    process.env.NODE_ENV=="development"? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message}) => `${level} : ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels : ["error"]
    }),
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//

export default logger;

