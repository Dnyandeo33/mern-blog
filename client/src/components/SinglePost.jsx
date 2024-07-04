import { Button, Spinner } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import useFetchPostsBySlug from '../hook/useFetchPostBySlug';
import useFetchPostsData from '../hook/useFetchPostsData';
import CommentSection from './CommentSection';
import PostCard from './PostCard';

const SinglePost = () => {
  const { postSlug } = useParams();
  useFetchPostsData(`get-posts`);
  useFetchPostsBySlug(`get-posts?slug=${postSlug}`);

  const { loading, slugPosts, posts } = useSelector((state) => state.posts);
  const singlePost = slugPosts.posts;

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <main className="p-3 flex flex-col min-w-6 mx-auto min-h-screen">
      {singlePost &&
        singlePost.map((post, index) => (
          <>
            <div className="flex flex-col" key={index}>
              <h1 className=" text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
                {post.title}
              </h1>
              <Link
                to={`/search?category=${post && post.category}`}
                className=" self-center mt-5"
              >
                <Button color="gray" pill size="xs">
                  {post && post.category}
                </Button>
              </Link>
              <img
                src={post && post.image}
                alt={post?.title}
                className="p-3 max-h-[500px] object-cover w-full"
              />
              <div className="p-3 flex justify-between border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
                <span>
                  {post && new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span className="italic">
                  {post && (post.content.length / 1000).toFixed(0)} mins read
                </span>
              </div>
              <div
                className="p-3 max-w-2xl mx-auto w-full post-content"
                dangerouslySetInnerHTML={{ __html: post && post.content }}
              ></div>
              <CommentSection postId={post?._id} />
            </div>
            <div className="flex flex-col justify-center items-center ">
              <h1 className="text-xl mt-5 mb-5">Recent Articles</h1>
              <div className="flex flex-wrap justify-center items-start gap-5">
                {posts &&
                  posts.posts
                    .slice(0, 3)
                    .map((post) => <PostCard key={post._id} post={post} />)}
              </div>
            </div>
          </>
        ))}
    </main>
  );
};

export default SinglePost;
