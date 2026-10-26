import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  ArrowDown,
  ArrowUpRight,
  Award,
  BookOpen,
  BrainCircuit,
  CircuitBoard,
  Cpu,
  Download,
  Fingerprint,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Microscope,
  X,
} from 'lucide-react'

type Language = 'en' | 'zh'
type Filter = 'all' | 'cim' | 'neuromorphic' | 'neural' | 'devices'
type Copy = { en: string; zh: string }

const research = [
  {
    icon: CircuitBoard,
    number: '01',
    title: { en: 'Computing-in-Memory', zh: '存内计算' },
    subtitle: { en: 'RAG · Transformers · Signal restoration', zh: '检索增强生成 · Transformer · 信号恢复' },
    description: {
      en: 'Full-stack accelerator design spanning RRAM–SRAM hybrid memory, digital SRAM CIM and 1T1C eDRAM, with workload-aware dataflow for retrieval, attention and multimodal restoration.',
      zh: '面向检索、注意力与多模态信号恢复，开展覆盖 RRAM–SRAM 混合存储、数字 SRAM CIM 与 1T1C eDRAM 的全栈加速器设计。',
    },
    tags: [
      { en: 'ReRAM', zh: 'ReRAM' },
      { en: 'SRAM CIM', zh: 'SRAM CIM' },
      { en: 'eDRAM CIM', zh: 'eDRAM CIM' },
      { en: 'Dataflow', zh: '数据流' },
    ],
  },
  {
    icon: BrainCircuit,
    number: '02',
    title: { en: 'Neuromorphic Systems', zh: '神经形态计算系统' },
    subtitle: { en: 'Brain-inspired NN Deployment · Algorithm–Hardware Co-design', zh: '类脑神经网络部署 · 算法硬件 Co-design' },
    description: {
      en: 'Resource-efficient brain-inspired neural network deployment, adaptive sparse computation and memory scheduling for real-time visual recognition on neuromorphic platforms.',
      zh: '研究类脑神经网络的高效部署、自适应稀疏计算与存储调度，构建面向实时视觉识别的神经形态计算平台。',
    },
    tags: [
      { en: 'Neural Deployment', zh: '类脑神经网络部署' },
      { en: 'Co-design', zh: '算法硬件 Co-design' },
      { en: 'Sparsity', zh: '稀疏' },
    ],
  },
  {
    icon: Cpu,
    number: '03',
    title: { en: 'AI Acceleration Technologies', zh: 'AI 加速技术' },
    subtitle: { en: 'Quantization · Reconfigurable Computing · Sparsity · Data Movement', zh: '量化 · 可重构 · 稀疏 · 数据搬运' },
    description: {
      en: 'Quantization, reconfigurable compute patterns, hybrid sparsity and data-movement optimization for energy-efficient AI inference across edge workloads.',
      zh: '面向边缘 AI 工作负载，研究量化、可重构计算、混合稀疏与数据搬运优化，提升推理能效与硬件利用率。',
    },
    tags: [
      { en: 'Quantization', zh: '量化' },
      { en: 'Reconfigurable', zh: '可重构' },
      { en: 'Sparsity', zh: '稀疏' },
      { en: 'Data Movement', zh: '数据搬运' },
    ],
  },
  {
    icon: Activity,
    number: '04',
    title: { en: 'Neural Interfaces', zh: '脑机接口芯片' },
    subtitle: { en: 'sEEG Decoding · Sparse Sensing · Neural Interfaces', zh: 'sEEG 解码 · 稀疏感知 · 脑机接口' },
    description: {
      en: 'High-channel-count neural acquisition and decoding, combining predictive focused sampling, CIM-based processing and adaptive thresholding for bandwidth-efficient brain–computer interfaces.',
      zh: '面向高通量神经信号采集与解码，融合预测聚焦采样、存内计算和自适应阈值策略，降低脑机接口的数据带宽与处理开销。',
    },
    tags: [
      { en: 'BCI', zh: 'BCI' },
      { en: 'sEEG Decoding', zh: 'sEEG 解码' },
      { en: 'Predictive Sampling', zh: '预测采样' },
    ],
  },
]

