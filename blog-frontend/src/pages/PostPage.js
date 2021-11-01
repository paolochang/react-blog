import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostViewer from '../components/post/PostViewer';

const PostPage = () => {
  return (
    <React.Fragment>
      <HeaderContainer />
      <PostViewer />
    </React.Fragment>
  );
};

export default PostPage;
