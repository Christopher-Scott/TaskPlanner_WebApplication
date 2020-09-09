function MakeSlideShow(params){
    var className = params.className || "slideShow";
    var showCaption = params.showCaption || true;
    
    // create element that will be returned
    var slideshow = document.createElement("div");
    
    slideshow.classList.add(className);
    
    // Handle error for no provided array of objects
    if(!params.objArray){
        var errorMsg = document.createElement("div");
        errorMsg.innerHTML = "Error - slideshow could not be created. No array of objects provided.";
        slideshow.append(errorMsg);
        return slideshow;
    }
    
    var image = document.createElement("img");
    slideshow.append(image);
    
    var caption = document.createElement("p");
    slideshow.append(caption);
    
    // implement optional parameter to hide or show caption
    if(showCaption){
        caption.style = "visibility: visible;";
    }
    else{
        caption.style = "visibility: hidden;";S
    }
    
    var backBtn = document.createElement("button");
    backBtn.innerHTML = Prev;
    slideshow.append(backBtn);
    
    var fwdBtn = document.createElement("button");
    fwdBtn.innerHTML = Next;
    slideshow.append(fwdBtn);
    
    var picNum = 0;
    
    backBtn.onclick = prevPic;
    backBtn.onclick = nextPic;
    
    function setPic(){
        image.src = params.objArray[picNum].image;
        caption.innerHTML = params.objArray[picNum].caption;
    }
    
    function nextPic(){
        if (picNum < params.objArray.length - 1){
            picNum++;
        }
        else{
            picNum = 0; // Go back to beginning
        }        
        setPic();
    }
    
    function prevPic(){
        if ( picNum > 0){
            picNum--;
        }
        else{
            picNum = params.objArray.length - 1; // Go to last picture
        }
        setPic();
    }
    
    //TODO: Create public function
    
    return slideshow;
}

