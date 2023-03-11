import axios from "axios";
import { Chart } from '@antv/g2';

const nameMap = {
  carbon: '碳排放量',
  CE: '能源消耗总量',
  UR: '城镇化率',
  PCLA: '道路总长',
  BUS: '公共车辆总数',
  PS: '人口总数',
  CC: '煤炭消耗量'
}

export const drawCarbonTrendGra = async (dataUrl, key)=>{
    let data = await axios.get(dataUrl);
    data = data.data;

    const chart = new Chart({
        container: 'trendChart',
        autoFit: true,
        height: 500
    });

    chart.scale({
        carbon: {
            sync: true,
            nice: true,
        }
    });
    chart.tooltip({
        shared: true,
        showMarkers: false,
        showCrosshairs: true
    });

    const v1 = chart.createView({
        padding: [32, 24, 32, 37]
    });
    v1.data(data.data);
    v1.scale('carbon', {
        alias: '浮动区间'
    });
    v1.area().position('time*carbon');

    const v2 = chart.createView({
        padding: 32
    });
    v2.data(data.values);
    v2.axis(false);
    v2.scale('carbon', {
        alias: nameMap[key]
    });
    v2.line().position('time*carbon');
    v2.point()
    .position('time*carbon')
    .size(4)
    .shape('circle')
    .style({
        stroke: '#fff',
        lineWidth: 1,
        fillOpacity: 1,
    });

    chart.render();
    return {
        v1,
        v2
    }
};