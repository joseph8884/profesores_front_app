"use client"
//Pie chart
import { Pie, PieChart, Sector } from "recharts"

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


const chartConfig = {
  hoursHeld: {
    label: "Horas Realizadas",
    color: "hsl(var(--chart-1))",
  },
  hoursHeldVirtual: {
    label: "Horas Virtuales Realizadas",
    color: "hsl(var(--chart-2))",
  },
  hoursHeldInPerson: {
    label: "Horas Presenciales Realizadas",
    color: "hsl(var(--chart-3))",
  },
  hoursCanceledStudentOnTime: {
    label: "Horas Canceladas por Estudiante a Tiempo",
    color: "hsl(var(--chart-4))",
  },
  hoursCanceledTeacherOnTime: {
    label: "Horas Canceladas por Profesor a Tiempo",
    color: "hsl(var(--chart-5))",
  },
  hoursCanceledStudentLateVirtual: {
    label: "Horas Canceladas por Estudiante Tarde (Virtual)",
    color: "hsl(var(--chart-6))",
  },
  hoursCanceledStudentLateInPerson: {
    label: "Horas Canceladas por Estudiante Tarde (Presencial)",
    color: "hsl(var(--chart-7))",
  },
  hoursCanceledTeacherLate: {
    label: "Horas Canceladas por Profesor Tarde",
    color: "hsl(var(--chart-8))",
  },
}

export default function Component({ data }) {
  
  const chartData = [
    { name: chartConfig.hoursHeld.label, value: data.hoursHeld, fill: chartConfig.hoursHeld.color },
    { name: chartConfig.hoursHeldVirtual.label, value: data.hoursHeldVirtual, fill: chartConfig.hoursHeldVirtual.color },
    { name: chartConfig.hoursHeldInPerson.label, value: data.hoursHeldInPerson, fill: chartConfig.hoursHeldInPerson.color },
    { name: chartConfig.hoursCanceledStudentOnTime.label, value: data.hoursCanceledStudentOnTime, fill: chartConfig.hoursCanceledStudentOnTime.color },
    { name: chartConfig.hoursCanceledTeacherOnTime.label, value: data.hoursCanceledTeacherOnTime, fill: chartConfig.hoursCanceledTeacherOnTime.color },
    { name: chartConfig.hoursCanceledStudentLateVirtual.label, value: data.hoursCanceledStudentLateVirtual, fill: chartConfig.hoursCanceledStudentLateVirtual.color },
    { name: chartConfig.hoursCanceledStudentLateInPerson.label, value: data.hoursCanceledStudentLateInPerson, fill: chartConfig.hoursCanceledStudentLateInPerson.color },
    { name: chartConfig.hoursCanceledTeacherLate.label, value: data.hoursCanceledTeacherLate, fill: chartConfig.hoursCanceledTeacherLate.color },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Grafico pastel - Mes Actual</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({ outerRadius = 0, ...props }) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
      </CardFooter>
    </Card>
  )
}
