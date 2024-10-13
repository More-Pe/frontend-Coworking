import { Box } from "@mui/material";
import AdminImg from '../../assets/admin-img.png';
const ImgComponent = () => {
  return (
    <>
            <Box sx={{ mb: 4 }}>
          <img
            src={AdminImg}
            alt='Placeholder'
            style={{ width: '100%', maxWidth: '40em' }}
          />
        </Box></>
  )
}

export default ImgComponent