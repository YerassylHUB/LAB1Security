package com.company;
import  javax.crypto.Cipher;
import  javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import static java.util.Base64.getDecoder;

public class Main {
    private static final String key = "123";


    public static String encrypt(String password){
        try{
            byte[] keyData = (key).getBytes();
            SecretKeySpec secretKeySpec = new SecretKeySpec(keyData,"Blowfish");
            Cipher cipher = Cipher.getInstance("Blowfish");
            cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec);
            byte[] hasil = cipher.doFinal(password.getBytes());
            return new String(Base64.getEncoder().encode(hasil));
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public static String decrypt(String string){
        try{
            byte[] keyData = (key).getBytes();
            SecretKeySpec secretKeySpec = new SecretKeySpec(keyData,"Blowfish");
            Cipher cipher = Cipher.getInstance("Blowfish");
            cipher.init(Cipher.DECRYPT_MODE, secretKeySpec);
            byte[] hasil = cipher.doFinal(getDecoder().decode(string));
            return new String(hasil);
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public static void main(String args[]) {
        System.out.println("Encrypted: "+ encrypt("Zhanarystan"));
        System.out.println("Decrypted: "+ decrypt(encrypt("Zhanarystan")));
    }
}
