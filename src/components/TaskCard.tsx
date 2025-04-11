
import React from 'react';
import { useTasks } from '@/contexts/TaskContext';
import { Task } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, Clock, Edit, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { EditTaskDialog } from './EditTaskDialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { toggleTaskCompletion, deleteTask, categories } = useTasks();
  const category = task.categoryId ? categories.find(c => c.id === task.categoryId) : null;
  
  // Format the due date if it exists
  const formattedDueDate = task.dueDate ? format(new Date(task.dueDate), 'MMM d, yyyy') : null;
  
  // Check if the task is overdue
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <Card className={`task-card overflow-hidden ${task.completed ? 'completed' : ''} animate-slide-in`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <div className="flex items-start gap-2">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTaskCompletion(task.id)}
              className="mt-1.5"
            />
            <div>
              <CardTitle className={`${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</CardTitle>
              {category && (
                <Badge 
                  className="mt-1"
                  style={{ backgroundColor: category.color }}
                >
                  {category.name}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <CardDescription className={`${task.completed ? 'text-gray-400' : ''} whitespace-pre-wrap`}>
          {task.description}
        </CardDescription>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-3 flex-wrap gap-y-2">
        {formattedDueDate && (
          <div className={`text-xs flex items-center ${isOverdue ? 'text-red-500' : 'text-gray-500'}`}>
            <Clock className="h-3 w-3 mr-1" />
            {formattedDueDate}
            {isOverdue && " (Overdue)"}
          </div>
        )}
        
        <div className="flex gap-2 ml-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <EditTaskDialog task={task} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Task</p>
              </TooltipContent>
            </Tooltip>
            
            <AlertDialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-500">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete Task</p>
                </TooltipContent>
              </Tooltip>
              
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Task</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this task? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
