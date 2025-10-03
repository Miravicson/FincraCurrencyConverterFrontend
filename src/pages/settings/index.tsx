import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PageTitle } from '@/components/PageTitle';
import { useAuth } from '@/lib/auth-provider-hooks';

export default function Profile() {
  const { user: authUser } = useAuth();
  const { profile } = authUser || {};
  const role = authUser?.role || '';
  return (
    <>
      <PageTitle text="Settings" />

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6 border-b w-full rounded-none bg-transparent p-0 h-auto">
          <TabsTrigger
            value="profile"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-4 py-2"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="manage-staff"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-4 py-2"
            asChild
          ></TabsTrigger>
          <TabsTrigger
            value="hospital"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-4 py-2"
          >
            Hospital
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-0">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 bg-gray-200">
                <AvatarFallback>JA</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">
                  {profile?.firstName} {profile?.lastName}
                </div>
                <div className="text-sm text-gray-500">{role}</div>
              </div>
            </div>
            <Button
              variant="outline"
              className="bg-black text-white hover:bg-black/90"
            >
              Edit Profile
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              <Input defaultValue={profile?.firstName || ''} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              <Input defaultValue={profile?.lastName || ''} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">User Role</label>
              <div className="relative">
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  <option>Super Admin</option>
                  <option>Admin</option>
                  <option>Viewer</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="flex items-center gap-2">
                <Input type="password" defaultValue="password" />
                <Button variant="link" className="text-sm h-auto p-0">
                  Change Password
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
