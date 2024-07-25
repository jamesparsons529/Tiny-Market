import { useAuth } from '@micro-stacks/react';

export const WalletConnectButton = () => {
  const { openAuthRequest, isRequestPending, signOut, isSignedIn } = useAuth();
  const label = isRequestPending ? 'Loading...' : isSignedIn ? 'Sign out' : 'Login';
  return (
    <button
      onClick={() => {
        if (isSignedIn) void signOut();
        else void openAuthRequest();
      }}
    >
      {label}
    </button>
  );
};
