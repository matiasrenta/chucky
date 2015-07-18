/* chart colors default */
var $chrt_border_color = "#efefef";
var $chrt_grid_color = "#DDD";
var $chrt_main = "#E24913";
/* red       */
var $chrt_second = "#6595b4";
/* blue      */
var $chrt_third = "#FF9F01";
/* orange    */
var $chrt_fourth = "#7e9d3a";
/* green     */
var $chrt_fifth = "#BD362F";
/* dark red  */
var $chrt_mono = "#000";

$(document).ready(function() {
    /* sales chart */

    if ($("#saleschart").length) {
        var d = [[1196463600000, 0], [1196550000000, 0], [1196636400000, 0], [1196722800000, 77], [1196809200000, 3636], [1196895600000, 3575], [1196982000000, 2736], [1197068400000, 1086], [1197154800000, 676], [1197241200000, 1205], [1197327600000, 906], [1197414000000, 710], [1197500400000, 639], [1197586800000, 540], [1197673200000, 435], [1197759600000, 301], [1197846000000, 575], [1197932400000, 481], [1198018800000, 591], [1198105200000, 608], [1198191600000, 459], [1198278000000, 234], [1198364400000, 1352], [1198450800000, 686], [1198537200000, 279], [1198623600000, 449], [1198710000000, 468], [1198796400000, 392], [1198882800000, 282], [1198969200000, 208], [1199055600000, 229], [1199142000000, 177], [1199228400000, 374], [1199314800000, 436], [1199401200000, 404], [1199487600000, 253], [1199574000000, 218], [1199660400000, 476], [1199746800000, 462], [1199833200000, 500], [1199919600000, 700], [1200006000000, 750], [1200092400000, 600], [1200178800000, 500], [1200265200000, 900], [1200351600000, 930], [1200438000000, 1200], [1200524400000, 980], [1200610800000, 950], [1200697200000, 900], [1200783600000, 1000], [1200870000000, 1050], [1200956400000, 1150], [1201042800000, 1100], [1201129200000, 1200], [1201215600000, 1300], [1201302000000, 1700], [1201388400000, 1450], [1201474800000, 1500], [1201561200000, 546], [1201647600000, 614], [1201734000000, 954], [1201820400000, 1700], [1201906800000, 1800], [1201993200000, 1900], [1202079600000, 2000], [1202166000000, 2100], [1202252400000, 2200], [1202338800000, 2300], [1202425200000, 2400], [1202511600000, 2550], [1202598000000, 2600], [1202684400000, 2500], [1202770800000, 2700], [1202857200000, 2750], [1202943600000, 2800], [1203030000000, 3245], [1203116400000, 3345], [1203202800000, 3000], [1203289200000, 3200], [1203375600000, 3300], [1203462000000, 3400], [1203548400000, 3600], [1203634800000, 3700], [1203721200000, 3800], [1203807600000, 4000], [1203894000000, 4500]];

        for (var i = 0; i < d.length; ++i)
            d[i][0] += 60 * 60 * 1000;

        function weekendAreas(axes) {
            var markings = [];
            var d = new Date(axes.xaxis.min);
            // go to the first Saturday
            d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 1) % 7))
            d.setUTCSeconds(0);
            d.setUTCMinutes(0);
            d.setUTCHours(0);
            var i = d.getTime();
            do {
                // when we don't set yaxis, the rectangle automatically
                // extends to infinity upwards and downwards
                markings.push({
                    xaxis : {
                        from : i,
                        to : i + 2 * 24 * 60 * 60 * 1000
                    }
                });
                i += 7 * 24 * 60 * 60 * 1000;
            } while (i < axes.xaxis.max);

            return markings;
        }

        var options = {
            xaxis : {
                mode : "time",
                tickLength : 5
            },
            series : {
                lines : {
                    show : true,
                    lineWidth : 1,
                    fill : true,
                    fillColor : {
                        colors : [{
                            opacity : 0.1
                        }, {
                            opacity : 0.15
                        }]
                    }
                },
                //points: { show: true },
                shadowSize : 0
            },
            selection : {
                mode : "x"
            },
            grid : {
                hoverable : true,
                clickable : true,
                tickColor : $chrt_border_color,
                borderWidth : 0,
                borderColor : $chrt_border_color,
            },
            tooltip : true,
            tooltipOpts : {
                content : "Your sales for <b>%x</b> was <span>$%y</span>",
                dateFormat : "%y-%0m-%0d",
                defaultTheme : false
            },
            colors : [$chrt_second],

        };

        var plot = $.plot($("#saleschart"), [d], options);
    };

    /* end sales chart */

    /* Sin chart */

    if ($("#sin-chart").length) {
        var sin = [], cos = [];
        for (var i = 0; i < 16; i += 0.5) {
            sin.push([i, Math.sin(i)]);
            cos.push([i, Math.cos(i)]);
        }

        var plot = $.plot($("#sin-chart"), [{
            data : sin,
            label : "sin(x)"
        }, {
            data : cos,
            label : "cos(x)"
        }], {
            series : {
                lines : {
                    show : true
                },
                points : {
                    show : true
                }
            },
            grid : {
                hoverable : true,
                clickable : true,
                tickColor : $chrt_border_color,
                borderWidth : 0,
                borderColor : $chrt_border_color,
            },
            tooltip : true,
            tooltipOpts : {
                //content : "Value <b>$x</b> Value <span>$y</span>",
                defaultTheme : false
            },
            colors : [$chrt_second, $chrt_fourth],
            yaxis : {
                min : -1.1,
                max : 1.1
            },
            xaxis : {
                min : 0,
                max : 15
            }
        });

        $("#sin-chart").bind("plotclick", function(event, pos, item) {
            if (item) {
                $("#clickdata").text("You clicked point " + item.dataIndex + " in " + item.series.label + ".");
                plot.highlight(item.series, item.datapoint);
            }
        });
    }

    /* end sin chart */

    /* bar chart */

    if ($("#bar-chart").length) {

        var data1 = [];
        for (var i = 0; i <= 12; i += 1)
            data1.push([i, parseInt(Math.random() * 30)]);

        var data2 = [];
        for (var i = 0; i <= 12; i += 1)
            data2.push([i, parseInt(Math.random() * 30)]);

        var data3 = [];
        for (var i = 0; i <= 12; i += 1)
            data3.push([i, parseInt(Math.random() * 30)]);

        var ds = new Array();

        ds.push({
            data : data1,
            bars : {
                show : true,
                barWidth : 0.2,
                order : 1,
            }
        });
        ds.push({
            data : data2,
            bars : {
                show : true,
                barWidth : 0.2,
                order : 2
            }
        });
        ds.push({
            data : data3,
            bars : {
                show : true,
                barWidth : 0.2,
                order : 3
            }
        });

        //Display graph
        $.plot($("#bar-chart"), ds, {
            colors : [$chrt_second, $chrt_fourth, "#666", "#BBB"],
            grid : {
                show : true,
                hoverable : true,
                clickable : true,
                tickColor : $chrt_border_color,
                borderWidth : 0,
                borderColor : $chrt_border_color,
            },
            legend : true,
            tooltip : true,
            tooltipOpts : {
                content : "<b>%x</b> = <span>%y</span>",
                defaultTheme : false
            }

        });

    }

    /* end bar chart */

    /* bar-chart-h */
    if ($("#bar-chart-h").length) {
        //Display horizontal graph
        var d1_h = [];
        for (var i = 0; i <= 3; i += 1)
            d1_h.push([parseInt(Math.random() * 30), i]);

        var d2_h = [];
        for (var i = 0; i <= 3; i += 1)
            d2_h.push([parseInt(Math.random() * 30), i]);

        var d3_h = [];
        for (var i = 0; i <= 3; i += 1)
            d3_h.push([parseInt(Math.random() * 30), i]);

        var ds_h = new Array();
        ds_h.push({
            data : d1_h,
            bars : {
                horizontal : true,
                show : true,
                barWidth : 0.2,
                order : 1,
            }
        });
        ds_h.push({
            data : d2_h,
            bars : {
                horizontal : true,
                show : true,
                barWidth : 0.2,
                order : 2
            }
        });
        ds_h.push({
            data : d3_h,
            bars : {
                horizontal : true,
                show : true,
                barWidth : 0.2,
                order : 3
            }
        });

        // display graph
        $.plot($("#bar-chart-h"), ds_h, {
            colors : [$chrt_second, $chrt_fourth, "#666", "#BBB"],
            grid : {
                show : true,
                hoverable : true,
                clickable : true,
                tickColor : $chrt_border_color,
                borderWidth : 0,
                borderColor : $chrt_border_color,
            },
            legend : true,
            tooltip : true,
            tooltipOpts : {
                content : "<b>%x</b> = <span>%y</span>",
                defaultTheme : false
            }
        });

    }

    /* end bar-chart-h

     /* fill chart */

    if ($("#fill-chart").length) {
        var males = {
            '15%' : [[2, 88.0], [3, 93.3], [4, 102.0], [5, 108.5], [6, 115.7], [7, 115.6], [8, 124.6], [9, 130.3], [10, 134.3], [11, 141.4], [12, 146.5], [13, 151.7], [14, 159.9], [15, 165.4], [16, 167.8], [17, 168.7], [18, 169.5], [19, 168.0]],
            '90%' : [[2, 96.8], [3, 105.2], [4, 113.9], [5, 120.8], [6, 127.0], [7, 133.1], [8, 139.1], [9, 143.9], [10, 151.3], [11, 161.1], [12, 164.8], [13, 173.5], [14, 179.0], [15, 182.0], [16, 186.9], [17, 185.2], [18, 186.3], [19, 186.6]],
            '25%' : [[2, 89.2], [3, 94.9], [4, 104.4], [5, 111.4], [6, 117.5], [7, 120.2], [8, 127.1], [9, 132.9], [10, 136.8], [11, 144.4], [12, 149.5], [13, 154.1], [14, 163.1], [15, 169.2], [16, 170.4], [17, 171.2], [18, 172.4], [19, 170.8]],
            '10%' : [[2, 86.9], [3, 92.6], [4, 99.9], [5, 107.0], [6, 114.0], [7, 113.5], [8, 123.6], [9, 129.2], [10, 133.0], [11, 140.6], [12, 145.2], [13, 149.7], [14, 158.4], [15, 163.5], [16, 166.9], [17, 167.5], [18, 167.1], [19, 165.3]],
            'mean' : [[2, 91.9], [3, 98.5], [4, 107.1], [5, 114.4], [6, 120.6], [7, 124.7], [8, 131.1], [9, 136.8], [10, 142.3], [11, 150.0], [12, 154.7], [13, 161.9], [14, 168.7], [15, 173.6], [16, 175.9], [17, 176.6], [18, 176.8], [19, 176.7]],
            '75%' : [[2, 94.5], [3, 102.1], [4, 110.8], [5, 117.9], [6, 124.0], [7, 129.3], [8, 134.6], [9, 141.4], [10, 147.0], [11, 156.1], [12, 160.3], [13, 168.3], [14, 174.7], [15, 178.0], [16, 180.2], [17, 181.7], [18, 181.3], [19, 182.5]],
            '85%' : [[2, 96.2], [3, 103.8], [4, 111.8], [5, 119.6], [6, 125.6], [7, 131.5], [8, 138.0], [9, 143.3], [10, 149.3], [11, 159.8], [12, 162.5], [13, 171.3], [14, 177.5], [15, 180.2], [16, 183.8], [17, 183.4], [18, 183.5], [19, 185.5]],
            '50%' : [[2, 91.9], [3, 98.2], [4, 106.8], [5, 114.6], [6, 120.8], [7, 125.2], [8, 130.3], [9, 137.1], [10, 141.5], [11, 149.4], [12, 153.9], [13, 162.2], [14, 169.0], [15, 174.8], [16, 176.0], [17, 176.8], [18, 176.4], [19, 177.4]]
        };

        var females = {
            '15%' : [[2, 84.8], [3, 93.7], [4, 100.6], [5, 105.8], [6, 113.3], [7, 119.3], [8, 124.3], [9, 131.4], [10, 136.9], [11, 143.8], [12, 149.4], [13, 151.2], [14, 152.3], [15, 155.9], [16, 154.7], [17, 157.0], [18, 156.1], [19, 155.4]],
            '90%' : [[2, 95.6], [3, 104.1], [4, 111.9], [5, 119.6], [6, 127.6], [7, 133.1], [8, 138.7], [9, 147.1], [10, 152.8], [11, 161.3], [12, 166.6], [13, 167.9], [14, 169.3], [15, 170.1], [16, 172.4], [17, 169.2], [18, 171.1], [19, 172.4]],
            '25%' : [[2, 87.2], [3, 95.9], [4, 101.9], [5, 107.4], [6, 114.8], [7, 121.4], [8, 126.8], [9, 133.4], [10, 138.6], [11, 146.2], [12, 152.0], [13, 153.8], [14, 155.7], [15, 158.4], [16, 157.0], [17, 158.5], [18, 158.4], [19, 158.1]],
            '10%' : [[2, 84.0], [3, 91.9], [4, 99.2], [5, 105.2], [6, 112.7], [7, 118.0], [8, 123.3], [9, 130.2], [10, 135.0], [11, 141.1], [12, 148.3], [13, 150.0], [14, 150.7], [15, 154.3], [16, 153.6], [17, 155.6], [18, 154.7], [19, 153.1]],
            'mean' : [[2, 90.2], [3, 98.3], [4, 105.2], [5, 112.2], [6, 119.0], [7, 125.8], [8, 131.3], [9, 138.6], [10, 144.2], [11, 151.3], [12, 156.7], [13, 158.6], [14, 160.5], [15, 162.1], [16, 162.9], [17, 162.2], [18, 163.0], [19, 163.1]],
            '75%' : [[2, 93.2], [3, 101.5], [4, 107.9], [5, 116.6], [6, 122.8], [7, 129.3], [8, 135.2], [9, 143.7], [10, 148.7], [11, 156.9], [12, 160.8], [13, 163.0], [14, 165.0], [15, 165.8], [16, 168.7], [17, 166.2], [18, 167.6], [19, 168.0]],
            '85%' : [[2, 94.5], [3, 102.8], [4, 110.4], [5, 119.0], [6, 125.7], [7, 131.5], [8, 137.9], [9, 146.0], [10, 151.3], [11, 159.9], [12, 164.0], [13, 166.5], [14, 167.5], [15, 168.5], [16, 171.5], [17, 168.0], [18, 169.8], [19, 170.3]],
            '50%' : [[2, 90.2], [3, 98.1], [4, 105.2], [5, 111.7], [6, 118.2], [7, 125.6], [8, 130.5], [9, 138.3], [10, 143.7], [11, 151.4], [12, 156.7], [13, 157.7], [14, 161.0], [15, 162.0], [16, 162.8], [17, 162.2], [18, 162.8], [19, 163.3]]
        };

        var dataset = [{
            label : 'female mean',
            data : females['mean'],
            lines : {
                show : true
            },
            color : "rgb(255,50,50)"
        }, {
            id : 'f15%',
            data : females['15%'],
            lines : {
                show : true,
                lineWidth : 0,
                fill : false
            },
            color : "rgb(255,50,50)"
        }, {
            id : 'f25%',
            data : females['25%'],
            lines : {
                show : true,
                lineWidth : 0,
                fill : 0.2
            },
            color : "rgb(255,50,50)",
            fillBetween : 'f15%'
        }, {
            id : 'f50%',
            data : females['50%'],
            lines : {
                show : true,
                lineWidth : 0.5,
                fill : 0.4,
                shadowSize : 0
            },
            color : "rgb(255,50,50)",
            fillBetween : 'f25%'
        }, {
            id : 'f75%',
            data : females['75%'],
            lines : {
                show : true,
                lineWidth : 0,
                fill : 0.4
            },
            color : "rgb(255,50,50)",
            fillBetween : 'f50%'
        }, {
            id : 'f85%',
            data : females['85%'],
            lines : {
                show : true,
                lineWidth : 0,
                fill : 0.2
            },
            color : "rgb(255,50,50)",
            fillBetween : 'f75%'
        }, {
            label : 'male mean',
            data : males['mean'],
            lines : {
                show : true
            },
            color : "rgb(50,50,255)"
        }, {
            id : 'm15%',
            data : males['15%'],
            lines : {
                show : true,
                lineWidth : 0,
                fill : false
            },
            color : "rgb(50,50,255)"
        }, {
            id : 'm25%',
            data : males['25%'],
            lines : {
                show : true,
                lineWidth : 0,
                fill : 0.2
            },
            color : "rgb(50,50,255)",
            fillBetween : 'm15%'
        }, {
            id : 'm50%',
            data : males['50%'],
            lines : {
                show : true,
                lineWidth : 0.5,
                fill : 0.4,
                shadowSize : 0
            },
            color : "rgb(50,50,255)",
            fillBetween : 'm25%'
        }, {
            id : 'm75%',
            data : males['75%'],
            lines : {
                show : true,
                lineWidth : 0,
                fill : 0.4
            },
            color : "rgb(50,50,255)",
            fillBetween : 'm50%'
        }, {
            id : 'm85%',
            data : males['85%'],
            lines : {
                show : true,
                lineWidth : 0,
                fill : 0.2
            },
            color : "rgb(50,50,255)",
            fillBetween : 'm75%'
        }]

        $.plot($("#fill-chart"), dataset, {

            xaxis : {
                tickDecimals : 0
            },

            yaxis : {
                tickFormatter : function(v) {
                    return v + " cm";
                }
            },

        });
    }

    /* end fill chart */

    /* pie chart */

    if ($('#pie-chart').length) {

        var data_pie = [];
        var series = Math.floor(Math.random() * 10) + 1;
        for (var i = 0; i < series; i++) {
            data_pie[i] = {
                label : "Series" + (i + 1),
                data : Math.floor(Math.random() * 100) + 1
            }
        }

        $.plot($("#pie-chart"), data_pie, {
            series : {
                pie : {
                    show : true,
                    innerRadius : 0.5,
                    radius : 1,
                    label : {
                        show : false,
                        radius : 2 / 3,
                        formatter : function(label, series) {
                            return '<div style="font-size:11px;text-align:center;padding:4px;color:white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
                        },
                        threshold : 0.1
                    }
                }
            },
            legend : {
                show : true,
                noColumns : 1, // number of colums in legend table
                labelFormatter : null, // fn: string -> string
                labelBoxBorderColor : "#000", // border color for the little label boxes
                container : null, // container (as jQuery object) to put legend in, null means default on top of graph
                position : "ne", // position of default legend container within plot
                margin : [5, 10], // distance from grid edge to default legend container within plot
                backgroundColor : "#efefef", // null means auto-detect
                backgroundOpacity : 1 // set to 0 to avoid background
            },
            grid : {
                hoverable : true,
                clickable : true
            },
        });

    }

    /* end pie chart */

    /* site stats chart */

    if ($("#site-stats").length) {

        var pageviews = [[1, 75], [3, 87], [4, 93], [5, 127], [6, 116], [7, 137], [8, 135], [9, 130], [10, 167], [11, 169], [12, 179], [13, 185], [14, 176], [15, 180], [16, 174], [17, 193], [18, 186], [19, 177], [20, 153], [21, 149], [22, 130], [23, 100], [24, 50]];
        var visitors = [[1, 65], [3, 50], [4, 73], [5, 100], [6, 95], [7, 103], [8, 111], [9, 97], [10, 125], [11, 100], [12, 95], [13, 141], [14, 126], [15, 131], [16, 146], [17, 158], [18, 160], [19, 151], [20, 125], [21, 110], [22, 100], [23, 85], [24, 37]];
        //console.log(pageviews)
        var plot = $.plot($("#site-stats"), [{
            data : pageviews,
            label : "Your pageviews"
        }, {
            data : visitors,
            label : "Site visitors"
        }], {
            series : {
                lines : {
                    show : true,
                    lineWidth : 1,
                    fill : true,
                    fillColor : {
                        colors : [{
                            opacity : 0.1
                        }, {
                            opacity : 0.15
                        }]
                    }
                },
                points : {
                    show : true
                },
                shadowSize : 0
            },
            xaxis : {
                mode : "time",
                tickLength : 10
            },

            yaxes : [{
                min : 20,
                tickLength : 5
            }],
            grid : {
                hoverable : true,
                clickable : true,
                tickColor : $chrt_border_color,
                borderWidth : 0,
                borderColor : $chrt_border_color,
            },
            tooltip : true,
            tooltipOpts : {
                content : "%s for <b>%x:00 hrs</b> was %y",
                dateFormat : "%y-%0m-%0d",
                defaultTheme : false
            },
            colors : [$chrt_main, $chrt_second],
            xaxis : {
                ticks : 15,
                tickDecimals : 2
            },
            yaxis : {
                ticks : 15,
                tickDecimals : 0
            },
        });

    }

    /* end site stats */

    /* updating chart */

    if ($('#updating-chart').length) {

        // For the demo we use generated data, but normally it would be coming from the server
        var data = [], totalPoints = 200;
        function getRandomData() {
            if (data.length > 0)
                data = data.slice(1);

            // do a random walk
            while (data.length < totalPoints) {
                var prev = data.length > 0 ? data[data.length - 1] : 50;
                var y = prev + Math.random() * 10 - 5;
                if (y < 0)
                    y = 0;
                if (y > 100)
                    y = 100;
                data.push(y);
            }

            // zip the generated y values with the x values
            var res = [];
            for (var i = 0; i < data.length; ++i)
                res.push([i, data[i]])
            return res;
        }

        // setup control widget
        var updateInterval = 1000;
        $("#updating-chart").val(updateInterval).change(function() {
            var v = $(this).val();
            if (v && !isNaN(+v)) {
                updateInterval = +v;
                if (updateInterval < 1)
                    updateInterval = 1;
                if (updateInterval > 2000)
                    updateInterval = 2000;
                $(this).val("" + updateInterval);
            }
        });

        // setup plot
        var options = {
            yaxis : {
                min : 0,
                max : 100
            },
            xaxis : {
                min : 0,
                max : 100
            },
            colors : [$chrt_fourth],
            series : {
                lines : {
                    lineWidth : 1,
                    fill : true,
                    fillColor : {
                        colors : [{
                            opacity : 0.4
                        }, {
                            opacity : 0
                        }]
                    },
                    steps : false

                }
            }
        };
        var plot = $.plot($("#updating-chart"), [getRandomData()], options);

        function update() {
            plot.setData([getRandomData()]);
            // since the axes don't change, we don't need to call plot.setupGrid()
            plot.draw();

            setTimeout(update, updateInterval);
        }

        update();

    }

    /*end updating chart*/

});

/* end flot charts */