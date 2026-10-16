<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WebsiteController;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\WebsitePageController;
Route::get('/test', function () {
    return response()->json(['message' => 'API Connected Successfully!']);
});

// ----------------------------------------------------------------------------
Route::post('/websites', [WebsiteController::class, 'store']);
Route::get('/websites', [WebsiteController::class, 'index']);

// ----------------------------------------------------------------------------

Route::get('/templates', [TemplateController::class, 'index']);
Route::post('/templates', [TemplateController::class, 'store']); // اختياري

// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------

Route::get('/websites/{website_id}/pages', [WebsitePageController::class, 'index']);
Route::post('/pages', [WebsitePageController::class, 'store']);
Route::put('/pages/{id}', [WebsitePageController::class, 'update']);
Route::delete('/pages/{id}', [WebsitePageController::class, 'destroy']);

// ----------------------------------------------------------------------------
// Route::post('/auth/login', [AuthController::class, 'login']);


Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->post('/auth/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get("/auth/me", [AuthController::class, 'me']);

// ----------------------------------------------------------------------------

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'index']); // جلب جميع المستخدمين
    Route::get('/users/{id}', [UserController::class, 'show']); // عرض مستخدم واحد
    Route::post('/users', [UserController::class, 'store']); // إضافة مستخدم جديد
    Route::put('/users/{id}', [UserController::class, 'update']); // تعديل بيانات المستخدم
    Route::delete('/users/{id}', [UserController::class, 'destroy']); // حذف مستخدم
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/theme', [UserController::class, 'getTheme']);
    Route::post('/theme', [UserController::class, 'updateTheme']);
});
