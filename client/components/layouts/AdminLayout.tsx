import { Container } from '@mui/material';
import styles from "./UserLayout.module.scss"
import { useEffect, useState } from 'react';
import useApp from '../../hooks/useApp';
import axiosInstance from '../../services/axios';
import { useRouter } from 'next/router';
import AdminMenu from './AdminMenu';

export default function AdminLayout(props: any){
    const {children} = props
    const { generateJwtToken=()=>{}, setJwtToken=()=>{}, setUser=()=>{} , isAuthorized, user} = useApp();
    const [loading, setLoading] = useState<Boolean>(true)
    const router = useRouter()
    console.log({isAuthorized})
    useEffect(() => {
      const token = localStorage.getItem('jwtToken')
      console.log({ token })
      if (!token) return generateJwtToken();
      setJwtToken(token)
      readUser()
    }, [])
    const readUser = ()=>{
        setLoading(true)
        axiosInstance.get('/user').then(({data})=>{
            setUser(data.user)
            if(data.user.role!==1){
                router.push('/')
            }
            setLoading(false)
        }).catch(e=>{
            localStorage.removeItem('jwtToken')
            // location.reload();
        })
    }
    return <div>
        <AdminMenu/>
        <Container className={styles.container}>
            {loading===false && children}
        </Container>
    </div>
}