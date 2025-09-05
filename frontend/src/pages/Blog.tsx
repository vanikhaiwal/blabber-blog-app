import {useblog} from "../hooks/index"
import { AppBar } from "../Components/AppBar"
import { useParams } from "react-router-dom"
import {FullBlog} from "../Components/FullBlog"
import {Spinner} from "../Components/Spinner"

export const Blog =()=>{
    const {id} = useParams();
    const {loading,blog} = useblog({id:id || ""});

   if (loading || !blog) {
        return <div>
            <AppBar />
        
            <div className="h-screen flex flex-col justify-center">
                
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        </div>
    }
    return(
        <div>
            <AppBar/>
            <div>
                <FullBlog blog={blog}/>
            </div>
        </div>
    )
}