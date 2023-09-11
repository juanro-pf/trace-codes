import React from 'react';
import { completeTroubleshootInfo, troubleshootInfo } from '../data/data';

export const TroubleshootInfo = props => {

  const { traceCode } = props;

  const showTroubleshootInfo= () => {
    if(traceCode.split('$')[2] !== 'NA') return <p>{`${traceCode.split('$')[2]} ${troubleshootInfo['backend']}`}</p>;
    else if(troubleshootInfo[traceCode]) return <p>{troubleshootInfo[traceCode]}</p>;
    else return <p>{troubleshootInfo['other']}</p>;
  };

  const showCompleteTroubleshootInfo= () => {
    if(traceCode.split('$')[2] !== 'NA') return getData(completeTroubleshootInfo[0]);
    for(const error of completeTroubleshootInfo){
      if(error.traceCodes.includes(traceCode)) return getData(error);
    }
    return getData(completeTroubleshootInfo[1]);
  };

  const getData = errorTroubleshootData => {
    const identifier= '<link>';
    const completeTroubleshootTags= [];
    completeTroubleshootTags.push(<p className='trace-item__troubleshoot-info--header'>{errorTroubleshootData.header}</p>);
    for(const step of errorTroubleshootData.steps){
      if(step.includes(identifier)){
        const parts= step.split(identifier);
        const stepParts= [];
        for(const [i, part] of parts.entries()){
          if(i%2 === 0){
            stepParts.push(part);
          } else{
            stepParts.push(
              <a key={i} href={ errorTroubleshootData.links[part].url } rel="noopener noreferrer" target="_blank">
                { errorTroubleshootData.links[part].displayText }
              </a>
            );
          }
        }
        completeTroubleshootTags.push(<p>{ stepParts }</p>);
      } else completeTroubleshootTags.push(<p>{step}</p>);
    }
    return completeTroubleshootTags;
  };

  return (
    // <div className='animate__animated animate__fadeIn animate__faster trace-item__troubleshoot-info'>
    <div className='trace-item__troubleshoot-info'>
      {/* {showTroubleshootInfo()} */}
      {showCompleteTroubleshootInfo()}
    </div>
  )
};

// THINKING ABOUT REMOVING THIS COMPONENT AND SENDING THE LOGIC TO TRACEITEM