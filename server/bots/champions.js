'use strict';

const requestPromise = require('request-promise');
const stringFormat = require("sprintf-js").sprintf;
const championModel = require('../services/champion/model');
const riotVersionModel = require('../services/riotVersion');

module.exports = function() {
  const app = this;

  var storeChampions = (version) => {
    console.log('New Riot Version: ' + version);
    requestPromise({
        method: 'GET',
        baseUrl: process.env['CHAMPION_SCRAPER_HOST'],
        uri: stringFormat(process.env['CHAMPION_SCRAPER_URL_CHAMPIONS'], version),
        json: true
      })
    .then((response) => {
      var data = response.data;
      var currentChampions = [];
      var keyValue = [];
      championModel.find({}, (error, champions) => {
        if (champions) {
          currentChampions = champions;
        }
        currentChampions.forEach((championInfo) => {
          keyValue[championInfo.id] = championInfo;
        });
        for (var key in data) {
          var championData = data[key];
          if (keyValue[championData.id]) {
            championModel
              .findByIdAndUpdate(keyValue[championData.id]._id, { squareUrl: process.env['CHAMPION_SCRAPER_HOST'] + stringFormat(process.env['CHAMPION_SCRAPER_URL_CHAMPION_SQUARE'], version, championData.id) }, (error) => {  });
          } else {
            console.log('New champion found: ' + championData.name);
            var newChampion = new championModel({
              name: championData.name,
              id: championData.id,
              roles: championData.tags,
              splashUrl: process.env['CHAMPION_SCRAPER_HOST'] + stringFormat(process.env['CHAMPION_SCRAPER_URL_CHAMPION_SPLASH'], championData.id),
              loadingUrl: process.env['CHAMPION_SCRAPER_HOST'] + stringFormat(process.env['CHAMPION_SCRAPER_URL_CHAMPION_LOADING'], championData.id),
              squareUrl: process.env['CHAMPION_SCRAPER_HOST'] + stringFormat(process.env['CHAMPION_SCRAPER_URL_CHAMPION_SQUARE'], version, championData.id)
            });
            newChampion.save((error, champion) => {

            });
          }
        }
      });
    })
    .catch((error) => {
      console.log('Error getting Riot champions: ');
      console.log(error);
    });
  }

  var getVersion = () => {
    requestPromise({
        method: 'GET',
        baseUrl: process.env['CHAMPION_SCRAPER_HOST'],
        uri: process.env['CHAMPION_SCRAPER_URL_VERSIONS'],
        json: true
      })
    .then((response) => {
      var thisVersion = String(response[0]);
      var newVersion = new riotVersionModel({ id: thisVersion });
      newVersion.save(function(error) {
        if (!error) {
          storeChampions(thisVersion);
        } else {
          console.log('New Riot Version not found');
        }
      });
    })
    .catch((error) => {
      console.log('Error getting Riot version: ');
      console.log(error);
    });
  }
  getVersion();
  setInterval(getVersion, Number(process.env['CHAMPION_SCRAPER_INTERVAL']));
}
