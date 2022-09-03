import { Box, Card, Divider } from "@mui/material";
import Food from '../../types/Food';
import FoodCard from "../Food/Food";

interface FoodListProps{
    foods: Array<Food>,
    showClient?: Boolean
    onDelete(id: number):void;
}
export default function FoodList(props:FoodListProps){
    const {foods, onDelete, showClient=false} = props
    return <Card sx={{p:4, mb:4}} raised>
        <Box sx={{display: 'flex', columnGap: 2, rowGap:1, flexWrap: 'wrap'}}>
            {showClient===true && <Box sx={{flex:1, minWidth: 100, alignSelf: 'center'}}>ClientID</Box>}
            <Box sx={{flex:1, minWidth: 100, alignSelf: 'center'}}>Food Name</Box>
            <Box sx={{flex:1, minWidth: 100, alignSelf: 'center'}}>Calorie</Box>
            <Box sx={{flex:1, minWidth: 100, alignSelf: 'center'}}>Price</Box>
            <Box sx={{flex:1, minWidth: 100, alignSelf: 'center'}}> Date</Box>
            <Box sx={{flex:1, minWidth: 100, alignSelf: 'center'}}>Action</Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        {
            foods.map((food: Food)=>(
                <div key={"food"+food.id}>
                    <FoodCard food={food} onDelete={()=>{onDelete(food.id)}} />
                </div>
            ))
        }
    </Card>
}