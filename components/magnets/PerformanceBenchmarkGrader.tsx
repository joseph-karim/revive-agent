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

interface PerformanceBenchmarkGraderProps {
  formData: Partial<WizardFormData>
}

const PerformanceBenchmarkGrader: React.FC<PerformanceBenchmarkGraderProps> = ({ formData }) => {
  // Define initial KPI values
  const [kpis, setKpis] = useState({
    customerSatisfaction: 76,
    employeeProductivity: 68,
    operationalEfficiency: 72,
    marketShare: 12,
    revenueGrowth: 8
  })
  
  const [hasAnalyzed, setHasAnalyzed] = useState(false)
  
  const updateKpi = (key: keyof typeof kpis, value: number) => {
    setKpis(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const analyzeBenchmarks = () => {
    setHasAnalyzed(true)
  }

  // Define industry benchmarks for comparison
  const industryBenchmarks = {
    customerSatisfaction: 82,
    employeeProductivity: 74,
    operationalEfficiency: 78,
    marketShare: 15,
    revenueGrowth: 11
  }
  
  // Define top performers' benchmarks
  const topPerformersBenchmarks = {
    customerSatisfaction: 92,
    employeeProductivity: 88,
    operationalEfficiency: 91,
    marketShare: 24,
    revenueGrowth: 18
  }
  
  // Prepare chart data
  const kpiLabels = {
    customerSatisfaction: 'Customer Satisfaction',
    employeeProductivity: 'Employee Productivity',
    operationalEfficiency: 'Operational Efficiency',
    marketShare: 'Market Share',
    revenueGrowth: 'Revenue Growth'
  }
  
  const chartData = {
    labels: Object.values(kpiLabels),
    datasets: [
      {
        label: 'Your Performance',
        data: Object.values(kpis),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      },
      {
        label: 'Industry Average',
        data: Object.values(industryBenchmarks),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      },
      {
        label: 'Top Performers',
        data: Object.values(topPerformersBenchmarks),
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
        text: 'Performance Benchmark Comparison'
      }
    }
  }

  // Calculate performance score
  const calculatePerformanceScore = () => {
    const kpiKeys = Object.keys(kpis) as Array<keyof typeof kpis>
    
    const totalScore = kpiKeys.reduce((sum, key) => {
      const yourValue = kpis[key]
      const topValue = topPerformersBenchmarks[key]
      return sum + (yourValue / topValue * 100)
    }, 0)
    
    return Math.round(totalScore / kpiKeys.length)
  }

  const performanceScore = calculatePerformanceScore()
  
  // Determine performance grade
  const getPerformanceGrade = () => {
    if (performanceScore >= 90) return { letter: 'A', description: 'Excellent' }
    if (performanceScore >= 80) return { letter: 'B', description: 'Good' }
    if (performanceScore >= 70) return { letter: 'C', description: 'Average' }
    if (performanceScore >= 60) return { letter: 'D', description: 'Below Average' }
    return { letter: 'F', description: 'Needs Improvement' }
  }
  
  const performanceGrade = getPerformanceGrade()
  
  // Find strengths and areas for improvement
  const findStrengthsAndWeaknesses = () => {
    const kpiKeys = Object.keys(kpis) as Array<keyof typeof kpis>
    
    const performanceRatios = kpiKeys.map(key => ({
      key,
      label: kpiLabels[key],
      ratio: kpis[key] / industryBenchmarks[key]
    }))
    
    const strengths = performanceRatios
      .filter(item => item.ratio >= 1)
      .sort((a, b) => b.ratio - a.ratio)
      .slice(0, 2)
      .map(item => item.label)
    
    const weaknesses = performanceRatios
      .filter(item => item.ratio < 1)
      .sort((a, b) => a.ratio - b.ratio)
      .slice(0, 2)
      .map(item => item.label)
    
    return { strengths, weaknesses }
  }
  
  const { strengths, weaknesses } = findStrengthsAndWeaknesses()

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Performance Benchmark Grader</h3>
      <p className="text-sm text-muted-foreground">
        Compare your key performance indicators against industry benchmarks.
      </p>
      
      <div className="space-y-3">
        <div>
          <label htmlFor="customerSatisfaction" className="block text-sm font-medium mb-1">
            Customer Satisfaction (0-100)
          </label>
          <Input
            id="customerSatisfaction"
            type="number"
            value={kpis.customerSatisfaction}
            onChange={e => updateKpi('customerSatisfaction', Number(e.target.value))}
            min={0}
            max={100}
          />
        </div>
        
        <div>
          <label htmlFor="employeeProductivity" className="block text-sm font-medium mb-1">
            Employee Productivity (0-100)
          </label>
          <Input
            id="employeeProductivity"
            type="number"
            value={kpis.employeeProductivity}
            onChange={e => updateKpi('employeeProductivity', Number(e.target.value))}
            min={0}
            max={100}
          />
        </div>
        
        <div>
          <label htmlFor="operationalEfficiency" className="block text-sm font-medium mb-1">
            Operational Efficiency (0-100)
          </label>
          <Input
            id="operationalEfficiency"
            type="number"
            value={kpis.operationalEfficiency}
            onChange={e => updateKpi('operationalEfficiency', Number(e.target.value))}
            min={0}
            max={100}
          />
        </div>
        
        <div>
          <label htmlFor="marketShare" className="block text-sm font-medium mb-1">
            Market Share (%)
          </label>
          <Input
            id="marketShare"
            type="number"
            value={kpis.marketShare}
            onChange={e => updateKpi('marketShare', Number(e.target.value))}
            min={0}
            max={100}
          />
        </div>
        
        <div>
          <label htmlFor="revenueGrowth" className="block text-sm font-medium mb-1">
            Revenue Growth (%)
          </label>
          <Input
            id="revenueGrowth"
            type="number"
            value={kpis.revenueGrowth}
            onChange={e => updateKpi('revenueGrowth', Number(e.target.value))}
            min={-50}
            max={100}
          />
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={analyzeBenchmarks}
          className="w-full sm:w-auto"
        >
          Analyze Performance
        </Button>
      </div>
      
      {hasAnalyzed && (
        <div className="p-4 bg-secondary/30 rounded-lg mt-4">
          <div className="bg-white/70 dark:bg-slate-800/70 p-3 rounded-lg mb-4">
            <Bar data={chartData} options={options} />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-4">
            <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded">
              <p className="text-sm text-muted-foreground">Performance Grade</p>
              <p className="text-3xl font-bold">{performanceGrade.letter}</p>
              <p className="text-sm">{performanceGrade.description}</p>
            </div>
            <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded">
              <p className="text-sm text-muted-foreground">Overall Score</p>
              <p className="text-2xl font-bold">{performanceScore}/100</p>
              <p className="text-sm">{performanceScore >= 75 ? 'Above' : 'Below'} Industry Average</p>
            </div>
            <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded">
              <p className="text-sm text-muted-foreground">Competitive Position</p>
              <p className="text-lg font-medium mt-1">
                {performanceScore >= 85 ? 'Leader' :
                 performanceScore >= 70 ? 'Competitor' :
                 'Challenger'}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded">
              <h4 className="font-medium mb-2">Your Strengths</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {strengths.length > 0 ? (
                  strengths.map((strength, i) => (
                    <li key={i}>{strength}</li>
                  ))
                ) : (
                  <li>No areas currently above industry average</li>
                )}
              </ul>
            </div>
            <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded">
              <h4 className="font-medium mb-2">Areas for Improvement</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {weaknesses.map((weakness, i) => (
                  <li key={i}>{weakness}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="text-sm">
            <h4 className="font-medium mb-2">Recommendations:</h4>
            <p>
              Based on your performance data, we recommend focusing on improving {weaknesses.join(' and ')}. 
              Our full assessment would provide detailed strategies to help you reach industry-leading performance in these areas.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default PerformanceBenchmarkGrader