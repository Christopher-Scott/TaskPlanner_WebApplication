function taskList() {
    var tableContainer = document.createElement("div");
        
    // Get the logged on user
    ajax("webAPIs/getProfileAPI.jsp", processLoggedOn, tableContainer);
    
    function processLoggedOn(loggedOnUser){        
        var user = loggedOnUser;
        console.log("Logged on user has ID: " + user.webUserId);
        if(!user.webUserId){
            var error = Utils.make({
              "parent": tableContainer,
              "htmlTag": "h4",
              "innerHTML": user.errorMsg + " - Data is view only"
            });
            error.style.textAlign = "center";
            
        }
                
        ajax("webAPIs/listTasksAPI.jsp", processTasksList, tableContainer);       

        function processTasksList(obj){            
            if(obj.dbError.length > 0){
                tableContainer.innerHTML = obj.dbError;
                return;
            }
            var list = [];
            for (var i = 0; i < obj.taskList.length; i++){
                list[i] = {};

                list[i].taskId = obj.taskList[i].taskId;
                list[i].userEmail = obj.taskList[i].userEmail;
                list[i].taskTitle = obj.taskList[i].taskTitle;
                list[i].taskDesc = obj.taskList[i].taskDesc;
                list[i].dueDate = obj.taskList[i].dueDate;

                // change image property to contain an image tag
                if(obj.taskList[i].image.length > 0){
                    list[i].image = "<img src='" + obj.taskList[i].image + "' style=width:5rem>";
                }
                else{
                    list[i].image = "";
                }
                
                list[i].importance = obj.taskList[i].taskWeight.toString();
                
                if(user.webUserId){
                    // only add the update icon for the rows belonging to logged on user - client side validation
                    if(user.webUserId === obj.taskList[i].webUserId){                                            
                        list[i].update = addUpdate(list[i].taskId);
                    }
                    else{
                        list[i].update = "";
                    }
                }
                
            }                

            var tableParams = {
                list: list,
                className: "clickSort",
                header: "Tasks",
                initialSortProp: "userEmail"            
            };

            var clickSort = MakeTable(tableParams);
            tableContainer.appendChild(clickSort);


            // create the update element
            function addUpdate(id){
                var img = document.createElement("img");

                img.src = CRUD_icons.update;

                img.taskId = id;
                img.onclick = function () {
                    window.location.hash = "#/taskUpdate/" + this.taskId;
                };

                return img;
            }
        } 
    }
    
    return tableContainer;
    
}



