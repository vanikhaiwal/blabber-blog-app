import {useState, useEffect} from "react"
import {BACKEND_URL} from "../config"
import axios from "axios"

export interface Blogs {
    id:string;
    title: string,
    content: string,
    author :{
        name:string;
    }

}
export const useblog = ({id}: {id:string}) =>{
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blogs>();

    useEffect(()=>{
        try{
             axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            }) .then(response=>{
                setBlog(response.data)
                setLoading(false)
            })
        }catch (e){
         alert("error getting blog")
        }

    },[id])
    return {
        loading,
        blog
    }

}
export const useblogs = () =>{
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blogs[]>([]);

    useEffect(()=>{
        try{
            axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
                headers: {
                    Authorization : localStorage.getItem("token")
                }
            }) .then((response)=>{
                setBlogs(response.data.blogs)
                setLoading(false)
            })
        } catch(e){
            console.log("error fetching blogs")
        }

    },[])
    return{
        loading,
        blogs
    }

}