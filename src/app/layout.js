// app/layout.js
import { Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata = {
  title: 'BloodConnect',
  description: 'Connecting Donors, Saving Lives',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`${poppins.className} min-h-full flex flex-col bg-gray-50 text-gray-900`}
      >
        {children}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: '#1f2937',
              color: '#fff',
              borderRadius: '12px',
            },
            success: {
              iconTheme: { primary: '#ef4444', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#fff' },
            },
          }}
        />
      </body>
    </html>
  );
}
