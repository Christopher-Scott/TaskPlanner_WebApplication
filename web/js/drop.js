function drop(params) {
    var headerClass = params.headerClass || "dropHeader";
    var contentClass = params.contentClass || "dropContent";
    
    window.onclick = dropHandler;
    function dropHandler(event){
        var clickedElem = event.target;
        var dropContentList = document.getElementsByClassName(contentClass);

        // user clicked on a dropdown header
        if (clickedElem.classList.contains(headerClass)) {
            var content = clickedElem.parentElement.getElementsByClassName(contentClass)[0];


            if(content.classList.contains("show")){
                hide(content); // clicked dropdown is currently open, so hide it
            }
            else{
                // close dropdowns
                for (var i = 0; i < dropContentList.length; i++) {
                    hide(dropContentList[i]);
                }
                // Open the selected dropdown
                show(content);
            }
        }
        // user clicked elsewhere on the page, close all the dropdowns
        else {

            for (var i = 0; i < dropContentList.length; i++) {
                hide(dropContentList[i]);
            }
        }

        function hide(elem) {
            elem.classList.remove("show");
            elem.classList.add("hide");
        }

        function show(elem) {
            elem.classList.remove("hide");
            elem.classList.add("show");
        }
    }
};



