import axios from 'axios';
import PubSub from 'pubsub-js';

export const drawLineChart = async (container, cityDataUrl, dataTemUrl, dataRainUrl)=>{
    let cityList = await axios.get(cityDataUrl);
    let dataTem = await axios.get(dataTemUrl);
    let dataRain = await axios.get(dataRainUrl);

    container.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false
            }
        },
        legend: {
            data: ['降雨量', '温度'],
            right: '5%',
            bottom: '90%'
        },
        axisPointer: {
            link: [
                {
                    xAxisIndex: 'all'
                }
            ]
        },
        grid: [
            {
                left: 60,
                right: 20,
                top: '12%',
                height: '35%'
            },
            {
                left: 60,
                right: 20,
                top: '51%',
                height: '35%'
            }
        ],
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                axisLine: { show: false },
                data: cityList.data,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                }
            },
            {
                gridIndex: 1,
                type: 'category',
                boundaryGap: false,
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    show: false
                },
                data: cityList.data,
                position: 'top'
            }
        ],
        yAxis: [
            {
                name: '温度(℃)',
                type: 'value',
                max: 20
            },
            {
                gridIndex: 1,
                name: '降雨量(mm)',
                type: 'value',
                inverse: true
            }
        ],
        series: [
            {
                name: '温度',
                type: 'line',
                symbolSize: 8,
                data: dataTem.data
            },
            {
                name: '降雨量',
                type: 'line',
                xAxisIndex: 1,
                yAxisIndex: 1,
                symbolSize: 8,
                data: dataRain.data
            }
        ]
    });
    
    container.on('click', (e) => {
        let arr = e.name.split(',');
        PubSub.publish('mark', [
            arr[0].split('(')[1],
            arr[1].split(')')[0]
        ]);
    });
}