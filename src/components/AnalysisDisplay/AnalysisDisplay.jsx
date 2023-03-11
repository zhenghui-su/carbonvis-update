import React from 'react';

import FilterAndForecast from '../FilterAndForecast/FilterAndForecast.jsx';
import Moran from '../Moran/Moran.jsx';
import Gravity from '../Gravity/Gravity.jsx';
import ComplexMap from '../ComplexMap/ComplexMap.jsx';
import Relation from '../Relation/Relation.jsx';
import TemRain from '../TemRain/TemRain.jsx';
import {} from './AnalysisDisplay.js';

import './AnalysisDisplay.css';

export default function AnalysisDisplay() {

  return (
    <section className='analysisDisplay'>
        <Relation/>
        <ComplexMap/>
        <FilterAndForecast/>
        <TemRain/>
       {/*<Moran/>*/}
        {/*<Gravity/>*/}
    </section>
  );
}
