export const setStatusFetch = (status: string, data?: any) => ({
  type: status,
  data: data ? data : null,
})