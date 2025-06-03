import React, { useState } from 'react'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement,
  Title, 
  Tooltip, 
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { WizardFormData } from '../wizard/Wizard'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface ResourceCostOptimizerProps {
  formData: Partial<WizardFormData>
}

const ResourceCostOptimizer: React.FC<ResourceCostOptimizerProps> = ({ formData }) => {
  const [resources, setResources] = useState(`Software Subscription A: $12000
Cloud Services: $24000
Developer Tools: $8500
Marketing Tools: $7200
Data Storage: $18000`)
  const [hasOptimized, setHasOptimized] = useState(false)

  const runOptimization = () => {
    setHasOptimized(true)
  }

  // Parse the text area into resource items
  const parseResources = () => {
    return resources.split('\n')
      .filter(line => line.trim() !== '')
      .map(line => {
        const parts = line.split(':')
        const name = parts[0].trim()
        const costString = parts[1]?.trim() || '0'
        const cost = Number(costString.replace(/[^0-9.-]+/g, ''))
        return { name, cost }
      })
      .filter(item => !isNaN(item.cost))
      .sort((a, b) => b.cost - a.cost) // Sort by cost descending
  }

  const resourceItems = parseResources()
  
  // Calculate optimized costs (simplified simulation)
  const getOptimizedCosts = () => {
    return resourceItems.map(item => {
      // Random optimization between 10-30%
      const savingPercent = 0.1 + Math.random() * 0.2
      const optimizedCost = item.cost * (1 - savingPercent)
      return {
        ...item,
        optimizedCost,
        saving: item.cost - optimizedCost,
        savingPercent: savingPercent * 100
      }
    })
  }
  
  const optimizedItems = getOptimizedCosts()
  
  // Prepare chart data
  const chartData = {
    labels: resourceItems.map(item => item.name),
    datasets: [
      {
        label: 'Current Cost',
        data: resourceItems.map(item => item.cost),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      },
      {
        label: 'Optimized Cost',
        data: optimizedItems.map(item => item.optimizedCost),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
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
        text: 'Cost Comparison'
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

  // Calculate total costs and savings
  const totalCurrentCost = resourceItems.reduce((sum, item) => sum + item.cost, 0)
  const totalOptimizedCost = optimizedItems.reduce((sum, item) => sum + item.optimizedCost, 0)
  const totalSavings = totalCurrentCost - totalOptimizedCost
  const savingsPercent = (totalSavings / totalCurrentCost * 100).toFixed(1)

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Resource-Cost Optimizer</h3>
      <p className="text-sm text-muted-foreground">
        List your current resources and costs to identify optimization opportunities.
      </p>
      
      <div>
        <label htmlFor="resources" className="block text-sm font-medium mb-1">
          Enter your resources (one per line with cost)
        </label>
        <Textarea
          id="resources"
          value={resources}
          onChange={e => setResources(e.target.value)}
          className="min-h-[120px]"
          placeholder="Example:
Software Subscription A: $12000
Cloud Services: $24000"
        />
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={runOptimization}
          className="w-full sm:w-auto"
        >
          Analyze & Optimize
        </Button>
      </div>
      
      {hasOptimized && (
        <div className="p-4 bg-secondary/30 rounded-lg mt-4">
          <Bar data={chartData} options={options} />
          
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded">
              <p className="text-sm text-muted-foreground">Current Annual Cost</p>
              <p className="text-2xl font-bold">${totalCurrentCost.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded">
              <p className="text-sm text-muted-foreground">Optimized Annual Cost</p>
              <p className="text-2xl font-bold text-primary">${totalOptimizedCost.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded">
              <p className="text-sm text-muted-foreground">Potential Savings</p>
              <p className="text-2xl font-bold text-green-600">${totalSavings.toLocaleString()}</p>
              <p className="text-sm text-green-600/80">{savingsPercent}% Reduction</p>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium mb-2">Optimization Recommendations:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {optimizedItems.slice(0, 3).map((item, index) => (
                <li key={index}>
                  {item.name}: Save ${Math.round(item.saving).toLocaleString()} ({Math.round(item.savingPercent)}%) through 
                  {index % 3 === 0 ? ' vendor negotiation and right-sizing' : 
                   index % 3 === 1 ? ' consolidation and removal of unused features' : 
                   ' migration to alternative solutions'}
                </li>
              ))}
              <li>Complete assessment can identify additional savings across your entire resource stack</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResourceCostOptimizer