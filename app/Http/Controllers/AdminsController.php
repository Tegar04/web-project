<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\admins;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminsController extends Controller
{
    public function index()
    {
        return admins::all(); // Mengembalikan semua data
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_mobil' => 'required|string|max:255',
            'description' => 'required|string',
            'harga' => 'required|integer',
            'boking' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validasi file gambar
        ]);

        $data = $request->all();

        // Upload gambar jika ada
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('images', 'public');
        }

        return admins::create($data);
    }

    public function show(admins $admin)
    {
        return $admin;
    }

    public function update(Request $request, admins $admin)
    {
        $request->validate([
            'nama_mobil' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'harga' => 'sometimes|integer',
            'boking' => 'sometimes|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->all();

        // Update gambar jika ada
        if ($request->hasFile('image')) {
            // Hapus gambar lama
            if ($admin->image) {
                Storage::disk('public')->delete($admin->image);
            }
            $data['image'] = $request->file('image')->store('images', 'public');
        }

        $admin->update($data);

        return $admin;
    }

    public function destroy(admins $admin)
    {
        // Hapus gambar jika ada
        if ($admin->image) {
            Storage::disk('public')->delete($admin->image);
        }

        $admin->delete();

        return response()->noContent();
    }
}
