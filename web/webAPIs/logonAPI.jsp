<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page language="java" import="dbUtils.*"%>
<%@page language="java" import="model.webUser.*"%>
<%@page language="java" import="view.WebUserView"%>
<%@page language="java" import="com.google.gson.*"%>

<%
    StringData userData = new StringData();
    String userEmail = request.getParameter("email");
    String password = request.getParameter("password");
    if (userEmail == null || password == null){
        userData.errorMsg = "Cannot search for user - 'email' and 'password' must be supplied";
    }
    else{
        DbConn dbc = new DbConn();
        userData.errorMsg = dbc.getErr();
        userData = DbMods.findUser(dbc, userEmail, password);
        if(userData.errorMsg.length() == 0){                        
            session.setAttribute("loggedOnUser", userData);
        }
        dbc.close();
    }
    Gson gson = new Gson();
    out.print(gson.toJson(userData).trim());

%>