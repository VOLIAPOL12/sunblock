import { useLocationStore } from "../store/useLocationStore"

function UltraVioletPage() {

  const {selectedLocation} = useLocationStore();

  console.log(selectedLocation);

  return (
    <div>UltraVioletPage</div>
  )
}

export default UltraVioletPage