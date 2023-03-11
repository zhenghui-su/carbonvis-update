import axios from "axios";

export const showEnergy = async (chartInstance,dataUrl) =>{

    chartInstance.setOption({
        title:{
            text:"山东省能源消耗",
            left:"center"
        },
        legend: {
            x:'right',
            orient: 'vertical',
            y:'20%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (p){
                let str = `${p[0].name}年(Mt)<br/>`;
                for (let i = 1;i < p[0].value.length;i++) {
                    str += `${p[0].dimensionNames[i].replace("-1","")}:${p[0].value[i]}<br/>`;
                }
                return str;
            }
        },
        dataset: {
            source: [
                ['year', '1997','1998','1999', '2000','2001','2002', '2003', '2004','2005','2006','2007','2008', '2009','2010','2011', '2012','2013','2014','2015','2016','2017'],
                ["汽油", 34.5, 34.6, 37.4, 39.4, 40.1, 42.4, 43.6, 46.6, 50.6, 56.5, 57.7, 65.6, 66.6, 71.7, 79.4, 85.1, 81.1, 84.4, 90.2, 92.6, 93.4],
                ['煤炭', 51.1, 71.2, 73.4, 58.4, 65.4, 71.8, 70.6, 81.0, 85.9, 88.7, 93.5, 89.5, 90.5, 91.5, 92.5, 93.5, 94.5, 95.5, 96.5, 97.5, 98.5],
                ['原油', 32.5, 32.6, 38.2, 48.1, 43.8, 40.9, 41.1, 50.9, 49.7, 73.2, 56.4, 69.8, 64.7, 68.5, 75.8, 94.2, 87.4, 86.5, 87.5, 88.5, 89.5],
                ['焦炭', 18.2, 25.3, 37.7, 27.8, 39.2, 27.4, 39.0, 44.6, 33.7, 47.8, 48.4, 37.6, 45.1, 49.8, 61.9, 54.9, 45.8, 63.5, 67.6, 67.8, 67.3],
                ['煤炭', 23.6, 25.7, 36.6, 45.0, 42.4, 49.0, 36.8, 35.9, 42.6, 56.6, 41.5, 59.9, 56.6, 64.0, 56.3, 65.2, 66.5, 75.7, 76.7, 63.3, 76.9],
                ['柴油', 25.2, 41.3, 40.3, 37.8, 35.3, 44.0, 41.8, 37.0, 46.0, 44.3, 61.1, 49.9, 67.6, 52.4, 61.0, 63.2, 65.2, 62.6, 78.9, 86.6, 68.2]
            ]
        },
        xAxis: { type: 'category' },
        yAxis: { gridIndex: 0 },
        grid: {
            top: '60%',
            bottom:'8%'
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100
            },
            {
                start: 0,
                end: 100,
                show:false
            }
        ],
        series: [
            // 1
            {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: { focus: 'series' },

            },
            // 2
            {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: { focus: 'series' }
            },
            // 3
            {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: { focus: 'series' }
            },
            // 4
            {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: { focus: 'series' }
            },
            // 5
            {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: { focus: 'series' }
            },
            // 6
            {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: { focus: 'series' }
            },

            {
                type: 'pie',
                top:"10%",
                right:"15%",
                id: 'pie',
                radius: '35%',
                center: ['50%', '25%'],
                emphasis: {
                    focus: 'self'
                },
                label: {
                    formatter: '{b}: {@1997} ({d}%)'
                },
                encode: {
                    itemName: 'year',
                    value: '1997',
                    tooltip: '1997'
                }
            }
        ]
    });
    chartInstance.on('updateAxisPointer', function (event) {
        const xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
            const dimension = xAxisInfo.value + 1;
            chartInstance.setOption({
                series: {
                    id: 'pie',
                    label: {
                        formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                    },
                    encode: {
                        value: dimension,
                        tooltip: dimension
                    }
                }
            });
        }
    });
}
