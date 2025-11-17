'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';
import axios from '@/lib/axiosInstance';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const Page = () => {
  const router = useRouter();
  const editor = useRef(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [blogImage, setBlogImage] = useState('');

  const handleBlogSubmission = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('blogImage', blogImage);

      await axios.post(`/post-blog`, formData);

      toast.success('Blog sent to admin for approval');
      setTimeout(() => {
        router.push('/blog/my-blogs');
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container px-2 md:mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Create A Blog</h1>
        <form
          className="border px-3 pb-3 rounded-lg bg-white"
          onSubmit={handleBlogSubmission}
          method="post"
        >
          <div className="my-3 md:my-5">
            <Label htmlFor="title">
              Title <span>*</span>
            </Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Please Enter Blog Title"
              required
            />
          </div>

          <div className="my-3 md:my-5">
            <Label htmlFor="content">
              Blog Content <span>*</span>
            </Label>
            <JoditEditor
              ref={editor}
              tabIndex={1}
              value={content}
              onBlur={(e) => setContent(e)}
            />
          </div>

          <div className="my-3 md:my-5">
            <Label htmlFor="blog-image">Upload Image</Label>
            <Input
              type="file"
              id="blog-image"
              name="blog-image"
              onChange={(e) => setBlogImage(e.target.files[0])}
              placeholder="Please Enter Blog Title"
              required
            />
          </div>

          {/* <div className="my-3 md:my-5">
            <Label htmlFor="meta-title">
              Meta Title <span>*</span>
            </Label>
            <Input
              type="text"
              id="meta-title"
              name="meta-title"
              placeholder="Please Enter Meta Title"
              required
            />
          </div>

          <div className="my-3 md:my-5">
            <Label htmlFor="meta-description">
              Meta Description <span>*</span>
            </Label>
            <Input
              type="text"
              id="meta-description"
              name="meta-description"
              placeholder="Please Enter Meta Description"
              required
            />
          </div>

          <div className="my-3 md:my-5">
            <Label htmlFor="meta-description">
              Meta Keywords <span>*</span>
            </Label>
            <Input
              type="text"
              id="meta-description"
              name="meta-description"
              placeholder="Please Enter Meta Description"
              required
            />
          </div> */}

          <div className="flex gap-3">
            <Button>Publish Blog</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
