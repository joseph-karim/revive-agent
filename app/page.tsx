import Wizard from '@/components/wizard/Wizard'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-24">
      <div className="max-w-3xl w-full">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Clarity Magnet Stack™
          </h1>
          <p className="text-xl text-muted-foreground">
            Real-Time Onboarding & AI Magnet Wizard
          </p>
        </div>

        <div className="mb-8 p-6 bg-secondary/40 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Mini-Onboarding Demo</h2>
          <p className="text-muted-foreground mb-4">
            Answer 4 quick questions to get a personalized proof of concept instantly.
            See how our AI-powered wizard maps your needs to tailored solutions.
          </p>
          <Link href="/demo" className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Start Demo
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">How It Works</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Answer 4 simple questions about your needs</li>
              <li>Our AI maps your answers to the best solution</li>
              <li>Get an instant personalized demo</li>
              <li>Share your contact for a full version</li>
            </ol>
          </div>
          <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Benefits</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Tailored demos in seconds</li>
              <li>No generic, one-size-fits-all pitches</li>
              <li>See exactly how our solution solves your problems</li>
              <li>Save time with personalized onboarding</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}