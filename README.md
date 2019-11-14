# jwt-auth-example with mongodb (Atlas cloud) and deploing on heroku (backend), now (frontend)

Thanks Ben Awad for Code for https://www.youtube.com/watch?v=25GS0MLT8JU


## BACKEND
## Make sure to setup MongoDB for the GraphQL server (/server) - deploy on heroku 

1. Install MongoDB and set Atlas Cloud
2. Create database 
3. Add env variables 
ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET - random variables;

MONGO_ATLAS_USER, MONGO_ATLAS_PASS,
MONGO_ATLAS_CLUSTER, MONGO_ATLAS_DB - DB-settings

FRONT_URL - your front deploy

4. These values are provided in the ormconfig.js

5. ProcFile for heroku deploy

6. package.json To locally start dev server - yarn start:dev

7. to update backend with git heroku
 - add secret variables from .env manually
 - setup git heroku with heroku manual
 - in /server directory 
 -- git add -A
 -- git commit -m "hello"
 -- git push heroku master


## FRONTEND
## Make sure to setup NextJS for the GraphQL server (/web-nextjs) - deploy on ZEIT NOW 
1. Setup now, add API_URL in .env - backend graphql entry point 
2. For deploy set secrets add:
 now secrets add api-url https://hello-world.com
3. Don't forget to specify in now.json theese secrets
4. For deploy write in console
 - now
5. package.json
    - "dev": development on localhost:3000,
    - "build": for deployment build (locally not works - incorrect path use staging),
    - "start": for deployment serve (locally not works - incorrect path use staging),
    - "type-check": for typescript,
    - "gen": if you change .graphql files need gen new graphql-hooks
    - "build:staging": for build staging like-deployment build
    - "start:staging": for start staging like-deployment server
6. For test deploy in now locally write in console
 - now dev 
 - (need add secrets to .env.build)
7. To provide process.env variables from express to global constants - add to next.config.js in   	
    env: {
      API_URL: process.env.API_URL,
      ENV: process.env.ENV
    },
8. Change graphql queries in /graphql, get graphql hooks from /generated
9. Your static in /static directory (favicon, ...etc)
10. Pages need in /pages directory (NextJS feature)
11. Components for pages in /components
12. If graphql throw undefined error, need to compare API_URL (or check conditions) - probably API_URL is undefined
