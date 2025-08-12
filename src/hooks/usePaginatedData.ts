import { useState, useEffect } from 'react';
import axios from 'axios';

interface UsePaginatedDataProps {
  url: string;
  limit?: number;
}

export const usePaginatedData = ({ url, limit = 10 }: UsePaginatedDataProps) => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (currentPage: number, isRefresh = false) => {
    if (currentPage === 1 && !isRefresh) {
      setLoading(true);
    } else if (currentPage > 1) {
      setLoadingMore(true);
    }

    setError(null);

    try {
      const response = await axios.get(`${url}?_page=${currentPage}&_limit=${limit}`);
      const newData = response.data;

      if (newData.length > 0) {
        if (currentPage === 1) {
          setData(newData);
        } else {
          setData(prev => [...prev, ...newData]);
        }
        
        if (newData.length < limit) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data');
    }

    setLoading(false);
    setLoadingMore(false);
    if (isRefresh) {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const loadMore = () => {
    if (hasMore && !loadingMore) {
      setPage(prev => prev + 1);
    }
  };

  const refresh = () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    setData([]);
    fetchData(1, true);
  };

  const reset = () => {
    setData([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  };

  return {
    data,
    loading,
    loadingMore,
    hasMore,
    refreshing,
    error,
    loadMore,
    refresh,
    reset,
  };
};
