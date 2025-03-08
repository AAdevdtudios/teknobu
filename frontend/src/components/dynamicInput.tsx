"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DynamicFormProps } from '@/utils/types';

export default function DynamicForms({
  title,
  description,
  fields,
  onSubmit,
  submitText = "Submit",
  descriptionStyles,
  titleStyles,
  labelStyles = "sr-only",
}: DynamicFormProps) {
  const formSchema = z.object(
    fields.reduce((acc, field) => {
      acc[field.name] = field.schema;
      return acc;
    }, {} as Record<string, z.ZodTypeAny>)
  );

  const enhancedSchema = fields.some(field => field.name === "confirmPassword")
    ? formSchema.refine(
      (data) => data.newPassword === data.confirmPassword,
      {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      }
    )
    : formSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(enhancedSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const [showPassword,] = useState<Record<string, boolean>>({});
  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className='space-y-4'>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className={cn("text-2xl font-semibold tracking-tight", titleStyles)}>
          {title}
        </h1>
        <p className={cn("text-sm text-muted-foreground", descriptionStyles)}>
          {description}
        </p>
      </div>
      <div className="grid gap-6">
        <form onSubmit={handleSubmit(handleFormSubmit)} >
          <div className="grid gap-2">
            {fields.map((field) => (
              <div className="grid gap-1" key={field.name}>
                <Label className={cn(labelStyles)}>
                  {field.label || field.name}
                </Label>
                <Input
                  {...register(field.name)}
                  id={field.name}
                  placeholder={field.placeholder}
                  type={
                    field.isPassword
                      ? showPassword[field.name]
                        ? "text"
                        : "password"
                      : field.type
                  }
                  aria-description={field.label}
                  autoCapitalize="none"
                  autoComplete={field.name}
                  defaultValue={field.defaultValue}
                  autoCorrect="off"
                  disabled={isSubmitting}
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field.name]?.message?.toString()}
                  </p>
                )}
              </div>

            ))}

            <Button disabled={isSubmitting} type="submit">
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {submitText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
