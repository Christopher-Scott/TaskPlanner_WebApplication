function modalFW(params) {
    
    function hide(elem){
        elem.classList.add(params.hideClass);       
    }
    
    function show(elem){
        elem.classList.remove(params.showClass);
    }
    
    var modal = document.createElement("div");
    modal.className = params.className;    
    hide(modal);
    
    modal.alert = function(message){
        show(modal);
        
        modal.innerHTML = "";
        var exitModal = document.createElement("span");
        exitModal.className = params.exitClass;
        exitModal.innerHTML = "&times";
        exitModal.onclick = function(){
            hide(this.parentNode);
        };
        
        modal.appendChild(exitModal);
        var messageArea = document.createElement("p");
        modal.appendChild(messageArea);
        messageArea.innerHTML = message;
        
        show(modal);
        
    };
    
    modal.confirm = function(message, callBack){
        modal.innerHTML = "";
        
        var messageArea = document.createElement("p");
        modal.appendChild(messageArea);
        messageArea.innerHTML = message;
        
        buttonArea = document.createElement("div");
        buttonArea.className = params.buttonClass;
        messageArea.appendChild(buttonArea);
        
        var okButton = document.createElement("INPUT");
        okButton.setAttribute("type", "button");
        okButton.setAttribute("value", "OK");
        okButton.className = "close";
        okButton.onclick = function(){
            hide(this.parentNode.parentNode.parentNode);
            callBack();
        };
        buttonArea.appendChild(okButton);
        
        var cancelButton = document.createElement("INPUT");
        cancelButton.setAttribute("type", "button");
        cancelButton.setAttribute("value", "Cancel");
        cancelButton.className = "close";
        cancelButton.onclick = function(){
            hide(this.parentNode.parentNode.parentNode);
        };
        buttonArea.appendChild(cancelButton);
        
        show(modal);
    };
    
    return modal;    
}