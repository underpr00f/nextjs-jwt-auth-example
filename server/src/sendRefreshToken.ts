import { Response } from "express";
import { frontURL } from "./constants";


export const sendRefreshToken = (res: Response, token: string) => {
  
  const domain = frontURL && '.'+frontURL.replace(/(^\w+:|^)\/\//, '');
  console.log(domain);
  res.cookie("jid", token, {
    httpOnly: true,
    // path: "/refresh_token",
    // secure: true,
    // domain: `${domain}`,
    // maxAge: 1000 * 60 * 60 * 24 * 7,
    // secure: true,
    // path: "/",
    // maxAge: 1000 * 60 * 60 * 24 * 7,
    // path: "/refresh_token",
    // maxAge: 1000,
    // www.example.com
  });
};
