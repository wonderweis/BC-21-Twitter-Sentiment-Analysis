#!usr/bin/env node
'use strict';

require('dotenv').config();
let chalk = require('chalk');
let clear = require('clear');
let CLI = require('clui');
let figlet = require('figlet');
let fs = require('fs');
let Table = require('cli-table');
let Twitter = require('twitter');
let watson = require('watson-developer-cloud');
let json2csv =  require('json2csv');
let wordsFrequency = require('./wordfrequency.js')
let https = require('https');
let requireReadLine = require("readline");
let readline = requireReadLine.createInterface({
	input: process.stdin, output: process.stdout
});


let client = new Twitter ({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token_key: process.env.TOKEN_KEY,
	access_token_secret: process.env.TOKEN_SECRET
});

let tone_analyzer = watson.tone_analyzer({
  username: process.env.username,
  password: process.env.username,
  version: 'v3',
  version_date: '2016-05-19 '
});


let table = new Table({
    head: [chalk.yellow('Words'), chalk.yellow('Frequency')], 
    colWidths: [30, 20]
});



//User Interface Template..................
clear();
console.log(
	chalk.yellow(
		figlet.textSync(
			'TweetzAnalyzer', { horizontalLayout: 'medium' }  
			)
		)
	);
console.log(
	chalk.yellow(
		figlet.textSync(
			'CONSOLE APP' , { horizontalLayout: 'medium' }
			)
		) 
	);
console.log(chalk.red('+-----------------------------------------------------------------------------+'));
console.log(chalk.green('+.......................DEVELOPED BY CHIDUBEM EMMANUEL........................+'));
console.log(chalk.green('+.......................For ANDELA BOOTCAMP C21 2017..........................+'));
console.log(chalk.red('+-----------------------------------------------------------------------------+'));
console.log("             A console app that use Twitter API to fetch tweets\n \
            for a particular user and save them in JSON file.\n \
            Perform a word-frequency analysis and list the words with\n \
            their frequency starting from the highest to the lowest.");
console.log(chalk.red('+-----------------------------------------------------------------------------+'));

//FUNCTION TO START THE APP


//appStart();
const appStart = function () {
	console.log('')
	readline.question(chalk.grey('Enter your twitter handle or screen_name: '), function(Handle) {
		if (Handle) {
			readline.question(chalk.grey('Enter the number of tweets you want to analyse: '), function(Counter) {
				if (Counter) {

					console.log(chalk.yellow('Verifying details....'));
					console.log(chalk.red('+-----------------------------------------------------------------------------+'));

					client.get('statuses/user_timeline', {screen_name: Handle, count: Counter}, function(error, tweets, response) {
						if (!error) {
							let tweet_length = tweets.length;
							let tweetLog = [];


							for (let i=0; i < tweet_length; i++) {
								let tweet = tweets[i];
								tweetLog += tweet.text + " ";
								console.log(chalk.grey("....fetching tweets: "+ Math.round((i+1)/tweet_length * 100).toString() + "%"))
							}
							let obj = {tweet: tweetLog}
							fs.writeFile('tweets.json', JSON.stringify(obj) , function(err) {
								if (err) {
									console.log(err);
								}
							});
							

							console.log(chalk.blue('Your Tweets were fetched successfully and stored in "tweets.json"'));
							console.log('');
							selectAnalysis();


							function selectAnalysis () {
								console.log('');
								console.log(chalk.bgGreen.bold(' \t WELCOME ' + (Handle) + ' To TweetzAnalyzer'));
								console.log('');
								console.log(chalk.red('+-----------------------------------------------------------------------------+'));
								console.log('');
								console.log(chalk.yellow('WHAT DO YOU WANT TO DO? Enter: \n \n1 => Perform Word Frequency Analysis \n \nCtrl+C => Or TO EXIT!'));
								console.log('');
								readline.question(chalk.bgGreen.bold('Enter 1 or Ctrl+C:'), (select) => {

									if (select == 1) {
										frequencyAnalysis();
									} else {
										console.log('');
										console.log(chalk.underline.red.cyan('You have to input either 1 or Ctrl+C'));
										console.log('');
										selectAnalysis();
									}


									function frequencyAnalysis() {
										client.get('statuses/user_timeline', {screen_name: Handle, count: Counter }, function(error, tweets, response){
											if(!error) {
												let tweetObj = {tweets: tweets};
												let tweetLength = tweetObj.tweets.length;
												let allTweet = '';
												for (let i =0; i < tweetLength -1; i++){
													allTweet +=  tweetObj.tweets[i].text;
												}

												let words = wordsFrequency(allTweet);

												for(let key in words){
													if(key == 7) break;
												    if (words.hasOwnProperty(key)) {
												    	table.push(
														    [words[key].word, words[key].freq]
														);
												    }
									    		}
									    		console.log('');
												console.log(chalk.green('(TOP 7) WORD FREQUENCY TABLE'));
												console.log('');
									    		console.log(chalk.green(table.toString()));
									    		console.log('');
									    		console.log(chalk.blue('Thank you for using TweetzAnalyzer'));
									    		console.log('');
									    		makeChoice();


							    		function makeChoice() {
							    			console.log(chalk.red('+-----------------------------------------------------------------------------+'));
											console.log('');
											console.log(chalk.bgGreen.bold(' \t HELLO ' + (Handle) ));
											console.log('');
											console.log(chalk.yellow('You have a CHOICE to make, ENTER: \n1 => To start again with a new twitter handle \n2 => To perform Word Frequency Analysis with more or less tweets \n3 => Or Ctrl+C to EXIT the app'));
											console.log('');
											readline.question(chalk.bgGreen.bold('Enter 1 or 2 or Ctrl+C:'), (choice) => {
							    			if (choice == 1){
												appStart();
							    			} else if (choice == 2){
							    				selectAnalysis();
							    			} else {
							    				console.log('');
							    				console.log(chalk.underline.red.cyan('Choice should be a 1 or 2 or the EXIT command'))
							    				makeChoice();
							    			}
							    		});

							    		}
							    		

										

									}
								}); 
								
							}


							});

						}

					} else {
						console.log(chalk.blue('Check your Network Connection or Twitter Handle and RETRY!.'));
						appStart();
					}
				})
				}		
			})
		}
	});	
};
appStart();
