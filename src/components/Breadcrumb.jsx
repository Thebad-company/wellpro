import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Map of path segments to display names
  const pathNameMap = {
    disorders: 'Lifestyle Disorders',
    protocols: 'Protocols',
    programs: 'Programs',
    'wellness-verticals': 'Wellness Verticals',
    'wow-assessment': 'WOW Assessment',
    soleus: 'Soleus Activation',
    'advisory-board': 'Advisory Board',
  };

  // Format disorder/program/protocol names
  const formatName = (name) => {
    return name
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (pathnames.length === 0) {
    return null; // Don't show breadcrumb on home page
  }

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          {/* Home Link */}
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-wellpro-green transition-colors">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          {/* Breadcrumb Items */}
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const displayName = pathNameMap[name] || formatName(name);

            return (
              <React.Fragment key={routeTo}>
                <ChevronRight className="h-4 w-4 text-gray-300" />
                {isLast ? (
                  <span className="text-wellpro-navy font-semibold truncate">
                    {displayName}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-gray-600 hover:text-wellpro-green transition-colors truncate"
                  >
                    {displayName}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
