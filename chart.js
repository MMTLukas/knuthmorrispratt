var valuesX = ['x', 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

var valuesNaive = ['Naive',
    2276057108,
    2487598527,
    2532869824,
    2468305172,
    2501755037,
    2478752979,
    2464402669,
    2465505035,
    2466996932,
    2469946192 ];
//Amount of founds [ 3392, 793, 20, 4, 1, 1, 1, 1, 1, 1 ]

var valuesKMP = ['Knuth-Morris-Pratt',
    2276057108,
    2487598527,
    2532869824,
    2468305172,
    2501755037,
    2478752979,
    2464402669,
    2465505035,
    2466996932,
    2469946192 ];
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
                    return (v / 1000000000).toFixed(3   ) + " sec";
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