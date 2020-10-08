function LiveUsers() {
    var tableContainer = document.createElement("div");
    
    ajax("webAPIs/listUsersAPI.jsp", processUsersList, tableContainer);
    
    return tableContainer;
    
    function processUsersList(obj){
        if(obj.dbError.length > 0){
            tableContainer.innerHTML = obj.dbError;
            return;
        }
        var list = obj.webUserList;
        for (var i = 0; i < list.length; i++){
            // change image property to conain an image tag
            list[i].image = "<img src='" + list[i].image + "' style=width:10rem>";
            // delete properties that should not be shown in the table
            delete list[i].userPassword;            
            delete list[i].webUserId;
            delete list[i].userRoleId;
            delete list[i].errorMsg;
        }
                
        var tableParams = {
            list: list,
            className: "clickSort",
            header: "Users",
            initialSortProp: "userEmail"
        };
        
        var table = MakeTable(tableParams);
        tableContainer.appendChild(table);
    }        
    
}