<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Hotel;
use Illuminate\Validation\Rule;

class HotelController extends Controller
{
    public function index()
    {
        return response()->json(Hotel::with('rooms')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'nit' => 'required|string|unique:hotels,nit',
            'room_limit' => 'required|integer|min:1'
        ]);

        $hotel = Hotel::create($validated);

        return response()->json($hotel, 201);
    }

    public function show($id)
    {
        $hotel = Hotel::with('rooms')->findOrFail($id);
        return response()->json($hotel);
    }

    public function update(Request $request, $id)
    {
        $hotel = Hotel::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'address' => 'sometimes|string|max:255',
            'city' => 'sometimes|string|max:100',
            'nit' => ['sometimes', 'string', Rule::unique('hotels')->ignore($hotel->id)],
            'room_limit' => 'sometimes|integer|min:1'
        ]);

        $hotel->update($validated);

        return response()->json($hotel);
    }

    public function destroy($id)
    {
        $hotel = Hotel::findOrFail($id);
        $hotel->delete();

        return response()->json(['message' => 'Hotel eliminado correctamente']);
    }
}
