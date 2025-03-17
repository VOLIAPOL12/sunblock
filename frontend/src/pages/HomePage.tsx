import { useNavigate } from "react-router-dom";
import sunblockLive from "../assets/sunblock_live.png";
import LocationDropdown from "../components/LocationDropdown";
import { useLocationStore } from "../store/useLocationStore";

const HomePage: React.FC = () => {  // ✅ 直接省略 HomePageProps
  const { setSelectedLocation } = useLocationStore();
  const navigate = useNavigate();

  const handleLocationService = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        try {
          setSelectedLocation({
            locality: "Your Location",
            Lat_precise: position.coords.latitude,
            Long_precise: position.coords.longitude,
          });

          navigate("/uv-page");
        } catch {
          console.log("Something went wrong");
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          alert(
            "You have blocked location access. Please enable it in your browser settings."
          );
        }
      }
    );
  };

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
        <div className="mx-auto mb-4 w-24 h-24 bg-gray-300 rounded-lg flex items-center justify-center">
          <img
            src={sunblockLive}
            alt="sunblock logo"
            className="w-24 h-20 md:w-36 md:h-28"
          />
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

        <button
          className="mt-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition"
          onClick={handleLocationService}
        >
          Provide access to location
        </button>
      </section>

      <section className="p-6 border-t text-center mb-16">
        <p className="text-gray-600">
          Manually check sun intensity in Victorian suburbs
        </p>
        <LocationDropdown />
      </section>
    </>
  );
};

export default HomePage;
