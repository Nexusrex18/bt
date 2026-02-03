'use client';

import { useState } from 'react';

interface PullRequest {
  id: number;
  number: number;
  title: string;
  state: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  user: {
    login: string;
  };
}

export default function PRSearch() {
  const [author, setAuthor] = useState('');
  const [prs, setPrs] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!author.trim()) {
      setError('Please enter a GitHub username');
      return;
    }

    setLoading(true);
    setError('');
    setPrs([]);

    try {
      const response = await fetch(`/api/prs?author=${encodeURIComponent(author)}`);
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setPrs(data.prs || []);
      }
    } catch {
      setError('Failed to fetch PRs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">
          Search PRs from apache/dubbo-go
        </h1>
        
        <div className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter GitHub username"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-zinc-900 dark:border-zinc-700"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
            {error}
          </div>
        )}

        {prs.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
              Found {prs.length} PR{prs.length !== 1 ? 's' : ''}
            </h2>
            {prs.map((pr) => (
              <div
                key={pr.id}
                className="p-4 border border-gray-200 dark:border-zinc-700 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <a
                    href={pr.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-lg font-medium"
                  >
                    #{pr.number}: {pr.title}
                  </a>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    pr.state === 'open' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  }`}>
                    {pr.state}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Created: {new Date(pr.created_at).toLocaleDateString()} | Updated: {new Date(pr.updated_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && prs.length === 0 && !error && author && (
          <div className="text-center text-gray-600 dark:text-gray-400">
            No pull requests found for this user in apache/dubbo-go
          </div>
        )}
      </div>
    </div>
  );
}
