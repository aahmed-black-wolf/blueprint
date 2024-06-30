import axios from 'axios';
import { getCookie } from 'cookies-next';
import toast from 'react-hot-toast';

import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

type REQ = {
  endPoint: string;
  key: string;
  retry?: number;
  base?: string;
  timer?: number;
  revalidateTime?: number;
  initalPage?: number;
};

const createAxiosInstance = (baseURL?: string) => {
  const config = {
    baseURL: baseURL || process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      Connection: "",
      "Accept-Language": getCookie("NEXT_LOCALE") || "en",
    },
  };

  return axios.create(config);
};

export const useGetter = ({
  endPoint,
  key,
  timer,
  revalidateTime: revalidateTime,
  base,
}: REQ) =>
  useQuery({
    queryKey: [key],
    staleTime: timer || Infinity,
    retry: revalidateTime,
    queryFn: async () => {
      try {
        const req = await createAxiosInstance(base).get(endPoint);
        return req.data;
      } catch (error) {
        // Handle error (e.g., log it)
        throw error;
      }
    },
  });

export const useSetter = ({ endPoint, key, retry, base }: REQ) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [key],
    retry,
    mutationFn: async (data: any) => {
      try {
        const response = await createAxiosInstance(base).post(endPoint, data);
        queryClient.invalidateQueries({ queryKey: [key] });
        return response.data;
      } catch (error: any) {
        toast.error(`Error ! ${error?.response?.data?.message}`);
        console.log(error);
        throw error;
      }
    },
  });
};

export const useInfiniteScroll = ({
  endPoint,
  key,
  base,
  retry,
  initalPage,
}: REQ) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [key],
    retry,
    mutationFn: async (data: any) => {
      try {
        const response = await createAxiosInstance(base).post(
          `${endPoint}?page=${initalPage}`,
          data
        );
        queryClient.invalidateQueries({ queryKey: [key] });
        return response.data;
      } catch (error: any) {
        toast.error(`Error ! ${error?.response?.data?.message}`);
        console.log(error);
        throw error;
      }
    },
  });
};
