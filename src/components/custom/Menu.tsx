
import { AlignRight } from "lucide-react";
import { links } from "../../utils/menu";
import DisplayLink from "./Link";
import { Separator } from "../ui/separator";
import { auth } from "@clerk/nextjs";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "../ui/sheet"
import { Button } from "../ui/button";
import Link from "next/link";

  export default function Menu (){
    const {userId} = auth(); 
    return (
      <div className="sm:hidden">
          <Sheet>
 <div> <SheetTrigger><AlignRight/></SheetTrigger></div>
  <SheetContent>
    <div className="flex flex-col gap-8 py-12">
        {links.map((link)=>(<><DisplayLink key={link.link} li= {link}></DisplayLink> <Separator/>
       </>))}
    </div>
 {userId ? (<Link href={"/create-prompt"}><Button  className="w-full" variant={"custom"}>Create Prompt</Button></Link>):(null)}
  </SheetContent>
</Sheet>
      </div>

    );
  }
  