## Apigee trace codes app

**Note: This app works only with Apigee traces, any other file uploaded wont work, even if it is an xml file**

This is a useful application for people who have a list of common issues that will always have the same error message and status code.

After uploading the trace, you will get a visual representation of the trace, very similar to the one you will get in Apigee UI, the information that you will get is:

1.	Request number (same number that you will get in Apigee UI)
2.	Response status code
3.	Method
4.	URI
5.	**Trace code**

The **trace code** has the following format:

TC${**responseStatusCode**}${**targetResponseCode**}${**responseMessageLength**}-{**customResponseCode**}

**responseStatusCode**: Response status code coming from the proxy.

**targetResponseCode**: Response status code coming from the target, NA if no response from the target.

**responseMessageLength**: Response body length, NA if no response body.

**customResponseCode**: Consistent code which is a combination of the response body message, if there is no response message available, this field will be empty.

Then, you can have a list, bot, interface, or some way for the user to get the instructions on how to solve the issue based on the trace code.

Note that if the **targetResponseCode** is different to NA, that probably means that the response is coming directly from the target, or at least that the request reached the target. 