/* Create a calendar component based on the provided parameters
 * 
 *   @param {array} objList - a list of the data objects to insert into the calendar
 *   @param {string} datePropName - the date property name for objects in objList. Date must be in mm/dd/yyyy format
 *   @param {string} datumPropName - the data property name for objects in objList
 *   @param {string} detailPropName - the details property name for objects in objList
 *   @param {string} imgPropName - Optional. Property name of an image URL for objects in objList
 *   @param {number} month - Optional.  A specific month to create the calendar for.  Indexed 0-11
 *   @param {number} year - Optional. The year to create the calendar month for.
 *   
 *   @param {function} formatSpotlight - Optional function to be called when formatting data added to spotlight  
 *   
 *   @param {string} className - an HTML class name to be associated with the returned component
 *   @param {string} activeClass - an HTML class name to be associated with elements in the expanded week view
 *   @param {string} highlightClass - an HTML class name to be associated with elements highlighted in the spotlight view
 * 
 */
function MakeCalendar(params){
    var calClassName = params.className || "Calendar";
    var activeClass = params.activeClass || "active";
    var highlightClass = params.hightlightClass || "highlight";
    
    var dateProp = params.datePropName;
    var dataProp = params.datumPropName;
    var detailProp = params.detailPropName;
    var imgProp = params.imgPropName || "";   
    
    var calendarComponent = document.createElement("div");        
    calendarComponent.classList.add(calClassName);
    
    var dateObj;
    var month;
    var year;
    // Defaults to current month if not specified in params
    if(params.month && params.year){
        month = params.month;
        year = params.year;
        dateObj = new Date(year, month);        
    }
    else{
        dateObj = new Date();
        month = dateObj.getMonth();
        year = dateObj.getFullYear();
    }
    
    
   
    var cal = genCalendar(month, year, calendarComponent);
    var spotlightElem; // current highlighted element

    var list = params.objList;
    addData();
    
    // public function
    // If not called, calendar component will work for specified month only
    calendarComponent.enableMonthButtons = function(){
        var prev = document.createElement("button");
        var next = document.createElement("button");
        
        prev.innerHTML = "&larr;";
        next.innerHTML = "&rarr;";
        prev.onclick = prevMonth;
        next.onclick = nextMonth;
        
        var child = cal.title.getElementsByTagName("h2")[0];        
        cal.title.insertBefore(prev, child);
        child.after(next);
    };
    
    // public function
    /* Default function for formatting the spotlight data.
     * Can be set by HTML coder to create a different view of the data
     * 
     * @param {type} obj
     * @returns {String} formatted
     */
    calendarComponent.formatSpotlight = params.formatSpotlight || function(obj){
        var output = "";
            if(obj){
                if(imgProp){
                    if(obj[imgProp]){
                        output += "<img src=" + obj[imgProp] + "><br>";                                        
                    }
                }
            
                output += "<strong>" + obj[dataProp] + "</strong>" +"<br>";
                if(obj[detailProp]){
                    output += obj[detailProp] + "<br>";
                }
            }
            else{
                output = "Error: Could not format data for " + obj; 
            }
        return output;
        };
                    
    return calendarComponent;
    
    /* Create a table format calendar     
     * @param {number} month - the calendar month to create
     * @param {number} year - the corresponging year (necessary to determine days of week)
     * @param {element} container
     * @returns {element} calendar Object
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
        var titleYear = document.createElement("h4");
        titleMonth.innerHTML = tmp.toLocaleString('default', {month: 'long'});
        titleYear.innerHTML = tmp.toLocaleString('default', {year: 'numeric'});
        calObj.title.appendChild(titleYear);
        calObj.title.appendChild(titleMonth);
        
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
        var numCells = daysInMonth(month, year);
        
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
    
    /* returns the number of days for specified month, year     
     *  
     * @param {number} month indexed 0-11
     * @param {number} year
     * @returns {number} Number of days in month
     */
    function daysInMonth(month, year){
        return new Date(year, month + 1, 0).getDate();
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
        var data = cal.body.getElementsByTagName("p");
        for(var i = 0; i < data.length; i++){
            hide(data[i]);
        }
    }
    
    /* Highlights the information for a clicked day
     * 
     * @param {element} e     * 
     */     
    function spotlight(e){
        collapseWeek();
        cal.spotlight.innerHTML = "";
        hide(cal.spotlight);
        show(cal.spotlight);
        
        // Handle clicked child elem
        var elem;
        if(e.target.tagName === "P"){
            elem = e.target.parentElement;
        }
        else{
            elem = e.target;
        }

        highlight(elem);
        var day = elem.innerText;
        var date = new Date(year, month, day);
        var head = document.createElement("h3");
        head.innerHTML = date.toDateString();
        cal.spotlight.appendChild(head);
        
        cal.spotlight.innerHTML += addSpotlightData(date);
                
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
    
    /* Search the objList for data matching the provided date.     
     * Format and add it to the output
     */    
    function addSpotlightData(date){
        var obj;
        var output = "";
        for(var i = 0; i < list.length; i++){
            obj = list[i];
            var other_date =  new Date(obj[dateProp]);
            if(other_date.getDate() === date.getDate() && other_date.getMonth() === date.getMonth()){
                output += calendarComponent.formatSpotlight(obj);                
            }
        }
        return output;
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
    
    // Enables HTML coder to add any styling to the highlighted day
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


