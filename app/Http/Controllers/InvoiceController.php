<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    // Create - Menyimpan data invoice baru
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'no_hp' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'address' => 'required|string',
        ]);

        // Membuat invoice baru
        $invoice = Invoice::create($request->all());

        return response()->json([
            'message' => 'Invoice created successfully!',
            'invoice' => $invoice
        ], 201);
    }

    // Read (index) - Menampilkan semua invoice
    public function index()
    {
        $invoices = Invoice::all();
        return response()->json($invoices);
    }

    // Read (show) - Menampilkan detail invoice berdasarkan ID
    public function show($id)
    {
        $invoice = Invoice::find($id);

        if (!$invoice) {
            return response()->json(['message' => 'Invoice not found'], 404);
        }

        return response()->json($invoice);
    }

    // Update - Memperbarui data invoice berdasarkan ID
    public function update(Request $request, $id)
    {
        $invoice = Invoice::find($id);

        if (!$invoice) {
            return response()->json(['message' => 'Invoice not found'], 404);
        }

        // Validasi dan update data
        $request->validate([
            'nama' => 'required|string|max:255',
            'no_hp' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'address' => 'required|string',
        ]);

        $invoice->update($request->all());

        return response()->json([
            'message' => 'Invoice updated successfully!',
            'invoice' => $invoice
        ]);
    }

    // Delete - Menghapus invoice berdasarkan ID
    public function destroy($id)
    {
        $invoice = Invoice::find($id);

        if (!$invoice) {
            return response()->json(['message' => 'Invoice not found'], 404);
        }

        // Hapus invoice
        $invoice->delete();

        return response()->json(['message' => 'Invoice deleted successfully']);
    }
}
