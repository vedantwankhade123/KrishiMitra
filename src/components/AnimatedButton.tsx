
'use client';

import Link from 'next/link';

type AnimatedButtonProps = {
    href: string;
    text: string;
};

export function AnimatedButton({ href, text }: AnimatedButtonProps) {
  return (
    <Link href={href} passHref>
      <button className="neumorphic-button">
        {text}
      </button>
    </Link>
  );
}
