package com.practice.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HelloController {

    @GetMapping("/")
    public Map<String, String> home() {
        return Map.of(
                "message", "Spring Boot practice app is running",
                "hint", "Try GET /hello?name=YourName"
        );
    }

    @GetMapping("/hello")
    public Map<String, String> hello(@RequestParam(defaultValue = "World") String name) {
        return Map.of("greeting", "Hello, " + name + "!");
    }
}
