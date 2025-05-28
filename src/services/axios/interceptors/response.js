export const responseInterceptor = response => {
  return response;
};

export const responseErrorInterceptor = error => {
  console.error("Response Error Interceptor:", error.response || error.message);

  if (error.response) {
    const { status } = error.response;
    if (status === 401) {
      console.error(
        "Unauthorized request. Redirecting to login or refreshing token..."
      );
    } else if (status === 403) {
      console.error("Forbidden: User does not have necessary permissions.");
    } else if (status >= 500) {
      console.error("Server error. Please try again later.");
    }
  }

  return Promise.reject(error);
};
