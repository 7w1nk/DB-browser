import { useMemo } from 'react';

export const useSortedLists = (lists, sort) => {
  const sortedLists = useMemo(() => {
    if (sort) {
      return [...lists].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return lists;
  }, [sort, lists]);
  return sortedLists;
}

export const useLists = (lists, sort, query) => {
  const sortedLists = useSortedLists(lists, sort);

  const sorterAndSearchLists = useMemo(() => {
    return sortedLists.filter(list => post.title.toLowerCase().includes(query.toLowerCase()));
  }, [query, sortedLists]);

  return sorterAndSearchLists;
}