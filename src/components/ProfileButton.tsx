
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CreditCard, HelpCircle, LogOut, Settings, User as UserIcon, Users } from 'lucide-react';
import { Badge } from './ui/badge';

export function ProfileButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full hover:scale-110 transition-all duration-200"
        >
          <Avatar className="h-9 w-9 border-2 border-transparent group-hover:border-primary transition-colors">
            <AvatarImage src="https://picsum.photos/seed/user-avatar/100/100" alt="User avatar" data-ai-hint="user avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal p-3">
          <div className="flex items-center gap-3">
             <Avatar className="h-10 w-10">
                <AvatarImage src="https://picsum.photos/seed/user-avatar/100/100" alt="User avatar" data-ai-hint="user avatar" />
                <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className='space-y-1'>
                <p className="text-sm font-medium leading-none text-foreground">Muhammad Emon</p>
                <p className="text-xs leading-none text-muted-foreground">
                    helloeemon@gmail.com
                </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem className='cursor-pointer'>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Users className="mr-2 h-4 w-4" />
            <span>Community</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Subscription</span>
            <Badge variant="outline" className='ml-auto border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400 font-semibold'>PRO</Badge>
          </DropdownMenuItem>
           <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="p-1">
             <DropdownMenuItem className="cursor-pointer">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help Center</span>
            </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-500/90 focus:bg-red-500/10 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
