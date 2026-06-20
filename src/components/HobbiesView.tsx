import { motion } from 'motion/react';
import { Telescope, BookOpen, Music, Footprints, Video, Compass, Check } from 'lucide-react';
import { HobbyItem } from '../types';

interface HobbiesViewProps {
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
}

export default function HobbiesView({ currentTheme, setCurrentTheme }: HobbiesViewProps) {
  const hobbies: HobbyItem[] = [
    {
      id: 'space_art',
      title: '深空探索 & 宇宙艺术',
      subtitle: 'DEEP COLLABORATION',
      description: '沉迷于使用生成算法与粒子物理引擎模拟超新星爆发与星系流体，寻求数字持久性的美学归宿。',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAovBGSTGCR3CW1Ey08CPVf1P38K9WnNVcXzCl9ISVu1FlutiECPYeiXKRvMOaj8I9a-mRkIydaSnXZp66LjBxKfuOsUjThvV1yX1R2m2FogvyZG9nXnTEJ_ewne9-ZA_ui3qpT_hXSZxN01tRPyJoYF-9f3o8IkvoJouuNSfDLrEgLY6Vo50DCxoerCwDVb31axMKVtUOK0QAfx1TNOj61vFny_pj12Rsi0ukhfy2tNDN5CAD5mlaEsJYEp8kevv8BO0vLhI6FsPaI',
      category: 'Explore',
      iconName: 'Telescope',
    },
    {
      id: 'synth_electronic',
      title: '环境氛围电子与模块化合成器',
      subtitle: 'AMBIENT FREQUENCIES',
      description: '利用低频振荡器（LFO）与混响延时，编制出模拟深海与外太空静谧环境的纯白电波。',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR8REF8YaB6EKUNgHYY2uKIm-NXJvQoh2UbASuOdwcgH-lyA_43X8D5IPniSSSwoSh0ubnzw3XM2GFMqjfQNhXxdi0DgXDDZNg42NGbO9KWby03QANqWB8drnFcBv5npUCg3aYTO_DPY1u98_iK3FiqA0MFj7M1LAQ_Se6EuL_TL9i7hsIN0IGOX_2sD2bmf12bNlsIfoclW1VsYqPAqhyJ0zqSyHGEhDfikcmJEYmwNkEFuRRX7wIAtVnRA_AZfBPxDAhk7Kmym4V',
      category: 'Acoustic',
      iconName: 'Music',
    },
    {
      id: 'scifi_literature',
      title: '硬科幻文学与思想实验',
      subtitle: 'HARD SCI-FI STUDY',
      description: '深爱阿瑟·克拉克、阿西莫夫和刘慈欣。在对费米悖论、戴森球以及数字生命的思辨中获得纯粹的宁静。',
      imageUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop',
      category: 'Intellect',
      iconName: 'BookOpen',
    },
    {
      id: 'hiking_mountain',
      title: '户外原野徒步 & 攀登',
      subtitle: 'WILDERNESS EXCURSIONS',
      description: '在群山与荒野之中独自穿行。用脚步丈量地理纬度，让高海拔冷冽的空气澄清思绪，是脑力解压与重置认知系统的物理手段。',
      imageUrl: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=600&auto=format&fit=crop',
      category: 'Physical',
      iconName: 'Footprints',
    },
    {
      id: 'we_media',
      title: '独立自媒体创作',
      subtitle: 'WE-MEDIA PRODUCTION',
      description: '将技术设计、哲学思辨与星空爱好解构输出。在短数字流中创作高审美、高纯度的视频与文字，连接更多数字化探路者。',
      imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop',
      category: 'Creative',
      iconName: 'Video',
    },
  ];

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
                    : 'bg-white/[0.02] text-zinc-400 border-white/5 hover:bg-white/5 hover:text-zinc-200'
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
        {hobbies.map((h, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            key={h.id}
            className="flex flex-col rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-300 group"
          >
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
                  if (h.id === 'space_art') setCurrentTheme('space');
                  if (h.id === 'synth_electronic') setCurrentTheme('twilight');
                }}
                className="mt-6 self-start text-xs font-mono text-blue-300 hover:text-white transition-colors cursor-pointer"
              >
                APPLY HOBBY BACKGROUND →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
