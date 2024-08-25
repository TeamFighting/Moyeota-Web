import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ToastProvider from 'ToastProvider';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import App from 'App';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');
ReactDOM.createRoot(document.getElementById('root')!).render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
            <App />
            <ToastProvider />
        </BrowserRouter>
    </LocalizationProvider>,
);
