import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import React from 'react';
import PubSub from "pubsub-js";

import {initHeader} from "./Header.js"

import './Header.css'



export default function Header() {
    const [flag, setFlag] = useState(0);
    let str;
    useEffect(()=>{
        let token = PubSub.subscribe('changeHeader',(_, data)=>{
            setFlag(data.page);
        });
        return ()=>{
            PubSub.unsubscribe(token);
        }
    },[]);
    if(flag === 0){
        str = <header className="pageTitle">
            <Link to='/introduceHome' className='goto' onClick={()=>{
                setFlag(0);
            }}>{'< 概况分析'}</Link>
            <h1>{`碳排放数据分析——概况分析`}</h1>
            <Link to='/Home' className='goto' onClick={()=>{
                setFlag(1);
            }}>{'态势总览 >'}</Link>
        </header>
    }
    if(flag === 1){
        str = <header className="pageTitle">
            <Link to='/introduceHome' className='goto' onClick={()=>{
                setFlag(0);
            }}>{'< 概况分析'}</Link>
            <h1>{`碳排放数据分析——态势总览`}</h1>
            <Link to='/analysisHome' className='goto' onClick={()=>{
                setFlag(2);
            }}>{'预测探索 >'}</Link>
        </header>
    }
    if(flag === 2){
        str = <header className="pageTitle">
            <Link to='/Home' className='goto' onClick={()=>{
                setFlag(1);
            }}>{'< 态势总览'}</Link>
            <h1>{`碳排放数据分析——预测探索`}</h1>
            <Link to='/analysisHome' className='goto' onClick={()=>{
                setFlag(2);
            }}>{'预测探索 >'}</Link>
        </header>
    }
    return str;
}
