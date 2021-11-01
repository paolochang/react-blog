import React from 'react';
import PostViewer from '../components/post/PostViewer';
import HeaderContainer from '../containers/common/HeaderContainer';

const PostPage = () => {
  return (
    <React.Fragment>
      <HeaderContainer />
      <PostViewer />
    </React.Fragment>
  );
};

export default PostPage;
