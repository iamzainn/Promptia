'use client';

import { ChangeEvent, FormEvent, useRef } from "react"
import { Input } from "../ui/input"
import { useState } from "react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import {  toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import ClipLoader from "react-spinners/ClipLoader";



type dataType = {
  prompt:string,
  tags:string[]
}


const submitData = async(data:dataType)=>{
  try{
    const res = await fetch(`/api/prompt/create`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json', 
      },
      body: JSON.stringify(data), 
        
     })
     if(res.ok){
      return await res.json();
     }
     throw new Error("Error in posting prompt")
  }catch(err){
    console.log((err as Error).message)
  }
}

function customInput() {
  const router = useRouter()
  
  const [tagToggle,setTagToggle] = useState(false);
  const [tags,setTags] = useState<string[]>([]);
  const [prompt,setPrompt] = useState("");
  const tagRef = useRef<HTMLInputElement>(null!);

     const {mutate,isPending,isError,error}  = useMutation({
      mutationFn:submitData,
      onError:(e)=>{
          toast.error(e.message);
      },
      onSuccess:(data) =>{
          setPrompt("");
          setTags([])
          toast.success(data.message);
          setTimeout(() => {
            router.push('/', { scroll: false })
          }, 500);


           
      },
     })


    const submitFoam = async(e: FormEvent<HTMLFormElement>)=>{
     e.preventDefault();
     
     try{
       if(!prompt || tags.length<=0){
        toast.error("Invalid Input Must contain tags and Prompt")
        return
       }

       mutate({prompt,tags});
     }catch(e){
      
     }
    }
    const addData = (e:ChangeEvent<HTMLTextAreaElement>)=>{
      e.preventDefault();
      setPrompt(e.target.value);
    }
    const addTagButton = (e:ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
      if(e.target.value.length > 0){
        setTagToggle(true); 
         return;
      }
      setTagToggle(false);
    }
    const add = ()=>{
      setTags((pre)=> (!pre.includes(tagRef.current.value)) ?[...pre,tagRef.current.value]:pre)
    setTagToggle(false);
    tagRef.current.value="";

    }
   
    if(isError){
      toast.error(error.message)
    }

  return (
    <form  onSubmit={submitFoam} className="self-stretch flex flex-col gap-6" >
    <label htmlFor="" className="font-semibold" >Your Ai Prompt</label> 
     <textarea className="w-full p-4 pt-3 border-2 rounded-lg border-gray-200" value={prompt} onChange={addData} rows={10}   id="prompt"></textarea>
     <label htmlFor="" className="font-semibold">Tags</label> 
     <Input className="" placeholder="#tag" ref={tagRef} onChange={addTagButton} id="tag"></Input>
     {tagToggle ? <Button onClick={add}  variant={"secondary"}>Add Tag</Button>:null}
     <Button type="submit" variant={"outline"} disabled={prompt==="" || tags.length<=0}>{isPending ? <>
      <ClipLoader
        color={"grey"}
        size={25}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
     </>:"Create a Prompt"}</Button>
    </form>
  )
}

export default customInput
