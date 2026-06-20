import { User } from 'lucide-react';
import { TabType } from '../types';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  scrolled: boolean;
  onUserClick: () => void;
}

export default function Navbar({ activeTab, setActiveTab, scrolled, onUserClick }: NavbarProps) {
  const navItems: { id: TabType; label: string }[] = [
    { id: 'intro', label: '简介' },
    { id: 'skills', label: '技能' },
    { id: 'hobbies', label: '爱好' },
    { id: 'friends', label: '朋友' },
    { id: 'collections', label: '收藏' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-neutral-950/70 border-white/10 backdrop-blur-xl shadow-lg'
          : 'py-5 bg-transparent border-transparent backdrop-blur-none'
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-16 max-w-7xl mx-auto">
        {/* Brand / Logo */}
        <button
          onClick={() => setActiveTab('intro')}
          className="font-sans text-3xl font-extrabold tracking-tighter text-blue-200 hover:text-white cursor-pointer transition-colors"
        >
          XOM
        </button>

        {/* Tab links */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`font-sans text-base font-medium transition-all duration-300 relative py-1 cursor-pointer hover:text-blue-100 ${
                  isActive ? 'text-blue-200' : 'text-zinc-400'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-300 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Portable view dropdown trigger / Avatar button */}
        <div className="flex items-center gap-3">
          {/* Mobile Tab Selector */}
          <div className="md:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as TabType)}
              className="bg-zinc-900/80 text-zinc-200 border border-zinc-700 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-blue-400"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* User Button */}
          <button
            onClick={onUserClick}
            className="flex items-center justify-center w-10 h-10 p-2 rounded-full border border-white/10 bg-white/5 text-blue-200 hover:bg-white/15 active:scale-95 transition-all cursor-pointer"
            title="查看专属彩蛋"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
