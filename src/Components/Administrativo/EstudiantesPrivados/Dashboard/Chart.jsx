"use client"
//Bar chart
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../ui/chart"

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const chartConfig = {
  held: {
    label: "Clases Dictadas",
    color: "hsl(var(--chart-1))",
  },
  canceled: {
    label: "Clases Canceladas",
    color: "hsl(var(--chart-2))",
  },
};

export default function Component({ data }) {
  const chartData = data.monthlyClassStats.map(stat => ({
    month: monthNames[stat.month - 1], // Convert month number to month name
    held: stat.classesHeld,
    canceled: stat.classesCanceled
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grafico de barras</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="held" fill="var(--color-held)" radius={4} />
            <Bar dataKey="canceled" fill="var(--color-canceled)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Comparación entre clases dictadas y clases canceladas
        </div>
      </CardFooter>
    </Card>
  )
}
