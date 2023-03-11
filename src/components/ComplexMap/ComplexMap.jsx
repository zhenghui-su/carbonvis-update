import React,{useEffect} from 'react';
import PubSub from 'pubsub-js';
import L from 'leaflet';

import {loadMap, loadMoran, drawCarbonGravity, loadMgwrPieChart, addLayerControl, addControl, markTemRain, drawGravityCenter, deleteGravityCenter} from './ComplexMap.js';

import './ComplexMap.css'

export default function ComplexMap() {
  useEffect(async ()=>{
    let lisaLayer = await loadMoran('http://localhost:8080/山东省各县.json', 'http://localhost:8080/moran.json', 2017);
    let gravityLayer = await drawCarbonGravity('http://localhost:8080/gravity_center.json');
    let chartLayer = await loadMgwrPieChart('http://localhost:8080/2017yearNewMGWR.json', 'http://localhost:8080/山东省.json');
    const {map, baseLayer} = loadMap([lisaLayer, gravityLayer, chartLayer]);
    let layerDropList = addLayerControl(baseLayer, {
      'Lisa聚集图': lisaLayer,
      '碳排放轨迹': gravityLayer,
      '区域异质性': chartLayer
    }, map);
    addControl(map);
    let markToken = PubSub.subscribe('mark', (_, data)=>{
      markTemRain(data, map);
    });
    let drawGravityToken = PubSub.subscribe('drawGravityCenter', (_, data)=>{
      drawGravityCenter(data.data, map, data.key);
    });
    let deleteGravityToken = PubSub.subscribe('deleteGravityCenter', (_, data)=>{
      deleteGravityCenter(data);
    });
    let repaintToken = PubSub.subscribe('updateLayer', async (_, year)=>{
      lisaLayer.remove();
      chartLayer.remove();
      layerDropList.remove();
      lisaLayer = await loadMoran('http://localhost:8080/山东省各县.json', 'http://localhost:8080/moran.json', year);
      chartLayer = await loadMgwrPieChart(`http://localhost:8080/${year}yearNewMGWR.json`, 'http://localhost:8080/山东省.json');
      layerDropList = addLayerControl(baseLayer, {
        'Lisa聚集图': lisaLayer,
        '碳排放轨迹': gravityLayer,
        '区域异质性': chartLayer
      }, map);
    });
    return ()=>{
      PubSub.unsubscribe(markToken);
      PubSub.unsubscribe(drawGravityToken);
      PubSub.unsubscribe(deleteGravityToken);
      PubSub.unsubscribe(repaintToken);
    }
  }, []);
  return (
    <section className="complexMap" id="complex_map"></section>
  );
}