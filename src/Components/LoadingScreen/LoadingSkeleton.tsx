import { Box, Typography, Skeleton } from "@mui/material";

const SkeletonLoading = () => {
  return (
    <Box>
      <Typography sx={{ fontSize: 15, fontWeight: "bold", color: "grey" }}>
        Loading.....
      </Typography>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
};

export default SkeletonLoading;
