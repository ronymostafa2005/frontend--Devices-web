import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"

function firstImageUrl(product) {
    const list = product?.images
    if (!Array.isArray(list)) return null
    const raw = list.find((u) => typeof u === "string" && u.trim())
    return raw ? raw.trim() : null
}

export default function ProductCard({ product }) {
    const fallback = useMemo(() => {
        const label = (product.name || "Product").slice(0, 22)
        return `https://placehold.co/800x600/0f766e/ffffff?text=${encodeURIComponent(label)}`
    }, [product.name])

    const primary = firstImageUrl(product)
    const [src, setSrc] = useState(primary || fallback)

    useEffect(() => {
        const next = firstImageUrl(product)
        setSrc(next || fallback)
    }, [product._id, product.images, fallback])

    const handleError = () => {
        setSrc((current) => (current === fallback ? current : fallback))
    }

    return (
        <Link
            to={`/products/${product._id}`}
            data-stagger-card
            className="group block overflow-hidden rounded-[22px] border border-white/45 bg-[linear-gradient(145deg,rgba(255,255,255,0.42),rgba(255,255,255,0.12))] shadow-[0_18px_45px_rgba(15,23,42,0.1)] backdrop-blur-md transition hover:border-emerald-300/50 hover:shadow-[0_22px_55px_rgba(16,185,129,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        >
        <article className="flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden bg-white/30">
                <img
                    src={src}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={handleError}
                />
                {!product.isActive && (
                    <span className="absolute right-3 top-3 rounded-full bg-amber-500/90 px-2.5 py-0.5 text-xs font-semibold text-white">
                        Inactive
                    </span>
                )}
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald-500/15 px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                        {product.category}
                    </span>
                    <span className="text-xs text-slate-500">
                        {product.stock != null ? `${product.stock} in stock` : ""}
                    </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 sm:text-xl">
                    {product.name}
                </h3>
                <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
                    {product.description}
                </p>
                <p className="mt-auto pt-2 text-2xl font-bold text-emerald-600">
                    ${Number(product.price).toFixed(2)}
                </p>
            </div>
        </article>
        </Link>
    )
}
