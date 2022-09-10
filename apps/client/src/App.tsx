import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@/lib/chakra-ui";
import { makeServer } from "@/lib/mirage";
import { DEV_ENV, FAKE_SERVER } from "@/config";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "@/lib/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "@/lib/react-error-boundary";
import { AuthProvider } from "./features/authentication";
import { AppRoutes } from "./routes";
import { Fallback, Loader } from "./components";

function ErrorFallback() {
  return (
    <Fallback
      type="error"
      headingText="Ops, parece que tivemos um problema."
      descriptionText="Por favor recarregue a página"
    />
  );
}

export function App() {
  if (DEV_ENV && FAKE_SERVER) {
    makeServer();
  }
  return (
    <Suspense fallback={<Loader />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ChakraProvider>
          <QueryClientProvider client={queryClient}>
            {DEV_ENV && <ReactQueryDevtools position="bottom-right" />}
            <BrowserRouter>
              <AuthProvider>
                <AppRoutes />
              </AuthProvider>
            </BrowserRouter>
          </QueryClientProvider>
        </ChakraProvider>
      </ErrorBoundary>
    </Suspense>
  );
}
