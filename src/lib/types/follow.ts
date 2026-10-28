// POST /follows aar DELETE /follows/:id er `data` (follows table er raw row)
export interface FollowRecord {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

// GET /follows, /follows/followers, /follows/:userId/followers|following er
// `data` er protita item (user table er sathe join kora)
export interface FollowUser {
  id: string; // ei user er ID (follower ba following, endpoint er upor depend kore)
  name: string;
  image: string | null;
  followedAt: string;
}

export interface CreateFollowData {
  followingId: string;
}