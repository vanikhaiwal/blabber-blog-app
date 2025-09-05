import { Hono } from 'hono'
import { SignUpInput, SignInInput } from "@vani_k/medium-blog";
import { PrismaClient } from "@prisma/client/edge"
import {withAccelerate} from '@prisma/extension-accelerate'
import {sign, verify} from 'hono/jwt'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>()



userRouter.post('/signup',async(c)=>{
  const prisma=new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
   }).$extends(withAccelerate());

  const body= await c.req.json();

  const user = await prisma.user.create({
    data:{
      email: body.email,
      password: body.password,
      name: body.name
    },
  })
  //@ts-ignore
  const token = await sign({id: user.id }, c.env.JWT_SECRET)
  return c.json({jwt:token});
})
userRouter.post('/signin',async(c)=>{
  const prisma=new PrismaClient({
    datasourceUrl : c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try{
  const body= await c.req.json();
  const user= await prisma.user.findFirst({
    where:{
      email : body.email,
      password: body.password
    }
  })
    if(!user){
      c.status(403);
      return c.json({error:"User not found"});
    }
    const jwt = await sign({id: user.id}, c.env.JWT_SECRET)
    return c.json({jwt})
  } catch(error){
    c.status(500);
    return c.json({"Invalid": "Internal server error"});
  }
  })



