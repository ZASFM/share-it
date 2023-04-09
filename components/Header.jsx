import { useContext } from "react";
import Link from "next/link";
import Categories from "./Categories";

const contents=[{name:'cat1',slug:'cat1'},{name:'cat2',slug:'cat2'}]

const Header=()=>{
   return (
<div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-white-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">Graph CMS</span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {contents.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}>
               <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                  {category.name}
               </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
   )
}
export default Header;