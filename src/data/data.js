export const troubleshootInfo= {
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

export const completeTroubleshootInfo = [
  // completeTroubleshootInfo[0] should always be backend
  {
    traceCodes: ['backend'],
    description: 'Backend response',
    header: 'Response is coming directly from the backend',
    steps: [
      'Please contact proxy owners so they can check this issue further.',
      "You can use <link>link1<link> to get the proxy owner's details.",
      '<link>link2<link>'
    ],
    links: {
      'link1': {
        displayText: 'API-Explorer',
        url: 'https://api-explorer.devcenter.t-mobile.com/'
      },
      'link2': {
        displayText: 'API Explorer User Guide',
        url: 'https://devcenter.t-mobile.com/documents/5f4d759850023a0008ce7a0e'
      }
    }
  },
  // completeTroubleshootInfo[1] should always be other
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
    // traceCodes: ['TC$401$NA$162-{Ioscei/a/}', 'TC$401$NA$113-{{gdeMnsoi}'],
    description: 'Invalid Access Token',
    header: 'Token was requested from a different organization.',
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
    // traceCodes: ['TC$401$NA$123-{eeAes:nci}', 'TC$401$NA$162-{Aiskei/a/}'],
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
  // General pop token information
  // {
  //   traceCodes: ['TC$400$NA$190-{uiero*"rs', 'TC$400$NA$141-{s-:TMtnec}'],
  //   description: 'X-Authorization: Invalid PoP Token',
  //   header: 'Something is wrong with the pop token sent',
  //   steps: [
  //     'Please check <link>link1<link> documentation to troubleshoot this issue'
  //   ],
  //   links: {
  //     'link1': {
  //       displayText: 'this',
  //       url: 'https://devcenter.t-mobile.com/documents/5fc9168ac4d2dc0007042432?name=POP-TOKEN-FAILURE-TROUBLESHOOT'
  //     }
  //   }
  // },
  // Specific pop token information
  {
    traceCodes: ['TC$400$NA$190-{uiero*"rs', 'TC$400$NA$141-{s-:TMtnec}', 'TC$400$NA$151-{oaz s- kc}'],
    description: 'X-Authorization: Invalid PoP Token',
    errors: [
      {
        identifier: 'unresolved variable (pop.publickey)',
        header: 'Public key is not present in the Access token',
        steps: [
          'Make sure that there is a Public key configured for your devApp in the requested environment.',
          'Go to <link>link1<link> and search for your devApp by name or AKM Id.',
          'Select your devApp and then the organization to which this request was sent to.',
          "Look for the Client Id used for this request and check the button under the 'Public key' tab.",
          "If the button says 'Add Public Key' only instead of 'View/Edit Public Key', that means that there is no public key added for the Client Id used.",
          'Make sure to add the public key using that button in ABOARD to solve this issue.'
        ],
        links: {
          'link1': {
            displayText: 'ABOARD UI',
            url: 'https://aboardui.apps.px-prd04.cf.t-mobile.com/'
          }
        }
      },
      {
        identifier: 'The Token is not yet valid: policy(InbuildPoPVerify)',
        header: 'The Token is not valid yet',
        steps: [
          'Generally observed when user tries from local machine whose system time is not in sync with the local time',
          'Please adjust your system/server time to exactly match your local time and retry'
        ]
      },
      {
        identifier: 'The Token has expired: policy(InbuildPoPVerify)',
        header: 'The Pop Token has expired',
        steps: [
          'Pop Token is valid for only 2 minutes',
          'Try generating a new pop token and retry',
          'If the new token also fails with Expired error, please adjust your system/server time to exactly match your local time and retry',
          'jwt.InbuildPoPVerify.seconds_remaining variable provides the number of seconds the token is still valid (Negative value indicates the token is past its validity)',
          'jwt.InbuildPoPVerify.seconds_remaining = <var>jwt.InbuildPoPVerify.seconds_remaining<var>'
        ]
      },
      {
        identifier: 'Invalid Claim: policy(InbuildPoPVerify) claim(edts)',
        header: 'EDTS generated by Apigee (using the EHTS) is not matching with EDTS encoded in pop-token.',
        steps: [
          'The EHTS value from construct signature block must be exactly same as the EHTS value used to generate the pop token',
          'EHTS value from construct signature block =',
          '<var>ehtsValue<var>',
          'Above EHTS value is being generated with the following values:',
          '<var>jwt.InbuildPoPDecoder.claim.ehts<var>',
          'NOTE: If body is being sent in the request, please make sure to put it (both, in the pop token EHTS and in the actual request to the proxy) without any spaces or line breaks',
          'For example, if body is like this:',
          '{',
          '   "value1" : "example1",',
          '   "value2" : "example2"',
          '}',
          'Change it so it has no spaces or line breaks, like this:',
          '{"value1":"example1","value2":"example2"}'
        ]
      },
      {
        identifier: 'Invalid token: policy(InbuildPoPVerify)',
        header: 'Token Signature doesn’t match with the public key configured on Apigee',
        steps: [
          '1. Go to <link>link1<link> site. Scroll down to Debugger section',
          '2. Put the pop token in the "Encoded" box in left side of the page',
          'pop token =',
          '<var>poPToken<var>',
          '3. Put the public key value in the "Public Key or Certificate" box ("Decoded" box --> "VERIFY SIGNATURE" --> "Public Key or Certificate" box)',
          'public key =',
          '<var>pop.publickey<var>',
          '4. The validity is displayed below the "Encoded" box',
          '5. If you are seeing “Invalid Signature” implies that the keys - public and private - doesn’t match',
          '6. Please verify that the private key used for building the PoP token matches with the public key provided to Apigee team',
          '7. If the public key configured in Apigee needs an update, please send it to <link>link2<link>',
        ],
        links: {
          'link1': {
            displayText: 'jwt.io',
            url: 'https://jwt.io/'
          },
          'link2': {
            displayText: 'ApigeeCM@T-Mobile.com',
            url: 'mailto:ApigeeCM@T-Mobile.com'
          }
        }
      },
      {
        identifier: 'cannot instantiate public key',
        header: 'Cannot instantiate public key',
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
      }
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
    header: 'Backend is taking too long to respond',
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
    traceCodes: ['TC$405$NA$208-{ehssocLlo'],
    description: 'Requested Resource or Method is not allowed',
    header: 'Call is made to a non-existent method',
    steps: [
      '1. Go to <link>link1<link> and search with the path (check below example)',
      'Endpoint: https://qat02.api.t-mobile.com/commerce/v3/orders/order-id',
      'Path: /commerce/v3/orders/order-id',
      'Check <<link>link2<link>> for more information',
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
        displayText: 'How to use Api Explorer',
        url: 'https://devcenter.t-mobile.com/documents/5f4d759850023a0008ce7a0e'
      }
    }
  },
  {
    // traceCodes: [''],
    description: 'SSL Handshake failed javax.net.ssl.SSLHandshakeException: General SSLEngine problem',
    header: 'Connectivity issues between apigee and the Backend',
    steps: [
      'Please contact proxy owners so they can check on their side if a certificate needs to be configured in southbound apigee side.',
      'If so, please send an email to <link>link1<link> requesting Apigee team to include the cert in the southbound truststore.',
      'Please make sure to include the certificate and the apigee environment where this is needed in the information shared in the email.',
      "You can use <link>link2<link> to get the proxy owner's details.",
      '<link>link3<link>'
    ],
    links: {
      'link1': {
        displayText: 'ApigeeCM@T-Mobile.com',
        url: 'mailto:ApigeeCM@T-Mobile.com'
      },
      'link2': {
        displayText: 'API-Explorer',
        url: 'https://api-explorer.devcenter.t-mobile.com/'
      },
      'link3': {
        displayText: 'API Explorer User Guide',
        url: 'https://devcenter.t-mobile.com/documents/5f4d759850023a0008ce7a0e'
      }
    }
  }
];