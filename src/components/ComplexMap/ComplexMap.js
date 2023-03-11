import L from 'leaflet';
import axios from 'axios';
import 'leaflet-dvf';
import 'leaflet.heat';

import "leaflet-geotiff-2";

// optional renderers
import "leaflet-geotiff-2/dist/leaflet-geotiff-rgb";
import "leaflet-geotiff-2/dist/leaflet-geotiff-vector-arrows";
import "leaflet-geotiff-2/dist/leaflet-geotiff-plotty"; // requires plotty

import greenLeaf from '../../marker-icon-2x.png';

const moranColor = {
    ns: 'rgba(255, 255, 255, 0)',
    HH: '#CC3333',
    LH: '#0099CC',
    LL: '#0000CC',
    HL: '#FF9933'
};

const pieChartColor = {
    "能源消耗总量": '#66CCCC',
    "城镇化率": '#6699CC',
    "道路长度": '#9966CC',
    "公共车总数": '#CC9966',
    "人口总数": '#CCFF66',
    "煤炭消耗量": '#FF9966'
}

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

const adcodeMapCity = {
    "370102": "历下区",
    "370103": "市中区",
    "370104": "槐荫区",
    "370105": "天桥区",
    "370112": "历城区",
    "370113": "长清区",
    "370114": "章丘区",
    "370115": "济阳区",
    "370116": "莱芜区",
    "370117": "钢城区",
    "370124": "平阴县",
    "370126": "商河县",
    "370202": "市南区",
    "370203": "市北区",
    "370211": "黄岛区",
    "370212": "崂山区",
    "370213": "李沧区",
    "370214": "城阳区",
    "370215": "即墨区",
    "370281": "胶州市",
    "370283": "平度市",
    "370285": "莱西市",
    "370302": "淄川区",
    "370303": "张店区",
    "370304": "博山区",
    "370305": "临淄区",
    "370306": "周村区",
    "370321": "桓台县",
    "370322": "高青县",
    "370323": "沂源县",
    "370402": "市中区",
    "370403": "薛城区",
    "370404": "峄城区",
    "370405": "台儿庄区",
    "370406": "山亭区",
    "370481": "滕州市",
    "370502": "东营区",
    "370503": "河口区",
    "370505": "垦利区",
    "370522": "利津县",
    "370523": "广饶县",
    "370602": "芝罘区",
    "370611": "福山区",
    "370612": "牟平区",
    "370613": "莱山区",
    "370614": "蓬莱区",
    "370681": "龙口市",
    "370682": "莱阳市",
    "370683": "莱州市",
    "370685": "招远市",
    "370686": "栖霞市",
    "370687": "海阳市",
    "370702": "潍城区",
    "370703": "寒亭区",
    "370704": "坊子区",
    "370705": "奎文区",
    "370724": "临朐县",
    "370725": "昌乐县",
    "370781": "青州市",
    "370782": "诸城市",
    "370783": "寿光市",
    "370784": "安丘市",
    "370785": "高密市",
    "370786": "昌邑市",
    "370811": "任城区",
    "370812": "兖州区",
    "370826": "微山县",
    "370827": "鱼台县",
    "370828": "金乡县",
    "370829": "嘉祥县",
    "370830": "汶上县",
    "370831": "泗水县",
    "370832": "梁山县",
    "370881": "曲阜市",
    "370883": "邹城市",
    "370902": "泰山区",
    "370911": "岱岳区",
    "370921": "宁阳县",
    "370923": "东平县",
    "370982": "新泰市",
    "370983": "肥城市",
    "371002": "环翠区",
    "371003": "文登区",
    "371082": "荣成市",
    "371083": "乳山市",
    "371102": "东港区",
    "371103": "岚山区",
    "371121": "五莲县",
    "371122": "莒县",
    "371302": "兰山区",
    "371311": "罗庄区",
    "371312": "河东区",
    "371321": "沂南县",
    "371322": "郯城县",
    "371323": "沂水县",
    "371324": "兰陵县",
    "371325": "费县",
    "371326": "平邑县",
    "371327": "莒南县",
    "371328": "蒙阴县",
    "371329": "临沭县",
    "371402": "德城区",
    "371403": "陵城区",
    "371422": "宁津县",
    "371423": "庆云县",
    "371424": "临邑县",
    "371425": "齐河县",
    "371426": "平原县",
    "371427": "夏津县",
    "371428": "武城县",
    "371481": "乐陵市",
    "371482": "禹城市",
    "371502": "东昌府区",
    "371503": "茌平区",
    "371521": "阳谷县",
    "371522": "莘县",
    "371524": "东阿县",
    "371525": "冠县",
    "371526": "高唐县",
    "371581": "临清市",
    "371602": "滨城区",
    "371603": "沾化区",
    "371621": "惠民县",
    "371622": "阳信县",
    "371623": "无棣县",
    "371625": "博兴县",
    "371681": "邹平市",
    "371702": "牡丹区",
    "371703": "定陶区",
    "371721": "曹县",
    "371722": "单县",
    "371723": "成武县",
    "371724": "巨野县",
    "371725": "郓城县",
    "371726": "鄄城县",
    "371728": "东明县"
}

let gravityLayers = [];
let geoJsonLayer = null;
let gravityLayer = {};

