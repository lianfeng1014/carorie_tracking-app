import { Card } from "@mui/material"
import styles from "./AdminCard.module.scss"
interface PropsType{
    title: string
    value: number
}
export default function AdminCard(props: PropsType){
    const {title, value} = props
    return (
        <Card raised sx={{p:2}}>
            <div className={styles.title}>{title}</div>
            <div className={styles.value}>{value}</div>
        </Card>
    )
}