import React, { useState, useEffect } from 'react';

const ProgressSection = () => {
    const [progress, setProgress] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setIsRunning(false);
                        setShowSnackbar(true);
                        // Hide snackbar after 3 seconds
                        setTimeout(() => setShowSnackbar(false), 3000);
                        return 100;
                    }
                    return prev + 5;
                });
            }, 200);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const handleStart = () => {
        setProgress(0);
        setIsRunning(true);
        setShowSnackbar(false);
    };

    return (
        <div className="container my-5 p-4 bg-light rounded shadow-sm position-relative">
            <h2 className="mb-4">Práctica 3: Feedback y Carga de Datos</h2>
            
            <div className="mb-4">
                <button 
                    className="btn btn-primary d-flex align-items-center" 
                    onClick={handleStart}
                    disabled={isRunning}
                >
                    {isRunning && (
                        <div className="spinner-border spinner-border-sm me-2" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    )}
                    {isRunning ? 'Cargando datos...' : 'Cargar datos'}
                </button>
            </div>

            <div className="progress" style={{ height: '30px' }}>
                <div 
                    className="progress-bar progress-bar-striped progress-bar-animated" 
                    role="progressbar" 
                    style={{ width: `${progress}%` }} 
                    aria-valuenow={progress} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                >
                    {progress}%
                </div>
            </div>

            {/* Snackbar/Toast Notification */}
            {showSnackbar && (
                <div 
                    className="position-fixed bottom-0 start-50 translate-middle-x mb-4 p-3 bg-success text-white rounded shadow-lg" 
                    style={{ zIndex: 1050, minWidth: '250px' }}
                >
                    <div className="d-flex justify-content-between align-items-center">
                        <span>¡Carga completada con éxito!</span>
                        <button type="button" className="btn-close btn-close-white ms-3" onClick={() => setShowSnackbar(false)}></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProgressSection;
