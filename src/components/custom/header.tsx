
import  Link  from "next/link"
import { ModeToggle } from "./Toggle"
import DisplayLink from "./Link";
import DispBtn from "./DisplayBtn";
import Image from "next/image";
import img from '../../../public/assets/images/logo.svg'

import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";

import Menu from "./Menu";
import { links } from "../../utils/menu";
import { Button } from "../ui/button";

const header = () => {
  const {userId} = auth(); 
  return (
    <nav className="flex justify-between items-center my-4 w-full border-b-2 py-4">
     <Link href={"/"} className="flex gap-2 items-center justify-center">
      <Image src={img} alt="logo" width={30} height={30} ></Image>
      <span className="hidden sm:inline-block">Ai Prompt</span>
     </Link>
     <div className="hidden sm:flex items-center justify-center gap-6">
      {links.map((link)=>(<DisplayLink key={link.link} li= {link}></DisplayLink>))}
     </div>
     <div className="flex gap-4 items-center justify-center content-center">
     <ModeToggle></ModeToggle>
      {userId ?(<div className="flex items-center gap-4"> <UserButton afterSignOutUrl="/"></UserButton>  <Link className="hidden sm:flex" href={"/create-prompt"}><Button  className="w-full" variant={"custom"}>Create Prompt</Button></Link>
</div>):(<DispBtn></DispBtn>)}
     <Menu></Menu>
     </div>
     
    </nav>
  )
}

export default header
