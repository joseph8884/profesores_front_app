import React from 'react';
import NavMobile from '../Nav/NavMobile';
import NavDesktop from '../Nav/NavWeb';
const TeacherGuide = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar Hamburguesa para pantallas pequeñas */}
      <NavMobile />
      {/* Sidebar para pantallas grandes */}
      <NavDesktop />

      {/* Contenido Principal */}
      <div className="flex-1 p-6 bg-gray-100">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Guía para Profesores</h1>
          <p className="text-sm text-gray-600">Cómo registrar tus horas en la plataforma</p>
        </header>

        <section>
          <h2 className="text-xl font-bold mb-4">Pasos para Registrar Horas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-green-500 text-white flex items-center justify-center mb-2">1</div>
              <p className="text-center">Accede a tu cuenta utilizando tu usuario y contraseña.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-green-500 text-white flex items-center justify-center mb-2">2</div>
              <p className="text-center">Dirígete a la sección de registro de horas y completa la información requerida.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-green-500 text-white flex items-center justify-center mb-2">3</div>
              <p className="text-center">Asegúrate de incluir datos como la temática, duración, fecha, asistentes y si hubo cancelaciones.</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h3 className="text-lg font-bold mb-4">Detalles Importantes</h3>
          <ul className="list-disc pl-6">
            <li className="mb-2">Si cometes un error al registrar tus horas, contacta al administrador para corregirlo.</li>
            <li className="mb-2">Para problemas de acceso, comunícate con el administrador.</li>
            <li>Los registros rechazados por el administrador se eliminan automáticamente.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TeacherGuide;
