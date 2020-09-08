function drop(params) {
    // provide default values
    var headerClass = params.headerClass || "dropHeader";
    var contentClass = params.contentClass || "dropContent";
    var visibleClass = params.visibleClass || "show";
    var hiddenClass = params.hiddenClass || "hide";
    
    window.onclick = dropHandler;
    function dropHandler(event){
        var clickedElem = event.target;
        var dropContentList = document.getElementsByClassName(contentClass);

        // user clicked on a dropdown header
        if (clickedElem.classList.contains(headerClass)) {
            var content = clickedElem.parentElement.getElementsByClassName(contentClass)[0];


            if(content.classList.contains(visibleClass)){
                hide(content); // clicked dropdown is currently open, so hide it
            }
            else{                                
                show(content);
                // close other dropdowns
                for (var i = 0; i < dropContentList.length; i++) {
                    if ( dropContentList[i] !== content){
                        hide(dropContentList[i]);
                    }
                }
            }
        }
        // user clicked elsewhere on the page, close all the dropdowns
        else {

            for (var i = 0; i < dropContentList.length; i++) {
                hide(dropContentList[i]);
            }
        }

        function hide(elem) {
            elem.classList.remove(visibleClass);
            elem.classList.add(hiddenClass);
        }

        function show(elem) {
            elem.classList.remove(hiddenClass);
            elem.classList.add(visibleClass);
        }
    }
};



