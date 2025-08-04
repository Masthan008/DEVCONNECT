import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Palette, Bell, Shield, LogOut, ChevronRight, Image as ImageIcon, Moon, Sun } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/ui/Button';

// A reusable settings section component
const SettingsSection = ({ icon, title, description, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="glass-card p-6 rounded-2xl"
  >
    <div className="flex items-start space-x-4">
      <div className="bg-accent-blue/10 p-3 rounded-full text-accent-blue">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-text-heading">{title}</h3>
        <p className="text-sm text-text-dark mt-1">{description}</p>
      </div>
    </div>
    <div className="mt-6 pl-14">
      {children}
    </div>
  </motion.div>
);

// A reusable settings item component
const SettingsItem = ({ label, control, description }) => (
  <div className="flex items-center justify-between py-4 border-b border-dark-border last:border-b-0">
    <div>
      <p className="text-text-light">{label}</p>
      {description && <p className="text-xs text-text-dark mt-1">{description}</p>}
    </div>
    {control}
  </div>
);

// A simple toggle switch component
const ToggleSwitch = ({ enabled, setEnabled }) => (
  <div
    onClick={() => setEnabled(!enabled)}
    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${
      enabled ? 'bg-accent-blue' : 'bg-slate-700'
    }`}
  >
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 700, damping: 30 }}
      className={`w-4 h-4 bg-white rounded-full`}
      style={{
        marginLeft: enabled ? 'auto' : '0'
      }}
    />
  </div>
);


const Settings = () => {
  // State for theme toggle
  const [isDarkMode, setIsDarkMode] = useState(true);

  // State for notification toggles
  const [notifications, setNotifications] = useState({
    newFollowers: true,
    postLikes: true,
    postComments: false,
    directMessages: true,
  });

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-text-heading">Settings</h1>
          <p className="text-text-dark mt-2">Manage your account, preferences, and notifications.</p>
        </header>

        <div className="space-y-8">
          {/* Profile Settings */}
          <SettingsSection
            icon={<User size={20} />}
            title="Profile Settings"
            description="Update your personal information and profile visibility."
          >
            <SettingsItem
              label="Update Profile Picture"
              control={<Button variant="outline" size="sm" className="flex items-center gap-2"><ImageIcon size={14}/> Change</Button>}
              description="Recommended size: 400x400px"
            />
            <SettingsItem
              label="Edit Profile Details"
              control={<Button variant="outline" size="sm" className="flex items-center gap-2">Edit <ChevronRight size={14}/></Button>}
              description="Update your bio, location, and social links."
            />
          </SettingsSection>

          {/* Theme & Appearance */}
          <SettingsSection
            icon={<Palette size={20} />}
            title="Theme & Appearance"
            description="Customize the look and feel of DevConnect."
          >
            <SettingsItem
              label="Dark Mode"
              control={<ToggleSwitch enabled={isDarkMode} setEnabled={setIsDarkMode} />}
              description={isDarkMode ? 'Enjoy the darkness' : 'Light up your workspace'}
            />
             {/* Interactivity Suggestion for GSAP/Framer Motion:
                 Animate the theme change with a smooth color transition on the background
                 and text colors. Could also add a subtle icon animation (sun/moon).
             */}
            <SettingsItem
              label="Accent Color"
              control={
                <div className="flex space-x-2">
                  <div className="w-6 h-6 rounded-full bg-accent-blue cursor-pointer ring-2 ring-white" />
                  <div className="w-6 h-6 rounded-full bg-accent-purple cursor-pointer" />
                  <div className="w-6 h-6 rounded-full bg-accent-pink cursor-pointer" />
                </div>
              }
              description="Choose your favorite accent color."
            />
          </SettingsSection>

          {/* Notifications */}
          <SettingsSection
            icon={<Bell size={20} />}
            title="Notifications"
            description="Control how you receive notifications from DevConnect."
          >
            <SettingsItem
              label="New Followers"
              control={<ToggleSwitch enabled={notifications.newFollowers} setEnabled={() => handleNotificationChange('newFollowers')} />}
            />
            <SettingsItem
              label="Post Likes"
              control={<ToggleSwitch enabled={notifications.postLikes} setEnabled={() => handleNotificationChange('postLikes')} />}
            />
            <SettingsItem
              label="Post Comments"
              control={<ToggleSwitch enabled={notifications.postComments} setEnabled={() => handleNotificationChange('postComments')} />}
            />
            <SettingsItem
              label="Direct Messages"
              control={<ToggleSwitch enabled={notifications.directMessages} setEnabled={() => handleNotificationChange('directMessages')} />}
            />
          </SettingsSection>

          {/* Account & Security */}
          <SettingsSection
            icon={<Shield size={20} />}
            title="Account & Security"
            description="Manage your account settings and security."
          >
            <SettingsItem
              label="Change Password"
              control={<Button variant="outline" size="sm">Change</Button>}
            />
            <SettingsItem
              label="Two-Factor Authentication"
              control={<Button variant="outline" size="sm" className="bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20">Enable</Button>}
              description="Add an extra layer of security to your account."
            />
            <SettingsItem
              label="Logout"
              control={<Button variant="destructive" size="sm" className="flex items-center gap-2"><LogOut size={14}/> Logout</Button>}
              description="You will be logged out from this device."
            />
          </SettingsSection>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
