"use client"

import Wizard from '@/components/wizard/Wizard'
import { useState } from 'react'
import { toast } from 'sonner'

export default function DemoPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data)
    toast.success("Thank you for your submission!", {
      description: "We'll be in touch soon with your full personalized demo."
    })
    setIsSubmitted(true)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-24">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Clarity Magnet Wizard
          </h1>
          <p className="text-muted-foreground">
            Answer a few quick questions to get a personalized solution
          </p>
        </div>

        {!isSubmitted ? (
          <Wizard onSubmit={handleSubmit} />
        ) : (
          <div className="p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg text-center animate-fade-in">
            <h2 className="text-2xl font-semibold mb-4">Thank You!</h2>
            <p className="mb-6">
              We've received your information and will be in touch soon with your
              full personalized demo. Check your email for more details.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </main>
  )
}