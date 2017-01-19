<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class TodoControllerTest extends TestCase
{
    use DatabaseMigrations;

    public function setUp() {
        parent::setUp();
        $this->artisan('migrate:refresh');
    }

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testTodosIndex()
    {
        $todos = factory(App\Todo::class, 2)->create([
            'todo' => 'Unit tests schrijven.',
            'status' => 0
        ]);

        $this->json('get', '/api/todos')
             ->seeJsonEquals([
                [
                    'id' => $todos[0]->id,
                    'todo' => $todos[0]->todo,
                    'status' => $todos[0]->status,
                    'created_at' => $todos[0]->created_at->toDateTimeString(),
                    'updated_at' => $todos[0]->updated_at->toDateTimeString(),
                    'deleted_at' => null
                ],
                [
                    'id' => $todos[1]->id,
                    'todo' => $todos[1]->todo,
                    'status' => $todos[1]->status,
                    'created_at' => $todos[1]->created_at->toDateTimeString(),
                    'updated_at' => $todos[1]->updated_at->toDateTimeString(),
                    'deleted_at' => null
                ]
             ]);
    }

    public function testTodoStore()
    {
        $this->json('post', '/api/todos', [
            'todo' => 'Unit tests uitbreiden'
        ])->seeJson([
            'id' => 1,
            'todo' => 'Unit tests uitbreiden',
            'status' => 0
        ]);
    }

    public function testTodoShow()
    {
        $todo = factory(App\Todo::class, 1)->create([
            'todo' => 'todoController tests afmaken',
            'status' => 0
        ]);

        $this->json('get', '/api/todos/1')->seeJsonEquals([
            'id' => $todo->id,
            'todo' => $todo->todo,
            'status' => $todo->status,
            'created_at' => $todo->created_at->toDateTimeString(),
            'updated_at' => $todo->updated_at->toDateTimeString(),
            'deleted_at' => null
        ]);
    }

    public function testTodoUpdate()
    {
        $todo = factory(App\Todo::class, 1)->create([
            'todo' => 'todoController tests afmaken',
            'status' => 0
        ]);

        $this->json('put', '/api/todos/1', [
            'todo' => $todo->todo,
            'status' => 1
        ])->seeJson([
            'id' => $todo->id,
            'todo' => $todo->todo,
            'status' => 1,
            'created_at' => $todo->created_at->toDateTimeString(),
            'deleted_at' => null
        ]);
    }

    public function testTodoDestroy()
    {
        $todo = factory(App\Todo::class, 1)->create();

        $this->json('delete', '/api/todos/1')->see(1);
    }
}
