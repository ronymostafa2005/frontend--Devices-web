import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { prefersReducedMotion } from "./motionPrefs"

/**
 * Staggers product cards when the grid content changes (load / pagination).
 */
export function useProductGridStagger(depsKey) {
    const gridRef = useRef(null)

    useLayoutEffect(() => {
        if (prefersReducedMotion()) return undefined
        if (depsKey == null || depsKey === "") return undefined

        const grid = gridRef.current
        if (!grid) return undefined

        const cards = grid.querySelectorAll("[data-stagger-card]")
        if (!cards.length) return undefined

        const ctx = gsap.context(() => {
            gsap.from(cards, {
                opacity: 0,
                y: 20,
                scale: 0.98,
                duration: 0.42,
                stagger: 0.055,
                ease: "power2.out",
                clearProps: "opacity,transform",
            })
        }, grid)

        return () => ctx.revert()
    }, [depsKey])

    return gridRef
}
