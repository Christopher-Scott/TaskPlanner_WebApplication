
package model.task;

import dbUtils.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
public class DbMods {
    
    public static StringData findById(DbConn dbc, String id) {

        // The find API needs to represent three cases: found web_user, not found, db error. 
        StringData sd = new StringData();
        try {
            String sql = "SELECT task_id, task_title, task_desc, web_user.user_email, task.image, "
                    + "due_date, task_weight, task.web_user_id, web_user.user_role_id, unique_title_id "
                    + "FROM task, web_user WHERE task.web_user_id = web_user.web_user_id "
                    + "AND task_id = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set

                // plainInteger returns integer converted to string with no commas.
                sd.taskId = FormatUtils.plainInteger(results.getObject("task_id"));
                sd.taskTitle = FormatUtils.formatString(results.getObject("task_title"));
                sd.taskDesc = FormatUtils.formatString(results.getObject("task_desc"));
                sd.userEmail = FormatUtils.formatString(results.getObject("user_email"));                
                sd.image = FormatUtils.formatString(results.getObject("image"));
                sd.dueDate = FormatUtils.formatDate(results.getObject("due_date"));                
                sd.taskWeight = FormatUtils.plainInteger(results.getObject("task_weight"));
                sd.webUserId = FormatUtils.plainInteger(results.getObject("web_user_id"));
                sd.userRoleId = FormatUtils.plainInteger(results.getObject("user_role_id"));
                sd.uniqueTitleId = FormatUtils.formatString(results.getObject("unique_title_id"));
                

            } else {
                sd.errorMsg = "Task Not Found.";
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in DbMods.findById(): " + e.getMessage();
        }
        return sd;

    } // findById
    
    private static StringData validate(StringData input){
        
//    public String taskId = "";
//    public String image = "";
//    public String userEmail = "";    
//    public String taskTitle = "";
//    public String taskDesc = "";
//    public String dueDate = "";
//    public String taskWeight = "";
//    public String webUserId  = "";
//    public String userRoleId = "";  
//    public String unigueTitleId = "";
        

        StringData errorMsgs = new StringData();
        
        errorMsgs.image = ValidationUtils.stringValidationMsg(input.image, 200, false);
        errorMsgs.taskTitle = ValidationUtils.stringValidationMsg(input.taskTitle, 45, true);            
        errorMsgs.taskDesc = ValidationUtils.stringValidationMsg(input.taskDesc, 255, false);            
        errorMsgs.dueDate = ValidationUtils.dateValidationMsg(input.dueDate, false);
        errorMsgs.taskWeight = ValidationUtils.integerValidationMsg(input.taskWeight, false);
        errorMsgs.webUserId = ValidationUtils.integerValidationMsg(input.webUserId, true);
        
        return errorMsgs;
    }
    
    public static StringData insert (StringData input, DbConn dbc){
        StringData errorMsgs;
        errorMsgs = validate(input);
        
        // check for any validation errors
        if(errorMsgs.getCharacterCount() > 0){
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;            
        }
        else{
            String sql = "INSERT INTO task (task_title, web_user_id, image, task_desc, due_date, task_weight, unique_title_id) "
                    + "values (?, ?, ?, ?, ?, ?, ?)";
            
            PrepStatement stmt = new PrepStatement(dbc, sql);
            
            stmt.setString(1, input.taskTitle);
            stmt.setInt(2, ValidationUtils.integerConversion(input.webUserId));
            stmt.setString(3, input.image);
            stmt.setString(4,input.taskDesc);
            stmt.setDate(5, ValidationUtils.dateConversion(input.dueDate));
            stmt.setInt(6, ValidationUtils.integerConversion(input.taskWeight));
            stmt.setString(7, input.taskTitle + "-" + input.webUserId);
        
        
        int numRows = stmt.executeUpdate();
        
        errorMsgs.errorMsg = stmt.getErrorMsg();
        if (errorMsgs.errorMsg.length() == 0) {
            if (numRows == 1) {
                errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
            } else {
                // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
            }
        } else if (errorMsgs.errorMsg.contains("foreign key")) {
            errorMsgs.errorMsg = "Invalid Web User Id (Foreign Key)";
        } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
            errorMsgs.errorMsg = "That task is already present";
        }
        
        }
        
        return errorMsgs;
    }
    
    public static StringData update(StringData inputData, DbConn dbc){
        
        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
//        System.out.println(errorMsgs);
        if (errorMsgs.getCharacterCount() > 0){
            errorMsgs.errorMsg = "Please try again";            
            return errorMsgs;
        }
        else{
            
            String sql = "UPDATE task SET task_title=?, task_desc = ?, image= ?, due_date = ?, "
                    + "task_weight = ?, web_user_id = ?, unique_title_id = ? where task_id = ?";
            
            PrepStatement stmt = new PrepStatement(dbc, sql);
            
            stmt.setString(1, inputData.taskTitle);
            stmt.setString(2, inputData.taskDesc);
            stmt.setString(3,inputData.image);
            stmt.setDate(4, ValidationUtils.dateConversion(inputData.dueDate));
            stmt.setInt(5, ValidationUtils.integerConversion(inputData.taskWeight));
            stmt.setInt(6, ValidationUtils.integerConversion(inputData.webUserId));
            stmt.setString(7, inputData.taskTitle + "-" + inputData.webUserId); // unique concatenation
            stmt.setInt(8, ValidationUtils.integerConversion(inputData.taskId));
            
            int numRows = stmt.executeUpdate();
            
            errorMsgs.errorMsg = stmt.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0){
                if(numRows == 1){
                    errorMsgs.errorMsg = "";
                }
                else{
                    errorMsgs.errorMsg = numRows + " records were updated (expected 1)";
                }            
            }
            else if(errorMsgs.errorMsg.contains("foreign key")){                
                errorMsgs.errorMsg = "Invalid Web User Id (foreign key)";
            }
            else if(errorMsgs.errorMsg.contains("Duplicate entry")){
                System.err.println("Attempted to update with duplicate entry:");                
                errorMsgs.errorMsg = "That task is already present";
            }
        }
        return errorMsgs;
    }
    
    public static String delete(String id, DbConn dbc){
        String errorMsg = "";
        
        if(id == null){
            return "Error in model.task.DbMods.delete: cannot delete task because id is null";
        }
                
        String sql = "DELETE FROM task WHERE task_id = ?";
            
        PrepStatement stmt = new PrepStatement(dbc, sql);
            
        stmt.setString(1, id);
            
        int numRows = stmt.executeUpdate();
        errorMsg = stmt.getErrorMsg();
        
        if(errorMsg.length() == 0){
            if(numRows == 0){
                errorMsg = "Record not deleted - no task with id " + id;
            }
            else if (numRows > 1){  // this only happens if if the sql statement is incorrect
                errorMsg = "Too many records deleted";
            }            
        }        
        
        return errorMsg; 
    }
}
