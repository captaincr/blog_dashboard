'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import JoditEditor from 'jodit-react';
import { useRef } from 'react';

const page = () => {
  const editor = useRef(null);
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container px-2 md:mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Create A Blog</h1>
        <div className="border px-3 pb-3 rounded-lg bg-white">
          <div className="my-3 md:my-5">
            <Label htmlFor="title">
              Title <span>*</span>
            </Label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Please Enter Blog Title"
              required
            />
          </div>

          <div className="my-3 md:my-5">
            <Label>
              Blog Content <span>*</span>
            </Label>
            <JoditEditor ref={editor} tabIndex={1} />
          </div>

          <div className="my-3 md:my-5">
            <Label htmlFor="blog-image">Upload Image</Label>
            <Input
              type="file"
              id="blog-image"
              name="blog-image"
              placeholder="Please Enter Blog Title"
              required
            />
          </div>

          <div className="my-3 md:my-5">
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
          </div>

          <div className="flex gap-3">
            <Button variant="outline">Save As Draft</Button>
            <Button>Publish Blog</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
