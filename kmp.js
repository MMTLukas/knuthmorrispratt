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
        var result = this.measure(this.searchTextNaive);
        console.log("Time: ", result.measurements);
        console.log("Amount of founds: ", result.amount);

        console.log("\nStart search KMP...");
        var result = this.measure(this.searchTextKMP);
        console.log("Time: ", result.measurements);
        console.log("Amount of founds: ", result.amount);
    },
    measure: function (algorithm, runs, steps, max) {
        var steps = steps || 10;
        var runs = runs || 5;
        var max = max || 100;
        var measurements = [];
        var amount = [], cnt = 0;

        for (var j = 10; j <= max; j += steps) {
            var resultsRuns = [];
            for (var i = 0; i < runs; i++) {
                var timeStart = process.hrtime();
                cnt = algorithm(this.text, this.word.substr(0, j));
                var duration = process.hrtime(timeStart);
                var durationNanoSeconds = duration[0] * Math.pow(10, 9) + duration[1];
                resultsRuns.push(durationNanoSeconds);
            }
            amount.push(cnt);

            var average = Math.ceil(Math.average(resultsRuns));
            measurements.push(average);
        }
        return {
            measurements: measurements,
            amount: amount
        };
    },
    searchTextNaive: function (text, word) {
        var maxIterations = text.length - word.length;
        var idxWord = 0, idxText = 0;
        var cnt = 0;

        while (idxText <= maxIterations) {
            while (text[idxWord + idxText] == word[idxWord]) {
                idxWord++;
                if (idxWord == word.length) {
                    cnt++;
                }
            }
            idxText++;
            idxWord = 0;
        }
        return cnt;
    },
    searchTextKMP: function (text, word) {
        var borders = new Array(word.length + 1);
        borders = TextSearch.computeBorders(borders, word.length, word);

        var maxIterations = text.length - word.length;
        var idxWord = 0, idxText = 0;
        var cnt = 0;

        while (idxText <= maxIterations) {
            while (text[idxWord + idxText] == word[idxWord]) {
                idxWord++;
                if (idxWord == word.length) {
                    cnt++;
                }
            }
            idxText = idxText + (idxWord - borders[idxWord]);
            idxWord = Math.max(0, borders[idxWord])
        }
        return cnt;
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
