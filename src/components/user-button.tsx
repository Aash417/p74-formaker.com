'use client';
import { DottedSeparator } from '@/components/dotted-separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

export function UserButton() {
   const { data } = useSession();
   if (!data) return <div>...</div>;
   if (!data.user?.name || !data.user.email) return;

   const { name, email } = data.user;

   const avatarFallback = name
      ? name.charAt(0).toUpperCase()
      : email.charAt(0).toUpperCase();

   return (
      <DropdownMenu modal={false}>
         <DropdownMenuTrigger className="relative outline-none">
            <Avatar className="size-10 border border-neutral-300 transition hover:opacity-75">
               <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500">
                  {avatarFallback}
               </AvatarFallback>
            </Avatar>
         </DropdownMenuTrigger>
         <DropdownMenuContent
            align="end"
            side="bottom"
            className="w-60"
            sideOffset={10}
         >
            <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
               <Avatar className="size-[52px] border border-neutral-300">
                  <AvatarFallback className="bg-neutral-200 text-xl font-medium text-neutral-500">
                     {avatarFallback}
                  </AvatarFallback>
               </Avatar>
               <div className="flex flex-col items-center justify-center">
                  <p className="text-sm font-medium text-neutral-900">
                     {name || 'User'}
                  </p>
                  <p className="text-xs text-neutral-500">{email}</p>
               </div>
            </div>

            <DottedSeparator className="mb-1" />
            <DropdownMenuItem
               onClick={() => signOut()}
               className="flex h-10 cursor-pointer items-center justify-center font-medium text-amber-700"
            >
               <LogOut className="mr-2 size-4" />
               Log out
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}

export default UserButton;
