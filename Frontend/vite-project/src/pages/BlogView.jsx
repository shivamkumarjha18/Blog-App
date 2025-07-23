import { Card } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setBlog } from '@/redux/blogSlice';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import CommentBox from '@/components/CommentBox';
const BlogView = () => {
    const { blogId } = useParams();
    const { blog } = useSelector(state => state.blog);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const selectedBlog = blog.find(blog => blog._id === blogId);

    useEffect(() => {
        const fetchBlogById = async () => {
            if (!selectedBlog) {
                try {
                    const res = await axios.get(`http://localhost:8000/api/v1/blog/${blogId}`, {
                        withCredentials: true
                    });

                    if (res.data.success) {
                        dispatch(setBlog([res.data.blog]));
                    } else {
                        toast.error("Blog not found!");
                    }
                } catch (err) {
                    console.error(err);
                    toast.error("Failed to fetch blog!");
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchBlogById();
    }, [blogId, dispatch, selectedBlog]);

    const deleteBlogHandler = async () => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/blog/delete-blog/${blogId}`, {
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/');
            } else {
                toast.error("Failed to delete blog");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!");
        }
    };

    if (loading) {
        return (
            <div className="pt-14 flex justify-center items-center h-screen">
                <p className="text-xl text-muted-foreground">Loading blog...</p>
            </div>
        );
    }

    if (!selectedBlog) {
        return (
            <div className="pt-14 flex justify-center items-center h-screen">
                <p className="text-xl text-muted-foreground">Blog not found!</p>
            </div>
        );
    }

    return (
        <div className="pt-16">
            <Card className="mx-auto max-w-3xl shadow-lg rounded-xl p-6">
                <img
                    src={selectedBlog?.thumbnail}
                    alt={selectedBlog?.title}
                    className="w-full rounded-lg mb-6"
                />
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold">{selectedBlog?.title}</h1>
                    <div className="space-x-2">
                        <Button variant="outline" size="icon" onClick={() => navigate(`/edit/${selectedBlog._id}`)}>
                            <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={deleteBlogHandler}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                    </div>
                </div>
                <p className="text-muted-foreground mb-4">{selectedBlog?.description}</p>
                <div className="text-sm text-muted-foreground mb-6">
                    By {selectedBlog?.author?.firstName} {selectedBlog?.author?.lastName}
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">#</TableHead>
                            <TableHead>Tags</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {selectedBlog?.tags?.map((tag, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{tag}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

             <CommentBox selectedBlog={selectedBlog} />
        </div>
    );
};

export default BlogView;
