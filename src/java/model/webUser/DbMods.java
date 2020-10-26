
package model.webUser;
import dbUtils.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DbMods {
    public static StringData findUser(DbConn dbc, String email, String password){
        StringData sd = new StringData();
        try{
            String sql;
            PreparedStatement stmt;
            
            // user_password is a nullable field in table web_user.  If password is null this
            // alternative select statement must be used to successfully match that user.
            if(password.length() == 0){
                sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, image, "
                    + "web_user.user_role_id, user_role_type "
                    + "FROM web_user, user_role WHERE web_user.user_role_id = user_role.user_role_id "
                    + "AND user_email = ? AND ISNULL(user_password)";
                
                stmt = dbc.getConn().prepareStatement(sql);
                
                stmt.setString(1, email); 
                
            }            
            else{
                sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, image, "
                    + "web_user.user_role_id, user_role_type "
                    + "FROM web_user, user_role WHERE web_user.user_role_id = user_role.user_role_id "
                    + "AND user_email = ? AND user_password = ?";
            
                stmt = dbc.getConn().prepareStatement(sql);

                stmt.setString(1, email);            
                stmt.setString(2, password);
            }
            
            ResultSet results = stmt.executeQuery();
            // since user_email is unique there is at most one result
            if(results.next()){
                
                sd.webUserId = FormatUtils.plainInteger(results.getObject("web_user_id"));
                sd.userEmail = FormatUtils.formatString(results.getObject("user_email"));
                sd.userPassword = FormatUtils.formatString(results.getObject("user_password"));
                sd.image = FormatUtils.formatString(results.getObject("image"));
                sd.birthday = FormatUtils.formatDate(results.getObject("birthday"));
                sd.membershipFee = FormatUtils.formatDollar(results.getObject("membership_fee"));
                sd.userRoleId = FormatUtils.plainInteger(results.getObject("web_user.user_role_id"));
                sd.userRoleType = FormatUtils.formatString(results.getObject("user_role_type"));
            }
            else{
                sd.errorMsg = "Web User Not Found";
            }
                
        }
        catch( Exception e){
            sd.errorMsg = "Exception thrown in DbMods.findUser(): " + e.getMessage();
        }
        
        return sd;
    }
}
