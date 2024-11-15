"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "./lib/react-query-client";
import Home from "./pages/Home/Home";

export default function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <Home />
      <ReactQueryDevtools />
      </QueryClientProvider>
    );
  
}
