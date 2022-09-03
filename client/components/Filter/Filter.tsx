import react, { ChangeEvent } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { Button, Card, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from 'react';

interface FilterProps {
    search: string | null
    from: Dayjs | null
    to: Dayjs | null
    onChange(v: Object): void;
    onReset(): void;
}
export function Filter(props: FilterProps) {
    const { from, to, onChange = () => { }, onReset = () => { }, search } = props
    const [filter, setFilter] = useState({from, to, search})
    const handleChangeFrom = (date: Dayjs | null) => {
        setFilter({  ...filter, from: date });
    }
    const handleChangeTo = (date: Dayjs | null) => {
        setFilter({ ...filter, to: date });
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    }

    useEffect(()=>{
        onChange(filter)
    },[filter])
    return (<Card raised sx={{mb:4, p:4}}>
        <TextField
            label="Search"
            required
            InputLabelProps={{ shrink: true }}
            size='small'
            sx={{ mr:2 }}
            margin={'dense'}
            name="search"
            onChange={handleChange}
            value={filter.search} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                label="From"
                value={filter.from}
                onChange={handleChangeFrom}
                renderInput={(params) => <TextField sx={{mr:2}} margin={'dense'} size='small' required {...params} />}
            />
            <DateTimePicker
                label="To"
                value={filter.to}
                onChange={handleChangeTo}
                renderInput={(params) => <TextField  sx={{mr:2}} margin={'dense'} size='small' required {...params} />}
            />
        </LocalizationProvider>
        <Button sx={{mt:1}}>Reset</Button>
    </Card>)
}