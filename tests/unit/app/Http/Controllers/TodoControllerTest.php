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
    public function testTodosList()
    {
        $todos = factory(App\Todo::class, 2)->create([
            'todo' => 'Unit tests schrijven.',
            'status' => 0
        ]);

        $this->json('get', '/api/todos')
             ->seeJsonEquals([
                [
                    'id' => 1,
                    'todo' => 'Unit tests schrijven.',
                    'status' => 0,
                    'created_at' => $todos[0]->created_at->toDateTimeString(),
                    'updated_at' => $todos[0]->updated_at->toDateTimeString(),
                    'deleted_at' => null
                ],
                [
                    'id' => 2,
                    'todo' => 'Unit tests schrijven.',
                    'status' => 0,
                    'created_at' => $todos[1]->created_at->toDateTimeString(),
                    'updated_at' => $todos[1]->updated_at->toDateTimeString(),
                    'deleted_at' => null
                ]
             ]);
    }

    public function testTodoCreate()
    {

    }
}
