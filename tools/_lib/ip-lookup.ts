/** Keep provider quota limits distinct from connectivity and invalid-input errors. */
export function isIpRateLimited(status: number, data: { success?: boolean; message?: string } | null): boolean {
  return status === 429 || (data?.success === false && /rate[ -]?limit|quota|too many requests|limit exceeded/i.test(data.message ?? ""));
}
