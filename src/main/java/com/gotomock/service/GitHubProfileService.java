package com.gotomock.service;

import com.gotomock.github.GitHubRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class GitHubProfileService {
    public List<GitHubRepository> fetchProfile(String githubUrl) {
        String username = extractUsername(githubUrl);

        return Collections.emptyList();
    }

    public String extractUsername(String githubUrl) {
        if (githubUrl == null || githubUrl.isBlank()) {
            return null;
        }

        githubUrl = githubUrl.trim();

        if (githubUrl.endsWith("/")) {
            githubUrl = githubUrl.substring(0, githubUrl.length() - 1);
        }

        return githubUrl.substring(githubUrl.lastIndexOf("/") + 1);
    }
}
