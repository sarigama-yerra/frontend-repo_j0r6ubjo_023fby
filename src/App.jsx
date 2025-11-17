import React from 'react'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import { Phone, Bot, Mic, Shield, Sparkles } from 'lucide-react'

const GradientAura = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(at_50%_50%,#8b5cf6_0deg,#22d3ee_120deg,#60a5fa_240deg,#8b5cf6_360deg)] opacity-20 blur-3xl" />
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-500/30 via-sky-400/20 to-cyan-300/20 blur-3xl" />
  </div>
)

function Nav() {
  return (
    <div className="fixed top-0 inset-x-0 z-20">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-indigo-600 grid place-items-center text-white shadow-lg shadow-indigo-600/30"><Bot size={18} /></div>
          <span className="font-semibold text-slate-800">EchoCall AI</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <a href="#features" className="hover:text-slate-900">Features</a>
          <a href="#how" className="hover:text-slate-900">How it works</a>
          <a href="#cta" className="hover:text-slate-900">Get started</a>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-28">
      <GradientAura />
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900"
          >
            AI calling, that sounds human.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
            className="text-lg md:text-xl text-slate-600"
          >
            Launch a voice agent that answers, resolves, and follows up — instantly. No hold music, no scripts. Just helpful conversations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a href="#cta" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-5 py-3 text-sm font-semibold shadow-lg shadow-slate-900/20">
              <Phone size={18} /> Trigger a test call
            </a>
            <a href="#features" className="inline-flex items-center gap-2 rounded-xl bg-white text-slate-900 px-5 py-3 text-sm font-semibold border border-slate-200">
              <Sparkles size={18} /> See what it can do
            </a>
          </motion.div>

          <div className="flex items-center gap-6 pt-2 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-emerald-500" />
              SOC2-ready
            </div>
            <div className="flex items-center gap-2">
              <Mic size={16} className="text-indigo-500" />
              Natural voice
            </div>
            <div className="flex items-center gap-2">
              <Bot size={16} className="text-cyan-500" />
              Realtime AI
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[4/3] rounded-2xl border border-slate-200/60 bg-white/40 backdrop-blur-xl overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0">
            <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
      <div className="h-10 w-10 rounded-lg bg-indigo-600/10 text-indigo-600 grid place-items-center mb-4"><Icon size={18} /></div>
      <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

function Features() {
  const items = [
    { icon: Bot, title: 'Understands intent', desc: 'LLM-powered reasoning keeps calls on track and resolves issues quickly.' },
    { icon: Mic, title: 'Speaks naturally', desc: 'Low-latency streaming TTS and prosody make conversations feel human.' },
    { icon: Shield, title: 'Secure by default', desc: 'PII redaction, audit logs, and role-based controls keep data safe.' },
  ]
  return (
    <section id="features" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it) => (
            <FeatureCard key={it.title} {...it} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  const [loading, setLoading] = React.useState(false)
  const [phone, setPhone] = React.useState('')
  const [status, setStatus] = React.useState(null)

  const triggerCall = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/api/trigger-call`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to trigger call')
      setStatus({ ok: true, msg: data.message || 'Call triggered' })
    } catch (err) {
      setStatus({ ok: false, msg: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="cta" className="py-20">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Try a test call</h2>
          <p className="text-slate-600">Enter a phone number to simulate how the agent would greet, gather info, and resolve an issue. We log the flow for review.</p>
        </div>
        <form onSubmit={triggerCall} className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200 p-6 shadow-sm">
          <label className="block text-sm font-medium text-slate-700 mb-2">Phone number</label>
          <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="+1 555 123 4567" className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
          <button disabled={loading} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 text-white px-5 py-3 text-sm font-semibold shadow-lg shadow-indigo-600/20 disabled:opacity-60">
            <Phone size={18} /> {loading ? 'Triggering...' : 'Trigger call'}
          </button>
          {status && (
            <p className={`mt-3 text-sm ${status.ok ? 'text-emerald-600' : 'text-rose-600'}`}>{status.msg}</p>
          )}
        </form>
      </div>
    </section>
  )
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      <Nav />
      <Hero />
      <Features />
      <CTA />
      <footer className="py-10 text-center text-slate-500 text-sm">© {new Date().getFullYear()} EchoCall AI. All rights reserved.</footer>
    </div>
  )
}
