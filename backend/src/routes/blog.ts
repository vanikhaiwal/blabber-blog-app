import { Hono } from 'hono'
import { createBlogInput, updateBlogInput } from "@vani_k/medium-blog";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>()

blogRouter.use('/*', async (c, next) => {
    const authheader = c.req.header("authorization") || ""
    try {
        const user = await verify(authheader, c.env.JWT_SECRET)
        if (user && typeof user.id === "string") {
            c.set("userId", user.id)
            await next()
        } else {
            c.status(403)
            return c.json({ error: "You are not logged in" })
        }
    } catch (e) {
        c.status(403)
        return c.json({ error: "You are not logged in" })
    }

})

blogRouter.post('/', async (c) => {
    const body = await c.req.json()
    const { success } = createBlogInput.safeParse(body)
    if (!success) {
        c.status(400)
        return c.json({ error: "Invalid input" })
    }
    const authorId = c.get('userId')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })
    return c.json({ id: blog.id })
})

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const body = await c.req.json()
        const {success}= updateBlogInput.safeParse(body)
        if (!success) {
            c.status(400)
            return c.json({ error: "Invalid input" })
        }

        const blog = await prisma.blog.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        return c.json({ id: blog.id })
    } catch (error) {
        c.status(500);
        return c.json({ "Invalid": "Internal server error" });
    }
})

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.blog.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            author: {
                select: {
                    name: true
                }
            }
        }
        
    })
return c.json({ blogs })
})

    blogRouter.get('/:id', async (c) => {
        const id = c.req.param("id")
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        try {
            const blog = await prisma.blog.findFirst({
                where: {
                    id: id
                },
                select: {
                    id: true,
                    title: true,
                    content: true,
                    author: {
                        select: {
                            name: true
                        }
                    }
                }
            })
            if (!blog) {
                c.status(404)
                return c.json({ error: "Blog not found" })
            }
            return c.json(blog);
        } catch (error) {
            c.status(500);
            return c.json({ "Invalid": "Internal server error" });
        }
    })


    blogRouter.delete('/:id', async (c) => {
  const id = c.req.param('id');
  const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

  if (!id) {
    return c.json({ error: 'Post ID is required' }, 400);
  }

  try {
    const deletedPost = await prisma.blog.delete({
      where: { id },
    });
    return c.json({ message: 'Post deleted successfully', deletedPost });
  } catch (error) {
      return c.json({ error: 'Post not found' }, 404);
    }
  });


