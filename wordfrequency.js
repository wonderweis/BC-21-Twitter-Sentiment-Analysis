let sw = require('stopword');
//let Sw = require('stopwords').english;

function wordFrequency(sentences) {
    sentences = sentences.replace(/(\b(https?|ftp|file):href\s*=\s*(['"])\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,'');
    sentences = sentences.replace(/[0-9]/g, ''); 
    sentences = sentences.replace(/[^\w\s]/gi, ''); 
    sentences = sentences.replace(/[\s\n\t\r]+/g, ' '); 
    sentences = sentences.split(' ').sort(); 

    sentences = sw.removeStopwords(sentences);


    
    let wordsObj = {};
    
    sentences.forEach(function (key) {
      if (wordsObj.hasOwnProperty(key)) {
        wordsObj[key]++;
      } else {
        wordsObj[key] = 1;
      }
    });
    
    
    let word_Freq = [];
    
    word_Freq = Object.keys(wordsObj).map(function(key) {
      return {
        word: key,
        freq: wordsObj[key]
      };
    });
  
    word_Freq.sort(function(a, b) {
      return b.freq - a.freq;
    });
  
    return word_Freq;

}


module.exports = wordFrequency;