const publications: {
  year: string
  venue: string
  category: Exclude<Filter, 'all'>
  title: string
  authors: React.ReactNode
  details: string
  link?: string
  note?: Copy
}[] = [
  {
    year: '2026', venue: 'TCAS-AI', category: 'neuromorphic',
    title: 'Resource-Efficient FPGA Acceleration for Neuromorphic Visual Recognition via Spike-Weight-State Co-Optimization',
    authors: <><strong>Z Liao</strong>, Z Shen, T Li, S Shen, C Zhang, J Yang, M Sawan</>,
    details: 'IEEE Transactions on Circuits and Systems for Artificial Intelligence, 2026',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=Ccyy7gIAAAAJ&sortby=pubdate&citation_for_view=Ccyy7gIAAAAJ:LkGwnXOMwfcC',
    note: { en: 'First author', zh: '第一作者' },
  },
  {
    year: '2026', venue: 'Encyclopedia', category: 'devices',
    title: 'Memristor-Based Logic Circuits: Concept and Prospect',
    authors: <><strong>Z Liao</strong>, A Jabir, G Xue, Z Hajiabadi, V Ravitharan, S Chandrasekaran, et al.</>,
    details: 'Encyclopedia 6 (9), 190, 2026',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=Ccyy7gIAAAAJ&sortby=pubdate&citation_for_view=Ccyy7gIAAAAJ:WF5omc3nYNoC',
    note: { en: 'First author', zh: '第一作者' },
  },
  {
    year: '2026', venue: 'J. Semiconductors', category: 'neuromorphic',
    title: '面向边缘智能的神经形态计算芯片与部署',
    authors: <><strong>廖志鹏</strong>, 章城骏, 方潮铭, 张宇豪, 沈子扬, 杨杰, Mohamad Sawan</>,
    details: '半导体学报 1 (2), 022601-1–022601-12, 2026',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=Ccyy7gIAAAAJ&sortby=pubdate&citation_for_view=Ccyy7gIAAAAJ:ufrVoPGSRksC',
    note: { en: 'First author · Cover article', zh: '第一作者 · 封面文章' },
  },
  {
    year: '2026', venue: 'TCAS-I', category: 'neuromorphic',
    title: 'SHARP: An Energy-Efficient Spike-Based 3-D Recognition Processor With Hierarchical Hybrid Sparsity Awareness on Point Cloud',
    authors: <>Z Shen*, <strong>Z Liao*</strong>, S Shen, C Fang, F Tian, J Yang, M Sawan</>,
    details: 'IEEE Transactions on Circuits and Systems I: Regular Papers, 2026',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=Ccyy7gIAAAAJ&sortby=pubdate&citation_for_view=Ccyy7gIAAAAJ:eQOLeE2rZwMC',
    note: { en: 'Co-first author', zh: '共同第一作者' },
  },
  {
    year: '2026', venue: 'ISCAS', category: 'neuromorphic',
    title: 'A Heterogeneous Decision Spiking Transformer Accelerator with Locality-dependent KV Product Cache and Compute Pattern Reconfigurable Engine',
    authors: <>Z Shen*, <strong>Z Liao*</strong>, S Shen, C Fang, F Tian, J Yang, M Sawan</>,
    details: '2026 IEEE International Symposium on Circuits and Systems (ISCAS), 3241–3245',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=Ccyy7gIAAAAJ&sortby=pubdate&citation_for_view=Ccyy7gIAAAAJ:W7OEmFMy1HYC',
    note: { en: 'Co-first author', zh: '共同第一作者' },
  },
  {
    year: '2026', venue: 'ISSCC', category: 'neural',
    title: '36.6 A Sparsity-Aware Neural Interface with CIM-Based Predictive Focused Sampling for Hotspot Spike Tracking',
    authors: <>H Wu, F Tian, J Chen, <strong>Z Liao</strong>, H Zhang, X Liu, W Zou, S Cheng, Z Zhang, et al.</>,
    details: '2026 IEEE International Solid-State Circuits Conference (ISSCC) 69, 610–612',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=Ccyy7gIAAAAJ&sortby=pubdate&citation_for_view=Ccyy7gIAAAAJ:Tyk-4Ss8FVUC',
  },
  {
    year: '2026', venue: 'TVLSI', category: 'cim',
    title: 'Balancing FP8 Computation Accuracy and Efficiency on Digital CIM via Shift-Aware On-the-fly Aligned-Mantissa Bitwidth Prediction',
    authors: <>L Zhao, K Shao, <strong>Z Liao</strong>, X Huang, TKT Cheng, CY Tsui, Y Zou</>,
    details: 'IEEE Transactions on Very Large Scale Integration (VLSI) Systems, 2026',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=Ccyy7gIAAAAJ&sortby=pubdate&citation_for_view=Ccyy7gIAAAAJ:Y0pCki6q_DkC',
    note: { en: 'Third author', zh: '第三作者' },
  },
  {
    year: '2026', venue: 'DATE', category: 'cim',
    title: 'DS-CIM: Digital Stochastic Computing-In-Memory Featuring Accurate OR-Accumulation via Sample Region Remapping for Edge AI Models',
    authors: <>K Shao, L Zhao, J Yu, <strong>Z Liao</strong>, X Wang, Y Zou, TKT Cheng, CY Tsui</>,
    details: '2026 Design, Automation & Test in Europe Conference (DATE)',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=Ccyy7gIAAAAJ&sortby=pubdate&citation_for_view=Ccyy7gIAAAAJ:2osOgNQ5qMEC',
  },
  {
    year: '2026', venue: 'IET CDS', category: 'devices',
    title: 'Memristor-Based Logic Circuits: Gate Designs and Cycle-To-Cycle Reliability',
    authors: <>S Chandrasekaran, C Hua, S Gao, G Xue, J Wen, A Jabir, DG Georgiadou, <strong>Z Liao</strong>, et al.</>,
    details: 'IET Circuits, Devices & Systems 2026 (1), 9915488',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=Ccyy7gIAAAAJ&sortby=pubdate&citation_for_view=Ccyy7gIAAAAJ:YsMSGLbcyi4C',
  },
  {
    year: '2025', venue: 'ICM', category: 'neuromorphic',
    title: 'A Neuromorphic FPGA-Based Architecture for Energy-Efficient Visual Recognition',
    authors: <>T Li, <strong>Z Liao</strong>, C Zhang, J Yang, M Sawan</>,
    details: '2025 37th International Conference on Microelectronics (ICM), 1–6',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=Ccyy7gIAAAAJ&sortby=pubdate&citation_for_view=Ccyy7gIAAAAJ:d1gkVwhDpl0C',
  },
  {
    year: '2025', venue: 'A-SSCC', category: 'cim',
    title: 'Lemem: A 179.8 TFLOPS/W, 24.21 TFLOPS Learning-In-Memory Processor with Layer-Fused Forward/Backward Pipeline for Edge DNN/SNN Training/Inference',
    authors: <>F Tian, K Shao, J Zheng, Z Liu, H Wu, <strong>Z Liao</strong>, J He, X Guan, P Dong, et al.</>,
    details: '2025 IEEE Asian Solid-State Circuits Conference (A-SSCC), 94–96',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=Ccyy7gIAAAAJ&sortby=pubdate&citation_for_view=Ccyy7gIAAAAJ:UeHWp8X0CEIC',
  },
  {
    year: '2025', venue: 'MIND', category: 'neuromorphic',
    title: 'NeuroPlat: An FPGA-Based Neuromorphic Computing Platform with Optimized Toolchain for Efficient SNN Deployment',
    authors: <><strong>Z Liao</strong>, T Li, Z Shen, C Fang, J Yang, M Sawan</>,
    details: 'International Conference on Machine Intelligence and Nature-Inspired Computing (MIND), 2025',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=Ccyy7gIAAAAJ&sortby=pubdate&citation_for_view=Ccyy7gIAAAAJ:qjMakFHDy7sC',
    note: { en: 'First author · Best Poster', zh: '第一作者 · 最佳海报奖' },
  },
  {
    year: '2025', venue: 'BioCAS', category: 'cim',
    title: 'A Memory-Efficient Retrieval Architecture for RAG-Enabled Wearable Medical LLMs-Agents',
    authors: <><strong>Z Liao</strong>, K Shao, J Yu, L Zhao, TKT Cheng, CY Tsui, J Yang, M Sawan</>,
    details: '2025 IEEE Biomedical Circuits and Systems Conference (BioCAS)',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=Ccyy7gIAAAAJ&sortby=pubdate&citation_for_view=Ccyy7gIAAAAJ:u5HHmVD_uO8C',
    note: { en: 'First author', zh: '第一作者' },
  },
  {
    year: '2025', venue: 'ISLPED', category: 'cim',
    title: 'DIRC-RAG: Accelerating Edge RAG with Robust High-Density and High-Loading-Bandwidth Digital In-ReRAM Computation',
    authors: <>K Shao*, <strong>Z Liao*</strong>, J Yu, L Zhao, Q Li, X Huang, J He, F Tian, Y Zou, X Wang, et al.</>,
    details: '2025 IEEE/ACM International Symposium on Low Power Electronics and Design (ISLPED)',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=Ccyy7gIAAAAJ&sortby=pubdate&citation_for_view=Ccyy7gIAAAAJ:u-x6o8ySG0sC',
    note: { en: 'Co-first author', zh: '共同第一作者' },
  },
  {
    year: '2025', venue: 'APCCAS', category: 'neuromorphic',
    title: 'A Pipeline-Driven FPGA Accelerator with Memory-Scheduling for Neuromorphic Computing',
    authors: <><strong>Z Liao</strong>, T Li, Z Shen, C Fang, J Yang, M Sawan</>,
    details: '2025 IEEE Asia Pacific Conference on Circuits and Systems (APCCAS), 1–5',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=Ccyy7gIAAAAJ&sortby=pubdate&citation_for_view=Ccyy7gIAAAAJ:zYLM7Y9cAGgC',
    note: { en: 'First author · Oral', zh: '第一作者 · 口头报告' },
  },
]

