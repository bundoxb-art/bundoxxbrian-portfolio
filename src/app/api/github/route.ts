import { NextResponse } from "next/server";

interface Repo {
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  name: string;
  description: string | null;
  html_url: string;
  updated_at: string;
}

export const revalidate = 3600; // cache 1 hour

export async function GET() {
  try {
    const username = "bundoxb-art";

    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "BundoxxBrian-Portfolio",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

    const repos: Repo[] = await res.json();
    const ownRepos = repos.filter((r) => !r.fork);

    // Total stars
    const totalStars = ownRepos.reduce(
      (sum, r) => sum + r.stargazers_count,
      0
    );

    // Language frequency
    const langMap: Record<string, number> = {};
    ownRepos.forEach((r) => {
      if (r.language) {
        langMap[r.language] = (langMap[r.language] || 0) + 1;
      }
    });

    const languages = Object.entries(langMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));

    // Latest 3 repos
    const latestRepos = ownRepos.slice(0, 3).map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      stars: r.stargazers_count,
      language: r.language,
      updated_at: r.updated_at,
    }));

    return NextResponse.json({
      totalRepos: ownRepos.length,
      totalStars,
      languages,
      latestRepos,
    });
  } catch (err) {
    console.error("GitHub stats error:", err);
    return NextResponse.json(
      { error: "Failed to fetch GitHub stats" },
      { status: 500 }
    );
  }
}