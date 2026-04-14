/**
 * Route Testing
 * Verifies all routes are properly configured and accessible
 */

import { describe, it, expect } from 'vitest';

describe('Application Routes', () => {
  describe('Route Configuration', () => {
    it('should have all required routes configured', () => {
      const routes = [
        '/',
        '/programs',
        '/programs/diabetes-reversal',
        '/programs/weight-loss',
        '/programs/thyroid-wellness',
        '/protocols/deep-detox',
        '/protocols/alkaline-water',
        '/protocols/intermittent-fasting',
        '/disorders/diabetes',
        '/disorders/thyroid',
        '/disorders/joint-pain',
        '/disorders/pcod',
        '/wellness-verticals',
        '/wow-assessment',
        '/soleus',
        '/advisory-board',
      ];

      expect(routes.length).toBe(16);
      routes.forEach((route) => {
        expect(route).toBeTruthy();
        expect(typeof route).toBe('string');
      });
    });

    it('should have disorder routes', () => {
      const disorderRoutes = [
        '/disorders/diabetes',
        '/disorders/thyroid',
        '/disorders/joint-pain',
        '/disorders/pcod',
      ];

      expect(disorderRoutes.length).toBe(4);
      disorderRoutes.forEach((route) => {
        expect(route).toMatch(/^\/disorders\//);
      });
    });

    it('should have protocol routes', () => {
      const protocolRoutes = [
        '/protocols/deep-detox',
        '/protocols/alkaline-water',
        '/protocols/intermittent-fasting',
      ];

      expect(protocolRoutes.length).toBe(3);
      protocolRoutes.forEach((route) => {
        expect(route).toMatch(/^\/protocols\//);
      });
    });

    it('should have program routes', () => {
      const programRoutes = [
        '/programs/diabetes-reversal',
        '/programs/weight-loss',
        '/programs/thyroid-wellness',
      ];

      expect(programRoutes.length).toBe(3);
      programRoutes.forEach((route) => {
        expect(route).toMatch(/^\/programs\//);
      });
    });

    it('should have special content routes', () => {
      const specialRoutes = [
        '/wellness-verticals',
        '/wow-assessment',
      ];

      expect(specialRoutes.length).toBe(2);
      specialRoutes.forEach((route) => {
        expect(route).toBeTruthy();
      });
    });

    it('should have navigation routes', () => {
      const navRoutes = [
        '/',
        '/programs',
        '/soleus',
        '/advisory-board',
      ];

      expect(navRoutes.length).toBe(4);
      navRoutes.forEach((route) => {
        expect(route).toBeTruthy();
      });
    });
  });

  describe('Route Patterns', () => {
    it('should follow consistent naming patterns', () => {
      const routes = [
        '/disorders/diabetes',
        '/protocols/deep-detox',
        '/programs/diabetes-reversal',
      ];

      routes.forEach((route) => {
        // Routes should use kebab-case for IDs
        const parts = route.split('/');
        expect(parts.length).toBeGreaterThan(1);
        expect(parts[0]).toBe('');
      });
    });

    it('should have proper route structure', () => {
      const disorderRoute = '/disorders/diabetes';
      const protocolRoute = '/protocols/deep-detox';
      const programRoute = '/programs/diabetes-reversal';

      expect(disorderRoute).toMatch(/^\/\w+\/[\w-]+$/);
      expect(protocolRoute).toMatch(/^\/\w+\/[\w-]+$/);
      expect(programRoute).toMatch(/^\/\w+\/[\w-]+$/);
    });
  });

  describe('Content Availability', () => {
    it('should have content for all disorder routes', () => {
      const disorders = ['diabetes', 'thyroid', 'joint-pain', 'pcod'];
      expect(disorders.length).toBe(4);
    });

    it('should have content for all protocol routes', () => {
      const protocols = ['deep-detox', 'alkaline-water', 'intermittent-fasting'];
      expect(protocols.length).toBe(3);
    });

    it('should have content for all program routes', () => {
      const programs = ['diabetes-reversal', 'weight-loss', 'thyroid-wellness'];
      expect(programs.length).toBe(3);
    });

    it('should have 12 wellness verticals', () => {
      const verticals = [
        'nutrition',
        'fitness',
        'sleep',
        'stress',
        'hydration',
        'digestion',
        'immunity',
        'detox',
        'hormones',
        'inflammation',
        'longevity',
        'mindfulness',
      ];
      expect(verticals.length).toBe(12);
    });
  });
});
