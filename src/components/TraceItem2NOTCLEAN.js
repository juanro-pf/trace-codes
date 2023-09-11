import React from 'react';
import { useState } from 'react';
import { completeTroubleshootInfo } from '../data/data';
// import { troubleshootInfo } from '../data/data';

export const TraceItem = props => {
  // console.log(completeTroubleshootInfo);
  // const { request, requestNumber, setActiveRequest, activeRequest } = props;
  const { request, requestNumber } = props;
  // console.log(JSON.stringify(request));

  // Loop trough request
  const method = request[3].children[1].children[2].value;
  const uri = request[3].children[1].children[1].value;
  let responseBody = 'NA';
  let apigeeResponseCode = 'NA';
  let targetResponseCode = 'NA';
  
  for(let point of request){
    try {
      // console.log(`${point.children[0].children[1].children[0].value}___${point.children[0].children[1].children[1].value}`)
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
  
  // const getTenDigitCode = () => {  //Actually is not always 10 digit...
  //   if(responseBody === 'NA') return responseBody;
  //   const multiple = responseBody.length / 10;
  //   let code = '';
  //   for(let i = parseInt(0); i < responseBody.length; i= i + multiple){
  //     code += responseBody[Math.floor(i)];
  //   }
  //   return `${responseBody.length}-${code}`;
  // }
  
  // const getTraceCode = () => {
  //   return `TC$${apigeeResponseCode}$${targetResponseCode}$${getTenDigitCode()}`;
  // }
  
  // const traceCode = getTraceCode();

  const [isTroubleshootActive, setIsTroubleshootActive] = useState(false);

  const handleClick = () => {
    // if(requestNumber === activeRequest) setActiveRequest(() => null);
    // else setActiveRequest(() => requestNumber);
    // setIsTroubleshootActive(prev => !prev);
    console.log(completeTroubleshootInfo);
  };

  /* ===========================
    TroubleshootInfo functions
  ============================*/

  // const showTroubleshootInfo= () => {
  //   if(traceCode.split('$')[2] !== 'NA') return <p>{`${traceCode.split('$')[2]} ${troubleshootInfo['backend']}`}</p>;
  //   else if(troubleshootInfo[traceCode]) return <p>{troubleshootInfo[traceCode]}</p>;
  //   else return <p>{troubleshootInfo['other']}</p>;
  // };

  const showCompleteTroubleshootInfo= () => {
    // if(traceCode.split('$')[2] !== 'NA') return getData(completeTroubleshootInfo[0]);
    if(targetResponseCode !== 'NA') return getData(completeTroubleshootInfo[0]);
    for(let error of completeTroubleshootInfo){
      // if(error.traceCodes.includes(traceCode)){ //Generic logic with traces codes
      if(responseBody.includes(error.description)){ //Dedicated logic for tmo error info
        if(error.description === 'X-Authorization: Invalid PoP Token') {
          console.log(error);
          return getData(error, true);
        }
        return getData(error);
      }
    }
    return getData(completeTroubleshootInfo[1]);
  };

  const popSteps = errorTroubleshootData => {
    let identifier, secondsRemaining, ehtsValue, claimEhts, popToken, publicKey, newErrorTroubleshootData;
    // console.log(ehtsValue);
    const newSteps= [];
    for(let point of request){
      try {
        for(let variable of point.children[2].children){
          if(variable.attributes.name === 'jwt.InbuildPoPVerify.error') identifier = variable.attributes.value;
          else if(variable.attributes.name === 'jwt.InbuildPoPVerify.seconds_remaining') secondsRemaining = variable.attributes.value;
          else if(variable.attributes.name === 'ehtsValue') {
            // ehtsValue = variable.attributes.value;
            ehtsValue = variable.attributes.value + requestNumber;
            // console.log(ehtsValue);
          }
          else if(variable.attributes.name === 'jwt.InbuildPoPDecoder.claim.ehts') claimEhts = variable.attributes.value;
          else if(variable.attributes.name === 'poPToken') popToken = variable.attributes.value;
          else if(variable.attributes.name === 'pop.publickey') publicKey = variable.attributes.value;
        }
      } catch (error) {
        
      }
      if(identifier && secondsRemaining && ehtsValue && claimEhts && popToken && publicKey) break;
    }
    // console.log(errorTroubleshootData.errors);
    for(let error of errorTroubleshootData.errors){
      if(error.identifier === identifier){
        // console.log(error);
        newErrorTroubleshootData = error;
        // console.log(newErrorTroubleshootData.steps);
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
                  // stepParts.push(ehtsValue);
                  stepParts.push(ehtsValue.split('&quot;').join('"'));
                }
                else if(part === 'jwt.InbuildPoPDecoder.claim.ehts') stepParts.push(claimEhts);
                else if(part === 'poPToken') stepParts.push(popToken);
                // else if(part === 'pop.publickey') stepParts.push(publicKey.split('&#xA;').join('')); // &#xA; is how the space is represented in the trace for the public key
                else if(part === 'pop.publickey') {
                  // console.log(publicKey);
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
      errorTroubleshootData = popSteps(errorTroubleshootData);
    }
    const keyWord= '<link>';
    const completeTroubleshootTags= [];
    completeTroubleshootTags.push(<p key={-1} className='trace-item__troubleshoot-info--header'>{errorTroubleshootData.header}</p>);
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
    // for(let sale of completeTroubleshootTags) {
    //   console.log(sale.props.children);
    // }
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
          {/* <p>{traceCode}</p> Old logic with trace code*/}
          <p>{`Client: ${apigeeResponseCode}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Backend: ${targetResponseCode}`}</p>
        </div>
      </div>
      {
        // requestNumber === activeRequest &&
        isTroubleshootActive &&
        <div className='trace-item__troubleshoot-info'>
          {/* {showTroubleshootInfo()} */}
          {showCompleteTroubleshootInfo()}
        </div>
      }
    </div>
  )
};