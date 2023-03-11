import axios from "axios";

export const showCarbonBar =async (chartInstance,dataUrl)=>{
    let data = await axios.get(dataUrl);
    let name=[]
    for(let i=0;i<data.data.length;i++){
        name.push(data.data[i].name)
    }
    let carbon=[]
    for(let i=0;i<data.data.length;i++){
        carbon.push(data.data[i].carbon)
        carbon[i]=carbon[i]/1000000
    }
    let GDPC=[]
    for(let i=0;i<data.data.length;i++){
        GDPC.push(data.data[i].GDPC)
    }
    let PSC=[]
    for(let i=0;i<data.data.length;i++){
        PSC.push(data.data[i].PSC)
    }

    chartInstance.setOption({
        title:{
            text:"山东省各市单位GDP和人均碳排放",
            left:"center"
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            show: true,
            data: ['碳排放总量（百万吨）','单位GDP碳排放', '人均碳排放'],
            top: 25
        },
        grid: {
            left: '3%',
            right: '10%',
            bottom: '3%',
            containLabel: true
        },
        xAxis:[
            {
                type: 'value'
            }
        ],
        yAxis: {
            type: 'category',
            data: name
        },
        series: [
            {
                name: '碳排放总量（百万吨）',
                type: 'bar',
                data: carbon
            },
            {
                name: '单位GDP碳排放',
                type: 'bar',
                data: GDPC
            },
            {
                name: '人均碳排放',
                type: 'bar',
                data: PSC
            }
        ]
    })

}
