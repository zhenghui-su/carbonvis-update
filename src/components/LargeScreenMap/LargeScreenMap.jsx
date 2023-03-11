import React, { useEffect, useRef } from 'react';
import PubSub from 'pubsub-js';

import { getChartInstance, showGeoJson, bindEventForChart } from './LargeScreenMap.js'

import './LargeScreenMap.css'

export default function LargeScreenDisplay() {
  const mapLevelStore = useRef({
    level: 1,
    areaName: '山东省',
    year: 2017
  });

  useEffect(() => {
    let chartInstance = getChartInstance('shandongMap', true);
    bindEventForChart(chartInstance.getZr(), 'click', (e) => {
      if ((e.target === undefined && mapLevelStore.current.level === 2)) {
        showGeoJson(chartInstance, 'http://localhost:8080/shandong.json', 'http://localhost:8080/firstLevel.json', mapLevelStore.current.year, 1, '山东省').catch((error) => {
          console.log(error)
        });
        PubSub.publish('cityToggle', { dataName: 'firstLevelCityEmission.json', divisor: 3, cityName: '山东省' });
        mapLevelStore.current.level = 1;
        mapLevelStore.current.areaName = '山东省';
      }
    });
    bindEventForChart(chartInstance, 'dblclick', (e) => {
      if (mapLevelStore.current.level === 1) {
        showGeoJson(chartInstance, `http://localhost:8080/${e.name}.json`, `http://localhost:8080/${e.name}secondLevel.json`, mapLevelStore.current.year, 2, e.name).catch((error) => {
          console.log(error);
        });
        PubSub.publish('cityToggle', { dataName: `${e.name}secondLevelEmission.json`, divisor: 1, cityName: e.name });
        mapLevelStore.current.level = 2;
        mapLevelStore.current.areaName = e.name;
      }
    });
    showGeoJson(chartInstance, 'http://localhost:8080/shandong.json', 'http://localhost:8080/firstLevel.json', mapLevelStore.current.year, 1, '山东省').catch((error) => {
      console.log(error);
    });
    let token = PubSub.subscribe('yearToggle', (_, data) => {
      mapLevelStore.current.year = data.year;
      showGeoJson(chartInstance, `http://localhost:8080/${mapLevelStore.current.level === 1 ? 'shandong' : mapLevelStore.current.areaName}.json`, `http://localhost:8080/${mapLevelStore.current.level === 1 ? 'firstLevel' : mapLevelStore.current.areaName + 'secondLevel'}.json`, data.year, mapLevelStore.current.level, mapLevelStore.current.areaName).catch((error) => {
        console.log(error);
      });
    });
    return () => {
      PubSub.unsubscribe(token);
    }
  }, []);

  return <section className="map" id='shandongMap'></section>;
}
