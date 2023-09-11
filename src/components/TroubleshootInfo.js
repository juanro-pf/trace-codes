import React from 'react';

// const errorsInfo= [
//   ['Please contact #apigee slack channel or send an email to ApigeeDevOps@t-mobile.com so they can check further, please include the trace in the message.'],
//   []
// ];

const troubleshootInfo= {
  'TC$401$NA$113-{{gdeMnsoi}': 'You are facing issue #3 of this documentation https://devcenter.t-mobile.com/documents/5f4d57225de3720007bb76ca',
  'TC$401$NA$162-{Ioscei/a/}': 'You are facing issue #3 of this documentation https://devcenter.t-mobile.com/documents/5f4d57225de3720007bb76ca',
  'TC$401$NA$123-{eeAes:nci}': 'Access token expired - NO DOC YET',
  'TC$401$NA$162-{Aiskei/a/}': 'Access token expired - NO DOC YET',
  'TC$400$NA$190-{uiero*"rs': 'Please check this documentation to troubleshoot this issue https://devcenter.t-mobile.com/documents/5fc9168ac4d2dc0007042432?name=POP-TOKEN-FAILURE-TROUBLESHOOT',
  'TC$400$NA$141-{s-:TMtnec}': 'Please check this documentation to troubleshoot this issue https://devcenter.t-mobile.com/documents/5fc9168ac4d2dc0007042432?name=POP-TOKEN-FAILURE-TROUBLESHOOT',
  'TC$503$NA$136-{uetatcnti}': 'The Service is temporarily unavailable - NO DOC YET',
  'TC$502$NA$128-{aUF"rso.F}': 'Unexpected EOF at target - NO DOC YET',
  'TC$500$NA$140-{:vsIr"asr': 'Internal Server Error - NO DOC YET',
  'TC$403$NA$190-{ave R*"rs': 'You are facing issue #1 of this documentation https://devcenter.t-mobile.com/documents/5f4d57225de3720007bb76ca',
  'TC$504$NA$112-{f"Teospfy': 'Gateway Timeout - NO DOC YET',
  'TC$401$NA$152-{"ygI*ndi#': 'You are facing issue #2 of this documentation https://devcenter.t-mobile.com/documents/5f4d57225de3720007bb76ca',
  'backend': 'Response is coming directly from the backend, please contact proxy owners to check further',
  'other': 'Please contact #apigee slack channel or send an email to ApigeeDevOps@t-mobile.com so they can check further, please include the trace in the message.'
};

