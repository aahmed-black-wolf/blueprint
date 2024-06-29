"use client";
import {
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Comment } from '@/src/@types/Comments';
import { useGetter } from '@/src/hooks/apiRequest';
import {
  Divider,
  Pagination,
  Spinner,
} from '@nextui-org/react';

import { useCommentContext } from './CommentProvider';

export default function CommentsContent() {
  const [pagination, setPagination] = useState(10);
  const { newComments } = useCommentContext();
  const scrollToRef = useRef<HTMLDivElement | null>(null);
  const { data, isPending, isError, refetch } = useGetter({
    endPoint: `/comments?limit=10&skip=${pagination}`,
    key: "GetComments",
  });

  useEffect(() => {
    refetch();
  }, [pagination]);

  const handlePagination = () => {
    setPagination((prev) => prev + 10);
    if (scrollToRef.current) {
      const elementPosition = scrollToRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 100;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div ref={scrollToRef}>
      <div className="pt-[20px]">
        {isPending && <Spinner color="primary" />}
        {!isPending && !isError && (
          <Fragment>
            {[...newComments, ...data?.comments].map((comment: Comment) => (
              <article
                key={comment.id}
                className="rounded-lg bg-white p-6 text-base dark:bg-gray-900"
              >
                <footer className="mb-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="mr-3 inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
                      {comment.user.fullName}
                    </p>
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">
                  {comment.body}
                </p>
              </article>
            ))}
            <Divider className="my-[30px]" />
            <div className="flex justify-center items-center w-full">
              <Pagination
                key={data?.total}
                total={data?.total}
                initialPage={1}
                onChange={handlePagination}
                classNames={{
                  wrapper:
                    "gap-0 overflow-visible h-8 rounded border border-divider",
                  item: "w-8 h-8 text-small rounded-none bg-transparent",
                  cursor:
                    "bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
                }}
              />
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
