import axios from 'axios';

export const showIndustry = async (chartInstance, dataUrl)=>{
    let data = await axios.get(dataUrl);
    chartInstance.setOption({
        title: {
            left: 'center',
            text: '山东省分行业历年碳排放',
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(p){
                let str = `${p[0].axisValueLabel.slice(0, 4)}年行业碳排放(Mt):<br/>`;
                p.forEach((item)=>{
                    str += `${item.data[2]}：${item.data[1]}<br/>`
                });
                return str;
            },
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: 'rgba(0,0,0,0.2)',
                    width: 1,
                    type: 'solid'
                }
            }
        },
        legend: {
            type: 'scroll',
            top: 25,
            data: ["农林牧渔", "工业", "采矿", "居民生活", "建筑业", "运输仓储邮电", "批发零售贸易餐饮", "城村"]
        },
        singleAxis: {
            top: 30,
            bottom: 20,
            type: 'time',
            axisPointer: {
                animation: true,
                label: {
                    show: false
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    opacity: 0.2
                }
            }
        },
        series: [
            {
                type: 'themeRiver',
                label: {
                    rotate: 45,
                    fontSize: 14
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 20,
                        shadowColor: 'rgba(0, 0, 0, 0.8)'
                    }
                },
                data: data.data
            }
        ]
    });
};
