function ajax(url, successFunc, elem){
    
    var httpReq = new XMLHttpRequest();
    
    httpReq.open("GET", url);
    
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
    
    httpReq.send(null);
    
}

