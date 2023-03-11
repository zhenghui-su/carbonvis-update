import axios from "axios";

export const showPmAndTem = async (chartInstance, dataUrl, year)=>{
    let data = await axios.get(dataUrl);
    let countries = data.data.city;
    data = data.data.data;
    // console.log(data);
    // console.log(countries);
    function getMax(dim) {
        let max = 0;
        data.forEach(function (item) {
            if (item[dim] > max) {
                max = item[dim];
            }
        });
        let exp = Math.round(Math.log(max) / Math.log(10));
        let exp10 = Math.pow(10, exp);
        max = Math.ceil(max / exp10 * 10) / 10 * exp10;
        return max;
    }

    chartInstance.setOption({
        title: {
            text: `${year}年各省PM2.5,温度和人均碳排放`,
            right: 'center'
        },
        tooltip: {
            padding: 5,
            borderWidth: 1
        },
        xAxis: {
            type: 'value',
            name: '温度',
            min: 0,
            max: getMax(0)
        },
        yAxis: {
            type: 'value',
            name: 'PM2.5',
            min: 0,
            max: getMax(1)
        },
        grid: {
            left: "20%",
            right: "7%",
            bottom: "7%"
        },
        toolbox: {
            top: 25,
            left: 10,
            itemSize: 200
        },
        visualMap: [
            {
                show: false,
                type: 'piecewise',
                dimension: 3,
                categories: countries,
                top: "5%",
                bottom: "3%",
                calculable: true,
                precision: 0.1,
                textGap: 10,
                itemGap: 3,
                inRange: {
                    color: ['#bcd3bb', '#e88f70', '#9dc5c8', '#e1e8c8', '#7b7c68', '#e5b5b5', '#f0b489', '#928ea8', '#bda29a', '#376956', '#c3bed4', '#495a80', '#9966cc', '#bdb76a', '#eee8ab', '#a35015', '#04dd98', '#d9b3e6', '#b6c3fc','#315dbc','#c5c975','#476a54','#66e638','#a59619','#822ee2','#49450d','#eeebd4','#2b98dc','#b95c25', '#8f1ec2', '#d50390', '#36a15d', '#edc1a5']
                }
            },
            {
                show: true,
                type: 'piecewise',
                dimension: 2,
                // bottom:"7%",
                top:"15%",
                min: 0,
                max: 30,
                inRange: {
                    symbolSize: [30, 70],
                    color: ['#CCFFFF', '#CCFFCC', '#FFFFCC', '#99CCFF', '#9966CC']
                }
            },
        ],
        series: {
            id: 'gridScatter',
            type: 'scatter',
            data: data.map(function (item, index) {
                return item.concat([countries[index]]);
            }),
            tooltip: {
                formatter: function(obj) {
                    let value = obj.value;
                    return '<div style="border-bottom: 1px solid; padding-bottom: 5px; margin-bottom: 5px;">' + value[3] + '</div>'
                        + '温度：' + value[0] + '℃<br>'
                        + 'PM2.5：' + value[1] + '<br>'
                        + '人均碳排放量：' + value[2] + '吨<br>';
                }
            },
            label: {
                show: true,
                formatter: function (p){
                    return p.data[3];
                }
            }
        }
    });
};
