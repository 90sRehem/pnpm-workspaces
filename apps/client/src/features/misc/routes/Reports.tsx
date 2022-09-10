import { ContentLayout } from "@/components";
import { Fallback } from "@/components/Fallback";

export function Reports() {
  return (
    <ContentLayout>
      <h1>Reports</h1>
      <Fallback
        type="error"
        headingText="This is the headline"
        descriptionText="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
      />
    </ContentLayout>
  );
}