const experiences = [
  {
    period: '2025.03 — 2026.08',
    role: { en: 'Research Assistant · CenBrain Lab', zh: '科研助理 · CenBrain 实验室' },
    place: { en: 'Westlake University', zh: '西湖大学' },
    text: {
      en: 'Developed an algorithm-to-silicon neuromorphic stack, leading Spiking-YOLO FPGA deployment, sparse/dense adaptive compute, RingBus inter-core accumulation and hardware–software co-design.',
      zh: '构建算法到芯片的神经形态计算全栈，主导 Spiking-YOLO 的 FPGA 部署、稀疏/稠密自适应计算、RingBus 核间累加与软硬件协同设计。',
    },
  },
  {
    period: '2024.09 — 2025.03',
    role: { en: 'Researcher · Prof. Mohamad Sawan’s Team', zh: '科研实习 · Mohamad Sawan 院士团队' },
    place: { en: 'Institute of Advanced Technology, Westlake University', zh: '西湖大学光电研究院' },
    text: {
      en: 'Worked on neuromorphic deployment for intelligent vehicles, including CPU control-flow design, C++-to-ELF compilation flow and a RISC-V-compatible neuromorphic computing framework.',
      zh: '研究面向智能车辆的神经形态部署，包括 CPU 控制流、C++ 到 ELF 的编译流程及兼容 RISC-V 的神经形态计算框架。',
    },
  },
]

