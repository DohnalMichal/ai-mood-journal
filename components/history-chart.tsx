'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import type { ChartConfig } from '@/components/ui/chart'
import type { Analysis } from '@prisma/client'

const chartConfig: ChartConfig = {
  sentimentScore: {
    label: 'Sentiment',
    color: 'hsl(var(--chart-1))',
  },
}

type HistoryChartProps = {
  data: Analysis[]
}

const HistoryChart = ({ data }: HistoryChartProps) => {
  const averageSentiment = Math.round(
    data.reduce((all, current) => all + current.sentimentScore, 0) /
      data.length,
  )

  /**
   * TREND CALCULATION:
   * We only calculate a trend if there are at least 2 data entries.
   * Trend is based on the last and the second-to-last data point.
   *
   * Because sentiment can range from -10 to +10 (range = 20),
   * a difference of +10 or -10 would be 100% or -100% shift.
   *
   * trendingPercentage = ((lastScore - secondLastScore) / 20) * 100
   */
  const calulateTrending = () => {
    let trendingPercentage = 0

    if (data.length >= 2) {
      const secondLastScore = data[data.length - 2].sentimentScore
      const lastScore = data[data.length - 1].sentimentScore

      // Calculate the trend
      trendingPercentage = ((lastScore - secondLastScore) / 20) * 100
    }

    return trendingPercentage
  }

  const showTrend = data.length >= 2
  const trendingPercentage = calulateTrending()
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
        {showTrend ? (
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
        ) : (
          <div className="text-sm italic text-muted-foreground">
            Not enough data to determine a trend
          </div>
        )}
        <div className="leading-none text-muted-foreground">
          Showing your mood for the last {data.length} entries
        </div>
      </CardFooter>
    </Card>
  )
}

export { HistoryChart }
