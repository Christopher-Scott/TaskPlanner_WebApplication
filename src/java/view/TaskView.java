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
            while (results.next()) {
                sdl.add(results);
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
