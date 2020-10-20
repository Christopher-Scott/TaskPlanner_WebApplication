var account = {};

(function () {
    account.logon = function(){
        var container = document.createElement("div");        
        
        var div = document.createElement("div");
        div.classList.add("logon");
        container.appendChild(div);
        
        var emailLabel = document.createElement("label");
        emailLabel.innerHTML = "Email:";
        div.appendChild(emailLabel);
        
        var emailInput = document.createElement("input");
        emailInput.id = "emailInput";
        emailInput.type = "text";
        div.appendChild(emailInput);
        
        emailLabel.for = "emailInput";                
        
        var passLabel = document.createElement("label");
        passLabel.innerHTML = "Password:";
        div.appendChild(passLabel);
        
        var passInput = document.createElement("input");
        passInput.id = "passwordInput";
        passInput.type = "password";
        div.appendChild(passInput);
        
        passLabel.for = "passwordInput";
        
        var logOnButton = document.createElement("button");
        logOnButton.innerHTML = "Log On";
        div.appendChild(logOnButton);
        
                                   
        var profile = document.createElement("div");
        profile.classList.add("profile");
        container.append(profile);
        
        var err = document.createElement("div");
        err.style.textAlign = "center";
        container.append(err); 
        
        logOnButton.onclick = function() {
            // client side validation that the user is trying to log on with text in the email input
            if(emailInput.value.length === 0){
                
                err.innerHTML = "Could not complete log on request - please try again";
                err.style.color = "#aa2222";                
                
            }
            else{
                var url = "webAPIs/logonAPI.jsp?email=" + encodeURIComponent(emailInput.value)
                    + "&password=" + encodeURIComponent(passInput.value);
            
//              console.log("Initiating ajax call to: " + url);
                ajax(url, function(obj) {                    
                    profile.innerHTML = buildProfile(obj);                   
                }
                    ,err);
                err.innerHTML = "";                                
            }
            
        };
        
        return container;

    };

    account.getProfile = function(){
        var url = "webAPIs/getProfileAPI.jsp";
        var div = document.createElement("div");
        div.classList.add("profile");
        
//        console.log("Initiating ajax call to build profile");
        ajax(url, function(obj) {div.innerHTML = buildProfile(obj);}, div);
        
        return div;
    };

    account.logoff = function(){
        var url = "webAPIs/logoffAPI.jsp";
        var div = document.createElement("div");
        div.classList.add("logoff");
        
//        console.log("Initiating ajax call to log off");
        ajax(url, function(obj) {div.innerHTML = obj.errorMsg;}, div);
        
        return div;
    };
            
    function buildProfile(obj){
        var profile = "";
        if(obj.errorMsg.length > 0){
            profile += "<strong>Error: " + obj.errorMsg + "</strong>";
        }
        else{
            if(obj.image.length > 0){
                profile += "<img src ='" + obj.image + "'>";
            }
            profile += "<p><strong>Welcome User " + obj.webUserId + "</strong>";           
            profile += "<br/> Birthday: " + obj.birthday;
            profile += "<br/> Membership Fee: " + obj.membershipFee;
            profile += "<br/> User Role: " + obj.userRoleId + " " + obj.userRoleType + "</p>";
            
        }
        return profile;
        
    }
    
}()); // IIFE


