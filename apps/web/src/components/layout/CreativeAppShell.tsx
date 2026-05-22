import { CustomCursor } from '@/components/layout/CustomCursor';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

interface CreativeAppShellProps {
  readonly children: React.ReactNode;
}

export function CreativeAppShell({ children }: CreativeAppShellProps): React.JSX.Element {
  return (
    <>
      <CustomCursor />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
