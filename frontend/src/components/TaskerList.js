import { Box, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

const RecommendationsList = ({ taskers }) => {
    return (
        <Box>
            {taskers.map((tasker) => (
                <Card key={tasker.id} className="service-card">
                    <CardMedia
                        component="img"
                        sx={{
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "3px solid black"
                        }}
                        image={tasker.image}
                        alt={tasker.name}
                    />

                    <CardContent sx={{ flex: 1, ml: 3 }}>
                        <Typography variant="h6" fontWeight="bold" color="text.primary">
                            {tasker.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            ⭐ {tasker.rating} | {tasker.tasksCompleted} Tasks Completed
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mt={1}>
                            {tasker.description}
                        </Typography>
                    </CardContent>

                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography variant="h6" fontWeight="bold" color="primary">
                            {tasker.price}
                        </Typography>
                        <Button variant="contained" className="service-btn">
                            Hire Now
                        </Button>
                    </Box>
                </Card>
            ))}
        </Box>
    );
};

export default RecommendationsList;
