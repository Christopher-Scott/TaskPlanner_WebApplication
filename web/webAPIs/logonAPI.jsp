<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page language="java" import="dbUtils.*"%>
<%@page language="java" import="model.webUser.*"%>
<%@page language="java" import="view.WebUserView"%>
<%@page language="java" import="com.google.gson.*"%>

<%
    Gson gson = new Gson();
    StringData userData = new StringData();
    String userEmail = request.getParameter("email");
    String password = request.getParameter("password");
    if (userEmail == null || password == null){
        userData.errorMsg = "Cannot search for user - 'email' and 'password' must be supplied";
        out.print(gson.toJson(userData).trim());
    }
    else{        
        DbConn dbc = new DbConn();
        userData.errorMsg = dbc.getErr();
        // This if block prevents attempting to use findUser when the DB is unavailable - outputs the right error msg
        if(userData.errorMsg.length() != 0){
            userData.errorMsg = "Database Unavailable - Try again later or contact administration - "
                    + userData.errorMsg;
            out.print(gson.toJson(userData).trim());
        }
        else{
            System.out.println("'" + password + "'");
            userData = DbMods.findUser(dbc, userEmail, password);
            if(userData.errorMsg.length() == 0){                        
                session.setAttribute("loggedOnUser", userData);                
            }
            out.print(gson.toJson(userData).trim());
        }
        dbc.close();
    }
    
    

%>