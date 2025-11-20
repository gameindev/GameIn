export async function confirmAction({
  title = "Are you sure?",
  message = "Please confirm this action.",
  confirmText = "Yes",
  cancelText = "No",
} = {}) {
  const ok = window.confirm(`${title}\n\n${message}`);
  return Promise.resolve(ok);
}
