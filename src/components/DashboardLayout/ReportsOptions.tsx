import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Pagination
} from '@mui/material';
import {
	generateDailyReport,
	getReportsInRange,
	getRoomUsageStats,
} from '../../services/AdministrationServices';
import { useAuth } from '../../contexts/AuthContext';
import { DailyReportResponse } from '../../types';

const ReportsOptions: React.FC = () => {
	const { token } = useAuth();
	const [label, setLabel] = useState('');
	const [reportDate, setReportDate] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [data, setData] = useState<any>(null);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const limit = 5;

	const handleLabelChange = (event: SelectChangeEvent<string>) => {
		const newValue = event.target.value;
		setLabel(newValue);
		setData(null);
		setPage(1);
	};

	const handleReportDateChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setReportDate(event.target.value);
	};

	const handleStartDateChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setStartDate(event.target.value);
	};

	const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEndDate(event.target.value);
	};

	const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const handleGenerateReport = async () => {
		if (token) {
			try {
				if (label === 'Daily Report') {
					const response = await generateDailyReport(reportDate, token);
					setData(response.data);
				} else if (label === 'Reports by period') {
					const response = await getReportsInRange(startDate, endDate, token, page, limit);
					setData(response.data.reports);
					setTotalPages(Math.ceil(response.data.total / limit));
				} else if (label === 'Room usage') {
					const response = await getRoomUsageStats(token);
					setData(response.data);
				}
			} catch (error) {
				console.error('Error fetching report:', error);
				setData(null);
			}
		} else {
			console.error('Token not available');
		}
	};

	useEffect(() => {
		if (label === 'Reports by period' && startDate && endDate) {
			handleGenerateReport();
		}
	}, [page, startDate, endDate, label]);

	const renderDailyReportTable = () => {
		if (!data) return null;
		const report = data as DailyReportResponse;
		
		return (
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Report Date</TableCell>
							<TableCell>Total Accesses</TableCell>
							<TableCell>Total Absences</TableCell>
							<TableCell>Frequent Users</TableCell>
							<TableCell>Infrequent Users</TableCell>
							<TableCell>Peak Hour</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>{new Date(report.report_date).toLocaleDateString()}</TableCell>
							<TableCell>{report.total_accesses.count}</TableCell>
							<TableCell>{report.total_absences}</TableCell>
							<TableCell>{report.frequent_users}</TableCell>
							<TableCell>{report.infrequent_users}</TableCell>
							<TableCell>{report.peak_hour}</TableCell>
						</TableRow>
					</TableBody>
				</Table>

				<Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Accesses by Room</Typography>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Room</TableCell>
							<TableCell>Accesses</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{Object.entries(report.accesses_by_room).map(([room, accesses]) => (
							<TableRow key={room}>
								<TableCell>{room}</TableCell>
								<TableCell>{accesses}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				<Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Users with Access</Typography>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>User ID</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Startup</TableCell>
							<TableCell>Last Access</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{report.total_accesses.persons.map((person) => (
							<TableRow key={person.user_id}>
								<TableCell>{person.user_id}</TableCell>
								<TableCell>{`${person.first_name} ${person.last_name}`}</TableCell>
								<TableCell>{person.startup}</TableCell>
								<TableCell>{new Date(person.last_access).toLocaleString()}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		);
	};

	const renderReportsByPeriodTable = () => {
		if (!data || !Array.isArray(data) || data.length === 0) {
			return <Typography>No data available for the selected period.</Typography>;
		}
		return (
			<>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Report Date</TableCell>
								<TableCell>Total Accesses</TableCell>
								<TableCell>Total Absences</TableCell>
								<TableCell>Frequent Users</TableCell>
								<TableCell>Infrequent Users</TableCell>
								<TableCell>Peak Hour</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((report: DailyReportResponse) => (
								<TableRow key={report.report_date.toString()}>
									<TableCell>{new Date(report.report_date).toLocaleDateString()}</TableCell>
									<TableCell>{report.total_accesses.count}</TableCell>
									<TableCell>{report.total_absences}</TableCell>
									<TableCell>{report.frequent_users}</TableCell>
									<TableCell>{report.infrequent_users}</TableCell>
									<TableCell>{report.peak_hour}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				{totalPages > 1 && (
					<Pagination
						count={totalPages}
						page={page}
						onChange={handlePageChange}
						sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
					/>
				)}
			</>
		);
	};

	const renderRoomUsageTable = () => {
		if (!data || !Array.isArray(data)) return null;
		return (
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Room Name</TableCell>
							<TableCell>Total Uses</TableCell>
							<TableCell>Average Stay</TableCell>
							<TableCell>Absences</TableCell>
							<TableCell>Peak Hour</TableCell>
							<TableCell>Longest Period Without Use</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((room: any) => (
							<TableRow key={room.room_name}>
								<TableCell>{room.room_name}</TableCell>
								<TableCell>{room.totalUses}</TableCell>
								<TableCell>{room.averageStay}</TableCell>
								<TableCell>{room.absences}</TableCell>
								<TableCell>{room.peakHour}</TableCell>
								<TableCell>{room.longestPeriodWithoutUse}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		);
	};

	return (
		<div>
			<FormControl
				fullWidth
				sx={{ mb: 2 }}>
				<FormLabel>Report Type</FormLabel>
				<Select
					value={label}
					onChange={handleLabelChange}
					displayEmpty
					renderValue={(selected) => {
						if (selected === '') {
							return <em>Choose report</em>;
						}
						return selected;
					}}>
					<MenuItem
						value=''
						disabled>
						<em>Choose report type</em>
					</MenuItem>
					<MenuItem value='Daily Report'>Daily Report</MenuItem>
					<MenuItem value='Reports by period'>Reports by period</MenuItem>
					<MenuItem value='Room usage'>Room usage</MenuItem>
				</Select>
			</FormControl>
			{label === 'Daily Report' && (
				<div style={{ marginBottom: '16px' }}>
					<TextField
						label='Report Date'
						type='date'
						value={reportDate}
						onChange={handleReportDateChange}
						slotProps={{
							inputLabel: {
								shrink: true
							}
						}}
						fullWidth
						sx={{ mb: 2 }}
					/>
					<Button
						variant='contained'
						onClick={handleGenerateReport}
						fullWidth>
						Generate Report
					</Button>
				</div>
			)}
			{label === 'Reports by period' && (
				<div style={{ marginBottom: '16px' }}>
					<TextField
						label='Start Date'
						type='date'
						value={startDate}
						onChange={handleStartDateChange}
						slotProps={{
							inputLabel: {
								shrink: true
							}
						}}
						fullWidth
						sx={{ mb: 2 }}
					/>
					<TextField
						label='End Date'
						type='date'
						value={endDate}
						onChange={handleEndDateChange}
						slotProps={{
							inputLabel: {
								shrink: true
							}
						}}
						fullWidth
						sx={{ mb: 2 }}
					/>
					<Button
						variant='contained'
						onClick={handleGenerateReport}
						fullWidth>
						Generate Report
					</Button>
				</div>
			)}
			{label === 'Room usage' && (
				<div style={{ marginBottom: '16px' }}>
					<Button
						variant='contained'
						onClick={handleGenerateReport}
						fullWidth>
						Get Room Usage Stats
					</Button>
				</div>
			)}
			{data && (
				<div style={{ marginTop: '16px' }}>
					<h2>Report</h2>
					{label === 'Daily Report' && renderDailyReportTable()}
					{label === 'Reports by period' && renderReportsByPeriodTable()}
					{label === 'Room usage' && renderRoomUsageTable()}
				</div>
			)}
		</div>
	);
};

export default ReportsOptions;