<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Template;

class TemplateController extends Controller
{
    // جلب جميع القوالب
    public function index()
    {
        return response()->json(Template::all());
    }

    // إضافة قالب جديد (اختياري، لإضافة قوالب بسهولة)
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'preview_image' => 'required|string',
            'content' => 'required|json',
        ]);

        $template = Template::create($request->all());

        return response()->json($template, 201);
    }
}
