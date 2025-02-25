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
  classesHeldVirtual: {
    label: "Horas Virtuales Realizadas",
    color: "hsl(var(--chart-2))",
  },
  classesHeldInPerson: {
    label: "Horas Presenciales Realizadas",
    color: "hsl(var(--chart-3))",
  },
  hoursCanceledParticipantOnTime: {
    label: "Horas Canceladas por Participante a Tiempo",
    color: "hsl(var(--chart-4))",
  },
  hoursCanceledTeacherOnTime: {
    label: "Horas Canceladas por Profesor a Tiempo",
    color: "hsl(var(--chart-5))",
  },
  hoursCanceledParticipantLateVirtual: {
    label: "Horas Canceladas por Participante Tarde (Virtual)",
    color: "hsl(var(--chart-6))",
  },
  hoursCanceledParticipantLateInPerson: {
    label: "Horas Canceladas por Participante Tarde (Presencial)",
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
    { name: chartConfig.classesHeldVirtual.label, value: data.hoursHeldVirtual, fill: chartConfig.classesHeldVirtual.color },
    { name: chartConfig.classesHeldInPerson.label, value: data.hoursHeldInPerson, fill: chartConfig.classesHeldInPerson.color },
    { name: chartConfig.hoursCanceledParticipantOnTime.label, value: data.hoursCanceledStudentOnTime, fill: chartConfig.hoursCanceledParticipantOnTime.color },
    { name: chartConfig.hoursCanceledTeacherOnTime.label, value: data.hoursCanceledTeacherOnTime, fill: chartConfig.hoursCanceledTeacherOnTime.color },
    { name: chartConfig.hoursCanceledParticipantLateVirtual.label, value: data.hoursCanceledStudentLateVirtual, fill: chartConfig.hoursCanceledParticipantLateVirtual.color },
    { name: chartConfig.hoursCanceledParticipantLateInPerson.label, value: data.hoursCanceledStudentLateInPerson, fill: chartConfig.hoursCanceledParticipantLateInPerson.color },
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
