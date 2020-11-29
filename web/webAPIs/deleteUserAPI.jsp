<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%>

<%@page language="java" import="dbUtils.DbConn" %>
<%@page language="java" import="model.webUser.*" %>
<%@page language="java" import="com.google.gson.*"%>

<%
        
    Gson gson = new Gson();
        
    StringData errorMsgs = new StringData();
    String webUserId = request.getParameter("webUserId");
    if(webUserId == null){
        errorMsgs.errorMsg = "Cannot delete - need webUserId as URL parameter";
    }
    else{    
        DbConn dbc = new DbConn();
        errorMsgs.errorMsg = dbc.getErr();
        if(errorMsgs.errorMsg.length() == 0){
            errorMsgs.errorMsg = DbMods.delete(webUserId, dbc);
        }
        dbc.close();
    }

    out.print(gson.toJson(errorMsgs).trim());
%>
