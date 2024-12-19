<?php

namespace App\Http\Controllers;

use App\Models\AboutUs;
use Illuminate\Http\Request;

class AboutUsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Mengambil semua data dari tabel 'about_us'
        $aboutUs = AboutUs::all();
        return response()->json($aboutUs);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Bisa mengembalikan form atau API response kosong jika tidak ada form HTML
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        // Menyimpan data ke dalam database
        $aboutUs = AboutUs::create($validated);

        return response()->json($aboutUs, 201); // Mengembalikan response dengan status 201
    }

    /**
     * Display the specified resource.
     */
    public function show(AboutUs $aboutUs)
    {
        // Menampilkan data berdasarkan ID
        return response()->json($aboutUs);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AboutUs $aboutUs)
    {
        // Bisa mengembalikan form atau API response kosong jika tidak ada form HTML
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validasi input
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        // Mencari data berdasarkan ID
        $aboutUs = AboutUs::find($id);

        if (!$aboutUs) {
            return response()->json(['message' => 'Data not found'], 404); // Jika data tidak ditemukan
        }

        // Memperbarui data
        $aboutUs->update($validated);

        return response()->json(['message' => 'Data updated successfully', 'data' => $aboutUs], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Mencari data berdasarkan ID
        $aboutUs = AboutUs::find($id);

        if (!$aboutUs) {
            return response()->json(['message' => 'Data not found'], 404); // Jika data tidak ditemukan
        }

        // Menghapus data jika ditemukan
        $aboutUs->delete();

        return response()->json(['message' => 'Data deleted successfully'], 200);
    }


}
