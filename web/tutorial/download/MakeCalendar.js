function MakeCalendar(params){
    var calClassName = params.className || "Calendar";
    var dateProp = params.datePropName;
    
    var div = document.createElement("div");        
    div.classList.add(calClassName);
    
    var dateObj = new Date();
    var month = dateObj.getMonth();
    var year = dateObj.getFullYear();
    var monthName = dateObj.toLocaleString("default", {month: "long"});
    
    var cal = genCalendar(month, year);
    div.appendChild(cal.table);
    
    var list = params.objList;
    var obj;
    for(var i = 0; i < list.length; i++){
        obj = list[i];
        var datum = document.createElement("div");
        var date = new Date(obj[dateProp]);
        if(date.getMonth() === month){
            var dayElem = cal.dayArray[date.getDate() - 1];
            
            // TODO: add content to dayElem
            datum.innerHTML = 0;
            hide(datum);
            
            dayElem.appendChild(datum);
            
        }
        
    }
    
    return div;
    
    
    function genCalendar(month, year){
        var calObj = {};
        calObj.dayArray = [];
        calObj.table = document.createElement("table");
        var dummyCells = (new Date(year, month)).getDay(); // padding elements
        var numCells = daysInMonth(month + 1, year);
        
        var row;
        var day;
        
        for(var i = 0; i < numCells + dummyCells; i++){            
            if(i % 7 === 0){
                row = document.createElement("tr");
                calObj.table.appendChild(row);
                weekButton = document.createElement("button");
                weekButton.onclick = expandWeek;
                row.appendChild(weekButton);
            }
            
            day = document.createElement("td");
            row.appendChild(day);
            
            if(i >= dummyCells){
                day.innerHTML = i - dummyCells + 1;
                calObj.dayArray.push(day);                
            }
        }
        
        return calObj;
    }
    
    // month is the numerical value of the month ie 1 for Jan, 2 for Feb;
    function daysInMonth(month, year){
        return new Date(year, month, 0).getDate();
    }
    
    function expandWeek(){        
        var row = this.parentElement;
        var data = row.getElementsByTagName("div");
        
        for(var i = 0; i < data.length; i++){
            show(data[i]);
        }
    }
    
    function show(elem){
        if(elem.style.display === "none"){
            elem.style.display = "block";
        }
        else{
            elem.style.display = "none";
        }
    }
    
    function hide(elem){
        elem.style.display = "none";
    }
}


