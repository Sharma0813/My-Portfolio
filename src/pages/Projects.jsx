import React, { useEffect, useState } from "react";
import { fetchGitHubRepos } from "../utils/fetchGitHubRepos";
import { motion } from "framer-motion";

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubRepos()
      .then(setRepos)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="p-8 min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-800 dark:text-white">
        My GitHub Projects
      </h2>

      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg">Loading...</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
              No repositories found.
            </p>
          ) : (
            repos.map((repo) => (
              <motion.div
                key={repo.id}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {repo.name}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {repo.description || "No description provided."}
                </p>

                {repo.language && (
                  <span className="inline-block bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100 text-xs font-medium px-2 py-1 rounded-full mb-4">
                    {repo.language}
                  </span>
                )}

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  View on GitHub →
                </a>
              </motion.div>
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default Projects;
