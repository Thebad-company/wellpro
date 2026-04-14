/**
 * ContentMapper Service
 * Fetches and parses content from wellpro.one
 * Implements content parsing logic with error handling and validation
 */

import {
  validateDisorder,
  validateProtocol,
  validateProgram,
  validateVertical,
  validateWOWAssessment,
} from './models.js';

// ============================================================================
// Mock Data - Replace with actual API calls when available
// ============================================================================

const MOCK_DISORDERS = {
  diabetes: {
    id: 'diabetes',
    name: 'Diabetes',
    slug: 'diabetes',
    description: 'Type 2 Diabetes is a metabolic disorder affecting blood sugar regulation.',
    keyStatistics: {
      prevalence: '10.5% of global population',
      impact: 'Leading cause of blindness and kidney disease',
      reversalRate: '85% reversal rate with lifestyle intervention',
    },
    overview:
      'Diabetes is a chronic condition characterized by high blood sugar levels. Type 2 diabetes accounts for 90% of all diabetes cases and is largely preventable through lifestyle changes.',
    symptoms: [
      {
        title: 'Increased Thirst',
        description: 'Excessive thirst and frequent urination',
        icon: 'droplet',
      },
      {
        title: 'Fatigue',
        description: 'Persistent tiredness and lack of energy',
        icon: 'battery-low',
      },
      {
        title: 'Blurred Vision',
        description: 'Vision problems and difficulty focusing',
        icon: 'eye',
      },
      {
        title: 'Slow Healing',
        description: 'Cuts and wounds heal slowly',
        icon: 'bandage',
      },
    ],
    rootCauses: [
      {
        title: 'Insulin Resistance',
        description: 'Cells become resistant to insulin, preventing glucose uptake',
      },
      {
        title: 'Poor Diet',
        description: 'High sugar and processed food consumption',
      },
      {
        title: 'Sedentary Lifestyle',
        description: 'Lack of physical activity and exercise',
      },
      {
        title: 'Chronic Stress',
        description: 'Prolonged stress elevates cortisol and blood sugar',
      },
    ],
    reversalMechanism:
      'Through dietary changes, regular exercise, stress management, and sleep optimization, insulin sensitivity can be restored and blood sugar levels normalized.',
    relatedPrograms: [
      {
        id: 'diabetes-reversal',
        name: 'Diabetes Reversal Program',
        link: '/programs/diabetes-reversal',
      },
    ],
    seoMetadata: {
      title: 'Diabetes Reversal - WellPro',
      description: 'Learn about diabetes, its causes, and how to reverse it naturally.',
      keywords: ['diabetes', 'type 2 diabetes', 'blood sugar', 'reversal'],
    },
  },
  thyroid: {
    id: 'thyroid',
    name: 'Thyroid Disorder',
    slug: 'thyroid',
    description: 'Thyroid disorders affect metabolism and energy levels.',
    keyStatistics: {
      prevalence: '5% of population',
      impact: 'Affects metabolism and energy',
      reversalRate: '75% improvement with intervention',
    },
    overview:
      'Thyroid disorders include hypothyroidism and hyperthyroidism. These conditions affect your metabolism, energy levels, and overall health. Many thyroid issues can be managed through lifestyle changes and proper nutrition.',
    symptoms: [
      {
        title: 'Fatigue',
        description: 'Extreme tiredness and low energy',
        icon: 'battery-low',
      },
      {
        title: 'Weight Changes',
        description: 'Unexplained weight gain or loss',
        icon: 'scale',
      },
      {
        title: 'Temperature Sensitivity',
        description: 'Feeling too cold or too hot',
        icon: 'thermometer',
      },
      {
        title: 'Hair Loss',
        description: 'Thinning hair and hair loss',
        icon: 'scissors',
      },
    ],
    rootCauses: [
      {
        title: 'Iodine Deficiency',
        description: 'Insufficient iodine intake',
      },
      {
        title: 'Autoimmune Response',
        description: 'Body attacks thyroid tissue',
      },
      {
        title: 'Nutritional Deficiencies',
        description: 'Lack of selenium and zinc',
      },
      {
        title: 'Chronic Inflammation',
        description: 'Systemic inflammation affects thyroid',
      },
    ],
    reversalMechanism:
      'Proper nutrition, stress management, and targeted supplementation can support thyroid function and restore balance.',
    relatedPrograms: [
      {
        id: 'thyroid-wellness',
        name: 'Thyroid Wellness Program',
        link: '/programs/thyroid-wellness',
      },
    ],
    seoMetadata: {
      title: 'Thyroid Health - WellPro',
      description: 'Understand thyroid disorders and how to support thyroid health naturally.',
      keywords: ['thyroid', 'hypothyroidism', 'metabolism', 'wellness'],
    },
  },
  'joint-pain': {
    id: 'joint-pain',
    name: 'Joint Pain & Arthritis',
    slug: 'joint-pain',
    description: 'Joint pain and arthritis affect mobility and quality of life.',
    keyStatistics: {
      prevalence: '15% of adults',
      impact: 'Reduces mobility and quality of life',
      reversalRate: '80% improvement with intervention',
    },
    overview:
      'Joint pain and arthritis are common conditions affecting millions. While some forms are degenerative, many can be managed and improved through lifestyle modifications, proper nutrition, and targeted exercise.',
    symptoms: [
      {
        title: 'Joint Pain',
        description: 'Persistent pain in joints',
        icon: 'zap',
      },
      {
        title: 'Stiffness',
        description: 'Reduced range of motion',
        icon: 'lock',
      },
      {
        title: 'Swelling',
        description: 'Inflammation and swelling',
        icon: 'alert-circle',
      },
      {
        title: 'Reduced Mobility',
        description: 'Difficulty moving and exercising',
        icon: 'move',
      },
    ],
    rootCauses: [
      {
        title: 'Inflammation',
        description: 'Chronic inflammatory response',
      },
      {
        title: 'Poor Nutrition',
        description: 'Lack of anti-inflammatory foods',
      },
      {
        title: 'Sedentary Lifestyle',
        description: 'Lack of movement and exercise',
      },
      {
        title: 'Excess Weight',
        description: 'Extra stress on joints',
      },
    ],
    reversalMechanism:
      'Anti-inflammatory diet, targeted exercise, and proper supplementation can reduce pain and improve joint health.',
    relatedPrograms: [
      {
        id: 'joint-health',
        name: 'Joint Health Program',
        link: '/programs/joint-health',
      },
    ],
    seoMetadata: {
      title: 'Joint Pain Relief - WellPro',
      description: 'Natural approaches to managing joint pain and arthritis.',
      keywords: ['joint pain', 'arthritis', 'inflammation', 'mobility'],
    },
  },
  pcod: {
    id: 'pcod',
    name: 'PCOD (Polycystic Ovarian Disorder)',
    slug: 'pcod',
    description: 'PCOD affects hormonal balance and reproductive health.',
    keyStatistics: {
      prevalence: '10-20% of women',
      impact: 'Affects fertility and hormonal health',
      reversalRate: '70% improvement with intervention',
    },
    overview:
      'PCOD is a hormonal disorder affecting women of reproductive age. It can be managed through lifestyle changes, proper nutrition, and stress management.',
    symptoms: [
      {
        title: 'Irregular Periods',
        description: 'Unpredictable menstrual cycles',
        icon: 'calendar',
      },
      {
        title: 'Weight Gain',
        description: 'Difficulty losing weight',
        icon: 'scale',
      },
      {
        title: 'Acne',
        description: 'Hormonal acne and skin issues',
        icon: 'alert-circle',
      },
      {
        title: 'Hair Loss',
        description: 'Excessive hair loss',
        icon: 'scissors',
      },
    ],
    rootCauses: [
      {
        title: 'Insulin Resistance',
        description: 'Elevated insulin levels',
      },
      {
        title: 'Hormonal Imbalance',
        description: 'Excess androgens',
      },
      {
        title: 'Inflammation',
        description: 'Chronic inflammation',
      },
      {
        title: 'Lifestyle Factors',
        description: 'Diet and stress',
      },
    ],
    reversalMechanism:
      'Balanced nutrition, regular exercise, and stress management can restore hormonal balance and improve symptoms.',
    relatedPrograms: [
      {
        id: 'pcod-wellness',
        name: 'PCOD Wellness Program',
        link: '/programs/pcod-wellness',
      },
    ],
    seoMetadata: {
      title: 'PCOD Management - WellPro',
      description: 'Natural approaches to managing PCOD and hormonal health.',
      keywords: ['PCOD', 'hormonal health', 'fertility', 'women wellness'],
    },
  },
  cholesterol: {
    id: 'cholesterol',
    name: 'High Cholesterol',
    slug: 'cholesterol',
    description: 'High cholesterol increases risk of heart disease and stroke.',
    keyStatistics: {
      prevalence: '39% of adults',
      impact: 'Leading risk factor for cardiovascular disease',
      reversalRate: '80% improvement with intervention',
    },
    overview:
      'High cholesterol is a major risk factor for heart disease. Through dietary changes, exercise, and stress management, cholesterol levels can be normalized naturally.',
    symptoms: [
      {
        title: 'No Symptoms',
        description: 'Often asymptomatic - requires testing',
        icon: 'alert-circle',
      },
      {
        title: 'Chest Pain',
        description: 'May indicate advanced disease',
        icon: 'heart',
      },
      {
        title: 'Shortness of Breath',
        description: 'Sign of cardiovascular stress',
        icon: 'wind',
      },
      {
        title: 'Fatigue',
        description: 'General tiredness',
        icon: 'battery-low',
      },
    ],
    rootCauses: [
      {
        title: 'Poor Diet',
        description: 'High saturated fat and processed foods',
      },
      {
        title: 'Sedentary Lifestyle',
        description: 'Lack of physical activity',
      },
      {
        title: 'Obesity',
        description: 'Excess body weight',
      },
      {
        title: 'Genetic Factors',
        description: 'Family history of high cholesterol',
      },
    ],
    reversalMechanism:
      'Heart-healthy diet, regular exercise, weight management, and stress reduction can lower cholesterol naturally.',
    relatedPrograms: [
      {
        id: 'cholesterol-reversal',
        name: 'Cholesterol Reversal Program',
        link: '/programs/cholesterol-reversal',
      },
    ],
    seoMetadata: {
      title: 'High Cholesterol Management - WellPro',
      description: 'Natural approaches to managing high cholesterol and heart health.',
      keywords: ['cholesterol', 'heart health', 'cardiovascular', 'wellness'],
    },
  },
  depression: {
    id: 'depression',
    name: 'Depression',
    slug: 'depression',
    description: 'Depression affects mental health and overall wellbeing.',
    keyStatistics: {
      prevalence: '5% of adults',
      impact: 'Leading cause of disability worldwide',
      reversalRate: '75% improvement with intervention',
    },
    overview:
      'Depression is a serious mental health condition that can be managed through lifestyle changes, therapy, and holistic approaches.',
    symptoms: [
      {
        title: 'Persistent Sadness',
        description: 'Ongoing low mood',
        icon: 'cloud-rain',
      },
      {
        title: 'Loss of Interest',
        description: 'Lack of enjoyment in activities',
        icon: 'slash',
      },
      {
        title: 'Sleep Issues',
        description: 'Insomnia or oversleeping',
        icon: 'moon',
      },
      {
        title: 'Fatigue',
        description: 'Persistent tiredness',
        icon: 'battery-low',
      },
    ],
    rootCauses: [
      {
        title: 'Chronic Stress',
        description: 'Prolonged stress and anxiety',
      },
      {
        title: 'Poor Nutrition',
        description: 'Nutrient deficiencies',
      },
      {
        title: 'Lack of Exercise',
        description: 'Sedentary lifestyle',
      },
      {
        title: 'Sleep Deprivation',
        description: 'Inadequate sleep',
      },
    ],
    reversalMechanism:
      'Exercise, proper nutrition, stress management, and mindfulness practices can significantly improve mood and mental health.',
    relatedPrograms: [
      {
        id: 'happy-life',
        name: 'The Happy Life Program',
        link: '/programs/happy-life',
      },
    ],
    seoMetadata: {
      title: 'Depression Support - WellPro',
      description: 'Holistic approaches to managing depression and mental health.',
      keywords: ['depression', 'mental health', 'wellness', 'mindfulness'],
    },
  },
  'erectile-dysfunction': {
    id: 'erectile-dysfunction',
    name: 'Erectile Dysfunction',
    slug: 'erectile-dysfunction',
    description: 'Erectile dysfunction affects sexual health and confidence.',
    keyStatistics: {
      prevalence: '30% of men',
      impact: 'Affects sexual health and relationships',
      reversalRate: '70% improvement with intervention',
    },
    overview:
      'Erectile dysfunction is often a sign of underlying health issues. Through lifestyle changes and targeted interventions, sexual function can be restored.',
    symptoms: [
      {
        title: 'Difficulty Achieving Erection',
        description: 'Inability to get or maintain erection',
        icon: 'alert-circle',
      },
      {
        title: 'Reduced Sexual Desire',
        description: 'Low libido',
        icon: 'heart',
      },
      {
        title: 'Premature Ejaculation',
        description: 'Lack of control',
        icon: 'zap',
      },
      {
        title: 'Performance Anxiety',
        description: 'Stress about sexual performance',
        icon: 'alert-triangle',
      },
    ],
    rootCauses: [
      {
        title: 'Poor Circulation',
        description: 'Cardiovascular issues',
      },
      {
        title: 'Hormonal Imbalance',
        description: 'Low testosterone',
      },
      {
        title: 'Stress and Anxiety',
        description: 'Psychological factors',
      },
      {
        title: 'Poor Lifestyle',
        description: 'Smoking, alcohol, sedentary habits',
      },
    ],
    reversalMechanism:
      'Improved cardiovascular health, stress management, proper nutrition, and exercise can restore sexual function.',
    relatedPrograms: [
      {
        id: 'vitality-program',
        name: 'Vitality Program',
        link: '/programs/vitality-program',
      },
    ],
    seoMetadata: {
      title: 'Erectile Dysfunction Support - WellPro',
      description: 'Natural approaches to managing erectile dysfunction and sexual health.',
      keywords: ['erectile dysfunction', 'sexual health', 'vitality', 'wellness'],
    },
  },
  'immune-system': {
    id: 'immune-system',
    name: 'Weak Immune System',
    slug: 'immune-system',
    description: 'A weak immune system increases susceptibility to infections.',
    keyStatistics: {
      prevalence: '20% of population',
      impact: 'Increased susceptibility to illness',
      reversalRate: '85% improvement with intervention',
    },
    overview:
      'A strong immune system is essential for health. Through proper nutrition, sleep, exercise, and stress management, immune function can be significantly enhanced.',
    symptoms: [
      {
        title: 'Frequent Infections',
        description: 'Recurring colds and infections',
        icon: 'alert-circle',
      },
      {
        title: 'Slow Healing',
        description: 'Wounds heal slowly',
        icon: 'bandage',
      },
      {
        title: 'Fatigue',
        description: 'Persistent tiredness',
        icon: 'battery-low',
      },
      {
        title: 'Swollen Lymph Nodes',
        description: 'Enlarged glands',
        icon: 'alert-triangle',
      },
    ],
    rootCauses: [
      {
        title: 'Poor Nutrition',
        description: 'Nutrient deficiencies',
      },
      {
        title: 'Chronic Stress',
        description: 'Stress suppresses immunity',
      },
      {
        title: 'Inadequate Sleep',
        description: 'Sleep is crucial for immune function',
      },
      {
        title: 'Lack of Exercise',
        description: 'Physical activity boosts immunity',
      },
    ],
    reversalMechanism:
      'Proper nutrition, adequate sleep, regular exercise, and stress management can significantly boost immune function.',
    relatedPrograms: [
      {
        id: 'immunity-boost',
        name: 'Immunity Boost Program',
        link: '/programs/immunity-boost',
      },
    ],
    seoMetadata: {
      title: 'Immune System Support - WellPro',
      description: 'Natural approaches to strengthening your immune system.',
      keywords: ['immune system', 'immunity', 'health', 'wellness'],
    },
  },
};

