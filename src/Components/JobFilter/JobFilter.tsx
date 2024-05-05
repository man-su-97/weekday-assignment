import React from "react";
import { TextField, MenuItem, Button, Box } from "@mui/material";

interface FilterProps {
  filters: any; // Define the type of your filters object
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onApplyFilters: () => void;
}

const JobFilters: React.FC<FilterProps> = ({
  filters,
  onFilterChange,
  onSearchChange,
  onApplyFilters,
}) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <TextField
        select
        name="role"
        label="Role"
        variant="outlined"
        value={filters.role}
        onChange={onFilterChange}
        size="small"
        sx={{ marginRight: 2, width: 80 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="frontend">Frontend</MenuItem>
        <MenuItem value="backend">Backend</MenuItem>
        <MenuItem value="ios">IOS</MenuItem>
        <MenuItem value="fullstack">FullStack</MenuItem>
        <MenuItem value="flutter">Flutter</MenuItem>
        <MenuItem value="android">Andriod</MenuItem>
        <MenuItem value="web3">Web3</MenuItem>
        <MenuItem value="tech lead">Tech-Lead</MenuItem>
      </TextField>
      <TextField
        select
        name="experience"
        label="Experience"
        variant="outlined"
        value={filters.experience}
        onChange={onFilterChange}
        size="small"
        sx={{ marginRight: 2, width: 130 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="1">1</MenuItem>
        <MenuItem value="2">2</MenuItem>
        <MenuItem value="3">3</MenuItem>
        <MenuItem value="4">4</MenuItem>
        <MenuItem value="5">5</MenuItem>
        <MenuItem value="6">6</MenuItem>
        <MenuItem value="7">7</MenuItem>
        <MenuItem value="8">8</MenuItem>
        <MenuItem value="9">9</MenuItem>
        <MenuItem value="10">10</MenuItem>
      </TextField>
      <TextField
        select
        name="location"
        label="Location"
        variant="outlined"
        value={filters.location}
        onChange={onFilterChange}
        size="small"
        sx={{ marginRight: 2, width: 110 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="bangalore">Bangalore</MenuItem>
        <MenuItem value="mumbai">Mumbai</MenuItem>
        <MenuItem value="delhi ncr">Delhi NCR</MenuItem>
        <MenuItem value="chennai">Chennai</MenuItem>
      </TextField>
      <TextField
        select
        name="remote"
        label="Remote"
        variant="outlined"
        value={filters.remote}
        onChange={onFilterChange}
        size="small"
        sx={{ marginRight: 2, width: 110 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="onsite">On-Site</MenuItem>
        <MenuItem value="remote">Remote</MenuItem>
      </TextField>
      <TextField
        label="Search Company"
        variant="outlined"
        value={filters.searchCompany}
        onChange={onSearchChange}
        size="small"
        sx={{ marginRight: 2, width: 200 }} // Adjust width as needed
      />
      <Button variant="contained" onClick={onApplyFilters}>
        Apply Filters
      </Button>
    </Box>
  );
};

export default JobFilters;
