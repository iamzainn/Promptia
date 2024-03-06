import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prismaClient";
import {auth} from '@clerk/nextjs';

export async function POST(req:Request,res:Response) { 
  const {prompt,tags} = await req.json();
  const user = auth();
  try{
    const nPrompt = await prisma.prompt.create({
        data:{
          text:prompt,
          userId:user.userId as string,
          tags: { set: tags }
        }
    }) 
    await prisma.user.update({
        where:{clerkId:user.userId as string},data:{
          prompts:{
            connect: { id: nPrompt.id },
          }
        }
    })
    return NextResponse.json({message:"Prompt created successfully",nPrompt},{status:201});
  }catch(e){
    return NextResponse.json({message:"Error",e},{status:400});

  }
  
  
}