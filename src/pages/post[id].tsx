import { GetServerSideProps } from "next";
import { useState } from "react";
import styles from "@/styles/PostPage.module.css";
import Navbar from "@/components/Navbar";

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

interface PostPageProps {
  post: { id: number; name: string; email: string; body: string };
  comments: Comment[];
}

const PostPage = ({ post, comments }: PostPageProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [commentList, setCommentList] = useState(comments);

  console.log(comments, "comment");
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`,
      {
        method: "POST",
        body: JSON.stringify({ name, email, body: comment }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const data = await res.json();

    setCommentList([...commentList, data]);
    setComment("");
    setName("");
    setEmail("");
    setSubmitting(false);
  };
  console.log(commentList, "comment list");
  return (
    <>
      <Navbar />
      <div>
        <div>
          <h1 className="heading">Blog Post details</h1>
          <div className="postList">
            {commentList.map((comment) => (
              <div className="postCard" key={comment.id}>
                <h3>Name</h3>
                <p> {comment.name}</p>
                <h3>Email</h3>
                <p>Email: {comment.email}</p>
                <h3>Comments</h3>
                <p>Comment: {comment.body}</p>
              </div>
            ))}
          </div>

          <div className="form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  required
                  minLength={2}
                  maxLength={50}
                />
                <div style={{ color: "red" }}>
                  {name.length > 50 && "Name must be less than 50 characters"}
                </div>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                />
                <div style={{ color: "red" }}>
                  {email.length > 0 &&
                    !email.match("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$") &&
                    "Invalid email"}
                </div>
              </div>
              <div>
                <label htmlFor="comment">Comment</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={handleCommentChange}
                  required
                  minLength={10}
                  maxLength={500}
                />
                <div style={{ color: "red" }}>
                  {comment.length > 500 &&
                    "Comment must be less than 500 characters"}
                </div>
              </div>
              <div>
                <button type="submit" disabled={submitting}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PostPageProps> = async ({
  query,
}) => {
  const postId = query?.id as string;

  const [postRes, commentsRes] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`),
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`),
  ]);
  const [postData, commentsData] = await Promise.all([
    postRes.json(),
    commentsRes.json(),
  ]);

  return {
    props: {
      post: postData,
      comments: commentsData,
    },
  };
};
export default PostPage;
