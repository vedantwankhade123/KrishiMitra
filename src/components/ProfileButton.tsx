
'use client';

import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProfileButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
    >
      <User className="h-5 w-5" />
      <span className="sr-only">User Profile</span>
    </Button>
  );
}
