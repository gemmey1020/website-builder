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
        Schema::table('templates', function (Blueprint $table) {
            $table->text('description')->nullable(); // وصف القالب
            $table->string('category')->default('general'); // فئة القالب (Business, Portfolio, eCommerce)
            $table->string('version')->default('1.0'); // إصدار القالب
            $table->boolean('is_active')->default(true); // هل القالب متاح للاستخدام؟
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('templates', function (Blueprint $table) {
            //
        });
    }
};
