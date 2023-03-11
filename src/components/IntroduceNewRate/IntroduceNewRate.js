import axios from "axios";

export const showNewRate = async (chartInstance)=>{
    let option = {
        title: {
            text: '各行业碳排放占比',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        grid:{
            bottom: '3%',
        },
        series: [{
            type: 'pie',
            center: ['50%', '55%'],
            radius: ['40%', '65%'],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 15,
            itemStyle: {
                normal: {

                }
            },
            label: {
                show: true,
                position: 'outside',
                formatter: '{a|{b}：{d}%}\n{hr|}',
                rich: {
                    a: {
                        padding: [0,0,-10,0]
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 20,
                    length2: 30,
                    lineStyle: {
                        width: 1
                    }
                }
            },
            data: [{
                'name': '能源(电力，热力和交通)',
                'value': 73.2
            }, {
                'name': '直接工业过程',
                'value': 5.2
            }, {
                'name': '废弃物',
                'value': 3.2
            },  {
                'name': '农业，林业和土地利用',
                'value': 18.4
            }],
        }]
    };
    chartInstance.setOption(option);
};
