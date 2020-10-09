package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.webUser.*;

// classes in my project
import dbUtils.*;

public class WebUserView {

    public static StringDataList getAllUsers(DbConn dbc) {

        //PreparedStatement stmt = null;
        //ResultSet results = null;
        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT web_user_id, user_email, user_password, image, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";  // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            // Add results from database query to the StringData data "bundle"
            while (results.next()) {
                StringData userData = new StringData();
                try {                                       
                    userData.webUserId = FormatUtils.plainInteger(results.getObject("web_user_id"));
                    userData.userEmail = FormatUtils.formatString(results.getObject("user_email"));
                    userData.userPassword = FormatUtils.formatString(results.getObject("user_password"));
                    userData.image = FormatUtils.formatString(results.getObject("image"));
                    userData.birthday = FormatUtils.formatDate(results.getObject("birthday"));
                    userData.membershipFee = FormatUtils.formatDollar(results.getObject("membership_fee"));
                    userData.userRoleId = FormatUtils.plainInteger(results.getObject("web_user.user_role_id"));
                    userData.userRoleType = FormatUtils.formatString(results.getObject("user_role_type"));
                    sdl.add(userData);
                } catch (Exception e) {
                    userData.errorMsg = "Exception thrown in WebUserView while adding user data: " + e.getMessage();
                }
                
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in WebUserView.allUsersAPI(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}