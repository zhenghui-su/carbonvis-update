import React from 'react';

import './IntroduceDisplay.css';

import IntroduceWordCloud from "../IntroduceWordCloud/IntroduceWordCloud.jsx";
import IntroduceRealization from "../IntroduceRealization/IntroduceRealization.jsx";
import IntroduceKeyWord from "../IntroduceKeyWord/IntroduceKeyWord.jsx";
import IntroduceMap from "../IntroduceMap/IntroduceMap.jsx";
import IntroduceTimeline from "../IntroduceTimeline/IntroduceTimeline.jsx";
import IntroduceCarbon from "../IntroduceCarbon/IntroduceCarbon.jsx";
import IntroducePmAndTem from "../IntroducePmAndTem/IntroducePmAndTem.jsx";
import IntroduceHeatMap from "../IntroduceHeatMap/IntroduceHeatMap.jsx";
import IntroduceRate from "../IntroduceRate/IntroduceRate.jsx";
import IntroduceNewRate from "../IntroduceNewRate/IntroduceNewRate.jsx";

export default function IntroduceDisplay(){

    return <section className="introduceDisplay">
        {/*放置组件*/}
        <IntroduceWordCloud/>
        {/*<IntroduceRealization/>*/}
        {/*<IntroduceKeyWord/>*/}
        <IntroduceMap/>
        {/*<IntroduceTimeline/>*/}
        {/*<IntroduceCarbon/>*/}
        <IntroducePmAndTem/>
        <IntroduceHeatMap/>
        <IntroduceNewRate/>
        {/*<IntroduceRate/>*/}
    </section>;

}
