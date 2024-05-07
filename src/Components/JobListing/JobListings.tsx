import { useState, useEffect, useRef } from "react";
import { Box, useTheme } from "@mui/material";
import axios from "axios";
import { JobCard } from "../JobCard/JobCard";
import { IJobDescription } from "../../types/proptypes";
import PopupCard from "../JobDetailsPopup/JDPopupCard";
import JobFilters from "../JobFilter/JobFilter";
import SkeletonLoading from "../LoadingScreen/LoadingSkeleton";

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

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleIntersect = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !loading) {
        fetchData();
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect);

    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
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
  return (
    <Box
      sx={{
        height: "calc(100vh-64px)",
        width: "calc(100vw-20px)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        overflow: "auto",
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

      <Box
        sx={{
          flex: 1,
          display: "grid",
          overflow: "hidden",
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
      {loading && <SkeletonLoading />}
    </Box>
  );
}
