import axios from "axios";
import * as echarts from "echarts";

export const showMap = async (chartInstance, mapJsonUrl, geoMapUrl, dataUrl)=>{
    /* 处理数据 */
    let mapJson = await axios.get(mapJsonUrl);
    mapJson = mapJson.data;
    let geoCoordMap = await axios.get(geoMapUrl);
    geoCoordMap = geoCoordMap.data;
    echarts.registerMap('china', mapJson);
    let data = await axios.get(dataUrl);
    data = data.data;
    let year = data.year;
    let province = data.province;
    let mapData = [];
    for(let i = 0; i < year.length; i++){
        mapData[i] = [];
        for(let j = 0; j < province.length; j++){
            mapData[i].push({
                year: year[i],
                name: province[j],
                value: data[i + 2010][j]
            });
        }
    }
    let categoryData = [];
    let barData = [];
    for (let i = 0; i < mapData.length; i++) {
        mapData[i].sort(function sortNumber(a, b) {
            return a.value - b.value;
        });
        barData.push([]);
        categoryData.push([]);
        for (let j = 0; j < mapData[i].length; j++) {
            barData[i].push(mapData[i][j].value);
            categoryData[i].push(mapData[i][j].name);
        }
    }
    let convertData = function(data) {
        let res = [];
        for (let i = 0; i < data.length; i++) {
            let geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };

     let option = {
        timeline: {
            data: year,
            axisType: 'category',
            autoPlay: false,
            playInterval: 2000,/*时间轴滚动速度*/
            /*时间轴位置和大小*/
            left: '8%',
            right: '23%',
            bottom: '3%',
            width: '55%',
            symbolSize: 10,
            checkpointStyle: {
                borderWidth: 2
            },
            // cursor: "not-allowed",
            controlStyle: {
                // pointer-events: none,
                showNextBtn: false,
                showPrevBtn: false,
                showPlayBtn: false
            },

        },
        baseOption: {
            animation: true,
            animationDuration: 1000,
            animationEasing: 'cubicInOut',
            animationDurationUpdate: 1000,
            animationEasingUpdate: 'cubicInOut',
            /*柱状图位置和大小*/
            grid: {
                right: '3%',
                top: '10%',
                bottom: '5%',
                width: '25%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                    shadowStyle: {
                        color: "black"
                    }
                }
            },
            geo: {
                show: true,
                map: 'china',
                roam: true,
                zoom: 1.4,
                center: [123.83531246, 34.0267395887],/*地图中心位置*/
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: '#FFFFCC',/*地图边缘颜色*/
                        borderWidth: 1,
                        areaColor: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            /*地图颜色*/
                            colorStops: [{
                                offset: 0,
                                color: '#ccccff'
                            }, {
                                offset: 1,
                                color: '#ccccff'
                            }],
                            globalCoord: false
                        },
                        shadowOffsetX: -2,
                        shadowOffsetY: 2,
                        shadowBlur: 10
                    },
                }
            },
        },
        options: []

    };
    for (let n = 0; n < year.length; n++) {
        option.options.push({
            title:[
                {
                    text: year[n] + '年中国各省碳排放量',
                    /*地图标题位置*/
                    left: '23%',
                    top: '0%'
                },
                {
                    id: 'statistic',
                    text: year[n] + "年各省碳排放量",
                    /*折线图标题位置*/
                    left: '75%',
                    top: '0%'
                }
            ],
            xAxis: {
                type: 'value',
                scale: true,
                position: 'top',
                min: 0,
                // max: 30000,
                boundaryGap: false,
                splitNumber: 4,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    margin: 2
                },
            },
            yAxis: {
                type: 'category',
                nameGap: 16,
                axisLine: {
                    show: true
                },
                axisTick: {
                    show: false
                },

                axisLabel: {
                    interval: 0
                },
                data: categoryData[n]
            },
            series: [
                //地图
                {
                    type: 'map',
                    map: 'china',
                    geoIndex: 0,
                    aspectScale: 0.75, //长宽比
                    showLegendSymbol: false,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    roam: true,
                    animation: false,
                    data: mapData
                },
                {
                    //  name: 'Top 10',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(
                        mapData[n]
                            .sort(function (a, b) {
                                return b.value - a.value;
                            })
                            .slice(0, 30)
                    ),
                    symbolSize: function (val) {
                        return (val[2]) / 3000;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke',
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true,
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: '#6699CC',
                            shadowBlur: 5,
                            shadowColor: '#6699CC',
                        },
                    },
                    zlevel: 1,
                },
                //柱状图
                {
                    zlevel: 3.5,
                    type: 'bar',
                    barMaxWidth: 10,
                    symbol: 'none',
                    itemStyle: {
                         normal: {
                            color: "#66CCFF" //柱状图颜色
                        }
                    },
                    data: barData[n]
                }
            ]
        });
    }
    chartInstance.setOption(option);

};
