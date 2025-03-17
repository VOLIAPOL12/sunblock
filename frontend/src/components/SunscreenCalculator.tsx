import React, { useState } from "react";

const SunscreenCalculator: React.FC = () => {
    console.log("SunscreenCalculator component loaded"); 

    const [height, setHeight] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [skinTone, setSkinTone] = useState<string>("Fair");
    const [clothingCoverage, setClothingCoverage] = useState<number>(50);
    const [uvIndex, setUvIndex] = useState<number>(5);
    const [exposureDuration, setExposureDuration] = useState<number>(60);
    const [result, setResult] = useState<string | null>(null);

    const handleCalculate = async () => {
        try{
        const response = await fetch("http://localhost:5001/api/sunscreen/calculate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                height: parseFloat(height),
                weight: parseFloat(weight),
                skinTone,
                clothingCoverage: parseFloat(String(clothingCoverage)),
                uvIndex: parseFloat(String(uvIndex)),
                exposureDuration: parseFloat(String(exposureDuration))
            })
        });
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);
        setResult(data.recommendedSunscreen);
    }catch(error){
            console.error("Fetch error:", error);
        }
    };

    return (
        <div>
            <h2>Sunscreen Calculator</h2>
            <input type="number" placeholder="Height (cm)" onChange={(e) => setHeight(e.target.value)} />
            <input type="number" placeholder="Weight (kg)" onChange={(e) => setWeight(e.target.value)} />
            <select onChange={(e) => setSkinTone(e.target.value)}>
                <option value="Pale">Pale</option>
                <option value="Pink">Pink</option>
                <option value="Fair">Fair</option>
                <option value="Tan">Tan</option>
                <option value="Brown">Brown</option>
                <option value="Black">Black</option>
            </select>
            <input type="number" placeholder="Clothing Coverage (%)" onChange={(e) => setClothingCoverage(Number(e.target.value))} />
            <input type="number" placeholder="UV Index" onChange={(e) => setUvIndex(Number(e.target.value))} />
            <input type="number" placeholder="Exposure Duration (min)" onChange={(e) => setExposureDuration(Number(e.target.value))} />
            <button onClick={handleCalculate}>Calculate</button>
            {result && <p>Recommended Sunscreen: {result} ml</p>}
        </div>
    );
};

export default SunscreenCalculator;
