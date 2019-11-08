module.exports = {
  "type": "mongodb",
  "url": "mongodb+srv://"+process.env.MONGO_ATLAS_USER+":"+process.env.MONGO_ATLAS_PASS+"@"+process.env.MONGO_ATLAS_CLUSTER+".mongodb.net/"+process.env.MONGO_ATLAS_DB+"?retryWrites=true&w=majority",
  "useNewUrlParser": true,
  "useUnifiedTopology": true,
  "synchronize": true,
  "logging": false,
  "useNewUrlParser": true,
  "entities": ["src/entity/**/*.ts"],
  "migrations": ["src/migration/**/*.ts"],
  "subscribers": ["src/subscriber/**/*.ts"],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}