import { useEffect, useMemo, useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import headphoneImage from "../../../../assets/headphone-transparent.png"
import carouselHeadset1 from "../../../../assets/carousel-headset-1-transparent.png"
import carouselHeadset2 from "../../../../assets/carousel-headset-2-transparent.png"
import carouselHeadset3 from "../../../../assets/carousel-headset-3-transparent.png"
import carouselHeadset4 from "../../../../assets/carousel-headset-4-transparent.png"
import carouselHeadset5 from "../../../../assets/carousel-headset-5-transparent.png"
import carouselHeadset6 from "../../../../assets/carousel-headset-6-transparent.png"
import "./HeaderHomeRight.css"

const carouselItems = [
    {
        id: 1,
        label: "Studio Mode",
        title: "Immersive Detail",
        preview: "Balanced sound with crisp highs and controlled bass for everyday listening.",
        details: "The A56 delivers a clean studio-like profile that keeps vocals, podcasts, and playlists sharp without overwhelming the mix.",
        image: headphoneImage,
        imageAlt: "A56 Headset"
    },
    {
        id: 2,
        label: "Gaming",
        title: "HyperX Edition",
        preview: "Bold red accents with a broadcast microphone for clear in-game communication.",
        details: "A focused gaming profile with punchy response, a strong boom mic, and a look designed to stand out on streaming setups.",
        image: carouselHeadset1,
        imageAlt: "Red gaming headset"
    },
    {
        id: 3,
        label: "Esports",
        title: "Blue Strike",
        preview: "Sharp angular styling with glowing blue details for a futuristic gaming setup.",
        details: "This variant leans into an aggressive gaming identity with illuminated accents and a performance-driven visual style.",
        image: carouselHeadset2,
        imageAlt: "Blue gaming headset"
    },
    {
        id: 4,
        label: "Comfort Fit",
        title: "Arctic White",
        preview: "Soft neutral finish with padded earcups and a lightweight over-ear structure.",
        details: "A cleaner, softer look for users who want extended comfort without sacrificing the visual presence of the headset.",
        image: carouselHeadset3,
        imageAlt: "White headset"
    },
    {
        id: 5,
        label: "Neon Core",
        title: "Green Pulse",
        preview: "Dark shell with vivid green lighting that gives the card a dramatic hero look.",
        details: "Built for visual impact, this version adds brighter contrast and a more aggressive energy for gaming-focused product lines.",
        image: carouselHeadset4,
        imageAlt: "Black and green gaming headset"
    },
    {
        id: 6,
        label: "Wireless",
        title: "Urban Cyan",
        preview: "Rounded earcups with turquoise details for a sleek modern lifestyle option.",
        details: "A cleaner wireless silhouette with subtle cyan accents that fit music, work, and day-to-day mobile use.",
        image: carouselHeadset5,
        imageAlt: "Black wireless headset with cyan accents"
    },
    {
        id: 7,
        label: "Lifestyle",
        title: "Lavender JBL",
        preview: "Soft pastel finish for a calmer, fashion-forward wireless product presentation.",
        details: "This version adds a playful softer tone to the carousel while still feeling premium, compact, and easy to wear.",
        image: carouselHeadset6,
        imageAlt: "Purple wireless headset"
    }
]

function getCarouselRadius(width) {
    if (width < 480) return 124
    if (width < 768) return 140
    if (width < 1024) return 180
    if (width < 1280) return 208
    return 236
}

export default function HeaderHomeRight() {
    const [viewportWidth, setViewportWidth] = useState(() =>
        typeof window === "undefined" ? 1440 : window.innerWidth
    )
    const [currentIndex, setCurrentIndex] = useState(0)
    const [flippedCardId, setFlippedCardId] = useState(null)

    const totalCards = carouselItems.length
    const angleStep = 360 / totalCards
    const radius = getCarouselRadius(viewportWidth)

    useEffect(() => {
        const handleResize = () => setViewportWidth(window.innerWidth)

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const cards = useMemo(() => {
        return carouselItems.map((item, index) => {
            const cardAngle = angleStep * index
            const isActive = index === currentIndex

            return {
                ...item,
                index,
                isActive,
                transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`
            }
        })
    }, [angleStep, currentIndex, radius])

    const rotateTo = (nextIndex) => {
        const normalizedIndex = (nextIndex + totalCards) % totalCards
        setCurrentIndex(normalizedIndex)
        setFlippedCardId(null)
    }

    const handlePrev = () => rotateTo(currentIndex - 1)
    const handleNext = () => rotateTo(currentIndex + 1)

    const toggleFlip = (cardId, cardIndex) => {
        if (cardIndex !== currentIndex) {
            rotateTo(cardIndex)
            return
        }

        setFlippedCardId((currentCardId) => (currentCardId === cardId ? null : cardId))
    }

    return (
        <div className="header-carousel-wrap">
            <div className="header-carousel-bg" />
            <div className="header-carousel-shell">
                <div className="header-carousel-title">
                    <span>Premium Material Collection</span>
                    <p>Discover leather, mesh, soft-touch, and metallic finishes across our headset lineup.</p>
                </div>

                <div className="header-carousel-container">
                    <div
                        className="header-carousel"
                        style={{ transform: `rotateY(${-currentIndex * angleStep}deg)` }}
                    >
                        {cards.map((card) => (
                            <article
                                key={card.id}
                                className={`header-memory-card ${card.isActive ? "is-active" : ""} ${flippedCardId === card.id ? "is-flipped" : ""}`}
                                style={{ transform: card.transform }}
                                onClick={() => toggleFlip(card.id, card.index)}
                            >
                                <div className="header-memory-card-inner">
                                    <div className="header-memory-card-face header-memory-card-front">
                                        <div className="header-memory-card-content">
                                            <span className="header-memory-label">{card.label}</span>
                                            <h3>{card.title}</h3>
                                            <div className="header-memory-image">
                                                <img src={card.image} alt={card.imageAlt} draggable="false" />
                                                <div className="header-memory-glitch" />
                                            </div>
                                            <p>{card.preview}</p>
                                        </div>
                                    </div>

                                    <div className="header-memory-card-face header-memory-card-back">
                                        <div className="header-memory-card-content">
                                            <span className="header-memory-label">A56 Headset</span>
                                            <h3>{card.title}</h3>
                                            <p>{card.details}</p>
                                            <div className="header-memory-meta">
                                                <span>Product card {card.id}</span>
                                                <span>Westmire audio</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="header-carousel-controls">
                    <button type="button" onClick={handlePrev} aria-label="Show previous product card">
                        <FaChevronLeft />
                    </button>
                    <button type="button" onClick={handleNext} aria-label="Show next product card">
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </div>
    )
}