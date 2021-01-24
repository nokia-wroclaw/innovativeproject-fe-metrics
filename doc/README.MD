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
The name of the metric. The full name will be created as ```prefix_name```.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
```value``` -
The value of the metric. It can be a string, a number, or boolean.

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
```javascript
    efemetrics.checkDb(bucket)
```

<strong>Parameters</strong><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
```bucket``` -
The bucket name.

<strong>Call resul</strong></br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
Create a database locally if it did not exist before
