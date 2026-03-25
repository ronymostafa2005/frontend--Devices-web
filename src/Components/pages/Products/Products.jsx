import { useEffect, useMemo, useState } from "react"
import { useProductGridStagger } from "../../../animations/useProductGridStagger"
import { useApiGet } from "../../../hooks/useApi"
import ProductCard from "./ProductCard"

const LIMIT_OPTIONS = [12, 24, 48]

export default function Products() {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(12)
    const [searchInput, setSearchInput] = useState("")
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("all")
    const [priceMin, setPriceMin] = useState("")
    const [priceMax, setPriceMax] = useState("")
    const [sort, setSort] = useState("default")

    useEffect(() => {
        const t = setTimeout(() => {
            setSearch(searchInput.trim())
            setPage(1)
        }, 400)
        return () => clearTimeout(t)
    }, [searchInput])

    const { data: metaRes } = useApiGet(
        ["products", "meta"],
        "/api/v1/products/meta/summary",
        { staleTime: 0, gcTime: 5 * 60 * 1000, refetchOnMount: "always" }
    )

    const meta = metaRes?.success ? metaRes.data : null

    const listParams = useMemo(() => {
        const p = { page, limit }
        if (category !== "all") p.category = category
        if (search) p.search = search
        if (priceMin !== "") p.minPrice = priceMin
        if (priceMax !== "") p.maxPrice = priceMax
        if (sort !== "default") p.sort = sort
        return p
    }, [page, limit, category, search, priceMin, priceMax, sort])

    const { data, isPending, isError, error, isFetching } = useApiGet(
        ["products", "list"],
        "/api/v1/products",
        {
            params: listParams,
            staleTime: 0,
            gcTime: 5 * 60 * 1000,
            refetchOnMount: "always",
        }
    )

    const payload = data?.success ? data : null
    const items = Array.isArray(payload?.data) ? payload.data : []
    const pagination = payload?.pagination

    const fetchError = isError
        ? error?.response?.data?.message ||
          error?.message ||
          "Network error — is the backend running?"
        : null

    const businessError =
        data !== undefined && data.success === false
            ? data.message || "Could not load products"
            : null

    const errorMessage = fetchError || businessError

    const categories = useMemo(() => {
        const list = meta?.categories || []
        return ["all", ...list]
    }, [meta])

    const priceBounds = {
        min: meta?.priceMin ?? 0,
        max: meta?.priceMax ?? 0,
    }

    const resetFilters = () => {
        setSearchInput("")
        setSearch("")
        setCategory("all")
        setPriceMin("")
        setPriceMax("")
        setSort("default")
        setPage(1)
    }

    const loading = isPending && !data

    const gridStaggerKey =
        !loading && !errorMessage && items.length > 0
            ? `${page}-${items.map((p) => p._id).join(",")}`
            : null
    const productGridRef = useProductGridStagger(gridStaggerKey)

    const totalItems = pagination?.totalItems ?? 0
    const totalPages = pagination?.totalPages ?? 1
    const from = totalItems === 0 ? 0 : (page - 1) * limit + 1
    const to = Math.min(page * limit, totalItems)

    useEffect(() => {
        if (page > totalPages && totalPages >= 1) {
            setPage(totalPages)
        }
    }, [page, totalPages])

    return (
        <section className="w-full">
            <div className="overflow-hidden rounded-[32px] border border-white/40 bg-[linear-gradient(135deg,rgba(255,255,255,0.28),rgba(255,255,255,0.1))] px-5 py-8 shadow-[0_25px_80px_rgba(40,64,96,0.14)] backdrop-blur-sm sm:px-8 sm:py-10 lg:rounded-[38px] lg:px-12 lg:py-12">
                <header className="mb-8 max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                        Catalog
                    </p>
                    <h1 className="mt-1 text-3xl font-bold text-slate-800 sm:text-4xl">
                        Smart devices
                    </h1>
                    <p className="mt-2 text-slate-600">
                        Server-side filters and pagination. Total in store:{" "}
                        <span className="font-semibold text-slate-800">
                            {meta?.totalItems ?? "…"}
                        </span>
                        .
                    </p>
                </header>

                <div className="mb-8 rounded-[24px] border border-white/50 bg-white/25 p-4 shadow-inner backdrop-blur-md sm:p-6">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">
                            Filters
                        </h2>
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="rounded-full border border-white/60 bg-white/50 px-4 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-white"
                        >
                            Reset
                        </button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-600 sm:col-span-2 lg:col-span-1 xl:col-span-2">
                            Search
                            <input
                                type="search"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Name or description…"
                                className="rounded-xl border border-white/60 bg-white/60 px-3 py-2.5 text-sm font-normal text-slate-800 outline-none ring-emerald-500/30 placeholder:text-slate-400 focus:ring-2"
                            />
                        </label>
                        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-600">
                            Category
                            <select
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value)
                                    setPage(1)
                                }}
                                className="rounded-xl border border-white/60 bg-white/60 px-3 py-2.5 text-sm font-normal text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500/30"
                            >
                                {categories.map((c) => (
                                    <option key={c} value={c}>
                                        {c === "all" ? "All categories" : c}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-600">
                            Min price ($)
                            <input
                                type="number"
                                min={0}
                                step={1}
                                value={priceMin}
                                onChange={(e) => {
                                    setPriceMin(e.target.value)
                                    setPage(1)
                                }}
                                placeholder={String(priceBounds.min)}
                                className="rounded-xl border border-white/60 bg-white/60 px-3 py-2.5 text-sm font-normal text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500/30"
                            />
                        </label>
                        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-600">
                            Max price ($)
                            <input
                                type="number"
                                min={0}
                                step={1}
                                value={priceMax}
                                onChange={(e) => {
                                    setPriceMax(e.target.value)
                                    setPage(1)
                                }}
                                placeholder={String(priceBounds.max)}
                                className="rounded-xl border border-white/60 bg-white/60 px-3 py-2.5 text-sm font-normal text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500/30"
                            />
                        </label>
                        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-600 sm:col-span-2 lg:col-span-1 xl:col-span-1">
                            Sort
                            <select
                                value={sort}
                                onChange={(e) => {
                                    setSort(e.target.value)
                                    setPage(1)
                                }}
                                className="rounded-xl border border-white/60 bg-white/60 px-3 py-2.5 text-sm font-normal text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500/30"
                            >
                                <option value="default">Newest</option>
                                <option value="price-asc">Price: low → high</option>
                                <option value="price-desc">Price: high → low</option>
                                <option value="name">Name A–Z</option>
                            </select>
                        </label>
                        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-600 sm:col-span-2 lg:col-span-1">
                            Per page
                            <select
                                value={limit}
                                onChange={(e) => {
                                    setLimit(Number(e.target.value))
                                    setPage(1)
                                }}
                                className="rounded-xl border border-white/60 bg-white/60 px-3 py-2.5 text-sm font-normal text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500/30"
                            >
                                {LIMIT_OPTIONS.map((n) => (
                                    <option key={n} value={n}>
                                        {n}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <p className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span>
                            Results{" "}
                            <span className="font-semibold text-slate-700">
                                {from}–{to}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-slate-700">
                                {totalItems}
                            </span>
                            {meta &&
                                ` · store range $${Number(priceBounds.min).toFixed(2)} – $${Number(priceBounds.max).toFixed(2)}`}
                        </span>
                        {isFetching && !loading && (
                            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-800">
                                Updating…
                            </span>
                        )}
                    </p>
                </div>

                {loading && (
                    <p className="rounded-2xl border border-white/40 bg-white/20 px-6 py-10 text-center text-slate-600">
                        Loading products…
                    </p>
                )}

                {errorMessage && !loading && (
                    <p className="rounded-2xl border border-red-200/80 bg-red-50/80 px-6 py-10 text-center text-red-800">
                        {errorMessage}
                    </p>
                )}

                {!loading && !errorMessage && items.length === 0 && (
                    <p className="rounded-2xl border border-white/40 bg-white/20 px-6 py-10 text-center text-slate-600">
                        No products match your filters.
                    </p>
                )}

                {!loading && !errorMessage && items.length > 0 && (
                    <>
                        <div
                            ref={productGridRef}
                            className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                        >
                            {items.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>

                        <nav
                            className="mt-10 flex flex-col items-center justify-between gap-4 rounded-[20px] border border-white/50 bg-white/20 px-4 py-4 backdrop-blur-sm sm:flex-row sm:px-6"
                            aria-label="Pagination"
                        >
                            <p className="text-sm text-slate-600">
                                Page{" "}
                                <span className="font-semibold text-slate-800">
                                    {page}
                                </span>{" "}
                                of{" "}
                                <span className="font-semibold text-slate-800">
                                    {totalPages}
                                </span>
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-2">
                                <button
                                    type="button"
                                    disabled={!pagination?.hasPrevPage}
                                    onClick={() => {
                                        setPage((p) => Math.max(1, p - 1))
                                        window.scrollTo({ top: 0, behavior: "smooth" })
                                    }}
                                    className="rounded-full border border-white/60 bg-white/60 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Previous
                                </button>
                                <button
                                    type="button"
                                    disabled={!pagination?.hasNextPage}
                                    onClick={() => {
                                        setPage((p) => p + 1)
                                        window.scrollTo({ top: 0, behavior: "smooth" })
                                    }}
                                    className="rounded-full border border-white/60 bg-white/60 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Next
                                </button>
                            </div>
                        </nav>
                    </>
                )}
            </div>
        </section>
    )
}
