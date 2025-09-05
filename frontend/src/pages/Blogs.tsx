import { BlogCard } from "../Components/BlogCard"
import { AppBar } from "../Components/AppBar"
import { useblogs } from "../hooks/index"
import { BlogSkeleton } from "../Components/BlogSkeleton"

export const Blogs = () => {
    const { blogs, loading } = useblogs()
    if (loading) {
        return (
            <div>
                <AppBar />
                <div className="flex justify-center ">
                    <div >
                        <BlogSkeleton/>
                        <BlogSkeleton/>
                        <BlogSkeleton/>
                        <BlogSkeleton/>
                        <BlogSkeleton/>

                    </div>
                </div>
            </div>
        )
    }

    return (<div>
        <AppBar />
        <div className="flex justify-center ">
            <div>
                {blogs.map(blog => <BlogCard
                    key={blog.id} 
                    id={blog.id}
                    title={blog.title}
                    content={blog.content}
                    authorName={blog.author.name || "Anonymous"}
                    publishedDate={"1 September 2025"}
                />)}

            </div>
        </div>
    </div>
    )

}
