function SlideShows() {
    var slideShowContainer = document.createElement("div");
    slideShowContainer.classList.add("slideContainer");
    
//    console.log("inititiating 1st ajax call");
    
    ajax("json/cats.json", processCatList, slideShowContainer);
    
//    console.log("inititiating 2nd ajax call");
    ajax("json/users.json", processUsersList, slideShowContainer);
   
    
    return slideShowContainer;
    
    function processCatList(catsObj){
        for (var i = 0; i < catsObj.length; i++){
            // add a caption based on the nickname property
            catsObj[i].caption = catsObj[i].nickname;
        }
        var ssParams = {objArray: catsObj,
            id: "slideShow1", 
            className: "slideShow", 
            captionClass: "caption",
            showCaption: true,
            header: "Some really great cats!"};
        var ss = MakeSlideShow(ssParams);
        ss.setPicNum(0);
        ss.enableSlideNum();
        slideShowContainer.appendChild(ss);
        
        
    }
    
    function processUsersList(usersObj){
        for (var i = 0; i < usersObj.length; i++){
            usersObj[i].caption = "";
        }
        var ssParams = {objArray: usersObj, 
            id: "slideShow2", 
            className: "slideShow", 
            showCaption: false,
            header: "Users"};
        var ss = MakeSlideShow(ssParams);
        ss.setPicNum(0);
        slideShowContainer.appendChild(ss);
    }
    
}