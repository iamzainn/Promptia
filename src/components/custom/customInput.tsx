'use client';

import { ChangeEvent, FormEvent } from "react"
import { Input } from "../ui/input"
import { useState } from "react";
import { Button } from "../ui/button";


function customInput() {
    const [tagBtn,setTagBtn] = useState(false);
    const [tag,setTag] = useState("");
     const [promptData,setPromptData] = useState({
      prompt:"",
      tags:[""],
     })

    const submitFoam = async(e: FormEvent<HTMLFormElement>)=>{
     e.preventDefault();
     try{

     }catch(e){
      
     }
    }
    const addData = (e:ChangeEvent<HTMLTextAreaElement>)=>{
      setPromptData((pre)=>({...pre,[e.target.id]:e.target.value}))
    }
    const addTagButton = (e:ChangeEvent<HTMLInputElement>)=>{

      if(e.target.value.length>0){
        console.log("here");
        setTagBtn(true);
        return
      }
      setTagBtn(false);
    }
    const add = ()=>{
      setPromptData(pre=>({...pre,tags:[...pre.tags,tag]}))
      setTag("")
      setTagBtn(false);
    }

  return (
    <form  onSubmit={submitFoam} className="self-stretch flex flex-col gap-6" >
    <label htmlFor="" className="font-semibold" >Your Ai Prompt</label> 
     <textarea className="w-full p-4 pt-3 border-4 border-gray-500"  onChange={addData} rows={10}   id="prompt"></textarea>
     <label htmlFor="" className="font-semibold">Tags</label> 
     <Input className="" placeholder="#tag" onChange={addTagButton} id="tag"></Input>
     {tagBtn ? <Button onClick={add} >Add</Button>:null}
     <button type="submit" >Create a Post</button>
    </form>
  )
}

export default customInput
