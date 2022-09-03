import { useRouter } from 'next/router';
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';

export default function Layout(props: any){
    const {children} = props
    const router = useRouter()
    console.log("router.pathname", router.pathname)
    return <div>
        {
            !router.pathname.includes('admin')?(
                <UserLayout>{children}</UserLayout>
            ):(
                <AdminLayout>{children}</AdminLayout>
            )
        }
    </div>
}