import axios from "axios";

export const showWordCloud = async (chartInstance)=>{
    let colorList = [
        '#7295d4', '#d8a499', '#c6cdf7', '#e6a0c4', '#99cccc', '#ccccff'
    ]
    let colorListLen = colorList.length
    let fontSizeList = [
        12, 12.5, 13, 13.5, 14, 14.5,
        15, 15.5, 16, 16.5, 17, 17.5,
        18, 18.5, 19, 19.5, 20, 20.5,
        21, 22, 23,
        24
    ]
    let fontSizeListLen = fontSizeList.length
    let bgColor = '#fffcf9'
    let canDraggable = false

    chartInstance.setOption({
        title: {
            text: '碳中和热词',
            left: "center"
        },
        tooltip: {
            show: true,
            position: 'top',
            extraCssText: 'white-space: normal; word-break: break-all;',
            formatter: function (obj){
                // console.log(obj);
                if(obj.data.text === undefined){
                    return '<div style="">'+ obj.data.name + '</div>';
                }
                else{
                    return '<div style="">'+ obj.data.name + " : " + obj.data.text + '</div>';
                }
            }
        },
        toolbox: {
            show: true,
            feature: {
                // dataView: {readOnly: false},
                // magicType: {type: ['line', 'bar']},
                restore: {},
                // saveAsImage: {}
            }
        },

        itemStyle: {
            color: bgColor
        },
        series: [{
            type: 'graph',
            layout: 'force',
            force: {
                repulsion: 80,
                edgeLength: 10
            },
            roam: 'scale',
            // symbol: '',
            symbolSize: 0,
            label: {
                show: true,
                color: 'auto',
                fontSize: 14
            },
            data: [{
                name: '碳达峰',
                text: "碳达峰就是指在某一个时点，二氧化碳的排放不再增长达到峰值，之后逐步回落。碳达峰是二氧化碳排放量由增转降的历史拐点，标志着碳排放与经济发展实现脱钩，达峰目标包括达峰年份和峰值。",
                value: 0,
                draggable: canDraggable,
                itemStyle: {
                    color: bgColor
                },
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '碳中和',
                text: "碳中和是指国家、企业、产品、活动或个人在一定时间内直接或间接产生的二氧化碳或温室气体排放总量，通过植树造林、节能减排等形式，以抵消自身产生的二氧化碳或温室气体排放量，实现正负抵消，达到相对“零排放”。",
                value: 0,
                draggable: canDraggable,
                itemStyle: {
                    color: bgColor
                },
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '智慧能源',
                value: 0,
                draggable: canDraggable,
                itemStyle: {
                    color: bgColor
                },
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '碳捕集利用与封存',
                value: 0,
                draggable: canDraggable,
                itemStyle: {
                    color: bgColor
                },
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '全国统筹',
                value: 0,
                draggable: canDraggable,
                itemStyle: {
                    color: bgColor
                },
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '碳排放',
                text: "碳排放是指在生产、运输、使用及回收该产品时所产生的平均温室气体排放量。而动态的碳排放量，则是指每单位货品累积排放的温室气体量，同一产品的各个批次之间会有不同的动态碳排放量。",
                value: 0,
                draggable: canDraggable,
                itemStyle: {
                    color: bgColor
                },
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '生态系统',
                text: "指在自然界的一定的空间内，生物与环境构成的统一整体，在这个统一整体中，生物与环境之间相互影响、相互制约，并在一定时期内处于相对稳定的动态平衡状态。生态系统的范围可大可小，相互交错，太阳系就是一个生态系统，太阳就像一台发动机，源源不断给太阳系提供能量。",
                value: 0,
                draggable: canDraggable,
                itemStyle: {
                    color: bgColor
                },
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '可持续发展',
                text: "可持续发展是建立在社会、经济、人口、资源、环境相互协调和共同发展的基础上的一种发展， 其宗旨是既能相对满足当代人的需求，又不能对后代人的发展构成危害。",
                value: 0,
                draggable: canDraggable,
                itemStyle: {
                    color: bgColor
                },
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '碳交易',
                text: "碳交易是温室气体排放权交易的统称，在《京都协议书》要求减排的6种温室气体中，二氧化碳为最大宗，因此，温室气体排放权交易以每吨二氧化碳当量为计算单位。在排放总量控制的前提下，包括二氧化碳在内的温室气体排放权成为一种稀缺资源，从而具备了商品属性。",
                value: 0,
                draggable: canDraggable,
                itemStyle: {
                    color: bgColor
                },
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '节约优先',
                value: 0,
                draggable: canDraggable,
                // itemStyle: {
                //     color: bgColor
                // },
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '监管科技',
                value: 0,
                draggable: canDraggable,
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '碳金融科技',
                value: 0,
                draggable: canDraggable,
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '土壤有机碳库',
                text: "即碳的储存库，通常包括地上生物量、地下生物量、枯落物、枯死木和土壤有机质碳库。其单位为质量单位。",
                value: 0,
                draggable: canDraggable,
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '碳排放权',
                text:"碳排放权，是具有价值的资产，可以作为商品在市场上进行交换——减排困难的企业可以向减排容易的企业购买碳排放权，后者替前者完成减排任务，同时也获得收益，这就是碳交易的基本原理。",
                value: 0,
                draggable: canDraggable,
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '产业集群',
                value: 0,
                draggable: canDraggable,
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '碳汇',
                text: "是指通过植树造林、植被恢复等措施，吸收大气中的二氧化碳，从而减少温室气体在大气中浓度的过程、活动或机制。",
                value: 0,
                draggable: canDraggable,
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '源汇匹配优先',
                value: 0,
                draggable: canDraggable,
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '双轮驱动',
                value: 0,
                draggable: canDraggable,
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '碳排放配额',
                value: 0,
                draggable: canDraggable,
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '绿色金融',
                value: 0,
                draggable: canDraggable,
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '二氧化碳',
                value: 0,
                draggable: canDraggable,
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '机遇',
                value: 0,
                draggable: canDraggable,
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '挑战',
                value: 0,
                draggable: canDraggable,
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '实现路径',
                value: 0,
                draggable: canDraggable,
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '发展模式',
                value: 0,
                draggable: canDraggable,
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '碳减排',
                text: "就是减少二氧化碳等温室气体的排放量。随着全球气候变暖，二氧化碳等温室气体的排放量必须减少，从而缓解人类的气候危机。",
                value: 0,
                draggable: canDraggable,
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '碳效率',
                value: 0,
                draggable: canDraggable,
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '《我国碳达峰碳中和战略及路径》',
                text: "2022年3月31日，第六届创新与新兴产业发展国际会议上，中国工程院发布重大咨询项目《我国碳达峰碳中和战略及路径》成果。该重大咨询项目由40多位院士、300多位专家、数十家单位，重点围绕产业结构、能源、电力、工业、建筑、交通、碳移除等方面展开系统研究，旨在贯彻落实党中央、国务院关于实现碳达峰碳中和重大决策部署，为我国实现碳达峰碳中和提供战略及路径选择。",
                value: 0,
                draggable: canDraggable,
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }, {
                name: '环境科学与资源利用',
                value: 0,
                draggable: canDraggable,
                label: {
                    color: colorList[Math.floor(Math.random() * colorListLen)],
                    fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
            }]
        }]
    });
};
