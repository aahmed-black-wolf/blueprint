import React from 'react';

import { Divider } from '@nextui-org/react';

import CommentForm from './CommentForm';
import CommentProvider from './CommentProvider';
import CommentsContent from './CommentsContent';

export default function Comments() {
  return (
    <div className="px-2 pt-[40px]">
      <CommentProvider>
        <CommentForm />
        <Divider className="my-[30px]" />
        <CommentsContent />
      </CommentProvider>
    </div>
  );
}
