import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { toast } from 'sonner';
import type { Table } from '~/store/tableState/table.types';
import { TableStatus, TableSize } from '~/store/tableState/table.types';
import React from 'react';
import { CreateTable, UpdateTable } from '~/services/table.service';

// Validation schema for table editing
const editTableSchema = z.object({
  number: z
    .string()
    .min(1, 'Table number is required')
    .max(10, 'Table number must be less than 10 characters'),
  status: z.nativeEnum(TableStatus, {
    errorMap: () => ({ message: 'Please select a valid status' }),
  }),
  size: z.nativeEnum(TableSize, {
    errorMap: () => ({ message: 'Please select a valid size' }),
  }),
  floor: z.coerce.number().min(1, 'Floor must be at least 1').max(10, 'Floor must be 10 or less'),
});

type EditTableFormData = z.infer<typeof editTableSchema>;

interface EditTableDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  table: Table | null;
  mode: 'edit' | 'add';
  onSuccuss: () => void;
}

const EditTableDailog = ({ open, setOpen, table, mode, onSuccuss }: EditTableDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EditTableFormData>({
    resolver: zodResolver(editTableSchema),
    defaultValues: {
      number: table?.number || '',
      status: table?.status || TableStatus.AVAILABLE,
      size: table?.size || TableSize.MEDIUM,
      floor: table?.floor || 1,
    },
  });

  // Reset form when table changes
  React.useEffect(() => {
    if (table) {
      form.reset({
        number: table.number,
        status: table.status,
        size: table.size,
        floor: table.floor,
      });
    }
  }, [table, form]);

  const handleUpdateTable = async (updatedTable: EditTableFormData) => {
    setIsSubmitting(true);
    try {
      if (mode === 'add') {
        const response = await CreateTable(updatedTable);
        if (response?.statusCode === 201) {
          toast.success('Table updated successfully');
          onSuccuss();
        }
      }
      if (mode === 'edit' && table) {
        const response = await UpdateTable({
          ...updatedTable,
          id: table.id,
        });
        if (response?.statusCode === 201) {
          toast.success('Table updated successfully');
          onSuccuss();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to update table');
    } finally {
      setOpen(false);
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Table {table?.number}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdateTable)} className="space-y-4">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Table Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter table number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={TableStatus.AVAILABLE}>Available</SelectItem>
                      <SelectItem value={TableStatus.OCCUPIED}>Occupied</SelectItem>
                      <SelectItem value={TableStatus.RESERVED}>Reserved</SelectItem>
                      <SelectItem value={TableStatus.ORDERING}>Ordering</SelectItem>
                      <SelectItem value={TableStatus.NEEDS_CLEANING}>Needs Cleaning</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Table Size</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={TableSize.SMALL}>Small (2-4 people)</SelectItem>
                      <SelectItem value={TableSize.MEDIUM}>Medium (4-6 people)</SelectItem>
                      <SelectItem value={TableSize.LARGE}>Large (6+ people)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="floor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Floor</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter floor number"
                      {...field}
                      min={1}
                      max={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit">{isSubmitting ? 'Saving...' : 'Save Changes'}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTableDailog;
