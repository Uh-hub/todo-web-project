package com.example.todo.config;



import com.example.todo.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import java.util.Map;
import java.util.HashMap;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableMethodSecurity
@EnableWebSecurity
public class WebSecurityConfig {

	private final ObjectMapper objectMapper;
	
    @Autowired
    public WebSecurityConfig(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }
	
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
   
    @Bean
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
    	 http.csrf(AbstractHttpConfigurer::disable);
         http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
         http.httpBasic(basic -> basic.disable());
         http.headers(headers -> headers.frameOptions(frame -> frame.disable()).disable());
         http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
         http.authorizeHttpRequests(auth -> {
             try {
                 auth
                         .requestMatchers(
                                 new AntPathRequestMatcher("/"),
                                 new AntPathRequestMatcher("/auth/**"),
                                 new AntPathRequestMatcher("/h2-console/**"))
                         .permitAll();
             } catch (Exception e) {
                 e.printStackTrace();
             }
         });

         http.exceptionHandling(except -> {
             except.authenticationEntryPoint((request, response, e) -> {
                 Map<String, Object> data = new HashMap<String, Object>();
                 data.put("status", HttpServletResponse.SC_FORBIDDEN);
                 data.put("message", e.getMessage());

                 response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                 response.setContentType(MediaType.APPLICATION_JSON_VALUE);

                 objectMapper.writeValue(response.getOutputStream(), data);
             });
         });

         http.addFilterBefore(jwtAuthenticationFilter,
                 UsernamePasswordAuthenticationFilter.class);
         http.addFilterBefore(jwtAuthenticationFilter,
                 UsernamePasswordAuthenticationFilter.class);
         http.addFilterAfter(jwtAuthenticationFilter, CorsFilter.class);

         http.authorizeHttpRequests(request -> request.anyRequest().authenticated());

         return http.build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final long MAX_AGE_SECS = 3600;
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("OPTIONS");
        config.setMaxAge(MAX_AGE_SECS);
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}