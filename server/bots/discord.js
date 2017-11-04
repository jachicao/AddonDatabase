'use strict';

if (!process.env['DISCORD_BOT_TOKEN']) {
  return;
}
// import the discord.js module
var Discord = require('discord.js');
var RiotVersion = require('../models/riotVersion');
var superagent = require('superagent');
var bot = new Discord.Client();

var notifyNewVersion = (version) => {
  bot.users.forEach((user) => {
    user.sendMessage("New version found :nerd:\nhttp://web.stacks.856e6bdb.svc.dockerapp.io/api/v1/riot/exe/" + version)
    .then(message => {

    })
    .catch(error => {

    })
  });
}

var checkForNewVersion = () => {
  superagent
  .get('/api/riot/exe/versions')
  .set('Accept', 'application/json')
  .end((error, response) => {
    if (error) {
      return;
    }
    var version = String(response.body[0]);
    var newVersion = new RiotVersion({ id: version });
    newVersion.save(function(error) {
      if (!error) {
        notifyNewVersion(version);
      } else {
        var split = String(response.body[0]).split('.');
        var carry = true;
        var concat = "";
        for(var i = split.length - 1; i >= 0; i--) {
          var n = Number(split[i]);
          if (carry) {
            if (n >= 255) {
            } else {
              n++;
              carry = false;
            }
          }
          if (concat === "") {
            concat = String(n);
          } else {
            concat = n + "." + concat;
          }
        }
        superagent
        .get('/api/riot/exe/' + concat)
        .end((error, response) => {
          if (error) {
            return;
          }
          var plusVersion = new RiotVersion({ id: concat });
          plusVersion.save((error) => {
            if (!error) {
              notifyNewVersion(concat);
            }
          });
        });
      }
    });
  })
};

// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
  console.log('Discord Bot is ready');
  bot.user.setUsername("ic-bot");
  bot.user.setGame("Javascript")
  checkForNewVersion();
  setInterval(checkForNewVersion, Number(process.env['DISCORD_RIOT_EXE_SCRAPER_INTERVAL']));
});

bot.on('error', (error) => {

});

// log our bot in
bot.login(String(process.env['DISCORD_BOT_TOKEN']));
