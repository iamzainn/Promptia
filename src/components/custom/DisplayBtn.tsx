"use client";
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { Button } from '../ui/button';

const displayBtn = () => {
    const pathname = usePathname()
    const path = (pathname.split("/")[1]);
;
  return (
   <>
   {path ==='sign-in' ? (<Link href={"/sign-up"}>
   <Button size={"sm"}  variant={"custom"}>Sign up</Button>
   </Link>):(<Link href={"/sign-in"}>
   <Button size={"sm"}  variant={"custom"}>Sign in</Button>
   </Link>)}
   </>
  )
}

export default displayBtn
