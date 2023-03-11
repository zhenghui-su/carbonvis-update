import axios from "axios";

export const showCarbonRadar = async (chartInstance,dataUrl,whichYear)=>{
    let data = await axios.get(dataUrl);
    let indicatorArr = [];
    let seriesData = [
        {
            value: [],
            name: '碳排放总量'
        },
        {
            value: [],
            name: '人均碳排放'
        },
        {
            value: [],
            name: '单位GDP碳排放'
        },
        {
            value: [],
            name: 'PM2.5'
        },
    ];
    data.data.forEach(obj => {
        indicatorArr.push({
            name: obj.name,
            max: 200
        })
        seriesData[0].value.push(obj.carbon/400000) //碳排放总量
        seriesData[1].value.push(obj.PSC*10) //人均碳排放
        seriesData[2].value.push(obj.GDPC*100) //单位GDP碳排放
        seriesData[3].value.push(obj.PM*3) //PM2.5
    });
    chartInstance.setOption({
        title: {
            text: `${whichYear}年山东省各市碳排放与PM2.5`,
            left: "center"
        },
        legend: {
            icon: "circle",
            orient: 'vertical',
            left: 0,
            top: 20,
            show: true,
            data: ['碳排放总量', '人均碳排放', '单位GDP碳排放', 'PM2.5']
        },
        tooltip: {
            trigger: 'item',
            position: 'bottom',
            triggerOn: 'mousemove',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (p){
                let str = `${p.data.name}<br/>`
                for (let i = 0;i < p.data.value.length;i++){
                    if(p.data.name === "PM2.5"){
                        str += `${indicatorArr[i].name}:${p.data.value[i]/3}<br/>`;
                    }
                    if(p.data.name === "单位GDP碳排放"){
                        str += `${indicatorArr[i].name}:${p.data.value[i]/100}(万元/吨)<br/>`;
                    }
                    if(p.data.name === "人均碳排放"){
                        str += `${indicatorArr[i].name}:${p.data.value[i]/10}(吨)<br/>`;
                    }
                    if(p.data.name === "碳排放总量"){
                        str += `${indicatorArr[i].name}:${p.data.value[i]*400000}(吨)<br/>`;
                    }
                }
                return str;
            }
        },
        radar: {
            indicator: indicatorArr
        },
        series: [
            {
                areaStyle:{},
                symbolSize: 0,
                name: '碳排放',
                type: 'radar',
                data: seriesData
            },
        ]
    });
};
