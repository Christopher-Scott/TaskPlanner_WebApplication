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

    public int getCharacterCount() {
        String s = this.taskId + this.taskTitle;
        return s.length();
    }

    public String toString() {
        return "Web User Id:" + this.taskId
                + ", User Email: " + this.taskTitle;
    }
}
