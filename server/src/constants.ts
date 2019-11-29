require('dotenv').config();

export const frontURL = process.env.NODE_ENV && 
	(process.env.NODE_ENV === "production") ? process.env.FRONT_URL 
: process.env.NODE_ENV && 
	(process.env.NODE_ENV === "staging") ? "https://frontend.test"
: "http://localhost:3000";
