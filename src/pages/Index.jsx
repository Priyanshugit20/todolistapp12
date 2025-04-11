
import React from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import TaskList from '@/components/TaskList';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        {!isMobile && <Sidebar />}
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="taskquest-container py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">My Tasks</h1>
                <p className="text-muted-foreground">Manage your tasks and stay organized</p>
              </div>
              {isMobile && <Sidebar />}
            </div>
            
            <TaskList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
