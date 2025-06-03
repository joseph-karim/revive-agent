import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

// Import magnets dynamically
import ScenarioSimulator from '../magnets/ScenarioSimulator'
import ResourceCostOptimizer from '../magnets/ResourceCostOptimizer'
import ComplianceRiskRadar from '../magnets/ComplianceRiskRadar'
import PerformanceBenchmarkGrader from '../magnets/PerformanceBenchmarkGrader'

// Import interfaces
import { WizardFormData } from './Wizard'

interface MagnetPreviewProps {
  templateId: string
  formData: Partial<WizardFormData>
}

const MagnetPreview: React.FC<MagnetPreviewProps> = ({ templateId, formData }) => {
  // Map template IDs to component names
  const magnetComponents = useMemo(() => ({
    'GM-01': ScenarioSimulator,
    'GM-02': ResourceCostOptimizer,
    'GM-03': ComplianceRiskRadar,
    'GM-04': PerformanceBenchmarkGrader,
    // Additional components would be imported and mapped here
  }), [])

  // Get the appropriate component based on templateId
  const MagnetComponent = magnetComponents[templateId as keyof typeof magnetComponents]

  // Get a user-friendly template name
  const getTemplateName = (id: string) => {
    const names: Record<string, string> = {
      'GM-01': 'Scenario Simulator',
      'GM-02': 'Resource-Cost Optimizer',
      'GM-03': 'Compliance & Risk Radar',
      'GM-04': 'Performance Benchmark Grader',
      'GM-05': 'Interactive Diagnostic',
      'GM-06': 'Opportunity Forecaster',
      'GM-07': 'Personalized Action-Plan Builder',
      'GM-08': 'Skill Gap Matrix',
      'GM-09': 'Insight-from-Data Visualizer',
      'GM-10': 'Instant Proof-of-Concept Sandbox',
      'GM-11': 'AI Conversation Demo',
      'GM-12': 'ROI-vs-Risk Quadrant Explorer',
    }
    return names[id] || 'Personalized Solution'
  }

  return (
    <div className="mb-8">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Your Personalized Preview</h2>
        <p className="text-sm text-muted-foreground">
          Based on your answers, we recommend our {getTemplateName(templateId)} solution.
        </p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="preview-container"
      >
        {MagnetComponent ? (
          <MagnetComponent formData={formData} />
        ) : (
          <div className="p-4 text-center">
            <p>Preview for {getTemplateName(templateId)} is being generated...</p>
            <p className="text-sm text-muted-foreground mt-2">
              Complete the form below to get the full version.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default MagnetPreview