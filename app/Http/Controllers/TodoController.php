<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

use App\Todo;
use App\Http\Requests\StoreTodo;
use App\Http\Requests\UpdateTodo;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->has('filter')) {
            switch($request->get('filter', '')) {
                case 'withTrashed':
                    return response()->json(Todo::withTrashed()->get());
                default:
                    return response()->json(Todo::all());
            }
        }

        return response()->json(Todo::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTodo $request)
    {
        $todo = new Todo($request->all());

        $todo->status = Todo::UNDONE;

        $todo->save();

        return response()->json($todo);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(Todo::find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTodo $request, $id)
    {
        try {
            $todo = Todo::findOrFail($id);

            $todo->todo = $request->get('todo');
            $todo->status = $request->get('status');
            $todo->save();

            return response()->json($todo);
        } catch (ModelNotFoundException $e) {
            return response()->json($e->getMessage(), 404);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // @todo check what this returns..
        $todo = Todo::withTrashed()->find($id);

        $todo->status = Todo::DELETED;
        $todo->save();

        $todo->delete();


        return response()->json($todo);
    }
}
