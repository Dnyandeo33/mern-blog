import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import useFetchPostsByQuery from '../hook/useFetchPostsByQuery';

const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  const { loading, filterPosts } = useSelector((state) => state.posts);

  const location = useLocation();
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(location.search);
  const searchQuery = urlParams.toString();
  useFetchPostsByQuery(searchQuery);

  useEffect(() => {
    const searchTerm = urlParams.get('searchTerm');
    const sort = urlParams.get('sort');
    const category = urlParams.get('category');

    if (searchTerm || sort || category) {
      setSidebarData({
        ...sidebarData,
        searchTerm,
        sort,
        category,
      });
    }
  }, [location.search]);

  const handleSearch = (e) => {
    if (e.target.id === 'search') {
      setSidebarData({
        ...sidebarData,
        searchTerm: e.target.value,
      });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({
        ...sidebarData,
        sort: order,
      });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({
        ...sidebarData,
        category,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { searchTerm, sort, category } = sidebarData;
    urlParams.set('searchTerm', searchTerm);
    urlParams.set('sort', sort);
    urlParams.set('category', category);
    const newUrl = urlParams.toString();
    navigate(`/search?${newUrl}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className=" whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              id="search"
              type="text"
              placeholder="search..."
              value={sidebarData.searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className=" font-semibold">Sort:</label>
            <Select onChange={handleSearch} value={sidebarData.sort} id="sort">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <label className=" font-semibold">Category:</label>
            <Select
              onChange={handleSearch}
              value={sidebarData.category}
              id="category"
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="nextjs">NextJs</option>
              <option value="react">React</option>
              <option value="javascript">JavaScript</option>
            </Select>
          </div>
          <Button type="submit" outline>
            <span className="font-semibold">Apply Filter</span>
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold p-8 mt-1 sm:border-b border-gray-500">
          Search Results
        </h1>
        <div className="flex justify-center items-center flex-wrap m-5 gap-4">
          {!loading && filterPosts?.posts?.length === 0 && (
            <p className="text-xl text-center text-gray-500">No Posts Found</p>
          )}
          {loading && (
            <p className="text-xl text-center text-gray-500">Loading...</p>
          )}
          {filterPosts?.posts?.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
