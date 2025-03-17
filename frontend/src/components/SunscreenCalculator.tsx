import { useState } from "react";
import { TextField, Button, MenuItem, Typography, Grid, CardContent, Snackbar, Card, Alert, FormControl, Select, InputLabel } from "@mui/material";
import { useWeatherStore } from "../store/useWeatherStore";


const SunscreenCalculator = () => {

    const { weatherData } = useWeatherStore();

    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [skinTone, setSkinTone] = useState("Fair");
    const [clothingCoverage, setClothingCoverage] = useState(50);
    const [uvIndex, setUvIndex] = useState(() => 
        weatherData?.daily?.uv_index_max?.[0] ?? 0
      );
    const [exposureDuration, setExposureDuration] = useState(60);
    const [result, setResult] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleCalculate = async () => {

        if (!height || !weight || !uvIndex || !exposureDuration) {
            setOpenSnackbar(true);
            return;
        }

        const response = await fetch("http://localhost:5000/api/sunscreen/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            height: parseFloat(height),
            weight: parseFloat(weight),
            skinTone,
            clothingCoverage: parseFloat(String(clothingCoverage)),
            uvIndex: parseFloat(String(uvIndex)),
            exposureDuration: parseFloat(String(exposureDuration)),
        }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        setResult(data.recommendedSunscreen);
    };

  return (
    <Card className="shadow-md p-3 mt-4 mb-10 mx-auto max-w-[500px]">
            <CardContent>
                <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
                    🌞 Sunscreen Calculator
                </Typography>

                <Grid container spacing={2}>
                    {/* Height */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Height (cm)"
                            type="number"
                            variant="outlined"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </Grid>

                    {/* Weight */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Weight (kg)"
                            type="number"
                            variant="outlined"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </Grid>

                    {/* Skin Tone */}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Skin Tone</InputLabel>
                            <Select value={skinTone} onChange={(e) => setSkinTone(e.target.value)}>
                                <MenuItem value="" disabled>
                                    Pick a skin tone
                                </MenuItem>
                                <MenuItem value="Pale">Pale</MenuItem>
                                <MenuItem value="Pink">Pink</MenuItem>
                                <MenuItem value="Fair">Fair</MenuItem>
                                <MenuItem value="Tan">Tan</MenuItem>
                                <MenuItem value="Brown">Brown</MenuItem>
                                <MenuItem value="Black">Black</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Clothing Coverage */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Clothing Coverage (%)"
                            type="number"
                            variant="outlined"
                            value={clothingCoverage}
                            onChange={(e) => setClothingCoverage(Number(e.target.value))}
                        />
                    </Grid>

                    {/* UV Index */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="UV Index"
                            type="number"
                            variant="outlined"
                            value={uvIndex}
                            onChange={(e) => setUvIndex(Number(e.target.value))}
                        />
                    </Grid>

                    {/* Exposure Duration */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Exposure Duration (min)"
                            type="number"
                            variant="outlined"
                            value={exposureDuration}
                            onChange={(e) => setExposureDuration(Number(e.target.value))}
                        />
                    </Grid>

                    {/* Calculate Button */}
                    <Grid item xs={12}>
                        <Button fullWidth variant="contained" color="primary" onClick={handleCalculate}>
                            Calculate
                        </Button>
                    </Grid>
                </Grid>

                {/* Result */}
                {result !== null && (
                    <Typography variant="h6" align="center" sx={{ mt: 2, bgcolor: "#f0f0f0", p: 2, borderRadius: 2 }}>
                        Recommended Sunscreen: <strong>{result} ml</strong>
                    </Typography>
                )}
            </CardContent>

            {/* Snackbar for Missing Inputs */}
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                <Alert severity="warning" onClose={() => setOpenSnackbar(false)}>
                    Please fill in all required fields!
                </Alert>
            </Snackbar>
        </Card>
  );
};

export default SunscreenCalculator;

