import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Shield, FileText, Users, BarChart3, Lock, ArrowRight } from 'lucide-react'

const FEATURES = [
  {
    icon: FileText,
    title: 'Case Management',
    description: 'Document, track, and manage human rights cases with structured workflows and status tracking.',
  },
  {
    icon: Users,
    title: 'Investigator Assignment',
    description: 'Assign dedicated investigators to cases and monitor their progress in real time.',
  },
  {
    icon: Shield,
    title: 'Evidence Collection',
    description: 'Securely upload and organise evidence files linked directly to each case.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description: 'Generate insightful reports on case outcomes, priorities, and investigator performance.',
  },
  {
    icon: Lock,
    title: 'Confidentiality Controls',
    description: 'Role-based access ensures sensitive information is only visible to authorised personnel.',
  },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg tracking-tight">CaseLedger</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
            Log in
          </Button>
          <Button size="sm" onClick={() => navigate('/register')}>
            Get started
          </Button>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="max-w-4xl mx-auto px-6 py-24 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Shield className="h-3.5 w-3.5" />
            Human Rights Case Management
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Track every case.<br />Protect every voice.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            CaseLedger is a secure platform for NGOs and investigators to document human rights cases,
            manage evidence, and generate transparent accountability reports.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button size="lg" onClick={() => navigate('/register')}>
              Get started free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
              Log in
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="border-t bg-muted/30 py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center tracking-tight mb-12">
              Everything you need to manage cases effectively
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div key={title} className="bg-background rounded-xl border p-6 space-y-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 px-6 text-center space-y-5">
          <h2 className="text-2xl font-bold tracking-tight">Ready to get started?</h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm">
            Join organisations already using CaseLedger to bring accountability and transparency to human rights work.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button size="lg" onClick={() => navigate('/register')}>
              Create an account
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
              Log in
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t px-6 py-5 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} CaseLedger. All rights reserved.
      </footer>
    </div>
  )
}
