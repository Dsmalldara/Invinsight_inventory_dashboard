'use client'
import React, { useState } from 'react';
import {  CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {  Save, Sun, Moon, PanelLeftClose, PanelLeft, Layout, Eye, EyeOff, Sliders, CheckCircle2 } from 'lucide-react';

type UserSetting = {
  label: string;
  value: string;
  type: 'text' | 'number' | 'checkbox';
};
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useAppSelector } from '../store/reduxStore';
import { useDispatch } from 'react-redux';
import { setIsDarkMode, setIsSidebarcollapsed } from '../state';

const defaultSettings: UserSetting[] = [
  {
    label: 'Low Stock Threshold',
    value: '10',
    type: 'number'
  },
  {
    label: 'Company Name',
    value: '',
    type: 'text'
  },
  {
    label: 'Email Notifications',
    value: 'true',
    type: 'checkbox'
  },
  {
    label: 'Default Currency',
    value: 'USD',
    type: 'text'
  }
];

function SettingsPage() {
  const [settings, setSettings] = useState(defaultSettings);
  const [isSaved, setIsSaved] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const isDarkmode = useAppSelector((state) => state.global.isDarkMode);
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  const dispatch = useDispatch();

  const handleSettingChange = (index: number, newValue: string) => {
    const newSettings = [...settings];
    newSettings[index] = {
      ...newSettings[index],
      value: newValue
    };
    setSettings(newSettings);
    setIsSaved(false);
  };

  const toggleMode = () => {
    dispatch(setIsDarkMode(!isDarkmode));
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 300);
  };

  const toggleSidebar = () => {
    dispatch(setIsSidebarcollapsed(!isSidebarCollapsed));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const renderInput = (setting: UserSetting, index: number) => {
    switch (setting.type) {
      case 'checkbox':
        return (
          <Checkbox
            checked={setting.value === 'true'}
            onCheckedChange={(checked) => 
              handleSettingChange(index, checked ? 'true' : 'false')
            }
            className="h-5 w-5"
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            value={setting.value}
            onChange={(e) => handleSettingChange(index, e.target.value)}
            className="max-w-xs"
          />
        );
      default:
        return (
          <Input
            type="text"
            value={setting.value}
            onChange={(e) => handleSettingChange(index, e.target.value)}
            className="max-w-xs"
          />
        );
    }
  };

  const AppearanceSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance & Layout</h3>
        <p className="text-sm text-gray-500">Customize how your dashboard looks and feels</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Dark Mode</Label>
            <p className="text-sm text-gray-500">Switch between light and dark theme</p>
          </div>
          <Button
            variant="ghost"
            onClick={toggleMode}
            className={`
              relative p-2 hover:bg-transparent
              ${isRotating ? 'ring-2 ring-slate-400 rotate-45' : ''}
              transition-all duration-300
            `}
          >
            <div className={`
              transform
              ${isRotating ? 'rotate-45 border p-1 rounded-md animate-pulse' : 'rotate-0'}
              transition-transform duration-300
            `}>
              {isDarkmode ? (
                <Sun className="w-6 h-6 text-slate-400" />
              ) : (
                <Moon className="w-6 h-6 text-slate-400" />
              )}
            </div>
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Sidebar</Label>
            <p className="text-sm text-gray-500">Toggle sidebar visibility</p>
          </div>
          <Button variant="ghost" onClick={toggleSidebar}>
            {isSidebarCollapsed ? (
              <PanelLeft className="w-6 h-6 text-slate-400" />
            ) : (
              <PanelLeftClose className="w-6 h-6 text-slate-400" />
            )}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-sm text-gray-500">Reduce spacing between elements</p>
          </div>
          <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" className='bg-slate-200 text-slate-700'/>
      <Label htmlFor="airplane-mode">Compact Mode</Label>
    </div>
        </div>
      </div>
    </div>
  );

  const DashboardPreferencesSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Dashboard Preferences</h3>
        <p className="text-sm text-gray-500">Customize your dashboard experience</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Auto-refresh Data</Label>
            <p className="text-sm text-gray-500">Automatically update dashboard data</p>
          </div>
          <Switch className='bg-slate-200 text-slate-700'/>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Show Grid Lines</Label>
            <p className="text-sm text-gray-500">Display grid lines in charts</p>
          </div>
          <Switch  className='bg-slate-200 text-slate-700'/>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Advanced Analytics</Label>
            <p className="text-sm text-gray-500">Show detailed metrics and insights</p>
          </div>
          <Switch  className='bg-slate-200 text-slate-700'/>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
       <div className="bg-white shadow-md rounded-lg overflow-hidden text-sm md:text-base ">
        <CardHeader>
        <div>
            <CardTitle className="text-2xl font-bold">Dashboard Settings</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-2">
              <span>✨ Manage your inventory dashboard preferences and configurations</span>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Appearance Section */}
          <AppearanceSection />
          
          <Separator />
          
          {/* Dashboard Preferences Section */}
          <DashboardPreferencesSection />
          
          <Separator />
          
          {/* General Settings Section */}
          <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-medium">General Settings</h3>
            </div>
            <p className="text-sm text-gray-500 mt-1">⚙️ Configure your inventory management settings</p>
          </div>
            
            <div className="space-y-4">
              {settings.map((setting, index) => (
                <div key={setting.label} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{setting.label}</Label>
                  </div>
                  {renderInput(setting, index)}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4 pt-4">
            <Button 
              onClick={handleSave}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
            
            {isSaved && (
              <Alert variant="default" className="w-fit">
                 <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="flex items-center gap-2">
                🎉 Settings saved successfully!
              </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
        </div>
    </div>
  );
}

export default SettingsPage;