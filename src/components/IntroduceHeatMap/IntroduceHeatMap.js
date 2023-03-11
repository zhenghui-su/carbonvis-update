import axios from "axios";

export const showRain = async (chartInstance, dataUrl)=>{
    let data = await axios.get(dataUrl);
    let city = data.data.city
    let year = data.data.year
    let rain = []
    for(let i = 0; i <  year.length; i++){
        for(let j = 0; j < city.length; j++){
            rain.push([i,j,data.data[i+2010][j]])
        }
    }
    let pm = rain
        .map(function (item){
            return [item[1], item[0], item[2] || '-'];
        })

    chartInstance.setOption({
        title:{
            text:"各省历年降水量",
            left:"center"
        },
        tooltip: {
            position: 'top'
        },
        grid: {
            top: '12%',
            left:'13%',
            right:'5%',
            bottom:"8%"
        },
        xAxis: {
            type: 'category',
            data: city,
            splitArea: {
                show: true
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
            min: 500000,
            max: 6000000,
            inRange:{
                color: ['#5ee7fd','#b49dca']/*渐变颜色*/
            },
            calculable: true
        },
        series: [
            {
                name: '降水量',
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
                },
                markPoint: {
                    symbol:'pin',
                    symbolSize:[20,30],

                },
                itemStyle: {
                    borderColor: "#bebebe",/*边框颜色*/
                    borderWidth: 4,

                },
                zlevel:-1,
            }
        ]
    });
};
