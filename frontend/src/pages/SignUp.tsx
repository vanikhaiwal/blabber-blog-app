import { Quote } from "../Components/Quote"
import {Auth} from "../Components/Auth"

export const SignUp = () => {
    return (<div>
        <div className="grid grid-cols-2" >
            <div className="text-black">
                <Auth type="SignUp"/>
            </div>
            <div className="invisible lg:visible">
                <Quote />
            </div>
        </div>
        </div>
   
    )
}