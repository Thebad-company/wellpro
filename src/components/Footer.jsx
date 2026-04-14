import { Link } from 'react-router-dom';
import { MessageSquare, Camera, Send, Briefcase, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-16">

                <div className="grid md:grid-cols-4 gap-12 mb-12">

                    {/* Logo + About */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <img
                                src="https://customer-assets.emergentagent.com/job_easehire-demo/artifacts/45ydnb6w_wellpro.webp"
                                alt="WellPro Logo"
                                className="h-10 w-10 object-contain"
                            />
                            <span className="text-2xl font-display font-semibold text-white">
                                Wellpro
                            </span>
                        </Link>

                        <p className="text-gray-400 mb-6 font-light">
                            The first ecosystem on health solutions & wellbeing. 
                            Reversing lifestyle disorders through evidence-based surgical precision.
                        </p>

                        <div className="flex gap-4">
                            {[MessageSquare, Camera, Send, Briefcase].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-wellpro-green transition-colors"
                                >
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Ecosystem</h3>
                        <ul className="space-y-3">
                            {[
                                { name: "Lifestyle Disorders", path: "/disorders" },
                                { name: "Programs", path: "/programs" },
                                { name: "Soleus Activation", path: "/soleus" },
                                { name: "Advisory Board", path: "/advisory-board" }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className="hover:text-wellpro-green transition-colors font-sans text-sm">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Knowledge</h3>
                        <ul className="space-y-3">
                            {["Blog", "Medical Journals", "Clinical Studies", "Case Reports", "FAQ"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-wellpro-green transition-colors font-sans text-sm">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Contact</h3>
                        <ul className="space-y-3">

                            <li className="flex items-start gap-2">
                                <Mail className="h-5 w-5 text-wellpro-green mt-0.5" />
                                <a href="mailto:support@wellpro.one" className="hover:text-wellpro-green text-sm">
                                    support@wellpro.one
                                </a>
                            </li>

                            <li className="flex items-start gap-2">
                                <Phone className="h-5 w-5 text-wellpro-green mt-0.5" />
                                <a href="tel:+911234567890" className="hover:text-wellpro-green text-sm">
                                    +91 123 456 7890
                                </a>
                            </li>

                            <li className="flex items-start gap-2">
                                <MapPin className="h-5 w-5 text-wellpro-green mt-0.5" />
                                <span className="text-sm">
                                    Corporate Office: <br />
                                    Mumbai, India
                                </span>
                            </li>

                        </ul>
                    </div>

                </div>

            </div>
            
            {/* Signature Orange Copyright Bar */}
            <div className="bg-wellpro-orange py-4">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-white">
                    <p className="text-sm font-bold tracking-wide uppercase">
                        © 2025 Wellpro Wellness Protocols. All rights reserved.
                    </p>

                    <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
                        <Link to="/programs" className="hover:text-wellpro-navy transition-colors">Market</Link>
                        <a href="#" className="hover:text-wellpro-navy transition-colors">Blog</a>
                        <a href="#" className="hover:text-wellpro-navy transition-colors">Privacy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};