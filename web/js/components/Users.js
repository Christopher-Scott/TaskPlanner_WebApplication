function Users() {
    var tableContainer = document.createElement("div");
    
    ajax("json/users.json", processUsersList, tableContainer);
    
    return tableContainer;
    
    function processUsersList(list){
        for (var i = 0; i < list.length; i++){
            // change image property to conain an image tag
            list[i].image = "<img src='" + list[i].image + "' style=10rem>";
            // delete the password property
            delete list[i].userPassword;
        }
        
        sortProp = list[0][0];
        var tableParams = {
            list: list,
            className: "clickSort",
            header: "Users",
            initialSortProp: sortProp            
        };
        
        var table = MakeTable(tableParams);
        tableContainer.appendChild(table);
    }        
    
}