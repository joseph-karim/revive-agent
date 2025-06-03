import React, { useState } from 'react'
import { 
  Chart as ChartJS, 
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import { Button } from '@/components/ui/button'
import { WizardFormData } from '../wizard/Wizard'

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

interface ComplianceRiskRadarProps {
  formData: Partial<WizardFormData>
}

const ComplianceRiskRadar: React.FC<ComplianceRiskRadarProps> = ({ formData }) => {
  const [region, setRegion] = useState('North America')
  const [industry, setIndustry] = useState('Finance')
  const [hasAnalyzed, setHasAnalyzed] = useState(false)

  const analyzeCompliance = () => {
    setHasAnalyzed(true)
  }

  // Create datasets based on the selected region and industry
  const getComplianceData = () => {
    if (region === 'North America' && industry === 'Finance') {
      return {
        currentState: [2, 4, 3, 5, 1, 3],
        industryAverage: [3, 3, 4, 4, 3, 4],
        bestPractice: [5, 5, 5, 5, 5, 5]
      }
    } else if (region === 'Europe') {
      return {
        currentState: [3, 2, 4, 3, 2, 4],
        industryAverage: [4, 4, 4, 3, 4, 5],
        bestPractice: [5, 5, 5, 5, 5, 5]
      }
    } else {
      return {
        currentState: [2, 3, 3, 4, 2, 3],
        industryAverage: [3, 4, 3, 4, 4, 4],
        bestPractice: [5, 5, 5, 5, 5, 5]
      }
    }
  }

  const complianceData = getComplianceData()
  
  // Define the compliance areas based on industry
  const getComplianceAreas = () => {
    if (industry === 'Finance') {
      return ['Data Privacy', 'Fraud Prevention', 'KYC/AML', 'Reporting', 'Cybersecurity', 'Governance']
    } else if (industry === 'Healthcare') {
      return ['HIPAA', 'Data Security', 'Patient Privacy', 'Documentation', 'Access Controls', 'Training']
    } else {
      return ['Data Protection', 'Risk Management', 'Security', 'Documentation', 'Monitoring', 'Governance']
    }
  }

  const complianceAreas = getComplianceAreas()
  
  // Prepare chart data
  const chartData = {
    labels: complianceAreas,
    datasets: [
      {
        label: 'Your Current State',
        data: complianceData.currentState,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
      },
      {
        label: 'Industry Average',
        data: complianceData.industryAverage,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
      },
      {
        label: 'Best Practice',
        data: complianceData.bestPractice,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
      }
    ]
  }

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 5
      }
    }
  }

  // Calculate risk score
  const calculateRiskScore = () => {
    const maxPossibleScore = complianceData.currentState.length * 5
    const currentScore = complianceData.currentState.reduce((sum, val) => sum + val, 0)
    return Math.round((currentScore / maxPossibleScore) * 100)
  }

  const riskScore = calculateRiskScore()
  const riskLevel = riskScore >= 80 ? 'Low' : riskScore >= 60 ? 'Moderate' : 'High'
  const riskColor = riskScore >= 80 ? 'text-green-600' : riskScore >= 60 ? 'text-amber-500' : 'text-red-600'

  // Find weakest areas
  const findWeakestAreas = () => {
    const weakAreas = complianceData.currentState
      .map((score, index) => ({ area: complianceAreas[index], score }))
      .sort((a, b) => a.score - b.score)
      .slice(0, 2)

    return weakAreas
  }

  const weakestAreas = findWeakestAreas()

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Compliance & Risk Radar</h3>
      <p className="text-sm text-muted-foreground">
        Analyze your compliance status across key risk areas and compare against industry standards.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="region" className="block text-sm font-medium mb-1">
            Region
          </label>
          <select
            id="region"
            value={region}
            onChange={e => setRegion(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option>North America</option>
            <option>Europe</option>
            <option>Asia Pacific</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="industry" className="block text-sm font-medium mb-1">
            Industry
          </label>
          <select
            id="industry"
            value={industry}
            onChange={e => setIndustry(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option>Finance</option>
            <option>Healthcare</option>
            <option>Technology</option>
            <option>Manufacturing</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={analyzeCompliance}
          className="w-full sm:w-auto"
        >
          Analyze Compliance
        </Button>
      </div>
      
      {hasAnalyzed && (
        <div className="p-4 bg-secondary/30 rounded-lg mt-4">
          <div className="bg-white/70 dark:bg-slate-800/70 p-3 rounded-lg mb-4">
            <Radar data={chartData} options={options} />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-4">
            <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded">
              <p className="text-sm text-muted-foreground">Overall Risk Score</p>
              <p className={`text-2xl font-bold ${riskColor}`}>{riskScore}%</p>
              <p className={`text-sm ${riskColor}`}>{riskLevel} Risk</p>
            </div>
            <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded">
              <p className="text-sm text-muted-foreground">Key Compliance Gaps</p>
              <p className="text-md mt-1">{weakestAreas[0].area}</p>
              <p className="text-md">{weakestAreas[1].area}</p>
            </div>
            <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded">
              <p className="text-sm text-muted-foreground">Recommended Actions</p>
              <p className="text-md mt-1">Targeted Assessment</p>
              <p className="text-md">Compliance Training</p>
            </div>
          </div>
          
          <div className="text-sm space-y-2">
            <h4 className="font-medium">Compliance Insights:</h4>
            <p>
              Based on your {industry} profile in {region}, your organization has key vulnerabilities in {weakestAreas[0].area} and {weakestAreas[1].area}. 
              These areas fall below industry averages and represent significant compliance risk.
            </p>
            <p>
              Our full compliance assessment would provide a detailed roadmap to close these gaps, 
              bringing your organization up to industry standards and best practices.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ComplianceRiskRadar