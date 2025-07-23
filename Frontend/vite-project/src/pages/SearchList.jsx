import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import BlogCard from '@/components/BlogCard';

const SearchList = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get('q') || '';

  const { blog = [] } = useSelector(store => store.blog);

  const filteredBlogs = blog.filter((item) => {
    const title = item?.title?.toLowerCase() || '';
    const subtitle = item?.subtitle?.toLowerCase() || '';
    const category = item?.category?.toLowerCase() || '';
    const q = query.toLowerCase();

    return (
      title.includes(q) ||
      subtitle.includes(q) ||
      category === q
    );
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='pt-32'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='mb-5 text-xl font-semibold'>
          Search Results for: "{query}"
        </h2>

        {filteredBlogs.length === 0 ? (
          <p>No blogs found for this search.</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 my-10'>
            {filteredBlogs.map((blog, index) => (
              <BlogCard key={blog._id || index} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchList;
