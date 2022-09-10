import { Link as RouterLink, LinkProps } from "@/lib/react-router-dom";

export function Link({ children, ...props }: LinkProps) {
  return <RouterLink {...props}>{children}</RouterLink>;
}
