import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./query/queryClient"
import { Toaster } from "react-hot-toast"
import { CartProvider } from "./context/CartContext"
import { AuthProvider } from "./context/AuthContext"
import "./index.css"
import App from "./App.jsx"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <CartProvider>
                    <AuthProvider>
                        <App />
                        <Toaster
                            position="top-center"
                            containerClassName="!top-[5.5rem]"
                            toastOptions={{
                                duration: 4000,
                                style: {
                                    background: "rgba(255,255,255,0.94)",
                                    backdropFilter: "blur(12px)",
                                    WebkitBackdropFilter: "blur(12px)",
                                    border: "1px solid rgba(255,255,255,0.65)",
                                    borderRadius: "16px",
                                    boxShadow:
                                        "0 18px 45px rgba(15,23,42,0.12)",
                                    color: "#0f172a",
                                    padding: "14px 18px",
                                    maxWidth: "420px",
                                },
                                success: {
                                    iconTheme: {
                                        primary: "#059669",
                                        secondary: "#fff",
                                    },
                                },
                                error: {
                                    iconTheme: {
                                        primary: "#dc2626",
                                        secondary: "#fff",
                                    },
                                },
                            }}
                        />
                    </AuthProvider>
                </CartProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
)
