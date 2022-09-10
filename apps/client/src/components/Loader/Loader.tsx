import { Spinner } from "@chakra-ui/react";

export function Loader() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner size="xl" />
      <p>Carregando...</p>
    </div>
  );
}
