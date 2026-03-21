'use client'

import { useEffect, useState } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

interface PDFViewerProps {
  file: File
}

export default function PDFViewer({ file }: PDFViewerProps) {
  const [viewUrl, setViewUrl] = useState<string | null>(null)

  // Initialize the default layout plugin (Toolbar, Sidebar, etc.)
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  useEffect(() => {
    // Create a blob URL for the file object
    const url = URL.createObjectURL(file)
    setViewUrl(url)

    // Cleanup URL on unmount to prevent memory leaks
    return () => URL.revokeObjectURL(url)
  }, [file])

  if (!viewUrl) return null

  return (
    <div className='h-full flex flex-col bg-[#020617]'>
      {/* 1. PDF Header / Stats */}
      <div className='px-6 py-3 border-b border-slate-800 flex justify-between items-center bg-slate-900/30'>
        <div className='flex items-center gap-2'>
          <span className='text-[9px] font-black text-[#ff4f00] uppercase tracking-widest'>
            Render_Buffer
          </span>
          <span className='text-slate-600 text-[9px]'>|</span>
          <span className='text-[9px] font-mono text-slate-400 truncate max-w-[200px]'>
            {file.name}
          </span>
        </div>
      </div>

      {/* 2. PDF Viewer Container */}
      <div className='flex-1 overflow-hidden rp-viewer-dark'>
        <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'>
          <Viewer
            fileUrl={viewUrl}
            plugins={[defaultLayoutPluginInstance]}
            theme='dark'
          />
        </Worker>
      </div>

      {/* Custom CSS to force the 'Architect' Dark Mode on the plugin */}
      <style jsx global>{`
        .rp-viewer-dark {
          --rpv-core__inner-container-background-color: #020617;
          --rpv-core__viewer-container-background-color: #020617;
          --rpv-default-layout__toolbar-background-color: #0f172a;
          --rpv-default-layout__toolbar-border-bottom-color: #1e293b;
          --rpv-core__textbox-background-color: #1e293b;
          --rpv-core__textbox-color: #f8fafc;
        }
        /* Hide the default plugin sidebar to keep our 'Medium-Small' aesthetic */
        .rpv-default-layout__sidebar {
          display: none !important;
        }
      `}</style>
    </div>
  )
}
