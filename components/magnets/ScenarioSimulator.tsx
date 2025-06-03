import React, { useState } from 'react'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  BarElement
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { WizardFormData } from '../wizard/Wizard'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface ScenarioSimulatorProps {
  formData: Partial<WizardFormData>
}

const ScenarioSimulator: React.FC<ScenarioSimulatorProps> = ({ formData }) => {
  const [budget, setBudget] = useState(100000)
  const [timeframe, setTimeframe] = useState(12)
  const [hasSimulated, setHasSimulated] = useState(false)

  // Generate some example data based on user inputs
  const simulateScenarios = () => {
    setHasSimulated(true)
  }

  // Extract keywords from form data for personalization
  const keywords = [
    ...(formData.trigger?.split(' ') || []),
    ...(formData.job?.split(' ') || []),
    ...(formData.pain?.split(' ') || []),
    ...(formData.desire?.split(' ') || [])
  ].filter(word => word.length > 4)
    .map(word => word.toLowerCase())

  // Check if certain keywords are present to personalize the scenario
  const hasBudgetKeyword = keywords.some(word => 
    ['budget', 'cost', 'expense', 'spending', 'money'].includes(word)
  )
  
  const hasTimeKeyword = keywords.some(word => 
    ['time', 'schedule', 'deadline', 'period', 'month'].includes(word)
  )

  // Generate some example data
  const labels = Array.from({ length: timeframe }, (_, i) => `Month ${i + 1}`)
  
  const conservativeData = Array.from({ length: timeframe }, (_, i) => {
    return (budget / timeframe) * (1 + (i * 0.02))
  })
  
  const aggressiveData = Array.from({ length: timeframe }, (_, i) => {
    return (budget / timeframe) * (1 + (i * 0.05))
  })
  
  const optimizedData = Array.from({ length: timeframe }, (_, i) => {
    return (budget / timeframe) * (1 + (i * 0.08))
  })
  
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Conservative Approach',
        data: conservativeData,
        borderColor: 'rgba(53, 162, 235, 0.8)',
        backgroundColor: 'rgba(53, 162, 235, 0.1)',
        tension: 0.3
      },
      {
        label: 'Balanced Approach',
        data: aggressiveData,
        borderColor: 'rgba(75, 192, 192, 0.8)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        tension: 0.3
      },
      {
        label: 'Optimized Approach',
        data: optimizedData,
        borderColor: 'rgba(255, 99, 132, 0.8)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        tension: 0.3
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Scenario Comparison'
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `$${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Scenario Simulator</h3>
      <p className="text-sm text-muted-foreground">
        Adjust the parameters below to see different outcomes for your specific situation.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="budget" className="block text-sm font-medium mb-1">
            {hasBudgetKeyword ? 'Allocated Budget' : 'Resource Allocation'}
          </label>
          <div className="flex space-x-2">
            <Input
              id="budget"
              type="number"
              value={budget}
              onChange={e => setBudget(Number(e.target.value))}
              min={1000}
              step={1000}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="timeframe" className="block text-sm font-medium mb-1">
            {hasTimeKeyword ? 'Project Timeframe (months)' : 'Planning Period (months)'}
          </label>
          <div className="flex space-x-2">
            <Input
              id="timeframe"
              type="number"
              value={timeframe}
              onChange={e => setTimeframe(Number(e.target.value))}
              min={1}
              max={36}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={simulateScenarios}
          className="w-full sm:w-auto"
        >
          Simulate Scenarios
        </Button>
      </div>
      
      {hasSimulated && (
        <div className="p-4 bg-secondary/30 rounded-lg mt-4">
          <Line data={chartData} options={options} />
          
          <div className="mt-4 space-y-2">
            <h4 className="font-medium">Key Insights:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>The Optimized Approach could yield up to {Math.round((optimizedData[timeframe-1] / conservativeData[timeframe-1] - 1) * 100)}% better results than the Conservative Approach</li>
              <li>With your current parameters, the potential maximum return is ${Math.round(optimizedData.reduce((a, b) => a + b, 0)).toLocaleString()}</li>
              <li>The Balanced Approach offers a good compromise between risk and return</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default ScenarioSimulator