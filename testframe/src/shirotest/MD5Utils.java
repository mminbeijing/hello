package shirotest;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.crypto.hash.SimpleHash;

/**
 *     �����棬����������������У��
 */
public class MD5Utils {

	public static String encode(String str) throws NoSuchAlgorithmException, UnsupportedEncodingException {
		
		MessageDigest igest = MessageDigest.getInstance("MD5");
		
		byte[] byteArray = str.getBytes("utf-8");
		byte[] md5Bytes = igest.digest(byteArray);
		
		/**ת��Ϊ16�����ַ���**/
		StringBuffer hexValue = new StringBuffer();
		for (int i = 0; i < md5Bytes.length; i++) {
			int val = ((int) md5Bytes[i]) & 0xff;
			if (val < 16) {
				hexValue.append("0");
			}
			hexValue.append(Integer.toHexString(val));
		}
		return hexValue.toString();
	}
	
	public static void main(String[] args) throws NoSuchAlgorithmException, UnsupportedEncodingException {

	}

}
