export interface GitHubContributionDay {
  date: string;
  contributionCount: number;
}

export interface GitHubUserRaw {
  name: string;
  login: string;
  avatarUrl: string;
  followers: { totalCount: number };
  following: { totalCount: number };
  repositories: { totalCount: number };
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number;
      weeks: {
        contributionDays: GitHubContributionDay[];
      }[];
    };
  };
}

export interface GitHubUserResponse {
  data?: {
    user: GitHubUserRaw;
  };
  errors?: { message: string }[];
}
