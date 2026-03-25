import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react"
import { api } from "../api/client"

const TOKEN_KEY = "md_token"
const USER_KEY = "md_user"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        try {
            const t = localStorage.getItem(TOKEN_KEY)
            const u = localStorage.getItem(USER_KEY)
            if (t && u) {
                setToken(t)
                setUser(JSON.parse(u))
            }
        } catch {
            localStorage.removeItem(TOKEN_KEY)
            localStorage.removeItem(USER_KEY)
        }
        setReady(true)
    }, [])

    const persist = useCallback((nextToken, nextUser) => {
        setToken(nextToken)
        setUser(nextUser)
        localStorage.setItem(TOKEN_KEY, nextToken)
        localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUser(null)
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
    }, [])

    const register = useCallback(
        async ({ name, email, password }) => {
            try {
                const { data } = await api.post("/api/v1/auth/register", {
                    name,
                    email,
                    password,
                })
                if (data.success && data.data?.token && data.data?.user) {
                    persist(data.data.token, data.data.user)
                    return { ok: true, message: data.message }
                }
                return {
                    ok: false,
                    message: data.message || "Registration failed",
                }
            } catch (err) {
                const body = err.response?.data
                let msg =
                    body?.message || err.message || "Network error"
                if (msg === "Server error" && body?.error) {
                    msg = `${msg}: ${body.error}`
                }
                return { ok: false, message: msg }
            }
        },
        [persist]
    )

    const login = useCallback(
        async ({ email, password }) => {
            try {
                const { data } = await api.post("/api/v1/auth/login", {
                    email,
                    password,
                })
                if (data.success && data.data?.token && data.data?.user) {
                    persist(data.data.token, data.data.user)
                    return { ok: true, message: data.message }
                }
                return { ok: false, message: data.message || "Login failed" }
            } catch (err) {
                const body = err.response?.data
                let msg =
                    body?.message || err.message || "Network error"
                if (msg === "Server error" && body?.error) {
                    msg = `${msg}: ${body.error}`
                }
                return { ok: false, message: msg }
            }
        },
        [persist]
    )

    const value = useMemo(
        () => ({
            user,
            token,
            ready,
            isAuthenticated: Boolean(token && user),
            register,
            login,
            logout,
        }),
        [user, token, ready, register, login, logout]
    )

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) {
        throw new Error("useAuth must be used within AuthProvider")
    }
    return ctx
}