export const markTemRain = (latLon, map)=>{
    let greenIcon = L.icon({
        iconUrl: greenLeaf,
        iconSize:     [20, 38],
        iconAnchor:   [22, 94],
    });
    L.marker(latLon, {icon: greenIcon}).addTo(map).on('click', (e)=>{
        e.target.remove();
    });
};

export const loadMgwrPieChart = async (dataUrl, geoUrl)=>{
    // 创建pieChart图层
    let data = await axios.get(dataUrl);
    let geoData = await axios.get(geoUrl);
    let chartOptions = null;
    let pieChartsList = [];
    data.data.forEach((item)=>{
        chartOptions = {};
        for(let key in item.data){
            item.data[key] = item.data[key] * 5;
            chartOptions[key] = {
                fillColor: pieChartColor[key],
                color: '#bbb',
                minValue: 0,
                maxValue: 20,
                maxHeight: 20,
                displayText: function (value) {
                    return '';
                }
            }
        }
        pieChartsList.push(new L.CoxcombChartMarker(new L.LatLng(item.lat, item.lon), {
            data: item.data,
            chartOptions,
            weight: 1,
            radius: 80,
            fillOpacity: 1
        }));
    });

    geoJsonLayer = L.geoJSON(geoData.data, {
        onEachFeature: (feature, layer)=>{
            layer.bindPopup(feature.properties.name);
        },
        style: {
            color:'rgba(220, 220, 220, 0.5)',
            fill: false,
            // fillColor: '#fff',
            // fillOpacity: 0.1
        }
    });
    pieChartsList.unshift(geoJsonLayer);
    return L.layerGroup(pieChartsList);
}

export const loadHeatmap = async (map, dataUrl)=>{
    let data = await axios.get(dataUrl);
    L.heatLayer(data.data[2017], {
        radius: 25,
        minOpacity: 0.1,
        gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'}
    }).addTo(map);
}

export const loadMap = (layers)=>{
    // 'http://wprd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7'
    let baseLayer = L.tileLayer('https://api.mapbox.com/styles/v1/smallma/cl06fupgu00kw15oa4pq4y9i3/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic21hbGxtYSIsImEiOiJja3lxeTRwdGUwaHpnMnV0Z2puN3hqY2Y4In0.JPUf6RG-a2zrvBVsyKLAFA');
    layers.push(baseLayer);
    let map = L.map('complex_map', {
        center: [36.40, 117],
        zoom: 7,
        layers
    });
    return {map, baseLayer};
};

export const deleteGravityCenter = (key)=>{
    gravityLayer[key].remove();
};

export const drawGravityCenter = (lineData, map, key)=>{
    let startCircle = L.circle(lineData[0], {
        color: '#006633',
        fillColor: '#006633',
        fillOpacity: 0.5,
        radius: 50
    });
    let endCircle = L.circle(lineData[lineData.length - 1], {
        color: '#000',
        fillColor: '#000',
        fillOpacity: 0.5,
        radius: 50
    });
    let layer = L.layerGroup([L.polyline(lineData, {color: colorMap[key]}), startCircle, endCircle]).addTo(map);
    gravityLayer[key] = layer;
};

export const drawCarbonGravity = async (dataUrl)=>{
    let data = await axios.get(dataUrl);
    data = data.data.carbon;
    let startCircle = L.circle(data[0], {
        color: '#006633',
        fillColor: '#006633',
        fillOpacity: 0.5,
        radius: 50
    });
    let endCircle = L.circle(data[data.length - 1], {
        color: '#000',
        fillColor: '#000',
        fillOpacity: 0.5,
        radius: 50
    });
    return L.layerGroup([L.polyline(data, {color: '#CC0033'}), startCircle, endCircle]);
}

export const addLayerControl = (baseLayer, overLayer, map)=>{
    return L.control.layers({
        '底图': baseLayer
    }, overLayer).addTo(map);
}

export const loadMoran = async (geoDataUrl, moranDataUrl, year)=>{
    let geoJson = await axios.get(geoDataUrl);
    let moran = await axios.get(moranDataUrl);
    geoJsonLayer && geoJsonLayer.remove();
    let index = -1;
    geoJson = geoJson.data;
    moran = moran.data[year].lisa;
    geoJsonLayer = L.geoJSON(geoJson, {
        onEachFeature: (feature, layer)=>{
            layer.bindPopup(adcodeMapCity[feature.properties.adcode]);
        },
        style: (feature)=>{
            index++;
            return {
                color: moranColor[moran[index]]
            };
        }
    });
    return geoJsonLayer;
}

export const addControl = (map)=>{    
    // 自定义添加图例
    L.Control.Legend = L.Control.extend({
        onAdd: ()=>{
            let dom = L.DomUtil.create('div', 'legend');
            let legendList = '';
            for(let key in moranColor){
                if(key !== 'ns'){
                    legendList += `<div class='legendItem'><span class=${key}></span><span>${key}</span></div>`
                }
            }
            dom.style.padding = '4px';
            dom.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
            dom.style.fontWeight = '800';
            dom.style.borderRadius = '4px';
            dom.style.color = '#fff';
            dom.innerHTML = legendList;
            return dom;
        },
        onRemove: ()=>{}
    });
    L.control.legend = (opts)=>{
        return new L.Control.Legend(opts);
    };
    L.control.legend({
        position: 'bottomright'
    }).addTo(map);
}