/*
 *  This function expects the following properties in a parameter object:
 *      - A list of objects
 *      - the name of a sort order icon (optional)
 *      - class to be applied to the container div
 *      - the property name of the initial sort order
 *      - heading/title for the table (optional)
 *      
 *  
 *  Returns a div containging the table
 */

function MakeTable(params){
    var objList = params.list;
    var initialSortProp = params.initialSortProp;
    var className = params.className || "clickSort";
    
    var div = document.createElement("div");
    div.classList.add(className);
    
    // add optional header
    if(params.header){
        var header = document.createElement("h2");
        header.innerHTML = params.header;
        div.appendChild(header);
    }
    
    // add the table
    var table = document.createElement("table");
    div.appendChild(table);
    addTableHead(table, objList, initialSortProp);
    addTableBody(table, objList, initialSortProp);
    
    // TODO: add icon support
    
    return div;
    
    function addRow(tag, parent, value, align){
        var rowElem = document.createElement(tag);
        rowElem.innerHTML = value;
        rowElem.style.textAlign = align;
        parent.appendChild(rowElem);
        
        return rowElem;
    }
    
    function alignment(val) {
        
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
            var colHead = addRow("th", tableHead, prettifyColumnHead(prop), alignment(list[0][prop]));
            colHead.sortPropName = sortOrderPropName;
        
            // TODO: Add forward reverse functionality
//        colHead.sortDir = 0; // 0 is forward, 1 is reverse
        
            // add clicksortable behavior
            colHead.onclick = function(){
                addTableBody(table, list, this.sortPropName);
            };
        }
         
         return tableHead;
        
    }
    
    function addTableBody(table, list, sortOrderPropName){
        // remove any existing table body
        var old = table.getElementsByTagName("tbody");
        if(old[0]){
            table.removeChild(oldBody[0]);
        }
        
        // sort the elements
        sortByProp(list, sortOrderPropName);
        
        var tableBody = document.createElement("tbody");
        table.appendChild(tableBody);
        
        for (var i in list){
            var row = document.createElement("tr");
            tableBody.appendChild(row);
            
            for( var prop in list[i]){
                addRow("td", row, list[i][prop], alignment(list[i][prop]));
            }
        }
        
        return tableBody;        
        
    }
    
    function sortByProp(list, prop){
        list.sort(
                function (a, b){
                    var aVal = convert(a[prop]);
                    var bVal = convert(b[prop]);
                    
                    if (aVal > bVal){
                        return -1;
                    }
                    else if(aVal < bVal){
                        return 1;
                    }
                    else{
                        return 0;
                    }                    
                }
                );
        
        // converts the argument into a comparable value, either string, number, or date
        function convert(s){
            if (!s || s.length === 0){
                return -1;
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
    }
    
    
    
    
   
}


