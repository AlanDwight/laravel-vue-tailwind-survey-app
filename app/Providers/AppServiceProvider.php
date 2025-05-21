<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Database\Eloquent\Model;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        // $this->configureCommands();
        // $this->configureModels();
        // $this->configureUrl();
        // $this->configureVite();
    }

    private function configureCommands(): void
    {
        DB::prohibitDestructiveCommands(
            $this->app->isProduction()
        );
    }
    private function configureModels(): void
    {
        Model::shouldBeStrict(!app()->isProduction());
        Model::unguard();
    }

    private function configureUrl(): void
    {
        URL::forceScheme('https');
    }

    private function configureVite(): void  // when new laravel update come out update vite along side
    {
        Vite::usePrefetchStrategy('aggressive');
    }
}
