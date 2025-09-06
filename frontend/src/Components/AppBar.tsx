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
              <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
            </Link>
            <div>
                <Avatar size="big" name="vani"/>
            </div>

        </div>
    )
}