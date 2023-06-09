package com.rental.car.Config;

import com.rental.car.Services.Impl.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.security.KeyPair;
import java.security.PrivateKey;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    @Autowired
    private UserService userService;

    private static final String SECRET_KEY = "7336763979244226452948404D6351665468576D5A7134743777217A25432A462D4A614E645267556B586E3272357538782F413F4428472B4B6250655368566D";

    public String extractUsername(String token) {
        return extractClaim(token,Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims,T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(Map<String,Object> extraClaims, UserDetails user){
        Date today,tomorrow;
        today = new Date(System.currentTimeMillis());
        tomorrow = new Date(System.currentTimeMillis() + (1000 * 60 * 60 * 24));

        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(user.getUsername())     //the subject is the user info
                .setIssuedAt(today)
                .setExpiration(tomorrow)
                .signWith(getSignInKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    public String generateToken(UserDetails user){
        return generateToken(new HashMap<>(),user);
    }

    public boolean isTokenValid(String token, UserDetails user){
        final String username = extractUsername(token);
        return username.equals(user.getUsername()) &&
                !isTokenExpired(token);
    }

    public boolean isTokenValid(String token, Long userId){
        boolean valid = false;
        try{
            isTokenValid(token,userService.loadById(userId));
            valid = true;
        } catch(Exception ignored){}
        return valid;
    }

    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token){
        return extractClaim(token,Claims::getExpiration);
    }

    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

//  ensure the same client is sending the jwt token
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
