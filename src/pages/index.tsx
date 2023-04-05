import styles from "@/styles/Home.module.css";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useUser } from "@auth0/nextjs-auth0/client";
import Pagination from "./Pagination";
import { useRouter } from "next/router";





interface Post {
  id: number;
  title: string;
  content: string;
  body: string;
  comments: Comment[];
}

interface HomePageProps {
  blogPosts: Post[];
  page: number | any;
  totalPages: number;
}

const Home: NextPage<HomePageProps> = ({ blogPosts, page, totalPages }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useUser();
  const router = useRouter();
  const { title, content } = router.query;

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  if (!user) {
    return (
      <div className="login-screen">
        <p>
          <Link href="api/auth/login" className="login-link">
            Login to use Blog Application
          </Link>
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <div>
          <div className="search-input">
            <h1 className="heading">Blog Posts</h1>
            <input
              type="text"
              value={searchQuery}
              className="input"
              onChange={handleSearchQueryChange}
              placeholder="Search blog posts by title..."
            />
          </div>

          <div className="postList">
            {filteredPosts.map((post) => (
              <div className="postCard" key={post.id}>
                <Link
                  href={{
                    pathname: "/post[id]",
                    query: { id: post.id.toString() },
                  }}
                >
                  <h3>Title:</h3>
                  <h4>{post.title}</h4>
                  <h3>Content:</h3>
                  <p>{post.body}</p>
                </Link>
              </div>
            ))}
          </div>
          <div>
            <h1> Add New Post</h1>
            <p>Title: {title}</p>
            <p>Content: {content}</p>
          </div>
          <Pagination page={page} totalPages={totalPages} />
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({
  query,
}) => {
  const page = query?.page ?? 1;
  const postsPerPage = 10;
  const startIndex = ((page as number) - 1) * (postsPerPage as number);
  const endIndex = (page as number) * (postsPerPage as number);

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?page=${page}`
  );

  const data = await res.json();
  console.log(data, "data");

  const blogPosts = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / postsPerPage);

  return {
    props: { blogPosts, page, totalPages },
  };
};

export default Home;
