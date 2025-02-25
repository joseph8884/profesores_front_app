import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { ChevronDown, ChevronUp } from "lucide-react";
import sampleEvents from './Clases fake.json';

const ListClasses = ({ startDate, endDate }) => {
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [expandedDates, setExpandedDates] = useState({}); // New state for dates

  const filteredEvents = sampleEvents.filter(event => {
    if (!startDate || !endDate) return false;
    const eventDate = new Date(event.Date);
    return eventDate >= startDate && eventDate <= endDate;
  });

  // Agrupar eventos por fecha
  const groupedEvents = filteredEvents.reduce((acc, event) => {
    const dateStr = new Date(event.Date).toLocaleDateString();
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(event);
    return acc;
  }, {});

  const toggleExpand = (index) => {
    setExpandedEventId(expandedEventId === index ? null : index);
  };

  const toggleDate = (date) => {
    setExpandedDates(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Need to Register": return "bg-yellow-100 text-yellow-800";
      case "Registered": return "bg-green-100 text-green-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      {filteredEvents.length === 0 ? (
        <Card>
          <CardContent className="p-4 text-center">
            {startDate && endDate 
              ? "No hay eventos en el rango de fechas seleccionado" 
              : "Selecciona un rango de fechas para ver los eventos"}
          </CardContent>
        </Card>
      ) : (
        <div>
          <div className="text-xl font-bold mb-4">
            Eventos ({filteredEvents.length})
          </div>
          
          {Object.entries(groupedEvents).map(([date, events]) => (
            <Card key={date} className="mb-2">
              <CardContent className="p-4">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleDate(date)}
                >
                  <h2 className="text-lg font-semibold">
                    {date} ({events.length} clases)
                  </h2>
                  {expandedDates[date] ? 
                    <ChevronUp className="h-5 w-5" /> : 
                    <ChevronDown className="h-5 w-5" />
                  }
                </div>

                {expandedDates[date] && (
                  <div className="mt-4 space-y-2">
                    {events.map((event, index) => {
                      const originalIndex = filteredEvents.indexOf(event);
                      return (
                        <Card key={originalIndex} className="border">
                          <CardContent className="p-4">
                            <div 
                              className="flex justify-between items-center cursor-pointer"
                              onClick={() => toggleExpand(originalIndex)}
                            >
                              <div className="space-y-1">
                                <div className="font-medium">{event["Class Name"]}</div>
                                <div className="text-sm text-gray-500">
                                  {new Date(event.Date).toLocaleTimeString()}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Badge className={getStatusColor(event["State of the Object"])}>
                                  {event["State of the Object"]}
                                </Badge>
                                {expandedEventId === originalIndex ? 
                                  <ChevronUp className="h-5 w-5" /> : 
                                  <ChevronDown className="h-5 w-5" />
                                }
                              </div>
                            </div>

                            {expandedEventId === originalIndex && (
                              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <div className="text-gray-500">Fecha completa</div>
                                  <div>{new Date(event.Date).toLocaleDateString()}</div>
                                </div>
                                <div>
                                  <div className="text-gray-500">Estado</div>
                                  <div>{event["State of the Object"]}</div>
                                </div>
                                <div>
                                  <div className="text-gray-500">Clase celebrada</div>
                                  <div>{event["Class Held"] ? "Sí" : "No"}</div>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListClasses;