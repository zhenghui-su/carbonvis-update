import axios from "axios";

export const initChart = ()=>{
//    显示第一个， 隐藏其他
    let tablist = document.getElementById('tablist');
    let tabs = tablist.getElementsByTagName("section");
    tabs[0].className = "active";/*标签默认显示PM2.5*/
    tabs[1].className = "";
    tabs[2].className = "";
    tabs[3].className = "";

    let charts = document.getElementsByClassName('chart');
    charts[0].style.display = "block";/*图表默认显示PM2.5*/
    charts[1].style.display = "none";
    charts[2].style.display = "none";
    charts[3].style.display = "none";

}

export const setClick = ()=>{
    let tablist = document.getElementById('tablist');
    let tabs = tablist.getElementsByTagName("section");
    let charts = document.getElementsByClassName('chart');
    for(let i=0;i<tabs.length;i++){
        tabs[i].onclick = function (){
            for (let j=0;j<tabs.length;j++){
                charts[j].style.display = "none";
                tabs[j].className = "";
            }
            charts[i].style.display = "block";
            tabs[i].className = "active";
        }
    }
}

export const showPmTreemap = async (chartInstance,dataUrl,whichYear)=>{
    let data = await axios.get(dataUrl);
    let rawData = [];
    for(let i=0;i<data.data.length;i++){
        rawData.push({
            name:data.data[i].name,
            value:data.data[i].PM
        })
    }
    chartInstance.setOption({
        title: {
            text: `${whichYear}年山东碳排放情况`,
            left: 'center'
        },
        tooltip: {},
        grid:{
            top: '10%',
            left:'5%',
            right:'5%',
            bottom:"5%"
        },
        series: [{
            name: 'PM2.5',
            type: 'treemap',
            visibleMin: 300,
            data: rawData,
            roam: false, //是否开启拖拽漫游（移动和缩放）
            // nodeClick: false, //点击节点后的行为,false无反应
            leafDepth: 2,

            levels: [
                {
                    itemStyle: {
                        normal: {
                            borderColor: '#555',
                            borderWidth: 4,
                            gapWidth: 4
                        }
                    }
                },
                {
                    colorSaturation: [0.3, 0.6],
                    itemStyle: {
                        normal: {
                            borderColorSaturation: 0.7,
                            gapWidth: 1,
                            borderWidth: 2
                        }
                    }
                },
                {
                    colorSaturation: [0.3, 0.5],
                    itemStyle: {
                        normal: {
                            borderColorSaturation: 0.6,
                            gapWidth: 1
                        }
                    }
                },
                {
                    colorSaturation: [0.3, 0.5]
                }
            ]
        }]
    });
};
export const showPersonCarbonTreemap = async (chartInstance,dataUrl,whichYear)=>{
    let data = await axios.get(dataUrl);
    let rawData = [];
    for(let i=0;i<data.data.length;i++){
        rawData.push({
            name:data.data[i].name,
            value:data.data[i].PSC
        })
    }
    chartInstance.setOption({
        title: {
            text: `${whichYear}年山东碳排放情况`,
            left: 'center'
        },
        tooltip: {},
        series: [{
            name: '人均碳排放量',
            type: 'treemap',
            visibleMin: 300,
            data: rawData,
            roam: false, //是否开启拖拽漫游（移动和缩放）
            // nodeClick: false, //点击节点后的行为,false无反应
            leafDepth: 2,
            levels: [
                {
                    itemStyle: {
                        normal: {
                            borderColor: '#555',
                            borderWidth: 4,
                            gapWidth: 4
                        }
                    }
                },
                {
                    colorSaturation: [0.3, 0.6],
                    itemStyle: {
                        normal: {
                            borderColorSaturation: 0.7,
                            gapWidth: 1,
                            borderWidth: 2
                        }
                    }
                },
                {
                    colorSaturation: [0.3, 0.5],
                    itemStyle: {
                        normal: {
                            borderColorSaturation: 0.6,
                            gapWidth: 1
                        }
                    }
                },
                {
                    colorSaturation: [0.3, 0.5]
                }
            ]
        }]
    })
};
export const showGdpCarbonTreemap = async (chartInstance,dataUrl,whichYear)=>{
    let data = await axios.get(dataUrl);
    let rawData = [];
    for(let i=0;i<data.data.length;i++){
        rawData.push({
            name:data.data[i].name,
            value:data.data[i].GDPC
        })
    }
    chartInstance.setOption({
        title: {
            text: `${whichYear}年山东碳排放情况`,
            left: 'center'
        },
        tooltip: {},
        series: [{
            name: '单位GDP碳排放量',
            type: 'treemap',
            visibleMin: 300,
            data: rawData,
            roam: false, //是否开启拖拽漫游（移动和缩放）
            // nodeClick: false, //点击节点后的行为,false无反应
            leafDepth: 2,
            levels: [
                {
                    itemStyle: {
                        normal: {
                            borderColor: '#555',
                            borderWidth: 4,
                            gapWidth: 4
                        }
                    }
                },
                {
                    colorSaturation: [0.3, 0.6],
                    itemStyle: {
                        normal: {
                            borderColorSaturation: 0.7,
                            gapWidth: 1,
                            borderWidth: 2
                        }
                    }
                },
                {
                    colorSaturation: [0.3, 0.5],
                    itemStyle: {
                        normal: {
                            borderColorSaturation: 0.6,
                            gapWidth: 1
                        }
                    }
                },
                {
                    colorSaturation: [0.3, 0.5]
                }
            ]
        }]
    })
};
export const showSumCarbonTreemap = async (chartInstance,dataUrl,whichYear)=>{
    let data = await axios.get(dataUrl);
    let rawData = [];
    for(let i=0;i<data.data.length;i++){
        rawData.push({
            name:data.data[i].name,
            value:data.data[i].carbon
        })
    }
    chartInstance.setOption({
        title: {
            text: `${whichYear}年山东碳排放情况`,
            left: 'center'
        },
        tooltip: {},
        series: [{
            name: '总碳排放量',
            type: 'treemap',
            visibleMin: 300,
            data: rawData,
            roam: false, //是否开启拖拽漫游（移动和缩放）
            // nodeClick: false, //点击节点后的行为,false无反应
            leafDepth: 2,
            levels: [
                {
                    itemStyle: {
                        normal: {
                            borderColor: '#555',
                            borderWidth: 4,
                            gapWidth: 4
                        }
                    }
                },
                {
                    colorSaturation: [0.3, 0.6],
                    itemStyle: {
                        normal: {
                            borderColorSaturation: 0.7,
                            gapWidth: 1,
                            borderWidth: 2
                        }
                    }
                },
                {
                    colorSaturation: [0.3, 0.5],
                    itemStyle: {
                        normal: {
                            borderColorSaturation: 0.6,
                            gapWidth: 1
                        }
                    }
                },
                {
                    colorSaturation: [0.3, 0.5]
                }
            ]
        }]
    })
};

