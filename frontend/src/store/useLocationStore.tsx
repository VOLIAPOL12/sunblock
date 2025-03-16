import { create } from "zustand";
import axios from 'axios';

const BASE_URL = "http://localhost:5001"

export const useLocationStore = create((set, get) => ({
    location: [],
    filteredLocations: [],
    loading: false,
    error:null,
    fetchLocation: async () => {
        set({loading:true});
        try {
            const response = await axios.get(`${BASE_URL}/api/suburbCoordinates`)
            set({location: response.data.data.rows, error:null})
        } catch (err: any) {
            if(err.status == 429) set({error:"Rate limit exceeded", location: []});
            else set({error: "Something went wrong", location: []})
        } finally {
            set({loading: false});
        }
    },
    filterLocations: (searchTerm) => set((state) => ({
        filteredLocations: state.locations.filter(loc =>
          loc.toLowerCase().includes(searchTerm.toLowerCase()) // Case-insensitive filtering
        )
      }))
}));