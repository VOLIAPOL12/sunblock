import { create } from "zustand";
import axios from 'axios';

const BASE_URL = "http://localhost:5001"

interface Location {
    locality: string;
    Lat_precise: number;
    Long_precise: number;
}

interface LocationStore {
    locations: Location[];
    selectedLocation: Location | null;
    error: string | null;
    loading: boolean;
    fetchLocations: () => Promise<void>;
    setSelectedLocation: (location: Location) => void;
}

export const useLocationStore = create<LocationStore>((set, get) => ({
    locations: [],
    selectedLocation: null,
    error: null,
    loading: false,
    fetchLocations: async () => {
        try {
            set({loading: true});
            const response = await axios.get(`${BASE_URL}/api/suburbCoordinates`);
            const data: Location[] = await response.data.data.rows;
            set({locations: data, error:null});
        } catch (err: any) {
            if(err.status == 429) set({error:"Rate limit exceeded", locations: []});
            else set({error: "Something went wrong", locations: []})
        } finally {
            set({loading: false});
        }
    },
    setSelectedLocation: (location) => set({ selectedLocation: location }),
}));