const MOCK_PROTOCOLS = {
  'deep-detox': {
    id: 'deep-detox',
    name: 'Deep Detox',
    slug: 'deep-detox',
    description: 'A comprehensive detoxification protocol to cleanse your body naturally.',
    overview:
      'The Deep Detox protocol is designed to support your body\'s natural detoxification processes through dietary changes, supplements, and lifestyle modifications.',
    scientificBasis:
      'Research shows that supporting liver and kidney function through targeted nutrition can enhance the body\'s natural detoxification pathways.',
    benefits: [
      {
        title: 'Improved Energy',
        description: 'Increased vitality and reduced fatigue',
        icon: 'zap',
      },
      {
        title: 'Better Digestion',
        description: 'Enhanced digestive function and nutrient absorption',
        icon: 'stomach',
      },
      {
        title: 'Clearer Skin',
        description: 'Reduced inflammation and improved skin clarity',
        icon: 'sparkles',
      },
      {
        title: 'Mental Clarity',
        description: 'Improved focus and cognitive function',
        icon: 'brain',
      },
    ],
    implementationSteps: [
      {
        number: 1,
        title: 'Eliminate Toxins',
        description: 'Remove processed foods, sugar, and alcohol from your diet',
        details: 'Focus on whole, organic foods for 7 days',
      },
      {
        number: 2,
        title: 'Hydrate',
        description: 'Drink plenty of filtered water and herbal teas',
        details: 'Aim for 3-4 liters of water daily',
      },
      {
        number: 3,
        title: 'Support Liver Function',
        description: 'Include liver-supporting foods and supplements',
        details: 'Add turmeric, milk thistle, and leafy greens',
      },
      {
        number: 4,
        title: 'Rest and Recover',
        description: 'Prioritize sleep and stress management',
        details: 'Get 8+ hours of quality sleep nightly',
      },
    ],
    expectedResults:
      'Most participants report improved energy, better digestion, and clearer skin within 2-3 weeks.',
    duration: '21 days',
    difficulty: 'Moderate',
    relatedProtocols: [],
    seoMetadata: {
      title: 'Deep Detox Protocol - WellPro',
      description: 'Learn about the Deep Detox protocol and how to cleanse your body naturally.',
      keywords: ['detox', 'cleanse', 'liver health', 'detoxification'],
    },
  },
  'alkaline-water': {
    id: 'alkaline-water',
    name: 'Alkaline Water Protocol',
    slug: 'alkaline-water',
    description: 'Optimize your hydration with alkaline water for better health.',
    overview:
      'The Alkaline Water protocol focuses on proper hydration using alkaline water to support pH balance and cellular health.',
    scientificBasis:
      'Alkaline water may help neutralize acid in the body and support optimal pH balance for better health outcomes.',
    benefits: [
      {
        title: 'Better Hydration',
        description: 'Enhanced cellular hydration',
        icon: 'droplet',
      },
      {
        title: 'pH Balance',
        description: 'Supports optimal body pH',
        icon: 'scale',
      },
      {
        title: 'Antioxidant Support',
        description: 'Rich in antioxidants',
        icon: 'shield',
      },
      {
        title: 'Improved Digestion',
        description: 'Better digestive function',
        icon: 'stomach',
      },
    ],
    implementationSteps: [
      {
        number: 1,
        title: 'Get Alkaline Water',
        description: 'Invest in an alkaline water filter or ionizer',
        details: 'Choose a quality system for your home',
      },
      {
        number: 2,
        title: 'Drink Consistently',
        description: 'Drink 2-3 liters daily',
        details: 'Replace regular water with alkaline water',
      },
      {
        number: 3,
        title: 'Monitor pH Levels',
        description: 'Track your body pH',
        details: 'Use pH testing strips regularly',
      },
      {
        number: 4,
        title: 'Combine with Diet',
        description: 'Eat alkaline-forming foods',
        details: 'Focus on vegetables and fruits',
      },
    ],
    expectedResults:
      'Users report improved energy, better digestion, and clearer skin within 4-6 weeks.',
    duration: '30 days',
    difficulty: 'Easy',
    relatedProtocols: [],
    seoMetadata: {
      title: 'Alkaline Water Protocol - WellPro',
      description: 'Learn about alkaline water and its health benefits.',
      keywords: ['alkaline water', 'hydration', 'pH balance', 'wellness'],
    },
  },
  'intermittent-fasting': {
    id: 'intermittent-fasting',
    name: 'Intermittent Fasting Protocol',
    slug: 'intermittent-fasting',
    description: 'Optimize your metabolism with strategic fasting periods.',
    overview:
      'Intermittent fasting is an eating pattern that cycles between periods of eating and fasting to support metabolic health.',
    scientificBasis:
      'Research shows intermittent fasting can improve insulin sensitivity, support weight loss, and enhance cellular repair processes.',
    benefits: [
      {
        title: 'Weight Loss',
        description: 'Effective fat loss',
        icon: 'scale',
      },
      {
        title: 'Improved Metabolism',
        description: 'Enhanced metabolic rate',
        icon: 'zap',
      },
      {
        title: 'Better Focus',
        description: 'Improved mental clarity',
        icon: 'brain',
      },
      {
        title: 'Cellular Repair',
        description: 'Supports autophagy',
        icon: 'refresh-cw',
      },
    ],
    implementationSteps: [
      {
        number: 1,
        title: 'Choose Your Protocol',
        description: 'Select 16:8, 5:2, or other fasting schedule',
        details: '16:8 means 16 hours fasting, 8 hours eating',
      },
      {
        number: 2,
        title: 'Start Gradually',
        description: 'Begin with shorter fasting periods',
        details: 'Gradually increase fasting duration',
      },
      {
        number: 3,
        title: 'Stay Hydrated',
        description: 'Drink water, tea, or coffee during fasting',
        details: 'No calories during fasting window',
      },
      {
        number: 4,
        title: 'Eat Nutritiously',
        description: 'Focus on whole foods during eating window',
        details: 'Avoid processed foods',
      },
    ],
    expectedResults:
      'Most users see weight loss and improved energy within 2-4 weeks.',
    duration: '30 days',
    difficulty: 'Moderate',
    relatedProtocols: [],
    seoMetadata: {
      title: 'Intermittent Fasting Protocol - WellPro',
      description: 'Learn about intermittent fasting and its metabolic benefits.',
      keywords: ['intermittent fasting', 'metabolism', 'weight loss', 'fasting'],
    },
  },
};

