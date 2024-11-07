import React from 'react';

const Card = ({ image, name, companyName, nit, status, onClick, data }) => {
  return (
        <div className="bg-white shadow-lg rounded-lg p-4 relative" onClick={onClick}>
          {/* Encabezado de estado */}
          
          {/* Imagen */}
          <div className="mt-8">
            <img src={image} alt={name} className="h-32 w-full object-cover rounded-md" />
          </div>
          
          {/* Información */}
          <div className="mt-4">
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-sm text-gray-500">Nombre de la empresa: {companyName}</p>
            <p className="text-sm text-gray-400">NIT: {nit}</p>
            <p className='text-sm text-gray-400'>Id Team: {data.company.id}</p>
          </div>
        </div>
  );
};

export default Card;
