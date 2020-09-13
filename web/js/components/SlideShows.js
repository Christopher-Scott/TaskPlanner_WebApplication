function SlideShows() {
    var slideShowContainer = document.createElement("div");
    slideShowContainer.classList.add("slideContainer");
    
    
    ajax("json/cats.json", processCatList, slideShowContainer);
    
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
            bgColor: "#80A5D9", // optional parameter
            header: "Some really great cats!"};
        var ss = MakeSlideShow(ssParams);
        ss.setPicNum(0);
        ss.enableSlideNum();
        slideShowContainer.appendChild(ss);
        
        
    }
    
    function processUsersList(usersObj){
        for (var i = 0; i < usersObj.length; i++){
            usersObj[i].caption = usersObj[i].userEmail;
        }
        var ssParams = {objArray: usersObj, 
            id: "slideShow2", 
            className: "slideShow",             
            header: "Users"};
        var ss = MakeSlideShow(ssParams);
        ss.setPicNum(0);
        slideShowContainer.appendChild(ss);
    }
    
}