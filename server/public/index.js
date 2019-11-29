"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const UserResolver_1 = require("./UserResolver");
const typeorm_1 = require("typeorm");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = require("jsonwebtoken");
const cors_1 = __importDefault(require("cors"));
const User_1 = require("./entity/User");
const sendRefreshToken_1 = require("./sendRefreshToken");
const auth_1 = require("./auth");
const mongodb_1 = require("mongodb");
const constants_1 = require("./constants");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    app.set("trust proxy", 1);
    console.log("process.env.MONGO_ATLAS_USER", process.env.MONGO_ATLAS_USER);
    const PORT = process.env.PORT || 4000;
    app.use(cors_1.default({
        origin: `${constants_1.frontURL}`,
        credentials: true
    }));
    app.use(cookie_parser_1.default());
    app.get("/", (_req, res) => res.send("hello"));
    app.post("/refresh_token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.cookies.jid;
        console.log(constants_1.frontURL);
        if (!token) {
            return res.send({ ok: false, accessToken: "" });
        }
        let payload = null;
        try {
            payload = jsonwebtoken_1.verify(token, process.env.REFRESH_TOKEN_SECRET);
        }
        catch (err) {
            console.log(err);
            return res.send({ ok: false, accessToken: "" });
        }
        const user = yield User_1.User.findOne({ where: { _id: new mongodb_1.ObjectId(payload.userId) } });
        if (!user) {
            return res.send({ ok: false, accessToken: "" });
        }
        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: false, accessToken: "" });
        }
        sendRefreshToken_1.sendRefreshToken(res, auth_1.createRefreshToken(user));
        return res.send({ ok: true, accessToken: auth_1.createAccessToken(user) });
    }));
    yield typeorm_1.createConnection().then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Connected to DB");
    })).catch(error => console.log(error));
    process.on('unhandledRejection', (reason, promise) => {
        console.log(promise, 'Unhandled Rejection at:', reason || reason);
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [UserResolver_1.UserResolver]
        }),
        context: ({ req, res }) => ({ req, res })
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(PORT, () => {
        console.log("frontend started on", constants_1.frontURL, "express server mode=", process.env.NODE_ENV, "on port", PORT);
    });
}))();
//# sourceMappingURL=index.js.map