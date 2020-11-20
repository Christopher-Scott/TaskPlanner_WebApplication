<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%>

<%@page language="java" import="dbUtils.DbConn" %>
<%@page language="java" import="model.task.*" %>
<%@page language="java" import="model.webUser.StringData" %>
<%@page language="java" import="com.google.gson.*" %>

<%
  
    Gson gson = new Gson();    
    
    // It is necessary to use verbose naming of StringData due to the two different classes
    model.task.StringData errorMsgs = new model.task.StringData();
    
    model.webUser.StringData loggedOnUser = null;
    // must check if session attrbute is null before trying to cast it
    if(session.getAttribute("loggedOnUser") != null){
        loggedOnUser = (model.webUser.StringData)session.getAttribute("loggedOnUser");
        String jsonUpdateData = request.getParameter("jsonData");
        if(jsonUpdateData != null){
            model.task.StringData updateData = gson.fromJson(jsonUpdateData, model.task.StringData.class);
            System.out.println("jsonUpdateData is " + jsonUpdateData);
            
            // confirm that the record to be modified belongs to the logged on user
            if(updateData.webUserId.equals(loggedOnUser.webUserId)){ 
                DbConn dbc = new DbConn();
                errorMsgs.errorMsg = dbc.getErr();
                if (errorMsgs.errorMsg.length()== 0) {
                    System.out.println("updateUserAPI.jsp - ready to update");
                    errorMsgs = DbMods.update(updateData, dbc);
                }
                dbc.close();
            }
            else{
                System.out.println(updateData);
                System.out.println(loggedOnUser);
                errorMsgs.errorMsg = "Cannot update -- Unauthorized user for this record";
                System.out.println(errorMsgs.errorMsg);
            }
            
        }        
        else{
            errorMsgs.errorMsg = "Cannot update -- need 'jsonData as URL parameter";
            System.out.println(errorMsgs.errorMsg);
        }
    }
    else{
        errorMsgs.errorMsg = "No User Logged On";
    }
    
    out.print(gson.toJson(errorMsgs).trim());    

%>