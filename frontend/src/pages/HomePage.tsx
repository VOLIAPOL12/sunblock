import { useEffect } from "react";
import { useLocationStore } from "../store/useLocationStore"
import sunblockLive from "../assets/sunblock_live.png"

function HomePage() {
  const { location, loading, error, fetchLocation } = useLocationStore();

  useEffect(() => {
    fetchLocation()
  },[fetchLocation])

  const handleLocationService = () => {
    navigator.geolocation.getCurrentPosition((position: any) => {
      console.log(position.coords)
    })
  }

  return (
    <>
    <section className="bg-yellow-100 p-6 text-center">
      <h2 className="text-xl font-semibold text-gray-800">Did you know?</h2>
      <p className="italic text-gray-700 mt-2">
        "Australia has one of the highest rates of skin cancer in the world.
        About 2 out of 3 Australians will be diagnosed with some form of skin
        cancer during their lifetime."
      </p>
      <p className="text-gray-600 font-medium mt-2">
        Cancer Council Victoria (2025)
      </p>
    </section>
    <section className="bg-white p-6 text-center">
        {/* Placeholder Icon */}
        <div className="mx-auto mb-4 w-24 h-24 bg-gray-300 rounded-lg flex items-center justify-center">
        <img src={sunblockLive} alt="sunblock logo" className="w-24 h-20 md:w-36 md:h-28"/>
        </div>

        <h2 className="text-lg font-bold text-gray-800">Live Sun Intensity</h2>
        <p className="text-gray-700 mt-2 px-4">
          To provide you with personalized sun intensity and safety tips based
          on your location, please allow access to your location. This will help
          us give you accurate UV levels and tailored sun protection advice.
        </p>

        <p className="text-gray-700 mt-4">
          Stay safe, and let's make sure you're protected while enjoying the
          outdoors!
        </p>

        {/* Button */}
        <button className="mt-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition" onClick={handleLocationService}>
          Provide access to location
        </button>
      </section>

      {/* Check Sun Intensity Manually */}
      <section className="p-6 border-t text-center">
        <p className="text-gray-600">Manually check sun intensity in Victorian suburbs</p>
        <button className="mt-2 text-purple-700 font-semibold flex items-center justify-center w-full" >
          Choose a Victorian Suburb →
        </button>
      </section>
    </>
  )
}

export default HomePage