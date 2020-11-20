

<%@page import="model.webUser.DbMods"%>
<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.task.*" %>
<%@page language="java" import="view.TaskView" %>
<%@page language="java" import="com.google.gson.*" %>

<%
    StringData sd = new StringData();
    String searchId = request.getParameter("taskId");
    if(searchId == null){
        sd.errorMsg = "Cannot search for task - 'taskId' must by supplied";        
    }
    else{
        DbConn dbc = new DbConn();
        sd.errorMsg = dbc.getErr();
        if (sd.errorMsg.length() == 0){
            System.out.println("*** Ready to call TasksAPI");
            sd = model.task.DbMods.findById(dbc, searchId);
        }
        dbc.close();
    }
    Gson gson = new Gson();
    out.print(gson.toJson(sd).trim());

%>