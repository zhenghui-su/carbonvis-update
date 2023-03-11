import axios from "axios";

export const showCarbon = async (chartInstance)=>{
    chartInstance.setOption({
        title: {
            text: '世界主要国家碳排放占比',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            left:'center',
            top:'10%'
        },
        grid: {
            top: '13%',
            left: '3%',
            right: '3%',
            bottom: '0%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['2000年', '2005年', '2010年', '2015年', '2019年']
        },
        yAxis: {
            show: false
        },
        series: [{
            name: '中国',
            type: 'bar',
            barWidth: 75,
            stack: 'total',
            label: {
                show: true,
                formatter: '{c}%'
            },
            data: [13.6, 20.0, 25.6, 28.2, 29.4]
        },
            {
                name: '美国',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true,
                    formatter: '{c}%'
                },
                data: [24.7, 21.1, 17.5, 15.2, 14.1]
            },
            {
                name: '日本',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true,
                    formatter: '{c}%'
                },
                data: [4.9, 4.4, 3.7, 3.6, 3.1]
            },
            {
                name: '俄罗斯',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true,
                    formatter: '{c}%'
                },
                data: [6.3, 5.5, 5.0, 4.7, 4.9]
            }
        ]
    });

};
