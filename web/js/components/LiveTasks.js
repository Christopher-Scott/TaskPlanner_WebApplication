function LiveTasks() {
    var tableContainer = document.createElement("div");
    
    ajax("webAPIs/listTasksAPI.jsp", processTasksList, tableContainer);
    
    return tableContainer;
    
    function processTasksList(obj){
        if(obj.dbError.length > 0){
            tableContainer.innerHTML = obj.dbError;
            return;
        }
        var list = obj.taskList;
        for (var i = 0; i < list.length; i++){
            // change image property to conain an image tag
            if(list[i].image.length > 0){
                list[i].image = "<img src='" + list[i].image + "' style=width:5rem>";
            }            
            
            // Handle the task weight
            // sort() will convert string to number and sort accordingly            
            list[i].importance = list[i].taskWeight.toString();            
            delete list[i].taskWeight;
            

            
            // get rid of unwanted fields for the table
            delete list[i].userRoleId;
            delete list[i].taskId;
            delete list[i].webUserId;
            delete list[i].errorMsg;
        }
                
        var tableParams = {
            list: list,
            className: "clickSort",
            header: "Tasks",
            initialSortProp: "userEmail"            
        };
        
        var table = MakeTable(tableParams);
        tableContainer.appendChild(table);
    }        
    
}


