import type { GitHubUserResponse, GitHubUserRaw } from '../types/github.type.js';
import { flattenContributionDays, groupByWeek, groupByMonth } from '../utils/date.utils.js';

const GITHUB_API_URL = 'https://api.github.com/graphql';

export const getGitHubUser = async (username: string) => {
  const query = `
    query {
      user(login: "${username}") {
        name
        login
        avatarUrl
        followers {
          totalCount
        }
        following {
          totalCount
        }
        repositories(privacy: PUBLIC) {
          totalCount
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch GitHub API');
  }

  const result: GitHubUserResponse = await response.json();

  if (result.errors?.length) {
    const message = result.errors[0]?.message ?? 'Unknown error';
    throw new Error(message);
  }

  if (!result.data?.user) {
    throw new Error('User not found');
  }

  const user: GitHubUserRaw = result.data.user;

  const totalContributions = user.contributionsCollection.contributionCalendar.totalContributions;
  const weeks = user.contributionsCollection.contributionCalendar.weeks;

  const daily = flattenContributionDays(weeks);
  const weekly = groupByWeek(daily);
  const monthly = groupByMonth(daily);

  return {
    username: user.login,
    name: user.name,
    avatar: user.avatarUrl,
    stats: {
      followers: user.followers.totalCount,
      following: user.following.totalCount,
      repositories: user.repositories.totalCount,
      contributionsLastYear: totalContributions,
    },
    contributions: {
      daily,
      weekly,
      monthly,
    },
  };
};
