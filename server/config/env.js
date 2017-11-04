'use strict';

module.exports = function() {
  const app = this;
  if (app.get('env') === 'production') {
    console.log('Docker found!');
  } else {
    require('dotenv').config();
  }

  process.env['DISCORD_RIOT_EXE_SCRAPER_INTERVAL']        = 1000 * 60 * 15;

  process.env['RIOT_EXE_SCRAPER_HOST']                    = 'http://l3cdn.riotgames.com';
  process.env['RIOT_EXE_SCRAPER_COMPRESSED_FILE_NAME']    = 'League of Legends.exe.compressed';
  process.env['RIOT_EXE_SCRAPER_UNCOMPRESSED_FILE_NAME']  = 'League of Legends.exe';
  process.env['RIOT_EXE_SCRAPER_URL_VERSIONS']            = '/releases/live/projects/lol_game_client/releases/releaselisting_OC1';
  process.env['RIOT_EXE_SCRAPER_URL_EXE']                 = '/releases/live/projects/lol_game_client/releases/%s/files/League of Legends.exe.compressed';

  process.env['CHAMPION_SCRAPER_INTERVAL']                = 1000 * 60 * 60;
  process.env['CHAMPION_SCRAPER_HOST']                    = 'http://ddragon.leagueoflegends.com';
  process.env['CHAMPION_SCRAPER_URL_VERSIONS']            = '/api/versions.json';
  process.env['CHAMPION_SCRAPER_URL_CHAMPIONS']           = '/cdn/%s/data/en_US/champion.json';
  process.env['CHAMPION_SCRAPER_URL_CHAMPION_SPLASH']     = '/cdn/img/champion/splash/%s_0.jpg';
  process.env['CHAMPION_SCRAPER_URL_CHAMPION_LOADING']    = '/cdn/img/champion/loading/%s_0.jpg';
  process.env['CHAMPION_SCRAPER_URL_CHAMPION_SQUARE']     = '/cdn/%s/img/champion/%s.png';

  global.getServiceRoute = (service) => {
    return '/api/v1/' + service;
  }
}
