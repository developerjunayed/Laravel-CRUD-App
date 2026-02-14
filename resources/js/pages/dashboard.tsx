import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard.url(),
    },
];

interface PageProps {
    totalProducts: number;
    totalUsers: number;
}

export default function Dashboard() {
    const { totalProducts, totalUsers } = usePage().props as unknown as PageProps;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="flex h-full flex-col items-center justify-center gap-2">
                            <h2 className="text-2xl font-bold">{totalProducts}</h2>
                            <p className="text-sm text-gray-500">Total Products</p>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="flex h-full flex-col items-center justify-center gap-2">
                            <h2 className="text-2xl font-bold">{totalUsers}</h2>
                            <p className="text-sm text-gray-500">Total Users</p>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                
                </div>
            </div>
        </AppLayout>
    );
}
