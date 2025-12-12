import { Button } from '../ui/button';

const Navbar = () => {
    return (
        <div>
            <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 border-b border-slate-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="text-2xl font-bold text-[#0066CC]">
                            TravelBuddy
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        <a
                            href="#"
                            className="text-sm font-medium text-slate-600 hover:text-[#0066CC] transition-colors"
                        >
                            How it Works
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

                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                            Log in
                        </Button>
                        <Button size="sm">Sign up</Button>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Navbar;