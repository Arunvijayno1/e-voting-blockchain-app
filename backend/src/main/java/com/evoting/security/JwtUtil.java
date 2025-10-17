package com.evoting.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import com.evoting.model.User;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // NOTE: For production, move this secret to environment variables or config and keep it safe.
    private final String SECRET = "ChangeThisToASecureRandomLongSecretKeyWithAtLeast256Bits!";
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    // Token validity: 7 days
    private final long validityInMillis = 1000L * 60 * 60 * 24 * 7;

    public String generateToken(User user) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + validityInMillis);

        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role", user.getRole())
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String extractUsername(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    public String extractRole(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        Object r = claims.get("role");
        return r != null ? r.toString() : null;
    }
}
