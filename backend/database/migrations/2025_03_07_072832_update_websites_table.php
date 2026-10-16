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
        // Schema::table('websites', function (Blueprint $table) {
        //     // $table->foreignId('user_id')->constrained()->onDelete('cascade'); // صاحب الموقع
        //     // $table->string('status')->default('pending'); // حالة الموقع (نشط - قيد المراجعة - مرفوض)
        //     // $table->text('description')->nullable(); // وصف الموقع
        //     // $table->string('thumbnail')->nullable(); // صورة مصغرة للموقع
        //     // $table->boolean('is_published')->default(false); // هل الموقع منشور أم لا؟
        // });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('websites', function (Blueprint $table) {
            //
        });
    }
};
