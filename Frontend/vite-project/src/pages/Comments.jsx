import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Eye } from 'lucide-react'

const Comments = () => {
  const [allComments, setAllComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const getTotalComments = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/comment/my-blogs/comments`, {
        withCredentials: true,
      })
      if (res.data.success) {
        setAllComments(res.data.comments)
      } else {
        setError('Failed to fetch comments')
      }
    } catch (err) {
      console.error('Error fetching comments:', err)
      setError('Something went wrong while fetching comments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTotalComments()
  }, [])

  return (
    <div className="pb-10 pt-20 md:ml-[320px] h-screen">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="w-full p-5 space-y-2 dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4">All Comments</h2>

          {loading ? (
            <p>Loading comments...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : allComments.length === 0 ? (
            <p>No comments found.</p>
          ) : (
            <Table>
              <TableCaption>A list of your recent comments.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Blog Title</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allComments.map((comment, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {comment?.postId?.title || <em>Unknown Blog</em>}
                    </TableCell>
                    <TableCell>{comment?.content}</TableCell>
                    <TableCell>
                      {comment?.userId
                        ? `${comment.userId.firstName} ${comment.userId.lastName}`
                        : 'Unknown User'}
                    </TableCell>
                    <TableCell className="text-center">
                      <Eye
                        className="cursor-pointer"
                        onClick={() =>
                          comment?.postId?._id && navigate(`/blogs/${comment.postId._id}`)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
    </div>
  )
}

export default Comments
