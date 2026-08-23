import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusIcon } from '@animateicons/react/lucide';
import React from 'react'

export default function AddTasks() {
  return (
     <Dialog>
      <DialogTrigger
        render={
          <Button size={"sm"}>
            <PlusIcon /> New Task{" "}
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-6">
            <span
              className={"p-4 bg-primary/10 text-primary w-fit rounded-2xl"}
            >
              <PlusIcon size={30} />
            </span>
            <div>
              <DialogTitle>New Project</DialogTitle>
              <DialogDescription>
                Create new project to start building amazing things
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

      
      </DialogContent>
    </Dialog>
  )
}
