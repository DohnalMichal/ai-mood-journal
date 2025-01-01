'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'

import { CartesianGrid, Line, LineChart, TooltipProps, XAxis } from 'recharts'
import type { Analysis } from '@prisma/client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartConfig: ChartConfig = {
  sentimentScore: {
    label: 'Sentiment',
    color: 'hsl(var(--chart-1))',
  },
}

interface HistoryChartProps {
  data: Analysis[]
}

const HistoryChart = ({ data }: HistoryChartProps) => {
  const averageSentiment = Math.round(
    data.reduce((all, current) => all + current.sentimentScore, 0) /
      data.length,
  )

  // TODO: Refine trending calculation to be more accurate for negative numbers as well.
  // Also handle a state where both scores are the same - there is no trend.
  // Calculate percentage difference from first to last sentiment
  const firstScore = data[0].sentimentScore
  const lastScore = data[data.length - 1].sentimentScore

  let trendingPercentage = 0
  if (firstScore !== 0) {
    trendingPercentage = ((lastScore - firstScore) / firstScore) * 100
  }

  const isTrendUp = trendingPercentage > 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>History Chart</CardTitle>
        <CardDescription>Your mood over time</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={data} margin={{ top: 20, left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="createdAt"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              }
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Line
              dataKey="sentimentScore"
              type="monotone"
              stroke="var(--color-sentimentScore)"
              strokeWidth={2}
              dot={{ fill: 'var(--color-sentimentScore)' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          <span>Average Sentiment: {averageSentiment}</span>
        </div>
        <div className="flex gap-2 font-medium leading-none">
          {isTrendUp ? (
            <>
              <span>
                Trending up by {Math.abs(trendingPercentage).toFixed(0)}%
              </span>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </>
          ) : (
            <>
              <span>
                Trending down by {Math.abs(trendingPercentage).toFixed(0)}%
              </span>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing your mood for the last {data.length} entries
        </div>
      </CardFooter>
    </Card>
  )
}

export { HistoryChart }
