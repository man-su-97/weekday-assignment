import { TextField, MenuItem, Box } from "@mui/material";
import { JobLocation, JobRoles, YearsOfExperience } from "../../constants";

interface FilterProps {
  filters: {
    role: string;
    experience: string;
    location: string;
    remote: string;
    searchCompany: string;
  };
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const JobFilters: React.FC<FilterProps> = ({
  filters,
  onFilterChange,
  onSearchChange,
}) => {
  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
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
        {JobRoles.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
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
        {YearsOfExperience.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
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
        {JobLocation.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
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
        sx={{ marginRight: 2, width: 200 }}
      />
    </Box>
  );
};

export default JobFilters;
