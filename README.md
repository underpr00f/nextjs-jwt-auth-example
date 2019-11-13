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
3. For deploy write in console
 now
4. package.json
    "dev": development on localhost:3000,
    "build": for deployment build,
    "start": for deployment serve,
    "type-check": for typescript,
    "gen": if you change .graphql files need gen new graphql-hooks
5. Change graphql queries in /graphql, get graphql hooks from /generated
6. Your static in /static directory (favicon, ...etc)
7. Pages need in /pages directory (NextJS feature)
8. Components for pages in /components

