import axios from 'axios';
import {TableSheet, S2Event} from '@antv/s2';

const createYearTableStyle = (startYear, endYear, factorName)=>{
    const columns = ['city'];
    const meta = [{field: 'city', name: '市'}];
    const text = [];
    const interval = [];
    for(let year = startYear; year <= endYear; year++){
        columns.push(year + '');
        meta.push({
            field: year + '',
            name: year + factorName,
        });
        text.push({
            field: year + '',
            mapping(fieldValue, data) {
                return {
                    fill: 'transparent'
                };
            }
        });
        interval.push({
            field: year + '',
            mapping(value, _) {
                return {
                    fill: value > 0 ? 'rgba(204, 51, 51, 0.4)' : 'rgba(0, 153, 0.4)',
                    // 自定义柱状图范围
                    isCompare: true,
                    maxValue: 2,
                    minValue: -2,
                };
            }
        });
    }
    return {
        columns,
        meta,
        text,
        interval
    }
}

const selectHeaderOfCol = (tableInstance, whichYear)=>{
    let flag = true;
    tableInstance.on(S2Event.GLOBAL_SELECTED, (event) => {
        if(flag && event[0].cfg.parent.cfg.name === "colScrollGroup"){
            flag = false;
            if(parseInt(event[0].actualText)){
                drawAllFactorsTable(`http://localhost:8080/${whichYear}MGWR.json`, whichYear).then(()=>{
                    flag = true;
                });
            }else{
                drawYearFactorsTable(`http://localhost:8080/${event[0].actualText}yearMGWR.json`, event[0].actualText, whichYear).then(()=>{
                    flag = true;
                });
            }
        }
    })
}

const drawYearFactorsTable = async (dataUrl, factorName, whichYear)=>{
    let tableContainer = document.getElementById('moranTable');
    tableContainer.innerHTML = '';
    let data = await axios.get(dataUrl);
    data = data.data;
    const {columns, meta, text, interval} = createYearTableStyle(2005, 2017, factorName);
    let table = new TableSheet(tableContainer, {
        fields: {
            columns
        },
        meta,
        data: data
    }, {
        width: tableContainer.offsetWidth,
        height: tableContainer.offsetHeight,
        style: {
            layoutWidthType: 'colAdaptive'
        },
        interaction: {
            hoverHighlight: false,
        },
        showSeriesNumber: false,
        conditions: {
            text,
            interval,
        }
    });
    table.setThemeCfg({
        theme: {
            colCell: {
                cell: {
                    horizontalBorderColor: '#ccc',
                    verticalBorderColor: '#ccc',
                    verticalBorderWidth: 1,
                    horizontalBorderWidth: 1,
                    backgroundColor: '#fff',
                    interactionState: {
                        hover: {
                            backgroundColor: '#ccc',
                            backgroundOpacity: 1,
                        },
                        selected: {
                            backgroundColor: '#ccc',
                        },
                    }
                }
            },
            dataCell: {
                cell: {
                    horizontalBorderColor: '#ccc',
                    verticalBorderColor: '#ccc',
                    verticalBorderWidth: 1,
                    horizontalBorderWidth: 1,
                    interactionState: {
                        hoverFocus: {
                            backgroundColor: '#ddd',
                            backgroundOpacity: 1,
                            borderColor: '#ccc',
                        },
                        selected: {
                            backgroundColor: '#ddd',
                            backgroundOpacity: 1,
                        }
                    }
                }
            }
        }
    });
    table.render();
    selectHeaderOfCol(table, whichYear);
}