const education = [
  {
    period: '2026.08 — Present',
    degree: { en: 'Ph.D. in Electronic Science and Technology', zh: '博士研究生 · 电子科学与技术' },
    school: { en: 'Westlake University', zh: '西湖大学' },
    detail: { en: 'Doctoral research in energy-efficient intelligent computing systems', zh: '研究高能效智能计算系统' },
  },
  {
    period: '2023.09 — 2024.11',
    degree: { en: 'M.Sc. in Electronic Engineering', zh: '硕士 · 电子工程' },
    school: { en: 'University of Southampton', zh: '南安普顿大学' },
    detail: { en: 'First Class Honours / Distinction', zh: '一等荣誉学位 / Distinction' },
  },
  {
    period: '2019.09 — 2023.06',
    degree: { en: 'B.Eng. in Microelectronics Science and Engineering', zh: '工学学士 · 微电子科学与工程' },
    school: { en: 'South China University of Technology', zh: '华南理工大学' },
    detail: { en: 'GPA 3.29 / 4.0', zh: 'GPA 3.29 / 4.0' },
  },
]

const ui = {
  nav: [
    { id: 'research', en: 'Research', zh: '研究方向' },
    { id: 'publications', en: 'Publications', zh: '学术论文' },
    { id: 'experience', en: 'Experience', zh: '科研经历' },
    { id: 'education', en: 'Education', zh: '教育背景' },
  ],
  role: { en: 'Ph.D. Researcher · Westlake University', zh: '博士研究生 · 西湖大学' },
  intro: {
    en: 'I design energy-efficient computing systems for edge intelligence — connecting neural algorithms, architectures, circuits and emerging devices.',
    zh: '我面向边缘智能研究高能效计算系统，连接神经算法、体系架构、芯片电路与新型器件。',
  },
  about: {
    en: 'My research sits at the intersection of computing-in-memory, neuromorphic computing and neural interfaces. I enjoy turning workload insight into working hardware: from sparse and quantized algorithms to dataflow, memory organization and chip implementation.',
    zh: '我的研究位于存内计算、神经形态计算与脑机接口的交叉地带。我关注如何将工作负载特征转化为可实现的硬件：从稀疏与量化算法，到数据流、存储组织和芯片实现。',
  },
}

