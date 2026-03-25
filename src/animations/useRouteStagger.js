import { useLayoutEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import gsap from "gsap"
import { prefersReducedMotion } from "./motionPrefs"

/**
 * Animates page content on route change: all `section` nodes (tree order),
 * or the page root if there are no sections.
 */
export function useRouteStagger() {
    const containerRef = useRef(null)
    const { pathname } = useLocation()

    useLayoutEffect(() => {
        if (prefersReducedMotion()) return undefined

        const root = containerRef.current
        if (!root) return undefined

        const pageRoot = root.firstElementChild
        if (!pageRoot) return undefined

        const ctx = gsap.context(() => {
            const sections = pageRoot.querySelectorAll("section")

            if (sections.length > 0) {
                gsap.from(sections, {
                    opacity: 0,
                    y: 28,
                    duration: 0.55,
                    stagger: 0.09,
                    ease: "power3.out",
                    clearProps: "opacity,transform",
                })
            } else {
                gsap.from(pageRoot, {
                    opacity: 0,
                    y: 24,
                    duration: 0.55,
                    ease: "power3.out",
                    clearProps: "opacity,transform",
                })
            }
        }, root)

        return () => ctx.revert()
    }, [pathname])

    return containerRef
}
