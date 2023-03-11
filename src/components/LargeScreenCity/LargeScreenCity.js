import axios from "axios";

export const showCityEmission = async (chartInstance, dataUrl, divisor, cityName)=>{
    let data = await axios.get(dataUrl);
    let year = data.data.year,
        city = data.data.city;
    chartInstance.setOption({
        title: {
            text: `${cityName}各${divisor === 1 ? '县' : '市'}历年碳排放`,
            left: 'center'
        },
        tooltip: {
            position: 'left',
            formatter: function (params) {
                params = params.data;
                return `${year[params[0]]}年${city[params[1]]}:${params[2]}Mt`;
            }
        },
        legend: {
            itemWidth: 14,
            itemHeight: 14,
            data: [{
                name: '持平',
                icon: 'reac',
                itemStyle: {
                    color: 'rgb(252, 194, 101)'
                }
            },{
                name: '下降',
                icon: 'reac',
                itemStyle: {
                    color: '#ccffcc'
                }
            },{
                name: '上升',
                icon: 'reac',
                itemStyle: {
                    color: '#ccccff'
                }
            }],
            left: 'right'
        },
        grid: {
            top: 25,
            left: 3,
            bottom: 3,
            right: 25,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: year,
            boundaryGap: false,
            splitLine: {
                show: true
            },
            axisLine: {
                show: false
            }
        },
        yAxis: {
            type: 'category',
            data: city,
            axisLine: {
                show: false
            }
        },
        series: [
            {
                type: 'scatter',
                symbol:'rect',
                itemStyle: {
                    color: (p)=>{
                        let value = p.data[2];
                        let index = (p.data[0] - 1) * city.length + p.data[1];
                        if(index < 0){
                            return 'rgb(252, 194, 101)';
                        }else if(value < data.data.emission[index][2]){
                            return '#ccffcc';
                        }else if(value > data.data.emission[index][2]){
                            return '#ccccff';
                        }else{
                            return 'rgb(252, 194, 101)';
                        }
                    }
                },
                symbolSize: function (val) {
                    return (val[2] / divisor);
                },
                data: data.data.emission,
                animationDelay: function (idx) {
                    return idx * 5;
                }
            },
            {
                name: '持平',
                type: 'scatter',
                data: []
            },
            {
                name: '下降',
                type: 'scatter',
                data: []
            },
            {
                name: '上升',
                type: 'scatter',
                data: []
            }
        ]
      });
};
