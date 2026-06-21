import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Telescope, BookOpen, Music, Footprints, Video, Compass, Check, Trash2, Plus, X, Lock, Sparkles } from 'lucide-react';
import { HobbyItem } from '../types';

interface HobbiesViewProps {
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
}

export default function HobbiesView({ currentTheme, setCurrentTheme }: HobbiesViewProps) {
  const [hobbies, setHobbies] = useState<HobbyItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newIconName, setNewIconName] = useState('Telescope');
  const [newThemeId, setNewThemeId] = useState('twilight');

  // Password-Authorization Modal State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState<{
    type: 'add' | 'delete';
    targetId?: string;
    data?: any;
  } | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  const SEED_HOBBIES: HobbyItem[] = [
    {
      id: 'space_art',
      title: '深空探索 & 宇宙艺术',
      subtitle: 'DEEP COLLABORATION',
      description: '沉迷于使用生成算法与粒子物理引擎模拟超新星爆发与星系流体，寻求数字持久性的美学归宿。',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAovBGSTGCR3CW1Ey08CPVf1P38K9WnNVcXzCl9ISVu1FlutiECPYeiXKRvMOaj8I9a-mRkIydaSnXZp66LjBxKfuOsUjThvV1yX1R2m2FogvyZG9nXnTEJ_ewne9-ZA_ui3qpT_hXSZxN01tRPyJoYF-9f3o8IkvoJouuNSfDLrEgLY6Vo50DCxoerCwDVb31axMKVtUOK0QAfx1TNOj61vFny_pj12Rsi0ukhfy2tNDN5CAD5mlaEsJYEp8kevv8BO0vLhI6FsPaI',
      category: 'Explore',
      iconName: 'Telescope',
      themeId: 'space'
    },
    {
      id: 'synth_electronic',
      title: '环境氛围电子与模块化合成器',
      subtitle: 'AMBIENT FREQUENCIES',
      description: '利用低频振荡器（LFO）与混响延时，编制出模拟深海与外太空静谧环境的纯白电波。',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR8REF8YaB6EKUNgHYY2uKIm-NXJvQoh2UbASuOdwcgH-lyA_43X8D5IPniSSSwoSh0ubnzw3XM2GFMqjfQNhXxdi0DgXDDZNg42NGbO9KWby03QANqWB8drnFcBv5npUCg3aYTO_DPY1u98_iK3FiqA0MFj7M1LAQ_Se6EuL_TL9i7hsIN0IGOX_2sD2bmf12bNlsIfoclW1VsYqPAqhyJ0zqSyHGEhDfikcmJEYmwNkEFuRRX7wIAtVnRA_AZfBPxDAhk7Kmym4V',
      category: 'Acoustic',
      iconName: 'Music',
      themeId: 'twilight'
    },
    {
      id: 'scifi_literature',
      title: '硬科幻文学与思想实验',
      subtitle: 'HARD SCI-FI STUDY',
      description: '深爱阿瑟·克拉克、阿西莫夫和刘慈欣。在对费米悖论、戴森球以及数字生命的思辨中获得纯粹的宁静。',
      imageUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop',
      category: 'Intellect',
      iconName: 'BookOpen',
      themeId: 'space'
    },
    {
      id: 'hiking_mountain',
      title: '户外原野徒步 & 攀登',
      subtitle: 'WILDERNESS EXCURSIONS',
      description: '在群山与荒野之中独自穿行。用脚步丈量地理纬度，让高海拔冷冽的空气澄清思绪，是脑力解压与重置认知系统的物理手段。',
      imageUrl: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=600&auto=format&fit=crop',
      category: 'Physical',
      iconName: 'Footprints',
      themeId: 'mist'
    },
    {
      id: 'we_media',
      title: '独立自媒体创作',
      subtitle: 'WE-MEDIA PRODUCTION',
      description: '将技术设计、哲学思辨与星空爱好解构输出。在短数字流中创作高审美、高纯度的视频与文字，连接更多数字化探路者。',
      imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop',
      category: 'Creative',
      iconName: 'Video',
      themeId: 'mist'
    },
  ];

  // Dynamic loading
  useEffect(() => {
    const saved = localStorage.getItem('xom_hobbies_v2');
    if (saved) {
      try {
        setHobbies(JSON.parse(saved));
      } catch (e) {
        setHobbies(SEED_HOBBIES);
      }
    } else {
      setHobbies(SEED_HOBBIES);
      localStorage.setItem('xom_hobbies_v2', JSON.stringify(SEED_HOBBIES));
    }
  }, []);

  const handleSaveToLocalStorage = (newHobbiesList: HobbyItem[]) => {
    localStorage.setItem('xom_hobbies_v2', JSON.stringify(newHobbiesList));
  };

  // Trigger Add submit
  const handleAddSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const defaultImages = {
      Telescope: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAovBGSTGCR3CW1Ey08CPVf1P38K9WnNVcXzCl9ISVu1FlutiECPYeiXKRvMOaj8I9a-mRkIydaSnXZp66LjBxKfuOsUjThvV1yX1R2m2FogvyZG9nXnTEJ_ewne9-ZA_ui3qpT_hXSZxN01tRPyJoYF-9f3o8IkvoJouuNSfDLrEgLY6Vo50DCxoerCwDVb31axMKVtUOK0QAfx1TNOj61vFny_pj12Rsi0ukhfy2tNDN5CAD5mlaEsJYEp8kevv8BO0vLhI6FsPaI',
      Music: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR8REF8YaB6EKUNgHYY2uKIm-NXJvQoh2UbASuOdwcgH-lyA_43X8D5IPniSSSwoSh0ubnzw3XM2GFMqjfQNhXxdi0DgXDDZNg42NGbO9KWby03QANqWB8drnFcBv5npUCg3aYTO_DPY1u98_iK3FiqA0MFj7M1LAQ_Se6EuL_TL9i7hsIN0IGOX_2sD2bmf12bNlsIfoclW1VsYqPAqhyJ0zqSyHGEhDfikcmJEYmwNkEFuRRX7wIAtVnRA_AZfBPxDAhk7Kmym4V',
      BookOpen: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop',
      Footprints: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=600&auto=format&fit=crop',
      Video: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop',
      Compass: 'https://images.unsplash.com/photo-1513628253939-0121788673c2?q=80&w=600&auto=format&fit=crop',
    };

    const finalImage = newImageUrl.trim() || defaultImages[newIconName as keyof typeof defaultImages] || defaultImages.Compass;

    const added: HobbyItem = {
      id: `hobby-${Date.now()}`,
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'CUSTOM PASSION',
      description: newDescription.trim(),
      imageUrl: finalImage,
      category: newCategory.trim() || 'Custom',
      iconName: newIconName,
      themeId: newThemeId,
    };

    setAuthAction({
      type: 'add',
      data: added,
    });
    setAuthError(false);
    setPasswordInput('');
    setShowAuthModal(true);
  };

  // Trigger Delete item
  const handleDeleteClick = (id: string) => {
    setAuthAction({
      type: 'delete',
      targetId: id,
    });
    setAuthError(false);
    setPasswordInput('');
    setShowAuthModal(true);
  };

  // Verify passcode
  const handleAuthVerify = (e: FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'XOM1990') {
      if (authAction?.type === 'add') {
        const updated = [...hobbies, authAction.data];
        setHobbies(updated);
        handleSaveToLocalStorage(updated);

        // Reset inputs
        setNewTitle('');
        setNewSubtitle('');
        setNewDescription('');
        setNewImageUrl('');
        setNewCategory('');
        setNewIconName('Telescope');
        setNewThemeId('twilight');
        setIsAdding(false);
      } else if (authAction?.type === 'delete' && authAction.targetId) {
        const updated = hobbies.filter((h) => h.id !== authAction.targetId);
        setHobbies(updated);
        handleSaveToLocalStorage(updated);
      }
      setShowAuthModal(false);
      setAuthAction(null);
      setPasswordInput('');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const themes = [
    {
      id: 'twilight',
      name: '暮色星域 (Twilight Nebula)',
      bgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR8REF8YaB6EKUNgHYY2uKIm-NXJvQoh2UbASuOdwcgH-lyA_43X8D5IPniSSSwoSh0ubnzw3XM2GFMqjfQNhXxdi0DgXDDZNg42NGbO9KWby03QANqWB8drnFcBv5npUCg3aYTO_DPY1u98_iK3FiqA0MFj7M1LAQ_Se6EuL_TL9i7hsIN0IGOX_2sD2bmf12bNlsIfoclW1VsYqPAqhyJ0zqSyHGEhDfikcmJEYmwNkEFuRRX7wIAtVnRA_AZfBPxDAhk7Kmym4V',
      color: 'border-blue-400 text-blue-300',
    },
    {
      id: 'space',
      name: '深空尘埃 (Deep Cosmic Dust)',
      bgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAovBGSTGCR3CW1Ey08CPVf1P38K9WnNVcXzCl9ISVu1FlutiECPYeiXKRvMOaj8I9a-mRkIydaSnXZp66LjBxKfuOsUjThvV1yX1R2m2FogvyZG9nXnTEJ_ewne9-ZA_ui3qpT_hXSZxN01tRPyJoYF-9f3o8IkvoJouuNSfDLrEgLY6Vo50DCxoerCwDVb31axMKVtUOK0QAfx1TNOj61vFny_pj12Rsi0ukhfy2tNDN5CAD5mlaEsJYEp8kevv8BO0vLhI6FsPaI',
      color: 'border-orange-400 text-orange-300',
    },
    {
      id: 'mist',
      name: '雨云迷雾 (Alpine Rain Mist)',
      bgUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
      color: 'border-emerald-400 text-emerald-300',
    },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Telescope': return <Telescope className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'Music': return <Music className="w-5 h-5" />;
      case 'Footprints': return <Footprints className="w-5 h-5" />;
      case 'Video': return <Video className="w-5 h-5" />;
      default: return <Compass className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* View Header */}
      <div className="text-center mb-12">
        <h2 className="font-sans text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          心流爱好
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto">
          闲暇时分对宏大叙事与微观细节的体悟之所。这些极具确定性的执念，充填了代码尘世之外的时光。
        </p>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center mb-10">
        <button
          onClick={() => setIsAdding(!isAdding)}
          className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl border font-sans text-xs font-bold tracking-wider cursor-pointer transition-all duration-300 select-none ${
            isAdding
              ? 'bg-blue-500/10 text-blue-300 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.25)] scale-[1.02]'
              : 'bg-white/[0.02] text-zinc-400 border-white/10 hover:bg-white/5 hover:text-zinc-200'
          }`}
        >
          {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isAdding ? '取消添加 CANCEL ADD' : '添加心流爱好 ADD CUSTOM HOBBY'}
        </button>
      </div>

      {/* Accordion Custom Add Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 40 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white/[0.04] backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10 max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-teal-300 animate-pulse" />
                <h3 className="font-sans text-lg font-bold text-white">收录新的心灵势能 SHELVE NEW HOBBY</h3>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                      爱好名称 HOBBY NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. 双星引力轨道观测"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-500 font-sans text-sm focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>

                  {/* Subtitle */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                      英文副标题 SUBTITLE
                    </label>
                    <input
                      type="text"
                      value={newSubtitle}
                      onChange={(e) => setNewSubtitle(e.target.value)}
                      placeholder="e.g. GRAVITATIONAL OBSERVATIONS"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-500 font-sans text-sm focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Category */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                      细分分类 LEVEL / SPECIFICATION *
                    </label>
                    <input
                      type="text"
                      required
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="e.g. Explore"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-500 font-sans text-sm focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>

                  {/* Icon Select */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                      图标选择 ICON TYPE *
                    </label>
                    <select
                      value={newIconName}
                      onChange={(e) => setNewIconName(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white font-sans text-sm focus:outline-none focus:border-blue-400 transition-colors cursor-pointer"
                    >
                      <option value="Telescope">🪐 Telescope (望远镜)</option>
                      <option value="BookOpen">📖 BookOpen (学识书本)</option>
                      <option value="Music">🎵 Music (声波合成器)</option>
                      <option value="Footprints">👣 Footprints (徒步测绘)</option>
                      <option value="Video">📹 Video (非线性剪辑)</option>
                      <option value="Compass">🧭 Compass (深层罗盘)</option>
                    </select>
                  </div>

                  {/* Theme ID linkage */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                      爱好背景分类 HOBBY BACKGROUND *
                    </label>
                    <select
                      value={newThemeId}
                      onChange={(e) => setNewThemeId(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white font-sans text-sm focus:outline-none focus:border-blue-400 transition-colors cursor-pointer"
                    >
                      <option value="twilight">暮色星域 (twilight)</option>
                      <option value="space">深空尘埃 (space)</option>
                      <option value="mist">雨云迷雾 (mist)</option>
                    </select>
                  </div>
                </div>

                {/* Cover Image URL */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                    背景封面大图 URL (可留空，自动选用与图标契合的最佳图库)
                  </label>
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="e.g. https://images.unsplash.com/..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-500 font-sans text-sm focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                    势能体验描述 DESCRIPTION *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="描述这个爱好在代码世界对立面产生的回响与意义..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-500 font-sans text-sm focus:outline-none focus:border-blue-400 transition-colors resize-none"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-teal-400/25 hover:bg-teal-400/35 border border-teal-300/30 font-sans text-xs font-bold text-teal-100 tracking-wider shadow-[0_4px_15px_rgba(20,184,166,0.1)] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    验证密码并归档 PERSIST PASSPORT
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacetime theme changer widget */}
      <div className="mb-14 p-6 bg-white/[0.03] backdrop-blur-md rounded-2xl border border-white/10 max-w-3xl mx-auto">
        <h3 className="font-mono text-center text-xs tracking-wider text-zinc-400 mb-4">
          切换空间维度的背景场域 SHIFT COSMIC BACKGROUND
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {themes.map((t) => {
            const isSelected = currentTheme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setCurrentTheme(t.id)}
                className={`relative flex items-center justify-between px-4 py-3 rounded-xl border font-sans text-xs font-semibold cursor-pointer transition-all duration-300 select-none ${
                  isSelected
                    ? 'bg-white/10 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)] scale-[1.02]'
                    : 'bg-white/[0.02] text-zinc-400 border-white/10 hover:bg-white/5 hover:text-zinc-200'
                }`}
              >
                <span className="truncate">{t.name}</span>
                {isSelected && <Check className="w-4 h-4 text-blue-300 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hobbies list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {hobbies.map((h, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              key={h.id}
              className="flex flex-col rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-300 group relative"
            >
              {/* Delete trigger */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(h.id);
                }}
                className="absolute top-4 right-4 p-2 rounded-lg bg-black/60 hover:bg-red-500/20 text-zinc-400 hover:text-red-300 border border-white/10 hover:border-red-400/30 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer z-10"
                title="删除此爱好 Remove Hobby"
              >
                <Trash2 className="w-4.5 h-4.5" />
              </button>

              {/* Visual Header */}
              <div className="h-56 overflow-hidden relative">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-all duration-700"
                  style={{ backgroundImage: `url('${h.imageUrl}')`, referrerPolicy: 'no-referrer' as any }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-transparent" />
                
                <div className="absolute bottom-4 left-6 flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-zinc-950/70 border border-white/10 text-blue-300">
                    {getIcon(h.iconName)}
                  </span>
                  <div>
                    <span className="font-mono text-[10px] text-blue-200 block tracking-widest uppercase">
                      {h.subtitle}
                    </span>
                    <span className="font-mono text-xs text-zinc-400">
                      {h.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content info */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-sans text-xl font-bold text-white mb-3">
                    {h.title}
                  </h3>
                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                    {h.description}
                  </p>
                </div>

                {/* Action trigger change theme preview */}
                <button
                  onClick={() => {
                    if (h.themeId) {
                      setCurrentTheme(h.themeId);
                    } else {
                      // Fallback
                      if (h.id === 'space_art') setCurrentTheme('space');
                      if (h.id === 'synth_electronic') setCurrentTheme('twilight');
                      if (h.id === 'scifi_literature') setCurrentTheme('space');
                      if (h.id === 'hiking_mountain') setCurrentTheme('mist');
                      if (h.id === 'we_media') setCurrentTheme('mist');
                    }
                  }}
                  className="mt-6 self-start text-xs font-mono text-blue-300 hover:text-white transition-colors cursor-pointer"
                >
                  应用此爱好背景 →
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hobbies.length === 0 && (
        <div className="text-center p-16 rounded-2xl bg-white/[0.02] border border-white/5 mt-6">
          <p className="text-zinc-500 font-sans text-base">
            当前尚无任何留存的爱好。可以点击上方添加定制爱好。
          </p>
        </div>
      )}

      {/* Verification Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowAuthModal(false);
                setAuthAction(null);
              }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(59,130,246,0.15)] overflow-hidden"
            >
              {/* Star background accents inside modal */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2 text-blue-300">
                  <Lock className="w-5 h-5" />
                  <span className="font-mono text-sm tracking-wider font-bold">安全性验证 SECURE AUTH</span>
                </div>
                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    setAuthAction(null);
                  }}
                  className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-zinc-400 text-xs mb-5 leading-relaxed font-sans text-left">
                为了保证极致对齐的对称与严密规则。向核心注入添加或卸载爱好指令前，请输入密码以对齐高频密码（密码为 XOM 的专属指令）：
              </p>

              <form onSubmit={handleAuthVerify} className="space-y-4 text-left">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
                    安全校验密码 SECURITY KEY
                  </label>
                  <input
                    type="password"
                    required
                    autoFocus
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setAuthError(false);
                    }}
                    placeholder="输入密码以解锁行为..."
                    className={`w-full bg-white/5 border rounded-lg px-3 py-2 text-white placeholder-zinc-600 font-mono text-sm focus:outline-none transition-colors ${
                      authError ? 'border-red-500 focus:border-red-400' : 'border-white/10 focus:border-blue-400'
                    }`}
                  />
                  {authError && (
                    <motion.p
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-red-400 text-[11px] font-sans mt-1.5"
                    >
                      校验密钥错误，请重新核对密钥。
                    </motion.p>
                  )}
                </div>

                <div className="flex gap-3 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAuthModal(false);
                      setAuthAction(null);
                    }}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-sans border border-white/5 cursor-pointer"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/35 border border-blue-400/30 text-blue-200 text-xs font-sans font-semibold cursor-pointer active:scale-95 transition-all"
                  >
                    对齐频率并解锁
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
