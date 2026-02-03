import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const author = searchParams.get('author') || '';

  if (!author) {
    return NextResponse.json(
      { error: 'Author parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Fetch PRs from apache/dubbo-go using GitHub API
    const githubApiUrl = `https://api.github.com/search/issues?q=is:pr+repo:apache/dubbo-go+author:${encodeURIComponent(author)}&sort=updated&per_page=100`;
    
    const response = await fetch(githubApiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Next.js-PR-Search'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const data = await response.json();
    
    // Transform the data to a simpler format
    interface GitHubIssueItem {
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
    
    const prs = data.items.map((item: GitHubIssueItem) => ({
      id: item.id,
      number: item.number,
      title: item.title,
      state: item.state,
      created_at: item.created_at,
      updated_at: item.updated_at,
      html_url: item.html_url,
      user: {
        login: item.user.login
      }
    }));

    return NextResponse.json({
      owner: 'apache',
      repo: 'dubbo-go',
      author: author,
      total_count: data.total_count,
      prs: prs
    });
  } catch (error) {
    console.error('Error fetching PRs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch PRs from GitHub' },
      { status: 500 }
    );
  }
}
