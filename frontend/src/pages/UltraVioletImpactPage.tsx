import { Box, Card, CardContent, Container, Divider, Grid, Link, List, ListItem, ListItemText, Typography } from "@mui/material";
import chart2 from "../assets/chart2.png"
import chart1 from "../assets/chart1.png"
import uvRadiation from "../assets/uv-radiation.jpeg";
import sun from "../assets/sunblock.png"
import tanningBed from "../assets/tanning_bed.jpg"
import mercuryVaporLighting from "../assets/mercury_vapour_light.jpg"
import flourescent from "../assets/fluorescent.png";
import lasers from "../assets/lasers.webp";
import { motion } from "framer-motion";

const uvSources = [
    { name: "The Sun", img: sun, source: "Made by Joshua Park" },
    { name: "Tanning Beds", img: tanningBed, source: "https://www.tanyourhide.com/how-tanning-beds-work" },
    { name: "Mercury Vapor Lighting", img: mercuryVaporLighting, source: "https://en.wikipedia.org/wiki/Mercury-vapor_lamp" },
    { name: "Fluorescent", img: flourescent, source: "https://biotium.com/blog/cf-dyes-what-started-it-all-part-1-a-history-of-fluorescence/" },
    { name: "Lasers", img: lasers, source: "https://www.wired.com/story/physicists-clear-the-air-with-a-sweet-frickin-laser-beam/" }
];

const UltraVoiletImpactPage: React.FC = () => {
    const fadeInVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
      };

    return(
        <>
            <Container maxWidth="md" sx={{ mt: 4, mb: 15 }}>
                <Grid container spacing={4} alignItems="center">
                    {/* Text Section */}
                    <Grid item xs={12} md={6}>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}>
                        <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="body1">
                            Ultra Violet radiation is a type of radiation emitted from the sun or from other artificial sources, such as tanning beds. It has some benefits such as creating vitamin D and making people happy. However, it carries some tremendous health risks.
                            </Typography>
                        </CardContent>
                        </Card>
                    </motion.div>
                    </Grid>

                    {/* Image on the Right */}
                    <Grid item xs={12} md={6}>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}>
                        <Box textAlign="center">
                        <img src={uvRadiation} alt="UV Radiation" width="100%" style={{ borderRadius: "8px" }} />
                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                            Image Source: <Link href="https://en.ac-illust.com/clip-art/25230079/uv-rays" target="_blank" rel="noopener noreferrer">UV Radiation Image</Link>
                        </Typography>
                        </Box>
                    </motion.div>
                    </Grid>
                </Grid>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariants} className="mt-8">
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Health Impacts of UV Exposure
                    </Typography>
                    <Card sx={{ mb: 4, boxShadow: 3 }}>
                        <CardContent>
                        <List>
                            <ListItem>
                            <ListItemText
                                primary="Skin Cancer"
                                secondary="Prolonged UV exposure increases the risk of contracting melanoma and other skin cancers."
                            />
                            </ListItem>
                            <Divider />
                            <ListItem>
                            <ListItemText
                                primary="Eye Damage"
                                secondary="UV rays can cause cataracts and macular degeneration, leading to potential blindess so eye protection is a must"
                            />
                            </ListItem>
                            <Divider />
                            <ListItem>
                            <ListItemText
                                primary="Aging"
                                secondary="UV rays will lead aging"
                            />
                            </ListItem>
                            <Divider />
                            <ListItem>
                            <ListItemText
                                primary="Sunburns"
                                secondary="Short term over exposure where the user literally cooks under the sun"
                            />
                            </ListItem>
                        </List>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariants}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        How to Protect Yourself
                    </Typography>
                    <Card sx={{ mb: 4, boxShadow: 3 }}>
                        <CardContent>
                        <List>
                            <ListItem>
                                <ListItemText primary="Avoid Indoor Tanning" />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Apply Sunscreen (SPF 30+)" />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Wear Sunglasses with UV Protection" />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Use Hats & overfit clothes that don't expose the skin" />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Stay in the Shade During Peak Hours (roughly 10 AM - 4 PM)" />
                            </ListItem>
                        </List>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariants} >
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Melanoma Cases Over Time
                    </Typography>
                    <Box textAlign="center">
                        <img src={chart2} alt="Melanoma Cases by Year and Sex" width="100%" />
                    </Box>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                    The data suggest that the rate of melanoma deaths is significantly higher in males than in females. This
                    could be due to factors such as; more sun exposure, lower frequency of sunscreen application, and delayed 
                    visits for medical check-up. That said, the pattern does show a general increase in UV-related skin cancer 
                    incidence over the past several decades.
                    </Typography>

                    {/* Chart 2: Melanoma by Age Group */}
                    <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>
                        Age Groups Most at Risk
                    </Typography>
                    <Box textAlign="center">
                        <img src={chart1} alt="Melanoma Cases by Age Group" width="100%" />
                    </Box>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                    The chart portrays that <b>the greatest risk for deaths from melanoma pertains to older adults (ages 70+)</b>.
                    Less prevalent in younger age groups, melanoma is nevertheless <b>a source of great concern</b> because cumulative
                    sun damage, over time, will significantly affect younger individuals.
                    </Typography>
                </motion.div>
            </Container>
        </>
    );
}

export default UltraVoiletImpactPage;