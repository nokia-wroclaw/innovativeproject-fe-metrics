# Manual

## Quick start

To start using our library you need to import it
```javascript
import * as efemetrics from "efemetrics";
```

## Configure project

The library uses several variables that you need to configure. 
You set their values with setters.

```javascript
    efemetrics.setBucket = "<the name of your bucket>"
    efemetrics.setUrl = "<your database address>"
    //If you are not using a token, do not call the setter
    efemetrics.setToken = "<your bucket token>"
    //The default value is fem
    efemetrics.setPrefix ="<prefix for your metrics names"
    //Variable that will allow you to create the database locally if it does not exist. 
    // If you are using the library in your project, we recommend setting it to true
    efemetrics.setExist =<true || false>

```
## API

### Prepare Query Function
```javascript
    efemetrics.prepareQuery(measurement_name, value, tags={})
```
<strong>Description</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Prepares the metric to the format recognized by TSDB</br></br>
<strong>Parameters</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
```measurement_name``` -
The name of the metric. The full name will be created as ```prefix_name```.</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
```value``` -
The value of the metric. It can be a string, a number, or boolean.</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
```tags``` -
Optional parameter. 
It is an object whose properties represent the individual tags


<strong>Call result</strong></br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Adds the metric to the sending queue.

### Send Queries Function
```javascript
    efemetrics.sendQueries();
```
<strong>Description</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Sends to the database all metrics that have been added to 
the queue by the prepareQuery function and then cleans the queue.
We recommend calling in intervals, e.g. every 5 seconds.
```javascript
    setInterval(DatabaseController.sendQueries, 5000);
```

<strong>Parameters</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
no parameters


<strong>Call result</strong></br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Sending all metrics from the queue and then cleaning it

### Check Databases Function
```javascript
    efemetrics.checkDb(bucket);
```
<strong>Description</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
A function that can be used to test the library locally. 
It checks if there is a database at the address given earlier - 
if not, it creates it

<strong>Parameters</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
```bucket``` -
The bucket name.

<strong>Call result</strong></br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Create a database locally if it did not exist before

### Catch Performance Measurements Function
```javascript
    efemetrics.catchPerformanceMeasurements();
```
<strong>Description</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Prepares all entries obtained through the 
Performance API for sending


<strong>Parameters</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
no parameters


<strong>Call result</strong></br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Adds all metrics to the sending queue.

### Catch Errors
```javascript
    efemetrics.catchErrors(error);
```
<strong>Description</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Prepares an error object for sending.


<strong>Parameters</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
```error``` - Error Object


<strong>Call result</strong></br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Adds error log to the sending queue.

### Catch Events
```javascript
    efemetrics.catchEvents(element,eventList);
```
<strong>Description</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Binds a function to the selected element that will 
send information about the execution of any event from the 
given list.



<strong>Parameters</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
```element``` - the DOM element to which we want to bind the sending</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
```eventList``` - Strings list. Each String is the name of the 
event we want to be informed about


<strong>Call result</strong></br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Binds the function informing about the execution 
of the event on the selected element

### Catch Own Function Performance 
```javascript
    efemetrics.catchOwnFunctionPerformance(func,startName,endName)
```
<strong>Description</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Function that allows you to check how long it takes to 
execute your function using the Performance API


<strong>Parameters</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
```func``` - The function whose execution length you want to measure</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
```startName``` - A String representing the name 
of the timeline execution start point.</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
```endName``` - A string representing the name
of the execution end point in the timeline

<strong>Call result</strong></br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Add the execution length metric to the queue




### Set Cookie Function
```javascript
    efemetrics.setCookie(cname, cvalue)
```
<strong>Description</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
A function that allows you to save a cookie in the browser.
Useful for saving the values of configuration variables 
to avoid logging in again the next time you visit the page

<strong>Parameters</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
```cname``` -The name of the cookie</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
```cvalue``` - The value of the cookie.</br>

<strong>Call result</strong></br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Saves a session cookie

### Get Cookie Function
```javascript
    efemetrics.getCookie(cname)
```
<strong>Description</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
A function that allows you to retrieve the value of a saved cookie.
Useful for avoiding logging in again the next time you visit the page

<strong>Parameters</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
```cname``` -The name of the cookie</br>

<strong>Call result</strong></br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
"" if there is no cookie with this name, 
value of the cookie otherwise (always String)

