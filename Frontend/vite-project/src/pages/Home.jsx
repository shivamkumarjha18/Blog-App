import Hero from '@/components/Hero'
import React from 'react'
import RecentBlog from '@/components/RecentBlog'
import PopularAuthors from '@/components/PopularAuthors'
import Footer from '@/components/Footer'
const Home = () => {
  return (
    <div className='pt-20'>
      <Hero/>
      <RecentBlog/>
  <PopularAuthors/>
  <Footer></Footer>
    </div>
  )
}

export default Home