<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WebsitePage;

class WebsitePageController extends Controller
{
    // 🔹 1️⃣ جلب جميع الصفحات لموقع معين
    public function index($website_id)
    {
        $pages = WebsitePage::where('website_id', $website_id)->orderBy('order')->get();
        return response()->json($pages);
    }

    // 🔹 2️⃣ إنشاء صفحة جديدة
    public function store(Request $request)
    {
        $request->validate([
            'website_id' => 'required|exists:websites,id',
            'page_name' => 'required|string|max:255',
            'content' => 'nullable|json',
            'order' => 'integer',
        ]);

        $page = WebsitePage::create($request->all());

        return response()->json($page, 201);
    }

    // 🔹 3️⃣ تعديل صفحة موجودة
    public function update(Request $request, $id)
    {
        $request->validate([
            'page_name' => 'string|max:255',
            'content' => 'nullable|json',
            'order' => 'integer',
        ]);

        $page = WebsitePage::findOrFail($id);
        $page->update($request->all());

        return response()->json($page);
    }

    // 🔹 4️⃣ حذف صفحة
    public function destroy($id)
    {
        WebsitePage::findOrFail($id)->delete();
        return response()->json(['message' => 'Page deleted successfully']);
    }
}
