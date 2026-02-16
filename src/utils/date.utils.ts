import type { GitHubContributionDay } from '../types/github.type.js';

export const flattenContributionDays = (
  weeks: { contributionDays: GitHubContributionDay[] }[]
): GitHubContributionDay[] => {
  return weeks.flatMap((week) => week.contributionDays);
};

export const groupByWeek = (days: GitHubContributionDay[]) => {
  const weeklyMap = new Map<string, number>();

  for (const day of days) {
    const date = new Date(day.date);
    const year = date.getFullYear();

    const firstDayOfYear = new Date(year, 0, 1);
    const pastDays = Math.floor((date.getTime() - firstDayOfYear.getTime()) / 86400000);

    const weekNumber = Math.ceil((pastDays + firstDayOfYear.getDay() + 1) / 7);

    const key = `${year}-W${weekNumber}`;

    weeklyMap.set(key, (weeklyMap.get(key) || 0) + day.contributionCount);
  }

  return Array.from(weeklyMap.entries()).map(([week, total]) => ({
    week,
    total,
  }));
};

export const groupByMonth = (days: GitHubContributionDay[]) => {
  const monthlyMap = new Map<string, number>();

  for (const day of days) {
    const date = new Date(day.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    monthlyMap.set(key, (monthlyMap.get(key) || 0) + day.contributionCount);
  }

  return Array.from(monthlyMap.entries()).map(([month, total]) => ({
    month,
    total,
  }));
};
