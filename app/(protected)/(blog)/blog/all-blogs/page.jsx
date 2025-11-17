'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import axios from '@/lib/axiosInstance';
import Link from 'next/link';
import toast from 'react-hot-toast';
const Page = () => {
  const [blogs, setBlogs] = useState([]);

  async function getBlogs() {
    try {
      const res = await axios.get(`/get-all-blogs?isDeleted=false`);

      setBlogs(res.data.data.blogs);
    } catch (err) {
      console.log(err);
    }
  }

  const deleteHandler = async (id) => {
    try {
      await axios.patch(`/${id}`, { isDeleted: true, isPublished: false });
      getBlogs();
      toast.success('Blog Deleted');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">All Blogs</h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S.No</TableHead>
                  <TableHead className="w-[400px]">Blog Title</TableHead>
                  <TableHead className="w-[400px]">Blog Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map((blog, index) => (
                  <TableRow key={blog._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>{blog.author.fullName}</TableCell>
                    <TableCell>
                      {blog.isPublished ? 'Active' : 'Not Active'}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="link" className="text-blue-500">
                        <Link href={`/blog/${blog._id}`}>Edit</Link>
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => deleteHandler(blog._id)}
                        className="text-red-500"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
