function modalFW(params) {
    
    function hide(elem){
        elem.classList.add(params.hideClass);
        elem.style.display = "none";
    }
    
    function show(elem){
        elem.classList.remove(params.hideClass);
        elem.style.display = "block";
    }
    
    var modal = document.createElement("div");
    modal.classList.add(params.className);
    hide(modal);
    
    modal.alert = function(message){
        modal.innerHTML = "";
        
        var messageArea = document.createElement("div");
        
        var messageText = document.createElement("p");
        messageArea.appendChild(messageText);
        messageText.innerHTML = message;
        
        var exitButton = document.createElement("button");        
        exitButton.innerHTML = "OK";
        exitButton.onclick = function(){
            hide(modal);
        };
        
                
        messageArea.appendChild(exitButton);
        modal.appendChild(messageArea);        
        
        show(modal);
        
    };
    
    modal.confirm = function(message, callBack){
        modal.innerHTML = "";
        
        var messageArea = document.createElement("div");
        modal.appendChild(messageArea);
        
        var messageText = document.createElement("p");
        messageArea.appendChild(messageText);
        messageText.innerHTML = message;
        
        
        var okButton = document.createElement("INPUT");
        okButton.setAttribute("type", "button");
        okButton.setAttribute("value", "OK");
        okButton.onclick = function(){
            hide(modal);
            callBack();
        };
        messageArea.appendChild(okButton);
        
        var cancelButton = document.createElement("INPUT");
        cancelButton.setAttribute("type", "button");
        cancelButton.setAttribute("value", "Cancel");
        cancelButton.onclick = function(){
            hide(modal);
        };
        
        messageArea.appendChild(cancelButton);        
        show(modal);
    };
    
    modal.displayElement = function(element){
        modal.innerHTML = "";
        
        var messageArea = document.createElement("div");
        messageArea.appendChild(element);
        
        var exitButton = document.createElement("button");        
        exitButton.innerHTML = "OK";
        exitButton.onclick = function(){
            hide(modal);
        };
        
                
        messageArea.appendChild(exitButton);
        modal.appendChild(messageArea);        
        
        show(modal);
        
    };
    
    return modal;    
}