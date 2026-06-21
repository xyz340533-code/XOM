import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, Palette, Shield, Sparkles, Terminal, Cpu, Trash2, Plus, X, Lock } from 'lucide-react';
import { SkillItem } from '../types';

export default function SkillsView() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'code' | 'design' | 'strategy' | 'creative'>('all');
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<'code' | 'design' | 'strategy' | 'creative'>('code');
  const [newSkillPercent, setNewSkillPercent] = useState(80);
  const [newSkillDescription, setNewSkillDescription] = useState('');
  const [newSkillTagsString, setNewSkillTagsString] = useState('');

  // Password-Authorization Modal State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState<{
    type: 'add' | 'delete';
    targetId?: string;
    data?: any;
  } | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  const SEED_SKILLS: SkillItem[] = [
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
      id: 'ps_video',
      name: '视觉美化与数字剪辑 (Photoshop & Video Production)',
      percent: 90,
      description: '熟练掌握 Photoshop (PS) 进行高级色彩修调、海报大图合成及自媒体视觉设计；精通视频非线性剪辑与声画卡点，提供高审美水平的自媒体内容分发。',
      category: 'design',
      tags: ['Photoshop', '视频剪辑', '自媒体包装', '视觉艺术'],
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
      id: 'office',
      name: '专业办公工具与数据结构化 (Office Suite & Analytical Modeling)',
      percent: 93,
      description: '日常数据洞察的高效引擎。熟练运用 Excel 进行复杂数据建模、透视、规划求解与交叉过滤，以及制作兼顾完美对齐、严密逻辑链条的高端汇报演示 PPT。',
      category: 'strategy',
      tags: ['Excel 建模', 'PPT 逻辑架构', '结构化表达', '日常协同'],
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

  // Dynamic loading
  useEffect(() => {
    const saved = localStorage.getItem('xom_skills_v2');
    if (saved) {
      try {
        setSkills(JSON.parse(saved));
      } catch (e) {
        setSkills(SEED_SKILLS);
      }
    } else {
      setSkills(SEED_SKILLS);
      localStorage.setItem('xom_skills_v2', JSON.stringify(SEED_SKILLS));
    }
  }, []);

  const handleSaveToLocalStorage = (newSkillsList: SkillItem[]) => {
    localStorage.setItem('xom_skills_v2', JSON.stringify(newSkillsList));
  };

  // Trigger Add dialog
  const handleAddClick = (e: FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim() || !newSkillDescription.trim()) return;

    const tags = newSkillTagsString
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const added: SkillItem = {
      id: `skill-${Date.now()}`,
      name: newSkillName.trim(),
      category: newSkillCategory,
      percent: newSkillPercent,
      description: newSkillDescription.trim(),
      tags,
    };

    setAuthAction({
      type: 'add',
      data: added,
    });
    setAuthError(false);
    setPasswordInput('');
    setShowAuthModal(true);
  };

  // Trigger Delete dialog
  const handleDeleteClick = (id: string) => {
    setAuthAction({
      type: 'delete',
      targetId: id,
    });
    setAuthError(false);
    setPasswordInput('');
    setShowAuthModal(true);
  };

  // Auth processing
  const handleAuthVerify = (e: FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'XOM1990') {
      if (authAction?.type === 'add') {
        const updated = [authAction.data, ...skills];
        setSkills(updated);
        handleSaveToLocalStorage(updated);

        // Reset fields
        setNewSkillName('');
        setNewSkillDescription('');
        setNewSkillTagsString('');
        setNewSkillPercent(80);
        setIsAdding(false);
      } else if (authAction?.type === 'delete' && authAction.targetId) {
        const updated = skills.filter((s) => s.id !== authAction.targetId);
        setSkills(updated);
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
      <div className="text-center mb-8 relative">
        <h2 className="font-sans text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          技能方阵
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto">
          在冰冷的逻辑与发光的创意之间构筑桥梁。以下是 XOM 构筑的技能象限和宇宙工具。
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
          {isAdding ? '取消添加 CANCEL ADD' : '添加定制技能 ADD CUSTOM SKILL'}
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
                <Sparkles className="w-5 h-5 text-blue-300 animate-pulse" />
                <h3 className="font-sans text-lg font-bold text-white">录入新的机体势能 ADD NEW SKILL</h3>
              </div>

              <form onSubmit={handleAddClick} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Skill name */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                      技能名称 SKILL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                      placeholder="e.g. 现代化前端工程 (Frontend Architecture)"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-500 font-sans text-sm focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>

                  {/* Category selected */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                      所属象限 CATEGORY *
                    </label>
                    <select
                      value={newSkillCategory}
                      onChange={(e) => setNewSkillCategory(e.target.value as any)}
                      className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white font-sans text-sm focus:outline-none focus:border-blue-400 transition-colors cursor-pointer"
                    >
                      <option value="code">逻辑开发 (code)</option>
                      <option value="design">创意设计 (design)</option>
                      <option value="strategy">系统策略 (strategy)</option>
                      <option value="creative">前沿探索 (creative)</option>
                    </select>
                  </div>
                </div>

                {/* Rating percent slider */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                      进化深度 PROFICIENCY *
                    </label>
                    <span className="font-mono text-sm font-bold text-blue-300">{newSkillPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={newSkillPercent}
                    onChange={(e) => setNewSkillPercent(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-400"
                  />
                </div>

                {/* Description content */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                    势能/功用描述 DESCRIPTION *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newSkillDescription}
                    onChange={(e) => setNewSkillDescription(e.target.value)}
                    placeholder="说说明这个技能的极致习惯，支持一句话展示专业性..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-500 font-sans text-sm focus:outline-none focus:border-blue-400 transition-colors resize-none"
                  />
                </div>

                {/* Tags input */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                    技术标签 TAGS (英文/中文逗号分隔)
                  </label>
                  <input
                    type="text"
                    value={newSkillTagsString}
                    onChange={(e) => setNewSkillTagsString(e.target.value)}
                    placeholder="e.g. React 19, TypeScript, Tailwind"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-500 font-sans text-sm focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-teal-400/25 hover:bg-teal-400/35 border border-teal-300/30 font-sans text-xs font-bold text-teal-100 tracking-wider shadow-[0_4px_15px_rgba(20,184,166,0.1)] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    验证密码并创建 PERSIST TO CORE
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category selector / Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-sans text-xs md:text-sm font-medium transition-all duration-300 border cursor-pointer select-none ${
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
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              key={item.id}
              className="bg-white/[0.04] backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 hover:border-blue-400/30 transition-all duration-300 group relative"
            >
              {/* Delete trigger */}
              <button
                onClick={() => handleDeleteClick(item.id)}
                className="absolute top-6 right-6 p-2 rounded-lg bg-white/0 hover:bg-red-500/10 text-zinc-500 hover:text-red-400 border border-transparent hover:border-red-400/20 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                title="清除此项机制 Skill Deprecate"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="flex flex-col md:flex-row justify-between gap-6 pr-6 md:pr-8">
                
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
                  
                  <p className="text-zinc-300 text-sm md:text-base mb-4 leading-relaxed whitespace-pre-line">
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
                    <span className="font-mono text-xs text-zinc-400 tracking-wider">熟练开发熟练度</span>
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

      {filteredSkills.length === 0 && (
        <div className="text-center p-16 rounded-2xl bg-white/[0.02] border border-white/5 mt-6">
          <p className="text-zinc-500 font-sans text-base">
            当前区间不存在这一类的机制。可以点击添加定制技能进行录入。
          </p>
        </div>
      )}

      {/* Decorative summary footer */}
      <div className="mt-12 text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm max-w-2xl mx-auto">
        <p className="text-xs font-mono text-zinc-500 tracking-wider leading-relaxed">
          XOM 的信条：“代码并非只是冰冷具象的集合，直觉亦非只是粗粝感性的外露。而架构之美，能同时洞穿这两者的奥秘。”
        </p>
      </div>

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

              <p className="text-zinc-400 text-xs mb-5 leading-relaxed font-sans">
                为了捍卫 XOM 的处女座对称规则。向核心注入添加或卸载指令前，请输入专属控制密钥进行频率对齐（密钥为 XOM 的密码）：
              </p>

              <form onSubmit={handleAuthVerify} className="space-y-4">
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
                    placeholder="输入密码 以确认操作..."
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
                      验证密钥不相符，请核对电波密码。
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
                    解锁并广播指令
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
