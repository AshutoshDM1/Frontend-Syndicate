import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useState } from 'react';
import { CreateCategory } from '~/services/category.service';
import { toast } from 'sonner';

const AddCategoryDialog = ({
  showCategoryDialog,
  setShowCategoryDialog,
  refetch,
}: {
  showCategoryDialog: boolean;
  setShowCategoryDialog: (show: boolean) => void;
  refetch: () => void;
}) => {
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    isActive: true,
  });

  const handleAddCategory = async () => {
    try {
      toast.loading('Adding category...');
      await CreateCategory(newCategory);
      toast.dismiss();
      toast.success('Category added successfully');
      setNewCategory({
        name: '',
        description: '',
        isActive: true,
      });
      setShowCategoryDialog(false);
      refetch();
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error('Failed to add category');
    }
  };

  return (
    <>
      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent className='w-full max-w-md' >
          <DialogClose onClick={() => setShowCategoryDialog(false)} />
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category Name</label>
              <Input
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="Enter category name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Input
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                placeholder="Enter category description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowCategoryDialog(false);
              setNewCategory({
                name: '',
                description: '',
                isActive: true,
              });
            }}>
              Cancel
            </Button>
            <Button onClick={handleAddCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddCategoryDialog;
