
import React, { useState, useMemo } from 'react';
import { useTasks } from '@/contexts/TaskContext';
import TaskCard from './TaskCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const TaskList = () => {
  const { tasks, categories } = useTasks();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Search query filter
      const matchesSearch = searchQuery === '' || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = categoryFilter === null || task.categoryId === categoryFilter;
      
      // Status filter
      const matchesStatus = statusFilter === null || 
        (statusFilter === 'completed' && task.completed) || 
        (statusFilter === 'pending' && !task.completed);
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [tasks, searchQuery, categoryFilter, statusFilter]);

  const clearFilters = () => {
    setSearchQuery('');
    setCategoryFilter(null);
    setStatusFilter(null);
  };

  const hasActiveFilters = searchQuery || categoryFilter || statusFilter;

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 animate-fade-in">
        <div className="text-4xl">🚀</div>
        <h3 className="text-xl font-semibold">Start Your Quest!</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          Add your first task to get started on your productivity journey.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search tasks..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Select
            value={categoryFilter || ""}
            onValueChange={(value) => setCategoryFilter(value || null)}
          >
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={statusFilter || ""}
            onValueChange={(value) => setStatusFilter(value || null)}
          >
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <Filter className="h-3.5 w-3.5 mr-1" />
            Filters:
          </span>
          
          {searchQuery && (
            <Badge variant="outline" className="text-xs py-0.5">
              Search: "{searchQuery}"
              <button onClick={() => setSearchQuery('')} className="ml-1">×</button>
            </Badge>
          )}
          
          {categoryFilter && (
            <Badge variant="outline" className="text-xs py-0.5">
              Category: {categories.find(c => c.id === categoryFilter)?.name}
              <button onClick={() => setCategoryFilter(null)} className="ml-1">×</button>
            </Badge>
          )}
          
          {statusFilter && (
            <Badge variant="outline" className="text-xs py-0.5">
              Status: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
              <button onClick={() => setStatusFilter(null)} className="ml-1">×</button>
            </Badge>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters} 
            className="text-xs h-7 px-2"
          >
            Clear All
          </Button>
        </div>
      )}
      
      {filteredTasks.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400">No tasks match your search criteria.</p>
          <Button onClick={clearFilters} variant="link" className="mt-2">
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
