import {Avatar} from "./BlogCard"
import {Link} from "react-router-dom"
import BlabberLogo from "./BlabberLogo"

export const AppBar = ()=>{
    return(
        <div className="border-b flex justify-between px-10 py-4 mb-5">
            <div>
                 <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
                <BlabberLogo height={36} colorStart="#374151" colorEnd="#111827"  />
                </Link>
            </div>
            <div>
                <Avatar size="big" name="vani"/>
            </div>

        </div>
    )
}