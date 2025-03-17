import { useState } from "react";
import { TextField, Button, MenuItem, Typography, Box, Paper, Grid } from "@mui/material";

const skinTones = ["Pale", "Fair", "Tan", "Brown", "Black"];

const SunscreenCalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [skinTone, setSkinTone] = useState("Fair");
  const [clothingCoverage, setClothingCoverage] = useState("");
  const [uvIndex, setUvIndex] = useState("");
  const [exposureDuration, setExposureDuration] = useState("");
  const [result, setResult] = useState("");

  const handleCalculate = async () => {
    const response = await fetch("http://localhost:5001/api/sunscreen/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        height: parseFloat(height),
        weight: parseFloat(weight),
        skinTone,
        clothingCoverage: parseFloat(clothingCoverage),
        uvIndex: parseFloat(uvIndex),
        exposureDuration: parseFloat(exposureDuration),
      }),
    });

    if (!response.ok) {
      console.error("API Error:", response.status);
      return;
    }

    const data = await response.json();
    setResult(`Recommended Sunscreen: ${data.recommendedSunscreen} ml`);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#eef2f7" }}>
      <Paper elevation={5} sx={{ padding: 5, width: "45%", minWidth: 450, borderRadius: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#ff7043" }}>
          Sunscreen Calculator
        </Typography>

        <Grid container spacing={2}>
          {/* Height */}
          <Grid item xs={6}>
            <TextField 
              label="Height (cm)" 
              fullWidth 
              type="number" 
              value={height} 
              onChange={(e) => setHeight(e.target.value)} 
              sx={{ borderRadius: "8px" }} 
            />
          </Grid>

          {/* Weight */}
          <Grid item xs={6}>
            <TextField 
              label="Weight (kg)" 
              fullWidth 
              type="number" 
              value={weight} 
              onChange={(e) => setWeight(e.target.value)} 
              sx={{ borderRadius: "8px" }} 
            />
          </Grid>

          {/* Skin Tone */}
          <Grid item xs={6}>
            <TextField 
              select 
              label="Skin Tone" 
              fullWidth 
              value={skinTone} 
              onChange={(e) => setSkinTone(e.target.value)} 
              sx={{ borderRadius: "8px" }} 
            >
              {skinTones.map((tone) => (
                <MenuItem key={tone} value={tone}>
                  {tone}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Clothing Coverage */}
          <Grid item xs={6}>
            <TextField 
              label="Clothing Coverage (%)" 
              fullWidth 
              type="number" 
              value={clothingCoverage} 
              onChange={(e) => setClothingCoverage(e.target.value)} 
              sx={{ borderRadius: "8px" }} 
            />
          </Grid>

          {/* UV Index */}
          <Grid item xs={6}>
            <TextField 
              label="UV Index" 
              fullWidth 
              type="number" 
              value={uvIndex} 
              onChange={(e) => setUvIndex(e.target.value)} 
              sx={{ borderRadius: "8px" }} 
            />
          </Grid>

          {/* Exposure Duration */}
          <Grid item xs={6}>
            <TextField 
              label="Exposure Duration (min)" 
              fullWidth 
              type="number" 
              value={exposureDuration} 
              onChange={(e) => setExposureDuration(e.target.value)} 
              sx={{ borderRadius: "8px" }} 
            />
          </Grid>

          {/* Calculate Button */}
          <Grid item xs={12} sx={{ textAlign: "center", mt: 3 }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleCalculate} 
              sx={{ 
                fontSize: "16px", 
                padding: "10px 20px", 
                borderRadius: "8px", 
                backgroundColor: "#007BFF", 
                "&:hover": { backgroundColor: "#0056b3" } 
              }}
            >
              CALCULATE
            </Button>
          </Grid>

          {/* Result */}
          {result && (
            <Grid item xs={12} sx={{ textAlign: "center", mt: 3 }}>
              <Typography variant="h5" sx={{ color: "#388E3C", fontWeight: "bold", backgroundColor: "#E8F5E9", padding: "10px", borderRadius: "8px" }}>
                {result}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default SunscreenCalculator;

