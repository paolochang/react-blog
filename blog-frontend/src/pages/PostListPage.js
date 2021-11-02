import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostListContainer from '../containers/posts/PostListContainer';
import PaginationContainer from '../containers/posts/PaginationContainer';

const PostListPage = () => {
  return (
    <React.Fragment>
      <HeaderContainer />
      <PostListContainer />
      <PaginationContainer />
    </React.Fragment>
  );
};

export default PostListPage;
