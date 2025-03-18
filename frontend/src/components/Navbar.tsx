import { Link } from "react-router-dom";
import sunBlock from "../assets/sunblock.png"

function Navbar() {
  return (
    <div className="bg-[#919191] p-4 drop-shadow-md">
        <header className="container mx-auto hover:scale-105 transition-all">
            <Link to="/" className="flex justify-center items-center">
                <img src={sunBlock} alt="sunblock logo" className="w-24 h-24 md:w-36 md:h-36"/>
                <h1 className="italic text-2xl md:text-4xl pt-3 bg-clip-text text-transparent bg-gradient-to-r from-[#F7941D] to-[#ff00ff]">SUNBLOCK</h1>
            </Link>
            
        </header>
    </div>
  )
}

export default Navbar;