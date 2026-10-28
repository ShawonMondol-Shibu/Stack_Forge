export interface FollowRecord {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

export interface CreateFollowData {
  followingId: string;
}
