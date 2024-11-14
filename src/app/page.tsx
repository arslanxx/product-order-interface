import { QueryClientProvider } from "@tanstack/react-query";
import Home from "./Home/Home";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "./lib/react-query-client";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
