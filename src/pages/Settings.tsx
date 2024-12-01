import React, { useState } from 'react';
import { Settings as SettingsIcon, Moon, Sun, Upload, Download, Key, Globe, Facebook, Mail } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabase';
import { importLeadsFromCSV } from '../lib/api/leads';

export default function Settings() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [safaribookingsKey, setSafaribookingsKey] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      await importLeadsFromCSV(file);
      // Show success message
    } catch (error) {
      console.error('Error importing leads:', error);
      // Show error message
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <SettingsIcon className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Settings
          </h1>
        </div>

        <div className="space-y-6">
          {/* Appearance */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Appearance
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {isDarkMode ? (
                      <Moon className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Sun className="w-5 h-5 text-gray-400" />
                    )}
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Theme
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Toggle between light and dark mode
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {isDarkMode ? 'Switch to Light' : 'Switch to Dark'}
                </button>
              </div>
            </div>
          </div>

          {/* Integrations */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Integrations
              </h2>
              
              {/* SafariBookings */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-5 h-5 text-primary" />
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      SafariBookings API
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                        API Key
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="password"
                          value={safaribookingsKey}
                          onChange={(e) => setSafaribookingsKey(e.target.value)}
                          className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary"
                          placeholder="Enter your SafariBookings API key"
                        />
                        <button className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors">
                          Save
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Key className="w-4 h-4" />
                      <a href="https://www.safaribookings.com/api" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        Get API key
                      </a>
                    </div>
                  </div>
                </div>

                {/* Facebook Ads */}
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Facebook className="w-5 h-5 text-primary" />
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Facebook Ads Integration
                    </h3>
                  </div>
                  <button className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors">
                    Connect Facebook Ads
                  </button>
                </div>

                {/* Import/Export */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Upload className="w-5 h-5 text-primary" />
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Import/Export Leads
                    </h3>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors cursor-pointer inline-block"
                      >
                        {isUploading ? 'Importing...' : 'Import CSV'}
                      </label>
                    </div>
                    <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Export Leads
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Email Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Email Settings
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                    SMTP Server
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="smtp.example.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <button className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors">
                  Save Email Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}