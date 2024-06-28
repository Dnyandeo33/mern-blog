import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import useFetchPostsData from '../hook/useFetchPostsData';

const Home = () => {
  useFetchPostsData('get-posts?limit=3');
  const { posts } = useSelector((state) => state.posts.posts);

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-6 px-3 p-24 max-w-6xl mx-auto rounded-lg border border-gray-700 dark:border-teal-500 m-5">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Here you will find a variety of articles and tutorials on topics such
          as web development, software engineering, and programming languages.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View All Posts
        </Link>
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-6 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to="/search"
              className="text-lg text-center text-teal-500 font-bold hover:underline"
            >
              View All Posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
