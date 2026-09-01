"use client"
import { Button } from '@/components/ui/button'
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxValue, useComboboxAnchor } from '@/components/ui/combobox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { TechStackItem } from '@/lib/types/techStack-type'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image';
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { useTechStackStore } from '@/store/TechStackStore'

const skillSchema = z.object({
  techStack: z.array(z.string()).min(1, "At least one skill is required"),
})
export default function AddSkills() {
  const anchor = useComboboxAnchor()
  
  const { techStack } = useTechStackStore();
  
  const form = useForm({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      techStack: [],
    }
  })

  const onSubmit = (data: z.infer<typeof skillSchema>) => {
    console.log("Selected skills:", data.techStack);
  }
  return (
    <Dialog>
      <DialogTrigger render={
        <Button variant="outline" className={"w-fit mx-auto"}/>}

        className="w-fit mx-auto text-center"
      >
        Add Skills
      </DialogTrigger>
      <DialogContent className="sm:max-w-106">
        <DialogHeader>
          <DialogTitle>Add Skills</DialogTitle>
          <DialogDescription>
            Add a new skill to your profile.
          </DialogDescription>
        </DialogHeader>
        {/* Add your form or content here */}
        <form onSubmit={()=>form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="techStack"
            control={form.control}
            render={({ field, fieldState }) => {
              const selectedValues = Array.isArray(field.value) ? field.value : [];

              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Tech Stack</FieldLabel>

                  <Combobox
                    multiple
                    items={techStack}
                    value={selectedValues}
                    onValueChange={(val) => field.onChange(val)}
                  >
                    <ComboboxChips ref={anchor} className="w-full">
                      <ComboboxValue>
                        {(values) => {
                          const selectedItems = techStack.filter((item) =>
                            values.includes(item.id),
                          );

                          return (
                            <>
                              {selectedItems.map((item) => (
                                <ComboboxChip key={item.id}>
                                  {item?.image && (
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      width={14}
                                      height={14}
                                    />
                                  )}
                                  {item.name}
                                </ComboboxChip>
                              ))}
                              <ComboboxChipsInput
                                id={field.name}
                                onBlur={field.onBlur}
                                placeholder="Select your technology"
                              />
                            </>
                          );
                        }}
                      </ComboboxValue>
                    </ComboboxChips>

                    <ComboboxContent anchor={anchor}>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item: TechStackItem) => (
                          <ComboboxItem key={item.id} value={item.id}>
                            {item?.image && (
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={14}
                                height={14}
                              />
                            )}
                            {item.name}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              );
            }}
          />
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="submit">Add</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
