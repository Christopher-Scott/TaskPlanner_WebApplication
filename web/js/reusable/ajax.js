function ajax(url, successFunc, elem){
    
    var httpReq;
    // handle browser specifics
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        httpReq = new ActiveXObject("Microsoft.XMLHTTP"); //For IE 5+
    } else {
        alert('ajax not supported');
    }
    
    // Add the url to the request
    httpReq.open("GET", url);
    
    // set up function for when the data is ready
    httpReq.onreadystatechange = function () {
        if (httpReq.readyState === 4){
            if (httpReq.status === 200){ // File found correctly
                successFunc(JSON.parse(httpReq.responseText));                         
            }
            else { // File not found, create error
                elem.innerHTML += "Error " + httpReq.status + ":" + httpReq.statusText
                    + " while attempting to read '" + url + "'";
            }
        }
    };    
    
    // initiate ajax call
    httpReq.send(null);
    
}

