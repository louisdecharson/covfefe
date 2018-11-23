#!/usr/bin/env node

const donaldURL = "https://twitter.com/realDonaldTrump/";
// PACKAGES
var request = require('request'),
    cheerio = require('cheerio'),
    program = require('commander');

program
    .option('-t, --tweet <tweet>','X th tweet to retrieve. Default is the last one. -t 1 will retrieve the penultimate.')
    .action(function() {
        if (program.tweet) {
            donaldTweetNb = program.tweet;
        } else {
            donaldTweetNb = 0;
        }
        request(donaldURL, function(err,res,html) {
            if (!err && res.statusCode == 200) {
                var $ = cheerio.load(html);
                var donaldTweet = $('p.tweet-text').eq(donaldTweetNb).text();
                var donaldTime = $('a.tweet-timestamp').eq(donaldTweetNb).children().eq(0).text();
                donaldTweet = '@realDonaldTrump ('+donaldTime+' ago)'+': "' + donaldTweet + '"';
                console.log(donaldTweet);
            } else {
                console.log('No internet connection');
            }
        });
    })
    .parse(process.argv);

