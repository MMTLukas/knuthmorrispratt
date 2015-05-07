var word = "";
var text = "";

//Read word and text file
var fs = require('fs');
var wordFile = "parkinson_gene.fa";
var textFile = "first_quarter_of_chromosome1.fa";

var readWordFile = (function () {
    fs.readFile(wordFile, 'utf8', function (err, data) {
        if (err) throw err;
        console.log('READ SUCCESS: ' + wordFile);
        word = data;

        readTextFile();
    });
}());

var readTextFile = function () {
    fs.readFile(textFile, 'utf8', function (err, data) {
        if (err) throw err;
        console.log('READ SUCCESS: ' + textFile);
        text = data;

        main();
    });
}

var naiveTextSearch = function (text, word) {
    var maxIterations = text.length - word.length;
    var idxWord = 0, idxText = 0;

    while (idxText <= maxIterations) {
        while (text[idxWord + idxText] == word[idxWord]) {
            idxWord++;
            if (idxWord == word.length) {
                return true;
            }
        }
        idxText++;
        idxWord = 0;
    }
    return false;
};

var KMP = function (text, word) {
    var borders = new Array(word.length + 1);
    borders = computeBorders(borders, word.length, word);

    var maxIterations = text.length - word.length;
    var idxWord = 0, idxText = 0;

    while (idxText <= maxIterations) {
        while (text[idxWord + idxText] == word[idxWord]) {
            idxWord++;
            if (idxWord == word.length) {
                return true;
            }
        }
        idxText = idxText+(idxWord-borders[idxWord]);
        idxWord = Math.max(0, borders[idxWord])
    }
    return false;
};

var computeBorders = function(borders, wordLength, word){
    borders[0] = -1;
    borders[1] = 0;
    var idx = borders[1];

    for(var j = 2; j <= wordLength; j++){
        while(idx >= 0 && word[idx] != word[j-1]){
            idx = borders[idx];
        }
        idx++;
        borders[j] = idx;
    }
    console.log("Calculated borders.");
    return borders;
}

var main = function () {
    console.log("\nStart KMP naive...");
    var timeStart = process.hrtime();

    var foundWord = naiveTextSearch(text, word);
    console.log("KMP naive found the word: ", foundWord);

    var duration = process.hrtime(timeStart);

    var durationNanoSeconds = duration[0] * Math.pow(10, 9) + duration[1];
    console.log("Time duration: ", durationNanoSeconds)


    console.log("\nStart KMP...");
    var timeStart = process.hrtime();

    var foundWord = KMP(text, word);
    console.log("KMP naive found the word: ", foundWord);

    var duration = process.hrtime(timeStart);

    var durationNanoSeconds = duration[0] * Math.pow(10, 9) + duration[1];
    console.log("Time duration: ", durationNanoSeconds)
}

