import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'

import { prisma } from '../../../../prisma/prismaClient'

 
export async function POST(req: Request) {
 
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
 
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }
 
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");
 
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }
 
  const payload = await req.json()
  const body = JSON.stringify(payload);
 
  const wh = new Webhook(WEBHOOK_SECRET);
 
  let evt: WebhookEvent
 
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }
 
  
    const { id, ...attributes } = evt.data;
  

    if(evt.type ==='user.created'){
       console.log("user created")
      try {
       const newUser = await prisma.user.create({
        data:{
          clerkId:id as string,
          attributes:attributes as any
        }
       })

       return new Response(newUser as any,{status:201});

      } catch (error) {
        console.log(error);
        console.error("Error creating user : \n", error);
      } 
    }

    else if(evt.type ==='user.deleted'){
      try {
        console.log("user deleted")
         await prisma.user.delete({
          where:{
            clerkId:id 
          }
         })
         return new Response ("user deleted",{status:200});
        }

      catch (error) {
        console.log(error);
        console.error("Error in deleting user : \n", error);
      } 
    }
    else if (evt.type === 'user.updated'){
      try{
        console.log("user updated")
        const updateUser = await prisma.user.update({
          where: {
            clerkId: id,
          },
          data: {
            attributes:attributes as any
          },
        })
        return new Response(updateUser as any,{status:200});
      }
      catch(e){
       console.error("error in updating user \n " + e);
      }
    }   
}
 