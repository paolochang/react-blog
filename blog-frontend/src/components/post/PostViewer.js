import React from 'react';
import palette from '../../lib/styles/palette';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`;

const PostViewer = () => {
  return (
    <PostViewerBlock>
      <PostHead>
        <h1>Title</h1>
        <SubInfo username="username" publishedDate={new Date()} />
        <Tags tags={['tag1', 'tag2', 'tag3']} />
      </PostHead>
      <PostContent
        dangerouslySetInnerHTML={{ __html: '<p>HTML: <b>Content</b></p>' }}
      />
    </PostViewerBlock>
  );
};

export default PostViewer;