const MOCK_PROGRAMS = {
  'diabetes-reversal': {
    id: 'diabetes-reversal',
    name: 'Diabetes Reversal Program',
    slug: 'diabetes-reversal',
    description: 'A comprehensive 12-week program to reverse type 2 diabetes naturally.',
    targetAudience: 'Individuals with type 2 diabetes or prediabetes',
    overview:
      'The Diabetes Reversal Program combines nutrition, exercise, stress management, and sleep optimization to restore insulin sensitivity and normalize blood sugar levels.',
    components: [
      {
        title: 'Nutrition Coaching',
        description: 'Personalized meal plans and dietary guidance',
        protocols: ['deep-detox', 'alkaline-water'],
      },
      {
        title: 'Exercise Program',
        description: 'Structured workout routines for metabolic health',
        protocols: [],
      },
      {
        title: 'Stress Management',
        description: 'Meditation and mindfulness techniques',
        protocols: [],
      },
    ],
    timeline: {
      duration: '12 weeks',
      phases: [
        {
          number: 1,
          title: 'Foundation Phase',
          duration: '4 weeks',
          objectives: [
            'Establish baseline health metrics',
            'Begin dietary changes',
            'Start exercise routine',
          ],
        },
        {
          number: 2,
          title: 'Optimization Phase',
          duration: '4 weeks',
          objectives: [
            'Deepen dietary changes',
            'Increase exercise intensity',
            'Implement stress management',
          ],
        },
        {
          number: 3,
          title: 'Integration Phase',
          duration: '4 weeks',
          objectives: [
            'Consolidate lifestyle changes',
            'Achieve target health metrics',
            'Plan long-term maintenance',
          ],
        },
      ],
    },
    expectedOutcomes: [
      {
        title: 'Normalized Blood Sugar',
        description: 'Achieve fasting glucose levels in normal range',
      },
      {
        title: 'Weight Loss',
        description: 'Average 8-12 kg weight loss over 12 weeks',
      },
      {
        title: 'Improved Energy',
        description: 'Increased vitality and reduced fatigue',
      },
    ],
    testimonials: [
      {
        name: 'John Doe',
        role: 'Program Graduate',
        content: 'I reversed my diabetes in 12 weeks. This program changed my life!',
        image: '/testimonial-1.jpg',
      },
    ],
    enrollmentCTA: {
      text: 'Enroll Now',
      link: '/enroll/diabetes-reversal',
    },
    seoMetadata: {
      title: 'Diabetes Reversal Program - WellPro',
      description: 'A comprehensive 12-week program to reverse type 2 diabetes naturally.',
      keywords: ['diabetes reversal', 'type 2 diabetes', 'program', 'wellness'],
    },
  },
  'weight-loss': {
    id: 'weight-loss',
    name: 'Weight Loss Program',
    slug: 'weight-loss',
    description: 'A comprehensive program for sustainable weight loss and metabolic health.',
    targetAudience: 'Individuals looking to lose weight and improve metabolic health',
    overview:
      'The Weight Loss Program combines nutrition coaching, exercise guidance, and behavioral support for sustainable weight loss.',
    components: [
      {
        title: 'Nutrition Coaching',
        description: 'Personalized meal plans and dietary guidance',
        protocols: ['alkaline-water', 'intermittent-fasting'],
      },
      {
        title: 'Exercise Program',
        description: 'Structured workout routines for fat loss',
        protocols: [],
      },
      {
        title: 'Behavioral Support',
        description: 'Mindset coaching and habit formation',
        protocols: [],
      },
    ],
    timeline: {
      duration: '12 weeks',
      phases: [
        {
          number: 1,
          title: 'Foundation Phase',
          duration: '4 weeks',
          objectives: [
            'Establish baseline metrics',
            'Begin dietary changes',
            'Start exercise routine',
          ],
        },
        {
          number: 2,
          title: 'Acceleration Phase',
          duration: '4 weeks',
          objectives: [
            'Increase exercise intensity',
            'Deepen dietary changes',
            'Build healthy habits',
          ],
        },
        {
          number: 3,
          title: 'Maintenance Phase',
          duration: '4 weeks',
          objectives: [
            'Consolidate results',
            'Plan long-term maintenance',
            'Achieve target weight',
          ],
        },
      ],
    },
    expectedOutcomes: [
      {
        title: 'Sustainable Weight Loss',
        description: 'Average 1-2 kg per week',
      },
      {
        title: 'Improved Metabolism',
        description: 'Faster metabolic rate',
      },
      {
        title: 'Increased Energy',
        description: 'Better energy levels throughout the day',
      },
    ],
    testimonials: [
      {
        name: 'Sarah Smith',
        role: 'Program Graduate',
        content: 'I lost 15 kg and feel amazing! The program is life-changing.',
        image: '/testimonial-2.jpg',
      },
    ],
    enrollmentCTA: {
      text: 'Start Now',
      link: '/enroll/weight-loss',
    },
    seoMetadata: {
      title: 'Weight Loss Program - WellPro',
      description: 'Sustainable weight loss through nutrition and lifestyle changes.',
      keywords: ['weight loss', 'metabolism', 'fitness', 'wellness program'],
    },
  },
  'thyroid-wellness': {
    id: 'thyroid-wellness',
    name: 'Thyroid Wellness Program',
    slug: 'thyroid-wellness',
    description: 'Support your thyroid health with targeted nutrition and lifestyle changes.',
    targetAudience: 'Individuals with thyroid disorders or thyroid health concerns',
    overview:
      'The Thyroid Wellness Program focuses on supporting thyroid function through proper nutrition, supplementation, and stress management.',
    components: [
      {
        title: 'Thyroid-Specific Nutrition',
        description: 'Foods and supplements that support thyroid health',
        protocols: ['deep-detox'],
      },
      {
        title: 'Stress Management',
        description: 'Techniques to reduce stress and support thyroid function',
        protocols: [],
      },
      {
        title: 'Sleep Optimization',
        description: 'Improve sleep quality for thyroid health',
        protocols: [],
      },
    ],
    timeline: {
      duration: '8 weeks',
      phases: [
        {
          number: 1,
          title: 'Assessment Phase',
          duration: '2 weeks',
          objectives: [
            'Get thyroid testing',
            'Identify deficiencies',
            'Establish baseline',
          ],
        },
        {
          number: 2,
          title: 'Intervention Phase',
          duration: '4 weeks',
          objectives: [
            'Implement dietary changes',
            'Start supplementation',
            'Manage stress',
          ],
        },
        {
          number: 3,
          title: 'Optimization Phase',
          duration: '2 weeks',
          objectives: [
            'Fine-tune protocol',
            'Retest thyroid levels',
            'Plan maintenance',
          ],
        },
      ],
    },
    expectedOutcomes: [
      {
        title: 'Improved Energy',
        description: 'Increased vitality and reduced fatigue',
      },
      {
        title: 'Better Metabolism',
        description: 'Improved metabolic function',
      },
      {
        title: 'Normalized Thyroid Levels',
        description: 'Better thyroid hormone balance',
      },
    ],
    testimonials: [
      {
        name: 'Michael Johnson',
        role: 'Program Graduate',
        content: 'My thyroid levels are finally normal and I have energy again!',
        image: '/testimonial-3.jpg',
      },
    ],
    enrollmentCTA: {
      text: 'Enroll Now',
      link: '/enroll/thyroid-wellness',
    },
    seoMetadata: {
      title: 'Thyroid Wellness Program - WellPro',
      description: 'Support your thyroid health with targeted nutrition and lifestyle changes.',
      keywords: ['thyroid health', 'hypothyroidism', 'metabolism', 'wellness'],
    },
  },
  'cholesterol-reversal': {
    id: 'cholesterol-reversal',
    name: 'Cholesterol Reversal Program',
    slug: 'cholesterol-reversal',
    description: 'A comprehensive program to naturally lower cholesterol and improve heart health.',
    targetAudience: 'Individuals with high cholesterol or cardiovascular concerns',
    overview:
      'The Cholesterol Reversal Program combines heart-healthy nutrition, exercise, and stress management to naturally lower cholesterol levels.',
    components: [
      {
        title: 'Heart-Healthy Nutrition',
        description: 'Foods that lower cholesterol naturally',
        protocols: ['alkaline-water'],
      },
      {
        title: 'Cardiovascular Exercise',
        description: 'Targeted workouts for heart health',
        protocols: [],
      },
      {
        title: 'Stress Management',
        description: 'Techniques to reduce cardiovascular stress',
        protocols: [],
      },
    ],
    timeline: {
      duration: '12 weeks',
      phases: [
        {
          number: 1,
          title: 'Assessment Phase',
          duration: '2 weeks',
          objectives: [
            'Get cholesterol testing',
            'Establish baseline',
            'Identify risk factors',
          ],
        },
        {
          number: 2,
          title: 'Intervention Phase',
          duration: '6 weeks',
          objectives: [
            'Implement dietary changes',
            'Start exercise program',
            'Manage stress',
          ],
        },
        {
          number: 3,
          title: 'Optimization Phase',
          duration: '4 weeks',
          objectives: [
            'Fine-tune protocol',
            'Retest cholesterol levels',
            'Plan long-term maintenance',
          ],
        },
      ],
    },
    expectedOutcomes: [
      {
        title: 'Lowered Cholesterol',
        description: 'Achieve healthy cholesterol levels',
      },
      {
        title: 'Improved Heart Health',
        description: 'Better cardiovascular function',
      },
      {
        title: 'Increased Energy',
        description: 'Better overall vitality',
      },
    ],
    testimonials: [
      {
        name: 'Robert Williams',
        role: 'Program Graduate',
        content: 'My cholesterol dropped 40 points naturally. No medications needed!',
        image: '/testimonial-4.jpg',
      },
    ],
    enrollmentCTA: {
      text: 'Enroll Now',
      link: '/enroll/cholesterol-reversal',
    },
    seoMetadata: {
      title: 'Cholesterol Reversal Program - WellPro',
      description: 'Natural approaches to lowering cholesterol and improving heart health.',
      keywords: ['cholesterol', 'heart health', 'cardiovascular', 'wellness program'],
    },
  },
  'happy-life': {
    id: 'happy-life',
    name: 'The Happy Life Program',
    slug: 'happy-life',
    description: 'Transform your mental health and emotional wellbeing through holistic practices.',
    targetAudience: 'Individuals seeking mental health improvement and emotional wellbeing',
    overview:
      'The Happy Life Program combines exercise, nutrition, mindfulness, and social connection to improve mental health and emotional wellbeing.',
    components: [
      {
        title: 'Mindfulness & Meditation',
        description: 'Daily practices for mental clarity',
        protocols: [],
      },
      {
        title: 'Nutrition for Mental Health',
        description: 'Foods that support brain health',
        protocols: ['deep-detox'],
      },
      {
        title: 'Movement & Exercise',
        description: 'Physical activity for mood enhancement',
        protocols: [],
      },
      {
        title: 'Social Connection',
        description: 'Building meaningful relationships',
        protocols: [],
      },
    ],
    timeline: {
      duration: '8 weeks',
      phases: [
        {
          number: 1,
          title: 'Foundation Phase',
          duration: '2 weeks',
          objectives: [
            'Establish baseline mood',
            'Learn meditation basics',
            'Start exercise routine',
          ],
        },
        {
          number: 2,
          title: 'Integration Phase',
          duration: '4 weeks',
          objectives: [
            'Deepen mindfulness practice',
            'Implement dietary changes',
            'Build social connections',
          ],
        },
        {
          number: 3,
          title: 'Transformation Phase',
          duration: '2 weeks',
          objectives: [
            'Consolidate practices',
            'Achieve emotional balance',
            'Plan long-term wellness',
          ],
        },
      ],
    },
    expectedOutcomes: [
      {
        title: 'Improved Mood',
        description: 'Better emotional state and happiness',
      },
      {
        title: 'Reduced Anxiety',
        description: 'Lower stress and anxiety levels',
      },
      {
        title: 'Better Sleep',
        description: 'Improved sleep quality',
      },
      {
        title: 'Increased Resilience',
        description: 'Better ability to handle challenges',
      },
    ],
    testimonials: [
      {
        name: 'Emma Davis',
        role: 'Program Graduate',
        content: 'This program gave me my life back. I feel happy and at peace!',
        image: '/testimonial-5.jpg',
      },
    ],
    enrollmentCTA: {
      text: 'Start Your Journey',
      link: '/enroll/happy-life',
    },
    seoMetadata: {
      title: 'The Happy Life Program - WellPro',
      description: 'Transform your mental health and emotional wellbeing holistically.',
      keywords: ['mental health', 'happiness', 'wellness', 'mindfulness', 'emotional health'],
    },
  },
  'pcod-wellness': {
    id: 'pcod-wellness',
    name: 'PCOD Wellness Program',
    slug: 'pcod-wellness',
    description: 'A comprehensive program to manage PCOD and restore hormonal balance.',
    targetAudience: 'Women with PCOD or hormonal imbalances',
    overview:
      'The PCOD Wellness Program focuses on restoring hormonal balance through targeted nutrition, exercise, stress management, and lifestyle modifications.',
    components: [
      {
        title: 'Hormonal Nutrition',
        description: 'Foods that support hormonal balance',
        protocols: ['alkaline-water', 'intermittent-fasting'],
      },
      {
        title: 'Targeted Exercise',
        description: 'Workouts designed for PCOD management',
        protocols: [],
      },
      {
        title: 'Stress & Sleep Management',
        description: 'Techniques to reduce stress and improve sleep',
        protocols: [],
      },
      {
        title: 'Supplement Protocol',
        description: 'Targeted supplementation for hormonal health',
        protocols: [],
      },
    ],
    timeline: {
      duration: '12 weeks',
      phases: [
        {
          number: 1,
          title: 'Assessment Phase',
          duration: '2 weeks',
          objectives: [
            'Get hormonal testing',
            'Identify deficiencies',
            'Establish baseline',
          ],
        },
        {
          number: 2,
          title: 'Intervention Phase',
          duration: '6 weeks',
          objectives: [
            'Implement dietary changes',
            'Start exercise program',
            'Begin supplementation',
          ],
        },
        {
          number: 3,
          title: 'Optimization Phase',
          duration: '4 weeks',
          objectives: [
            'Fine-tune protocol',
            'Retest hormonal levels',
            'Plan long-term maintenance',
          ],
        },
      ],
    },
    expectedOutcomes: [
      {
        title: 'Regular Periods',
        description: 'Normalized menstrual cycles',
      },
      {
        title: 'Weight Management',
        description: 'Easier weight loss and management',
      },
      {
        title: 'Improved Skin',
        description: 'Reduced acne and skin issues',
      },
      {
        title: 'Better Energy',
        description: 'Increased vitality and reduced fatigue',
      },
    ],
    testimonials: [
      {
        name: 'Priya Sharma',
        role: 'Program Graduate',
        content: 'My periods are regular again and I feel so much better! This program works!',
        image: '/testimonial-6.jpg',
      },
    ],
    enrollmentCTA: {
      text: 'Enroll Now',
      link: '/enroll/pcod-wellness',
    },
    seoMetadata: {
      title: 'PCOD Wellness Program - WellPro',
      description: 'Manage PCOD and restore hormonal balance naturally.',
      keywords: ['PCOD', 'hormonal health', 'women wellness', 'fertility', 'program'],
    },
  },
  'immunity-boost': {
    id: 'immunity-boost',
    name: 'Immunity Boost Program',
    slug: 'immunity-boost',
    description: 'Strengthen your immune system and build resilience against illness.',
    targetAudience: 'Individuals with weak immunity or frequent infections',
    overview:
      'The Immunity Boost Program combines targeted nutrition, exercise, sleep optimization, and stress management to strengthen immune function.',
    components: [
      {
        title: 'Immune-Boosting Nutrition',
        description: 'Foods rich in immune-supporting nutrients',
        protocols: ['deep-detox'],
      },
      {
        title: 'Exercise & Movement',
        description: 'Physical activity to enhance immune function',
        protocols: [],
      },
      {
        title: 'Sleep Optimization',
        description: 'Quality sleep for immune recovery',
        protocols: [],
      },
      {
        title: 'Stress Management',
        description: 'Techniques to reduce immune-suppressing stress',
        protocols: [],
      },
    ],
    timeline: {
      duration: '8 weeks',
      phases: [
        {
          number: 1,
          title: 'Foundation Phase',
          duration: '2 weeks',
          objectives: [
            'Assess immune status',
            'Identify deficiencies',
            'Begin dietary changes',
          ],
        },
        {
          number: 2,
          title: 'Building Phase',
          duration: '4 weeks',
          objectives: [
            'Implement full protocol',
            'Start exercise routine',
            'Optimize sleep',
          ],
        },
        {
          number: 3,
          title: 'Strengthening Phase',
          duration: '2 weeks',
          objectives: [
            'Consolidate practices',
            'Assess immune improvement',
            'Plan maintenance',
          ],
        },
      ],
    },
    expectedOutcomes: [
      {
        title: 'Fewer Infections',
        description: 'Reduced frequency of colds and infections',
      },
      {
        title: 'Faster Recovery',
        description: 'Quicker healing from illness',
      },
      {
        title: 'Increased Energy',
        description: 'Better overall vitality',
      },
      {
        title: 'Better Health',
        description: 'Improved overall wellness',
      },
    ],
    testimonials: [
      {
        name: 'Rajesh Kumar',
        role: 'Program Graduate',
        content: 'I used to get sick every month. Now I rarely get ill. This program is amazing!',
        image: '/testimonial-7.jpg',
      },
    ],
    enrollmentCTA: {
      text: 'Boost Your Immunity',
      link: '/enroll/immunity-boost',
    },
    seoMetadata: {
      title: 'Immunity Boost Program - WellPro',
      description: 'Strengthen your immune system and build resilience naturally.',
      keywords: ['immunity', 'immune system', 'health', 'wellness program', 'infections'],
    },
  },
  'vitality-program': {
    id: 'vitality-program',
    name: 'Vitality Program',
    slug: 'vitality-program',
    description: 'Restore sexual health, energy, and vitality through holistic wellness.',
    targetAudience: 'Individuals seeking to improve sexual health and overall vitality',
    overview:
      'The Vitality Program combines cardiovascular health, hormonal balance, stress management, and targeted nutrition to restore sexual function and energy.',
    components: [
      {
        title: 'Cardiovascular Health',
        description: 'Exercises and nutrition for better circulation',
        protocols: ['alkaline-water'],
      },
      {
        title: 'Hormonal Balance',
        description: 'Nutrition and supplements for hormone optimization',
        protocols: [],
      },
      {
        title: 'Stress & Anxiety Relief',
        description: 'Techniques to reduce performance anxiety',
        protocols: [],
      },
      {
        title: 'Relationship Wellness',
        description: 'Communication and intimacy guidance',
        protocols: [],
      },
    ],
    timeline: {
      duration: '10 weeks',
      phases: [
        {
          number: 1,
          title: 'Assessment Phase',
          duration: '2 weeks',
          objectives: [
            'Assess cardiovascular health',
            'Identify root causes',
            'Establish baseline',
          ],
        },
        {
          number: 2,
          title: 'Intervention Phase',
          duration: '5 weeks',
          objectives: [
            'Improve cardiovascular function',
            'Balance hormones',
            'Reduce anxiety',
          ],
        },
        {
          number: 3,
          title: 'Restoration Phase',
          duration: '3 weeks',
          objectives: [
            'Consolidate improvements',
            'Restore sexual function',
            'Plan long-term wellness',
          ],
        },
      ],
    },
    expectedOutcomes: [
      {
        title: 'Improved Sexual Function',
        description: 'Better erectile function and sexual performance',
      },
      {
        title: 'Increased Energy',
        description: 'Greater vitality and stamina',
      },
      {
        title: 'Better Confidence',
        description: 'Improved self-esteem and confidence',
      },
      {
        title: 'Stronger Relationships',
        description: 'Improved intimacy and connection',
      },
    ],
    testimonials: [
      {
        name: 'Arjun Singh',
        role: 'Program Graduate',
        content: 'This program restored my confidence and my relationship. Highly recommended!',
        image: '/testimonial-8.jpg',
      },
    ],
    enrollmentCTA: {
      text: 'Restore Your Vitality',
      link: '/enroll/vitality-program',
    },
    seoMetadata: {
      title: 'Vitality Program - WellPro',
      description: 'Restore sexual health, energy, and vitality holistically.',
      keywords: ['vitality', 'sexual health', 'energy', 'wellness program', 'confidence'],
    },
  },
  'joint-health': {
    id: 'joint-health',
    name: 'Joint Health Program',
    slug: 'joint-health',
    description: 'Reduce joint pain and improve mobility through targeted wellness.',
    targetAudience: 'Individuals with joint pain, arthritis, or mobility issues',
    overview:
      'The Joint Health Program combines anti-inflammatory nutrition, targeted exercise, stress management, and supplementation to reduce pain and improve mobility.',
    components: [
      {
        title: 'Anti-Inflammatory Nutrition',
        description: 'Foods that reduce inflammation',
        protocols: ['deep-detox', 'alkaline-water'],
      },
      {
        title: 'Targeted Exercise',
        description: 'Low-impact exercises for joint health',
        protocols: [],
      },
      {
        title: 'Supplement Protocol',
        description: 'Supplements for joint support and repair',
        protocols: [],
      },
      {
        title: 'Stress & Sleep Management',
        description: 'Techniques to support healing',
        protocols: [],
      },
    ],
    timeline: {
      duration: '12 weeks',
      phases: [
        {
          number: 1,
          title: 'Assessment Phase',
          duration: '2 weeks',
          objectives: [
            'Assess joint health',
            'Identify inflammation sources',
            'Establish baseline pain levels',
          ],
        },
        {
          number: 2,
          title: 'Intervention Phase',
          duration: '6 weeks',
          objectives: [
            'Implement anti-inflammatory diet',
            'Start exercise program',
            'Begin supplementation',
          ],
        },
        {
          number: 3,
          title: 'Restoration Phase',
          duration: '4 weeks',
          objectives: [
            'Consolidate improvements',
            'Increase mobility',
            'Plan long-term maintenance',
          ],
        },
      ],
    },
    expectedOutcomes: [
      {
        title: 'Reduced Pain',
        description: 'Significant reduction in joint pain',
      },
      {
        title: 'Improved Mobility',
        description: 'Better range of motion and flexibility',
      },
      {
        title: 'Increased Activity',
        description: 'Ability to do more physical activities',
      },
      {
        title: 'Better Quality of Life',
        description: 'Improved overall wellbeing',
      },
    ],
    testimonials: [
      {
        name: 'Meera Patel',
        role: 'Program Graduate',
        content: 'I can walk without pain now! This program gave me my life back!',
        image: '/testimonial-9.jpg',
      },
    ],
    enrollmentCTA: {
      text: 'Improve Joint Health',
      link: '/enroll/joint-health',
    },
    seoMetadata: {
      title: 'Joint Health Program - WellPro',
      description: 'Reduce joint pain and improve mobility naturally.',
      keywords: ['joint pain', 'arthritis', 'mobility', 'wellness program', 'inflammation'],
    },
  },
};

