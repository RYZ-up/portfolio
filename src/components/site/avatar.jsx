import { useState } from 'react';
import { cn } from '@/lib/utils';
import fallbackAvatar from '@/assets/images/avatar.png';

// Portrait (public/images/me.webp, 384 px); the old avatar stays if it fails to load.
export function Avatar({ className }) {
  const [src, setSrc] = useState('/images/me.webp');
  return <img src={src} alt="Rayane Yazid" onError={() => setSrc(fallbackAvatar)} className={cn('object-cover', className)} />;
}
