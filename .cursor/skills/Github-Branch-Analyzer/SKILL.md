---
name: github_branch_analyzer
description: Analyzes updated GitHub branches, compares them with the main branch, and provides a summary of changes and differences.
---

# GitHub Branch Analyzer Skill

This skill automates branch monitoring and provides a clear understanding of code differences within a repository.

### Workflow:
1. **Fetch Branches**: Use the `list_branches` tool for the specified repository to identify active branches.
2. **Identify Updates**: Find branches with recent commits by analyzing the `get_branch` metadata.
3. **Analyze Differences (Diff)**: 
   - Use the `compare_commits` tool to compare the target branch with the `main` (or `master`) branch.
4. **Summary & Insights**: 
   - Summarize the changes by listing modified files.
   - Explain the core logic updates (e.g., UI components, state management, or configuration changes).
   - Check for potential merge conflicts if the branch is significantly behind `main`.

### Example: "Compare branch-x with main and summarize."