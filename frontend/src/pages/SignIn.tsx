import { Quote } from "../Components/Quote"
import {Auth} from "../Components/Auth"

export const SignIn =()=>{
        return (
        <div>
        <div className="grid grid-cols-1 lg:grid-cols-2" >
            <div className="text-black">
                <Auth type="SignIn"/>
            </div>
            <div className="hidden lg:block">
                <Quote />
            </div>
        </div>
        </div>
    )
}