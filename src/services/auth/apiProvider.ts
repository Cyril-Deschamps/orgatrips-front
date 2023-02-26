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
  UserToRegister,
  UserToLogin,
  UserToUpdateForm,
  UserPasswordForm,
  UserKyc,
  mapUserRawToUser,
} from "./user";
import baseAPI, {
  deleteLocalUser,
  getLocalUser,
  getUserById,
  isSetLocalUser,
  login as apiLogin,
  logout as apiLogout,
  lostPassword as apiLostPassword,
  register as apiRegister,
  resetPassword as apiResetPassword,
  setLocalUser,
  updateUserById,
  updateUserPasswordById,
  validateUserRegistration as apiValidateUserRegistration,
  updateKyc as apiUpdateKyc,
} from "./api";
import { AxiosPromise } from "axios";
import { useRouter } from "next/router";
import { LOGIN_LINK } from "../../routes/public";

const defaultUser = isSetLocalUser() ? getLocalUser() : null;

export interface AuthAPI {
  user: LoggedUser | null;

  login(user: UserToLogin): Promise<LoggedUser>;

  logout(): Promise<void>;

  checkUserValidity(): Promise<void>;

  register(user: UserToRegister): AxiosPromise<void>;

  validateUserRegistration(guid: string): AxiosPromise<void>;

  updateUser(newUser: UserToUpdateForm): Promise<void>;
  updateUserPassword(form: UserPasswordForm): AxiosPromise<void>;

  lostPassword(email: User["email"]): AxiosPromise<void>;

  resetPassword(
    guid: string,
    password: UserToLogin["password"],
  ): AxiosPromise<void>;

  updateKyc(kycType: keyof UserKyc, form: Partial<UserKyc>): Promise<void>;
}

export interface AuthAPIConnected extends AuthAPI {
  user: LoggedUser;
}

/**
 * Default value should never be used
 */
export const AuthContext = createContext<AuthAPI | null>(null);

export function useProvideAuth(): AuthAPI {
  const [user, setUser] = useState<LoggedUser | null>(defaultUser);
  const router = useRouter();

  useMemo(() => {
    if (user !== null) {
      setLocalUser(user);
      baseAPI.defaults.headers["Authorization"] = `Bearer ${user.xsrfToken}`;
    } else {
      deleteLocalUser();
      delete baseAPI.defaults.headers["Authorization"];
    }
  }, [user]);

  useEffect(() => {
    const interceptor = baseAPI.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error?.response?.status === 401) {
          setUser(null);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      baseAPI.interceptors.response.eject(interceptor);
    };
  }, []);

  const login: AuthAPI["login"] = useCallback((u: UserToLogin) => {
    return apiLogin(u).then((res) => {
      const newUser = mapUserRawToUser(res.data.user) as LoggedUser;
      setUser(newUser);
      return newUser;
    });
  }, []);

  const logout: AuthAPI["logout"] = useCallback(() => {
    if (user !== null) {
      setUser(null);
      router.push(LOGIN_LINK);
    }
    return apiLogout().then(() => {
      return Promise.resolve();
    });
  }, [user, router]);

  const checkUserValidity: AuthAPI["checkUserValidity"] = useCallback(() => {
    if (isSetLocalUser()) {
      const u = getLocalUser();
      return getUserById(u.id).then(
        (res) => {
          const newUser = { ...u, ...mapUserRawToUser(res.data) };
          setUser({
            ...newUser,
            xsrfToken: u.xsrfToken,
          });
          setLocalUser({
            ...newUser,
            xsrfToken: u.xsrfToken,
          });
        },
        (err) => {
          if (err?.response?.status === 401) {
            setUser(null);
            deleteLocalUser();
          }
        },
      );
    }
    return Promise.resolve();
  }, []);

  const register: AuthAPI["register"] = useCallback((user) => {
    return apiRegister(user);
  }, []);

  const validateUserRegistration: AuthAPI["validateUserRegistration"] =
    useCallback((guid) => {
      return apiValidateUserRegistration(guid);
    }, []);

  const updateUser: AuthAPI["updateUser"] = useCallback((newUser) => {
    return updateUserById(newUser).then(() => {
      setUser((prevUser) =>
        prevUser
          ? {
              ...prevUser,
              ...newUser,
            }
          : null,
      );
    });
  }, []);

  const updateUserPassword: AuthAPI["updateUserPassword"] = useCallback(
    (form) =>
      updateUserPasswordById((user as NonNullable<typeof user>).id, form),
    [user],
  );

  const lostPassword: AuthAPI["lostPassword"] = useCallback((email) => {
    return apiLostPassword(email);
  }, []);

  const resetPassword: AuthAPI["resetPassword"] = useCallback(
    (guid, password) => {
      return apiResetPassword(guid, password);
    },
    [],
  );

  const updateKyc: AuthAPI["updateKyc"] = useCallback(
    (kycType, form) =>
      apiUpdateKyc((user as NonNullable<typeof user>).id, kycType, form).then(
        (res) => {
          setUser((prevUser: LoggedUser) => ({
            ...prevUser,
            ...mapUserRawToUser(res.data),
          }));
        },
      ),
    [user],
  );

  return {
    user,
    login,
    logout,
    checkUserValidity,
    register,
    validateUserRegistration,
    updateUser,
    updateUserPassword,
    lostPassword,
    resetPassword,
    updateKyc,
  };
}

export function useAuth(): AuthAPI {
  return useContext(AuthContext) as AuthAPI;
}
