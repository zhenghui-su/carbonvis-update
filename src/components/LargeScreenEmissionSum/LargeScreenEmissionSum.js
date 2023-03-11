import axios from 'axios';

export const showEmissionSum = async (chartInstance, dataUrl)=>{
    let data = await axios.get(dataUrl);
    chartInstance.setOption({
        tooltip: {
            trigger: 'axis',
            formatter: function(p){
                return new Date(p[0].value[0]).getFullYear() + '年碳排放总量(Mt):<br/>' + p[0].value[1];
            },
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        grid: {
            left: '5%',
            right: '1%',
            top: '13%'
        },
        title: {
            left: 'center',
            text: '山东省历年碳排放总量'
        },
        xAxis: {
            type: 'time',
            boundaryGap: false,
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100
            },
            {
                start: 0,
                end: 100
            }
        ],
        series: [
            {
                name: '碳排放总量(Mt)',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 12,
                areaStyle: {
                    opacity: 0.2
                },
                data: data.data
            }
        ]
    });
};
