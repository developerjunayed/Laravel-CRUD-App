import { Button } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { CheckCircle2Icon } from 'lucide-react';
import { useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { index as ProductsRoute, create as CreateProductRoute, edit as EditProductRoute, destroy as DeleteProductRoute } from '@/routes/products';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: ProductsRoute.url(),
    },
];

interface PageProps {
    flash: {
        message?: string;
    };
    products: {
        data: {
            id: number;
            name: string;
            category: string;
            price: string | number;
            created_at: string;
        }[];
        per_page: number,
        current_page: number,
        total: number,
        last_page: number
    };
}

export default function Index() {
    const { flash, products } = usePage().props as unknown as PageProps;
    const {processing, delete: destroy} = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            destroy(DeleteProductRoute.url(id));
        }
    } 

    useEffect(() => {
        if (flash.message) {
            const timer = setTimeout(() => {
                const flashElement = document.querySelector('.flash-message');
                if (flashElement) {
                    flashElement.remove();
                }
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [flash.message]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className='p-4'>
                <Link href={CreateProductRoute.url()} className="hover:underline px-6 py-2 bg-blue-500 text-white rounded ">Add Product</Link>
            
                {flash.message && 
                    <div className="mt-4 flash-message">
                        <Alert className="max-w-md text-green-500 bg-green-200/10" variant='default'>
                            <CheckCircle2Icon />
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription className='text-green-500'>
                                {flash.message}
                            </AlertDescription>
                        </Alert>
                    </div>
                }
            </div>

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <table className="w-full table-auto border-collapse overflow-hidden border border-sidebar-border/70 dark:border-sidebar-border rounded-xl">
                    <thead className="bg-gray-300/70 dark:bg-sidebar-bg/70 border-b border-sidebar-border/70 dark:border-sidebar-border">
                        <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Category</th>
                            <th className="px-4 py-2 text-left">Price</th>
                            <th className="px-4 py-2 text-left">Created At</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-sidebar-border/70 dark:divide-sidebar-border">
                        {products.data.map((product) => (
                            <tr key={product.id}>
                                <td className="px-4 py-2">{product.name}</td>
                                <td className="px-4 py-2">{product.category}</td>
                                <td className="px-4 py-2">${Number(product.price).toFixed(2)}</td>
                                <td className="px-4 py-2">{new Date(product.created_at).toLocaleString()}</td>
                                <td className="px-4 py-2">
                                    <Link href={EditProductRoute.url(product.id)} className="text-blue-500 hover:underline">Edit</Link>
                                    <Button disabled={processing} onClick={() => handleDelete(product.id)} className="text-red-500 hover:underline ml-4">Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Add pagination */}
                <div className="mt-4 flex justify-end">
                    {products.current_page && products.current_page > 1 && (
                        <Link href={ProductsRoute.url() + '?page=' + (products.current_page - 1)} className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">Previous</Link>
                    )}
                    <span className='px-3 py-1 bg-gray-50 rounded'>{products.current_page}</span>
                    {products.current_page && products.last_page && products.current_page < products.last_page && (
                        <Link href={ProductsRoute.url() + '?page=' + (products.current_page + 1)} className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">Next</Link>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}