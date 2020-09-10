function MakeSlideShow(params){
    var className = params.className || "slideShow";
    var captionClass = params.captionClass || "caption";
    var showCaption = params.showCaption || false; // default is false
    
    
    // create element that will be returned
    var slideshow = document.createElement("div");
    if(params.id){ // add id only if it was provided
        slideshow.id = params.id;
    }
    slideshow.classList.add(className);
    
    // Handle error for no provided array of objects
    if(!params.objArray){
        var errorMsg = document.createElement("div");
        errorMsg.innerHTML += "Error - slideshow could not be created. No array of objects provided.";
        slideshow.append(errorMsg);
        return slideshow;
    }
    
    // add optional header element
    if(params.header){
        var header = document.createElement("h2");
        header.innerHTML = params.header;
        slideshow.append(header);
    }
    
    var image = document.createElement("img");
    slideshow.append(image);
    
    var caption = document.createElement("p");
    caption.classList.add(captionClass);
    slideshow.append(caption);
    
    // implement optional parameter to hide or show caption
    if(showCaption){
        caption.style = "visibility: visible;";
    }
    else{
        caption.style = "visibility: hidden;";
    }
    
    var backBtn = document.createElement("button");
    backBtn.innerHTML = "Prev";
    slideshow.append(backBtn);
    
    // set up element for slide number, hidden unless enabled
    var slideNum = document.createElement("div");
    slideNum.classList.add(className);
    slideNum.style = "display: inline; visibility: hidden;";
    slideshow.append(slideNum);
    var showSlideNum = false;
    
    var fwdBtn = document.createElement("button");
    fwdBtn.innerHTML = "Next";
    slideshow.append(fwdBtn);
    
     
    
    
    var picNum = 0;
    
    backBtn.onclick = prevPic;
    fwdBtn.onclick = nextPic;
    
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
        if(showSlideNum){
            updateSlideNum();
        }
    }
    
    function prevPic(){
        if ( picNum > 0){
            picNum--;
        }
        else{
            picNum = params.objArray.length - 1; // Go to last picture
        }
        setPic();
        if(showSlideNum){
            updateSlideNum();
        }
    }
    
    function updateSlideNum(){
        var num =  picNum + 1;
        var last = params.objArray.length;
        slideNum.innerHTML = num.toString() + " / " + last.toString();
    }
    
    slideshow.setPicNum = function (newNum){
        if ((newNum >= 0) && (newNum < params.objArray.length)) {
            picNum = newNum;				
            setPic();
        }
    };
    
    // public function to enable slide numbers
    slideshow.enableSlideNum = function () {
        showSlideNum = true;
        slideNum.style = "display: inline; visibility: visible;";
        updateSlideNum();
    };
    
    return slideshow;
}

