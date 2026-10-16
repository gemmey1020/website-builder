<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Website;

class WebsiteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'domain' => 'required|string|unique:websites,domain',
            'content' => 'required|json',
        ]);

        $website = Website::create($request->all());

        return response()->json($website, 201);
    }

    // جلب جميع المواقع
    public function index()
    {
        return response()->json(Website::all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
