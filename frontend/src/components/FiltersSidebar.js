import { Box, Typography, Checkbox, FormControlLabel, Slider, Button } from "@mui/material";

const FiltersSidebar = () => {
    return (
        <Box sx={{ backgroundColor: "#fff", p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight="bold">Filters</Typography>

            {/* Date Filters */}
            <Typography variant="body2" fontWeight="bold" mt={2}>Date</Typography>
            <Button variant="outlined" fullWidth sx={{ my: 1 }}>Today</Button>
            <Button variant="outlined" fullWidth sx={{ my: 1 }}>Within 3 Days</Button>
            <Button variant="outlined" fullWidth sx={{ my: 1 }}>Within A Week</Button>

            {/* Time of Day Filters */}
            <Typography variant="body2" fontWeight="bold" mt={2}>Time of Day</Typography>
            <FormControlLabel control={<Checkbox />} label="Morning (8am - 12pm)" />
            <FormControlLabel control={<Checkbox />} label="Afternoon (12pm - 5pm)" />
            <FormControlLabel control={<Checkbox />} label="Evening (5pm - 9:30pm)" />

            {/* Price Range */}
            <Typography variant="body2" fontWeight="bold" mt={2}>Price Range</Typography>
            <Slider min={10} max={150} defaultValue={72} aria-label="Price Range" valueLabelDisplay="auto" />

            {/* Elite Tasker Checkbox */}
            <FormControlLabel control={<Checkbox />} label="Elite Tasker" />
        </Box>
    );
};

export default FiltersSidebar;
