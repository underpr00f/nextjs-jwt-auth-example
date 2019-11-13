// import { getNodeEnv } from "../utils/nodeEnv";

// const env = getNodeEnv();
console.log("process.env.ENV", process.env.ENV)

// export const API_URL = process.env.NODE_ENV === "production" ? process.env.API_URL : "http://localhost:4000";
export const API_URL = (process.env.NODE_ENV === "production" && !process.env.ENV) ? process.env.API_URL : "http://localhost:4000";
// console.log("env",env)
// export const TRUE_ENV = env;
