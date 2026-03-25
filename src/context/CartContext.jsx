import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react"

const STORAGE_CART = "modern-devices-cart"
const STORAGE_SAVED = "modern-devices-saved"

/** @typedef {{ productId: string, name: string, price: number, image: string, quantity: number, maxStock: number }} CartLine */

function loadJson(key, fallback) {
    try {
        const raw = localStorage.getItem(key)
        if (!raw) return fallback
        const v = JSON.parse(raw)
        return Array.isArray(v) ? v : fallback
    } catch {
        return fallback
    }
}

function productToLine(product) {
    const imgs = product?.images
    const image =
        Array.isArray(imgs) && imgs.length
            ? String(imgs[0]).trim()
            : ""
    const max = Math.max(1, Number(product?.stock) || 999)
    return {
        productId: String(product._id),
        name: product.name,
        price: Number(product.price),
        image,
        quantity: 1,
        maxStock: max,
    }
}

function savedFromProduct(product) {
    const line = productToLine(product)
    return {
        productId: line.productId,
        name: line.name,
        price: line.price,
        image: line.image,
        maxStock: line.maxStock,
    }
}

const CartContext = createContext(null)

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => loadJson(STORAGE_CART, []))
    const [savedForLater, setSavedForLater] = useState(() =>
        loadJson(STORAGE_SAVED, [])
    )

    useEffect(() => {
        localStorage.setItem(STORAGE_CART, JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        localStorage.setItem(STORAGE_SAVED, JSON.stringify(savedForLater))
    }, [savedForLater])

    const addToCart = useCallback((product) => {
        if (!product?._id) return { ok: false, message: "Invalid product" }
        const stock = Number(product.stock) || 0
        if (stock < 1 || product.isActive === false) {
            return { ok: false, message: "This item is not available." }
        }

        const line = productToLine(product)

        setSavedForLater((prev) =>
            prev.filter((s) => s.productId !== line.productId)
        )

        setCart((prev) => {
            const i = prev.findIndex((c) => c.productId === line.productId)
            if (i === -1) {
                return [...prev, line]
            }
            const next = [...prev]
            const q = Math.min(next[i].quantity + 1, next[i].maxStock)
            next[i] = { ...next[i], quantity: q, maxStock: line.maxStock }
            return next
        })

        return { ok: true, message: "Added to Cart" }
    }, [])

    const saveForLater = useCallback((product) => {
        if (!product?._id) return { ok: false, message: "Invalid product" }

        const item = savedFromProduct(product)

        setCart((prev) => prev.filter((c) => c.productId !== item.productId))

        setSavedForLater((prev) => {
            if (prev.some((s) => s.productId === item.productId)) {
                return prev
            }
            return [...prev, item]
        })

        return { ok: true, message: "Saved for later" }
    }, [])

    const setQuantity = useCallback((productId, quantity) => {
        const q = Math.max(0, Math.floor(Number(quantity)))
        setCart((prev) => {
            if (q === 0) {
                return prev.filter((c) => c.productId !== productId)
            }
            return prev.map((c) =>
                c.productId === productId
                    ? { ...c, quantity: Math.min(q, c.maxStock) }
                    : c
            )
        })
    }, [])

    const removeFromCart = useCallback((productId) => {
        setCart((prev) => prev.filter((c) => c.productId !== productId))
    }, [])

    const moveSavedToCart = useCallback((productId) => {
        setSavedForLater((prevSaved) => {
            const saved = prevSaved.find((s) => s.productId === productId)
            if (!saved) return prevSaved

            setCart((prevCart) => {
                const i = prevCart.findIndex((c) => c.productId === productId)
                if (i === -1) {
                    return [
                        ...prevCart,
                        {
                            productId: saved.productId,
                            name: saved.name,
                            price: saved.price,
                            image: saved.image,
                            quantity: 1,
                            maxStock: saved.maxStock,
                        },
                    ]
                }
                const next = [...prevCart]
                const q = Math.min(next[i].quantity + 1, next[i].maxStock)
                next[i] = { ...next[i], quantity: q }
                return next
            })

            return prevSaved.filter((s) => s.productId !== productId)
        })
    }, [])

    const removeFromSaved = useCallback((productId) => {
        setSavedForLater((prev) => prev.filter((s) => s.productId !== productId))
    }, [])

    const cartItemCount = useMemo(
        () => cart.reduce((n, c) => n + c.quantity, 0),
        [cart]
    )

    const cartSubtotal = useMemo(
        () => cart.reduce((sum, c) => sum + c.price * c.quantity, 0),
        [cart]
    )

    const value = useMemo(
        () => ({
            cart,
            savedForLater,
            addToCart,
            saveForLater,
            setQuantity,
            removeFromCart,
            moveSavedToCart,
            removeFromSaved,
            cartItemCount,
            cartSubtotal,
        }),
        [
            cart,
            savedForLater,
            addToCart,
            saveForLater,
            setQuantity,
            removeFromCart,
            moveSavedToCart,
            removeFromSaved,
            cartItemCount,
            cartSubtotal,
        ]
    )

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) {
        throw new Error("useCart must be used within CartProvider")
    }
    return ctx
}
