import axios from "axios";

export const showRealization = async (chartInstance)=>{
    chartInstance.setOption({
        title: {
            show: true,
            text: '实现方式政策覆盖率',
            left: 'center',
            textStyle: {
                color: '#000000',
            },
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a}<br/>{b}:{c}%',
        },
        grid:{
            top: "20%",
            left: "5%",
            right: "5%"
        },
        legend: {
            show: true,
            icon: 'circle',
            x: 'center',
            y: '10%',
            data: ['工业节能', '交通节能', '建筑节能'],
            textStyle: {
                color: '#000000',
            },
        },
        series: [
            {
                name: '覆盖率',
                type: 'pie',
                radius: [37, 150],
                avoidLabelOverlap: false,
                startAngle: 0,
                center: ['45%', '25%'],
                roseType: 'area',
                selectedMode: 'single',
                label: {
                    normal: {
                        show: true,
                        formatter: '{c}%',
                    },
                    emphasis: {
                        show: true,
                    },
                },
                labelLine: {
                    normal: {
                        show: true,
                        smooth: false,
                        length: 20,
                        length2: 10,
                    },
                    emphasis: {
                        show: true,
                    },
                },
                data: [
                    {
                        value: 70,
                        name: '工业节能',
                        itemStyle: {
                            normal: {
                                color: '#00aaff',
                            },
                        },
                        label: {
                            color: '#000000',
                        },
                    },
                    {
                        value: 57,
                        name: '交通节能',
                        itemStyle: {
                            normal: {
                                color: '#aaaaff',
                            },
                        },
                        label: {
                            color: '#000000',
                        },
                    },
                    {
                        value: 33,
                        name: '建筑节能',
                        itemStyle: {
                            normal: {
                                color: '#c9f6bf',
                            },
                        },
                        label: {
                            color: '#000000',
                        },
                    },

                    {
                        value: 0,
                        name: '',
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false,
                        },
                    },
                    {
                        value: 0,
                        name: '',
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false,
                        },
                    },
                    {
                        value: 0,
                        name: '',
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false,
                        },
                    },
                ],
            },
        ],
    });
};
