import React from 'react';
import { useState } from 'react';
import { completeTroubleshootInfo } from '../data/data';
// import { troubleshootInfo } from '../data/data';

export const TraceItem = props => {
  
  const { req: request, requestNumber } = props;

  // Loop trough request
  const method = request[3].children[1].children[2].value;
  const uri = request[3].children[1].children[1].value;
  let responseBody = 'NA';
  let apigeeResponseCode = 'NA';
  let targetResponseCode = 'NA';
  
  for(let point of request){
    try {
      if(point.children[0].children[1].children[0].value === 'PROXY_POST_RESP_SENT' && point.children[0].children[1].children[1].value === 'END'){
        for(let property of point.children[1].children){
          if(property.name === 'Content'){
            responseBody = property.value;
          } else if(property.name === 'StatusCode'){
            apigeeResponseCode = property.value;
        }
        }
      }

    } catch (error) {
      
    }

    try {
      
      if(point.children[0].children[1].children[0].value === 'TARGET_RESP_FLOW' && point.children[0].children[1].children[1].value === 'RESP_START'){
        for(let property of point.children[1].children){
          if(property.name === 'StatusCode'){
            targetResponseCode = property.value;
        }
        }
      }
      
    } catch (error) {
      
    }
    
  }
  // End loop trough request
  
  const backgroundColor = () => {
    if(method === 'GET') return { backgroundColor: 'blue' }
    else if(method === 'POST') return { backgroundColor: 'green' }
    else if(method === 'DELETE') return { backgroundColor: 'red' }
    else if(method === 'PUT') return { backgroundColor: 'orange' }
    else if(method === 'OPTIONS') return { backgroundColor: 'yellow' }
  }
  
  const numberColor = () => {
    if(apigeeResponseCode.startsWith('2')) return {}
    else return { color: 'red' }
  }

  const [isTroubleshootActive, setIsTroubleshootActive] = useState(false);

  const handleClick = () => {
    setIsTroubleshootActive(prev => !prev);
  };

  /* ===========================
    TroubleshootInfo functions
  ============================*/

  const showCompleteTroubleshootInfo= errorInfo => {
    // console.log(errorInfo);
    if(targetResponseCode !== 'NA') return getData(errorInfo[0]);
    for(let error of errorInfo){
      if(responseBody.includes(error.description)){
        if(error.description === 'X-Authorization: Invalid PoP Token') {
          // console.log(error);
          return getData(error, true);
        }
        return getData(error);
      }
    }
    return getData(errorInfo[1]);
  };

  const popSteps = errorData => {
    // console.log(errorData);
    let identifier, secondsRemaining, ehtsValue, claimEhts, popToken, publicKey, newErrorTroubleshootData;
    const newSteps= [];
    for(let point of request){
      try {
        for(let variable of point.children[2].children){
          if(variable.attributes.name === 'jwt.InbuildPoPVerify.error') identifier = variable.attributes.value;
          else if(variable.attributes.name === 'jwt.InbuildPoPVerify.seconds_remaining') secondsRemaining = variable.attributes.value;
          else if(variable.attributes.name === 'ehtsValue') ehtsValue = variable.attributes.value + requestNumber; //QUITAR EL REQUEST NUMBER AFTER TROUBLESHOOT
          else if(variable.attributes.name === 'jwt.InbuildPoPDecoder.claim.ehts') claimEhts = variable.attributes.value;
          else if(variable.attributes.name === 'poPToken') popToken = variable.attributes.value;
          else if(variable.attributes.name === 'pop.publickey') publicKey = variable.attributes.value;
        }
      } catch (error) {
        
      }
      if(identifier && secondsRemaining && ehtsValue && claimEhts && popToken && publicKey) break;
    }
    for(let error of errorData.errors){
      if(error.identifier === identifier){
        newErrorTroubleshootData = error;
        for(let step of newErrorTroubleshootData.steps){
          if(step.includes('<var>')){
            const parts= step.split('<var>');
            const stepParts= [];
            for(let [i, part] of parts.entries()){
              if(i%2 === 0){
                stepParts.push(part);
              } else{
                if(part === 'jwt.InbuildPoPVerify.seconds_remaining') stepParts.push(secondsRemaining);
                else if(part === 'ehtsValue') {
                  stepParts.push(ehtsValue.split('&quot;').join('"'));
                }
                else if(part === 'jwt.InbuildPoPDecoder.claim.ehts') stepParts.push(claimEhts);
                else if(part === 'poPToken') stepParts.push(popToken);
                else if(part === 'pop.publickey') {
                  stepParts.push(publicKey.split('&#xA;').join(''));
                }
              }
            }
            newSteps.push(stepParts.join(''));
          } else newSteps.push(step);
        }
      }
    }
    if(newErrorTroubleshootData){
      newErrorTroubleshootData.steps = newSteps;
      return newErrorTroubleshootData;
    }
    return completeTroubleshootInfo[1];
  }

  const getData = (errorTroubleshootData, popEnabled) => {
    // console.log(errorTroubleshootData);
    if(popEnabled){
      errorTroubleshootData = popSteps({...errorTroubleshootData});
    }
    // errorTroubleshootData= errorTroubleshootData.errors[3];
    // console.log(errorTroubleshootData);
    const keyWord= '<link>';
    const completeTroubleshootTags= [];
    completeTroubleshootTags.push(<p key={-1} className='trace-item__troubleshoot-info--header'>{`${errorTroubleshootData.header}REQUEST${requestNumber}`}</p>);
    for(let [j, step] of errorTroubleshootData.steps.entries()){
      if(step.includes(keyWord)){
        const parts= step.split(keyWord);
        const stepParts= [];
        for(let [i, part] of parts.entries()){
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
        completeTroubleshootTags.push(<p key={j}>{ stepParts }</p>);
      } else completeTroubleshootTags.push(<p key={j}>{step}</p>);
    }
    return completeTroubleshootTags;
  };

  return (
    <div>
      <div className='trace-item' onClick={handleClick} >
        <div className='trace-item__number'>
          <p>{requestNumber}</p>
        </div>
        <div className='trace-item__status-code'>
          <p style={numberColor()}>{apigeeResponseCode}</p>
        </div>
        <div className='trace-item__method' style={backgroundColor()}>
          <p>{method}</p>
        </div>
        <div className='trace-item__uri'>
          <p>{uri}</p>
        </div>
        <div className='trace-item__trace-code'>
          <p>{`Client: ${apigeeResponseCode}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Backend: ${targetResponseCode}`}</p>
        </div>
      </div>
      {
        isTroubleshootActive &&
        <div className='trace-item__troubleshoot-info'>
          {showCompleteTroubleshootInfo([...completeTroubleshootInfo])}
        </div>
      }
    </div>
  )
};