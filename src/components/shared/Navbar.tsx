import CommonDiv from '@/utils/CommonDiv';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/jsonhandlers';
import { Button } from '../ui/button';
import { Link } from 'lucide-react';

const Navbar = async () => {
    const token = (await cookies()).get("accessToken")?.value;

    let user = null;

    if (token) {
        const result = await verifyAccessToken(token);
        console.log(result, "Hello");

        if (result?.success) {
            user = {
                email: result.payload?.email,
                role: result.payload?.role,
            };
            // console.log(user);
        }
    }

    

    return (
        <div>
            <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 border-b border-slate-100">
                <CommonDiv>
                    <div className="container px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-[#0066CC]">
                                TravelBuddy
                            </span>
                        </div>

                        <nav className="hidden md:flex items-center space-x-8">
                            <a
                                href={"/"}
                                className="text-sm font-medium text-slate-600 hover:text-[#0066CC] transition-colors"
                            >
                                Home
                            </a>
                            <a
                                href="#"
                                className="text-sm font-medium text-slate-600 hover:text-[#0066CC] transition-colors"
                            >
                                Pricing
                            </a>
                            <a
                                href="#"
                                className="text-sm font-medium text-slate-600 hover:text-[#0066CC] transition-colors"
                            >
                                Stories
                            </a>
                            <a
                                href="#"
                                className="text-sm font-medium text-slate-600 hover:text-[#0066CC] transition-colors"
                            >
                                Safety
                            </a>
                        </nav>

                        {!user?.email ? (
                            <div className="flex items-center space-x-4">
                                <Link href={"Login"}>
                                    <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                                        Log in
                                    </Button>
                                </Link>
                                <Link href={"Register"}>
                                    <Button size="sm">Sign up</Button>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                User Profile
                            </div>
                        )}
                    </div>
                </CommonDiv>
            </header>
        </div>
    );
};

export default Navbar;
