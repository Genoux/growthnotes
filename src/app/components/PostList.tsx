'use client'
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PostCard from './PostCard'
import { usePosts, usePostsPaginated } from '@/app/hooks/usePosts'
import { RefreshCcw } from 'lucide-react'
import clsx from 'clsx'
import PostPagination from '@/app/components/PostPagination'

interface PostListProps {
  limit?: number
  className?: string
  paginated?: boolean
  postsPerPage?: number
}

export default function PostList({ limit, className = '', paginated = false, postsPerPage = 10 }: PostListProps) {
  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const paginatedResult = usePostsPaginated(page, postsPerPage);
  const nonPaginatedResult = usePosts(limit);
  const { data: posts, isLoading, error, isFetching, refetch, totalPages } = paginated ? paginatedResult : nonPaginatedResult;

  const [showPagination, setShowPagination] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const postListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInitialLoading(false);
  }, []);

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    setIsInView(entry.isIntersecting);
  }, []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const scrollThreshold = viewportHeight * 0.5;
    setShowPagination(currentScrollY > scrollThreshold && isInView);
  }, [isInView]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    });
    
    if (postListRef.current) {
      observer.observe(postListRef.current);
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleIntersection, handleScroll]);

  if (error || posts?.length === 0) {
    return (
      <div className='border border-primary border-opacity-20 p-20 items-center flex flex-col gap-6 justify-center opacity-90 text-primary h-full min-h-[450px]'>
        <h2>{error ? 'Error loading posts. Please try again.' : 'No posts found.'}</h2>
        <RefreshCcw
          onClick={() => refetch()}
          className={clsx('h-5 w-5 transition-all hover:-rotate-45 cursor-pointer',
            { 'animate-spin direction-reverse pointer-events-none': isFetching })}
        />
      </div>
    )
  }

  const displayPosts = posts || []
  const skeletonCount = limit || postsPerPage

  return (
    <div ref={postListRef} className='w-full h-full'>
      <div className={`grid gap-6 ${className}`}>
        {(initialLoading || isLoading)
          ? Array.from({ length: skeletonCount }, (_, index) => (
              <PostCard key={`skeleton-${index}`} isLoading={true} />
            ))
          : displayPosts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                newPost={index === 0 && page === 1}
              />
            ))
        }
      </div>
      <AnimatePresence>
        {paginated && totalPages > 1 && showPagination && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 left-0 right-0 mx-auto w-fit bg-white border-[3px] border-primary rounded-full shadow-hard px-4 py-2 z-20"
          >
            <PostPagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}