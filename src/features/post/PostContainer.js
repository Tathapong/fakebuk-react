import PostCreateToggle from "./PostCreateToggle";
import PostList from "./PostList";
import { useState, useEffect } from "react";
import { useLoading } from "../../contexts/LoadingContext";
import { useAuth } from "../../contexts/AuthContext";
import * as postService from "../../api/postApi";
import * as likeService from "../../api/likeApi";
import * as commentService from "../../api/commentApi";

function PostContainer() {
  const [posts, setPosts] = useState([]);
  const { startLoading, stopLoading } = useLoading();

  const { user } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        startLoading();
        const res = await postService.getUserPost("friend", user.id);
        setPosts(res.data.posts);
      } catch (err) {
        console.log(err);
      } finally {
        stopLoading();
      }
    };
    fetchPost();
  }, []);

  const createPost = async (input) => {
    const res = await postService.createPost(input);
    setPosts([res.data.post, ...posts]);
  };

  const updatePost = async (postId, input) => {
    const res = await postService.updatePost(postId, input);
    const newPosts = [...posts].map((item) => {
      if (item.id === postId) {
        item = res.data.post;
      }
      return item;
    });

    setPosts(newPosts);
  };

  const deletePost = async (postId) => {
    await postService.deletePost(postId);
    const newPosts = [...posts].filter((item) => item.id !== postId);
    setPosts(newPosts);
  };

  const toggleLike = async (postId) => {
    try {
      const res = await likeService.toggleLike(postId);
      const { like } = res.data;

      const newPosts = [...posts]; // ไม่ใช่ Deep clone (Object ที่อยู่ข้างใน ยังเป็น allowcated ของ post อยู่)
      const postIdx = newPosts.findIndex((item) => item.id === postId);

      if (like) newPosts[postIdx].Likes?.push(like);
      else newPosts[postIdx].Likes = newPosts[postIdx].Likes?.filter((item) => item.userId !== user.id);

      setPosts(newPosts);
    } catch (err) {
      console.log(err);
    }
  };

  const createComment = async (postId, input) => {
    const res = await commentService.createComment(postId, input);
    const { comment } = res.data;

    const newPosts = [...posts];
    const postIdx = newPosts.findIndex((item) => item.id === postId);

    newPosts[postIdx].Comments?.push(comment);
    setPosts(newPosts);
  };

  const updateComment = async (postId, commentId, commentInput) => {
    await commentService.updateComment(postId, commentId, { title: commentInput });
    const newPosts = [...posts];
    const postIdx = newPosts.findIndex((item) => item.id === postId);

    newPosts[postIdx].Comments?.map((item) => {
      if (item.id === commentId) item.title = commentInput;
      return item;
    });
    setPosts(newPosts);
  };
  const deleteComment = async (postId, commentId) => {
    await commentService.deleteComment(postId, commentId);
    const newPosts = [...posts];

    const postIdx = newPosts.findIndex((item) => item.id === postId);
    const newComment = newPosts[postIdx].Comments?.filter((item) => item.id !== commentId);
    newPosts[postIdx].Comments = newComment;

    setPosts(newPosts);
  };

  return (
    <div className="mx-auto py-4 max-w-152">
      <div className="mx-2 d-flex flex-column gap-3">
        <PostCreateToggle createPost={createPost} />
        <PostList
          posts={posts}
          toggleLike={toggleLike}
          updatePost={updatePost}
          deletePost={deletePost}
          createComment={createComment}
          updateComment={updateComment}
          deleteComment={deleteComment}
        />
      </div>
    </div>
  );
}

export default PostContainer;
