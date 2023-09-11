import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { TroubleshootInfo } from './TroubleshootInfo';

export const TraceItem = props => {
  
  const { uri, method, number, apigee_code, target_code, content } = props.props;
  const { setActiveRequest, activeRequest } = props;
  
  const backgroundColor = () => {
    if(method === 'GET') return { backgroundColor: 'blue' }
    else if(method === 'POST') return { backgroundColor: 'green' }
    else if(method === 'DELETE') return { backgroundColor: 'red' }
    else if(method === 'PUT') return { backgroundColor: 'orange' }
    else if(method === 'OPTIONS') return { backgroundColor: 'yellow' }
  }
  
  const numberColor = () => {
    if(apigee_code.startsWith('2')) return {}
    else return { color: 'red' }
  }
  
  const getTenDigitCode = () => {
    if(content === 'NA') return content;
    const multiple = content.length / 10;
    let code = '';
    for(let i = parseInt(0); i < content.length; i= i + multiple){
      code += content[Math.floor(i)];
    }
    return `${content.length}-${code}`;
  }
  
  const getTraceCode = () => {
    return `TC$${apigee_code}$${target_code}$${getTenDigitCode()}`;
  }
  
  // const [traceCode, setTraceCode] = useState(getTraceCode());
  const [traceCode] = useState(getTraceCode());
  // const [showTroubleshootInfo, setShowTroubleshootInfo] = useState(false);

  // useEffect(() => {
  //   if(number === activeRequest) setShowTroubleshootInfo(true);
  //   else setShowTroubleshootInfo(false);
  // }, [activeRequest, number]);

  const handleClick = () => {
    // console.log(number, activeRequest);
    if(number === activeRequest) setActiveRequest(() => null);
    else setActiveRequest(() => number);
  };

  return (
    // <div className='trace-item' onClick={() => onClickTraceItem(traceCode)} >
    <div>
      {/* <div className='trace-item' onClick={() => setShowTroubleshootInfo(prev => !prev)} > */}
      <div className='trace-item' onClick={handleClick} >
        <div className='trace-item__number'>
          <p>{number}</p>
        </div>
        <div className='trace-item__status-code'>
          <p style={numberColor()}>{apigee_code}</p>
        </div>
        <div className='trace-item__method' style={backgroundColor()}>
          <p>{method}</p>
        </div>
        <div className='trace-item__uri'>
          <p>{uri}</p>
        </div>
        <div className='trace-item__trace-code'>
          <p>{traceCode}</p>
        </div>
      </div>
      {
        number === activeRequest && <TroubleshootInfo traceCode={traceCode}/>
      }
      {/* <TroubleshootInfo show={showTroubleshootInfo} traceCode={traceCode}/> */}
    </div>
  )
};