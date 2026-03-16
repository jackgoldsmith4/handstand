import { useState } from 'react'

type Props = {
  onExport: () => string
  onImport: (code: string) => boolean
  onReset: () => void
  onClose: () => void
}

export function SettingsSheet({ onExport, onImport, onReset, onClose }: Props) {
  const [importCode, setImportCode] = useState('')
  const [imported, setImported] = useState<boolean | null>(null)
  const [copied, setCopied] = useState(false)
  const [showReset, setShowReset] = useState(false)

  const handleExport = () => {
    const code = onExport()
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleImport = () => {
    const ok = onImport(importCode.trim())
    setImported(ok)
    if (ok) setTimeout(onClose, 1200)
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-end z-50" onClick={onClose}>
      <div className="bg-surface w-full rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text">Settings</h3>
          <button onClick={onClose} className="text-subtle text-xl leading-none">✕</button>
        </div>

        {/* Export */}
        <div className="mb-6">
          <p className="text-sm font-medium text-text mb-1">Backup Progress</p>
          <p className="text-xs text-subtle mb-3">Copy your progress code. Paste it on any device to restore.</p>
          <button
            onClick={handleExport}
            className="w-full py-3 rounded-xl bg-accent/10 text-accent text-sm font-medium"
          >
            {copied ? 'Copied to clipboard ✓' : 'Copy Progress Code'}
          </button>
        </div>

        {/* Import */}
        <div className="mb-6">
          <p className="text-sm font-medium text-text mb-1">Restore Progress</p>
          <p className="text-xs text-subtle mb-3">Paste a backup code to restore your progress.</p>
          <textarea
            value={importCode}
            onChange={e => setImportCode(e.target.value)}
            placeholder="Paste backup code here..."
            className="w-full bg-bg border border-border rounded-xl px-3 py-2.5 text-sm text-text placeholder:text-muted resize-none h-20 mb-2"
          />
          <button
            onClick={handleImport}
            disabled={!importCode.trim()}
            className="w-full py-3 rounded-xl bg-accent text-white text-sm font-medium disabled:opacity-40"
          >
            {imported === true ? 'Restored ✓' : imported === false ? 'Invalid code' : 'Restore'}
          </button>
        </div>

        {/* Reset */}
        <div>
          {!showReset ? (
            <button onClick={() => setShowReset(true)} className="w-full py-3 rounded-xl border border-danger/30 text-danger/70 text-sm font-medium">
              Reset All Progress
            </button>
          ) : (
            <div className="bg-danger/10 border border-danger/20 rounded-xl p-4">
              <p className="text-sm text-danger font-medium mb-1">Are you sure?</p>
              <p className="text-xs text-subtle mb-4">This will delete all progress. It cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowReset(false)} className="flex-1 py-2.5 rounded-lg border border-border text-text text-sm">Cancel</button>
                <button onClick={onReset} className="flex-1 py-2.5 rounded-lg bg-danger text-white text-sm font-medium">Delete</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
