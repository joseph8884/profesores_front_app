import React, { useState, useEffect, useRef } from 'react';
import { Calendar } from '../../ui/calendar';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { getClassesByTeacherAndDateTimeBetweenDays } from '../../../provider/profesor/ListClasess/getClassesByTeacherAndDateTimeBetweenDays';

const DateRangePicker = ({ startDate, setStartDate, endDate, setEndDate}) => {

  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
    if (startDate && endDate) {
      const startDateString =
      new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
        .toISOString()
        .split('T')[0] + 'T00:00:00Z';

    const endDateString =
      new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
        .toISOString()
        .split('T')[0] + 'T23:59:59Z';
      await getClassesByTeacherAndDateTimeBetweenDays(startDateString, endDateString)
        .then((data) => {
          console.log("Clases encontradas:", data);
        })
        .catch((error) => {
          console.error("Error al obtener clases:", error);
        });
    }
  }
  fetchData();
  }, [startDate, endDate]);
  
  // Obtener el primer y último día del mes actual
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const handleSelect = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
        setIsOpen(false); // Cerrar calendario cuando se completa el rango
      }
    }
  };

  // Cerrar el calendario cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const disableDate = (date) => {
    const currentMonth = now.getMonth();
    const dateMonth = date.getMonth();
    return currentMonth !== dateMonth;
  };

  const isDateInRange = (date) => {
    if (startDate && endDate) {
      return date >= startDate && date <= endDate;
    }
    return false;
  };

  return (
    <div className="relative" ref={calendarRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex gap-2 cursor-pointer p-2 border rounded-md hover:bg-gray-50 w-fit"
      >
        <Badge variant="secondary" className="min-w-32">
          {startDate ? startDate.toLocaleDateString() : 'Fecha inicio'}
        </Badge>
        <Badge variant="secondary" className="min-w-32">
          {endDate ? endDate.toLocaleDateString() : 'Fecha fin'}
        </Badge>
      </div>

      {isOpen && (
        <Card className="absolute mt-2 z-50 shadow-lg">
          <CardContent className="p-2">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={handleSelect}
              disabled={disableDate}
              modifiers={{
                selected: (date) => isDateInRange(date),
                today: (date) => date.toDateString() === new Date().toDateString(),
              }}
              modifiersClassNames={{
                selected: 'bg-blue-500 text-white hover:bg-blue-600',
                today: 'font-bold border border-blue-500',
              }}
              className="rounded-md border"
              fromDate={firstDayOfMonth}
              toDate={lastDayOfMonth}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DateRangePicker;