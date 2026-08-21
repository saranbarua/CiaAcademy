import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 py-3 overflow-x-auto whitespace-nowrap">
      <Link
        to="/"
        className="flex items-center hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        id="breadcrumb-home"
      >
        <Home className="w-4 h-4 mr-1" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            {isLast || !item.path ? (
              <span className="font-medium text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-xs" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate max-w-[150px]"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
