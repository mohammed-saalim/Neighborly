import { Box, Card, CardContent, CardMedia, Typography, Button, Grid } from "@mui/material";

const RecommendationsList = ({ taskers }) => {
    return (
        <Box>
            {taskers.map((tasker) => (
                <Card
                    key={tasker.id}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        borderRadius: "15px",
                        overflow: "hidden",
                        mb: 3,
                        p: 3,
                        backgroundColor: "#fff",
                        transition: "transform 0.2s ease-in-out",
                        "&:hover": { transform: "scale(1.02)" }
                    }}
                >
                    {/* ✅ Tasker Profile Image */}
                    <CardMedia
                        component="img"
                        sx={{
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "4px solid #007bff"
                        }}
                        image={tasker.image}
                        alt={tasker.name}
                    />

                    <CardContent sx={{ flex: 1, ml: 3 }}>
                        {/* ✅ Tasker Name & Rating */}
                        <Typography variant="h6" fontWeight="bold" color="text.primary">
                            {tasker.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            ⭐ {tasker.rating} | {tasker.tasksCompleted} Tasks Completed
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mt={1}>
                            🚚 {tasker.vehicle}
                        </Typography>

                        {/* ✅ Description & Review */}
                        <Typography variant="body2" color="text.secondary" mt={1}>
                            {tasker.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontStyle="italic">
                            "{tasker.review}"
                        </Typography>
                    </CardContent>

                    {/* ✅ Price & Book Button (Right Side) */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center"
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold" color="primary">
                            {tasker.price}
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                mt: 2,
                                backgroundColor: "#007bff",
                                "&:hover": { backgroundColor: "#0056b3" },
                                borderRadius: "20px",
                                padding: "10px 20px"
                            }}
                        >
                            Book Now
                        </Button>
                    </Box>
                </Card>
            ))}
        </Box>
    );
};

export default RecommendationsList;
