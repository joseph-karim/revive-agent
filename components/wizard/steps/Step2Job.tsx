import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { WizardFormData } from '../Wizard'

const Step2Job: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<WizardFormData>()
  
  return (
    <div className="question-container">
      <h2 className="question-title">What job are you trying to get done?</h2>
      <p className="question-description">
        Describe the specific task or objective you're working to accomplish.
      </p>
      
      <Textarea
        {...register('job')}
        placeholder="For example: Optimize our resource allocation, improve team productivity, reduce compliance risk..."
        className="min-h-[120px]"
      />
      
      {errors.job && (
        <p className="text-sm text-destructive mt-1">{errors.job.message}</p>
      )}
    </div>
  )
}

export default Step2Job