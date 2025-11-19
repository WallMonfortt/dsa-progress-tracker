
export function Explanation() {
    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 dark:bg-gray-800 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-blue-800 mb-3 dark:text-blue-400">
                Cómo Funciona la Repetición Espaciada
            </h3>
            <div className="text-blue-700 space-y-2 dark:text-blue-400">
                <p>
                    Este rastreador usa repetición espaciada para ayudarte a retener problemas de programación
                    a largo plazo.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 className="font-semibold mb-2">Calendario de Revisiones:</h4>
                        <ul className="space-y-1 text-sm">
                            <li>
                                <strong>R1:</strong> Revisar después de 3 días
                            </li>
                            <li>
                                <strong>R2:</strong> Revisar después de 5 días
                            </li>
                            <li>
                                <strong>R3:</strong> Revisar después de 9 días
                            </li>
                            <li>
                                <strong>R4:</strong> Revisar después de 17 días
                            </li>
                            <li>
                                <strong>R5:</strong> Revisar después de 33 días
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Cómo Usar:</h4>
                        <ul className="space-y-1 text-sm">
                            <li>1. Marca un problema como resuelto cuando lo completes</li>
                            <li>2. Los botones de revisión (R1-R5) mostrarán las fechas requeridas</li>
                            <li>
                                3. Haz clic en los botones de revisión cuando completes la revisión exitosamente
                            </li>
                            <li>4. Usa el filtro "Mostrar problemas pendientes" para ver qué necesita revisión</li>
                            <li>5. Consulta el Roadmap Oficial para guía de estudio</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
