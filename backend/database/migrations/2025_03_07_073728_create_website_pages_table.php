<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('website_pages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('website_id')->constrained()->onDelete('cascade'); // رابط للموقع
            $table->string('page_name'); // اسم الصفحة (Home, About, Contact...)
            $table->json('content')->nullable(); // محتوى الصفحة بصيغة JSON
            $table->integer('order')->default(0); // ترتيب الصفحة داخل الموقع
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('website_pages', function (Blueprint $table) {
            //
        });
    }
};
