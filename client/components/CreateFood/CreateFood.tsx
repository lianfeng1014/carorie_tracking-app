import { Button, Card, TextField } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import styles from "./CreateFood.module.scss"
interface CreateFood {
    name: string
    calorie: number
    price: number
    date: Dayjs | null
}
interface CreateFoodProps{
    onSubmit(e: Object): void;
    children: any;
}
export default function CreateFood(props:CreateFoodProps) {
    const {onSubmit=()=>{}, children} = props
    const [food, setFood] = useState<CreateFood>({
        name: "",
        calorie: 0,
        price: 0,
        date: dayjs()
    })
    useEffect(() => {

    }, [])
    const handleChangeDate = (newValue: Dayjs | null) => {
        setFood({ ...food, date: newValue });
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFood({ ...food, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let submitData = {...food, date: food?.date?.toISOString()}
        console.log({submitData})
        onSubmit(submitData)
    }
    return <Card sx={{p:4, mb:4}} raised>
        <form className={styles.form_container} onSubmit={(e: React.FormEvent<HTMLFormElement>)=>{handleSubmit(e)}}>
            <TextField
                label="Food Name"
                required
                InputLabelProps={{ shrink: true }} 
                size='small'
                sx={{mb:4}}
                name="name"
                onChange={handleChange}
                value={food.name} />
            <TextField
                label="Price"
                required
                InputLabelProps={{ shrink: true }} 
                size='small'
                sx={{mb:4}}
                name="price"
                onChange={handleChange}
                value={food.price} />
            <TextField
                label="Calorie"
                required
                InputLabelProps={{ shrink: true }} 
                size='small'
                sx={{mb:4}}
                name="calorie"
                onChange={handleChange}
                value={food.calorie} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Date"
                    value={food.date}
                    onChange={handleChangeDate}
                    renderInput={(params) => <TextField size='small' required {...params} />}
                />
            </LocalizationProvider>
            {children}
            <Button type="submit" sx={{mt:4}}>Submit</Button>
        </form>
    </Card>
}