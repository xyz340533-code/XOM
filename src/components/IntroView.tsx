import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Sun, Heart, Compass, ChevronDown, Sparkles } from 'lucide-react';
import { TabType } from '../types';

interface IntroViewProps {
  onNavigate: (tab: TabType) => void;
}

export default function IntroView({ onNavigate }: IntroViewProps) {
  const [resonance, setResonance] = useState(84);
  const [energyClicks, setEnergyClicks] = useState(0);

  // Dynamic oscillation of Cosmic Resonance like the reference page script
  useEffect(() => {
    const timer = setInterval(() => {
      // Oscillates slightly, plus allows user added energy to decay back or stay elevated
      const baseVal = 84 + Math.sin(Date.now() / 1000) * 2;
      const extra = Math.max(0, energyClicks * 1.5 - (Date.now() % 5000) / 1000);
      setResonance(Math.min(100, Math.round(baseVal + extra)));
    }, 150);

    return () => clearInterval(timer);
  }, [energyClicks]);

  const handleInjectEnergy = () => {
    setEnergyClicks((prev) => Math.min(10, prev + 1));
    // Sound/vibration effect could be nice, or just state
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <header className="relative w-full text-center mb-16 md:mb-28 flex flex-col items-center justify-center min-h-[50vh] pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full mb-6 border border-blue-400/20"
        >
          <Sparkles className="w-3.5 h-3.5 text-orange-300 animate-pulse" />
          <span className="font-mono text-xs tracking-wider text-orange-300 uppercase">
            个人空间 v1.0
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
        >
          欢迎来到 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-orange-300 to-emerald-300">XOM</span> 的空间
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-zinc-300 font-sans text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4 text-center select-none"
        >
          在数字视角下探索创意与逻辑的交汇点。一段关于性格、热情与极简追求的星际旅程。
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.8,
            duration: 1,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="mt-16 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => {
            const el = document.getElementById('bento-grid');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-zinc-500 text-xs font-mono tracking-widest">SCROLL DOWN</span>
          <ChevronDown className="w-8 h-8 text-blue-400 animate-bounce" />
        </motion.div>
      </header>

      {/* Bento Grid Content */}
      <section id="bento-grid" className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 scroll-mt-24">
        
        {/* Personality / MBTI Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="md:col-span-8 bg-white/[0.04] backdrop-blur-lg rounded-2xl p-8 md:p-10 border border-white/10 relative overflow-hidden group hover:border-blue-400/30 transition-all duration-500"
        >
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-6 h-6 text-blue-300" />
                <h3 className="font-sans text-xl font-semibold text-zinc-200">性格特质</h3>
              </div>
              <h2 className="text-6xl font-black text-white mb-6 tracking-tighter">
                INTJ-A
              </h2>
              <p className="text-zinc-300 text-base max-w-xl mb-8 leading-relaxed">
                建筑师。战略性思维、长远规划以及对自我提升的坚持，定义了我对待每一件事的方式。在冷峻的理智之下，永葆探索未知的激情。
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/[0.04] backdrop-blur-md rounded-xl p-4 border border-white/5 flex flex-col gap-1 transition-transform group-hover:scale-[1.02]">
                <span className="font-mono text-[10px] tracking-widest text-blue-300 uppercase">
                  战略性
                </span>
                <span className="text-2xl font-bold text-white">92%</span>
              </div>
              <div className="bg-white/[0.04] backdrop-blur-md rounded-xl p-4 border border-white/5 flex flex-col gap-1 transition-transform group-hover:scale-[1.02]">
                <span className="font-mono text-[10px] tracking-widest text-blue-300 uppercase">
                  直觉力
                </span>
                <span className="text-2xl font-bold text-white">88%</span>
              </div>
              <div className="bg-white/[0.04] backdrop-blur-md rounded-xl p-4 border border-white/5 flex flex-col gap-1 transition-transform group-hover:scale-[1.02]">
                <span className="font-mono text-[10px] tracking-widest text-blue-300 uppercase">
                  逻辑思维
                </span>
                <span className="text-2xl font-bold text-white">95%</span>
              </div>
              <div className="bg-white/[0.04] backdrop-blur-md rounded-xl p-4 border border-white/5 flex flex-col gap-1 transition-transform group-hover:scale-[1.02]">
                <span className="font-mono text-[10px] tracking-widest text-blue-300 uppercase">
                  专注度
                </span>
                <span className="text-2xl font-bold text-white">90%</span>
              </div>
            </div>
          </div>

          {/* Glowing visual effect in background on hover */}
          <div className="absolute top-[-20%] right-[-10%] w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] group-hover:bg-blue-400/10 transition-all duration-700" />
        </motion.div>

        {/* Zodiac Section (Capricorn/Aquarius of XOM is Aquarius, now updated to Virgo as requested) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-4 bg-white/[0.04] backdrop-blur-lg rounded-2xl p-8 md:p-10 flex flex-col items-center justify-center text-center border border-white/10 hover:border-orange-300/30 transition-all duration-500 group relative overflow-hidden"
        >
          <div className="mb-6 p-6 rounded-full bg-white/[0.05] border border-orange-300/15 relative">
            <Sun className="w-12 h-12 text-orange-300 group-hover:rotate-45 transition-transform duration-700" />
            <div className="absolute inset-0 bg-orange-300/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <h3 className="font-sans text-2xl font-bold text-white mb-2">处女座</h3>
          <span className="font-mono text-xs text-orange-300 font-semibold tracking-widest uppercase mb-4">
            完美主义者
          </span>
          <p className="text-zinc-400 text-sm leading-relaxed italic max-w-xs">
            “追求极致的秩序、严谨的分析与无瑕的执行。在混沌的数字银河中构筑精确的完美律动。”
          </p>

          <div className="absolute bottom-[-10%] left-[-10%] w-40 h-40 bg-orange-500/5 rounded-full blur-3xl" />
        </motion.div>

        {/* Ideal Type Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="md:col-span-5 bg-white/[0.04] backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-emerald-400/30 transition-all duration-500 relative overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-8">
            <Heart className="w-6 h-6 text-emerald-300" />
            <h3 className="font-sans text-xl font-semibold text-zinc-200">理想共振点</h3>
          </div>
          <ul className="space-y-6">
            <li className="flex items-start gap-4 group/item">
              <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2.5 transition-all group-hover/item:scale-125" />
              <div>
                <span className="font-medium text-white block text-base">深度思想</span>
                <span className="text-sm text-zinc-400 leading-relaxed block mt-0.5">
                  欣赏有意义的对话和对世界充满好奇的灵魂。
                </span>
              </div>
            </li>
            <li className="flex items-start gap-4 group/item">
              <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2.5 transition-all group-hover/item:scale-125" />
              <div>
                <span className="font-medium text-white block text-base">创作能量</span>
                <span className="text-sm text-zinc-400 leading-relaxed block mt-0.5">
                  被那些能在平凡处发现非凡之美的人所吸引。
                </span>
              </div>
            </li>
            <li className="flex items-start gap-4 group/item">
              <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2.5 transition-all group-hover/item:scale-125" />
              <div>
                <span className="font-medium text-white block text-base">真实纯粹</span>
                <span className="text-sm text-zinc-400 leading-relaxed block mt-0.5">
                  原生、诚实，且在自己的世界里安然自得。
                </span>
              </div>
            </li>
          </ul>

          <div className="absolute top-10 right-[-10%] w-48 h-48 bg-emerald-500/5 rounded-full blur-[80px]" />
        </motion.div>

        {/* Visual Showcase / Hobbies Mini */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onClick={() => onNavigate('hobbies')}
          className="md:col-span-7 bg-white/[0.04] backdrop-blur-lg rounded-2xl overflow-hidden relative group border border-white/10 hover:border-blue-400/30 cursor-pointer min-h-[320px] flex flex-col justify-end"
        >
          {/* Glass background covering image with zoom */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-1000"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAovBGSTGCR3CW1Ey08CPVf1P38K9WnNVcXzCl9ISVu1FlutiECPYeiXKRvMOaj8I9a-mRkIydaSnXZp66LjBxKfuOsUjThvV1yX1R2m2FogvyZG9nXnTEJ_ewne9-ZA_ui3qpT_hXSZxN01tRPyJoYF-9f3o8IkvoJouuNSfDLrEgLY6Vo50DCxoerCwDVb31axMKVtUOK0QAfx1TNOj61vFny_pj12Rsi0ukhfy2tNDN5CAD5mlaEsJYEp8kevv8BO0vLhI6FsPaI')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/45 to-transparent z-1" />

          <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-blue-300 animate-spin-slow" />
              <span className="font-mono text-xs tracking-widest text-blue-300 uppercase">
                当前探索
              </span>
            </div>
            <h3 className="font-sans text-2xl font-bold text-white mb-3">深空探索</h3>
            <p className="text-zinc-300 text-sm md:text-base max-w-md">
              目前沉迷于生成式宇宙艺术，并探究数字持久性的哲学意义。
            </p>
          </div>
        </motion.div>
      </section>

      {/* Progress Interaction (Cosmic Resonance) */}
      <section className="w-full flex flex-col items-center mt-20 md:mt-32 mb-16 max-w-xl mx-auto px-4">
        <div className="w-full flex justify-between items-end mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-zinc-400 tracking-wider">
              宇宙共振 FREQUENCY
            </span>
            {energyClicks > 0 && (
              <span className="text-[10px] text-orange-300 bg-orange-300/10 px-1.5 py-0.5 rounded animate-pulse">
                +{energyClicks * 2}Hz Boost
              </span>
            )}
          </div>
          <span className="font-mono text-sm text-blue-300 font-semibold" id="progress-val">
            {resonance}%
          </span>
        </div>

        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-orange-400 via-blue-400 to-emerald-400 transition-all duration-300"
            id="progress-bar"
            style={{ width: `${resonance}%` }}
          />
        </div>

        {/* Interaction triggers */}
        <button
          onClick={handleInjectEnergy}
          className="px-5 py-2 font-mono text-xs text-zinc-300 hover:text-white border border-white/15 hover:border-blue-400/40 rounded-full bg-white/5 hover:bg-blue-400/10 active:scale-95 transition-all text-center select-none cursor-pointer flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-orange-300" />
          注入共振能量 INJECT RESONANCE
        </button>
      </section>
    </div>
  );
}
