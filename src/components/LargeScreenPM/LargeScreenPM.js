import axios from "axios";

export const showCityPM = async (chartInstance, dataUrl, divisor, cityName)=>{
    let data = await axios.get(dataUrl);
    let city = data.data.city
    let year = data.data.year
    let pm = data.data.pm
        .map(function (item){
            return [item[1], item[0], item[2] || '-'];
        })

    chartInstance.setOption({
        title:{
            text:"山东省各市PM2.5浓度",
            left:"center"
        },
        tooltip: {
            position: 'top'
        },
        grid: {
            top: '10%',
            left:'18%',
            right:'5%',
            bottom:"11%"
        },
        xAxis: {
            type: 'category',
            data: city,
            splitArea: {
                show: true
            },
            axisLabel:{
                rotate:50
            }
        },
        yAxis: {
            type: 'category',
            data: year,
            splitArea: {
                show: true
            }
        },
        visualMap: {
            min: 20,
            max: 100,
            calculable: true
        },
        series: [
            {
                name: 'PM2.5浓度',
                type: 'heatmap',
                data: pm,
                label: {
                    show: false
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    });
};