const MOCK_VERTICALS = [
  {
    id: 'nutrition',
    name: 'Nutrition',
    description: 'Optimize your diet for health and vitality',
    icon: 'apple',
    relatedProtocols: [
      { id: 'deep-detox', name: 'Deep Detox', link: '/protocols/deep-detox' },
    ],
    relatedPrograms: [
      { id: 'diabetes-reversal', name: 'Diabetes Reversal', link: '/programs/diabetes-reversal' },
    ],
    link: '/verticals/nutrition',
  },
  {
    id: 'fitness',
    name: 'Fitness',
    description: 'Build strength and endurance through exercise',
    icon: 'dumbbell',
    relatedProtocols: [],
    relatedPrograms: [],
    link: '/verticals/fitness',
  },
  {
    id: 'sleep',
    name: 'Sleep',
    description: 'Improve sleep quality for better health',
    icon: 'moon',
    relatedProtocols: [],
    relatedPrograms: [],
    link: '/verticals/sleep',
  },
  {
    id: 'stress',
    name: 'Stress Management',
    description: 'Reduce stress and improve mental health',
    icon: 'zen',
    relatedProtocols: [],
    relatedPrograms: [],
    link: '/verticals/stress',
  },
  {
    id: 'hydration',
    name: 'Hydration',
    description: 'Optimize water intake and hydration',
    icon: 'droplet',
    relatedProtocols: [],
    relatedPrograms: [],
    link: '/verticals/hydration',
  },
  {
    id: 'digestion',
    name: 'Digestion',
    description: 'Support healthy digestive function',
    icon: 'stomach',
    relatedProtocols: [],
    relatedPrograms: [],
    link: '/verticals/digestion',
  },
  {
    id: 'immunity',
    name: 'Immunity',
    description: 'Strengthen your immune system',
    icon: 'shield',
    relatedProtocols: [],
    relatedPrograms: [],
    link: '/verticals/immunity',
  },
  {
    id: 'detox',
    name: 'Detoxification',
    description: 'Support your body\'s natural detox processes',
    icon: 'leaf',
    relatedProtocols: [],
    relatedPrograms: [],
    link: '/verticals/detox',
  },
  {
    id: 'hormones',
    name: 'Hormonal Balance',
    description: 'Optimize hormonal health and balance',
    icon: 'heart',
    relatedProtocols: [],
    relatedPrograms: [],
    link: '/verticals/hormones',
  },
  {
    id: 'inflammation',
    name: 'Inflammation Management',
    description: 'Reduce chronic inflammation naturally',
    icon: 'flame',
    relatedProtocols: [],
    relatedPrograms: [],
    link: '/verticals/inflammation',
  },
  {
    id: 'longevity',
    name: 'Longevity',
    description: 'Extend healthspan and lifespan',
    icon: 'sparkles',
    relatedProtocols: [],
    relatedPrograms: [],
    link: '/verticals/longevity',
  },
  {
    id: 'mindfulness',
    name: 'Mindfulness',
    description: 'Cultivate mental clarity and presence',
    icon: 'brain',
    relatedProtocols: [],
    relatedPrograms: [],
    link: '/verticals/mindfulness',
  },
];

