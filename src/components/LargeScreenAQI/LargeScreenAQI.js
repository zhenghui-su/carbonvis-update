import axios from "axios";

export const showCityAQI = async (chartInstance, dataUrl, divisor, cityName)=>{
    chartInstance.innerHTML = '';
    let data = await axios.get(dataUrl);
    let city = data.data.city
    let schema = [
        { name: 'year', index: 0, text: '年份' },
        { name: '年均空气AQI指数', index: 1, text: '年均空气AQI指数' },
        { name: '年均气温', index: 2, text: '年均气温(℃)' }
    ];
    let lineStyle = {
        width: 1,
        opacity: 0.5
    };
    let series = [];
    for(let i=0;i<city.length;i++) {
        series.push({
            name: city[i],
            type: "parallel",
            lineStyle: lineStyle,
            data: data.data[i + 1]
        });
    }
    chartInstance.setOption({
        title:{
            /*text:"山东省各市AQI指数与气温",*/
            text:`${cityName}各${divisor === 1 ? '县' : '市'}AQI指数与气温`,
            left:"center"
        },
        legend: {
            bottom: 5,
            data: city
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (p){
                let str = `${p.seriesName}<br/>`;
                str += `年份:${p.data[0]}<br/>`;
                str += `空气AQI指数:${p.data[1]}<br/>`;
                str += `气温:${p.data[2]}℃<br/>`;
                return str
            }
        },
        parallelAxis: [
            {
                dim: 0,
                min:2002,
                max:2018,
                name: schema[0].text
            },
            {
                dim: 1,
                min:0,
                max:150,
                name: schema[1].text
            },
            {
                dim: 2,
                min:10,
                max:20,
                name: schema[2].text
            }
        ],
        /* visualMap: {
            show: true,
            min: 0,
            max: 150,
            dimension: 1,
            inRange: {
                color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
            }
        }, */
        parallel: {
            left: '5%',
            right: '8%',
            bottom: 90,
            parallelAxisDefault: {
                type: 'value',
                name: '年均空气AQI指数',
                nameLocation: 'end',
                nameTextStyle: {
                    fontSize: 12
                },
                axisLine: {},
                axisTick: {},
                axisLabel: {}
            }
        },
        series: series
    }, true);
};
