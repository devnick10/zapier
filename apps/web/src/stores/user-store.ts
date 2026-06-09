import { createStore } from "zustand/vanilla";
type User = {
  id: string
  name: string;
  email: string;
};
export type UserState = {
  user: User | null;
  isAuthenticated: boolean;
};

export type UserActions = {
  login: () => void;
  logout: () => void;
  setUser: (user: User) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  user: null,
  isAuthenticated: false,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    login: () => set(() => ({ isAuthenticated: true })),
    logout: () => set(() => ({ isAuthenticated: false })),
    setUser: (user) => set(() => ({ user: user })),
  }));
};
