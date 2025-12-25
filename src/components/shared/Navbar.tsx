import CommonDiv from '@/utils/CommonDiv';
import { cookies } from 'next/headers';
import { Button } from '../ui/button';
import Link from 'next/link';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import LogoutButton from './LogoutButton';
import { getEmailFromToken } from '@/lib/auth-utils';

const Navbar = async () => {
    const token = (await cookies()).get("accessToken")?.value;
    console.log("Hello", token)
    let user = null;
    const userEmail = await getEmailFromToken()
    console.log(userEmail) // this is whwere the loged in user email

    if (token) {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/me`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    cache: "no-store",
                }
            );

            if (res.ok) {
                const data = await res.json();
                user = data.data;
                // console.log(user, "Hello")
            }
        } catch (error) {
            console.log(error, "User not logged in");
        }


    }



    return (
        <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 border-b">
            <CommonDiv>
                <div className="h-16 flex items-center justify-between">
                    <span className="text-2xl font-bold text-[# ]">
                        TravelBuddy
                    </span>

                    <nav className="hidden md:flex items-center space-x-8"> <a href={"/"} className="text-sm font-medium text-slate-600 hover:text-[#0066CC] transition-colors" > Home </a>
                        <a href="Pricing" className="text-sm font-medium text-slate-600 hover:text-[#0066CC] transition-colors" > Pricing </a>
                        <a href="#" className="text-sm font-medium text-slate-600 hover:text-[#0066CC] transition-colors" > Stories </a>
                        <a href="#" className="text-sm font-medium text-slate-600 hover:text-[#0066CC] transition-colors" > Safety </a> </nav>

                    {!user ? (
                        <div className="flex items-center gap-4">
                            <Link href="/Login">
                                <Button variant="ghost" size="sm">
                                    Log in
                                </Button>
                            </Link>
                            <Link href="/Register">
                                <Button size="sm">Sign up</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className='flex gap-2'>
                            <Link href="/userProfile">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="relative flex items-center gap-2"
                                >
                                    Profile
                                    {user.isPremium ? <MdOutlineWorkspacePremium
                                        size={18}
                                        className="text-yellow-400 absolute -top-2 -right-2"
                                    /> : ""}
                                </Button>
                            </Link>


                            <LogoutButton />
                        </div>

                    )}
                </div>
            </CommonDiv>
        </header>
    );
};

export default Navbar;
