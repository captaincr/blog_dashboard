import { AuthProvider } from "@/context/AuthContext";
import "./globals.css"
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <AuthProvider> */}
        <header>
          <nav className="container mx-auto flex justify-between items-center">
            <ul className="flex justify-center py-5 gap-5 font-bold">
              <li>
                <Link href="/blog/all-blogs">
                  All Blogs
                </Link>
              </li>
              <li><Link href="/blog/create-blog">
                Post a blog
              </Link></li>
            </ul>
            <Button variant="destructive">Logout</Button>
          </nav>
        </header>
        {children}
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
