import React, { useEffect } from "react";
import "./Toast.css";

const Icons = {
    success: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="#10B981" />
        </svg>
    ),
    info: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z" fill="#6366f1" />
        </svg>
    ),
    error: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="#ef4444" />
        </svg>
    )
};

export default function Toast({
    type = "info",
    message,
    actionLabel,
    onAction,
    onClose,
    duration = 3000
}) {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [onClose, duration]);

    return (
        <div className="global-toast-container">
            <div className={`global-toast global-toast--${type}`}>
                <div className="global-toast__icon">
                    {Icons[type] || Icons.info}
                </div>
                <span className="global-toast__message">{message}</span>
                {actionLabel && (
                    <button className="global-toast__action" onClick={(e) => {
                        e.stopPropagation();
                        onAction?.();
                        onClose();
                    }}>
                        {actionLabel}
                    </button>
                )}
                <button className="global-toast__close" onClick={onClose} aria-label="Dismiss">
                    ×
                </button>
            </div>
        </div>
    );
}
