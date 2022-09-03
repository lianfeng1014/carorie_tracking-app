import dayjs, { Dayjs } from 'dayjs';

interface Food {
    id: number
    name: string
    calorie: number
    price: number
    date: string | Date
    user: number
}

export default Food