const socialLinks = [
  {
    label: 'Google Scholar',
    detail: { en: 'Publications & citations', zh: '论文与引用' },
    url: 'https://scholar.google.com/citations?user=Ccyy7gIAAAAJ&hl=zh-CN',
    icon: BookOpen,
  },
  {
    label: 'GitHub',
    detail: { en: '@LiaoZhipeng8469', zh: '@LiaoZhipeng8469' },
    url: 'https://github.com/LiaoZhipeng8469',
    icon: Github,
  },
  {
    label: 'ORCID',
    detail: { en: '0009-0003-2446-7983', zh: '0009-0003-2446-7983' },
    url: 'https://orcid.org/0009-0003-2446-7983',
    icon: Fingerprint,
  },
  {
    label: 'LinkedIn',
    detail: { en: 'Professional network', zh: '职业社交网络' },
    url: 'https://www.linkedin.com/in/志鹏-廖-5a677629',
    icon: Linkedin,
  },
]

function App() {
  const [language, setLanguage] = useState<Language>('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState<Filter>('all')
  const t = (copy: Copy) => copy[language]

  const filteredPublications = useMemo(
    () => publications.filter((paper) => filter === 'all' || paper.category === filter),
    [filter],
  )

  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN'
  }, [language])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const filters: { value: Filter; label: Copy }[] = [
    { value: 'all', label: { en: 'All publications', zh: '全部论文' } },
    { value: 'cim', label: { en: 'Computing-in-Memory', zh: '存内计算' } },
    { value: 'neuromorphic', label: { en: 'Neuromorphic', zh: '神经形态' } },
    { value: 'neural', label: { en: 'Neural Interfaces', zh: '脑机接口' } },
    { value: 'devices', label: { en: 'Devices & Logic', zh: '器件与逻辑' } },
  ]

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">{language === 'en' ? 'Skip to content' : '跳转至正文'}</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Zhipeng Liao home">
          <span className="brand-mark">ZL</span>
          <span className="brand-name">Zhipeng Liao<span>廖志鹏</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {ui.nav.map((item) => <a key={item.id} href={`#${item.id}`}>{t(item)}</a>)}
        </nav>
        <div className="header-actions">
          <button
            className="language-toggle"
            type="button"
            onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
            aria-label={language === 'en' ? '切换为中文' : 'Switch to English'}
          >
            <span className={language === 'en' ? 'active' : ''}>EN</span>
            <i />
            <span className={language === 'zh' ? 'active' : ''}>中</span>
          </button>
          <a className="header-contact" href="mailto:zpliao8469@outlook.com">{language === 'en' ? 'Get in touch' : '联系我'}<ArrowUpRight size={15} /></a>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label="Toggle navigation">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {menuOpen && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
            {ui.nav.map((item) => <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>{t(item)}<ArrowUpRight size={16} /></a>)}
            <a href="mailto:zpliao8469@outlook.com">{language === 'en' ? 'Contact' : '联系方式'}<Mail size={16} /></a>
          </nav>
        )}
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-grid-pattern" aria-hidden="true" />
          <div className="hero-copy">
            <div className="eyebrow"><span />{t(ui.role)}</div>
            <h1>Zhipeng<br /><em>Liao.</em></h1>
            <p className="hero-intro">{t(ui.intro)}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#research">{language === 'en' ? 'Explore my research' : '了解我的研究'}<ArrowDown size={17} /></a>
              <a className="button button-secondary" href="./files/resume.pdf" download="Zhipeng_Liao_CV.pdf"><Download size={16} />{language === 'en' ? 'Download CV' : '下载简历'}</a>
            </div>
            <div className="social-links" aria-label="Academic and professional profiles">
              {socialLinks.map((item) => {
                const Icon = item.icon
                return <a key={item.label} href={item.url} target="_blank" rel="noreferrer"><Icon size={15} /><span>{item.label}</span></a>
              })}
            </div>
            <div className="hero-stack" aria-label="Research stack">
              {['ALGORITHM', 'ARCHITECTURE', 'CIRCUIT', 'DEVICE'].map((item, index) => (
                <span key={item}>{item}{index < 3 && <i>→</i>}</span>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="portrait-frame">
              <div className="portrait-index">RESEARCH / 2026</div>
              <img src="./images/profile.jpg" alt="Portrait of Zhipeng Liao" />
              <div className="portrait-caption"><span>{language === 'en' ? 'Based in Hangzhou, China' : '中国 · 杭州'}</span><span>30.26° N<br />120.13° E</span></div>
            </div>
            <div className="hero-seal" aria-hidden="true"><Cpu size={25} /><span>ALGORITHM<br />TO SILICON</span></div>
          </div>
        </section>

        <section className="about section-pad">
          <div className="section-label"><span>00</span>{language === 'en' ? 'About' : '关于我'}</div>
          <div className="about-content">
            <p>{t(ui.about)}</p>
            <div className="about-meta">
              <span><Microscope size={17} />{language === 'en' ? 'Edge intelligence' : '边缘智能'}</span>
              <span><CircuitBoard size={17} />{language === 'en' ? 'Hardware–software co-design' : '软硬件协同设计'}</span>
            </div>
          </div>
        </section>

        <section className="research section-pad" id="research">
          <div className="section-heading">
            <div><div className="section-label"><span>01</span>{language === 'en' ? 'Research' : '研究方向'}</div><h2>{language === 'en' ? 'From workload insight\nto efficient silicon.' : '从工作负载洞察，\n走向高能效芯片。'}</h2></div>
            <p>{language === 'en' ? 'Four connected research threads, one goal: intelligent computation with less data movement and lower energy.' : '四条相互连接的研究主线，一个共同目标：以更少的搬数与更低的能耗实现智能计算。'}</p>
          </div>
          <div className="research-grid">
            {research.map((item) => {
              const Icon = item.icon
              return (
                <article className="research-card" key={item.number}>
                  <div className="research-card-top"><span>{item.number}</span><Icon size={25} strokeWidth={1.5} /></div>
                  <h3>{t(item.title)}</h3>
                  <p className="research-subtitle">{t(item.subtitle)}</p>
                  <p className="research-description">{t(item.description)}</p>
                  <div className="tag-list">{item.tags.map((tag) => <span key={tag.en}>{t(tag)}</span>)}</div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="publications section-pad" id="publications">
          <div className="section-heading publication-heading">
            <div><div className="section-label light"><span>02</span>{language === 'en' ? 'Publications' : '论文发表'}</div><h2>{language === 'en' ? 'Research, published.' : '研究，沉淀为论文。'}</h2></div>
            <div className="publication-heading-meta">
              <p>{language === 'en' ? `${publications.length} publications · * equal contribution · bold indicates my name.` : `${publications.length} 篇论文 · * 表示共同第一作者 · 粗体为本人姓名。`}</p>
              <a href="https://scholar.google.com/citations?hl=zh-CN&user=Ccyy7gIAAAAJ&view_op=list_works&sortby=pubdate" target="_blank" rel="noreferrer">Google Scholar<ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="publication-filters" role="group" aria-label="Filter publications">
            {filters.map((item) => <button key={item.value} type="button" className={filter === item.value ? 'active' : ''} onClick={() => setFilter(item.value)} aria-pressed={filter === item.value}>{t(item.label)}</button>)}
          </div>
          <div className="publication-list" aria-live="polite">
            {filteredPublications.map((paper) => (
              <article className="publication-item" key={paper.title}>
                <div className="publication-date"><span>{paper.year}</span><b>{paper.venue}</b></div>
                <div className="publication-body">
                  <h3>{paper.link ? <a href={paper.link} target="_blank" rel="noreferrer">{paper.title}<ArrowUpRight size={15} /></a> : paper.title}</h3>
                  <p>{paper.authors}</p>
                  <p className="publication-details">{paper.details}</p>
                </div>
                <div className="publication-note">{paper.note ? t(paper.note) : paper.category === 'cim' ? 'CIM' : paper.category === 'neural' ? 'BCI' : paper.category === 'devices' ? 'MEMRISTOR' : 'SNN'}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience section-pad" id="experience">
          <div className="section-heading">
            <div><div className="section-label"><span>03</span>{language === 'en' ? 'Research experience' : '科研经历'}</div><h2>{language === 'en' ? 'Building systems\nthat work.' : '构建真正运行的\n计算系统。'}</h2></div>
            <p>{language === 'en' ? 'Hands-on work across model deployment, FPGA prototyping, compiler flow and chip architecture.' : '实践覆盖模型部署、FPGA 原型、编译流程与芯片体系架构。'}</p>
          </div>
          <div className="timeline">
            {experiences.map((item) => (
              <article className="timeline-item" key={item.period}>
                <div className="timeline-period">{item.period}</div>
                <div><h3>{t(item.role)}</h3><h4>{t(item.place)}</h4><p>{t(item.text)}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="education section-pad" id="education">
          <div className="education-grid">
            <div>
              <div className="section-label"><span>04</span>{language === 'en' ? 'Education' : '教育背景'}</div>
              <h2>{language === 'en' ? 'Learning across\nlayers.' : '跨越层级的\n学习与实践。'}</h2>
              <GraduationCap className="education-icon" size={74} strokeWidth={1} />
            </div>
            <div className="education-list">
              {education.map((item) => (
                <article key={item.period}><span>{item.period}</span><h3>{t(item.degree)}</h3><h4>{t(item.school)}</h4><p>{t(item.detail)}</p></article>
              ))}
            </div>
          </div>
          <div className="awards">
            <div className="awards-title"><Award size={20} /><span>{language === 'en' ? 'Selected honors' : '部分荣誉'}</span></div>
            <ul>
              <li>{language === 'en' ? 'National Third Prize · China IC Innovation & Entrepreneurship Competition' : '中国集成电路创新创业大赛 · 全国总决赛三等奖'}</li>
              <li>{language === 'en' ? 'Best Poster Award · MIND 2025' : 'MIND 2025 · 最佳海报奖'}</li>
              <li>{language === 'en' ? 'National Third Prize · FPGA Innovation Design Competition' : '全国大学生嵌入式芯片与系统设计竞赛 FPGA 创新设计大赛 · 全国总决赛三等奖'}</li>
            </ul>
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="contact-kicker"><span />{language === 'en' ? 'Let’s build what comes next' : '一起探索下一代计算系统'}</div>
          <h2>{language === 'en' ? 'Interested in working\ntogether?' : '期待与你的\n交流与合作。'}</h2>
          <p>{language === 'en' ? 'I’m always happy to discuss efficient AI hardware, neuromorphic systems and neural interfaces.' : '欢迎与我交流高能效 AI 硬件、神经形态系统与脑机接口。'}</p>
          <a className="contact-email" href="mailto:zpliao8469@outlook.com">zpliao8469@outlook.com<ArrowUpRight size={30} /></a>
          <div className="contact-links">
            {socialLinks.map((item) => {
              const Icon = item.icon
              return (
                <a key={item.label} href={item.url} target="_blank" rel="noreferrer">
                  <Icon size={20} strokeWidth={1.6} />
                  <span><strong>{item.label}</strong><small>{t(item.detail)}</small></span>
                  <ArrowUpRight size={15} />
                </a>
              )
            })}
          </div>
        </section>
      </main>

      <footer>
        <div className="brand footer-brand"><span className="brand-mark">ZL</span><span className="brand-name">Zhipeng Liao<span>廖志鹏</span></span></div>
        <p>{language === 'en' ? 'Algorithm → Architecture → Circuit → Device' : '算法 → 架构 → 电路 → 器件'}</p>
        <a href="#top">{language === 'en' ? 'Back to top' : '返回顶部'}<ArrowUpRight size={14} /></a>
      </footer>
    </div>
  )
}

export default App
