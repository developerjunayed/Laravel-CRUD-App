<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\User;

class ProductController extends Controller
{

    public function dashboard(){
        $totalProducts = Product::count();
        $totalUsers = User::count();
        return Inertia::render('dashboard', compact('totalProducts', 'totalUsers'));
    }

    public function index(){
        $products = Product::query()->paginate(10);
        return Inertia::render('products/index', compact('products'));
    }

    public function create(){
        $categories = ['Category 1', 'Category 2', 'Category 3'];
        return Inertia::render('products/create', compact('categories'));
    }

    public function edit(Product $product){
        $categories = ['Category 1', 'Category 2', 'Category 3'];
        return Inertia::render('products/update', compact('product', 'categories'));
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
        ]);

        // Create a new product using the validated data
        Product::create($validatedData);
        // Redirect to the products index page with a success message
        return redirect()->route('products.index')->with('message', 'Product created successfully!');
    }

    public function update(Request $request, Product $product)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
        ]);

        // Update the product with the validated data
        $product->update($validatedData);
        // Redirect to the products index page with a success message
        return redirect()->route('products.index')->with('message', 'Product updated successfully!');
    }

    public function destroy(Product $product)
    {
        // Delete the product
        $product->delete();
        // Redirect to the products index page with a success message
        return redirect()->route('products.index')->with('message', 'Product deleted successfully!');
    }
}
