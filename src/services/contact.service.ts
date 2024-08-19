import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRequest, patchRequest, postRequest } from "../utils/apiCaller";
import { queryKeys } from "../utils/queryKey";
import {
  IBaseResponse,
  IFilterMessageQuery,
  IGetAllMessages,
  IGetSingleMessage,
} from "../types/contact.type";
import {
  GET_ALL_MESSAGES_URL,
  UPDATE_MESSAGES_STATUS_URL,
  UPDATE_MESSAGES_VIEWS_COUNT,
} from "../utils/apiUrl";
import { queryParamsHelper } from "../config/query-params";

function UseGetAllMessages({
  queryParams,
}: {
  queryParams: IFilterMessageQuery;
}) {
  const { isLoading, isRefetching, refetch, isError, data } =
    useQuery<IGetAllMessages>(
      [queryKeys.getAllMessages],
      () =>
        getRequest({
          url: `${GET_ALL_MESSAGES_URL()}${queryParamsHelper(queryParams)}`,
        }),
      {
        refetchOnWindowFocus: false,
      }
    );

  console.log(data);

  return {
    isLoading,
    isRefetching,
    refetch,
    isError,
    data: data as IGetAllMessages,
  };
}

function UseGetSingleMessages({
  //   queryParamsId,
  url,
}: {
  //   queryParamsId: string;
  url: string;
}) {
  const { isLoading, isRefetching, isError, data } =
    useQuery<IGetSingleMessage>(
      [queryKeys.getSingleMessage],
      () => getRequest({ url: url }),
      {
        refetchOnWindowFocus: false,
      }
    );

  console.log(data);

  return {
    isLoading,
    isRefetching,
    isError,
    data: data as IGetSingleMessage,
  };
}

const useUpdateMessageStatus = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, ...rest } = useMutation(
    ({ id, payload }: { id: string; payload: { status: string } }) =>
      patchRequest({
        url: UPDATE_MESSAGES_STATUS_URL(id),
        payload,
      }),
    {
      onSuccess(res) {
        const response = res as IBaseResponse;
        // displaySuccess(response?.message);
        console.log(response?.message);
        queryClient.invalidateQueries([queryKeys.getSingleMessage]);
      },
      onError(error) {
        // displayError(error);
        console.log(error);
      },
    }
  );

  return { mutate, isLoading, ...rest };
};
// const useUpdateMessageViewsCount = () => {
//   const queryClient = useQueryClient();
//   const { mutate, isLoading, ...rest } = useMutation(
//     ({ id, payload }: { id: string; payload: { status: string } }) =>
//       postRequest({
//         url: UPDATE_MESSAGES_VIEWS_COUNT(id),
//         payload,
//       }),
//     {
//       onSuccess(res) {
//         const response = res as IBaseResponse;
//         // displaySuccess(response?.message);
//         console.log(response?.message);
//         queryClient.invalidateQueries([queryKeys.getSingleMessage]);
//       },
//       onError(error) {
//         // displayError(error);
//         console.log(error);
//       },
//     }
//   );

//   return { mutate, isLoading, ...rest };
// };

const useUpdateMessageViewsCount = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, ...rest } = useMutation(
    (id: string) =>
      postRequest({
        url: UPDATE_MESSAGES_VIEWS_COUNT(id),
      }),
    {
      onSuccess(res) {
        const response = res as IBaseResponse;
        // displaySuccess(response?.message);
        console.log(response?.message);
        queryClient.invalidateQueries([queryKeys.getSingleMessage]);
      },
      onError(error) {
        // displayError(error);
        console.log(error);
      },
    }
  );

  return { mutate, isLoading, ...rest };
};

export {
  UseGetAllMessages,
  UseGetSingleMessages,
  useUpdateMessageStatus,
  useUpdateMessageViewsCount,
};
