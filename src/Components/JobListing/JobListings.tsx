import { useState, useEffect, useRef } from "react";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { JobCard } from "../JobCard/JobCard";
import { IJobDescription } from "../../types/proptypes";
import PopupCard from "../JobDetailsPopup/JDPopupCard";
import JobFilters from "../JobFilter/JobFilter";

interface ApiResponse {
  jdList: IJobDescription[];
  totalCount: number;
}

export function JobListings() {
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
  const [popupContent, setPopupContent] = useState<IJobDescription | null>(
    null
  );
  const [searchCompany, setSearchCompany] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

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
  }, [loading]);

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

      console.log("Fetching data...");

      const response = await axios.post(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        body,
        { headers: myHeaders }
      );

      console.log("Data received:", response.data);

      setData((prevData) => ({
        jdList: prevData
          ? [...(prevData.jdList || []), ...response.data.jdList]
          : response.data.jdList,
        totalCount: response.data.totalCount,
      }));
      setOffset((prevOffset) => prevOffset + 10);
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

  const openPopup = (content: IJobDescription) => {
    setPopupContent(content);
    setShowPopup(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCompany(event.target.value);
  };

  const filterByCompany = (job: IJobDescription) => {
    return job.companyName.toLowerCase().includes(searchCompany.toLowerCase());
  };

  console.log(data);

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        width: "100%",
        padding: 2,
        position: "relative",
      }}
      ref={containerRef}
    >
      {showPopup && popupContent && (
        <PopupCard content={popupContent} onClose={() => setShowPopup(false)} />
      )}

      <JobFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        onApplyFilters={fetchData}
      />
      <Grid container rowGap={8} justifyContent="center">
        {data?.jdList
          .filter((job) => {
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
