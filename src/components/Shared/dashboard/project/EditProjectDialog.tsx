"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // na thakle: npx shadcn@latest add dialog
import type { Project } from "@/lib/types/project-type";
import ProjectForm from "./ProjectForm";

type EditProjectDialogProps = {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EditProjectDialog({
  project,
  open,
  onOpenChange,
}: EditProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* DialogContent bondho thakle unmount hoy, tai form (ar combobox)
          shudhu edit er somoy-i memory te thake */}
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit project</DialogTitle>
          <DialogDescription>
            Update the details of {project.name}.
          </DialogDescription>
        </DialogHeader>
        <ProjectForm project={project} onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
