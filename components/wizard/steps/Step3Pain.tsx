import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { WizardFormData } from '../Wizard'

const Step3Pain: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<WizardFormData>()
  
  return (
    <div className="question-container">
      <h2 className="question-title">What's your biggest pain point?</h2>
      <p className="question-description">
        Tell us about your main frustration or challenge in this area.
      </p>
      
      <Textarea
        {...register('pain')}
        placeholder="For example: Manual processes taking too much time, lack of visibility into performance, high error rates..."
        className="min-h-[120px]"
      />
      
      {errors.pain && (
        <p className="text-sm text-destructive mt-1">{errors.pain.message}</p>
      )}
    </div>
  )
}

export default Step3Pain