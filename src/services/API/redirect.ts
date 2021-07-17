export function redirectIfBadStatus(status: number, noRedirect = false): void {
  if (noRedirect) return;
  if (status === 401) {
    window.location.replace('/login');
  }

  if (status === 403) {
    window.location.replace('/');
  }
}
