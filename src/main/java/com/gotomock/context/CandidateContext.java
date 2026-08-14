package com.gotomock.context;

public class CandidateContext {
    private String githubSummary;
    private String resumeSummary;
    private String combinedContext;

    public CandidateContext() {

    }

    public String getGithubSummary() {
        return githubSummary;
    }

    public void setGithubSummary(String githubSummary) {
        this.githubSummary = githubSummary;
    }

    public String getResumeSummary() {
        return resumeSummary;
    }

    public void setResumeSummary(String resumeSummary) {
        this.resumeSummary = resumeSummary;
    }

    public String getCombinedContext() {
        return combinedContext;
    }

    public void setCombinedContext(String combinedContext) {
        this.combinedContext = combinedContext;
    }
}
