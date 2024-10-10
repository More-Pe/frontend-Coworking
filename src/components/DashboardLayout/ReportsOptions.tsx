import * as React from 'react';
import { useState } from 'react';
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
} from '@mui/material';
import {
	generateDailyReport,
	getReportsInRange,
	getRoomUsageStats,
} from '../../services/AdministrationServices';
import { useAuth } from '../../contexts/AuthContext';

const ReportsOptions: React.FC = () => {
	const { token } = useAuth();
	const [label, setLabel] = useState('');
	const [reportDate, setReportDate] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [data, setData] = useState<any>(null);

	const handleLabelChange = (event: SelectChangeEvent<string>) => {
		const newValue = event.target.value;
		setLabel(newValue);
		setData(null);
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

	const handleGenerateReport = async () => {
		if (token) {
			try {
				if (label === 'Daily Report') {
					const response = await generateDailyReport(reportDate, token);
					setData(response.data);
				} else if (label === 'Reports by period') {
					const response = await getReportsInRange(startDate, endDate, token);
					setData(response.data);
				} else if (label === 'Room usage') {
					const response = await getRoomUsageStats(token);
					setData(response.data);
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			console.error('Token not available');
		}
	};

	const renderDailyReportTable = () => {
		if (!data || !data.report) return null;
		const { report, peakHour } = data;
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
							<TableCell>
								{new Date(report.report_date).toLocaleDateString()}
							</TableCell>
							<TableCell>{report.total_accesses}</TableCell>
							<TableCell>{report.total_absences}</TableCell>
							<TableCell>{report.frequent_users || 'None'}</TableCell>
							<TableCell>{report.infrequent_users || 'None'}</TableCell>
							<TableCell>{peakHour}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		);
	};

	const renderReportsByPeriodTable = () => {
		if (!data || !Array.isArray(data)) return null;
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
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((report: any) => (
							<TableRow key={report.report_id}>
								<TableCell>
									{new Date(report.report_date).toLocaleDateString()}
								</TableCell>
								<TableCell>{report.total_accesses}</TableCell>
								<TableCell>{report.total_absences}</TableCell>
								<TableCell>{report.frequent_users || 'None'}</TableCell>
								<TableCell>{report.infrequent_users || 'None'}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
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
						InputLabelProps={{ shrink: true }}
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
						InputLabelProps={{ shrink: true }}
						fullWidth
						sx={{ mb: 2 }}
					/>
					<TextField
						label='End Date'
						type='date'
						value={endDate}
						onChange={handleEndDateChange}
						InputLabelProps={{ shrink: true }}
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