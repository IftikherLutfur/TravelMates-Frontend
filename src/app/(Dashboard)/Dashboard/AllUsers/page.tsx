import UserData from '@/components/AdminDashBoard/UserData';
import { getRawToken } from '@/lib/auth-utils';
import axios from 'axios';

const AllUsers = async () => {
     const token = await getRawToken();

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/get-all-user`,
    { 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const users = res.data;
  console.log(users,"Hello")

    return (
        <div>
            <UserData users={users.data} />
        </div>
    );
};

export default AllUsers;