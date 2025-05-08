<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Room;
use App\Models\Hotel;
use Illuminate\Validation\Rule;

class RoomController extends Controller
{
    public function index()
    {
        return response()->json(Room::with('hotel')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'room_type' => 'required|in:Estándar,Junior,Suite',
            'accommodation' => 'required|in:Sencilla,Doble,Triple,Cuádruple',
            'quantity' => 'required|integer|min:1',
        ]);

        $hotel = Hotel::find($validated['hotel_id']);
        if ($validated['quantity'] > $hotel->room_limit) {
            return response()->json(['error' => 'La cantidad de habitaciones no puede exceder el límite del hotel'], 400);
        }

        $room = Room::create($validated);

        return response()->json($room, 201);
    }


    public function show($id)
    {
        $room = Room::with('hotel')->findOrFail($id);
        return response()->json($room);
    }

    public function update(Request $request, $id)
    {
        $room = Room::findOrFail($id);

        $validated = $request->validate([
            'hotel_id' => ['required', Rule::exists('hotels', 'id')],
            'room_type' => 'sometimes|string|max:255',
            'accommodation' => 'sometimes|string|max:255',
            'quantity' => 'sometimes|integer|min:1'
        ]);

        $room->update($validated);

        return response()->json($room);
    }

    public function destroy($id)
    {
        $room = Room::findOrFail($id);
        $room->delete();

        return response()->json(['message' => 'Habitación eliminada correctamente']);
    }
}
