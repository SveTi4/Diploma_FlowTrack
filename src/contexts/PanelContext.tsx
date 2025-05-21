import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { SidePanel } from '../components/organisms/SidePanel/SidePanel';

type PanelType = 'project' | 'task';

interface PanelData {
  type: PanelType;
  title: ReactNode;
  content: ReactNode;
  onClose?: () => void;
  onUpdate?: (data: Partial<PanelData>) => void;
}

interface PanelContextType {
  openPanel: (data: PanelData) => void;
  closePanel: () => void;
  updatePanel: (data: Partial<PanelData>) => void;
}

const PanelContext = createContext<PanelContextType | undefined>(undefined);

export const PanelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [panelData, setPanelData] = useState<PanelData | null>(null);

  const openPanel = (data: PanelData) => {
    setPanelData({
      ...data,
      onUpdate: (newData) => {
        setPanelData(prev => prev ? { ...prev, ...newData } : null);
      }
    });
  };

  const closePanel = () => {
    setPanelData(null);
  };

  const updatePanel = useCallback((data: Partial<PanelData>) => {
    setPanelData(prev => prev ? { ...prev, ...data } : null);
  }, []);

  return (
    <PanelContext.Provider value={{ openPanel, closePanel, updatePanel }}>
      {children}
      {panelData && (
        <SidePanel
          isOpen={true}
          title={panelData.title}
          onClose={() => {
            panelData.onClose?.();
            closePanel();
          }}
        >
          {panelData.content}
        </SidePanel>
      )}
    </PanelContext.Provider>
  );
};

export const usePanel = () => {
  const context = useContext(PanelContext);
  if (!context) {
    throw new Error('usePanel must be used within a PanelProvider');
  }
  return context;
}; 