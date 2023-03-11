import axios from "axios";

export const showTimeline = async (chartInstance, dataUrl)=>{
    let legendData = [
        { name: '十四五时期提出', data: 14 },
        { name: '2030实现碳达峰', data: 12 },
        { name: '2060实现碳中和', data: 10 },
    ]
    let colorList = ['#009400', '#5dbb00', '#74d257']
    let seriesList=[]
    for (let i = 0; i < legendData.length; i++) {
        seriesList.push({
            type: 'bar',
            stack: '2',
            legendHoverLink: false,
            barWidth: 50,
            label: {
                show: true,
                position: 'inside',
                color: '#fff',
                fontSize: 14,
                formatter: legendData[i].name,
            },
            data: [
                {
                    value: legendData[i].data,
                    itemStyle: {
                        color: colorList[i],
                    },
                },
            ],
        });
    }
    chartInstance.setOption({
        title:{
            text: '双碳目标时间线',
            left: "center"
        },
        legend: [
            {
                left: '15%',
                right: "5%",
                top: '7%',
                icon: 'react',
                itemWidth: 14,
                itemHeight: 14,
                textStyle: {
                    color: '#000',
                },
                data: ['十四五时期提出', '2030实现碳达峰', '2060实现碳中和'],
            },
        ],
        xAxis: {
            show: false,
        },
        yAxis: [
            {
                inverse: true,
                data: [''],
                axisLine: {
                    show: false,
                },
            },
        ],
        series: seriesList,
    });
};
