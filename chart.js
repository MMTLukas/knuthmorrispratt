var valuesX = ['x', 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

var valuesNaive = ['Naive',
  2361284755,
  2559606544,
  2572743703,
  2541672143,
  2529875162,
  2529609578,
  2566829364,
  2563540622,
  2594547884,
  2564572290];
//Amount of founds [ 3392, 793, 20, 4, 1, 1, 1, 1, 1, 1 ]

var valuesKMP = ['Knuth-Morris-Pratt',
  2223669188,
  2411976533,
  2416480841,
  2446441161,
  2447514306,
  2415143803,
  2405160995,
  2405832049,
  2413559715,
  2424570086];
//Amount of founds [ 3392, 793, 20, 4, 1, 1, 1, 1, 1, 1 ]

window.onload = function () {
  var chart = c3.generate({
    bindto: '#chart',
    padding: {
      top: 10,
      right: 20
    },
    size: {
      height: 600
    },
    data: {
      x: 'x',
      columns: [
        valuesX,
        valuesNaive,
        valuesKMP
      ],
      labels: {
        format: function (v, id, i, j) {
          return (v / 1000000000).toFixed(3) + " sec";
        }
      }
    },
    axis: {
      y: {
        label: {
          text: "Duration [sec]",
          position: "outer-middle"
        },
        tick: {
          format: function (v, id, i, j) {
            return (v / 1000000000).toFixed(1);
          }
        }
      },
      x: {
        label: {
          text: "Prefix length of parkinson gens",
          position: "outer-center"
        }
      }
    },
    grid: {
      x: {
        show: true
      },
      y: {
        show: true
      }
    }
  });
}