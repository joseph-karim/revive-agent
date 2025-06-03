import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { WizardFormData } from '../Wizard'

const Step4Desire: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<WizardFormData>()
  
  return (
    <div className="question-container">
      <h2 className="question-title">What's your desired outcome?</h2>
      <p className="question-description">
        Describe what success would look like after solving this challenge.
      </p>
      
      <Textarea
        {...register('desire')}
        placeholder="For example: Reduce costs by 20%, complete compliance audits in half the time, beat competitors on key metrics..."
        className="min-h-[120px]"
      />
      
      {errors.desire && (
        <p className="text-sm text-destructive mt-1">{errors.desire.message}</p>
      )}
    </div>
  )
}

export default Step4Desire