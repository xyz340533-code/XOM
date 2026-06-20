import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Star, BookOpen, Music, Code, Globe, Tag, Sparkles } from 'lucide-react';
import { CollectionItem } from '../types';

export default function CollectionsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'book' | 'music' | 'tech' | 'site'>('all');

  const collections: CollectionItem[] = [
    {
      id: 'col-1',
      title: '《2001太空奥德赛》- 阿瑟·克拉克',
      subtitle: '2001: A Space Odyssey // 经典硬科幻科学里程碑',
      description: '对生命、宇宙和地外文明最宏大的追索。书中对“黑色石板”和超级人工智能 HAL 9000 的刻画超越了时代，展现了极致的智性孤独与浪漫。',
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
    },
    {
      id: 'col-stitch',
      title: 'Stitch @交互微动效设计',
      subtitle: 'Stitch // 精微交互组件与动效连接',
      description: '探索新锐、复杂的动态原型交互，将高精度的设计精细地缝合在大脑与程序逻辑之中。',
      category: 'site',
      rating: 4,
      tags: ['交互设计', '微动效', '逻辑连接'],
    },
    {
      id: 'col-figma',
      title: 'Figma @数字交互工作台',
      subtitle: 'Figma // 像素完美的协同设计大厅',
      description: '极简主义交互界面的发生物。在这里调绘出精准的组件间距、柔和的半透明投影与契合处女座秩序的矢量系统。',
      category: 'site',
      rating: 5,
      tags: ['界面设计', 'UIUX', '矢量图形', '原型绘制'],
    },
    {
      id: 'col-aistudio',
      title: 'Google AI Studio @模型共创实验室',
      subtitle: 'Google AI Studio // 极致敏捷的 AI 逻辑熔炉',
      description: '大语言模型 API 与多模态调试的黄金圣域。快速试验提示词工程，给应用披上高级的智能逻辑斗篷。',
      category: 'site',
      rating: 5,
      tags: ['LLM', 'Gemini API', '提示词开发', '智能推理'],
    },
    {
      id: 'col-midjourney',
      title: 'Midjourney @扩散引擎想象力终点',
      subtitle: 'Midjourney // 生成式艺术与深空绘图引擎',
      description: '以惊人的光影细腻度渲染出深空尘埃、重核爆发和未来主义建筑。人机共创星河的主要介质。',
      category: 'site',
      rating: 5,
      tags: ['生成艺术', '扩散模型', '概念视觉', '宇宙想象'],
    },
    {
      id: 'col-seedance',
      title: 'Seedance @数字生命电影动效',
      subtitle: 'Seedance // 生成式多维视频动效平台',
      description: '大模型时代的视频流与视觉微动效灵感站。专注于探索如何将物理力学和艺术审美优雅地缝合进时间序列。',
      category: 'site',
      rating: 4,
      tags: ['AI视频', 'Seedance', '动力学', '视频创作'],
    }
  ];

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
      <div className="text-center mb-12">
        <h2 className="font-sans text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          极简阁楼
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto">
          精选的能量容器。这里摆放着塑造我认知底层、编码直觉与太空浪漫的奇珍之物。
        </p>
      </div>

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
        <AnimatePresence mode="popLayout border">
          {filteredCollections.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              key={item.id}
              className="bg-white/[0.04] backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
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

                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Lower line: Tag items */}
              <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/5">
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
    </div>
  );
}
