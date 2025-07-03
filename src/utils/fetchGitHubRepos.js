export const fetchGitHubRepos = async () => {
  const response = await fetch(
    "https://api.github.com/users/Sharma0813/repos?sort=updated&per_page=100"
  );
  if (!response.ok) throw new Error("GitHub API error");
  return await response.json();
};
