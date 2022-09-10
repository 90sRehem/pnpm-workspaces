import { ContentLayout } from "@/components";
import { Fallback } from "@/components/Fallback";
import { ErrorBoundary } from "react-error-boundary";
import { UsersList } from "../components";

function ErrorFallback() {
  return (
    <Fallback
      type="error"
      headingText="Ops, parece que tivemos um problema."
      descriptionText="Por favor recarregue a página"
    />
  );
}

export function Users() {
  return (
    <ContentLayout goBackButton>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <UsersList />
      </ErrorBoundary>
    </ContentLayout>
  );
}
