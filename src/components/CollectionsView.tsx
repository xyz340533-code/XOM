import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Star, BookOpen, Music, Code, Globe, Tag, Sparkles, ArrowUpRight, Trash2, Plus, X, Lock } from 'lucide-react';
import { CollectionItem } from '../types';

export default function CollectionsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'book' | 'music' | 'tech' | 'site'>('all');
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState<'book' | 'music' | 'tech' | 'site'>('book');
  const [newRating, setNewRating] = useState(5);
  const [newUrl, setNewUrl] = useState('');
  const [newTagsString, setNewTagsString] = useState('');

  // Password Verification State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState<{
    type: 'add' | 'delete';
    targetId?: string;
    data?: any;
  } | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  const SEED_COLLECTIONS: CollectionItem[] = [
    {
      id: 'col-1',
      title: '《2001太空奥德赛》- 阿瑟·克拉克',
      subtitle: '2001: A Space Odyssey // 经典硬科幻科学里程碑',
      description: '对生命、宇宙和地外文明最宏大的追索。书中对“黑色石板”和超级人工智能 HAL 9000 的刻画超越了时代，展现了极致的智性孤独与浪漫．',
      category: 'book',
      rating: 5,
      tags: ['科幻小说', '阿瑟·克拉克', '宇宙探索', '数字生命'],
    },
    {
      id: 'col-2',
      title: '《哥德尔、艾舍尔、巴赫：集异璧之大成》',
      subtitle: 'Gödel, Escher, Bach // 跨学科思维奇书',
      description: '通过数学、艺术与音乐探讨自我意识、逻辑循环、递归和人工智能。INTJ 必读的结构主义圣经，将创意和逻辑连接到了极致。',
      category: 'book',
      rating: 5,
      tags: ['哲学', '逻辑数学', '人工智能', '巴赫'],
    },
    {
      id: 'col-3',
      title: 'Environment Ambient - Tim Hecker / Brian Eno',
      subtitle: '环境电声的低音呼吸',
      description: 'Brian Eno 的《Music for Airports》和 Tim Hecker 的《Ravedeath, 1972》。提供绝佳的心流创作背景伴奏，在频率的震荡中回归内心的真空。',
      category: 'music',
      rating: 4,
      tags: ['Ambient', '环境电子', '模块合成器', '心流伴奏'],
    },
    {
      id: 'col-4',
      title: 'Vite & ESBuild Build Ecosystem',
      subtitle: '近乎即时的热编译构建体验',
      description: '追求零等待的最佳构建范式。从 Vite 的原生 ESM 挂载模式，到 ESBuild 极速原生架构，均在无形中呵护前端工程师宝贵的专注度。',
      category: 'tech',
      rating: 5,
      tags: ['前端工具', 'Vite', 'Build Utilities', '极致性能'],
    },
    {
      id: 'col-5',
      title: 'The NASA Astronomy Picture of the Day',
      subtitle: 'APOD // 天文一日一图',
      description: '星河轮转。NASA 每天发布的一张令人叹为观止的宇宙奇观图片，辅以专业天文学家的简短科普。是 XOM 构架虚拟生成的灵感源泉。',
      category: 'site',
      rating: 5,
      tags: ['天文学', '灵感媒介', '每日推荐', '太空探索'],
      url: 'https://apod.nasa.gov/',
    },
    {
      id: 'col-6',
      title: '《海伯利安》- 丹·西蒙斯',
      subtitle: 'Hyperion Cantos // 诗意盎然的空间歌剧',
      description: '由七个朝圣者的故事交织出的壮丽挽歌。融汇宗教、诗歌与时间物理模型，是古典美学和终极物理终局碰撞的完美答卷。',
      category: 'book',
      rating: 4,
      tags: ['科幻文学', '空间歌剧', '时间悖论'],
    },
    {
      id: 'col-pinterest',
      title: 'Pinterest @视觉灵感看板',
      subtitle: 'Pinterest // 无限流式美学触角',
      description: '灵感汇流之处。无论是极简海报排版、宇宙主义概念插画还是毛玻璃色谱，都在瀑布流中构筑起审美底盘。',
      category: 'site',
      rating: 5,
      tags: ['美学看板', '视觉流', 'UI设计', '灵感来源'],
      url: 'https://www.pinterest.com/',
    },
    {
      id: 'col-stitch',
      title: 'Stitch @交互微动效设计',
      subtitle: 'Stitch // 精微交互组件与动效连接',
      description: '探索新锐、复杂的动态原型交互，将高精度的设计精细地缝合在大脑与程序逻辑之中。',
      category: 'site',
      rating: 4,
      tags: ['交互设计', '微动效', '逻辑连接'],
      url: 'https://tympanus.net/codrops/',
    },
    {
      id: 'col-figma',
      title: 'Figma @数字交互工作台',
      subtitle: 'Figma // 像素完美的协同设计大厅',
      description: '极简主义交互界面的发生物。在这里调绘出精准的组件间距、柔合的半透明投影与契合处女座秩序的矢量系统。',
      category: 'site',
      rating: 5,
      tags: ['界面设计', 'UIUX', '矢量图形', '原型绘制'],
      url: 'https://www.figma.com/',
    },
    {
      id: 'col-aistudio',
      title: 'Google AI Studio @模型共创实验室',
      subtitle: 'Google AI Studio // 极致敏捷的 AI 逻辑熔炉',
      description: '大语言模型 API 与多模态调试 of 黄金圣域。快速试验提示词工程，给应用披上高级的智能逻辑斗篷。',
      category: 'site',
      rating: 5,
      tags: ['LLM', 'Gemini API', '提示词开发', '智能推理'],
      url: 'https://aistudio.google.com/',
    },
    {
      id: 'col-midjourney',
      title: 'Midjourney @扩散引擎想象力终点',
      subtitle: 'Midjourney // 生成式艺术与深空绘图引擎',
      description: '以惊人的光影细腻度渲染出深空尘埃、重核爆发和未来主义建筑。人机共创星河的主要介质。',
      category: 'site',
      rating: 5,
      tags: ['生成艺术', '扩散模型', '概念视觉', '宇宙想象'],
      url: 'https://www.midjourney.com/',
    },
    {
      id: 'col-seedance',
      title: 'Seedance @数字生命电影动效',
      subtitle: 'Seedance // 生成式多维视频动效平台',
      description: '大模型时代的视频流与视觉微动效灵感站。专注于探索如何将物理力学 and 艺术审美优雅地缝合进时间序列。',
      category: 'site',
      rating: 4,
      tags: ['AI视频', 'Seedance', '动力学', '视频创作'],
      url: 'https://seedance.ai/',
    }
  ];

  // Dynamic loading from local storage
  useEffect(() => {
    const saved = localStorage.getItem('xom_collections_v2');
    if (saved) {
      try {
        setCollections(JSON.parse(saved));
      } catch (e) {
        setCollections(SEED_COLLECTIONS);
      }
    } else {
      setCollections(SEED_COLLECTIONS);
      localStorage.setItem('xom_collections_v2', JSON.stringify(SEED_COLLECTIONS));
    }
  }, []);

  const handleSaveToLocalStorage = (newColsList: CollectionItem[]) => {
    localStorage.setItem('xom_collections_v2', JSON.stringify(newColsList));
  };

  // Trigger Add submit
  const handleAddSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const tags = newTagsString
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const added: CollectionItem = {
      id: `col-${Date.now()}`,
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'Custom Gem Collection // 人机探索瑰宝',
      description: newDescription.trim(),
      category: newCategory,
      rating: newRating,
      tags,
      url: newUrl.trim() || undefined,
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
        const updated = [authAction.data, ...collections];
        setCollections(updated);
        handleSaveToLocalStorage(updated);

        // Reset inputs
        setNewTitle('');
        setNewSubtitle('');
        setNewDescription('');
        setNewCategory('book');
        setNewRating(5);
        setNewUrl('');
        setNewTagsString('');
        setIsAdding(false);
      } else if (authAction?.type === 'delete' && authAction.targetId) {
        const updated = collections.filter((c) => c.id !== authAction.targetId);
        setCollections(updated);
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
    { id: 'all', label: '全部收藏' },
    { id: 'book', label: '思想藏书', icon: BookOpen },
    { id: 'music', label: '耳背声轨', icon: Music },
    { id: 'tech', label: '提效工具', icon: Code },
    { id: 'site', label: '灵感星站', icon: Globe },
  ];

  // Filters logic
  const filteredCollections = collections.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'book': return <BookOpen className="w-4 h-4 text-emerald-300" />;
      case 'music': return <Music className="w-4 h-4 text-amber-300" />;
      case 'tech': return <Code className="w-4 h-4 text-blue-300" />;
      case 'site': return <Globe className="w-4 h-4 text-purple-300" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* View Header */}
      <div className="text-center mb-8">
        <h2 className="font-sans text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          极简阁楼
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto">
          精选的能量容器。这里摆放着塑造我认知底层、编码直觉与太空浪漫的奇珍之物。
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
          {isAdding ? '取消添加 CANCEL ADD' : '添加灵感收藏 ADD INSPIRATION'}
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
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                <h3 className="font-sans text-lg font-bold text-white">收纳新的宝藏目类 SHELVE NEW ITEM</h3>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                      藏品名称 / 书目 / 站点 *
                    </label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. 《星际穿越》- 基普·索恩"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-500 font-sans text-sm focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>

                  {/* Subtitle */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                      副标题 / 能量载体标签
                    </label>
                    <input
                      type="text"
                      value={newSubtitle}
                      onChange={(e) => setNewSubtitle(e.target.value)}
                      placeholder="e.g. Interstellar // 物理学原理的终极浪漫"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-500 font-sans text-sm focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Category selected */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                      所属象限 CATEGORY *
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white font-sans text-sm focus:outline-none focus:border-blue-400 transition-colors cursor-pointer"
                    >
                      <option value="book">思想藏书 (book)</option>
                      <option value="music">耳背声轨 (music)</option>
                      <option value="tech">提效工具 (tech)</option>
                      <option value="site">灵感星站 (site)</option>
                    </select>
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                      喜好指数 RATING *
                    </label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white font-sans text-sm focus:outline-none focus:border-blue-400 transition-colors cursor-pointer"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ (极力推崇)</option>
                      <option value="4">⭐⭐⭐⭐ (备受启发)</option>
                      <option value="3">⭐⭐⭐ (值得涉猎)</option>
                      <option value="2">⭐⭐ (寻常备用)</option>
                      <option value="1">⭐ (单次阅览)</option>
                    </select>
                  </div>

                  {/* Official URL */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                      官方网址 OFFICIAL WEBSITE URL
                    </label>
                    <input
                      type="url"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      placeholder="e.g. https://nasa.gov"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-500 font-sans text-sm focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Description content */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                    藏品精髓 / 推荐词 DESCRIPTION *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="描绘这个藏品吸引你的极智部分，在文字中释放对思想的敬畏..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-500 font-sans text-sm focus:outline-none focus:border-blue-400 transition-colors resize-none"
                  />
                </div>

                {/* Tags input */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                    藏品标签 TAGS (英文/中文逗号分隔)
                  </label>
                  <input
                    type="text"
                    value={newTagsString}
                    onChange={(e) => setNewTagsString(e.target.value)}
                    placeholder="e.g. 宇宙美学, 理论物理, 精神余粮"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-500 font-sans text-sm focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-teal-400/25 hover:bg-teal-400/35 border border-teal-300/30 font-sans text-xs font-bold text-teal-100 tracking-wider shadow-[0_4px_15px_rgba(20,184,166,0.1)] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    验证密码并归档 ENLOCK & SHELVE
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search & Category Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
        
        {/* Category list buttons */}
        <div className="flex flex-wrap gap-2 order-2 md:order-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-medium border cursor-pointer select-none transition-all ${
                  isSelected
                    ? 'bg-blue-400/15 text-blue-200 border-blue-400/30 shadow-[0_0_12px_rgba(59,130,246,0.1)]'
                    : 'bg-white/[0.03] text-zinc-400 border-white/5 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Real-time search bar */}
        <div className="relative w-full md:w-72 order-1 md:order-2">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="在阁楼里搜索书目或标签..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-white placeholder-zinc-500 font-sans text-xs focus:outline-none focus:border-blue-400 transition-colors"
          />
        </div>

      </div>

      {/* Grid of Collection items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCollections.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              key={item.id}
              className="bg-white/[0.04] backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group relative"
            >
              {/* Delete Trigger */}
              <button
                onClick={() => handleDeleteClick(item.id)}
                className="absolute top-6 right-6 p-2 rounded-lg bg-white/0 hover:bg-red-500/10 text-zinc-500 hover:text-red-400 border border-transparent hover:border-red-400/20 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                title="舍弃此项收藏 Remove Collectible"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="pr-6 md:pr-8">
                {/* Upper line: Category icon & score */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(item.category)}
                    <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
                      {item.category}
                    </span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < item.rating
                            ? 'text-orange-300 fill-orange-300/35 drop-shadow-[0_0_8px_rgba(253,186,116,0.3)]'
                            : 'text-zinc-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="font-sans text-lg font-bold text-white mb-1 group-hover:text-blue-200 transition-colors leading-snug">
                  {item.title}
                </h3>
                <span className="font-sans text-xs text-blue-300/80 block mb-3 leading-normal">
                  {item.subtitle}
                </span>

                <p className="text-zinc-300 text-sm leading-relaxed mb-4 whitespace-pre-line">
                  {item.description}
                </p>

                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-blue-400/15 border border-white/5 hover:border-blue-400/30 text-[10px] font-sans text-zinc-300 hover:text-blue-200 transition-all cursor-pointer mb-5 active:scale-95"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>访问官方网站</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Lower line: Tag items */}
              <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/5 w-full">
                <Tag className="w-3 h-3 text-zinc-500 mt-1 shrink-0" />
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded transition-transform hover:scale-[1.03]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredCollections.length === 0 && (
        <div className="text-center p-16 rounded-2xl bg-white/[0.02] border border-white/5 mt-6">
          <p className="text-zinc-500 font-sans text-base">
            未寻找到契合“{searchQuery}”频率的收藏品。换个词试一试？
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
