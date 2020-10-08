package model.task;

import dbUtils.FormatUtils;
import java.sql.ResultSet;


/* The purpose of this class is just to "bundle together" all the 
 * character data that the user might type in when they want to 
 * add a new Customer or edit an existing customer.  This String
 * data is "pre-validated" data, meaning they might have typed 
 * in a character string where a number was expected.
 * 
 * There are no getter or setter methods since we are not trying to
 * protect this data in any way.  We want to let the JSP page have
 * free access to put data in or take it out. */
public class StringData { 

    public String taskId = "";
    public String image = "";
    public String userEmail = "";    
    public String taskTitle = "";
    public String taskDesc = "";
    public String dueDate = "";
    public String taskWeight = "";
    public String webUserId  = "";
    public String userRoleId = "";                     
    

    public String errorMsg = "";

    // default constructor leaves all data members with empty string (Nothing null).
    public StringData() {
    }

    // overloaded constructor sets all data members by extracting from resultSet.
    public StringData(ResultSet results) {
        try {
            // plainInteger returns integer converted to string with no commas.
            this.taskId = FormatUtils.plainInteger(results.getObject("task_id"));
            this.image = FormatUtils.formatString(results.getObject("image"));
            this.userEmail = FormatUtils.formatString(results.getObject("user_email"));                        
            this.taskTitle = FormatUtils.formatString(results.getObject("task_title"));
            this.taskDesc = FormatUtils.formatString(results.getObject("task_desc"));
            this.dueDate = FormatUtils.formatDate(results.getObject("due_date"));
            this.taskWeight = FormatUtils.plainInteger(results.getObject("task_weight"));
            this.webUserId = FormatUtils.plainInteger(results.getObject("web_user_id"));
            this.userRoleId = FormatUtils.plainInteger(results.getObject("user_role_id"));
        } catch (Exception e) {
            this.errorMsg = "Exception thrown in model.task.StringData (the constructor that takes a ResultSet): " + e.getMessage();
        }
    }

    public int getCharacterCount() {
        String s = this.taskId + this.taskTitle;
        return s.length();
    }

    public String toString() {
        return "Web User Id:" + this.taskId
                + ", User Email: " + this.taskTitle;
    }
}
