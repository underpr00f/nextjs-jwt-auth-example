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

6. package.json To locally start dev server 
 - yarn start:dev

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


## STAGING MODE
  #Backend package.json
    "start:staging": "NODE_ENV=staging nodemon --exec ts-node src/index.ts", frontend "https://frontend.test"
  #Frontend package.json
    "build:staging": "ENV=staging next build", backend deployment
    "start:staging": "ENV=staging next start", backend deployment
    "dev:staging": "ENV=staging NODE_TLS_REJECT_UNAUTHORIZED=0 next", backend "https://example.com"
##TO START NGINX
sudo nano /etc/nginx/sites-available/example.com
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
sudo -i gedit /etc/hosts
sudo nginx -t && sudo nginx -s reload

##TO REMOVE FROM NGINX
sudo rm /etc/nginx/sites-enabled/example.loc
sudo rm /etc/nginx/sites-available/example.loc

##TO ADD CERT (DON'T forget to add sert to frontend like frontendsert)
/Projects/nextjs-jwt-auth-example/jwt-auth-example/server/src$ mkcert -install
/Projects/nextjs-jwt-auth-example/jwt-auth-example/server/src$ mkcert examplesert example.com localhost 127.0.0.1 ::1
##ADD certificate and key .pem files to config (Backend and Frontend)
/Projects/nextjs-jwt-auth-example/jwt-auth-example/server/src$ sudo nano /etc/nginx/sites-available/example.com
/Projects/nextjs-jwt-auth-example/jwt-auth-example/server/src$ sudo nginx -t && sudo nginx -s reload

##THIS WORKS WITH ATTENTION IN OPERA!    

##NGINX CONFIG sites-available/example.com
 #Backend
server {
   listen       80;
   listen [::]:80;
   server_name example.com;

   # force redirect http to https
   rewrite ^ https://$http_host$request_uri? permanent;    
}
server {
  listen 443 ssl;
  listen [::]:443 ssl;

  ssl_certificate /home/preved/Projects/nextjs-jwt-auth-example/jwt-auth-example/server/src/examplesert+4.pem;
  ssl_certificate_key /home/preved/Projects/nextjs-jwt-auth-example/jwt-auth-example/server/src/examplesert+4-key.pem;

  server_name example.com;
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-NginX-Proxy true;
    proxy_pass http://localhost:4000/;
    proxy_ssl_session_reuse off;
    proxy_set_header Host $http_host;
    proxy_cache_bypass $http_upgrade;
    proxy_redirect off;
  }

  error_log /var/log/nginx/error.log;
  access_log /var/log/nginx/access.log;
}

 #Frontend
server {
  listen       80;
   server_name frontend.test;

   # force redirect http to https
   rewrite ^ https://$http_host$request_uri? permanent;    
}
server {
  listen 443 ssl;

  ssl_certificate /home/preved/Projects/nextjs-jwt-auth-example/jwt-auth-example/web-nextjs/frontendsert+4.pem;
  ssl_certificate_key /home/preved/Projects/nextjs-jwt-auth-example/jwt-auth-example/web-nextjs/frontendsert+4-key.pem;

  server_name frontend.test;
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-NginX-Proxy true;
    proxy_pass http://localhost:3000/;
    proxy_ssl_session_reuse off;
    proxy_set_header Host $http_host;
    proxy_cache_bypass $http_upgrade;
    proxy_redirect off;
  }

  error_log /var/log/nginx/error.log;
  access_log /var/log/nginx/access.log;
}

