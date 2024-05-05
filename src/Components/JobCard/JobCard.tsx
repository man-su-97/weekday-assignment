import { Avatar, Box, Button, Typography } from "@mui/material";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";

interface CardProps {
  content: IJobDescription;
  openPopup: (content: IJobDescription) => void;
}

interface IJobDescription {
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

const JobCard: React.FC<CardProps> = ({ content, openPopup }) => {
  const snippet = content.jobDetailsFromCompany.slice(0, 250);
  const blurredText = content.jobDetailsFromCompany.slice(400, 700);

  return (
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
            <Typography sx={{ fontSize: 10 }}>Posted 6 days ago</Typography>{" "}
          </Box>
        </div>
      </div>
      <div className="card-body">
        <Box sx={{ display: "flex" }}>
          <Box sx={{ paddingTop: 2 }}>
            <Avatar
              sx={{ width: 45, height: 45 }}
              alt="Cindy Baker"
              src={content.logoUrl}
            />
          </Box>

          <Box
            sx={{
              padding: "0.625rem",
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
              {content.companyName}
            </Typography>
            <Typography sx={{ fontSize: 12 }}>{content.jobRole}</Typography>
            <Typography sx={{ fontSize: 11 }}>{content.location}</Typography>
          </Box>
        </Box>
        <Box sx={{ padding: 0.5, textAlign: "left" }}>
          <Typography sx={{ paddingBottom: 1 }}>
            Estimated Salary:{content.minJdSalary}-{content.maxJdSalary}{" "}
            {content.salaryCurrencyCode}
          </Typography>
          <Typography sx={{ fontSize: 13 }}>{snippet}</Typography>
          {blurredText && (
            <Typography sx={{ fontSize: 13 }} className="blur-text">
              {blurredText}
            </Typography>
          )}
          {blurredText && (
            <Button onClick={() => openPopup(content)}>Read More</Button>
          )}

          <Typography>Minimum Experience</Typography>
          <Typography>
            {content.minExp != null
              ? `${content.minExp} years`
              : "Not specified"}{" "}
          </Typography>
        </Box>
      </div>

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
  );
};

export { JobCard };
