import React from 'react';

export const LifestyleSection = () => {
    const lifestyleImages = [
        {
            image:
                "https://images.unsplash.com/photo-1666856433657-d111f382530a?crop=entropy&cs=srgb&fm=jpg&q=85",
            title: "Nature Connection",
        },
        {
            image:
                "https://images.unsplash.com/photo-1716284130499-470a2d2b200e?crop=entropy&cs=srgb&fm=jpg&q=85",
            title: "Mindful Practice",
        },
        {
            image:
                "https://images.unsplash.com/photo-1635545999375-057ee4013deb?crop=entropy&cs=srgb&fm=jpg&q=85",
            title: "Inner Peace",
        },
        {
            image:
                "https://images.unsplash.com/photo-1722094250550-4993fa28a51b?crop=entropy&cs=srgb&fm=jpg&q=85",
            title: "Peaceful Living",
        },
    ];

    return (
        <section className="py-24 bg-stone-50">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-wellpro-green font-bold text-sm uppercase tracking-[0.2em]">
                        Disorder Reversal
                    </span>

                    <h2 className="text-5xl font-display font-black text-gray-900 mt-4 mb-6 uppercase tracking-tight">
                        Revolutionizing <span className="text-wellpro-green">Lifestyle</span> Medicine
                    </h2>

                    <p className="text-xl text-gray-500 max-w-3xl mx-auto font-sans font-light">
                        A modern ecosystem built for surgical-precision recovery.
                    </p>
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {lifestyleImages.map((item, index) => (
                        <div
                            key={index}
                            className="relative group overflow-hidden rounded-2xl aspect-square"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end p-4">
                                <span className="text-white font-semibold text-lg">
                                    {item.title}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quote */}
                <div className="mt-16 bg-white rounded-3xl p-12 shadow-lg text-center">
                    <p className="text-2xl font-serif text-gray-700 italic max-w-3xl mx-auto leading-relaxed">
                        "Wellness isn't a destination—it's the journey of honoring your body,
                        nourishing your mind, and living in harmony with nature's rhythms."
                    </p>
                </div>

            </div>
        </section>
    );
};