import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useState } from 'react';
import Food from '../../types/Food';
import { useEffect } from 'react';
import axiosInstance from '../../services/axios';
import { Filter } from '../../components/Filter/Filter';
import FoodList from '../../components/FoodList';
import FilterType from '../../types/FilterType';
import AdminCard from '../../components/Admin/AdminCard';
import { Box, Card, Divider } from '@mui/material';

interface CardDataType {
    noei7: number
    noeb7: number
    aoci7: number
}
const Home: NextPage = () => {
    const [foods, setFoods] = useState<Array<Food>>([])
    const [fFoods, setFFoods] = useState<Array<Food>>([])
    const [filter, setFilter] = useState<FilterType | null>(null)
    const [cardData, setCardData] = useState<CardDataType | null>(null)
    const [userFoods, setUserFoods] = useState<any | null>(null);
    useEffect(() => {
        readFood()
    }, [])
    const readFood = () => {
        axiosInstance.get(`/admin/foods`).then(({ data }) => {
            setFoods(data.data)
        })
    }
    const handleChangeFilter = (filter: FilterType) => {
        setFilter(filter)
    }
    useEffect(() => {
        if (filter === null) {
            return setFFoods(foods)
        }
        console.log({ filter })
        const temp = foods.filter((food) => {
            if (filter.search === null || filter.search === "") return true
            return food.name.includes(filter.search)
        }).filter((food) => {
            if (filter.from === null) return true
            const from = new Date(filter.from.toISOString())
            return new Date(food.date) >= from
        }).filter((food) => {
            if (filter.to === null) return true
            const to = new Date(filter.to.toISOString())
            return new Date(food.date) <= to
        })
        setFFoods(temp)
    }, [filter, foods])
    const handleDelete = (id: number) => {
        axiosInstance.post(`/user/foods/delete`, { id }).then(({ data }) => {
            console.log(data)
            let temp = foods
            temp = temp.filter((f: Food) => (f.id !== id))
            setFoods(temp)
        })
    }
    useEffect(() => {
        const temp = new Date()
        temp.setDate(temp.getDate() - 7)
        console.log({ temp })
        const foodsI7 = foods.filter((food) => {
            return new Date(food.date) >= temp
        })
        const foodsB7 = foods.filter((food) => {
            return new Date(food.date) < temp
        })
        setCardData({
            noei7: foodsI7.length,
            noeb7: foodsB7.length,
            aoci7: foodsI7.length == 0 ? 0 : foodsI7.reduce((sum, b) => sum + b.calorie, 0) / foodsI7.length
        })
        const userFoodsTemp = groupBy(foods, 'user')
        console.log({ userFoodsTemp })
        setUserFoods(userFoodsTemp)
    }, [foods])
    const getAoci7 = (uFoods:Array<Food>) => {
        const temp = new Date()
        temp.setDate(temp.getDate() - 7)
        const foodsI7 = uFoods.filter((food) => {
            return new Date(food.date) >= temp
        })
        return foodsI7.length == 0 ? 0 : foodsI7.reduce((sum, b) => sum + b.calorie, 0) / foodsI7.length
    }
    const groupBy = function (xs: any, key: any) {
        return xs.reduce(function (rv: any, x: any) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };
    return (
        <div className={styles.container}>
            <Head>
                <title>Admin Dashboard</title>
                <meta name="description" content="Admin Dashboard for Calorie Tracking App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div>
                {
                    cardData !== null &&
                    <Box sx={{ display: 'flex', columnGap: 2, mb: 4, justifyContent: 'space-between' }}>
                        <AdminCard title="Number of entries in the last 7 days" value={cardData.noei7} />
                        <AdminCard title="Number of entries before the last 7 days" value={cardData.noeb7} />
                        <AdminCard title="Avage of calories in the last 7 days" value={cardData.aoci7} />
                    </Box>
                }

                <Filter search={""} from={null} to={null} onChange={handleChangeFilter} onReset={() => { }}></Filter>
                <FoodList foods={fFoods} onDelete={handleDelete} showClient={true} />
                <Card raised sx={{ p: 4 }}>
                    The average number of calories added per user for the last 7 days
                    <Box sx={{ display: 'flex', mt: 4 }}>
                        <Box sx={{ flex: 1 }}>ClientID</Box>
                        <Box sx={{ flex: 1 }}>Average</Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    {
                        userFoods !== null &&
                        Object.keys(userFoods).map((clientID: string) => (
                            <Box key={clientID} sx={{ display: 'flex', mt: 2 }}>
                                <Box sx={{ flex: 1 }}>{clientID}</Box>
                                <Box sx={{ flex: 1 }}>{getAoci7(userFoods[clientID])}</Box>
                            </Box>
                        ))
                    }
                </Card>
            </div>
        </div>
    )
}

export default Home
