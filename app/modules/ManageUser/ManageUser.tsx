import { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '~/components/ui/table';
import { Button } from '~/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { GetUserDetailTable, UpdateUser } from '~/services/user.service';
import { CheckIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { UserRole } from '~/store/userStete/user.type';
import { useUserStore } from '~/store/userStete/user.state';
import { useQuery } from '@tanstack/react-query';

type Filter = 'ALL' | UserRole;

const ManageUser = () => {
  const { users, setUsers } = useUserStore();
  const [filter, setFilter] = useState<Filter>('ALL');

  const { isPending, isError, isSuccess, data, error, refetch } = useQuery({
    queryKey: ['users', filter],
    queryFn: () => GetUserDetailTable(filter),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUsers(data.data.users);
    }
  }, [isSuccess, data, setUsers]);

  const handleRoleChange = async (id: string, role: UserRole) => {
    try {
      const response = await UpdateUser({ id, role });
      toast.success(response.message);
      refetch();
    } catch (error) {
      console.log(error);
      toast.error('Failed to update user');
    }
  };

  // Get role badge color - dark mode compatible
  const getRoleBadgeClass = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-red-500 dark:bg-red-600 text-white font-medium shadow-sm';
      case UserRole.MANAGER:
        return 'bg-blue-500 dark:bg-blue-600 text-white font-medium shadow-sm';
      case 'ORDER_MANAGER':
        return 'bg-green-500 dark:bg-green-600 text-white font-medium shadow-sm';
      case 'KITCHEN_MANAGER':
        return 'bg-yellow-500 dark:bg-yellow-600 text-white font-medium shadow-sm';
      default:
        return 'bg-primary dark:bg-primary text-white font-medium shadow-sm';
    }
  };

  return (
    <div className="container mx-auto py-6 text-foreground">
      <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">User Management</h1>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <Button
              className="cursor-pointer"
              variant={filter === 'ALL' ? 'default' : 'outline'}
              onClick={() => setFilter('ALL')}
            >
              All
            </Button>
            <Button
              className="cursor-pointer"
              variant={filter === UserRole.ADMIN ? 'default' : 'outline'}
              onClick={() => setFilter(UserRole.ADMIN)}
            >
              Admins
            </Button>
            <Button
              className="cursor-pointer"
              variant={filter === UserRole.MANAGER ? 'default' : 'outline'}
              onClick={() => setFilter(UserRole.MANAGER)}
            >
              Managers
            </Button>
            <Button
              className="cursor-pointer"
              variant={filter === UserRole.ORDER_MANAGER ? 'default' : 'outline'}
              onClick={() => setFilter(UserRole.ORDER_MANAGER)}
            >
              Order Managers
            </Button>
            <Button
              className="cursor-pointer"
              variant={filter === UserRole.KITCHEN_MANAGER ? 'default' : 'outline'}
              onClick={() => setFilter(UserRole.KITCHEN_MANAGER)}
            >
              Kitchen Managers
            </Button>
            <Button
              className="cursor-pointer"
              variant={filter === UserRole.CUSTOMER ? 'default' : 'outline'}
              onClick={() => setFilter(UserRole.CUSTOMER)}
            >
              Customers
            </Button>
          </div>
        </div>
      </div>
      {isPending ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : isError ? (
        <div className="text-center text-muted-foreground py-8">Error: {error?.message}</div>
      ) : (
        <>
          <div className="rounded-lg border border-border bg-card shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Email Verified</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium text-card-foreground">
                        {user.id.slice(0, 8)}
                      </TableCell>
                      <TableCell className="text-card-foreground">{user.name}</TableCell>
                      <TableCell className="text-card-foreground">{user.email}</TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-medium ${getRoleBadgeClass(user.role)}`}
                        >
                          {user.role.split('_').join(' ')}
                        </span>
                      </TableCell>
                      <TableCell className="text-card-foreground">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {user.emailVerified ? (
                          <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                            <CheckIcon className="w-4 h-4" /> Verified
                          </span>
                        ) : (
                          <span className="text-red-600 dark:text-red-400 flex items-center gap-1">
                            <XIcon className="w-4 h-4" /> Unverified
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Select
                          defaultValue={user.role}
                          onValueChange={(value) => handleRoleChange(user.id, value as UserRole)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                            <SelectItem value="MANAGER">Manager</SelectItem>
                            <SelectItem value="ORDER_MANAGER">Order Manager</SelectItem>
                            <SelectItem value="KITCHEN_MANAGER">Kitchen Manager</SelectItem>
                            <SelectItem value="CUSTOMER">Customer</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageUser;
