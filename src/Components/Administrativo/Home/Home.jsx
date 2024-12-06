import React from "react";
import NavMobile from "../Nav/NavMobile";
import NavWeb from "../Nav/NavWeb";
const AdminGuide = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar Hamburguesa para pantallas pequeñas */}
      <NavMobile />
      {/* Sidebar para pantallas grandes */}
      <NavWeb />

      {/* Contenido Principal */}
      <div className="flex-1 p-6 bg-gray-100">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Guía Administrativa</h1>
          <p className="text-sm text-gray-600">Cómo usar la plataforma de registro de horas</p>
        </header>

        <section>
          <h2 className="text-xl font-bold mb-4">Configura y Administra el Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-blue-500 text-white flex items-center justify-center mb-2">1</div>
              <p className="text-center">Accede al panel administrativo para controlar todas las clases y las horas de los estudiantes y grupos.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-blue-500 text-white flex items-center justify-center mb-2">2</div>
              <p className="text-center">Genera reportes mensuales de las clases y profesores activos.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-blue-500 text-white flex items-center justify-center mb-2">3</div>
              <p className="text-center">Contacta al soporte para solucionar problemas comunes a través del correo ayuda@profesoresextranjeros.com.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminGuide;
