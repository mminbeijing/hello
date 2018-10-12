package shirotest;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

public class CustomRealm extends AuthorizingRealm{

	@Override
	   public void setName(String name) {
           super.setName("customRealm");
       }
	
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		 // token是用户输入的
        // 第一步从token中取出身份信息
        String userCode = (String) token.getPrincipal();

        System.out.println("usercode = " + userCode);
        // 第二步：根据用户输入的userCode从数据库查询
        // ....

        // 如果查询不到返回null
        // 数据库中用户账号是zhangsansan
        /*
         * if(!userCode.equals("zhangsansan")){// return null; }
         */

        // 模拟从数据库查询到密码
        String password = "123";

        // 如果查询到返回认证信息AuthenticationInfo

        SimpleAuthenticationInfo simpleAuthenticationInfo = new SimpleAuthenticationInfo(userCode, password, this.getName());

        return simpleAuthenticationInfo;
	}

}
