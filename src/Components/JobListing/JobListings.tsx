import { useState, useEffect, useRef } from "react";
import { Box, Skeleton, useTheme } from "@mui/material";
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
  const theme = useTheme();

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

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
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

  console.log("loading state-", loading);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        padding: 0,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 3,
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
      />

      {/* <Grid container rowGap={8} justifyContent="center">
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
      </Grid> */}

      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          [theme.breakpoints.down("xl")]: {
            gridTemplateColumns: "repeat(3, 1fr)",
          },
          [theme.breakpoints.down("md")]: {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
          [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "repeat(1, 1fr)",
          },
          gridTemplateRows: "min-content auto 0fr 1fr",
          gap: 5,
          px: 2,
          scrollbarGutter: "stable",
        }}
      >
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
            <JobCard content={item} openPopup={openPopup} key={index} />
          ))}
      </Box>
      {loading && (
        <Box>
          <Box>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
          <Box>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
