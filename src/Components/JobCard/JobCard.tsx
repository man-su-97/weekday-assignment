import { Avatar, Box, Button, Typography } from "@mui/material";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import { IJobDescription } from "../../types/proptypes";
import "./JobCard.css";

interface CardProps {
  content: IJobDescription;
  openPopup: (content: IJobDescription) => void;
}

const JobCard: React.FC<CardProps> = ({ content, openPopup }) => {
  const snippet = content.jobDetailsFromCompany.slice(0, 400);
  const blurredText = content.jobDetailsFromCompany.slice(400, 600);

  return (
    <Box>
      <div className="job-card">
        <div className="card-top">
          <div className="post-time">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: 1,
                borderRadius: 6,
                paddingX: 1,
                paddingY: "1px",
              }}
            >
              <Box sx={{ fontSize: 0 }}>
                <HourglassTopRoundedIcon fontSize="small" />
              </Box>
              <Typography sx={{ fontSize: 10, fontWeight: "bold" }}>
                Posted 6 days ago
              </Typography>{" "}
            </Box>
          </div>
        </div>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ paddingTop: 2 }}>
              {/* <Avatar
                sx={{ width: 45, height: 45 }}
                alt="Cindy Baker"
                src={content.logoUrl}
              /> */}
              {content.logoUrl ? (
                <Avatar
                  sx={{ width: 45, height: 45 }}
                  alt={content.companyName}
                  src={content.logoUrl}
                />
              ) : (
                "NA"
              )}
            </Box>

            <Box
              sx={{
                padding: "0.625rem",
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <Typography
                sx={{ fontSize: 13, fontWeight: "bold", color: "#8b8b8b" }}
              >
                {content.companyName}
              </Typography>
              <Typography sx={{ fontSize: 14 }}>{content.jobRole}</Typography>
              <Typography sx={{ fontSize: 11, fontWeight: "500" }}>
                {content.location}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ padding: 0.5, textAlign: "left" }}>
            <Typography
              sx={{ paddingBottom: 1, color: "#313131", fontWeight: "400" }}
            >
              Estimated Salary:{" "}
              {content.minJdSalary && content.maxJdSalary
                ? `${content.minJdSalary}-${content.maxJdSalary} ${content.salaryCurrencyCode}`
                : "NA"}
            </Typography>
            <Typography
              sx={{ fontSize: "1rem", fontWeight: "500", color: "#000000DE" }}
            >
              About Company:
            </Typography>
            <Typography sx={{ fontSize: 14 }}>{snippet}</Typography>
            {blurredText && (
              <Box sx={{ position: "relative" }}>
                <Typography sx={{ fontSize: 13 }} className="blur-text">
                  {blurredText}
                </Typography>
                {blurredText && (
                  <Button
                    sx={{ position: "absolute", bottom: 1, right: "120px" }}
                    size="small"
                    onClick={() => openPopup(content)}
                  >
                    <Typography
                      sx={{ color: "blue", fontSize: "20", fontWeight: "bold" }}
                    >
                      View Job
                    </Typography>
                  </Button>
                )}
              </Box>
            )}
            {/* {blurredText && (
            <Button size="small" onClick={() => openPopup(content)}>
              <Typography
                sx={{ color: "#7B77E5", fontSize: 12, fontWeight: "bold" }}
              >
                View Job
              </Typography>
            </Button>
          )} */}

            <Typography
              sx={{
                marginTop: 1,
                fontSize: 13,
                fontWeight: 600,
                color: "#8b8b8b",
              }}
            >
              Minimum Experience
            </Typography>
            <Typography sx={{ fontSize: 14 }}>
              {content.minExp != null
                ? `${content.minExp} years`
                : "Not specified"}{" "}
            </Typography>
          </Box>
        </Box>

        <div className="card-bottom">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#54EFC3",
              minWidth: "21rem",
              marginTop: "0.5rem",
            }}
            className="apply-btn"
          >
            <BoltOutlinedIcon sx={{ color: "yellow" }} />
            <Typography
              sx={{ fontWeight: "bold", textTransform: "capitalize" }}
              color="black"
              variant="button"
            >
              Easy Apply
            </Typography>
          </Button>
          <Button
            sx={{
              backgroundColor: "#4943DA",
              minWidth: "21rem",
              marginY: "0.5rem",
            }}
            variant="contained"
            className="referal-btn"
          >
            <Typography sx={{ textTransform: "capitalize" }} variant="button">
              Unlock Referral Asks
            </Typography>
          </Button>
        </div>
      </div>
    </Box>
  );
};

export { JobCard };
