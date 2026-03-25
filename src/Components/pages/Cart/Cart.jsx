import { Link } from "react-router-dom"
import { FaBookmark, FaShoppingCart, FaTrash } from "react-icons/fa"
import { useCart } from "../../../context/CartContext"

export default function Cart() {
    const {
        cart,
        savedForLater,
        setQuantity,
        removeFromCart,
        moveSavedToCart,
        removeFromSaved,
        cartItemCount,
        cartSubtotal,
    } = useCart()

    return (
        <section className="w-full">
            <div className="overflow-hidden rounded-[32px] border border-white/45 bg-[linear-gradient(145deg,rgba(255,255,255,0.35),rgba(255,255,255,0.08))] shadow-[0_25px_80px_rgba(40,64,96,0.12)] backdrop-blur-md">
                <div className="border-b border-white/35 bg-white/15 px-6 py-5 sm:px-10">
                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                        Shopping Cart
                    </h1>
                    <p className="mt-1 text-sm text-slate-600">
                        {cartItemCount === 0
                            ? "Your cart is empty."
                            : `${cartItemCount} item${cartItemCount === 1 ? "" : "s"} in cart`}
                    </p>
                </div>

                <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_320px] lg:gap-12">
                    <div className="space-y-10">
                        <div>
                            <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-500">
                                <FaShoppingCart className="text-emerald-600" />
                                Cart
                            </h2>
                            {cart.length === 0 ? (
                                <p className="rounded-2xl border border-white/50 bg-white/20 px-6 py-10 text-center text-slate-600">
                                    Nothing here yet.{" "}
                                    <Link
                                        to="/products"
                                        className="font-semibold text-emerald-700 underline"
                                    >
                                        Browse products
                                    </Link>
                                </p>
                            ) : (
                                <ul className="space-y-4">
                                    {cart.map((line) => (
                                        <li
                                            key={line.productId}
                                            className="flex flex-col gap-4 rounded-2xl border border-white/50 bg-white/25 p-4 backdrop-blur-sm sm:flex-row sm:items-center"
                                        >
                                            <Link
                                                to={`/products/${line.productId}`}
                                                className="flex shrink-0 gap-4"
                                            >
                                                <div className="h-24 w-24 overflow-hidden rounded-xl border border-white/40 bg-white/40">
                                                    {line.image ? (
                                                        <img
                                                            src={line.image}
                                                            alt=""
                                                            className="h-full w-full object-cover"
                                                            referrerPolicy="no-referrer"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center text-xs text-slate-400">
                                                            No img
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="font-semibold text-slate-900 hover:text-emerald-700">
                                                        {line.name}
                                                    </p>
                                                    <p className="mt-1 text-lg font-bold text-emerald-600">
                                                        ${line.price.toFixed(2)}
                                                    </p>
                                                </div>
                                            </Link>
                                            <div className="flex flex-wrap items-center gap-3 sm:ml-auto">
                                                <label className="flex items-center gap-2 text-sm text-slate-600">
                                                    Qty
                                                    <select
                                                        value={line.quantity}
                                                        onChange={(e) =>
                                                            setQuantity(
                                                                line.productId,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="rounded-lg border border-white/60 bg-white/70 px-2 py-1.5 text-sm font-semibold text-slate-800"
                                                    >
                                                        {Array.from(
                                                            {
                                                                length: Math.min(
                                                                    line.maxStock,
                                                                    50
                                                                ),
                                                            },
                                                            (_, i) => i + 1
                                                        ).map((n) => (
                                                            <option key={n} value={n}>
                                                                {n}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(line.productId)}
                                                    className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                                                >
                                                    <FaTrash className="text-[10px]" />
                                                    Remove
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div>
                            <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-500">
                                <FaBookmark className="text-amber-600" />
                                Saved for later
                            </h2>
                            {savedForLater.length === 0 ? (
                                <p className="rounded-2xl border border-dashed border-white/50 bg-white/10 px-6 py-8 text-center text-sm text-slate-500">
                                    Items you save will appear here — like on Amazon.
                                </p>
                            ) : (
                                <ul className="space-y-4">
                                    {savedForLater.map((item) => (
                                        <li
                                            key={item.productId}
                                            className="flex flex-col gap-3 rounded-2xl border border-white/50 bg-white/20 p-4 backdrop-blur-sm sm:flex-row sm:items-center"
                                        >
                                            <Link
                                                to={`/products/${item.productId}`}
                                                className="flex gap-4"
                                            >
                                                <div className="h-20 w-20 overflow-hidden rounded-lg border border-white/40 bg-white/40">
                                                    {item.image ? (
                                                        <img
                                                            src={item.image}
                                                            alt=""
                                                            className="h-full w-full object-cover"
                                                            referrerPolicy="no-referrer"
                                                        />
                                                    ) : null}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900">
                                                        {item.name}
                                                    </p>
                                                    <p className="font-bold text-emerald-600">
                                                        ${item.price.toFixed(2)}
                                                    </p>
                                                </div>
                                            </Link>
                                            <div className="flex flex-wrap gap-2 sm:ml-auto">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        moveSavedToCart(item.productId)
                                                    }
                                                    className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                                >
                                                    Add to cart
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeFromSaved(item.productId)
                                                    }
                                                    className="rounded-full border border-white/60 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white/60"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <aside className="h-fit rounded-2xl border border-white/55 bg-white/30 p-6 shadow-inner backdrop-blur-md">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                            Order summary
                        </h3>
                        <p className="mt-4 text-sm text-slate-600">Subtotal</p>
                        <p className="text-2xl font-black text-slate-900">
                            ${cartSubtotal.toFixed(2)}
                        </p>
                        <p className="mt-2 text-xs text-slate-500">
                            Shipping & taxes at checkout (demo).
                        </p>
                        <button
                            type="button"
                            disabled={cart.length === 0}
                            className="mt-6 w-full rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 py-3 text-sm font-bold text-white shadow-md transition hover:from-amber-500 hover:to-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Proceed to checkout
                        </button>
                        <Link
                            to="/products"
                            className="mt-3 block w-full rounded-xl border-2 border-white/70 py-3 text-center text-sm font-bold text-slate-800 transition hover:bg-white/50"
                        >
                            Continue shopping
                        </Link>
                    </aside>
                </div>
            </div>
        </section>
    )
}
