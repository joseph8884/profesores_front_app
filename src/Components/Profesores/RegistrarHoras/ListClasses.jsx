import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { ChevronDown, ChevronUp } from "lucide-react";
import sampleEvents from './Clases fake.json';

const ListClasses = ({ startDate, endDate}) => {

  const [expandedEventId, setExpandedEventId] = useState(null);


  // Filtrar eventos según el rango de fechas
  const filteredEvents = sampleEvents.filter(event => {
    if (!startDate || !endDate) return false;
    
    const eventDate = new Date(event.Date);
    return eventDate >= startDate && eventDate <= endDate;
  });

  const toggleExpand = (index) => {
    if (expandedEventId === index) {
      setExpandedEventId(null);
    } else {
      setExpandedEventId(index);
    }
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
    <div className="space-y-4 max-w-2xl mx-auto">

      {/* Lista de Eventos */}
      <div className="mt-4 space-y-2">
        {filteredEvents.length === 0 ? (
          <div className="text-center text-gray-500">
            {startDate && endDate 
              ? "No hay eventos en el rango de fechas seleccionado" 
              : "Selecciona un rango de fechas para ver los eventos"}
          </div>
        ) : (
          <>
            <h3 className="text-lg font-medium">
              Eventos ({filteredEvents.length})
            </h3>
            
            {filteredEvents.map((event, index) => (
              <Card key={index} className="overflow-hidden">
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleExpand(index)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-medium">{new Date(event.Date).toLocaleDateString()}</span>
                    <span className="text-gray-700">{event["Class Name"]}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge 
                      className={getStatusColor(event["State of the Object"])}
                    >
                      {event["State of the Object"]}
                    </Badge>
                    
                    {expandedEventId === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
                
                {expandedEventId === index && (
                  <CardContent className="bg-gray-50 p-4 border-t">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Fecha</p>
                        <p>{new Date(event.Date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Nombre de la clase</p>
                        <p>{event["Class Name"]}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Estado</p>
                        <p>{event["State of the Object"]}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Clase celebrada</p>
                        <p>{event["Class Held"] ? "Sí" : "No"}</p>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ListClasses;