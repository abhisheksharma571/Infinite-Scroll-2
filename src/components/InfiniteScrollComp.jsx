import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import Item from './Item';
import Loading from './Loading';

const InfiniteScrollComp = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const hasFetchedRef = useRef(false);

  const lastItemRef = useCallback(
    node => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreItems();
        }
      }
    , { threshold: 1.0 });
      if (node) observer.current.observe(node);
    },
    [hasMore, loading]
  );

  const loadMoreItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.unsplash.com/photos', {
        params: { page, per_page: 10 },
        headers: {
          Authorization: 'Client-ID VJqyUNS2bhXpZ6I0-O7EruGqoR8LJGN3NUeX2xHFQV8'
        }
      });
      console.log('Fetched data:', response.data); // Log the fetched data
      setItems(prevItems => [...prevItems, ...response.data]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching images:', error);
      setHasMore(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!hasFetchedRef.current) {
      loadMoreItems();
      hasFetchedRef.current = true;
    }
  }, []);

  return (
    <div className="p-4">
      {items.map((item, index) => (
        <Item
          key={`${item.id}-${index}`}
          item={item}
          ref={index === items.length - 1 ? lastItemRef : null}
        />
      ))}
      {loading && <Loading />}
    </div>
  );
};

export default InfiniteScrollComp;
