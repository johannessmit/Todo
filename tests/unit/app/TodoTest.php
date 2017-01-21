<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class TodoTest extends TestCase
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
        $this->json('get', '/api/todos')
             ->seeJson([]);
    }
}
