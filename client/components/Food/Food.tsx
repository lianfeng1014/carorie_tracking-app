import { Box, Button, Divider } from "@mui/material";

export default function Food(props: any) {
    const { food, onDelete=()=>{}, showClient=false } = props
    const handleDelete = ()=>{
        onDelete()
    }
    return <>

        <Box sx={{display: 'flex', columnGap: 2, rowGap:1, flexWrap: 'wrap'}}>
            {showClient==true && <Box sx={{flex:1, minWidth: 100, alignSelf: 'center'}}>{food.user}</Box>}
            <Box sx={{flex:1, minWidth: 100, alignSelf: 'center'}}>{food.name}</Box>
            <Box sx={{flex:1, minWidth: 100, alignSelf: 'center'}}>{food.calorie}</Box>
            <Box sx={{flex:1, minWidth: 100, alignSelf: 'center'}}>{food.price}</Box>
            <Box sx={{flex:1, minWidth: 100, alignSelf: 'center'}}>{new Date(food.date).toDateString()}</Box>
            <Box sx={{flex:1, minWidth: 100, alignSelf: 'center'}}><Button onClick={handleDelete}>Delete</Button></Box>
        </Box>
        <Divider sx={{ my: 2 }} />
    </>
}