const MOCK_WOW_ASSESSMENT = {
  name: 'World of Wellness (WOW) Assessment',
  description: 'Comprehensive wellness assessment across 12 key health parameters',
  overview:
    'The WOW Assessment evaluates your wellness across 12 dimensions to provide a holistic view of your health status and identify areas for improvement.',
  parameters: [
    {
      number: 1,
      title: 'Nutrition',
      description: 'Quality of diet and nutritional intake',
      relevance: 'Foundation for all health outcomes',
    },
    {
      number: 2,
      title: 'Fitness',
      description: 'Physical activity and cardiovascular health',
      relevance: 'Essential for metabolic health',
    },
    {
      number: 3,
      title: 'Sleep',
      description: 'Sleep quality and duration',
      relevance: 'Critical for recovery and immune function',
    },
    {
      number: 4,
      title: 'Stress',
      description: 'Stress levels and management',
      relevance: 'Impacts all health dimensions',
    },
    {
      number: 5,
      title: 'Hydration',
      description: 'Water intake and hydration status',
      relevance: 'Essential for cellular function',
    },
    {
      number: 6,
      title: 'Digestion',
      description: 'Digestive health and function',
      relevance: 'Key to nutrient absorption',
    },
    {
      number: 7,
      title: 'Immunity',
      description: 'Immune system strength',
      relevance: 'Protection against disease',
    },
    {
      number: 8,
      title: 'Detoxification',
      description: 'Body\'s detoxification capacity',
      relevance: 'Removes harmful substances',
    },
    {
      number: 9,
      title: 'Hormonal Balance',
      description: 'Hormonal health and balance',
      relevance: 'Regulates all body systems',
    },
    {
      number: 10,
      title: 'Inflammation',
      description: 'Chronic inflammation levels',
      relevance: 'Root cause of many diseases',
    },
    {
      number: 11,
      title: 'Longevity',
      description: 'Lifespan and healthspan potential',
      relevance: 'Long-term health outcomes',
    },
    {
      number: 12,
      title: 'Mindfulness',
      description: 'Mental clarity and presence',
      relevance: 'Supports emotional wellbeing',
    },
  ],
  scoringMethodology:
    'Each parameter is scored 0-100 based on assessment responses. Overall WOW Score is the average of all 12 parameters.',
  scoreRanges: [
    {
      min: 0,
      max: 30,
      interpretation: 'Critical - Immediate intervention needed',
    },
    {
      min: 31,
      max: 50,
      interpretation: 'Poor - Significant improvements needed',
    },
    {
      min: 51,
      max: 70,
      interpretation: 'Fair - Room for improvement',
    },
    {
      min: 71,
      max: 85,
      interpretation: 'Good - Maintain current practices',
    },
    {
      min: 86,
      max: 100,
      interpretation: 'Excellent - Optimal wellness',
    },
  ],
  scheduleCTA: {
    text: 'Schedule Assessment',
    link: '/schedule-assessment',
  },
};

