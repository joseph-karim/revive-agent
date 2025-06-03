import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { WizardFormData } from '../Wizard'

const Step1Trigger: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<WizardFormData>()
  
  return (
    <div className="question-container">
      <h2 className="question-title">What triggered your search today?</h2>
      <p className="question-description">
        Tell us what specific event or situation prompted you to look for a solution.
      </p>
      
      <Textarea
        {...register('trigger')}
        placeholder="For example: Recent budget cuts, new compliance requirements, competitive pressure..."
        className="min-h-[120px]"
      />
      
      {errors.trigger && (
        <p className="text-sm text-destructive mt-1">{errors.trigger.message}</p>
      )}
    </div>
  )
}

export default Step1Trigger