import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from './ui/button';
import { ChevronDown, Menu, X } from 'lucide-react';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navClass = ({ isActive }) => 
        `transition-colors font-medium ${isActive ? 'text-wellpro-green' : (isScrolled ? 'text-gray-700 hover:text-wellpro-green' : 'text-gray-800 hover:text-wellpro-green')}`;

    const dropdownClass = (isOpen) =>
        `transition-colors font-medium flex items-center gap-1 cursor-pointer ${isOpen ? 'text-wellpro-green' : (isScrolled ? 'text-gray-700 hover:text-wellpro-green' : 'text-gray-800 hover:text-wellpro-green')}`;

    const disorders = [
        { name: 'Diabetes', id: 'diabetes' },
        { name: 'PCOD', id: 'pcod' },
        { name: 'Thyroid', id: 'thyroid' },
        { name: 'Joint Pain', id: 'joint-pain' },
        { name: 'Cholesterol', id: 'cholesterol' },
        { name: 'Depression', id: 'depression' },
        { name: 'Erectile Dysfunction', id: 'erectile-dysfunction' },
        { name: 'Immune System', id: 'immune-system' },
    ];

    const protocols = [
        { name: 'Deep Detox', id: 'deep-detox' },
        { name: 'Alkaline Water', id: 'alkaline-water' },
        { name: 'PIFD Protocol', id: 'pifd-protocol' },
    ];

    const programs = [
        { name: 'Diabetes Reversal', id: 'diabetes-reversal' },
        { name: 'Weight Loss', id: 'weight-loss' },
        { name: 'Thyroid Wellness', id: 'thyroid-wellness' },
        { name: 'Cholesterol Reversal', id: 'cholesterol-reversal' },
        { name: 'The Happy Life', id: 'happy-life' },
        { name: 'PCOD Wellness', id: 'pcod-wellness' },
        { name: 'Immunity Boost', id: 'immunity-boost' },
        { name: 'Vitality', id: 'vitality-program' },
        { name: 'Joint Health', id: 'joint-health' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-lg shadow-md border-b border-gray-100'
                : 'bg-gradient-to-b from-black/20 to-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                        <img
                            src="logo.webp"
                            alt="WellPro Logo"
                            className="h-12 md:h-14 w-12 md:w-14 object-contain"
                        />

                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1 font-sans">
                        {/* Disorders Dropdown */}
                        <div className="relative group">
                            <button
                                className={`px-3 py-2 rounded-lg transition-all ${dropdownClass(openDropdown === 'disorders')}`}
                                onMouseEnter={() => setOpenDropdown('disorders')}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                Disorders
                                <ChevronDown className="h-4 w-4 inline ml-1" />
                            </button>
                            <div
                                className={`absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-200 border border-gray-100 ${
                                    openDropdown === 'disorders' ? 'opacity-100 visible' : 'opacity-0 invisible'
                                }`}
                                onMouseEnter={() => setOpenDropdown('disorders')}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <div className="grid grid-cols-2 gap-0">
                                    {disorders.map((disorder) => (
                                        <Link
                                            key={disorder.id}
                                            to={`/disorders/${disorder.id}`}
                                            className="px-4 py-3 text-gray-700 hover:bg-wellpro-green/10 hover:text-wellpro-green transition-colors font-medium text-sm"
                                        >
                                            {disorder.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Protocols Dropdown */}
                        <div className="relative group">
                            <button
                                className={`px-3 py-2 rounded-lg transition-all ${dropdownClass(openDropdown === 'protocols')}`}
                                onMouseEnter={() => setOpenDropdown('protocols')}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                Protocols
                                <ChevronDown className="h-4 w-4 inline ml-1" />
                            </button>
                            <div
                                className={`absolute left-0 mt-1 w-48 bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-200 border border-gray-100 ${
                                    openDropdown === 'protocols' ? 'opacity-100 visible' : 'opacity-0 invisible'
                                }`}
                                onMouseEnter={() => setOpenDropdown('protocols')}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                {protocols.map((protocol) => (
                                    <Link
                                        key={protocol.id}
                                        to={`/protocols/${protocol.id}`}
                                        className="block px-4 py-3 text-gray-700 hover:bg-wellpro-green/10 hover:text-wellpro-green transition-colors font-medium text-sm"
                                    >
                                        {protocol.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Programs Dropdown */}
                        <div className="relative group">
                            <button
                                className={`px-3 py-2 rounded-lg transition-all ${dropdownClass(openDropdown === 'programs')}`}
                                onMouseEnter={() => setOpenDropdown('programs')}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                Programs
                                <ChevronDown className="h-4 w-4 inline ml-1" />
                            </button>
                            <div
                                className={`absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-200 border border-gray-100 max-h-96 overflow-y-auto ${
                                    openDropdown === 'programs' ? 'opacity-100 visible' : 'opacity-0 invisible'
                                }`}
                                onMouseEnter={() => setOpenDropdown('programs')}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                {programs.map((program) => (
                                    <Link
                                        key={program.id}
                                        to={`/programs/${program.id}`}
                                        className="block px-4 py-3 text-gray-700 hover:bg-wellpro-green/10 hover:text-wellpro-green transition-colors font-medium text-sm"
                                    >
                                        {program.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <NavLink to="/about" className={({ isActive }) => `px-3 py-2 rounded-lg transition-all ${navClass({ isActive })}`}>
                            About Us
                        </NavLink>

                        <NavLink to="/wow-assessment" className={({ isActive }) => `px-3 py-2 rounded-lg transition-all ${navClass({ isActive })}`}>
                            WOW
                        </NavLink>

                        <NavLink to="/soleus" className={({ isActive }) => `px-3 py-2 rounded-lg transition-all ${navClass({ isActive })}`}>
                            Soleus
                        </NavLink>

                        <NavLink to="/advisory-board" className={({ isActive }) => `px-3 py-2 rounded-lg transition-all ${navClass({ isActive })}`}>
                            Advisory
                        </NavLink>
                    </div>

                    {/* CTA Button */}
                    <Link to="/programs" className="hidden sm:block">
                        <Button className="bg-wellpro-green hover:bg-emerald-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full shadow-lg font-bold transition-all transform hover:scale-105 text-sm md:text-base">
                            Start Journey
                        </Button>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        {mobileMenuOpen ? (
                            <X className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-wellpro-green'}`} />
                        ) : (
                            <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-wellpro-green'}`} />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
                        <div className="space-y-2 mt-4">
                            <div className="px-2">
                                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Disorders</p>
                                {disorders.map((disorder) => (
                                    <Link
                                        key={disorder.id}
                                        to={`/disorders/${disorder.id}`}
                                        className="block px-3 py-2 text-gray-700 hover:bg-wellpro-green/10 hover:text-wellpro-green rounded transition-colors text-sm"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {disorder.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="px-2">
                                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Programs</p>
                                {programs.slice(0, 5).map((program) => (
                                    <Link
                                        key={program.id}
                                        to={`/programs/${program.id}`}
                                        className="block px-3 py-2 text-gray-700 hover:bg-wellpro-green/10 hover:text-wellpro-green rounded transition-colors text-sm"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {program.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="px-2 space-y-2">
                                <NavLink to="/about" className="block px-3 py-2 text-gray-700 hover:bg-wellpro-green/10 hover:text-wellpro-green rounded transition-colors text-sm" onClick={() => setMobileMenuOpen(false)}>
                                    About Us
                                </NavLink>
                                <NavLink to="/wow-assessment" className="block px-3 py-2 text-gray-700 hover:bg-wellpro-green/10 hover:text-wellpro-green rounded transition-colors text-sm" onClick={() => setMobileMenuOpen(false)}>
                                    WOW Assessment
                                </NavLink>
                                <NavLink to="/soleus" className="block px-3 py-2 text-gray-700 hover:bg-wellpro-green/10 hover:text-wellpro-green rounded transition-colors text-sm" onClick={() => setMobileMenuOpen(false)}>
                                    Soleus Activation
                                </NavLink>
                            </div>
                            <div className="px-2 pt-2">
                                <Link to="/programs" className="block w-full" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full bg-wellpro-green hover:bg-emerald-600 text-white py-2 rounded-lg font-bold transition-all">
                                        Start Your Journey
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};