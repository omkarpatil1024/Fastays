import {useQuery, useMutation, UseQueryOptions, UseMutationOptions} from '@tanstack/react-query';

export const useApi = {
  useQuery: <TData, TError = Error>(
    queryKey: unknown[],
    queryFn: () => Promise<TData>,
    options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
  ) => {
    return useQuery<TData, TError>({
      queryKey,
      queryFn,
      ...options,
    });
  },

  useMutation: <TData, TError = Error, TVariables = void>(
    mutationFn: (variables: TVariables) => Promise<TData>,
    options?: UseMutationOptions<TData, TError, TVariables>,
  ) => {
    return useMutation<TData, TError, TVariables>({
      mutationFn,
      ...options,
    });
  },
};
