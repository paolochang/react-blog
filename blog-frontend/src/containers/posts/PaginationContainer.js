import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import qs from 'qs';
import Pagination from '../../components/posts/Pagination';

const PaginationContainer = ({ location, match }) => {
  const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
    lastPage: posts.lastPage,
    posts: posts.posts,
    loading: loading['posts/LIST_POSTS'],
  }));

  if (!posts || loading) return null;

  const { username } = match.params;
  const { tag, page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <Pagination
      tag={tag}
      username={username}
      page={parseInt(page, 5)}
      lastPage={lastPage}
    />
  );
};

export default withRouter(PaginationContainer);
