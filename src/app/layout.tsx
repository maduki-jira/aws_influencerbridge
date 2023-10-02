import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Amplify } from 'aws-amplify';
import awsconfig from '@/aws-exports';
import Provider from './provides';

Amplify.configure(awsconfig);

const inter = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'],
});

export const config: Metadata = {
    title: 'Next.js + Amplify',
    description: 'Next.js + Amplify',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
