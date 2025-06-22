import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TableSVGProps {
  tableNumber: string;
  status: 'available' | 'occupied' | 'reserved' | 'ordering' | 'needs-cleaning';
  time?: string;
  reservationId?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const TableSVG: React.FC<TableSVGProps> = ({ 
  tableNumber, 
  status, 
  time, 
  reservationId, 
  isSelected = false, 
  onClick 
}) => {
  // Get colors based on status
  const getStatusColors = () => {
    switch (status) {
      case 'available':
        return {
          bg: '#dcfce7',
          border: '#22c55e',
          text: '#166534',
          accent: '#16a34a'
        };
      case 'occupied':
        return {
          bg: '#fecaca',
          border: '#ef4444',
          text: '#dc2626',
          accent: '#f87171'
        };
      case 'reserved':
        return {
          bg: '#dbeafe',
          border: '#3b82f6',
          text: '#1e40af',
          accent: '#60a5fa'
        };
      case 'ordering':
        return {
          bg: '#fed7aa',
          border: '#f97316',
          text: '#ea580c',
          accent: '#fb923c'
        };
      case 'needs-cleaning':
        return {
          bg: '#e5e7eb',
          border: '#6b7280',
          text: '#374151',
          accent: '#9ca3af'
        };
      default:
        return {
          bg: '#ffffff',
          border: '#e5e7eb',
          text: '#374151',
          accent: '#6b7280'
        };
    }
  };

  const colors = getStatusColors();

  return (
    <div 
      className={`relative select-none cursor-pointer transition-all duration-200 hover:scale-103 ${
        isSelected ? 'scale-103' : ''
      }`}
      onClick={onClick}
    >
      {/* Selection Ring */}
      <AnimatePresence>
        {isSelected && (
          <motion.div 
            className="absolute -inset-2 bg-blue-400 rounded-full"
            initial={{ 
              scale: 0.8, 
              opacity: 0,
              rotate: 0
            }}
            animate={{ 
              scale: [0.8, 1.1, 1.05],
              opacity: [0, 0.4, 0.3],
              rotate: [0, 5, -5, 0]
            }}
            exit={{ 
              scale: 0.8,
              opacity: 0,
              rotate: 10,
              transition: { duration: 0.2 }
            }}
            transition={{
              duration: 0.6,
              times: [0, 0.6, 1],
              ease: "easeOut",
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 0.3
            }}
          />
        )}
      </AnimatePresence>
      
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        className="drop-shadow-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Define patterns */}
        <defs>
          <pattern id={`dots-${tableNumber}`} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="6" cy="6" r="1.5" fill={colors.accent} opacity="0.6"/>
          </pattern>
        </defs>

        {/* Background circle - centered */}
        <circle cx="150" cy="150" r="135" fill="#f3f4f6" opacity="0"/>
        
        {/* Side buttons/speakers */}
        <rect x="30" y="112" width="12" height="38" rx="6" fill={colors.accent}/>
        <rect x="258" y="112" width="12" height="38" rx="6" fill={colors.accent}/>
        
        {/* Main device body - centered */}
        <rect x="60" y="45" width="180" height="180" rx="18" fill={colors.bg} stroke={colors.border} strokeWidth="2"/>
        
        {/* Top section with labels */}
        <rect x="68" y="53" width="164" height="38" rx="12" fill={colors.bg}/>
        
        {/* Table number label */}
        <rect x="75" y="60" width="38" height="23" rx="6" fill={colors.accent}/>
        <text x="94" y="75" textAnchor="middle" fill="white" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold">{tableNumber}</text>
        
        {/* Order/Reservation ID label */}
        {reservationId && (
          <>
            <rect x="180" y="60" width="45" height="23" rx="6" fill={colors.accent}/>
            <text x="202.5" y="75" textAnchor="middle" fill="white" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold">{reservationId}</text>
          </>
        )}
        
        {/* Dotted pattern in main area */}
        <rect x="68" y="98" width="164" height="90" fill={`url(#dots-${tableNumber})`}/>
        
        {/* Status section */}
        <rect x="68" y="195" width="164" height="23" rx="9" fill={colors.bg}/>
        
        {/* Status content */}
        {status === 'occupied' && (
          <>
            {/* Occupied icon */}
            <circle cx="83" cy="206.5" r="4.5" fill={colors.accent}/>
            <rect x="80" y="204" width="6" height="4.5" fill="white"/>
            {/* Status text */}
            <text x="98" y="210" fill={colors.text} fontFamily="Arial, sans-serif" fontSize="12" fontWeight="500">
              {time ? `Occupied ${time}` : 'Occupied'}
            </text>
          </>
        )}
        
        {status === 'ordering' && (
          <>
            {/* Ordering icon */}
            <circle cx="83" cy="206.5" r="4.5" fill={colors.accent}/>
            <rect x="80" y="204" width="6" height="4.5" fill="white"/>
            {/* Status text */}
            <text x="98" y="210" fill={colors.text} fontFamily="Arial, sans-serif" fontSize="12" fontWeight="500">
              {time ? `Ordering ${time}` : 'Taking Order'}
            </text>
          </>
        )}
        
        {status === 'reserved' && (
          <>
            {/* Reserved icon */}
            <circle cx="83" cy="206.5" r="4.5" fill={colors.accent}/>
            <rect x="80" y="204" width="6" height="4.5" fill="white"/>
            {/* Status text */}
            <text x="98" y="210" fill={colors.text} fontFamily="Arial, sans-serif" fontSize="12" fontWeight="500">
              {time ? `Reserved ${time}` : 'Reserved'}
            </text>
          </>
        )}
        
        {status === 'available' && (
          <>
            {/* Available icon */}
            <circle cx="83" cy="206.5" r="4.5" fill={colors.accent}/>
            <rect x="80" y="204" width="6" height="4.5" fill="white"/>
            {/* Status text */}
            <text x="98" y="210" fill={colors.text} fontFamily="Arial, sans-serif" fontSize="12" fontWeight="500">Available</text>
          </>
        )}
        
        {status === 'needs-cleaning' && (
          <>
            {/* Cleaning icon */}
            <circle cx="83" cy="206.5" r="4.5" fill={colors.accent}/>
            <rect x="80" y="204" width="6" height="4.5" fill="white"/>
            {/* Status text */}
            <text x="98" y="210" fill={colors.text} fontFamily="Arial, sans-serif" fontSize="12" fontWeight="500">Needs Cleaning</text>
          </>
        )}
        
        {/* Bottom connector/button */}
        <rect x="128" y="240" width="45" height="12" rx="6" fill={colors.accent}/>
      </svg>
    </div>
  );
};

export default TableSVG; 