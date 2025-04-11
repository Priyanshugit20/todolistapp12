
import React from 'react';
import { BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AddTaskDialog } from './AddTaskDialog';

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b py-3">
      <div className="taskquest-container flex flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center space-x-2">
          <BrainCircuit size={28} className="text-taskquest-purple" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            TaskQuest
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <AddTaskDialog />
        </div>
      </div>
    </header>
  );
};
