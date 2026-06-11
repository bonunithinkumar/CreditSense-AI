import { Leaf } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border px-10 py-8">
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-brand flex items-center justify-center rounded-md">
            <Leaf className="text-brand-accent w-3 h-3" />
          </div>
          <span className="font-medium text-brand-primary text-sm tracking-tight">
            Cred<span className="text-brand-accent">Sense</span>
          </span>
        </div>
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} CredSense Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
