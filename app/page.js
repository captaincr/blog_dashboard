import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center gap-10 justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Link href="/blog/my-blogs">
        <Button>My Blogs</Button>
      </Link>
      <Link href="/blog/create-blog">
        <Button>Post A Blog</Button>
      </Link>
    </div>
  );
}
