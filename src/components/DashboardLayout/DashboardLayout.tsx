import { useState } from 'react';
import { Container, Box, Button, ButtonGroup } from '@mui/material';
import PersonsTable from './PersonsTable';
import RoomsTable from './RoomsTable';
import StartupsTable from './StartupsTable/StartupsTable';
import ReportsOptions from './ReportsOptions/ReportsOptions';
import DefaultComponent from './DefaultComponent';
import ImgComponent from './ImgComponent';

const DashboardLayout = () => {
	const [selectedComponent, setSelectedComponent] = useState('');

	const handleButtonClick = (componentName: string) => {
		setSelectedComponent(componentName);
	};

	const renderComponent = () => {
		switch (selectedComponent) {
			case 'Persons':
				return <PersonsTable />;
			case 'Rooms':
				return <RoomsTable />;
			case 'Startups':
				return <StartupsTable />;
			case 'Reports':
				return <ReportsOptions />;
			default:
				return <ImgComponent />;
		}
	};

	return (
		<Container
			sx={{
				minWidth: '85vw',
        minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: 1,
				flexDirection: { xs: 'column', md: 'row' },
			}}>
			<Box
				sx={{
					flex: 4,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<DefaultComponent />
				<ButtonGroup
					orientation='horizontal'
					aria-label='Horizontal button group'
					variant='outlined'>
					<Button onClick={() => handleButtonClick('Persons')}>Persons</Button>
					<Button onClick={() => handleButtonClick('Rooms')}>Rooms</Button>
					<Button onClick={() => handleButtonClick('Startups')}>
						Startups
					</Button>
					<Button onClick={() => handleButtonClick('Reports')}>Reports</Button>
				</ButtonGroup>
			</Box>
			<Box
				sx={{
					flex: 2,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					m: 3,
				}}>
				{renderComponent()}
			</Box>
		</Container>
	);
};

export default DashboardLayout;
