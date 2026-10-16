<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WebsitePage extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'content', 'website_id' , 'page_name', 'order'];
}
