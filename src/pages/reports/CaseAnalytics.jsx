import { useEffect, useState } from 'react'
import {
  getCasesByStatus, getCasesByPriority, getCasesByCategory,
  getMonthlyCases, getYearlyCases,
} from '@/api/report.api'
import { CASE_STATUS_LABELS, CASE_PRIORITY_LABELS, CASE_CATEGORY_LABELS } from '@/utils/constants'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from 'recharts'

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6']

function ChartCard({ title, loading, children }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? <Skeleton className="h-52 w-full" /> : children}
      </CardContent>
    </Card>
  )
}

export default function CaseAnalytics() {
  const navigate = useNavigate()

  const [byStatus, setByStatus] = useState([])
  const [byPriority, setByPriority] = useState([])
  const [byCategory, setByCategory] = useState([])
  const [monthly, setMonthly] = useState([])
  const [yearly, setYearly] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getCasesByStatus(),
      getCasesByPriority(),
      getCasesByCategory(),
      getMonthlyCases(),
      getYearlyCases(),
    ])
      .then(([s, p, c, m, y]) => {
        const toEntries = (d, labels) =>
          Object.entries(d?.data?.data || {}).map(([k, v]) => ({ name: labels[k] || k, value: v }))

        setByStatus(toEntries(s, CASE_STATUS_LABELS))
        setByPriority(toEntries(p, CASE_PRIORITY_LABELS))
        setByCategory(toEntries(c, CASE_CATEGORY_LABELS))

        const mData = m?.data?.data || []
        setMonthly(Array.isArray(mData) ? mData : Object.entries(mData).map(([k, v]) => ({ name: k, count: v })))

        const yData = y?.data?.data || []
        setYearly(Array.isArray(yData) ? yData : Object.entries(yData).map(([k, v]) => ({ name: k, count: v })))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate('/reports')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Case Analytics</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Breakdown of cases across all dimensions</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Cases by Status" loading={loading}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={byStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {byStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Cases by Priority" loading={loading}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={byPriority} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Cases by Category" loading={loading}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={byCategory} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={120} />
              <Tooltip />
              <Bar dataKey="value" fill="#22c55e" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Trend" loading={loading}>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthly} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Yearly Trend" loading={loading}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={yearly} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
