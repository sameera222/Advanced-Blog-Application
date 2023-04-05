import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }
    if (formData) {
      router.push({
        pathname: "/",
        query: { title, content },
      });
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setImage(file);
  };

  return (
    <>
      <Navbar />
      <div className="new-blog">
        <div className="blog-heading">Add a New Blog</div>

        <div style={{marginTop: 10}}>
          <form onSubmit={handleSubmit} className="form-post">
            <label htmlFor="title" style={{ marginBottom: "1rem" }}>
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleTitleChange}
              style={{ marginBottom: "1rem", padding: "0.5rem" }}
            />

            <label htmlFor="content" style={{ marginBottom: "1rem" }}>
              Content
            </label>
            <ReactQuill
              value={content}
              onChange={handleContentChange}
              style={{ minHeight: "8rem" }}
            />

            <label htmlFor="image" style={{ marginBottom: "1rem" }}>
              Image Upload{" "}
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              style={{ marginBottom: "1rem" }}
            />

            <button type="submit" className="create-post">
              Create Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewPostForm;
