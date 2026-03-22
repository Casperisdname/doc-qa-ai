'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic' 
import { PanelLeftClose, Shield, FileText } from 'lucide-react'
import ChatInterface from '@/components/ChatInterface'
import Sidebar from '@/components/Sidebar'

// Step 2: Dynamically import PDFViewer with SSR disabled
const PDFViewer = dynamic(() => import('@/components/PDFViewer'), {
  ssr: false,
  loading: () => (
    <div className='h-full flex flex-col items-center justify-center text-slate-700'>
      <div className='w-1.5 h-1.5 rounded-full bg-[#ff4f00] animate-ping mb-4' />
      <p className='text-[10px] font-black uppercase tracking-widest opacity-20'>
        Initializing_PDF_Engine...
      </p>
    </div>
  ),
})

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null)
  const [isSidebarOpen, setSidebarOpen] = useState(true)

  return (
    <main className='flex h-screen overflow-hidden'>
      {/* 1. Technical Sidebar */}
      {isSidebarOpen && <Sidebar setFile={setFile} currentFile={file} />}

      <div className='flex-1 flex flex-col min-w-0 bg-[#020617]'>
        {/* 2. Top Navigation Bar */}
        <header className='h-14 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur-xl'>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className='text-slate-500 hover:text-white transition-colors'
            >
              <PanelLeftClose className='w-5 h-5' />
            </button>
            <div className='flex items-center gap-2'>
              <Shield className='w-4 h-4 text-[#ff4f00]' />
              <h1 className='text-[10px] font-black uppercase tracking-[0.3em]'>
                doc-qa-ai <span className='text-slate-600'>v1.0</span>
              </h1>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <div className='px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-2'>
              <span className='w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse' />
              <span className='text-[9px] font-bold text-green-500 uppercase'>
                Engine_Online
              </span>
            </div>
          </div>
        </header>

        {/* 3. The Split Workspace */}
        <div className='flex-1 flex overflow-hidden'>
          {/* Left: PDF Space */}
          <section className='flex-1 border-r border-slate-800 bg-slate-950/50 overflow-y-auto custom-scrollbar'>
            {file ? (
              <PDFViewer file={file} />
            ) : (
              <EmptyState title='No Document Active' icon={FileText} />
            )}
          </section>

          {/* Right: AI Intelligence Space */}
          <section className='w-[400px] lg:w-[450px] bg-slate-900/30 flex flex-col'>
            <ChatInterface fileActive={!!file} />
          </section>
        </div>
      </div>
    </main>
  )
}

function EmptyState({ title, icon: Icon }: { title: string; icon: any }) {
  return (
    <div className='h-full flex flex-col items-center justify-center text-slate-700'>
      <Icon className='w-12 h-12 mb-4 opacity-10' />
      <p className='text-[10px] font-black uppercase tracking-widest opacity-20'>
        {title}
      </p>
    </div>
  )
}
