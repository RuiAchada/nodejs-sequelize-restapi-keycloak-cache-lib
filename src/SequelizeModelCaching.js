const SequelizeClassMethodsCaching = require("./SequelizeClassMethodsCaching.js");
const SequelizeInstanceMethodsCaching = require("./SequelizeInstanceMethodsCaching.js");
// import RedisCache from './RedisCache.js';

// specify this _redisDBClient global variable for app's life time access redis client
// let _redisDBClient = new RedisCache(null, 'sequelizeModelCachePrefixKey', null);
class SequelizeModelCaching {
  static redisDBClient;
  constructor() {}

  // enable caching for fast querying Sequelize model
  static enableCaching(sequelizeModel) {
    //add cache function to class method
    sequelizeModel.cache = function (loggedInUserId, cid) {
      return SequelizeClassMethodsCaching.buildClassMethodsForCaching(
        SequelizeModelCaching.redisDBClient,
        sequelizeModel,
        loggedInUserId,
        cid
      );
    };
    //add cache function to instance method
    sequelizeModel.prototype.cache = function () {
      return SequelizeInstanceMethodsCaching.buildInstanceMethodsForCaching(
        SequelizeModelCaching.redisDBClient,
        sequelizeModel
      );
    };
  }
}

module.exports = SequelizeModelCaching;
