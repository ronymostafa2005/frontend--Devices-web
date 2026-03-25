
import HeaderHomeLeft from "./HeaderHomeLeft"
import HeaderHomeRight from "./HeaderHomeRight"

export default function HeaderHome() {
    return (
        <section className="w-full">
            <div className="overflow-hidden rounded-[32px] border border-white/40 bg-[linear-gradient(135deg,rgba(255,255,255,0.28),rgba(255,255,255,0.1))] px-6 py-8 shadow-[0_25px_80px_rgba(40,64,96,0.14)] backdrop-blur-sm sm:px-10 sm:py-10 lg:rounded-[38px] lg:px-14 lg:py-14 xl:px-16 xl:py-16 2xl:px-20">
                <div className="grid items-center gap-14 xl:min-h-[680px] xl:grid-cols-[minmax(520px,0.92fr)_minmax(440px,1.08fr)] xl:gap-12 2xl:min-h-[720px] 2xl:grid-cols-[minmax(560px,0.95fr)_minmax(520px,1.05fr)] 2xl:gap-14">
                    <HeaderHomeLeft />
                    <HeaderHomeRight />
                </div>
            </div>
        </section>
    )
}   