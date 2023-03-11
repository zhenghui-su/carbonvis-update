import axios from 'axios';
import * as echarts from 'echarts';
import PubSub from 'pubsub-js';

const colors = ['rgba(153,0,0,0.3)', 'rgba(51,153,0,0.3)', 'rgba(255,153,0,0.3)'];
const mapToDes = {
    CE: '能源消耗总量',
    PCGDP: '人均GDP',
    UR: '城镇化率',
    PC: '私家车数量',
    FV: '货运总量',
    PCLA: '道路长度',
    EC: '能源强度',
    SI: '第二产业比重',
    TI: '第三产业比重',
    PCES: '人均能耗',
    BUS: '公共车总数',
    PS: '人口总数',
    CC: '煤炭消耗量',
    OC: '原油消耗量',
    NGC: '天然气消耗量',
    EPC: '总耗电量',
    GDP: 'GDP'
};
let factors = [];
let colorMap = {
    'BUS': '#0099CC',
    'PCLA': '#99CC99',
    'PS': '#FF9900',
    'UR': '#FFCC99',
    'CE': '#CC9933',
    'TI': '#666699',
    'EPC': '#993399',
    'FV': '#33CC33',
    'GDP': '#336699',
    'NGC': '#99CCFF',
    'PCGDP': '#CCFF66',
    'PC': '#333333',
    'SI': '#FFCC33'
}

export const initRelationEle = async (dataUrl, moveUrl)=>{
    let data = await axios.get(dataUrl);
    let moveData = await axios.get(moveUrl);
    let eleList = [];
    data = data.data;
    moveData = moveData.data;
    factors = Object.keys(data);
    for(let key in data){
        let flag = true;
        let mark = document.createElement('span');
        mark.setAttribute('class', 'mark');
        mark.style.backgroundColor = colorMap[key];
        eleList.push(<section id={key} className='relation_item' style={{backgroundColor: data[key] >= 0.9 ? 'rgba(153,0,0,0.3)' : data[key] >= 0.8 ? 'rgba(51,153,0,0.3)' : 'rgba(255,153,0,0.3)'}} onClick={(e)=>{
            if(flag){
                PubSub.publish('drawGravityCenter', {
                    data: moveData[key.toLocaleLowerCase()],
                    key,
                    flag
                });
                e.target.parentElement.parentElement.appendChild(mark);
                flag = false;
            }else{
                PubSub.publish('deleteGravityCenter', key);
                mark.remove();
                flag = true;
            }
        }}></section>);
    }
    return eleList;
}

export const drawFactorTrend = async (dataUrl)=>{
    let data = await axios.get(dataUrl);
    let frechetdist = await axios.get('http://localhost:8080/frechetdist.json');
    let chart = null;
    data = data.data;
    frechetdist = frechetdist.data;
    factors.forEach((id)=>{
        chart = echarts.init(document.getElementById(id));
        chart.setOption({
            tooltip: {
                trigger: 'axis'
            },
            title: {
                text: mapToDes[id] + `[${Math.floor((1 - (frechetdist[id] ? frechetdist[id].toFixed(2) : Math.random().toFixed(0))) * 100)}%]`,
                textStyle: {
                    fontSize: 13
                }
            },
            xAxis: {
                type: 'category',
                data: [
                    1997,
                    1998,
                    1999,
                    2000,
                    2001,
                    2002,
                    2003,
                    2004,
                    2005,
                    2006,
                    2007,
                    2008,
                    2009,
                    2010,
                    2011,
                    2012,
                    2013,
                    2014,
                    2015,
                    2016,
                    2017,
                    2018,
                    2019,
                    2020
                ],
                axisLabel: {
                    interval:22
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                show: false
            },
            series: [
                {
                    data: data[id],
                    type: 'line',
                    lineStyle: {
                        color: '#996600'
                    },
                    symbol: 'circle',
                    itemStyle:{
                        normal: {
                            color: '#996600'
                        }
                    },
                    symbolSize: 5
                }
            ]
          });
    });
}
