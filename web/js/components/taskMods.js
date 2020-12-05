var taskMods = {};

(function () {
   
    function getDataFromUI(validateObjList){
                
        var taskInputObj = {
            "taskId": validateObjList["taskId"].inputBox.value,
            "userEmail": validateObjList["userEmail"].inputBox.value,
            "taskTitle": validateObjList["taskTitle"].inputBox.value,
            "taskDesc": validateObjList["taskDesc"].inputBox.value,
            "dueDate": validateObjList["dueDate"].inputBox.value,
            "image": validateObjList["image"].inputBox.value,
            "taskWeight": validateObjList["taskWeight"].inputBox.value,
            "webUserId": validateObjList["webUserId"].inputBox.value,
            "userRoleId": "",
            "errorMsg": ""
        };
        
        return encodeURIComponent(JSON.stringify(taskInputObj));
    }
    
    function writeErrorObjToUI(jsonObj, validateObjList){        

        validateObjList["taskId"].errorTd.innerHTML = jsonObj.taskId;
        validateObjList["userEmail"].errorTd.innerHTML = jsonObj.userEmail;
        validateObjList["taskTitle"].errorTd.innerHTML = jsonObj.taskTitle;
        validateObjList["taskDesc"].errorTd.innerHTML = jsonObj.taskDesc;
        validateObjList["dueDate"].errorTd.innerHTML = jsonObj.dueDate;
        validateObjList["image"].errorTd.innerHTML = jsonObj.image;
        validateObjList["taskWeight"].errorTd.innerHTML = jsonObj.taskWeight;
        validateObjList["webUserId"].errorTd.innerHTML = jsonObj.webUserId;
        validateObjList["recordError"].innerHTML = jsonObj.errorMsg;
    }
    
        function makeInputRow(fieldName, promptText, validationTable, validationObjList) {

        var obj = {}; // this will hold references to the input box and the error td for the 
        // given field name.

        var row = Utils.make({// Inject a row into the table 
            htmlTag: "tr",
            parent: validationTable
        });
        Utils.make({// first td of row will hold promptText
            htmlTag: "td",
            innerHTML: promptText, // use fieldName as prompt for now, later promptText,
            parent: row
        });
        var inputTd = Utils.make({// second td of row will hold user input
            htmlTag: "td",
            parent: row
        });
        // store reference to this input box. we need to access it programatically 
        // (to find user's input).
        obj.inputBox = Utils.make({// place textbox in second td
            htmlTag: "input",
            parent: inputTd
        });
        // store reference to the 3rd td that is for holding error messages, 
        // so we can access it programmatically.
        obj.errorTd = Utils.make({
            htmlTag: "td",
            parent: row,
            class: "error"
        });
        // obj has a reference to the inputBox and the errorTd (the two things 
        // we need to access programatically to do validation). Store this 
        // object into an associative array (using fieldName as key). 
        validationObjList[fieldName] = obj;
    } // makeInputRow
    
    function createValidationArea(validateTable, validateObjList) {

        makeInputRow("taskId", "Task Id", validateTable, validateObjList);
        validateObjList["taskId"].inputBox.setAttribute("disabled", true);

        makeInputRow("userEmail", "User Email", validateTable, validateObjList);

        makeInputRow("taskTitle", "Task Title", validateTable, validateObjList);
        makeInputRow("taskDesc", "Task Description", validateTable, validateObjList);        
        makeInputRow("dueDate", "Due Date", validateTable, validateObjList);
        makeInputRow("image", "Image URL", validateTable, validateObjList);        
        makeInputRow("taskWeight", "Task Importance", validateTable, validateObjList);
        
        makeInputRow("webUserId", "User ID", validateTable, validateObjList);
        validateObjList["webUserId"].inputBox.setAttribute("disabled", true);

        var row = Utils.make({
            htmlTag: "tr",
            parent: validateTable
        });
        var saveCell = Utils.make({
            htmlTag: "td",
            parent: row
        });
        var saveButton = Utils.make({
            htmlTag: "button",
            innerHTML: "Save",
            parent: saveCell
        });
        var recordError = Utils.make({
            htmlTag: "td",
            parent: row,
            class: "error"
        });
        Utils.make({
            htmlTag: "td",
            parent: row
        });

        // add recordError and saveButton into validateOjbList so these are available to insert/update code. 

        validateObjList["recordError"] = recordError; // key is "recordError", value recordError is a td
        // that can hold the record level validation message (like "Please try again"). 

        validateObjList["saveButton"] = saveButton; // key is "saveButton", value is the Save Button (DOM element).

    }
    
    taskMods.update = function(taskId) {
        function updateSave(){
            var data = getDataFromUI(validateObjList);
            console.log("ajax - calling updateTaskAPI ");            
            
            ajax("webAPIs/updateTaskAPI.jsp?jsonData=" + data, processUpdate, updateDiv);
            // success function for ajax call
            function processUpdate(obj){
                if (obj.errorMsg.length === 0){
                    obj.errorMsg = "Record Succesfully Updated";
                }
                
                writeErrorObjToUI(obj, validateObjList);
            }
        }
        
        var updateDiv = document.createElement("div");
        
        updateDiv.classList.add("updateArea");
        
        var validateObjList = [];
        
        Utils.make({
            htmlTag: "h2",
            innerHTML: "Update Task",
            parent: updateDiv
        });
        
        var validateTable = Utils.make({
            htmlTag: "table",
            parent: updateDiv
        });
        
        createValidationArea(validateTable, validateObjList);        
        
        validateObjList["saveButton"].onclick = function (){
            validateObjList["recordError"].innerHTML = " &nbsp; &nbsp; ...";            
            updateSave();
        };
        
        ajax("webAPIs/getTaskByIdAPI.jsp?taskId=" + taskId, gotRecordById, updateDiv);
        
        return updateDiv;
        
        // success function for ajax call
        function gotRecordById(jsonObj){
            validateObjList["taskId"].inputBox.value = jsonObj.taskId;
            validateObjList["userEmail"].inputBox.value = jsonObj.userEmail;
            validateObjList["taskTitle"].inputBox.value = jsonObj.taskTitle;
            validateObjList["taskDesc"].inputBox.value = jsonObj.taskDesc;
            validateObjList["dueDate"].inputBox.value = jsonObj.dueDate;
            validateObjList["image"].inputBox.value = jsonObj.image;
            validateObjList["taskWeight"].inputBox.value = jsonObj.taskWeight;
            validateObjList["webUserId"].inputBox.value = jsonObj.webUserId;
            
        }
                
    };
    
    taskMods.delete = function(taskId, webUserId, icon){
        console.log("Attempting to delete task " + taskId);
                
        var error = document.createElement("p");        
        
        ajax("webAPIs/deleteTaskAPI.jsp?taskId=" + taskId + "&webUserId=" + webUserId, deleteTaskFromTable, error);
        
        function deleteTaskFromTable(obj) {
            error.innerHTML = obj.errorMsg;            
            if(!error.innerHTML){
                var row = icon.parentNode.parentNode;
                var index = row.rowIndex;
                var table = row.parentNode;
                table.deleteRow(index);
                error.innerHTML = "Task successfully deleted";
            }
        };
        
        return error;
    };
   
}());

