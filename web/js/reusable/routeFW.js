function routeFW(params) {
    if(!params){
        alert("Error: No parameters specified");
    }
    
    var startLink = params.startLink || "#/home";
    var contentID = params.contentID || "view";
    
    window.addEventListener("hashchange", router);
    
    window.location.hash = "#/xxx";
    
    window.location.hash = startLink;
    
    function inject(element){
        // clear out the element first
        document.getElementById(contentID).innerHTML = "";
        // add the desired content
        document.getElementById(contentID).appendChild(element);
    }
    
    function router(){
        var path = location.hash;
        console.log("Routing to " + path);
        
        // check if the path is bad
        if(!params.routingTable[path]){
            var errorElem = document.createELement("div");
            errorElem.innerHTML = "<h2>Error: Could not retrieve content at" + path + "</h2>";
            inject(errorElem);
        }
        else {
            var newDOM = routes[path]();
            inject(newDOM);
        }
    }
}


