import React from 'react';

import './error-notification.styles.css';

const ErrorNotification = ({errors}) => (
    <div className="error-notification">{
        errors.map((error,idx) => (
            <span key={idx} >{error}</span>
        ))}
    </div>
)

export default ErrorNotification;