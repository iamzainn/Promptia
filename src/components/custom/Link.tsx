 'use client';
import { usePathname } from 'next/navigation'
import Link from 'next/link';

type LinkType = {
 li:{
  name:string,
  link:string
 }
}
const Linkk = ({li}:LinkType) => {
  const pathname = usePathname()
  
  
  const path = (pathname.split("/")[1]);
 

  return (
    <li key={li.link} className={`list-none ${path === li.name.toLowerCase() ? "text-blue-700":""}`}><Link href = {`${li.link}`}>{li.name}</Link></li>
  )
}

export default Linkk
