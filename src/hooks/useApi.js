import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "../api/client"

/**
 * GET عبر axios + useQuery — مرّري queryKey و path (نسبي لـ baseURL).
 * @param {unknown[]} queryKey
 * @param {string} path — مثل "/api/v1/products"
 * @param {object} [options] — params للـ URL، وباقي خيارات useQuery (select, enabled, …)
 */
export function useApiGet(queryKey, path, options = {}) {
    const { params, ...queryOptions } = options
    return useQuery({
        queryKey: params != null ? [...queryKey, params] : queryKey,
        queryFn: async () => {
            const { data } = await api.get(path, { params })
            return data
        },
        ...queryOptions,
    })
}


export function useApiPost(mutationOptions = {}) {
    const queryClient = useQueryClient()
    const { onSuccess: userOnSuccess, ...rest } = mutationOptions

    return useMutation({
        mutationFn: async ({
            path,
            body,
            method = "post",
            params,
            headers,
        }) => {
            const { data } = await api.request({
                method,
                url: path,
                data: body,
                params,
                headers,
            })
            return data
        },
        onSuccess: (data, variables, context) => {
            const multi = variables?.invalidateQueryKeys
            const single = variables?.invalidateQueryKey
            if (multi?.length) {
                multi.forEach((queryKey) => {
                    queryClient.invalidateQueries({ queryKey })
                })
            } else if (single) {
                queryClient.invalidateQueries({ queryKey: single })
            }
            userOnSuccess?.(data, variables, context)
        },
        ...rest,
    })
}
