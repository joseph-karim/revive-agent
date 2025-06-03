"use client"

import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'

import Step1Trigger from './steps/Step1Trigger'
import Step2Job from './steps/Step2Job'
import Step3Pain from './steps/Step3Pain'
import Step4Desire from './steps/Step4Desire'
import ContactForm from './ContactForm'
import MagnetPreview from './MagnetPreview'
import { Button } from '@/components/ui/button'

// Define the schema for all steps combined
const wizardSchema = z.object({
  trigger: z.string().min(2, { message: "Please tell us what triggered your search" }),
  job: z.string().min(2, { message: "Please describe the job you're trying to do" }),
  pain: z.string().min(2, { message: "Please describe your main pain point" }),
  desire: z.string().min(2, { message: "Please tell us your desired outcome" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  gdprConsent: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and privacy policy",
  }),
})

export type WizardFormData = z.infer<typeof wizardSchema>

interface WizardProps {
  onSubmit: (data: WizardFormData) => void
}

const Wizard: React.FC<WizardProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPreview, setShowPreview] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  
  const methods = useForm<WizardFormData>({
    resolver: zodResolver(wizardSchema),
    defaultValues: {
      trigger: '',
      job: '',
      pain: '',
      desire: '',
      email: '',
      phone: '',
      gdprConsent: false,
    },
    mode: 'onChange',
  })

  const { handleSubmit, trigger, formState: { errors, isValid }, watch } = methods
  const allValues = watch()

  const totalSteps = 5 // 4 main questions + contact form
  const progress = (currentStep / totalSteps) * 100

  const nextStep = async () => {
    const fields = getFieldsToValidate(currentStep)
    
    const isStepValid = await trigger(fields as any)
    
    if (isStepValid) {
      if (currentStep === 4) {
        // After 4th step, determine template and show preview
        const template = determineTemplateFromAnswers(allValues)
        setSelectedTemplate(template)
        setShowPreview(true)
      }
      
      setCurrentStep(prevStep => prevStep + 1)
    }
  }

  const prevStep = () => {
    setCurrentStep(prevStep => Math.max(prevStep - 1, 1))
    if (currentStep === 5) {
      setShowPreview(false)
    }
  }

  const getFieldsToValidate = (step: number) => {
    switch (step) {
      case 1:
        return ['trigger']
      case 2:
        return ['job']
      case 3:
        return ['pain']
      case 4:
        return ['desire']
      case 5:
        return ['email', 'gdprConsent']
      default:
        return []
    }
  }

  const determineTemplateFromAnswers = (data: Partial<WizardFormData>): string => {
    // Simplified template selection logic - in real app would use LLM
    const { trigger, job, pain, desire } = data
    
    // Extract keywords from answers
    const allAnswers = `${trigger} ${job} ${pain} ${desire}`.toLowerCase()
    
    // Simple keyword matching for demo purposes
    if (allAnswers.includes('budget') || allAnswers.includes('cost') || allAnswers.includes('spend')) {
      return 'GM-02' // Resource-Cost Optimizer
    }
    else if (allAnswers.includes('compliance') || allAnswers.includes('risk') || allAnswers.includes('regulation')) {
      return 'GM-03' // Compliance & Risk Radar
    }
    else if (allAnswers.includes('benchmark') || allAnswers.includes('compare') || allAnswers.includes('competition')) {
      return 'GM-04' // Performance Benchmark Grader
    }
    else if (allAnswers.includes('forecast') || allAnswers.includes('predict') || allAnswers.includes('future')) {
      return 'GM-06' // Opportunity Forecaster
    }
    else if (allAnswers.includes('training') || allAnswers.includes('skills') || allAnswers.includes('learning')) {
      return 'GM-08' // Skill Gap Matrix
    }
    else if (allAnswers.includes('data') || allAnswers.includes('analysis') || allAnswers.includes('insight')) {
      return 'GM-09' // Insight-from-Data Visualizer
    }
    else if (allAnswers.includes('roi') || allAnswers.includes('return') || allAnswers.includes('investment')) {
      return 'GM-12' // ROI-vs-Risk Quadrant Explorer
    }
    
    // Default to Scenario Simulator
    return 'GM-01'
  }

  const submitForm = (data: WizardFormData) => {
    // In a real app, this would send data to backend API
    onSubmit({
      ...data,
      templateId: selectedTemplate || 'GM-01'
    })
  }

  return (
    <div className="wizard-container">
      {/* Progress bar */}
      <div className="wizard-progress">
        <div 
          className="wizard-progress-bar" 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitForm)}>
          {/* Step content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && <Step1Trigger />}
            {currentStep === 2 && <Step2Job />}
            {currentStep === 3 && <Step3Pain />}
            {currentStep === 4 && <Step4Desire />}
            {currentStep === 5 && (
              <>
                {showPreview && selectedTemplate && (
                  <MagnetPreview 
                    templateId={selectedTemplate} 
                    formData={allValues} 
                  />
                )}
                <ContactForm />
              </>
            )}
          </motion.div>
          
          {/* Navigation buttons */}
          <div className="wizard-navigation">
            {currentStep > 1 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
              >
                Back
              </Button>
            )}
            
            {currentStep < totalSteps ? (
              <Button 
                type="button" 
                onClick={nextStep}
                disabled={!isValid}
                className="ml-auto"
              >
                Next
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="ml-auto"
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default Wizard