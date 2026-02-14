import { Head, useForm, usePage } from '@inertiajs/react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { update as UpdateProductRoute } from '@/routes/products';
import type { BreadcrumbItem } from '@/types';

interface PageProps {
    product: {
        id: number;
        name: string;
        category: string;
        price: number;
        description: string;
    },
    categories: string[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Update Product',
        href: '/products/edit',
    },
];

export default function Update() {
    const pageProps = usePage().props as unknown as PageProps;

    const {data, setData, put, processing, errors} = useForm({
        name: pageProps.product.name,
        category: pageProps.product.category,
        price: pageProps.product.price,
        description: pageProps.product.description,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(UpdateProductRoute.url(pageProps.product.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update Product" />
            {/* Update product form goes here. */}
            <form className="h-full max-w-5xl overflow-x-auto rounded-xl p-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-1 h-8 w-full px-3 py-6 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    />

                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>
                <div className="flex flex-row gap-2 mt-3">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <Select onValueChange={(value) => setData('category', value)} defaultValue={data.category}>
                            <SelectTrigger className="w-full max-w-48 mt-1 h-8 px-3 py-6 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Categories</SelectLabel>
                                    {pageProps.categories.map((category) => (
                                        <SelectItem key={category} value={category}>{category}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={data.price}
                            onChange={(e) => setData('price', parseFloat(e.target.value))}
                            className="mt-1 h-8 w-full px-3 py-6 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                        {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                    </div>
                </div>
                <div className='mt-3'>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="mt-1 w-full px-3 py-6 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    ></textarea>
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>
                <div className='mt-3'>
                    <button type="submit" disabled={processing} className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Update</button>
                </div>
            </form>
        </AppLayout>
    );
}