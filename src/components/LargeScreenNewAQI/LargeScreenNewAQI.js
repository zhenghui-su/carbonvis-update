import axios from "axios";

export const showCityNewAQI = async (chartInstance, dataUrl, divisor, cityName)=>{
    let data = await axios.get(dataUrl);
    let AQIColor = "#93CE07"
    let tempColor = "#FBDB0F"
    let highColor = "#AC3B2A"
    let year = []
    for(let j = 0; j<data.data[1].length; j++){
        year.push(data.data[1][j][0])
    }

    let propertyName = data.data.city[0]/* 默认显示第一个城市 */
    let legendData = []
    legendData.push({
        name: data.data.city[0],
        textStyle: {
            color: '#1D6FA3',
        }
    });
    for(let i = 1; i < data.data.city.length; i++){
        legendData.push({
            name: data.data.city[i],
            textStyle: {
                color: '#73716d',
            }
        });
    }

    let series = []
    series.push({
        name: "AQI",
        type: 'line',
        yAxisIndex: 0,
        smooth:true,
        color:AQIColor,
        markLine: {
            name:"",
            silent: true,
            lineStyle: {
                color: '#333'
            },
            data: [
                {
                    yAxis: 100,
                    label: {
                        formatter: 'AQI过高',
                        position:"middle"
                    }
                }
            ]
        },
        data: getTotalResponse(data, 0)/* i=0时 , 获取AQI数据 */
    });
    series.push({
        name: "气温",
        type: 'line',
        yAxisIndex: 1,
        smooth:true,
        color:tempColor,
        markLine: {
            name:"",
            silent: true,
            lineStyle: {
                color: '#333'
            },
            symbol: ['arrow', 'none'],
            data: [
                {
                    yAxis: 15,
                    label: {
                        formatter: '气温过高',
                        position:"middle"
                    }
                }
            ]
        },
        data: getTotalResponse(data, 1)/* i=1时 , 获取温度数据 */
    });
    for(let i = 0; i < data.data.city.length; i++){
        series.push({
            name: data.data.city[i],
            type: 'line',
            data: null
        });
    }
    let option = {
        title:{
            text:"山东省各市AQI和气温",
            left:"center"
        },
        xAxis: {
            type: 'category',
            data: year
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top:"13%",
            left: '3%',
            right: '3%',
            bottom: '20%',
            containLabel: true
        },
        visualMap: [
            {
                show:false,
                top: 50,
                right: 10,
                seriesIndex : 0,
                pieces: [
                    {
                        gt: 0,
                        lte: 100,
                        color: AQIColor
                    },
                    {
                        gt: 100,
                        lte: 500,
                        color: highColor
                    }
                ]
            },
            {
                show:false,
                top: 50,
                right: 10,
                seriesIndex : 1,
                pieces: [
                    {
                        gt: 0,
                        lte: 15,
                        color: tempColor
                    },
                    {
                        gt: 15,
                        lte: 100,
                        color: highColor
                    }
                ]
            }
        ],
        legend:[
            {
                data: ["AQI", "气温"],
                top:"6%"
            },
            {
                icon: 'none',
                data:legendData,
                bottom: "0%"
            }
        ],
        yAxis: [
            {
                name:'AQI',
                type: 'value',
                max:200,
                min:0
            },
            {
                name:"气温(摄氏度)",
                type: 'value',
                max:20,
                min:0
            },
        ],
        series: series
    };
    chartInstance.setOption(option,true);

    chartInstance.on('legendselectchanged', function (obj) {
        console.log(obj)
        if(obj.name!=="AQI" && obj.name!=="气温"){
            propertyName = obj.name;
            for (let i = 0; i < 2; i++) {
                series[i].data = getTotalResponse(data, i);
            }
            obj.selected[propertyName] = false;
            setLegendColor(propertyName);
            chartInstance.setOption(option,true);
        }
    });
    chartInstance.setOption(option,true)

    function setLegendColor() {
        for (let i = 0; i < data.data.city.length; i++) {
            if(propertyName === data.data.city[i]){
                option.legend[1].data[i].textStyle.color = '#1D6FA3';
            }
            else{
                option.legend[1].data[i].textStyle.color = '#73716d';
            }
        }
    }

    function getTotalResponse(data, i) {
        let temp = new Array(data.data[1].length);
        for (let j = 0; j < data.data[1].length; j++) {
            for(let k = 0; k < data.data.city.length; k++){
                if(propertyName === data.data.city[k]){
                    temp[j] = data.data[k+1][j][i+1];
                }
            }
        }
        return temp;
    }
};
