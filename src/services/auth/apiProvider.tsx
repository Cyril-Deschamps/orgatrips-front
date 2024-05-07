import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  LoggedUser,
  User,
  UserToLogin,
  mapUserRawToUser,
  UserPasswordForm,
  UserToRegister,
} from "./user";
import baseAPI, {
  deleteLocalUser,
  getLocalUser,
  getUserById,
  isSetLocalUser,
  login as apiLogin,
  logout as apiLogout,
  createAccount as apiCreateAccount,
  deleteUserById,
  updateUserPasswordById,
  setLocalUser,
} from "./api";
import { LOGIN_LINK } from "../../routes";
import { useRouter } from "next-translate-routes";

const defaultUser =
  typeof localStorage !== "undefined"
    ? isSetLocalUser()
      ? getLocalUser()
      : null
    : null;

export interface AuthAPI {
  user: User | null;
  loggedUser: LoggedUser | null;

  reloadUser(): Promise<void>;

  login(user: UserToLogin): Promise<LoggedUser>;

  logout(): Promise<void>;

  createAccount(user: UserToRegister): Promise<void>;

  checkUserValidity(): Promise<void>;

  updateUserPassword(form: UserPasswordForm): Promise<void>;

  deleteUser(userId: User["id"]): Promise<void>;
}

export interface AuthAPIConnected extends AuthAPI {
  user: User;
  loggedUser: LoggedUser;
}

/**
 * Default value should never be used
 */
export const AuthContext = createContext<AuthAPI | null>(null);

export function useProvideAuth(): AuthAPI {
  const [user, setUser] = useState<User | null>(null);
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(defaultUser);
  const router = useRouter();

  useMemo(() => {
    if (typeof localStorage === "undefined") return;
    if (loggedUser !== null) {
      setLocalUser(loggedUser);
      baseAPI.defaults.headers[
        "Authorization"
      ] = `Bearer ${loggedUser.xsrfToken}`;
    } else {
      deleteLocalUser();
      delete baseAPI.defaults.headers["Authorization"];
    }
  }, [loggedUser]);

  useEffect(() => {
    const interceptor = baseAPI.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error?.response?.status === 401) {
          setUser(null);
          setLoggedUser(null);
        }
        return Promise.reject(error?.response?.status);
      },
    );

    return () => {
      baseAPI.interceptors.response.eject(interceptor);
    };
  }, []);

  const login: AuthAPI["login"] = useCallback((u: UserToLogin) => {
    return apiLogin(u).then((res) => {
      const newUser = mapUserRawToUser(res.data.user) as User & LoggedUser;
      setLoggedUser(newUser);
      setUser(newUser);
      return newUser;
    });
  }, []);

  const logout: AuthAPI["logout"] = useCallback(() => {
    if (user !== null) {
      setUser(null);
      setLoggedUser(null);
      router.push(LOGIN_LINK);
    }
    return apiLogout().then(() => {
      return Promise.resolve();
    });
  }, [router, user]);

  const checkUserValidity: AuthAPI["checkUserValidity"] = useCallback(() => {
    if (isSetLocalUser()) {
      const u = getLocalUser();
      return getUserById(u.id).then(
        (res) => {
          const newUser = { ...u, ...mapUserRawToUser(res.data) };
          setUser(newUser);
          setLocalUser({
            ...newUser,
            xsrfToken: u.xsrfToken,
          });
        },
        (err) => {
          if (err === 401) {
            setUser(null);
            setLoggedUser(null);
            deleteLocalUser();
          }
        },
      );
    }
    return Promise.resolve();
  }, []);

  const reloadUser = useCallback(() => {
    if (loggedUser?.id) {
      return getUserById(loggedUser.id).then((res) => {
        const newUser = mapUserRawToUser(res.data) as User & LoggedUser;
        setUser(newUser);
      });
    }
    return Promise.resolve();
  }, [loggedUser?.id]);

  const createAccount: AuthAPI["createAccount"] = useCallback(async (user) => {
    await apiCreateAccount(user);
  }, []);

  const updateUserPassword: AuthAPI["updateUserPassword"] = useCallback(
    async (form) => {
      await updateUserPasswordById((user as NonNullable<typeof user>).id, form);
    },
    [user],
  );

  const deleteUser: AuthAPI["deleteUser"] = useCallback(async (userId) => {
    await deleteUserById(userId);
  }, []);

  return {
    loggedUser,
    user,
    createAccount,
    reloadUser,
    login,
    logout,
    checkUserValidity,
    updateUserPassword,
    deleteUser,
  };
}

export function useAuth(): AuthAPI {
  return useContext(AuthContext) as AuthAPI;
}

export function ProvideAuth({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      auth.checkUserValidity().then(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <></>;

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
