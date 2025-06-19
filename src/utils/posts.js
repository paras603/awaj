export function getVoteScore(post) {
  return post.attributes.upvote - post.attributes.downvote;
}
