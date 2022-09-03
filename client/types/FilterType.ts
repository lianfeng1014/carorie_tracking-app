import dayjs, { Dayjs } from 'dayjs';
interface FilterType {
    search: string
    from: Dayjs
    to: Dayjs
}

export default FilterType