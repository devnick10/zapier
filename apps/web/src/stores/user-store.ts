import { User } from '@/lib/types'
import { createStore } from 'zustand/vanilla'
type user = {
    name: string
    email: string

}
export type UserState = {
    user: User | null
    isAuthenticated: boolean
}

export type UserActions = {
    login: () => void
    logout: () => void
    setUser: (user: User) => void
}

export type UserStore = UserState & UserActions

export const defaultInitState: UserState = {
    user: null,
    isAuthenticated: false
}

export const createUserStore = (
    initState: UserState = defaultInitState,
) => {
    return createStore<UserStore>()((set) => ({
        ...initState,
        login: () => set((state) => ({ isAuthenticated: true })),
        logout: () => set((state) => ({ isAuthenticated: false })),
        setUser: (user) => set((state) => ({ user: user })),
    }))
}