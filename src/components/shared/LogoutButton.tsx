'use client';

import { Button } from '../ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
                {},
                { withCredentials: true }
            );

            router.refresh(); // re-render Server Components
        } catch (error) {
            console.error('Logout failed');
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            className="bg-red-500 text-white"
            onClick={handleLogout}
        >
            Logout
        </Button>
    );
};

export default LogoutButton;
