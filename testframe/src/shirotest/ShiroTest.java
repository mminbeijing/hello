package shirotest;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.config.IniSecurityManagerFactory;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.Factory;
import org.apache.shiro.mgt.SecurityManager;

public class ShiroTest {

	public static void main(String[] args) {
		
//		ShiroTest.testLoginAndLogout();
		ShiroTest.testCustomRealm();
//		ShiroTest.testCustomRealmMd5();
	}

	public static void testLoginAndLogout() {

		// 创建securityManager工厂，通过ini配置文件创建securityManager工厂
		Factory<SecurityManager> factory = new IniSecurityManagerFactory("classpath:shiro/shiro.ini");

		// 创建SecurityManager
		SecurityManager securityManager = factory.getInstance();

		// 将securityManager设置当前的运行环境中
		SecurityUtils.setSecurityManager(securityManager);

		// 从SecurityUtils里边创建一个subject
		Subject subject = SecurityUtils.getSubject();

		// 在认证提交前准备token（令牌）
		// 这里的账号和密码 将来是由用户输入进去
		UsernamePasswordToken token = new UsernamePasswordToken("root", "secret");

		try {
			// 执行认证提交
			subject.login(token);
		} catch (AuthenticationException e) {
			e.printStackTrace();
			System.out.println();
		}

		// 是否认证通过
		boolean isAuthenticated = subject.isAuthenticated();

		System.out.println("是否认证通过：" + isAuthenticated);
		subject.checkPermission("/a/s");
		// 退出操作
		subject.logout();

		// 是否认证通过
		isAuthenticated = subject.isAuthenticated();

		System.out.println("是否认证通过：" + isAuthenticated);

	}

	public static void testCustomRealm() {

		// 创建securityManager工厂，通过ini配置文件创建securityManager工厂
		Factory<SecurityManager> factory = new IniSecurityManagerFactory("classpath:shiro/realm.ini");

		// 创建SecurityManager
		SecurityManager securityManager = factory.getInstance();

		// 将securityManager设置当前的运行环境中
		SecurityUtils.setSecurityManager(securityManager);

		// 从SecurityUtils里边创建一个subject
		Subject subject = SecurityUtils.getSubject();

		// 在认证提交前准备token（令牌）
		// 这里的账号和密码 将来是由用户输入进去
		UsernamePasswordToken token = new UsernamePasswordToken("def", "1243");

		try {
			// 执行认证提交
			subject.login(token);
		} catch (AuthenticationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		// 是否认证通过
		boolean isAuthenticated = subject.isAuthenticated();

		System.out.println("是否认证通过：" + isAuthenticated);

	}
	
	  public static void testCustomRealmMd5() {

	        // 创建securityManager工厂，通过ini配置文件创建securityManager工厂
	        Factory<SecurityManager> factory = new IniSecurityManagerFactory(
	                "classpath:shiro/realm_md5.ini");

	        // 创建SecurityManager
	        SecurityManager securityManager = factory.getInstance();

	        // 将securityManager设置当前的运行环境中
	        SecurityUtils.setSecurityManager(securityManager);

	        // 从SecurityUtils里边创建一个subject
	        Subject subject = SecurityUtils.getSubject();

	        // 在认证提交前准备token（令牌）
	        // 这里的账号和密码 将来是由用户输入进去
	        UsernamePasswordToken token = new UsernamePasswordToken("zhangsan","111111");

	        try {
	            // 执行认证提交
	            subject.login(token);
	        } catch (AuthenticationException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	        }

	        // 是否认证通过
	        boolean isAuthenticated = subject.isAuthenticated();

	        System.out.println("是否认证通过：" + isAuthenticated);

	    }

}
