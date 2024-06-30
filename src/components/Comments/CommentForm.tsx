"use client";
import { useEffect } from 'react';

import { useTranslations } from 'next-intl';
import {
  FormProvider,
  useForm,
} from 'react-hook-form';

import { useSetter } from '@/src/hooks/apiRequest';
import { generateRandomId } from '@/src/utils/randomIds';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Textarea,
} from '@nextui-org/react';

import { useCommentContext } from './CommentProvider';
import {
  CommentSchema,
  CommentsType,
} from './Schema/CommentSchema';

export default function CommentForm() {
  const t = useTranslations("Comments");
  const methods = useForm<CommentsType>({
    resolver: zodResolver(CommentSchema),
  });
  const { newComments, setNewComments } = useCommentContext();
  const { mutate, isPending, data, isError } = useSetter({
    endPoint: "/comments/add",
    key: "AddComment",
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = methods;

  const sentComment = (data: CommentsType) => {
    const schema = {
      body: data.comment,
      postId: generateRandomId(1), // weak id's generator for testing purposes
      userId: generateRandomId(1), // weak id's generator for testing purposes
    };

    mutate(schema);
  };

  useEffect(() => {
    if (!isPending && data) {
      reset();
    }
  }, [isPending]);

  useEffect(() => {
    if (isError) {
      setError("comment", {
        type: "invalid",
        message: "Invalid credentials",
      });
    }
  }, [isError]);

  useEffect(() => {
    if (data && !isPending) {
      setNewComments((prev: any) => [data, ...prev]);
    }
  }, [data]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(sentComment)}
        id="commentForm"
        className="w-[95%] md:w-[50%] lg:w-[60%] flex flex-col md:gap-[10px]"
      >
        <Textarea
          {...register("comment")}
          isInvalid={!!errors?.comment?.message}
          errorMessage={errors?.comment?.message}
          variant="faded"
          label={t("comment")}
          labelPlacement="outside"
          placeholder={t("write_an_comment")}
          rows={6}
          minRows={6}
          className="col-span-12 md:col-span-6 mb-6 md:mb-0"
        />
        <div>
          <Button
            isDisabled={isPending}
            isLoading={isPending}
            form="commentForm"
            type="submit"
            color="primary"
          >
            {t("submit")}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