// ============================================================================
// ContentMapper Class
// ============================================================================

class ContentMapper {
  constructor() {
    this.logger = console;
  }

  /**
   * Fetch and parse disorder content
   * @param {string} disorderId - The ID of the disorder to fetch
   * @returns {Promise<Object|null>} Parsed Disorder object or null if not found/invalid
   */
  async getDisorder(disorderId) {
    try {
      if (!disorderId || typeof disorderId !== 'string') {
        this.logger.error('ContentMapper: Invalid disorderId provided', { disorderId });
        return null;
      }

      // Mock implementation - replace with actual API call
      const disorder = MOCK_DISORDERS[disorderId.toLowerCase()];

      if (!disorder) {
        this.logger.warn('ContentMapper: Disorder not found', { disorderId });
        return null;
      }

      // Validate the disorder data
      if (!validateDisorder(disorder)) {
        this.logger.error('ContentMapper: Disorder data validation failed', { disorderId, disorder });
        return null;
      }

      this.logger.info('ContentMapper: Successfully fetched disorder', { disorderId });
      return disorder;
    } catch (error) {
      this.logger.error('ContentMapper: Error fetching disorder', { disorderId, error });
      return null;
    }
  }

  /**
   * Fetch and parse protocol content
   * @param {string} protocolId - The ID of the protocol to fetch
   * @returns {Promise<Object|null>} Parsed Protocol object or null if not found/invalid
   */
  async getProtocol(protocolId) {
    try {
      if (!protocolId || typeof protocolId !== 'string') {
        this.logger.error('ContentMapper: Invalid protocolId provided', { protocolId });
        return null;
      }

      // Mock implementation - replace with actual API call
      const protocol = MOCK_PROTOCOLS[protocolId.toLowerCase()];

      if (!protocol) {
        this.logger.warn('ContentMapper: Protocol not found', { protocolId });
        return null;
      }

      // Validate the protocol data
      if (!validateProtocol(protocol)) {
        this.logger.error('ContentMapper: Protocol data validation failed', {
          protocolId,
          protocol,
        });
        return null;
      }

      this.logger.info('ContentMapper: Successfully fetched protocol', { protocolId });
      return protocol;
    } catch (error) {
      this.logger.error('ContentMapper: Error fetching protocol', { protocolId, error });
      return null;
    }
  }

