import AdminImg from '../../assets/admin-img.png';
import { Container, Box, Button, ButtonGroup } from '@mui/material';

const DashboardLayout = () => {
  const buttons = [
    <Button key='one'>Persons</Button>,
    <Button key='three'>Rooms</Button>,
    <Button key='two'>Reports</Button>,
  ];

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 4,
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Box
        sx={{
          flex: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ mb: 4 }}>
          <img
            src={AdminImg}
            alt='Placeholder'
            style={{ width: '100%', maxWidth: '40em' }}
          />
        </Box>
        <ButtonGroup
          orientation='horizontal'
          aria-label='Horizontal button group'
          variant='contained'
        >
          {buttons}
        </ButtonGroup>
      </Box>
      <Box
        sx={{
          flex: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      > RENDER CONDITIONAL CONTENT HERE
      </Box>
    </Container>
  );
};

export default DashboardLayout;