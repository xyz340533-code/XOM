import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, Palette, Shield, Sparkles, Terminal, Cpu } from 'lucide-react';
import { SkillItem } from '../types';

export default function SkillsView() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'code' | 'design' | 'strategy' | 'creative'>('all');

  const skills: SkillItem[] = [
    {
      id: 'fe',
      name: '现代化前端工程 (Frontend Architecture)',
      percent: 94,
      description: '熟练掌握 React, Vite 技术栈, 拥有极致的性能调优与精细的动画动效实现习惯。',
      category: 'code',
      tags: ['React 19', 'TypeScript', 'Tailwind v4', 'Framer Motion'],
    },
    {
      id: 'be',
      name: '服务端与微服务 (Server Systems)',
      percent: 88,
      description: '熟悉 Node.js/Express 构建高可用 API、网关拦截、懒加载中间件设计及进程安全管理。',
      category: 'code',
      tags: ['Express', 'Node.js', 'RESTful API', 'Serverless'],
    },
    {
      id: 'uiux',
      name: '界面与动效设计 (Interaction Design)',
      percent: 92,
      description: '推崇极简主义与毛玻璃（Glassmorphism）质感，能独立完成高保真交互蓝图与视觉系统设计。',
      category: 'design',
      tags: ['Figma', 'Prototyping', 'Design Systems', 'Micro-interactions'],
    },
    {
      id: 'strategy',
      name: '战略性规划与建模 (Systems & Modelling)',
      percent: 95,
      description: '具备 INTJ 独特的长远规划自觉。擅长系统复杂性重构、代码模块解耦及领域驱动设计。',
      category: 'strategy',
      tags: ['System Design', 'Domain Modelling', 'Refactoring', 'Architecture'],
    },
    {
      id: 'ai',
      name: '生成式宇宙艺术 (Generative AI & Art)',
      percent: 90,
      description: '探索大语言模型（Gemini SDK）、扩散模型及粒子物理引擎的交汇，致力于人机共创的新浪潮。',
      category: 'creative',
      tags: ['Gemini API', 'Generative Art', 'Three.js', 'Stable Diffusion'],
    },
  ];

  const categories = [
    { id: 'all', label: '全部技能' },
    { id: 'code', label: '逻辑开发', icon: Code },
    { id: 'design', label: '创意设计', icon: Palette },
    { id: 'strategy', label: '系统策略', icon: Shield },
    { id: 'creative', label: '前沿探索', icon: Cpu },
  ];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(item => item.category === activeCategory);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* View Header */}
      <div className="text-center mb-12">
        <h2 className="font-sans text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          技能方阵
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto">
          在冰冷的逻辑与发光的创意之间构筑桥梁。以下是 XOM 构筑的技能象限和宇宙工具。
        </p>
      </div>

      {/* Category selector / Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-sans text-xs md:text-sm font-medium transition-all duration-300 border cursor-pointer ${
                isActive
                  ? 'bg-blue-400/15 text-blue-200 border-blue-400/40 shadow-[0_0_15px_rgba(181,201,223,0.1)]'
                  : 'bg-white/5 text-zinc-400 border-white/5 hover:text-zinc-200 hover:bg-white/10'
              }`}
            >
              {Icon && <Icon className="w-4 h-4" />}
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Skills list/Grid */}
      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout border">
          {filteredSkills.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              key={item.id}
              className="bg-white/[0.04] backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 hover:border-blue-400/30 transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                
                {/* Description Column */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="p-1.5 rounded-lg bg-white/5 text-blue-300 border border-white/10">
                      {item.category === 'code' && <Terminal className="w-4 h-4" />}
                      {item.category === 'design' && <Palette className="w-4 h-4" />}
                      {item.category === 'strategy' && <Shield className="w-4 h-4" />}
                      {item.category === 'creative' && <Sparkles className="w-4 h-4" />}
                    </span>
                    <h3 className="font-sans text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  
                  <p className="text-zinc-300 text-sm md:text-base mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs text-zinc-400 bg-white/5 hover:bg-blue-400/5 hover:text-blue-200 border border-white/5 hover:border-blue-400/20 px-2.5 py-1 rounded transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress bar Column */}
                <div className="w-full md:w-64 flex flex-col justify-center">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-mono text-xs text-zinc-400 tracking-wider">熟练度熟练熟练</span>
                    <span className="font-mono text-base font-bold text-blue-300">
                      {item.percent}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percent}%` }}
                      transition={{ duration: 1, delay: 0.1 }}
                      className="h-full bg-gradient-to-r from-blue-400 to-emerald-400"
                    />
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Decorative summary footer */}
      <div className="mt-12 text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm max-w-2xl mx-auto">
        <p className="text-xs font-mono text-zinc-500 tracking-wider leading-relaxed">
          XOM 的信条: "CODE IS NOT JUST CONCRETENESS. INTUITION IS NOT JUST RAW FEELING. ARCHITECTURE SEES BOTH."
        </p>
      </div>
    </div>
  );
}
