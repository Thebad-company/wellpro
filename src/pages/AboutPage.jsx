import { Button } from '../components/ui/button';

export const AboutPage = () => {
  const founders = [
    {
      name: 'Nikhil Sharma',
      role: 'Founder & CEO',
      image: '/nikhil.webp',
      bio: 'Seasoned Startup Mentor/Investor, Business Growth Maestro, and Digital Evangelist of 17+ Years.',
      highlights: [
        'Helping startups harness business growth platforms',
        'Innovator, Entrepreneur, Marketing/Digital/Branding Expert',
        'CEO & Co-Founder Wake Up Life, Inc.',
        'Brand Ambassador at Truecaller'
      ],
      social: {
        facebook: 'https://www.facebook.com/NikhilSharmaHQ/',
        linkedin: 'https://www.linkedin.com/in/NikhilSharmaHQ/',
        instagram: 'https://www.instagram.com/NikhilSharmaHQ/'
      }
    },
    {
      name: 'Dr. Raju Hajela',
      role: 'Chairman & Mentor',
      image: '/doctors/dr-raju.webp',
      bio: 'Lead developer of the Canadian Certification in Addiction Medicine and internationally recognized addiction definition.',
      highlights: [
        'Founding member of Canadian Society of Addiction Medicine (CSAM)',
        'Diplomate of the American Board of Addiction Medicine (DABAM)',
        'Founding Medical Advisor to Foundation of Addiction and Mental Health',
        'Expert in addiction medicine and healthcare'
      ],
      social: {
        linkedin: 'https://www.linkedin.com/in/raju-hajela-04236311/'
      }
    },
    {
      name: 'Dr. Ashutosh Rastogi',
      role: 'Mentor',
      image: '/doctors/dr-sanjay.webp',
      bio: 'Chairman of Quest Group, Ex-IITian, Former Planning Commission member with 100+ patents.',
      highlights: [
        'Expert in Nutraceutical Formulations for Lifestyle Disorders',
        'Instrumental in launching Nutrilite in India',
        '100+ patents and 300+ formulations',
        'Leading technocrat in Energy, Environment, Health, Agriculture'
      ],
      social: {
        facebook: 'https://www.facebook.com/ashutosh.rastogi.90',
        linkedin: 'https://www.linkedin.com/in/ashutosh-rastogi-7a75086/',
        instagram: 'https://www.instagram.com/dr.ashutosh.rastogi/'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-wellpro-green/5 via-transparent to-wellpro-navy/5"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <span className="text-wellpro-green font-bold text-sm uppercase tracking-[0.3em] bg-wellpro-green/10 px-6 py-2 rounded-full inline-block mb-6">
              About WellPro
            </span>
            <h1 className="text-6xl md:text-7xl font-display font-black text-wellpro-navy mb-8 uppercase tracking-tight leading-tight">
              Our <span className="text-wellpro-green">Mission</span>
            </h1>
            <p className="text-xl text-gray-600 font-sans font-light leading-relaxed max-w-3xl mx-auto">
              To help you achieve peak physical health, mental health, emotional health and spiritual health through an integrated wellness ecosystem.
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl font-display font-black text-wellpro-navy uppercase tracking-tight">
                About <span className="text-wellpro-green">WellPro</span>
              </h2>
              <p className="text-lg text-gray-700 font-sans font-light leading-relaxed">
                WellPro.one is the first integrated ecosystem on Wellness. It has been tailored with the sole intent of helping you lead a healthy life.
              </p>
              <p className="text-lg text-gray-700 font-sans font-light leading-relaxed">
                We believe that there is no one silver bullet to achieve good health. Rather, wholesome health is achieved by comprehensively and simultaneously working on a bouquet of parameters that ultimately gets integrated with your way of living.
              </p>
              <p className="text-lg text-gray-700 font-sans font-light leading-relaxed">
                WellPro.one stands on the foundation of 12 verticals. Based on evidence-based research, each vertical offers you a unique and innovative approach to guide you toward peak wellness.
              </p>
            </div>
            <div className="bg-gradient-to-br from-wellpro-green/10 to-emerald-50 p-12 rounded-3xl border border-wellpro-green/20">
              <h3 className="text-2xl font-display font-black text-wellpro-navy mb-6 uppercase">Our Goal</h3>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="text-wellpro-green font-black text-2xl">✓</span>
                  <span className="text-gray-700 font-sans font-light">Peak Physical Health</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-wellpro-green font-black text-2xl">✓</span>
                  <span className="text-gray-700 font-sans font-light">Mental Health Excellence</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-wellpro-green font-black text-2xl">✓</span>
                  <span className="text-gray-700 font-sans font-light">Emotional Wellbeing</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-wellpro-green font-black text-2xl">✓</span>
                  <span className="text-gray-700 font-sans font-light">Spiritual Growth</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Founders Section */}
      <div className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-display font-black text-wellpro-navy mb-6 uppercase tracking-tight">
              Our <span className="text-wellpro-green">Leadership</span>
            </h2>
            <p className="text-xl text-gray-600 font-sans font-light max-w-2xl mx-auto">
              Meet the visionary leaders driving WellPro's mission to revolutionize wellness
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {founders.map((founder, idx) => (
              <div key={idx} className="group bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-wellpro-green/10 to-emerald-50">
                  <img 
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wellpro-navy/40 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="mb-4">
                    <h3 className="text-2xl font-display font-black text-wellpro-navy uppercase tracking-tight">
                      {founder.name}
                    </h3>
                    <p className="text-wellpro-green font-bold text-sm uppercase tracking-widest mt-2">
                      {founder.role}
                    </p>
                  </div>

                  <p className="text-gray-700 font-sans font-light mb-6 leading-relaxed">
                    {founder.bio}
                  </p>

                  <div className="space-y-3 mb-6">
                    {founder.highlights.map((highlight, i) => (
                      <div key={i} className="flex gap-3">
                        <span className="text-wellpro-green font-black flex-shrink-0">•</span>
                        <span className="text-sm text-gray-600 font-sans font-light">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-4 pt-6 border-t border-gray-100">
                    {founder.social.facebook && (
                      <a href={founder.social.facebook} target="_blank" rel="noopener noreferrer" className="text-sm text-wellpro-green hover:underline font-bold">
                        Facebook
                      </a>
                    )}
                    {founder.social.linkedin && (
                      <a href={founder.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-wellpro-green hover:underline font-bold">
                        LinkedIn
                      </a>
                    )}
                    {founder.social.instagram && (
                      <a href={founder.social.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-wellpro-green hover:underline font-bold">
                        Instagram
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-32 bg-gradient-to-br from-wellpro-green to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-48 -mb-48"></div>
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-8 uppercase tracking-tight">
            Join Our Wellness <br/>Revolution
          </h2>
          <p className="text-xl text-white/90 font-sans font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            Start your journey towards peak wellness today. Experience the integrated approach that combines ancient wisdom with modern science.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white hover:bg-gray-100 text-wellpro-green px-10 py-4 rounded-full font-bold text-lg shadow-lg transition-all transform hover:scale-105">
              Get Started
            </Button>
            <Button className="border-2 border-white hover:bg-white/10 text-white px-10 py-4 rounded-full font-bold text-lg transition-all">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
