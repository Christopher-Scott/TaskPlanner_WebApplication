<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page language="java" import="model.webUser.*" %>
<%@page language="java" import="com.google.gson.*" %>

<%
  StringData loggedOnUser = (StringData)session.getAttribute("loggedOnUser");
  if(loggedOnUser == null){
      loggedOnUser = new StringData();
      loggedOnUser.errorMsg = "No user logged on";
  }
  Gson gson = new Gson();
  out.print(gson.toJson(loggedOnUser).trim());
%>