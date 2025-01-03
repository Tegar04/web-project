<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log; // Import Log

class CustomerController extends Controller
{
    // List all customers
    public function index()
    {
        $customers = Customer::all();
        return response()->json($customers, 200);
    }

    // Store a new customer
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email',
            'password' => 'required|string|min:8',
        ]);

        $customer = Customer::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json([
            'message' => 'Customer created successfully',
            'customer' => $customer,
        ], 201);
    }

    // Show customer by ID
    public function show($id)
    {
        $customer = Customer::find($id);

        if (!$customer) {
            return response()->json(['error' => 'Customer not found'], 404);
        }

        return response()->json($customer, 200);
    }

    // Update customer
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:customers,email,' . $id,
            'password' => 'sometimes|required|string|min:8',
        ]);

        $customer = Customer::find($id);

        if (!$customer) {
            return response()->json(['error' => 'Customer not found'], 404);
        }

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $customer->update($validated);

        return response()->json([
            'message' => 'Customer updated successfully',
            'customer' => $customer,
        ], 200);
    }

    // Delete customer
    public function destroy($id)
    {
        $customer = Customer::find($id);

        if (!$customer) {
            return response()->json(['error' => 'Customer not found'], 404);
        }

        $customer->delete();

        return response()->json(['message' => 'Customer deleted successfully'], 200);
    }

    // Login user
        // Login user
    public function login(Request $request)
    {
        try {
            // Validasi input login
            $validated = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string|min:8',
            ]);

            // Cari customer berdasarkan email
            $customer = Customer::where('email', $validated['email'])->first();

            // Validasi email dan password
            if (!$customer || !Hash::check($validated['password'], $customer->password)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }

            // Buat token
            $token = $customer->createToken('YourAppName')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'customer' => $customer,
                'token' => $token,
            ], 200);
        } catch (\Throwable $e) {
            // Log error untuk debug
            Log::error('Login error: ' . $e->getMessage()); // Menulis error ke log

            return response()->json(['error' => 'Server error', 'message' => $e->getMessage()], 500);
        }
    }


}
