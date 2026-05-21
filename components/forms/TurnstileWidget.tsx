'use client';

import { Turnstile } from '@marsidev/react-turnstile';

export const TurnstileWidget = ({
  onToken,
  onExpire,
}: {
  onToken: (token: string) => void;
  onExpire: () => void;
}) => {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) return null;
  return (
    <Turnstile
      siteKey={siteKey}
      onSuccess={onToken}
      onExpire={onExpire}
      onError={onExpire}
      options={{ theme: 'auto', size: 'normal' }}
    />
  );
};
