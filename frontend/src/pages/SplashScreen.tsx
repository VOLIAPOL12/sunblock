import sunShieldAnimation from "../assets/sunblock.gif";

function SplashScreen() {
  return (
    <div className="flex justify-center items-center h-screen">
        <img src={sunShieldAnimation} alt="Sun Shield Animation" className="w-40 h-40"/>
    </div>
  )
}

export default SplashScreen