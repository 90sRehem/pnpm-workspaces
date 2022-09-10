import { ColorModeToggle } from "@/components";
import { ContentLayout } from "@/components/Layout/ContentLayout";

export function Settings() {
  return (
    <ContentLayout>
      <h1>Settings</h1>;
      <ColorModeToggle />
    </ContentLayout>
  );
}
