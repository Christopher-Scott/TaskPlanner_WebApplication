/*
 *  This function expects the following properties in a parameter object:
 *      - A list of objects      
 *      - class to be applied to the container div
 *      - the property name of the initial sort order
 *      - heading/title for the table (optional)
 *      
 *  
 *  Returns a div containging the table
 */

function MakeTable(params){
    var objList = params.list;
    var sortPropName = params.initialSortProp;
    var className = params.className || "clickSort";    
    
    var div = document.createElement("div");
    div.classList.add(className);
    
    // add optional header
    if(params.header){
        var header = document.createElement("h2");
        header.innerHTML = params.header;
        div.appendChild(header);
    }
    
    // add the filter input
    var inputTitle = document.createElement("div");
    inputTitle.innerHTML = "Filter by:";
    inputTitle.style.display = "inline-block";
    inputTitle.style.paddingRight = "5px";
    div.appendChild(inputTitle);
    var searchInput = document.createElement("input");
    div.appendChild(searchInput);
    
    // add the table
    var table = document.createElement("table");
    div.appendChild(table);
    addTableHead(table, objList, sortPropName);
    addTableBody(table, objList, searchInput.value, sortPropName);
    
    searchInput.onkeyup = function(){
        addTableBody(table, objList, searchInput.value, sortPropName);
    };
    
    
    return div;
    
    function addRow(tag, parent, value, align){
        var rowElem = document.createElement(tag);
        if(typeof value === 'string' || value instanceof String){
            rowElem.innerHTML = value;
        }
        else{
            rowElem.appendChild(value);
        }
        rowElem.style.textAlign = align;
        parent.appendChild(rowElem);
        
        return rowElem;
    }
    
    function alignment(val) {
        
        if(typeof val === 'string' || val instanceof String){
        
            var parsedDate = Date.parse(val);
            if (isNaN(val) && (!isNaN(parsedDate))) {
                return "center";
            }

            if (val.includes(".png") || val.includes(".jpg")) {
                return "center";
            }

            var possNum = val.replace("$", "");
            possNum = possNum.replace(",", "");
            if (isNaN(possNum)) {
                return "left";
            }
            return "right";
        }
        else{ // val is an element
            "center";
        }
    }
    
    function prettifyColumnHead(propName){
        // handle case where the argument is an empty String
        if (propName.length === 0)
            return "";
        
        // Set the first character to be capitalized
        var retVal = propName.charAt(0).toUpperCase();
        for(var i = 1; i < propName.length; i++){
            var c = propName.charAt(i);
            // Add a space before capital letters
            if(c === c.toUpperCase()){
                retVal += " ";
            }
            
            retVal += c;                        
        }
        
        return retVal;
        
    }
    
    function addTableHead(table, list, sortOrderPropName){
        var tableHead = document.createElement("thead");
        table.appendChild(tableHead);
        
        for (var prop in list[0]){
            var colHead = addRow("th", tableHead, prettifyColumnHead(prop), list[0][prop]);                            
            colHead.sortPropName = prop;
        
        
            // add clicksortable behavior
            colHead.onclick = function(){
                sortPropName = this.sortPropName;
//                console.log("Sorting by: " + sortPropName);

                addTableBody(table, list, searchInput.value, sortPropName);
            };
        }
         
         return tableHead;
        
    }
    
    function addTableBody(table, list, filterValue, sortOrderPropName){
        // remove any existing table body
        var old = table.getElementsByTagName("tbody");
        if(old[0]){
            table.removeChild(old[0]);
        }
        
        // sort the elements
        sortByProp(list, sortOrderPropName);
        
        var tableBody = document.createElement("tbody");
        table.appendChild(tableBody);
        
        
        // create a row and entry for each datum
        for (var i in list){
            if(isToShow(list[i], filterValue)){
                var row = document.createElement("tr");
                tableBody.appendChild(row);

                for( var prop in list[i]){                                   
                    addRow("td", row, list[i][prop], alignment(list[i][prop]));
                }
            }
        }    
        return tableBody;  
    }
        
              
           
    
    function sortByProp(list, prop){
        list.sort(
                function (a, b){                    
                    var aVal = convert(a[prop]);
                    var bVal = convert(b[prop]);

                    var c = 0;                    
                    if (aVal > bVal){
                        c = 1;
                    }
                    else if(aVal < bVal){
                        c = -1;
                    }
                    
//                    console.log(prop + " " + aVal + " | " + bVal + " result: " + c);
                    return c;
                }
                );
        
        // converts the argument into a comparable value, either string, number, or date
        function convert(s){
            if(typeof s === 'string' || s instanceof String){
                if(!s || s.length === 0){
                    return "";
                }
                // Date.parse returns number value
                var parsedDate = Date.parse(s);
                if (isNaN(s) && !isNaN(parsedDate)){
                    return parsedDate;                
                }
                else{
                    var temp = s;
                    temp = temp.replace("$", "");
                    temp = temp.replace(",", "");
                    if (isNaN(temp)){
                        return s.toUpperCase();
                    }
                    else{
                        return Number(temp);
                    }
                }
            }
            else{
                return "";
            }
        }
    }
    
    // check if the any of the data in the current object matches the filter input
    function isToShow(obj, input){
        if(!input || input.length === 0){
            return true;
        }
        for (var prop in obj){            
            var upperPropVal = obj[prop].toUpperCase();
            
            if(upperPropVal.includes(input.toUpperCase())){
                if(!upperPropVal.includes("<IMG")){
                    return true;
                }
            }
        }
        return false;
    }
   
}


