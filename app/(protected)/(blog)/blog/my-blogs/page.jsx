'use client';

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
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Page = () => {
  const [blogs, setBlogs] = useState([]);

  async function getBlogs() {
    try {
      const res = await axios.get(`/get-my-blogs?isDeleted=false`);

      setBlogs(res.data.data.blogs);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Active Blogs</h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S.No</TableHead>
                  <TableHead className="w-[400px]">Blog Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map((blog, index) => (
                  <TableRow key={blog._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>
                      {blog.isPublished ? 'Approved' : 'Not Approved'}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="link" className="text-blue-500">
                        <Link href={`/blog/${blog._id}`}>Edit</Link>
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
