import { useNavigate } from "@/lib/react-router-dom";
import { Layout, LoginForm } from "../components";

export function Login() {
  const navigate = useNavigate();
  return (
    <Layout>
      <LoginForm onSuccess={() => navigate("/app")} />
    </Layout>
  );
}
