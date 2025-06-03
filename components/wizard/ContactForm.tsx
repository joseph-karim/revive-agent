import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { WizardFormData } from './Wizard'

const ContactForm: React.FC = () => {
  const { register, formState: { errors }, setValue, watch } = useFormContext<WizardFormData>()
  const gdprConsent = watch('gdprConsent')
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Get Your Full Personalized Demo</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Enter your contact details to receive a complete version of your personalized demo.
      </p>
      
      <div className="space-y-3">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email address <span className="text-destructive">*</span>
          </label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="your.email@company.com"
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone number (optional)
          </label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="(123) 456-7890"
          />
          {errors.phone && (
            <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
          )}
        </div>
        
        <div className="flex items-start space-x-2 pt-2">
          <Checkbox
            id="gdprConsent"
            checked={gdprConsent}
            onCheckedChange={(checked) => {
              setValue('gdprConsent', checked === true, { shouldValidate: true })
            }}
          />
          <label
            htmlFor="gdprConsent"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </label>
        </div>
        {errors.gdprConsent && (
          <p className="text-sm text-destructive mt-1">{errors.gdprConsent.message}</p>
        )}
      </div>
    </div>
  )
}

export default ContactForm