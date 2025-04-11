
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useTasks } from '@/contexts/TaskContext';
import { CategoryManager } from './CategoryManager';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const { tasks } = useTasks();
  const isMobile = useIsMobile();
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  
  // Calculate completion percentage
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;
  
  const statsData = [
    { label: 'Total Tasks', value: totalTasks },
    { label: 'Completed', value: completedTasks },
    { label: 'Pending', value: pendingTasks },
  ];

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      <div className="space-y-6 p-4">
        {/* Stats overview */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Overview</h3>
          
          <div className="grid grid-cols-3 gap-2">
            {statsData.map((stat) => (
              <div key={stat.label} className="bg-background p-3 rounded-lg border text-center">
                <div className="text-2xl font-semibold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {totalTasks > 0 && (
            <div className="mt-4 space-y-1">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{completionPercentage}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-taskquest-purple h-2 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        
        {/* Category manager */}
        <CategoryManager />
      </div>
    </div>
  );
  
  return isMobile ? (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="pb-4">
          <SheetTitle>TaskQuest</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-80px)]">
          <SidebarContent />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  ) : (
    <aside className={`border-r w-[250px] lg:w-[300px] h-screen bg-gray-50 dark:bg-gray-900 hidden md:block ${className}`}>
      <ScrollArea className="h-full">
        <SidebarContent />
      </ScrollArea>
    </aside>
  );
};
