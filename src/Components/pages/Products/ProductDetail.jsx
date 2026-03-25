import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FaArrowLeft, FaBolt, FaLayerGroup, FaShieldAlt, FaTruck } from "react-icons/fa"
import toast from "react-hot-toast"
import { useApiGet } from "../../../hooks/useApi"
import { useCart } from "../../../context/CartContext"

function imageList(product) {
    const list = product?.images
    if (!Array.isArray(list)) return []
    return list.filter((u) => typeof u === "string" && u.trim()).map((u) => u.trim())
}

export default function ProductDetail() {
    const { productId } = useParams()
    const navigate = useNavigate()
    const [activeImg, setActiveImg] = useState(0)
    const { addToCart, saveForLater } = useCart()

    const { data, isPending, isError, error } = useApiGet(
        ["product", productId],
        `/api/v1/products/${productId}`,
        {
            enabled: Boolean(productId),
            staleTime: 0,
            refetchOnMount: "always",
        }
    )

    const product = data?.success ? data.data : null

    const images = useMemo(() => (product ? imageList(product) : []), [product])

    useEffect(() => {
        setActiveImg(0)
    }, [productId])

    const fetchError = isError
        ? error?.response?.data?.message ||
          error?.message ||
          "Could not load product."
        : null

    const notFound =
        data !== undefined && data.success === false && !isError
            ? data.message || "Product not found."
            : null

    const errMsg = fetchError || notFound

    if (isPending) {
        return (
            <section className="w-full animate-pulse">
                <div className="overflow-hidden rounded-[32px] border border-white/40 bg-white/20 p-6 sm:p-10 lg:p-14">
                    <div className="mb-8 h-4 w-40 rounded-full bg-white/40" />
                    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
                        <div className="aspect-[4/3] rounded-[28px] bg-white/30" />
                        <div className="space-y-4">
                            <div className="h-10 w-4/5 rounded-xl bg-white/35" />
                            <div className="h-14 w-1/3 rounded-xl bg-emerald-200/30" />
                            <div className="h-24 rounded-2xl bg-white/25" />
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    if (errMsg || !product) {
        return (
            <section className="w-full">
                <div className="overflow-hidden rounded-[32px] border border-red-200/60 bg-red-50/80 px-8 py-16 text-center backdrop-blur-sm">
                    <p className="text-lg font-semibold text-red-800">{errMsg || "Not found"}</p>
                    <button
                        type="button"
                        onClick={() => navigate("/products")}
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700"
                    >
                        <FaArrowLeft className="text-xs" />
                        Back to catalog
                    </button>
                </div>
            </section>
        )
    }

    const mainSrc = images[activeImg] || null
    const price = Number(product.price).toFixed(2)
    const inStock = product.stock != null && product.stock > 0
    const created = product.createdAt
        ? new Date(product.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
          })
        : null

    return (
        <section className="w-full">
            <div className="overflow-hidden rounded-[32px] border border-white/45 bg-[linear-gradient(145deg,rgba(255,255,255,0.38),rgba(255,255,255,0.08))] shadow-[0_28px_90px_rgba(40,64,96,0.12)] backdrop-blur-md sm:rounded-[36px]">
                <div className="border-b border-white/30 bg-white/15 px-5 py-4 sm:px-8 sm:py-5">
                    <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 font-semibold text-emerald-700 transition hover:text-emerald-800"
                        >
                            <FaArrowLeft className="text-xs" />
                            Catalog
                        </Link>
                        <span className="text-slate-300">/</span>
                        <span className="max-w-[min(100%,28rem)] truncate font-medium text-slate-800">
                            {product.name}
                        </span>
                    </nav>
                </div>

                <div className="grid gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)] lg:gap-12 lg:p-10 xl:p-12">
                    <div className="space-y-5">
                        <div className="group relative overflow-hidden rounded-[28px] border border-white/50 bg-[linear-gradient(160deg,rgba(255,255,255,0.5),rgba(255,255,255,0.12))] shadow-inner ring-1 ring-white/30">
                            <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/11] lg:aspect-[5/4]">
                                {mainSrc ? (
                                    <img
                                        src={mainSrc}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center bg-slate-100/50 text-slate-400">
                                        No image
                                    </div>
                                )}
                                {!product.isActive && (
                                    <span className="absolute left-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-md">
                                        Unavailable
                                    </span>
                                )}
                            </div>
                        </div>

                        {images.length > 1 && (
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {images.map((src, i) => (
                                    <button
                                        key={src + i}
                                        type="button"
                                        onClick={() => setActiveImg(i)}
                                        className={`relative h-16 w-20 overflow-hidden rounded-xl border-2 transition sm:h-20 sm:w-24 ${
                                            i === activeImg
                                                ? "border-emerald-500 ring-2 ring-emerald-400/40"
                                                : "border-white/50 opacity-80 hover:opacity-100"
                                        }`}
                                    >
                                        <img
                                            src={src}
                                            alt=""
                                            className="h-full w-full object-cover"
                                            referrerPolicy="no-referrer"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-8">
                        <div>
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
                                    {product.category}
                                </span>
                                {inStock ? (
                                    <span className="rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-800">
                                        In stock · {product.stock} units
                                    </span>
                                ) : (
                                    <span className="rounded-full bg-rose-500/15 px-3 py-1 text-xs font-semibold text-rose-800">
                                        Out of stock
                                    </span>
                                )}
                            </div>
                            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.35rem] lg:leading-tight">
                                {product.name}
                            </h1>
                            <p className="mt-5 text-4xl font-black tabular-nums text-emerald-600 sm:text-5xl">
                                ${price}
                            </p>
                            <p className="mt-2 text-sm text-slate-500">Taxes calculated at checkout · USD</p>
                        </div>

                        <div className="rounded-2xl border border-white/55 bg-white/25 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-sm sm:p-6">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                Overview
                            </h2>
                            <p className="mt-3 text-base leading-relaxed text-slate-700 sm:text-lg">
                                {product.description}
                            </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="flex items-start gap-3 rounded-2xl border border-white/50 bg-white/20 p-4 backdrop-blur-sm">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-700">
                                    <FaTruck className="text-lg" />
                                </span>
                                <div>
                                    <p className="text-xs font-bold uppercase text-slate-500">Fulfillment</p>
                                    <p className="text-sm font-semibold text-slate-800">Fast dispatch</p>
                                    <p className="text-xs text-slate-600">Tracked delivery options</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 rounded-2xl border border-white/50 bg-white/20 p-4 backdrop-blur-sm">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-700">
                                    <FaShieldAlt className="text-lg" />
                                </span>
                                <div>
                                    <p className="text-xs font-bold uppercase text-slate-500">Coverage</p>
                                    <p className="text-sm font-semibold text-slate-800">Warranty ready</p>
                                    <p className="text-xs text-slate-600">Standard device support</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 rounded-2xl border border-white/50 bg-white/20 p-4 backdrop-blur-sm">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-800">
                                    <FaBolt className="text-lg" />
                                </span>
                                <div>
                                    <p className="text-xs font-bold uppercase text-slate-500">Smart</p>
                                    <p className="text-sm font-semibold text-slate-800">Connected ready</p>
                                    <p className="text-xs text-slate-600">Works with modern ecosystems</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 rounded-2xl border border-white/50 bg-white/20 p-4 backdrop-blur-sm">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-800">
                                    <FaLayerGroup className="text-lg" />
                                </span>
                                <div>
                                    <p className="text-xs font-bold uppercase text-slate-500">Reference</p>
                                    <p
                                        className="truncate font-mono text-xs font-semibold text-slate-800 sm:text-sm"
                                        title={product._id}
                                    >
                                        ID {String(product._id).slice(-8).toUpperCase()}
                                    </p>
                                    {created && (
                                        <p className="text-xs text-slate-600">Listed {created}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <button
                                type="button"
                                disabled={!inStock || !product.isActive}
                                onClick={() => {
                                    const r = addToCart(product)
                                    if (r.ok) {
                                        toast.success(
                                            "Added to cart — check the cart icon above."
                                        )
                                    } else {
                                        toast.error(r.message)
                                    }
                                }}
                                className="flex-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 text-center text-base font-bold text-white shadow-[0_14px_40px_rgba(16,185,129,0.35)] transition hover:from-emerald-600 hover:to-teal-700 disabled:cursor-not-allowed disabled:opacity-45"
                            >
                                {inStock && product.isActive ? "Add to cart" : "Notify me"}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    const r = saveForLater(product)
                                    if (r.ok) {
                                        toast.success(
                                            "Saved for later — open Cart to see it."
                                        )
                                    } else {
                                        toast.error(r.message)
                                    }
                                }}
                                className="rounded-2xl border-2 border-white/70 bg-white/40 px-6 py-4 text-center text-base font-bold text-slate-800 backdrop-blur-sm transition hover:bg-white/70"
                            >
                                Save for later
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
