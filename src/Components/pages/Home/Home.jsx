import HeaderHome from "./Component-Home/HeaderHome"
import HomeSections from "./Component-Home/HomeSections"

export default function Home() {
    return (
        <div className="w-full pb-4">
            <HeaderHome />
            <HomeSections />
        </div>
    )
}