export const drawAllFactorsTable = async (dataUrl, whichYear)=>{
    let tableContainer = document.getElementById('moranTable');
    tableContainer.innerHTML = '';
    let data = await axios.get(dataUrl);
    data = data.data;
    let table = new TableSheet(tableContainer, {
        fields: {
            columns: ['city', 'CE', 'UR', 'PCLA', 'BUS', 'PS', 'CC']
        },
        meta: [
            {
                field: 'city',
                name: '市',
            },
            {
                field: 'CE',
                name: 'CE',
            },
            {
                field: 'UR',
                name: 'UR',
            },
            {
                field: 'PCLA',
                name: 'PCLA',
            },
            {
                field: 'BUS',
                name: 'BUS',
            },
            {
                field: 'PS',
                name: 'PS',
            },
            {
                field: 'CC',
                name: 'CC',
            }
        ],
        data: data
    }, {
        width: tableContainer.offsetWidth,
        height: tableContainer.offsetHeight,
        style: {
            layoutWidthType: 'colAdaptive'
        },
        interaction: {
            hoverHighlight: false,
        },
        showSeriesNumber: false,
        conditions: {
            text: [
                {
                    field: 'CE',
                    mapping(fieldValue, data) {
                        return {
                            fill: 'transparent'
                        };
                    }
                },
                {
                    field: 'UR',
                    mapping(fieldValue, data) {
                        return {
                            fill: 'transparent'
                        };
                    }
                },
                {
                    field: 'PCLA',
                    mapping(fieldValue, data) {
                        return {
                            fill: 'transparent'
                        };
                    }
                },
                {
                    field: 'BUS',
                    mapping(fieldValue, data) {
                        return {
                            fill: 'transparent'
                        };
                    }
                },
                {
                    field: 'PS',
                    mapping(fieldValue, data) {
                        return {
                            fill: 'transparent'
                        };
                    }
                },
                {
                    field: 'CC',
                    mapping(fieldValue, data) {
                        return {
                            fill: 'transparent'
                        };
                    }
                }
            ],
            interval: [
                {
                    field: 'CE',
                    mapping(value, _) {
                        return {
                            fill: value > 0 ? 'rgba(204, 51, 51, 0.4)' : 'rgba(0, 153, 0.4)',
                            // 自定义柱状图范围
                            isCompare: true,
                            maxValue: 2,
                            minValue: -2,
                        };
                    }
                },
                {
                    field: 'UR',
                    mapping(value, _) {
                        return {
                            fill: value > 0 ? 'rgba(204, 51, 51, 0.4)' : 'rgba(0, 153, 0.4)',
                            // 自定义柱状图范围
                            isCompare: true,
                            maxValue: 2,
                            minValue: -2,
                        };
                    }
                },
                {
                    field: 'PCLA',
                    mapping(value, _) {
                        return {
                            fill: value > 0 ? 'rgba(204, 51, 51, 0.4)' : 'rgba(0, 153, 0.4)',
                            // 自定义柱状图范围
                            isCompare: true,
                            maxValue: 2,
                            minValue: -2,
                        };
                    }
                },
                {
                    field: 'BUS',
                    mapping(value, _) {
                        return {
                            fill: value > 0 ? 'rgba(204, 51, 51, 0.4)' : 'rgba(0, 153, 0.4)',
                            // 自定义柱状图范围
                            isCompare: true,
                            maxValue: 2,
                            minValue: -2,
                        };
                    }
                },
                {
                    field: 'PS',
                    mapping(value, _) {
                        return {
                            fill: value > 0 ? 'rgba(204, 51, 51, 0.4)' : 'rgba(0, 153, 0.4)',
                            // 自定义柱状图范围
                            isCompare: true,
                            maxValue: 2,
                            minValue: -2,
                        };
                    }
                },
                {
                    field: 'CC',
                    mapping(value, _) {
                        return {
                            fill: value > 0 ? 'rgba(204, 51, 51, 0.4)' : 'rgba(0, 153, 0.4)',
                            // 自定义柱状图范围
                            isCompare: true,
                            maxValue: 2,
                            minValue: -2,
                        };
                    }
                }
            ],
        }
    });
    table.setThemeCfg({
        theme: {
            colCell: {
                cell: {
                    horizontalBorderColor: '#ccc',
                    verticalBorderColor: '#ccc',
                    verticalBorderWidth: 1,
                    horizontalBorderWidth: 1,
                    backgroundColor: '#fff',
                    interactionState: {
                        hover: {
                            backgroundColor: '#ccc',
                            backgroundOpacity: 1,
                        },
                        selected: {
                            backgroundColor: '#ccc',
                        },
                    }
                }
            },
            dataCell: {
                cell: {
                    horizontalBorderColor: '#ccc',
                    verticalBorderColor: '#ccc',
                    verticalBorderWidth: 1,
                    horizontalBorderWidth: 1,
                    interactionState: {
                        hoverFocus: {
                            backgroundColor: '#ddd',
                            backgroundOpacity: 1,
                            borderColor: '#ccc',
                        },
                        selected: {
                            backgroundColor: '#ddd',
                            backgroundOpacity: 1,
                        }
                    }
                }
            }
        }
    });
    table.render();
    selectHeaderOfCol(table, whichYear);
}