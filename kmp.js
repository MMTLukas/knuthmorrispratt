var fs = require('fs');
var wordFile = "parkinson_gene.fa";
var textFile = "first_quarter_of_chromosome1.fa";

/**
 * READ WORD AND TEXT FILE
 */

var FileReader = {
    start: function () {
        this.readWord();
    },
    readWord: function () {
        fs.readFile(wordFile, 'utf8', function (err, data) {
            if (err) {
                throw err;
            }
            console.log('READ SUCCESS: ' + wordFile);
            TextSearch.word = data;
            this.readText();
        }.bind(this));
    },
    readText: function () {
        fs.readFile(textFile, 'utf8', function (err, data) {
            if (err) {
                throw err;
            }
            console.log('READ SUCCESS: ' + textFile);
            TextSearch.text = data;
            TextSearch.start();
        }.bind(this));
    }
};

FileReader.start();


/**
 * TEXT SEARCH ALGORITHMS
 */

var TextSearch = {
    start: function () {
        console.log("\nStart search naive...");
        var measurements = this.measure(this.searchTextNaive);
        console.log(measurements);

        console.log("\nStart search KMP...");
        var measurements = this.measure(this.searchTextKMP);
        console.log(measurements);
    },
    measure: function (algorithm, runs, steps) {
        var steps = steps || 10;
        var runs = runs || 10;
        var measurements = [];
        var indices = [];

        for (var j = 10; j <= 100; j += steps) {
            var resultsRuns = [];
            for (var i = 0; i < runs; i++) {
                var timeStart = process.hrtime();

                var idx = algorithm(this.text, this.word.substr(0,j));
                indices.push(idx);

                var duration = process.hrtime(timeStart);
                var durationNanoSeconds = duration[0] * Math.pow(10, 9) + duration[1];
                resultsRuns.push(durationNanoSeconds);
            }

            var average = Math.ceil(Math.average(resultsRuns));
            measurements.push(average);
        }
        return measurements;
    },
    searchTextNaive: function (text, word) {
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
    },
    searchTextKMP: function (text, word) {
        var borders = new Array(word.length + 1);
        borders = TextSearch.computeBorders(borders, word.length, word);

        var maxIterations = text.length - word.length;
        var idxWord = 0, idxText = 0;

        while (idxText <= maxIterations) {
            while (text[idxWord + idxText] == word[idxWord]) {
                idxWord++;
                if (idxWord == word.length) {
                    return true;
                }
            }
            idxText = idxText + (idxWord - borders[idxWord]);
            idxWord = Math.max(0, borders[idxWord])
        }
        return false;
    },
    computeBorders: function (borders, wordLength, word) {
        borders[0] = -1;
        borders[1] = 0;
        var idx = borders[1];

        for (var j = 2; j <= wordLength; j++) {
            while (idx >= 0 && word[idx] != word[j - 1]) {
                idx = borders[idx];
            }
            idx++;
            borders[j] = idx;
        }
        return borders;
    }
};

Math.average = function (array) {
    var average = 0;
    for (var i = 0; i < array.length; i++) {
        average += array[i];
    }
    return average / array.length;
};
