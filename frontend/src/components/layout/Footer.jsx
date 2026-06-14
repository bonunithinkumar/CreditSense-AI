import { Leaf } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border px-4 md:px-10 py-8">
      <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-brand flex items-center justify-center rounded-md">
            <Leaf className="text-brand-accent w-3 h-3" />
          </div>
          <span className="font-medium text-brand-primary text-sm tracking-tight">
            Cred<span className="text-brand-accent">Sense</span>
          </span>
        </div>
        <p className="text-xs text-muted">
          © 2026 CredSense — Built by Nithin ❤️.
        </p>
      </div>
    </footer>
  )
}
