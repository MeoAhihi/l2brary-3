// Utility functions để invalidate queries
export const queryKeys = {
  // Authentication
  auth: {
    user: ["auth", "user"] as const,
    session: ["auth", "session"] as const,
    login: ["auth", "login"] as const,
  },

  // IAM (Identity & Access Management)
  iam: {
    users: ["iam", "users"] as const,
    roles: ["iam", "roles"] as const,
    permissions: ["iam", "permissions"] as const,
  },

  // Learning & Development
  ld: {
    courses: ["ld", "courses"] as const,
    sessions: ["ld", "sessions"] as const,
    enrollments: ["ld", "enrollments"] as const,
    activities: ["ld", "activities"] as const,
  },

  // Activity & Engagement
  ae: {
    activities: ["ae", "activity"] as const,
    activity: (activityId: number) => ["ae", "activity", activityId] as const,
    act_category: ["ae", "activity", "category"] as const,
    gamification: ["ae", "gamification"] as const,
  },

  // Analytics
  analytics: {
    growth: ["analytics", "growth"] as const,
    learning: ["analytics", "learning"] as const,
    engagement: ["analytics", "engagement"] as const,
  },

  // Members
  members: ["members"] as const,

  // Posts
  posts: ["posts"] as const,
} as const;
