import React from 'react';

import LargeScreenMap from '../LargeScreenMap/LargeScreenMap.jsx';
import LargeScreenEmissionSum from '../LargeScreenEmissionSum/LargeScreenEmissionSum.jsx';
import LargeScreenPM from "../LargeScreenPM/LargeScreenPM.jsx";
import LargeScreenIndustry from '../LargeScreenIndustry/LargeScreenIndustry.jsx';
import LargeScreenCity from '../LargeScreenCity/LargeScreenCity.jsx';
import LargeScreenCarbonBar from "../LargeScreenCarbonBar/LargeScreenCarbonBar.jsx";
import LargeScreenEnergy from "../LargeScreenEnergy/LargeScreenEnergy.jsx";
import LargeScreenAQI from "../LargeScreenAQI/LargeScreenAQI.jsx";
import LargeScreenCarbonRadar from "../LargeScreenCarbonRadar/LargeScreenCarbonRadar.jsx";
import LargeScreenNewAQI from "../LargeScreenNewAQI/LargeScreenNewAQI.jsx";
import LargeScreenTreemap from "../LargeScreenTreemap/LargeScreenTreemap.jsx";

import './LargeScreenDisplay.css';






export default function LargeScreenDisplay() {

  return <section className="main">
    <LargeScreenMap/>
    {/*<LargeScreenEmissionSum/>*/}
    <LargeScreenIndustry/>
    <LargeScreenCity/>
    {/*<LargeScreenPM/>*/}
    {/*<LargeScreenCarbonBar/>*/}
    {/*<LargeScreenCarbonRadar/>*/}
    <LargeScreenEnergy/>
    <LargeScreenTreemap/>
    {/*<LargeScreenAQI/>*/}
    <LargeScreenNewAQI/>
  </section>;
}
