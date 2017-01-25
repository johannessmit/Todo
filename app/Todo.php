<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Todo extends Model
{
    use SoftDeletes;

    const UNDONE = 0;
    const DONE = 1;
    const DELETED = 2;

    protected $fillable = [
        'todo',
        'status'
    ];

    protected $dates = ['deleted_at'];
}
