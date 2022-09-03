import { Container } from '@mui/material';
import UserMenu from './UserMenu';
import styles from "./UserLayout.module.scss"
import { useEffect, useState } from 'react';
import useApp from '../../hooks/useApp';
import axiosInstance from '../../services/axios';

export default function UserLayout(props: any){
    const {children} = props
    const { generateJwtToken=()=>{}, setJwtToken=()=>{}, setUser=()=>{} , isAuthorized, user} = useApp();
    const [loading, setLoading] = useState<Boolean>(true)
    console.log({isAuthorized})
    useEffect(() => {
      const token = localStorage.getItem('jwtToken')
      console.log({ token })
      if (!token) return generateJwtToken();
      setJwtToken(token)
      const temp = localStorage.getItem('user')
      readUser()
    }, [])
    const readUser = ()=>{
        setLoading(true)
        axiosInstance.get('/user').then(({data})=>{
            setUser(data.user)
            setLoading(false)
        }).catch(e=>{
            localStorage.removeItem('jwtToken')
            location.reload();
        })
    }
    return <div>
        <UserMenu/>
        <Container className={styles.container}>
            {loading===false && children}
        </Container>
    </div>
}