  /**
   * Fetch and parse program content
   * @param {string} programId - The ID of the program to fetch
   * @returns {Promise<Object|null>} Parsed Program object or null if not found/invalid
   */
  async getProgram(programId) {
    try {
      if (!programId || typeof programId !== 'string') {
        this.logger.error('ContentMapper: Invalid programId provided', { programId });
        return null;
      }

      // Mock implementation - replace with actual API call
      const program = MOCK_PROGRAMS[programId.toLowerCase()];

      if (!program) {
        this.logger.warn('ContentMapper: Program not found', { programId });
        return null;
      }

      // Validate the program data
      if (!validateProgram(program)) {
        this.logger.error('ContentMapper: Program data validation failed', { programId, program });
        return null;
      }

      this.logger.info('ContentMapper: Successfully fetched program', { programId });
      return program;
    } catch (error) {
      this.logger.error('ContentMapper: Error fetching program', { programId, error });
      return null;
    }
  }

  /**
   * Fetch all wellness verticals
   * @returns {Promise<Array>} Array of Vertical objects or empty array if error
   */
  async getVerticals() {
    try {
      // Validate all verticals
      const validVerticals = MOCK_VERTICALS.filter((vertical) => {
        if (!validateVertical(vertical)) {
          this.logger.error('ContentMapper: Vertical data validation failed', { vertical });
          return false;
        }
        return true;
      });

      if (validVerticals.length === 0) {
        this.logger.warn('ContentMapper: No valid verticals found');
        return [];
      }

      this.logger.info('ContentMapper: Successfully fetched verticals', {
        count: validVerticals.length,
      });
      return validVerticals;
    } catch (error) {
      this.logger.error('ContentMapper: Error fetching verticals', { error });
      return [];
    }
  }

  /**
   * Fetch WOW Assessment content
   * @returns {Promise<Object|null>} Parsed WOWAssessment object or null if invalid
   */
  async getWOWAssessment() {
    try {
      // Validate the WOW assessment data
      if (!validateWOWAssessment(MOCK_WOW_ASSESSMENT)) {
        this.logger.error('ContentMapper: WOW Assessment data validation failed', {
          assessment: MOCK_WOW_ASSESSMENT,
        });
        return null;
      }

      this.logger.info('ContentMapper: Successfully fetched WOW Assessment');
      return MOCK_WOW_ASSESSMENT;
    } catch (error) {
      this.logger.error('ContentMapper: Error fetching WOW Assessment', { error });
      return null;
    }
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

const contentMapper = new ContentMapper();

export { ContentMapper, contentMapper };
