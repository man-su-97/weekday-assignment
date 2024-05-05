import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import PopupCard from "../../components/JobCard/PopupCard";
import { JobCard } from "../JobCard/JobCard";

interface JobDetails {
  companyName: string;
  jdLink: string;
  jdUid: string;
  jobDetailsFromCompany: string;
  jobRole: string;
  location: string;
  logoUrl: string;
  maxExp: number;
  maxJdSalary: number;
  minExp: number;
  minJdSalary: number;
  salaryCurrencyCode: string;
}

interface ApiResponse {
  jdList: JobDetails[];
  totalCount: number;
}

export function AppLayout() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState({
    role: "",
    experience: "",
    location: "",
    remote: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState<JobDetails | null>(null);
  const [searchCompany, setSearchCompany] = useState(""); // State for search company

  useEffect(() => {
    fetchData();
  }, []); // Initial fetch

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight && !loading) {
        fetchData();
      }
    };

    containerRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      containerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [loading]); // Add event listener when loading changes

  const fetchData = async () => {
    try {
      setLoading(true);

      const myHeaders = {
        "Content-Type": "application/json",
      };

      const body = {
        limit: 10,
        offset: offset,
      };

      const response = await axios.post(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        body,
        { headers: myHeaders }
      );

      setData((prevData) => ({
        jdList: prevData
          ? [...(prevData.jdList || []), ...response.data.jdList]
          : response.data.jdList,
        totalCount: response.data.totalCount,
      }));
      setOffset((prevOffset) => prevOffset + 10); // Update offset for the next request
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const openPopup = (content: JobDetails) => {
    setPopupContent(content);
    setShowPopup(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCompany(event.target.value); // Update the search company state
  };

  // Filter function to check if the company name includes the search query
  const filterByCompany = (job: JobDetails) => {
    return job.companyName.toLowerCase().includes(searchCompany.toLowerCase());
  };

  console.log(data);

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)", // Change to "100vh" to ensure full viewport height
        width: "100%",
        padding: 2,
        overflowY: "auto",
        position: "relative",
      }}
      ref={containerRef}
    >
      {showPopup && popupContent && (
        <PopupCard content={popupContent} onClose={() => setShowPopup(false)} />
      )}
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          select
          name="role"
          label="Role"
          variant="outlined"
          value={filters.role}
          onChange={handleFilterChange}
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
          onChange={handleFilterChange}
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
          onChange={handleFilterChange}
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
          onChange={handleFilterChange}
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
          value={searchCompany}
          onChange={handleSearchChange}
          size="small"
          sx={{ marginRight: 2, width: 200 }} // Adjust width as needed
        />
        <Button variant="contained" onClick={fetchData}>
          Apply Filters
        </Button>
      </Box>
      <Grid container rowGap={3} justifyContent="center">
        {data?.jdList
          .filter((job) => {
            // Filter jobs based on selected filter values
            return (
              filterByCompany(job) &&
              (filters.role === "" || job.jobRole === filters.role) &&
              (filters.experience === "" ||
                job.minExp === parseInt(filters.experience)) &&
              (filters.location === "" || job.location === filters.location) &&
              (filters.remote === "" ||
                (filters.remote === "remote" && job.location === "remote") ||
                (filters.remote === "onsite" && job.location !== "remote"))
            );
          })
          .map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <JobCard content={item} openPopup={openPopup} />
            </Grid>
          ))}
      </Grid>
      {loading && <Typography>Loading...</Typography>}
    </Box>
  );
}
