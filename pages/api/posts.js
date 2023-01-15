import { getSortedPostsData } from '../../lib/posts'

export default function handler(req, res) {
  const allPostData = getSortedPostsData()
  res.status(200).json({ allPostData })
}
