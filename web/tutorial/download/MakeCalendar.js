/* Create a calendar component based on the provided parameters
 * Properties of param object:
 *   objList - a list of the data objects to insert into the calendar
 *   datePropName - A string of the date property name in objList
 *      Date must be in mm/dd/yyyy format
 *   datumPropName - A string of the data property name in objList
 *   detailPropName - A string of the details property name in objList
 *   
 *   className - an HTML class name to be associated with the returned component
 *   activeClass - an HTML class name to be associated with active elements in the component
 * 
 */
function MakeCalendar(params){
    var calClassName = params.className || "Calendar";
    var activeClass = params.activeClass || "active";
    var highlightClass = params.hightlightClass || "highlight";
    
    var dateProp = params.datePropName;
    var dataProp = params.datumPropName;
    var detailProp = params.detailPropName;
    
    var calendarComponent = document.createElement("div");        
    calendarComponent.classList.add(calClassName);
    
    var dateObj = new Date();
    var month = dateObj.getMonth();
    var year = dateObj.getFullYear();
    var monthName = dateObj.toLocaleString("default", {month: "long"});
    
   
    var cal = genCalendar(month, year, calendarComponent);
    var spotlightElem; // current highlighted element

    var list = params.objList;
    addData();
    
    // public function
    calendarComponent.enableMonthButtons = function(){
        var prev = document.createElement("button");
        var next = document.createElement("button");
        
        prev.innerHTML = "&larr;"
        next.innerHTML = "&rarr;";
        prev.onclick = prevMonth;
        next.onclick = nextMonth;
        
        var child = cal.title.childNodes[0];        
        cal.title.insertBefore(prev, child);
        child.after(next);
    };
                    
    return calendarComponent;
    
    /* Create a table format calendar
    * month - the calendar month to create
    * year - the corresponging year (necessary to determine days of week)
    */
    function genCalendar(month, year, container){
        var calObj = {};
        calObj.dayArray = [];
        calObj.table = document.createElement("table");
        calObj.spotlight = document.createElement("div");
        calObj.title = document.createElement("div");
        calObj.header = document.createElement("thead");
        
        // Add the header to the table
        var dayLabels = ["S", "M", "T", "W", "T", "F", "S"];        
        var tmp = new Date(year, month);
        var titleMonth = document.createElement("h2");
        titleMonth.innerHTML = tmp.toLocaleString('default', {month: 'long'});
        calObj.title.appendChild(titleMonth);
        
//        calObj.table.appendChild(calObj.month);
//        
        // add dummy first head element        
        var head = document.createElement("th");
        calObj.header.appendChild(head);
        for(var i = 0; i < dayLabels.length; i++){
            head = document.createElement("th");
            head.innerHTML = dayLabels[i];
            calObj.header.appendChild(head);
        }
        calObj.table.appendChild(calObj.header);
        
        var dummyCells = (new Date(year, month)).getDay(); // padding elements
        var numCells = daysInMonth(month + 1, year);
        
        var body = document.createElement("tbody");
        calObj.body = body;
        calObj.table.appendChild(body);
        var row;
        var day;
        
        for(var i = 0; i < numCells + dummyCells; i++){
            // wrap to a new row at the end of a week
            if(i % 7 === 0){
                row = document.createElement("tr");
                body.appendChild(row);
                weekButton = document.createElement("button");
                weekButton.innerHTML = "+";
                weekButton.onclick = expandWeek;
                row.appendChild(weekButton);
            }
            
            day = document.createElement("td");            
            row.appendChild(day);
            
            if(i >= dummyCells){
                day.onclick = spotlight; // only add click function to days in month
                day.onkeyup = spotlight;
                day.innerHTML = i - dummyCells + 1;
                calObj.dayArray.push(day);
                day.tabIndex = 0; // Make element focusable
            }
        }        
        container.appendChild(calObj.title);
        container.appendChild(calObj.table);
        calObj.table.appendChild(calObj.spotlight);
        
        
        return calObj;
    }
    
    // month is the numerical value of the month ie 1 for Jan, 2 for Feb;
    function daysInMonth(month, year){
        return new Date(year, month, 0).getDate();
    }
    
    function expandWeek(){
        hide(cal.spotlight);
        highlight();
        this.innerHTML = (this.innerHTML === "+") ? "-":"+";
        var row = this.parentElement;
        var data = row.getElementsByTagName("p");
        
        for(var i = 0; i < data.length; i++){
            show(data[i]);
            
        }
    }
    function collapseWeek(){
        var buttons = cal.body.getElementsByTagName("button");
        for(var i = 0; i < buttons.length; i++){
            buttons[i].innerHTML = (this.innerHTML === "+") ? "-":"+";
        }
//        var data = cal.body.getElementsByTagName("div");
        var data = cal.body.getElementsByTagName("p");
        for(var i = 0; i < data.length; i++){
            hide(data[i]);
        }
    }
    
    /*
     * Highlights the information for a clicked day
     */
    function spotlight(e){
        collapseWeek();
        cal.spotlight.innerHTML = "";
        hide(cal.spotlight);
        show(cal.spotlight);
        
//        console.log(e.target.tagName);
        // Handle clicked child div
        var elem;
        if(e.target.tagName === "P"){
            elem = e.target.parentElement;
        }
        else{
            elem = e.target;
        }
//        console.log(elem);
       
       
       highlight(elem);
       var index = elem.innerText; // index is the day of the month
       var date = new Date(year, month, index);
//       console.log(date);
       
        var head = document.createElement("h3");
        head.innerHTML = date.toDateString();
        cal.spotlight.appendChild(head);
        
        var obj;
        for(var i = 0; i < list.length; i++){
            obj = list[i];
            var other_date =  new Date(obj[dateProp]);
            if(other_date.getDate() === date.getDate() && other_date.getMonth() === date.getMonth()){
//                console.log(other_date);
//                console.log(date);
                cal.spotlight.innerHTML += obj[dataProp];
                if(obj[detailProp]){
                    cal.spotlight.innerHTML += "<br>";
                    cal.spotlight.innerHTML += obj[detailProp];
                }
                break;
            }
        }
        spotlightElem = elem;
    }
    
    function nextMonth(){        
        if (month === 1){
            month = 0;
            year++;
        }
        else{ month++;}
        calendarComponent.innerHTML = "";
        cal = genCalendar(month, year, calendarComponent);
        addData();
        calendarComponent.enableMonthButtons();
    }
    
    function prevMonth(){
        if(month === 0){
            month = 11;
            year--;
        }else{ month--;}
        calendarComponent.innerHTML = "";
        cal = genCalendar(month, year, calendarComponent);
        addData();
        calendarComponent.enableMonthButtons();
    }
    
    function addData(){
        var obj;
        // loop through all of the objects and attach the data to days in the
        // current month
        for(var i = 0; i < list.length; i++){
            obj = list[i];
            var datumElem = document.createElement("p");            
            var date = new Date(obj[dateProp]);
            if(date.getMonth() === month){    
                var dayElem = cal.dayArray[date.getDate() - 1];                                                  

                // Add the content to the day element
                datumElem.innerHTML = obj[dataProp];
                datumElem.onClick = spotlight;
                hide(datumElem);                
                
                dayElem.appendChild(datumElem);
                
                
                

            }        
        }
    }
        
    
    function show(elem){   
        if(elem.style.visibility === "hidden"){
            elem.style.visibility = "visible";
            elem.classList.add(activeClass);
        }
        else{
            elem.style.visibility = "hidden";
            if(elem.classList.contains(activeClass)){
                elem.classList.remove(activeClass);
            }
        }
    }
    
    function hide(elem){       
        elem.style.visibility = "hidden";
        if(elem.classList.contains(activeClass)){
                elem.classList.remove(activeClass);
        }
    }
    
    //  Adds a highlight background color to argument elem
    // or clears the existing highlight if elem is null;
    function highlight(elem){
        if(spotlightElem){
            if(spotlightElem.classList.contains(highlightClass)){
                spotlightElem.classList.remove(highlightClass);
            }
        }
        if(elem){
            elem.classList.add(highlightClass);
        }
    }
    
}


