export function refreshSession(): void {
  // HACK: next-auth doesn't support refreshing a session imperatively
  // but it automatically refreshes the session on tab change ("visibilitychange")
  document.dispatchEvent(new Event("visibilitychange"));
}
