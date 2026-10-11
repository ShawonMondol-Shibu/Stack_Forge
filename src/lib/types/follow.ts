export interface FollowRecord {
  followerId: string;
  followingId: string;
  createdAt: string;
}

export interface CreateFollowData {
  followingId: string;
}
