import axios from "axios";

export const showRate = async (chartInstance, dataUrl, year)=>{
    let data = await axios.get(dataUrl);
    data = data.data;

    let option = {
            title: {
                text: `${year}年各省降水量`,
                right: 'center'
            },
            grid: {
                containLabel: true,
                left: "3%",
                right: "3%",
                bottom: "0%"
            },
            xAxis: [
                {
                    type: 'category',
                    axisLabel: {
                        show: true,
                        interval: 0,
                        rotate: 40,
                        textStyle: {
                            color: "black",
                            fontSize: 10,
                        },
                    },
                    axisPointer: {
                        show: true,
                        type: 'shadow',
                    },
                    data: data.city,
                },
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '降雨量',
                    axisLabel: {
                        formatter: '{value}',
                    },
                },
            ],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
                formatter: function(obj) {
                    // console.log(obj);
                    return `${obj[0].name}: ${obj[0].value}mm`;
                }
            },
            series:{
                name: "降雨量",
                type: "bar",
                data: data.data,
                color: "#66CCFF",
            }
    };

    chartInstance.setOption(option);
};
