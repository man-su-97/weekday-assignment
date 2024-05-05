import { Button, Box, Typography } from "@mui/material";
import { IJobDescription } from "../../types/proptypes";

interface PopupCardProps {
  content: IJobDescription;
  onClose: () => void;
}

const PopupCard: React.FC<PopupCardProps> = ({ content, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Box
      className="popup-overlay"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <Box
        className="popup"
        sx={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "90%",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: "10px" }}>
          Job Details
        </Typography>
        <Box sx={{ marginBottom: "20px" }}>
          <Typography>{content.jobDetailsFromCompany}</Typography>
        </Box>
        <Button onClick={handleClose}>Close</Button>
      </Box>
    </Box>
  );
};

export default PopupCard;
