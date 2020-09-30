function Tasks() {
    var tableContainer = document.createElement("div");
    
    ajax("json/tasks_complete.json", processTasksList, tableContainer);
    
    return tableContainer;
    
    function processTasksList(list){
        for (var i = 0; i < list.length; i++){
            // change image property to conain an image tag
            if(list[i].image === null){
                list[i].image ="";
            }
            else{
                list[i].image = "<img src='" + list[i].image + "' style=width:5rem>";
            }            
            
            // Handle the task weight
            // sort() will convert string to number and sort accordingly
            // but alignment() expects a string value so we must handle null 
            // and convert to string here
            // also rename property for better table title
            if(list[i].taskWeight === null){
                list[i].importance = "";
            }
            else{
                list[i].importance = list[i].taskWeight.toString();
            }            
            delete list[i].taskWeight;
            
            if(list[i].dueDate === null){
                list[i].dueDate = "";
            }            
            
            if(list[i].taskDesc === null){
                list[i].taskDesc = "";
            }
            
            // get rid of unwanted fields for the table
            delete list[i].userRoleId;
            delete list[i].taskId;
            delete list[i].webUserId;
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


