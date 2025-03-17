import { Autocomplete, Button, TextField } from "@mui/material";
import { useLocationStore } from "../store/useLocationStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LocationDropdownProps {}

const LocationDropdown: React.FC<LocationDropdownProps> = ({}) => {
    const navigate = useNavigate();
    const { locations, fetchLocations, setSelectedLocation } = useLocationStore();
    const [selectedLocality, setSelectedLocality] = useState<string | null>(null);

    useEffect(() => {
        fetchLocations()
    }, [fetchLocations]);

    const handleSunscreenNavigation = () => {
        navigate("/sunscreen");
    };

    const handleLocationSubmit = () => {
        if (selectedLocality) {
            const fullLocation = locations.find((loc) => loc.locality === selectedLocality);
            if (fullLocation) {
                setSelectedLocation(fullLocation);
                navigate("/uv-page");
            }
        }
    };

    const localityList = locations.map((loc) => loc.locality);

    return (
        <>
            <Autocomplete
                options={localityList}
                filterOptions={(options, { inputValue }) =>
                    options
                        .filter((option) =>
                            option.toLowerCase().includes(inputValue.toLowerCase())
                        )
                        .slice(0, 10)
                }
                className="mb-3"
                onChange={(_event, newValue: any) => setSelectedLocality(newValue)}
                renderInput={(params) => (
                    <TextField {...params} label="Search for a location" variant="outlined" />
                )}
            />
            
            <Button 
                variant="contained" 
                color="primary" 
                className="mt-4 w-full" 
                onClick={handleLocationSubmit}
                disabled={!selectedLocality}
            >
                Continue
            </Button>
        </>
    );
}

export default LocationDropdown;
