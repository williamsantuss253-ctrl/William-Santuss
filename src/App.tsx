/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, 
  Smartphone, 
  Zap, 
  Settings2, 
  ChevronRight, 
  RefreshCw, 
  Copy, 
  CheckCircle2,
  Info,
  Trophy,
  MousePointer2
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { generateSensitivity, type SensiSettings } from './services/gemini';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SensiSettings | null>(null);
  const [copied, setCopied] = useState(false);
  
  const [formData, setFormData] = useState({
    device: 'Android',
    dpi: 'Padrão (411)',
    style: 'Rush'
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await generateSensitivity(formData.device, formData.dpi, formData.style);
      setResult(data);
    } catch (error) {
      console.error("Erro ao gerar sensibilidade:", error);
      alert("Erro ao conectar com a IA. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-dark-bg selection:bg-neon-yellow selection:text-black">
      <div className="scanline" />
      
      {/* Header */}
      <header className="border-b border-white/10 py-6 px-4 md:px-8 flex justify-between items-center bg-card-bg/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-neon-yellow p-1.5 rounded-sm">
            <Target className="text-black w-6 h-6" />
          </div>
          <h1 className="font-display text-2xl tracking-tighter uppercase italic">
            FF SENSI <span className="text-neon-yellow italic">PRO</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-white/40">
          <span>AI POWERED GENERATOR</span>
          <span className="w-1 h-1 bg-neon-yellow rounded-full" />
          <span>V 2.5.0</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Input Form */}
        <section className="lg:col-span-5 space-y-6">
          <div className="brutal-border-yellow bg-card-bg p-6 space-y-8">
            <div className="space-y-2">
              <h2 className="font-display text-3xl uppercase leading-none">Configuração</h2>
              <p className="text-white/50 text-xs font-mono uppercase tracking-wider">Ajuste os parâmetros do seu dispositivo</p>
            </div>

            <div className="space-y-6">
              {/* Device Selection */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[11px] font-mono uppercase text-neon-yellow">
                  <Smartphone className="w-4 h-4" /> Dispositivo
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Android', 'iOS'].map((dev) => (
                    <button
                      key={dev}
                      onClick={() => setFormData({ ...formData, device: dev })}
                      className={cn(
                        "py-3 px-4 text-sm font-bold border-2 transition-all",
                        formData.device === dev 
                          ? "bg-neon-yellow text-black border-neon-yellow" 
                          : "bg-transparent text-white border-white/20 hover:border-white/40"
                      )}
                    >
                      {dev}
                    </button>
                  ))}
                </div>
              </div>

              {/* DPI Input */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[11px] font-mono uppercase text-neon-yellow">
                  <Settings2 className="w-4 h-4" /> DPI Atual
                </label>
                <input 
                  type="text"
                  value={formData.dpi}
                  onChange={(e) => setFormData({ ...formData, dpi: e.target.value })}
                  placeholder="Ex: 411, 600, 800..."
                  className="w-full bg-white/5 border-2 border-white/20 p-3 text-sm focus:border-neon-yellow outline-none transition-colors"
                />
              </div>

              {/* Play Style */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[11px] font-mono uppercase text-neon-yellow">
                  <Zap className="w-4 h-4" /> Estilo de Jogo
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Rush', 'Sniper', 'Equilibrado'].map((style) => (
                    <button
                      key={style}
                      onClick={() => setFormData({ ...formData, style })}
                      className={cn(
                        "py-3 px-2 text-[10px] font-bold border-2 transition-all uppercase",
                        formData.style === style 
                          ? "bg-neon-yellow text-black border-neon-yellow" 
                          : "bg-transparent text-white border-white/20 hover:border-white/40"
                      )}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-neon-yellow text-black font-display text-xl py-4 uppercase brutal-btn flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  ANALISANDO...
                </>
              ) : (
                <>
                  GERAR SENSIBILIDADE
                  <ChevronRight className="w-6 h-6" />
                </>
              )}
            </button>
          </div>

          {/* Info Card */}
          <div className="bg-white/5 border border-white/10 p-4 rounded-sm flex gap-4">
            <Info className="w-6 h-6 text-neon-yellow shrink-0" />
            <p className="text-xs text-white/60 leading-relaxed">
              Nossa IA analisa milhares de configurações de jogadores profissionais para encontrar o ajuste perfeito para o seu hardware e estilo de jogo.
            </p>
          </div>
        </section>

        {/* Right Column: Results */}
        <section className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!result && !loading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/10 rounded-lg"
              >
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-10 h-10 text-white/20" />
                </div>
                <h3 className="font-display text-2xl uppercase text-white/40">Aguardando Dados</h3>
                <p className="text-white/30 text-sm max-w-xs mt-2">Preencha as informações ao lado para gerar sua configuração personalizada.</p>
              </motion.div>
            ) : loading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center p-12 space-y-8"
              >
                <div className="relative">
                  <div className="w-24 h-24 border-4 border-neon-yellow/20 border-t-neon-yellow rounded-full animate-spin" />
                  <Target className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-neon-yellow animate-pulse" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-display text-2xl uppercase animate-pulse">Processando Algoritmo</h3>
                  <p className="font-mono text-[10px] text-neon-yellow uppercase tracking-widest">Calculando DPI e FOV...</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Main Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Geral', value: result?.general, icon: Target },
                    { label: 'Ponto Vermelho', value: result?.redDot, icon: MousePointer2 },
                    { label: 'Mira 2x', value: result?.scope2x, icon: Target },
                    { label: 'Mira 4x', value: result?.scope4x, icon: Target },
                    { label: 'Mira AWM', value: result?.sniperScope, icon: Target },
                    { label: 'Olhadinha', value: result?.freeLook, icon: Smartphone },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-card-bg border border-white/10 p-4 space-y-2 group hover:border-neon-yellow/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <item.icon className="w-4 h-4 text-white/30 group-hover:text-neon-yellow transition-colors" />
                        <span className="text-2xl font-display text-neon-yellow">{item.value}</span>
                      </div>
                      <p className="text-[10px] font-mono uppercase text-white/50 tracking-wider">{item.label}</p>
                      <div className="h-1 bg-white/5 w-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          className="h-full bg-neon-yellow"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Secondary Config */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-neon-yellow p-6 text-black brutal-border">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-display text-xl uppercase italic">DPI Sugerido</h4>
                      <Settings2 className="w-6 h-6" />
                    </div>
                    <span className="text-5xl font-display">{result?.dpi || '---'}</span>
                    <p className="text-[10px] font-bold uppercase mt-2 opacity-70">Ajuste nas opções de desenvolvedor</p>
                  </div>
                  
                  <div className="bg-white p-6 text-black brutal-border">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-display text-xl uppercase italic">Botão Atirar</h4>
                      <Target className="w-6 h-6" />
                    </div>
                    <span className="text-5xl font-display">{result?.buttonSize || '---'}%</span>
                    <p className="text-[10px] font-bold uppercase mt-2 opacity-70">Tamanho ideal para puxar capa</p>
                  </div>
                </div>

                {/* Pro Tips */}
                <div className="brutal-border bg-card-bg p-6 space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                    <Trophy className="w-5 h-5 text-neon-yellow" />
                    <h4 className="font-display text-xl uppercase">Dicas de Pro Player</h4>
                  </div>
                  <ul className="space-y-4">
                    {result?.tips.map((tip, idx) => (
                      <li key={idx} className="flex gap-4 items-start">
                        <span className="font-display text-neon-yellow text-lg leading-none">0{idx + 1}</span>
                        <p className="text-sm text-white/80 leading-relaxed">{tip}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => copyToClipboard(`SENSI FF PRO: Geral:${result?.general} | RedDot:${result?.redDot} | 2x:${result?.scope2x} | 4x:${result?.scope4x} | AWM:${result?.sniperScope} | DPI:${result?.dpi}`)}
                    className="flex-1 bg-white text-black font-display py-4 uppercase brutal-btn flex items-center justify-center gap-2"
                  >
                    {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {copied ? 'COPIADO!' : 'COPIAR CONFIG'}
                  </button>
                  <button 
                    onClick={() => setResult(null)}
                    className="px-6 border-2 border-white/20 hover:border-white/40 transition-colors flex items-center justify-center"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <footer className="mt-12 border-t border-white/10 py-8 px-4 text-center">
        <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
          Desenvolvido com IA para a comunidade Free Fire &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
