/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package view;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.task.StringDataList;
import model.task.StringData;


import dbUtils.*;

public class TaskView {
    
    public static StringDataList getAllTasks(DbConn dbc) {

        //PreparedStatement stmt = null;
        //ResultSet results = null;
        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT task_id, task.image, web_user.user_email, " +
                    "task_title, task_desc, due_date, task_weight, "
                    + "task.web_user_id, web_user.user_role_id "
                    + "FROM task, web_user "
                    + "WHERE task.web_user_id = web_user.web_user_id "
                    + "ORDER BY task_id;"; 
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            // Add results from database query to the StringData data "bundle"
            while (results.next()) {
                StringData taskData = new StringData();
                try {            
                    taskData.taskId = FormatUtils.plainInteger(results.getObject("task_id"));
                    taskData.image = FormatUtils.formatString(results.getObject("image"));
                    taskData.userEmail = FormatUtils.formatString(results.getObject("user_email"));                        
                    taskData.taskTitle = FormatUtils.formatString(results.getObject("task_title"));
                    taskData.taskDesc = FormatUtils.formatString(results.getObject("task_desc"));
                    taskData.dueDate = FormatUtils.formatDate(results.getObject("due_date"));
                    taskData.taskWeight = FormatUtils.plainInteger(results.getObject("task_weight"));
                    taskData.webUserId = FormatUtils.plainInteger(results.getObject("web_user_id"));
                    taskData.userRoleId = FormatUtils.plainInteger(results.getObject("user_role_id"));
                } catch (Exception e) {
                    taskData.errorMsg = "Exception thrown in TaskView while adding task data: " + e.getMessage();
                }
                sdl.add(taskData);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in TaskView.getAllTasks(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
    
}
