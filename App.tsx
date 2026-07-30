
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Layout, 
  RefreshCcw, 
  ChevronRight, 
  Globe, 
  Palette, 
  Smartphone, 
  Navigation,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Zap,
  BookOpen,
  Layers,
  Rocket,
  Quote,
  ArrowRight,
  Image as ImageIcon,
  Star,
  Monitor,
  Cpu,
  Trophy,
  Activity,
  Moon,
  Sun,
  Info
} from 'lucide-react';
import { generateWebsitePlan } from './geminiService';
import { AppStatus } from './types';
import Logo from './Logo';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loadingMessage, setLoadingMessage] = useState('Initializing FBX Core...');
  
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('fbx-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('fbx-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const loadingMessages = [
    "Analyzing brand DNA...",
    "Defining strategic positioning...",
    "Architecting neural layouts...",
    "Injecting high-conversion logic...",
    "Optimizing aesthetic harmony...",
    "Drafting premium components...",
    "Finalizing the elite blueprint...",
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setStatus(AppStatus.GENERATING);
    setError('');
    
    let messageIndex = 0;
    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setLoadingMessage(loadingMessages[messageIndex]);
    }, 2500);

    try {
      const plan = await generateWebsitePlan(prompt);
      setResult(plan);
      setStatus(AppStatus.RESULT);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      setStatus(AppStatus.ERROR);
    } finally {
      clearInterval(interval);
    }
  };

  const handleReset = () => {
    setStatus(AppStatus.IDLE);
    setPrompt('');
    setResult('');
    setError('');
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-sky-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-morphism border-b border-sky-100/50 dark:border-white/5 px-6 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="cursor-pointer group" onClick={handleReset}>
            <Logo size={42} className="group-hover:scale-105 transition-transform duration-300" />
          </div>
          
          <div className="flex items-center space-x-4 md:space-x-8">
            <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-slate-600 dark:text-slate-400">
              <span className="hover:text-sky-600 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-2"><Cpu className="w-4 h-4" /> Neural Engine</span>
              <span className="hover:text-sky-600 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-2"><Activity className="w-4 h-4" /> Strategy</span>
            </div>
            
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-white transition-all border border-sky-100 dark:border-white/5 shadow-sm dark:shadow-none"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <span className="hidden sm:inline-block bg-sky-600/5 dark:bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full text-[10px] font-black text-sky-600 dark:text-sky-400 uppercase tracking-widest shadow-inner">ELITE v5.0</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">
        {status === AppStatus.IDLE && (
          <div className="flex flex-col items-center space-y-24 mt-12 animate-in fade-in slide-in-from-top-8 duration-1000">
            {/* Hero Section */}
            <div className="text-center space-y-10 max-w-5xl">
              <div className="inline-flex items-center space-x-2 bg-sky-600/5 dark:bg-white/5 px-5 py-2.5 rounded-full text-sky-600 dark:text-sky-400 text-xs font-black uppercase tracking-[0.2em] border border-sky-600/10 dark:border-white/10 shadow-xl backdrop-blur-md">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>#1 Ranked AI Product Designer</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-black text-slate-900 dark:text-white leading-[0.95] tracking-tighter">
                Evolve Your <br />
                <span className="gradient-text">Digital Legacy.</span>
              </h1>
              <p className="text-xl md:text-3xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto">
                FBX transforms vision into high-conversion digital architectures. Premium strategy meets elite design logic.
              </p>

              <form onSubmit={handleGenerate} className="w-full max-w-4xl mx-auto relative mt-16">
                <div className="bg-white/90 dark:bg-slate-800/40 p-3 rounded-[3rem] shadow-2xl border border-sky-100 dark:border-white/10 transition-all hover:border-sky-500/30 focus-within:ring-4 focus-within:ring-sky-500/10 backdrop-blur-xl">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your vision... (e.g. 'A futuristic sustainable energy hub for Web3 innovators')"
                    className="w-full h-48 p-8 rounded-[2.5rem] bg-transparent focus:ring-0 text-2xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none outline-none font-semibold leading-snug"
                  />
                  <div className="flex items-center justify-between px-8 pb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                      <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">FBX Blueprint Core Online</p>
                    </div>
                    <button
                      type="submit"
                      disabled={!prompt.trim()}
                      className="bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 disabled:from-slate-100 disabled:to-slate-100 dark:disabled:from-slate-800 dark:disabled:to-slate-800 disabled:text-slate-400 disabled:cursor-not-allowed text-white px-12 py-5 rounded-[1.5rem] shadow-2xl shadow-sky-500/30 transition-all transform active:scale-95 flex items-center space-x-4 group"
                    >
                      <span className="font-black text-base uppercase tracking-widest">Architect Site</span>
                      <ChevronRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Template Showcase */}
            <div className="w-full space-y-16">
              <div className="text-center space-y-4">
                <h2 className="text-xs font-black text-sky-600 dark:text-sky-400 uppercase tracking-[0.4em]">Proprietary Engine</h2>
                <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">The Library of Excellence</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {[
                  { icon: <Monitor />, title: "Titan Hero", desc: "Monolithic headlines & dual-path CTAs", color: "from-sky-500 to-blue-500", glow: "shadow-sky-500/20" },
                  { icon: <Layers />, title: "Vortex Grids", desc: "Modular value mapping for modern SaaS", color: "from-cyan-500 to-sky-500", glow: "shadow-cyan-500/20" },
                  { icon: <Star />, title: "Trust Matrix", desc: "AI-structured social proof clusters", color: "from-sky-400 to-indigo-500", glow: "shadow-sky-500/20" },
                  { icon: <Zap />, title: "Conversion Flow", desc: "High-velocity banners for sales scaling", color: "from-sky-500 to-teal-500", glow: "shadow-sky-500/20" }
                ].map((template, i) => (
                  <div key={i} className="vibrant-card p-10 rounded-[2.5rem] group relative overflow-hidden shadow-sm hover:shadow-xl">
                    <div className={`w-16 h-16 bg-gradient-to-br ${template.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-xl ${template.glow}`}>
                      {React.cloneElement(template.icon as React.ReactElement<any>, { className: "w-8 h-8 text-white" })}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">{template.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{template.desc}</p>
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-sky-500/5 dark:bg-white/5 rounded-full blur-2xl group-hover:bg-sky-500/10 dark:group-hover:bg-white/10 transition-colors"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {status === AppStatus.GENERATING && (
          <div className="flex flex-col items-center justify-center min-h-[65vh] space-y-16">
            <div className="relative group">
              <div className="w-48 h-48 border-[2px] border-sky-100 dark:border-white/5 border-t-sky-500 rounded-full animate-spin duration-700 shadow-sm"></div>
              <div className="absolute inset-4 border-[2px] border-sky-50 dark:border-white/5 border-b-indigo-500 rounded-full animate-spin-reverse duration-1000"></div>
              <Sparkles className="absolute inset-0 m-auto w-16 h-16 text-sky-600 dark:text-sky-400 animate-pulse drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]" />
            </div>
            <div className="text-center space-y-6">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{loadingMessage}</h2>
              <div className="flex items-center justify-center space-x-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full bg-sky-500/50 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
                ))}
              </div>
              <p className="text-xl text-sky-500/60 dark:text-slate-500 font-bold uppercase tracking-[0.2em]">Neural Architecting Active</p>
            </div>
          </div>
        )}

        {status === AppStatus.ERROR && (
          <div className="max-w-2xl mx-auto glass-morphism border-red-500/20 p-16 rounded-[4rem] text-center space-y-10 shadow-2xl shadow-red-500/5 animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
              <AlertCircle className="w-12 h-12" />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Core Interface Offline</h2>
              <p className="text-slate-600 dark:text-slate-400 text-xl font-medium">{error}</p>
            </div>
            <button
              onClick={() => setStatus(AppStatus.IDLE)}
              className="bg-sky-600 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-sky-700 transition-all transform active:scale-95 shadow-xl"
            >
              Reinitialize FBX
            </button>
          </div>
        )}

        {status === AppStatus.RESULT && (
          <div className="animate-in slide-in-from-bottom-16 duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-8 md:space-y-0">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sky-600 dark:text-sky-400 text-xs font-black uppercase tracking-[0.3em]">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Blueprint Neural-Certified</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">The Strategy Blueprint.</h2>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center justify-center space-x-3 glass-morphism hover:bg-slate-50 dark:hover:bg-white/10 text-slate-900 dark:text-white px-10 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all shadow-xl transform active:scale-95 border-sky-100 dark:border-white/10"
              >
                <RefreshCcw className="w-5 h-5" />
                <span>New Iteration</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Parsed Sections */}
              <div className="lg:col-span-8 space-y-16">
                {parseResult(result).map((section, idx) => (
                  <div key={idx} className="glass-morphism rounded-[3rem] overflow-hidden group shadow-2xl shadow-sky-500/5 border-sky-100 dark:border-white/5 hover:border-sky-500/20 transition-all">
                    <div className="bg-sky-50/30 dark:bg-white/5 border-b border-sky-100 dark:border-white/5 px-12 py-8 flex items-center justify-between">
                      <div className="flex items-center space-x-5">
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-sky-100 dark:border-white/10 group-hover:scale-110 transition-transform">
                          {getIconForSection(section.title)}
                        </div>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-[0.3em]">{section.title}</h3>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                      </div>
                    </div>
                    <div className="p-12">
                      <div className="prose dark:prose-invert prose-slate max-w-none">
                        {renderSectionContent(section.title, section.content)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: AI Insights */}
              <div className="lg:col-span-4 space-y-10">
                <div className="sticky top-32 space-y-10">
                  <div className="bg-gradient-to-br from-sky-50 via-sky-100 to-white dark:from-sky-900/40 dark:via-indigo-900/40 dark:to-slate-900/40 rounded-[3rem] p-12 border border-sky-100 dark:border-white/10 shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10 space-y-8">
                      <div className="p-4 bg-sky-500/10 dark:bg-sky-500/20 w-fit rounded-2xl shadow-inner border border-sky-500/20 dark:border-sky-500/30">
                        <Activity className="w-8 h-8 text-sky-600 dark:text-sky-400" />
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                        Neural Insights <br />
                        <span className="text-sky-600 dark:text-sky-400">Analysis Active</span>
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-lg font-medium leading-relaxed">
                        FBX has calculated an optimal user-journey matrix based on your vision prompt.
                      </p>
                      <div className="h-px bg-sky-100 dark:bg-white/10 w-full"></div>
                      <div className="space-y-6">
                        {[
                          { label: "High Impact Hero", status: "Validated", color: "text-emerald-600 dark:text-emerald-400" },
                          { label: "Neural Card Grid", status: "Optimal", color: "text-sky-600 dark:text-sky-400" },
                          { label: "Trust Architecture", status: "Secure", color: "text-amber-600 dark:text-amber-400" }
                        ].map((insight, i) => (
                          <div key={i} className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                            <span className="text-slate-500">{insight.label}</span>
                            <span className={insight.color}>{insight.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-sky-500/5 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000"></div>
                  </div>

                  <div className="glass-morphism rounded-[3rem] p-12 shadow-2xl border-sky-100 dark:border-white/5">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mb-10 flex items-center tracking-tight uppercase">
                      <Rocket className="w-6 h-6 mr-4 text-sky-600" />
                      Launch Phase
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: "Copy Strategy Data", icon: <FileText /> },
                        { label: "Export Elite PDF", icon: <BookOpen /> },
                        { label: "Sync with Cloud Hub", icon: <Globe /> }
                      ].map((action, i) => (
                        <button key={i} className="w-full text-left p-6 rounded-2xl bg-white dark:bg-white/5 hover:bg-sky-50 dark:hover:bg-sky-500/10 hover:border-sky-200 dark:hover:border-sky-500/30 border border-sky-50 dark:border-white/5 transition-all font-black text-slate-600 hover:text-sky-700 dark:hover:text-white flex justify-between items-center group shadow-sm dark:shadow-none">
                          <div className="flex items-center space-x-4">
                            <span className="group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{React.cloneElement(action.icon as React.ReactElement<any>, { className: "w-5 h-5" })}</span>
                            <span className="uppercase tracking-[0.1em] text-xs">{action.label}</span>
                          </div>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform opacity-0 group-hover:opacity-100 text-sky-600 dark:text-sky-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-sky-100 dark:border-white/5 px-8 py-20 bg-sky-50/50 dark:bg-slate-900/50 mt-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-12 md:space-y-0">
          <div className="space-y-6">
            <Logo size={32} />
            <p className="text-slate-600 dark:text-slate-500 text-base font-medium max-w-sm leading-relaxed">
              Pioneering the intersection of neural intelligence and premium web architecture. Build the future, faster.
            </p>
          </div>
          <div className="flex flex-wrap gap-16">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-sky-600 dark:text-sky-400 uppercase tracking-[0.4em]">Protocol</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-500">
                <li className="hover:text-sky-600 dark:hover:text-white transition-colors cursor-pointer">Architecture</li>
                <li className="hover:text-sky-600 dark:hover:text-white transition-colors cursor-pointer">Neural Engine</li>
                <li className="hover:text-sky-600 dark:hover:text-white transition-colors cursor-pointer">Security</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-sky-600 dark:text-sky-400 uppercase tracking-[0.4em]">Company</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-500">
                <li className="hover:text-sky-600 dark:hover:text-white transition-colors cursor-pointer">Privacy</li>
                <li className="hover:text-sky-600 dark:hover:text-white transition-colors cursor-pointer">Elite Terms</li>
                <li className="hover:text-sky-600 dark:hover:text-white transition-colors cursor-pointer">Legal</li>
              </ul>
            </div>
          </div>
          <div className="bg-white dark:bg-white/5 border border-sky-100 dark:border-white/10 p-6 rounded-[2rem] flex items-center space-x-5 shadow-xl shadow-sky-100/50 dark:shadow-none">
             <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400">
               <ShieldCheck className="w-6 h-6" />
             </div>
             <div>
               <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">End-to-End Encryption</p>
               <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Enterprise Guard Ready</p>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Component Rendering Helpers
const HeroComponent = ({ data }: { data: any }) => (
  <div className="bg-white dark:bg-slate-950 rounded-[4rem] p-16 md:p-24 mb-12 relative overflow-hidden text-center md:text-left border border-sky-100 dark:border-white/10 shadow-2xl group transition-all duration-300">
    <div className="relative z-10 max-w-3xl">
      <h4 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter leading-[0.95]">
        {data.Title || data.title || 'Elite Core Concept'}
      </h4>
      <p className="text-2xl text-slate-600 dark:text-slate-400 mb-12 font-medium leading-relaxed">
        {data.Subtitle || data.subtitle || 'A visionary headline that defines the primary neural value of the brand.'}
      </p>
      <div className="flex flex-col md:flex-row gap-6">
        <button className="bg-sky-600 hover:bg-sky-700 text-white px-12 py-6 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center transition-all shadow-2xl shadow-sky-600/30 transform active:scale-95 group/btn">
          {data['Primary Action'] || data.primaryAction || 'Deploy Core'}
          <ArrowRight className="w-5 h-5 ml-4 group-hover/btn:translate-x-2 transition-transform" />
        </button>
        <button className="glass-morphism hover:bg-sky-50 dark:hover:bg-white/10 text-slate-900 dark:text-white border-sky-100 dark:border-white/10 px-12 py-6 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] transition-all transform active:scale-95 shadow-sm">
          {data['Secondary Action'] || data.secondaryAction || 'Explore Matrix'}
        </button>
      </div>
    </div>
    
    <div className="hidden lg:flex absolute right-24 top-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-sky-500/5 dark:bg-sky-500/5 border border-sky-100 dark:border-white/5 rounded-[4rem] items-center justify-center backdrop-blur-3xl animate-in zoom-in duration-1000 delay-500 rotate-3 group-hover:rotate-6 transition-transform shadow-inner">
      <div className="text-center p-12">
        <div className="bg-sky-500/10 dark:bg-sky-500/20 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl border border-sky-500/30">
          <ImageIcon className="w-12 h-12 text-sky-600 dark:text-sky-400" />
        </div>
        <p className="text-[10px] uppercase font-black tracking-[0.4em] text-sky-600 dark:text-sky-400/80 mb-4">Neural Asset Mapping</p>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-500 leading-relaxed max-w-xs">
          {data['Visual Concept'] || data.visualConcept || 'Precision-crafted visual identity designed to resonate with target personas.'}
        </p>
      </div>
    </div>

    {/* Dynamic Backgrounds */}
    <div className="absolute top-0 right-0 -mr-48 -mt-48 w-[50rem] h-[50rem] bg-sky-600/10 rounded-full blur-[160px] animate-pulse"></div>
    <div className="absolute bottom-0 left-0 -ml-48 -mb-48 w-[40rem] h-[40rem] bg-cyan-500/5 dark:bg-indigo-900/20 rounded-full blur-[140px] animate-pulse"></div>
  </div>
);

const FeaturesGridComponent = ({ data }: { data: any }) => {
  const features = Object.entries(data)
    .filter(([key]) => key.toLowerCase().startsWith('feature'))
    .map(([_, val]) => {
      const parts = (val as string).split('|');
      return { 
        icon: parts[0]?.trim(), 
        title: parts[1]?.trim(), 
        description: parts[2]?.trim(),
        howItWorks: parts[3]?.trim()
      };
    });

  return (
    <div className="py-12">
      {data['Section Title'] && <h4 className="text-4xl font-black mb-16 text-slate-900 dark:text-white tracking-tighter">{data['Section Title']}</h4>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((f, i) => (
          <div key={i} className="bg-white dark:bg-slate-900/30 border border-sky-50 dark:border-white/5 p-12 rounded-[3.5rem] hover:bg-sky-50/50 dark:hover:bg-slate-800/40 hover:border-sky-500/30 hover:translate-y-[-8px] transition-all duration-500 group relative overflow-hidden shadow-sm hover:shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-br from-sky-500/10 to-indigo-500/10 dark:from-sky-500/10 dark:to-indigo-500/10 text-sky-600 dark:text-sky-400 rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-inner border border-sky-100 dark:border-white/5">
              <Zap className="w-10 h-10" />
            </div>
            <h5 className="text-2xl font-black text-slate-900 dark:text-white mb-5 tracking-tight">{f.title || 'Elite Feature'}</h5>
            <p className="text-lg text-slate-600 dark:text-slate-500 font-medium leading-relaxed mb-6">{f.description || 'Precision feature mapping derived from strategic neural analysis.'}</p>
            
            {f.howItWorks && (
              <div className="pt-6 border-t border-sky-100 dark:border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-widest">
                  <Info className="w-3.5 h-3.5" />
                  <span>How it works</span>
                </div>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-500 leading-relaxed italic">
                  {f.howItWorks}
                </p>
              </div>
            )}
            
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TestimonialsComponent = ({ data }: { data: any }) => {
  const items = Object.entries(data)
    .filter(([key]) => key.toLowerCase().startsWith('quote'))
    .map(([_, val]) => {
      const parts = (val as string).split('|');
      return { text: parts[0]?.trim(), name: parts[1]?.trim(), role: parts[2]?.trim() };
    });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-12">
      {items.map((t, i) => (
        <div key={i} className="bg-white/90 dark:bg-slate-800/20 p-16 rounded-[4rem] border border-sky-100 dark:border-white/5 relative group overflow-hidden hover:bg-white dark:hover:bg-slate-800/30 transition-all shadow-xl shadow-sky-100/20 dark:shadow-none">
          <Quote className="absolute top-12 right-12 w-24 h-24 text-sky-900/5 dark:text-white/5 group-hover:scale-110 transition-transform duration-700" />
          <p className="text-2xl text-slate-700 dark:text-slate-300 italic font-medium mb-12 leading-relaxed relative z-10">"{t.text}"</p>
          <div className="flex items-center space-x-6 relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-600 to-indigo-700 rounded-[1.2rem] flex items-center justify-center text-white font-black text-2xl shadow-xl">
              {t.name?.[0] || 'U'}
            </div>
            <div>
              <p className="font-black text-slate-900 dark:text-white text-base uppercase tracking-[0.2em]">{t.name || 'Visionary Client'}</p>
              <p className="text-xs font-black text-sky-600 dark:text-sky-400 uppercase tracking-[0.3em] mt-2 opacity-80">{t.role || 'CEO / Founder'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const CTABannerComponent = ({ data }: { data: any }) => (
  <div className="bg-gradient-to-br from-sky-500 via-sky-600 to-indigo-700 rounded-[4rem] p-20 md:p-32 my-20 text-center text-white shadow-[0_50px_100px_rgba(14,165,233,0.2)] relative overflow-hidden group">
    <div className="relative z-10 max-w-4xl mx-auto space-y-10">
      <h4 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95]">{data.Headline || data.headline || 'Claim the Future.'}</h4>
      <p className="text-sky-100 font-medium text-2xl opacity-80 leading-relaxed max-w-2xl mx-auto">{data.Subheadline || data.subheadline || 'Join the elite cohort of brands architecting their legacy with FBX.'}</p>
      <button className="bg-white text-sky-700 px-16 py-7 rounded-[2rem] font-black text-base uppercase tracking-[0.3em] shadow-[0_20px_60px_rgba(255,255,255,0.3)] transform active:scale-95 transition-all hover:scale-105 hover:bg-slate-100">
        {data['Button Text'] || data.buttonText || 'Deploy Now'}
      </button>
    </div>
    <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-48 w-[40rem] h-[40rem] bg-white/10 rounded-full blur-[140px] group-hover:scale-110 transition-transform duration-1000"></div>
    <div className="absolute bottom-0 right-0 -mr-48 -mb-48 w-[40rem] h-[40rem] bg-black/20 rounded-full blur-[140px] group-hover:-translate-x-32 transition-transform duration-1000"></div>
  </div>
);

const ContentBlockComponent = ({ data }: { data: any }) => (
  <div className="py-20 max-w-5xl relative">
    <div className="absolute left-0 top-16 bottom-16 w-2 bg-gradient-to-b from-sky-500 via-sky-400 to-indigo-500 rounded-full shadow-[0_0_20px_rgba(14,165,233,0.5)]"></div>
    <div className="pl-20">
      <h4 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter leading-tight">
        {data.Heading || data.heading || 'Our Genesis'}
      </h4>
      <div className="text-2xl text-slate-700 dark:text-slate-400 font-medium leading-relaxed prose dark:prose-invert prose-2xl">
        {data.Body || data.body || 'Deep strategic narrative architected to establish authoritative brand legacy and mission clarity.'}
      </div>
    </div>
  </div>
);

// Final Section Rendering
const renderSectionContent = (title: string, content: string) => {
  const isPageWise = title.toLowerCase().includes('page-wise');
  const isFeaturesStrategy = title.toLowerCase().includes('strategy');

  if (isPageWise) {
    const componentBlocks = content.split(/\[COMPONENT: /);
    return (
      <div className="space-y-24">
        {componentBlocks.map((block, i) => {
          if (!block.trim()) return null;
          const [typeAndRest, ...contentLines] = block.split(']');
          const type = typeAndRest.trim();
          const rest = contentLines.join(']').trim();
          
          const lines = rest.split('\n');
          const data: any = {};
          lines.forEach(l => {
            const parts = l.trim().split(':');
            if (parts.length >= 2) {
              const key = parts[0].replace(/^[•-]\s*/, '').trim();
              const value = parts.slice(1).join(':').trim();
              data[key] = value;
            }
          });

          switch (type) {
            case 'HERO': return <HeroComponent key={i} data={data} />;
            case 'FEATURES_GRID': return <FeaturesGridComponent key={i} data={data} />;
            case 'TESTIMONIALS': return <TestimonialsComponent key={i} data={data} />;
            case 'CTA_BANNER': return <CTABannerComponent key={i} data={data} />;
            case 'CONTENT_BLOCK': return <ContentBlockComponent key={i} data={data} />;
            default: return (
              <div key={i} className="p-16 glass-morphism rounded-[4rem] italic text-slate-600 dark:text-slate-400 border-sky-100 dark:border-white/5 shadow-xl shadow-sky-100/20 dark:shadow-none">
                <p className="font-black text-sky-600 dark:text-sky-400 uppercase tracking-[0.4em] text-xs mb-8">Raw Blueprint Data</p>
                <div className="prose dark:prose-invert prose-slate text-xl leading-relaxed text-slate-600 dark:text-slate-400">{rest}</div>
              </div>
            );
          }
        })}
      </div>
    );
  }

  if (isFeaturesStrategy) {
    const features: any[] = [];
    let currentFeature: any = null;
    content.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        if (currentFeature) features.push(currentFeature);
        currentFeature = { name: trimmed.slice(1, -1), details: [] };
      } else if (currentFeature && (trimmed.startsWith('- ') || trimmed.startsWith('• '))) {
        const [label, ...val] = trimmed.slice(2).split(':');
        currentFeature.details.push({ label: label.trim(), value: val.join(':').trim() });
      }
    });
    if (currentFeature) features.push(currentFeature);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {features.map((f, i) => (
          <div key={i} className="p-12 rounded-[4rem] bg-white dark:bg-white/5 border border-sky-100 dark:border-white/5 hover:bg-sky-50/50 dark:hover:bg-white/10 hover:border-sky-500/20 transition-all group overflow-hidden relative shadow-xl shadow-sky-100/10 dark:shadow-none">
            <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-10 flex items-center relative z-10">
              <div className="w-14 h-14 bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 rounded-2xl flex items-center justify-center mr-6 group-hover:rotate-12 transition-transform shadow-inner border border-sky-100 dark:border-white/5">
                <Zap className="w-7 h-7" />
              </div>
              {f.name}
            </h4>
            <div className="space-y-8 relative z-10">
              {f.details.map((d: any, di: number) => (
                <div key={di}>
                  <p className="text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-[0.4em] mb-3">{d.label}</p>
                  <p className="text-base font-bold text-slate-800 dark:text-slate-300 leading-relaxed">{d.value}</p>
                </div>
              ))}
            </div>
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-sky-500/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000"></div>
          </div>
        ))}
      </div>
    );
  }

  // Fallback rendering
  const lines = content.split('\n');
  return (
    <div className="space-y-6">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
          return <h4 key={i} className="text-2xl font-black text-slate-900 dark:text-white mt-16 mb-10 border-l-8 border-sky-600 pl-10 py-4 bg-sky-50/50 dark:bg-white/5 rounded-r-[2.5rem] uppercase tracking-tighter">{trimmed.slice(1, -1)}</h4>;
        }
        if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
          const parts = trimmed.split(':');
          if (parts.length > 1) {
            return (
              <div key={i} className="flex flex-col md:flex-row md:items-start mb-8 glass-morphism p-8 rounded-[2.5rem] hover:bg-sky-50/50 dark:hover:bg-white/5 transition-all group shadow-sm">
                <span className="font-black text-sky-600 dark:text-sky-400 min-w-[240px] text-xs uppercase tracking-[0.3em] group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{parts[0].replace(/^[•-]\s*/, '')}:</span>
                <span className="text-slate-700 dark:text-slate-400 text-lg font-medium ml-0 md:ml-8 mt-4 md:mt-0 leading-relaxed">{parts.slice(1).join(':').trim()}</span>
              </div>
            );
          }
          return (
            <div key={i} className="flex items-start text-slate-700 dark:text-slate-300 font-bold text-lg ml-6 mb-6">
              <div className="w-3 h-3 rounded-full bg-sky-500 mt-2.5 mr-6 flex-shrink-0 shadow-[0_0_15px_rgba(14,165,233,0.6)]" />
              <span className="leading-relaxed">{trimmed.replace(/^[•-]\s*/, '')}</span>
            </div>
          );
        }
        if (trimmed === '') return <div key={i} className="h-4" />;
        return <p key={i} className="text-slate-600 dark:text-slate-500 text-xl leading-relaxed font-medium">{trimmed}</p>;
      })}
    </div>
  );
};

const parseResult = (text: string) => {
  const sections: { title: string; content: string }[] = [];
  const parts = text.split(/={10,}/);
  for (let i = 0; i < parts.length; i++) {
    const rawSection = parts[i].trim();
    if (!rawSection) continue;
    const lines = rawSection.split('\n');
    const firstLine = lines[0].trim();
    if (lines.length > 1) {
      sections.push({ title: firstLine, content: lines.slice(1).join('\n').trim() });
    }
  }
  return sections;
};

const getIconForSection = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('overview')) return <Globe className="w-6 h-6 text-sky-600 dark:text-sky-400" />;
  if (t.includes('features')) return <Layers className="w-6 h-6 text-sky-500" />;
  if (t.includes('navigation')) return <Navigation className="w-6 h-6 text-indigo-500" />;
  if (t.includes('page-wise')) return <FileText className="w-6 h-6 text-emerald-500" />;
  if (t.includes('design')) return <Palette className="w-6 h-6 text-sky-600 dark:text-sky-400" />;
  if (t.includes('implementation')) return <Rocket className="w-6 h-6 text-blue-500" />;
  return <Layout className="w-6 h-6 text-slate-400" />;
};

export default App;
