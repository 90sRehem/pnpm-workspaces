import {
  IAuthUser,
  IAuthCredentials,
  authenticate,
} from "@/features/authentication";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useMutation } from "@/lib/react-query";
import { storage } from "@/utils";
import { useToast } from "@chakra-ui/react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: IAuthUser | null;
  login: (
    credentials: IAuthCredentials,
    onSuccess: () => void,
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  success: boolean;
}

const AuthContext = createContext({} as AuthContextData);

function getFromStorage(key: string) {
  const localValues = storage.getItem({ key, storageType: "local" });
  const sessionValues = storage.getItem({ key, storageType: "session" });

  if (localValues) {
    return localValues;
  }
  if (sessionValues) {
    return sessionValues;
  }

  return null;
}
function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const toast = useToast();
  const [user, setUser] = useState<IAuthUser | null>(() => {
    const storagedUser = getFromStorage("user") as IAuthUser;

    if (storagedUser) {
      return storagedUser;
    }

    return null;
  });

  const isAuthenticated = user ? !!Object.keys(user).length : false;

  const mutation = useMutation(
    async (formData: IAuthCredentials) => {
      return authenticate(formData);
    },
    {
      onError(error) {
        // console.log(error);
        // const errorMessages: { property: string; message: string }[] = [];
        // error?.response?.data?.data?.map(item => errorMessages.push(item));
        // if (errorMessages.length > 0) {
        //   errorMessages.forEach(element => {
        //     toast({
        //       title: "Erro.",
        //       description: element.message,
        //       status: "error",
        //       duration: 6000,
        //       isClosable: true,
        //       position: "top-right",
        //     });
        //   });
        // }
        toast({
          title: "Erro.",
          description: error?.response?.data?.message || error?.message,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      },
      onSuccess(data, variables) {
        setUser(data as IAuthUser);
        if (variables.rememberMe) {
          storage.setItem({ key: "user", storageType: "local", values: data });
        } else {
          storage.setItem({
            key: "user",
            storageType: "session",
            values: data,
          });
        }
      },
      useErrorBoundary: false,
    },
  );

  const login = useCallback(
    async (data: IAuthCredentials, onSuccess: () => void) => {
      try {
        await mutation.mutateAsync(data, { onSuccess: () => onSuccess() });
        mutation.reset();
      } catch (error) {
        // console.log(error);
      }
    },
    [mutation],
  );

  const logout = useCallback(() => {
    const localValues = storage.getItem({ key: "user", storageType: "local" });
    const sessionValues = storage.getItem({
      key: "user",
      storageType: "session",
    });

    if (localValues) {
      storage.clearItem({ key: "user", storageType: "local" });
    }
    if (sessionValues) {
      storage.clearItem({ key: "user", storageType: "session" });
    }

    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      loading: mutation.isLoading,
      success: mutation.isSuccess,
      user,
      login,
      logout,
    }),
    [
      isAuthenticated,
      login,
      logout,
      mutation.isLoading,
      mutation.isSuccess,
      user,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthPovider");
  }

  return context;
}

export { AuthProvider, useAuth };
