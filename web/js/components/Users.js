function Users() {
    var tableContainer = document.createElement("div");
    
    ajax("json/users.json", processUsersList, tableContainer);
    
    return tableContainer;
    
    function processUsersList(list){
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
//            ,icon: "icons/sortUpDown16.png"
        };
        
        var table = MakeTable(tableParams);
        tableContainer.appendChild(table);
    }        
    
}