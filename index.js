#!/usr/bin/env node

const donaldURL = "https://twitter.com/realDonaldTrump/";
// PACKAGES
var request = require('request'),
    cheerio = require('cheerio');

request(donaldURL, function(err,res,html) {
    if (!err && res.statusCode == 200) {
        var $ = cheerio.load(html);
        var donaldTweet = $('p.tweet-text').eq(0).text();
        var donaldTime = $('a.tweet-timestamp').eq(0).children().eq(0).text();
        donaldTweet = '@realDonaldTrump ('+donaldTime+' ago)'+': "' + donaldTweet + '"';
        console.log(donaldTweet);
    } else {
        console.log('No internet connection');
    }
});
