export const calculateSunscreen = (req, res) => {
    const { height, weight, skinTone, clothingCoverage, uvIndex, exposureDuration } = req.body;
    
    if (!height || !weight || !uvIndex || !exposureDuration) {
        return res.status(400).json({ error: "Missing required fields" });
    }

   
    let surfaceArea = (Math.sqrt((height * weight) / 3600)) * 10000;
    
    
    let exposedArea = surfaceArea * (1 - (clothingCoverage / 100));
    
    
    let sunscreenAmount = (exposedArea * 2) / 1000;
    
    
    let skinAdjustmentFactor = skinTone === "Pale" || skinTone === "Pink" || skinTone === "Fair" ? 1.15 :
                               skinTone === "Tan" ? 1.0 : 0.9;
    sunscreenAmount *= skinAdjustmentFactor;
    
    
    let uvAdjustmentFactor = uvIndex <= 2 ? 0.9 :
                              uvIndex <= 5 ? 1.0 :
                              uvIndex <= 7 ? 1.1 :
                              uvIndex <= 10 ? 1.2 : 1.3;
    sunscreenAmount *= uvAdjustmentFactor;
    
    
    sunscreenAmount *= (exposureDuration / 60);
    
    res.json({ recommendedSunscreen: sunscreenAmount.toFixed(2) });
};
