import axios from "axios";

export const showKeyWord = async (chartInstance)=>{
    let plantCap = [
        {
            name: '碳中和',
            value: [56, 48],
            symbolSize: 120,
        },
        {
            name: '碳达峰',
            value: [20, 80],
            symbolSize: 80,
        },

        {
            name: '碳减排',
            value: [85, 20],
            symbolSize: 70,
        },
        {
            name: '智慧能源',
            value: [10, 20],
            symbolSize: 80,
        },

        {
            name: '碳汇',
            value: [92, 70],
            symbolSize: 65,
        },
    ]
    chartInstance.setOption({
        title:{
            text: '关键词科普',
            left: 'center'
        },
        xAxis: {
            show: false,
        },
        yAxis: {
            show: false,
        },
        grid: {
            top: '25%',
            bottom: '0%',
        },
        series: [
            {
                symbolSize: 120,
                data: plantCap,
                type: 'scatter',
                label: {
                    normal: {
                        show: true,
                        formatter: '{b}',
                        color: '#fff',
                        textStyle: {
                            fontSize: '15',
                        },
                        lineHeight: 16,
                    },
                },
                itemStyle: {
                    normal: {
                        color: '#1469A7',
                        opacity: 0.9,
                    },
                },
            },
        ],
    });
};
