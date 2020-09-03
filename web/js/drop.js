function drop(elem) {
    //console.log(elem)
    // Because there is only one child with class drop_content
    // the first element is the one we want
    var content = elem.parentElement.getElementsByClassName("drop_content")[0];
    //console.log(content);
    
    if(content.classList.contains("show")){
        hide(content);
    }
    else{
        show(content);
    }
    
    function hide(elem){
        elem.classList.remove("show");
        elem.classList.add("hide");
    }
    
    function show(elem){
        elem.classList.remove("hide");
        elem.classList.add("show");
    }
}


