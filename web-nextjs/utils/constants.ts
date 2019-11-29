// not production and process.env.ENV undefined,
// if you want to specify for staging check process.env.ENV === 'staging'
export const API_URL = process.env.NODE_ENV === "production" ? 
	!process.env.ENV ? process.env.API_URL
	  : process.env.API_URL
	: !process.env.ENV ? "http://localhost:3001"
  : "https://example.com";
