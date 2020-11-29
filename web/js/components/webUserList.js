function webUserList() {
    var tableContainer = document.createElement("div");
    
    ajax("webAPIs/listUsersAPI.jsp", processUsersList, tableContainer);
    
    return tableContainer;
    
    function processUsersList(obj){
        if(obj.dbError.length > 0){
            tableContainer.innerHTML = obj.dbError;
            return;
        }
        
        // Add different heading and Icon for user insert
        var heading = Utils.make({
            htmlTag: "h2",
            parent: tableContainer
        });
        Utils.make({
            htmlTag: "span",
            innerHTML: "Web User List ",
            parent: heading
        });
        var img = Utils.make({
            htmlTag: "img",
            parent: heading
        });
        img.src = CRUD_icons.insert;
        img.onclick = function () {            
            window.location.hash = "#/userInsert";
        };
        heading.style.textAlign = "center";
        
        var list = [];
        for (var i = 0; i < obj.webUserList.length; i++){
            list[i] = {};
            
            list[i].webUserId = obj.webUserList[i].webUserId;
            list[i].userEmail = obj.webUserList[i].userEmail;
            list[i].userPassword = obj.webUserList[i].userPassword;
            // change image property to conain an image tag
            if(obj.webUserList[i].image.length > 0){
                list[i].image = "<img src='" + obj.webUserList[i].image + "' style=width:10rem>";
            }
            else{
                list[i].image = "";
            }
            
            list[i].birthday = obj.webUserList[i].birthday;
            list[i].membershipFee = obj.webUserList[i].membershipFee;
            list[i].userRoleType = obj.webUserList[i].userRoleType;
            
            list[i].update = addUpdate(list[i].webUserId);
        }
                
        var tableParams = {
            list: list,
            className: "clickSort",
//            header: "Users",
            initialSortProp: "userEmail"
        };
        
        var table = MakeTable(tableParams);
        tableContainer.appendChild(table);
        
        function addUpdate(id){
            var img = document.createElement("img");
            
            img.src = CRUD_icons.update;
            
            img.webUserId= id;
            img.onclick = function () {
                window.location.hash = "#/userUpdate/" + this.webUserId;
            };
            
            return img;
        }
    }        
    
}