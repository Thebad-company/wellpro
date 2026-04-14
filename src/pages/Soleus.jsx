import PropTypes from 'prop-types';
import { Button } from '../components/ui/button';
import { Activity, Brain, Microscope, Zap } from 'lucide-react';

const ScienceCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2">
        <div className="w-16 h-16 rounded-2xl bg-wellpro-green/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-wellpro-green transition-all">
            <Icon className="h-8 w-8 text-wellpro-green group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-2xl font-display font-black text-wellpro-navy mb-4 uppercase tracking-tight">{title}</h3>
        <p className="text-gray-600 font-sans font-light leading-relaxed">{description}</p>
    </div>
);

ScienceCard.propTypes = {
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

const BenefitItem = ({ number, title, description }) => (
    <div className="flex gap-6">
        <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-wellpro-green text-white font-display font-black">
                {number}
            </div>
        </div>
        <div>
            <h4 className="text-xl font-display font-black text-wellpro-navy mb-2 uppercase tracking-tight">{title}</h4>
            <p className="text-gray-600 font-sans font-light">{description}</p>
        </div>
    </div>
);

BenefitItem.propTypes = {
    number: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export const Soleus = () => {
    return (
        <div className="min-h-screen pt-32 bg-gradient-to-b from-white to-gray-50">
            
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 mb-32">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div>
                            <span className="text-wellpro-green font-bold text-sm uppercase tracking-[0.3em] bg-wellpro-green/10 px-6 py-2 rounded-full inline-block">Biological Breakthrough</span>
                            <h1 className="text-6xl md:text-7xl font-display font-black text-wellpro-navy mt-8 mb-6 uppercase tracking-tight leading-tight">
                                The Science of <br/>
                                <span className="text-wellpro-green">Soleus Activation</span>
                            </h1>
                        </div>
                        <p className="text-xl text-gray-600 font-sans font-light leading-relaxed">
                            Based on pioneering research (iScience, 2022), the Soleus muscle 
                            represents a &apos;metabolic hack&apos; capable of doubling oxidative 
                            metabolism even while sitting.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button className="bg-wellpro-green hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg">
                                Read Whitepaper
                            </Button>
                            <Button className="border-2 border-wellpro-navy hover:border-wellpro-green text-wellpro-navy hover:text-wellpro-green px-8 py-3 rounded-full font-bold text-lg transition-all">
                                Watch Tutorial
                            </Button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                            <img 
                                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxtZWRpdGF0aW9uJTIwc2NpZW5jZXxlbnwwfHx8fDE3NzYwODI5Nzh8MA&ixlib=rb-4.1.0&q=85" 
                                alt="Science of Soleus Activation"
                                className="w-full h-[550px] object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-wellpro-navy/40 to-transparent"></div>
                        </div>
                        {/* Floating Stat */}
                        <div className="absolute -bottom-8 -right-8 bg-wellpro-green p-8 rounded-3xl text-white shadow-2xl max-w-[280px] hover:shadow-3xl transition-all">
                            <div className="text-4xl font-display font-black mb-2">2x</div>
                            <div className="text-sm font-bold uppercase tracking-wider opacity-90">Oxidative Metabolism Increase</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* The Three Practices */}
            <div className="bg-white py-32 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-display font-black text-wellpro-navy uppercase tracking-tight">The Three <span className="text-wellpro-green">Practices</span></h2>
                        <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto font-sans font-light">Combining physical activation with neurological regulation for total recovery.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ScienceCard 
                            icon={Zap}
                            title="Soleus Shakti"
                            description="Active engagement of the soleus muscle to trigger high-efficiency glucose consumption without heart-rate spikes."
                        />
                        <ScienceCard 
                            icon={Activity}
                            title="Pranayam"
                            description="Precision breathwork to regulate the Vagus nerve and optimize the autonomic nervous system balance."
                        />
                        <ScienceCard 
                            icon={Brain}
                            title="Dhyan"
                            description="Targeted meditation practices to rewire the Brain-Gut axis and reduce chronic systemic inflammation."
                        />
                    </div>
                </div>
            </div>

            {/* Biological Impact */}
            <div className="py-32 max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-20 items-center">
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-5xl font-display font-black text-wellpro-navy uppercase tracking-tight">The Brain-Gut <span className="text-wellpro-green">Connection</span></h2>
                            <p className="text-lg text-gray-600 font-sans font-light mt-6">Understanding how soleus activation creates a cascade of metabolic benefits through the nervous system.</p>
                        </div>
                        
                        <div className="space-y-8">
                            <BenefitItem 
                                number="1"
                                title="Vagus Nerve Stimulation"
                                description="Regulating the longest nerve of the autonomic nervous system to control metabolic markers."
                            />
                            <BenefitItem 
                                number="2"
                                title="Glucose Clearance"
                                description="Scientific protocols to lower blood glucose levels through localized muscle activation."
                            />
                            <BenefitItem 
                                number="3"
                                title="Inflammation Reversal"
                                description="Reducing cellular-level inflammatory markers that drive chronic lifestyle disorders."
                            />
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-wellpro-navy to-wellpro-navy/90 rounded-3xl p-12 text-white relative h-full flex flex-col justify-center min-h-[600px] shadow-2xl">
                        <div className="absolute top-10 right-10 opacity-10">
                            <Microscope size={120} />
                        </div>
                        <div className="relative z-10 space-y-8">
                            <h3 className="text-4xl font-display font-black uppercase tracking-tight">Clinical Validation</h3>
                            <p className="text-xl text-gray-300 font-sans font-light leading-relaxed italic">
                                &quot;The soleus is the only muscle in the human body capable of maintaining high-rate oxidative metabolism for long durations without fatigue, effectively bypassing traditional glycogen exhaustion.&quot;
                            </p>
                            <div className="flex items-center gap-4 border-t border-white/20 pt-8">
                                <div className="w-14 h-14 bg-wellpro-green rounded-full flex items-center justify-center font-bold text-2xl shadow-lg">✓</div>
                                <div>
                                    <div className="font-bold tracking-wide uppercase">University of Houston</div>
                                    <div className="text-sm text-gray-400 italic">Major Comparative Metabolic Study (2022)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="bg-gradient-to-b from-gray-50 to-white py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-display font-black text-wellpro-navy uppercase tracking-tight">How It <span className="text-wellpro-green">Works</span></h2>
                        <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto font-sans font-light">A step-by-step guide to activating your soleus muscle for metabolic transformation.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { step: "1", title: "Sit Comfortably", desc: "Find a comfortable seated position with feet flat on the ground." },
                            { step: "2", title: "Engage Calves", desc: "Lift your heels while keeping toes on the ground, focusing on the soleus." },
                            { step: "3", title: "Maintain Rhythm", desc: "Perform controlled, rhythmic contractions for 3-5 minutes daily." },
                            { step: "4", title: "Track Results", desc: "Monitor glucose levels and energy improvements over 2-4 weeks." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                                <div className="w-12 h-12 bg-wellpro-green text-white rounded-full flex items-center justify-center font-display font-black text-xl mb-4">
                                    {item.step}
                                </div>
                                <h4 className="text-lg font-display font-black text-wellpro-navy mb-3 uppercase tracking-tight">{item.title}</h4>
                                <p className="text-gray-600 font-sans font-light text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Assessment CTA */}
            <div className="py-32 bg-wellpro-green/10">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-5xl font-display font-black text-wellpro-navy mb-8 uppercase tracking-tight">Experience Science <br/>In Action</h2>
                    <p className="text-xl text-gray-600 font-sans font-light leading-relaxed mb-12 max-w-2xl mx-auto">
                        Join our Next-Gen assessment program and discover how Soleus Activation 
                        can transform your metabolic health.
                    </p>
                    <Button className="bg-wellpro-green hover:bg-emerald-600 text-white px-12 py-4 rounded-full font-bold text-lg shadow-2xl transition-all transform hover:scale-105">
                        Start Digital Assessment
                    </Button>
                </div>
            </div>
        </div>
    );
};
