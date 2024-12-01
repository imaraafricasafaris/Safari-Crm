import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavItem } from '../../types';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Map,
  FileText,
  Calendar,
  BarChart3,
  Bell,
  Settings,
} from 'lucide-react';

const navigation: NavItem[] = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Leads', icon: UserPlus, path: '/leads' },
  { name: 'Clients', icon: Users, path: '/clients' },
  { name: 'Itineraries', icon: Map, path: '/itineraries' },
  { name: 'Invoices', icon: FileText, path: '/invoices' },
  { name: 'Schedules', icon: Calendar, path: '/schedules' },
  { name: 'Reports', icon: BarChart3, path: '/reports' },
  { name: 'Notifications', icon: Bell, path: '/notifications' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`h-screen ${isExpanded ? 'w-64' : 'w-20'} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 ease-in-out`}>
      <div className="p-4 flex items-center justify-between">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 ease-in-out"
        >
          <Map className="w-8 h-8 text-[#9EFF00]" />
        </button>
      </div>
      
      <nav className="flex-1 px-2">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center ${
                  isExpanded ? 'gap-3 px-3' : 'justify-center px-3'
                } py-2 rounded-lg transition-all duration-300 ease-in-out group relative ${
                  location.pathname === item.path
                    ? 'bg-gray-100 dark:bg-gray-800 text-primary'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                title={!isExpanded ? item.name : ''}
              >
                <item.icon className={`w-5 h-5 transition-transform duration-300 ease-in-out ${
                  location.pathname === item.path ? 'text-primary' : ''
                }`} />
                <span className={`whitespace-nowrap ${
                  isExpanded ? 'opacity-100' : 'opacity-0 absolute left-12'
                } transition-all duration-300 ease-in-out`}>
                  {item.name}
                </span>
                {!isExpanded && (
                  <div className="absolute left-14 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}