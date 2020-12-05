<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%>

<%@page language="java" import="dbUtils.DbConn" %>
<%@page language="java" import="model.task.*" %>
<%@page language="java" import="model.webUser.StringData" %>
<%@page language="java" import="com.google.gson.*"%>

<%
        
    Gson gson = new Gson();
        
    model.task.StringData errorMsgs = new model.task.StringData();
    model.webUser.StringData loggedOnUser = null;    
    
    // Only allow a logged on user to delete tasks associated with their account
    if(session.getAttribute("loggedOnUser") != null){
        loggedOnUser = (model.webUser.StringData)session.getAttribute("loggedOnUser");
        String taskId = request.getParameter("taskId");
        String webUserId = request.getParameter("webUserId");        
        if(taskId != null && webUserId != null){
            if(webUserId.equals(loggedOnUser.webUserId)){
                DbConn dbc = new DbConn();
                errorMsgs.errorMsg = dbc.getErr();
                if(errorMsgs.errorMsg.length() == 0){
                    errorMsgs.errorMsg = DbMods.delete(taskId, dbc);
                }
                else{
                    errorMsgs.errorMsg = "Database Unavailable - Please try again later or contact an administrator."
                        + " Error Message - " + errorMsgs.errorMsg;
                }
                dbc.close();
            }
            else{
                errorMsgs.errorMsg = "Cannot delete - Unauthorized user for this record";
            }
        }       
        else{
            errorMsgs.errorMsg = "Cannot delete - need taskId and webUserId as URL parameter";            
        }
    }
    else{
        errorMsgs.errorMsg = "No User Logged On";
    }

    out.print(gson.toJson(errorMsgs).trim());
%>