const completeTroubleshootInfo = [
  {
    traceCodes: ['backend'],
    description: 'Backend response',
    header: 'Response is coming directly from the backend',
    steps: [
      'Please contact proxy owners so they can check further.'
    ]
  },
  {
    traceCodes: ['other'],
    description: 'Unknown issue',
    header: 'Unknown issue',
    steps: [
      'Please contact <link>link1<link> or <link>link2<link> slack channel so we can check further.'
    ],
    links: {
      'link1': {
        displayText: 'ApigeeCM@T-Mobile.com',
        url: 'mailto:ApigeeCM@T-Mobile.com'
      },
      'link2': {
        displayText: '#apigee',
        url: 'https://app.slack.com/client/T02KY506W/C4SAFRARJ'
      }
    }
  },
  {
    traceCodes: ['TC$401$NA$162-{Ioscei/a/}'],
    description: 'Invalid Access Token',
    header: 'Token usually was requested from a different organization.',
    steps: [
      '1. Go to <link>link1<link>',
      '2. Search your application (client invoking Apigee) using the name or AKMID',
      '3. Choose the Planet (OnPrem/Saas) & exact Environment (qatlab, ditlab, tmobileqat, tmobiledit, etc) you are trying to hit',
      '4. Get the Credentials – Client Id/ Key & Secret (make sure no leading or trailing spaces)',
      '5. Use the credentials to generate a token',
      '6. To compare with what is being currently used, Open <link>link2<link> site & Paste your current Authorization token',
      '7. In the decode panel, note down the value of “aud” field (audience)',
      '8. The “aud” field (audience) should be same as Client Id'
    ],
    links: {
      'link1': {
        displayText: 'ABOARD UI',
        url: 'https://aboardui.apps.px-prd04.cf.t-mobile.com/'
      },
      'link2': {
        displayText: 'jwt.io',
        url: 'https://jwt.io/'
      },
    }
  },
  {
    traceCodes: ['TC$401$NA$123-{eeAes:nci}', 'TC$401$NA$162-{Aiskei/a/}'],
    description: 'Access token expired',
    header: 'Access token sent has already expired',
    steps: [
      'Access token is valid for 1 hour',
      'Send a fresh generated access token in the request and try again'
    ]
  },
  {
    traceCodes: ['TC$503$NA$136-{uetatcnti}'],
    description: 'The Service is temporarily unavailable',
    header: 'The backend server is temporarily unavailable',
    steps: [
      'Please contact proxy owners so they can check further'
    ]
  },
  {
    traceCodes: ['TC$502$NA$128-{aUF"rso.F}'],
    description: 'Unexpected EOF at target',
    header: 'The backend server might be sending EOF abruptly',
    steps: [
      'Please contact proxy owners so they can check further'
    ]
  },
  {
    traceCodes: ['TC$400$NA$190-{uiero*"rs', 'TC$400$NA$141-{s-:TMtnec}'],
    description: 'X-Authorization: Invalid PoP Token',
    header: 'Something is wrong with the pop token sent',
    steps: [
      'Please check our documentation to troubleshoot this issue <link>https://devcenter.t-mobile.com/documents/5fc9168ac4d2dc0007042432?name=POP-TOKEN-FAILURE-TROUBLESHOOT<link>'
    ]
  },
  {
    traceCodes: ['TC$500$NA$140-{:vsIr"asr'],
    description: 'Internal Server Error',
    header: 'Internal Server Error at apigee side',
    steps: [
      'Please contact <link>link1<link> or <link>link2<link> slack channel so we can check further'
    ],
    links: {
      'link1': {
        displayText: 'ApigeeCM@T-Mobile.com',
        url: 'mailto:ApigeeCM@T-Mobile.com'
      },
      'link2': {
        displayText: '#apigee',
        url: 'https://app.slack.com/client/T02KY506W/C4SAFRARJ'
      }
    }
  },
  {
    traceCodes: ['TC$403$NA$190-{ave R*"rs'],
    description: 'Invalid Api Key For Given Resource',
    header: 'The proxy is not added to the product',
    steps: [
      '1. Identify the name of the proxy corresponding to the API you are hitting (use <link>link1<link> if you are not sure)',
      '2. Go to <link>link2<link>',
      '3. Search your application using the name or AKMID',
      '4. Choose the Planet (OnPrem/Saas) & exact Environment (qatlab, ditlab, tmobileqat, tmobiledit, etc) you are trying to hit',
      '5. Click on the Product. All the Proxies in this product is shown below',
      '6. If the proxy is not present, the API Consumer team has to add it to their Product / DevApp',
      '7. This can be done by clicking on “+Add Proxies” button',
      '8. The request will be sent to API Publisher',
      '9. Only API Publisher team can approve',
      '10. Once approved and added, please test again',
      '11. If the proxy is Present in step# 6, please contact <link>link3<link> or <link>link4<link> slack channel so we can check further',
    ],
    links: {
      'link1': {
        displayText: 'API Explorer',
        url: 'https://devcenter.t-mobile.com/documents/5f4d759850023a0008ce7a0e'
      },
      'link2': {
        displayText: 'ABOARD UI',
        url: 'https://aboardui.apps.px-prd04.cf.t-mobile.com/'
      },
      'link3': {
        displayText: 'ApigeeCM@T-Mobile.com',
        url: 'mailto:ApigeeCM@T-Mobile.com'
      },
      'link4': {
        displayText: '#apigee',
        url: 'https://app.slack.com/client/T02KY506W/C4SAFRARJ'
      }
    }
  },
  {
    traceCodes: ['TC$504$NA$112-{f"Teospfy'],
    description: 'Gateway Timeout',
    header: 'Backend is returning a 504 response or taking too long to respond',
    steps: [
      'Please contact proxy owners so they can check further'
    ]
  },
  {
    traceCodes: ['TC$401$NA$152-{"ygI*ndi#'],
    description: 'Invalid API Key',
    header: 'Wrong credentials are being used to generate accesstoken',
    steps: [
      '1. Go to <link>link1<link>',
      '2. Search your application using the name or AKMID',
      '3. Choose the Planet (OnPrem/Saas) & exact Environment (qatlab, ditlab, tmobileqat, tmobiledit, etc) you are trying to hit',
      '4. Get the Credentials – Client Id/ Key & Secret (make sure no leading or trailing spaces)',
      '5. Use the credentials to generate a token',
      '6. If this is for PROD, please reach out to the Owner (Manager or Sr Manager) or the Director of this App & they can get the credentials for you',
      '7. Reach out to <link>link2<link> or <link>link3<link> slack channel if the API Publisher / Manager / Director is on PTO or they are having issue with retrieving the value in Aboard. ApigeeDevOps team can share the values with team members reporting to the same Director'
    ],
    links: {
      'link1': {
        displayText: 'ABOARD UI',
        url: 'https://aboardui.apps.px-prd04.cf.t-mobile.com/'
      },
      'link2': {
        displayText: 'ApigeeDevOps@T-Mobile.com',
        url: 'mailto:ApigeeDevOps@T-Mobile.com'
      },
      'link3': {
        displayText: '#apigee',
        url: 'https://app.slack.com/client/T02KY506W/C4SAFRARJ'
      }
    }
  },
  {
    traceCodes: ['Not yet'],
    description: 'Requested Resource or Method is not allowed',
    header: 'Call is made to a non-existent method',
    steps: [
      '1. Go to <link>link1<link> and search with the path (example – anything after .com --> endpoint: https://qat02.api.t-mobile.com/commerce/v3/orders/order-id --> path: /commerce/v3/orders/order-id) <<link>link2<link>>',
      '2. Confirm if an API exists with this path',
      '3. If present, please confirm you are using the right method (GET,POST,PUT,etc) as displayed in API-Explorer',
      '4. If API is not present, please double check the endpoint – please reach out to the team who provided this endpoint',
      '5. If API is present but method is not present, please reach out to API Publisher team (check contacts section in the <link>link1<link> tool)',
      '6. ApigeeCM team cannot add a new method to any proxy'
    ],
    links: {
      'link1': {
        displayText: 'API Explorer',
        url: 'https://api-explorer.devcenter.t-mobile.com'
      },
      'link2': {
        displayText: 'How to use API Explorer',
        url: 'https://devcenter.t-mobile.com/documents/5f4d759850023a0008ce7a0e'
      }
    }
  }
];

export const TroubleshootInfo = props => {

  const { show, traceCode } = props;

  // const getStyle= () => {
  //   if(!show) return { display: 'none' }
  //   else return {}
  // };

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
    // <div className='troubleshoot-info' style={ getStyle() }>
    // <div className='animate__animated animate__fadeIn animate__faster trace-item__troubleshoot-info'>
    <div className='trace-item__troubleshoot-info'>
      {/* {showTroubleshootInfo()} */}
      {showCompleteTroubleshootInfo()}
    </div>
  )
};