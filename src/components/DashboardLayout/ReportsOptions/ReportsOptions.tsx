import * as React from 'react';
import DailyReport from './DailyReport';
import PeriodReport from './PeriodReport';
import RoomUsageReport from './RoomUsageReport';
import { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  SelectChangeEvent,
} from '@mui/material';
import {
	generateDailyReport,
	getReportsInRange,
	getRoomUsageStats,
} from '../../../services/AdministrationServices';
import { useAuth } from '../../../contexts/AuthContext';

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
							return <>Choose report type</>;
						}
						return selected;
					}}>
					<MenuItem
						value=''
						disabled>
						Choose report type
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
					{label === 'Daily Report' && <DailyReport data={data} />}
					{label === 'Reports by period' && (
						<PeriodReport
							data={data}
							page={page}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					)}
					{label === 'Room usage' && <RoomUsageReport data={data} />}
				</div>
			)}
		</div>
	);
};

export default ReportsOptions;