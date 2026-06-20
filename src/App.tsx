import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Brain, X, Info } from 'lucide-react';
import { TabType } from './types';
import Navbar from './components/Navbar';
import IntroView from './components/IntroView';
import SkillsView from './components/SkillsView';
import HobbiesView from './components/HobbiesView';
import FriendsView from './components/FriendsView';
import CollectionsView from './components/CollectionsView';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('intro');
  const [scrolled, setScrolled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('twilight');
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [mbtiInput, setMbtiInput] = useState('');
  const [mbtiResult, setMbtiResult] = useState<string | null>(null);

  // Scroll effect on header navigation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme map to absolute URLs
  const backgroundImages: Record<string, string> = {
    twilight: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR8REF8YaB6EKUNgHYY2uKIm-NXJvQoh2UbASuOdwcgH-lyA_43X8D5IPniSSSwoSh0ubnzw3XM2GFMqjfQNhXxdi0DgXDDZNg42NGbO9KWby03QANqWB8drnFcBv5npUCg3aYTO_DPY1u98_iK3FiqA0MFj7M1LAQ_Se6EuL_TL9i7hsIN0IGOX_2sD2bmf12bNlsIfoclW1VsYqPAqhyJ0zqSyHGEhDfikcmJEYmwNkEFuRRX7wIAtVnRA_AZfBPxDAhk7Kmym4V',
    space: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAovBGSTGCR3CW1Ey08CPVf1P38K9WnNVcXzCl9ISVu1FlutiECPYeiXKRvMOaj8I9a-mRkIydaSnXZp66LjBxKfuOsUjThvV1yX1R2m2FogvyZG9nXnTEJ_ewne9-ZA_ui3qpT_hXSZxN01tRPyJoYF-9f3o8IkvoJouuNSfDLrEgLY6Vo50DCxoerCwDVb31axMKVtUOK0QAfx1TNOj61vFny_pj12Rsi0ukhfy2tNDN5CAD5mlaEsJYEp8kevv8BO0vLhI6FsPaI',
    mist: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
  };

  // Compatibility checking for XOM's INTJ
  const handleCheckMbti = () => {
    const query = mbtiInput.trim().toUpperCase();
    if (!query || query.length !== 4) {
      setMbtiResult('请输入标准4位MBTI（例如INFJ/ENFP）');
      return;
    }

    const mbtiMap: Record<string, string> = {
      ENFP: '竞选者 (ENFP): 95% 黄金共振！你们是战略理智与烂漫火焰的完美触碰，彼此滋养对方的脑洞。',
      INFP: '调停者 (INFP): 90% 极深度灵魂交汇。共同执念于宇宙未知的纯粹感性与逻辑诗章。',
      ENTP: '辩论家 (ENTP): 88% 脑暴挚友。言语交锋的电光石火，战略与奇想的最佳双螺旋。',
      INFJ: '提倡者 (INFJ): 85% 幽微的默契。不需要解释太多的内向探索同盟。',
      INTJ: '建筑师 (INTJ): 80% 同频对视。如同照镜子般的深奥宁静，对效率与秩序的高规格一致性。',
      INTP: '逻辑学家 (INTP): 85% 思想探索的最佳客卿，互相印证深度思维模式。',
      ENFJ: '主人公 (ENFJ): 75% 温暖的异极吸引。阳光穿透冷若冰霜的内心防线。',
      ENTJ: '指挥官 (ENTJ): 78% 完美的星际战役合伙人，效率至上的极简协作。',
    };

    const answer = mbtiMap[query] || `${query} 的探索者: 65% 的相对共振。你带来的未知波段可以给 INTJ 独特的解构新视角！`;
    setMbtiResult(answer);
  };

  return (
    <div className="relative min-h-screen bg-[#111415] text-[#e1e3e4] font-sans antialiased selection:bg-blue-400/30 selection:text-white overflow-x-hidden">
      
      {/* Background Layer with Parallax-like fix styling */}
      <div
        className="fixed inset-0 w-full h-full z-0 bg-cover bg-center transition-all duration-1000 ease-in-out select-none pointer-events-none"
        style={{
          backgroundImage: `url('${backgroundImages[currentTheme]}')`,
          filter: 'brightness(0.5) contrast(1.15)',
        }}
      />
      <div className="fixed inset-0 bg-[#0c0f10]/35 backdrop-blur-[3px] z-0 pointer-events-none" />

      {/* Navigation bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        scrolled={scrolled}
        onUserClick={() => {
          setMbtiResult(null);
          setMbtiInput('');
          setShowEasterEgg(true);
        }}
      />

      {/* Main View Container */}
      <main className="relative z-10 pt-28 pb-16 px-6 md:px-16 max-w-7xl mx-auto min-h-screen flex flex-col justify-between">
        
        {/* Dynamic switching between render tabs with framer-motion */}
        <div className="flex-1 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {activeTab === 'intro' && (
                <IntroView onNavigate={(tab) => {
                  setActiveTab(tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} />
              )}
              {activeTab === 'skills' && <SkillsView />}
              {activeTab === 'hobbies' && (
                <HobbiesView currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
              )}
              {activeTab === 'friends' && <FriendsView />}
              {activeTab === 'collections' && <CollectionsView />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer block */}
        <footer className="w-full pt-16 mt-16 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono select-none">
          <div className="text-zinc-500 uppercase tracking-widest text-[10px]">
            © {new Date().getFullYear()} XOM 个人空间。以宁静构建。
          </div>
          <div className="flex gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-500 hover:text-blue-300 transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-500 hover:text-blue-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-500 hover:text-blue-300 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </main>

      {/* Easter Egg Modal - Cosmic MBTI Resonance Verifier */}
      <AnimatePresence>
        {showEasterEgg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEasterEgg(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-md bg-zinc-950/90 border border-blue-400/30 rounded-2xl p-6 md:p-8 shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowEasterEgg(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white rounded-full p-1 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title Header */}
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-blue-300" />
                <span className="font-mono text-xs tracking-wider text-blue-300 uppercase">
                  COSMIC COMPATIBILITY
                </span>
              </div>

              <h3 className="font-sans text-xl font-bold text-white mb-3">
                INTJ-A 宇宙兼容度校验
              </h3>

              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-6">
                每个探访者的意志都是一串四位维度的指令。输入你的 MBTI，探索你的思想场域与 XOM 构建的 INTJ 有多少引力共振！
              </p>

              {/* Input Form */}
              <div className="space-y-4 mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={4}
                    value={mbtiInput}
                    onChange={(e) => setMbtiInput(e.target.value.toUpperCase())}
                    placeholder="输入你的 MBTI (e.g. ENFP)"
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-600 font-mono text-sm tracking-widest text-center uppercase focus:outline-none focus:border-blue-400"
                  />
                  <button
                    onClick={handleCheckMbti}
                    className="px-4 py-2 bg-blue-400/20 hover:bg-blue-400/35 border border-blue-400/30 text-xs font-mono font-bold text-blue-100 rounded-lg transition-all active:scale-[0.98] cursor-pointer"
                  >
                    校验 CHECK
                  </button>
                </div>

                {/* Output Panel */}
                <AnimatePresence mode="wait">
                  {mbtiResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 bg-white/5 rounded-xl border border-white/10 text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans"
                    >
                      <div className="flex gap-2 items-start">
                        <Info className="w-4 h-4 text-orange-300 shrink-0 mt-0.5" />
                        <div>{mbtiResult}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sub-note */}
              <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-mono">
                <Sparkles className="w-3 h-3 text-zinc-600" />
                <span>FREQUENCY DEPOSITION ENGINE v1.2</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
