<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;

// ============================================
// PAGE D'ACCUEIL PUBLIQUE (Landing Page)
// ============================================
Route::get('/', function () {
    // Statistiques pour la page d'accueil
    $totalResources = \App\Models\Resource::count();
    $activeResources = \App\Models\Resource::where('is_active', true)->count();
    $utilizationRate = $totalResources > 0 
        ? round(($activeResources / $totalResources) * 100) . '%' 
        : '0%';

    return Inertia::render('Home', [
        'totalResources' => $totalResources,
        'utilizationRate' => $utilizationRate,
        'activeReservations' => $activeResources,
    ]);
})->name('home');

// ============================================
// PAGE TIMELINE PUBLIQUE
// ============================================
Route::get('/timeline', [\App\Http\Controllers\TimelineController::class, 'index'])->name('timeline');

// ============================================
// AUTHENTICATION ROUTES
// ============================================
Route::get('/auth', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::get('/auth/signup', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register']);

// ============================================
// AUTHENTICATED ROUTES
// ============================================
Route::middleware('auth')->group(function () {
    
    // Notifications (tous les utilisateurs connectés)
    Route::get('/notifications', [\App\Http\Controllers\NotificationController::class, 'index'])->name('notifications.index');
    Route::patch('/notifications/{notification}/read', [\App\Http\Controllers\NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::post('/notifications/read-all', [\App\Http\Controllers\NotificationController::class, 'markAllAsRead'])->name('notifications.markAllRead');

    // ============================================
    // ADMIN ROUTES
    // ============================================
    Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'admin'])->name('dashboard');
        Route::resource('categories', \App\Http\Controllers\CategoryController::class);
        Route::resource('users', \App\Http\Controllers\UserController::class);
        Route::get('/logs', [\App\Http\Controllers\LogController::class, 'index'])->name('logs.index');
        Route::resource('racks', \App\Http\Controllers\RackController::class);
        Route::get('/monitoring', [\App\Http\Controllers\MonitoringController::class, 'index'])->name('monitoring.index');
        Route::get('/maintenance', [\App\Http\Controllers\MaintenanceController::class, 'index'])->name('maintenance.index');
        Route::get('/maintenance/create', [\App\Http\Controllers\MaintenanceController::class, 'create'])->name('maintenance.create');
        Route::post('/maintenance', [\App\Http\Controllers\MaintenanceController::class, 'store'])->name('maintenance.store');
        Route::patch('/maintenance/{ticket}', [\App\Http\Controllers\MaintenanceController::class, 'update'])->name('maintenance.update');
        Route::get('/capacity', [\App\Http\Controllers\CapacityController::class, 'index'])->name('capacity.index');
        Route::resource('rooms', \App\Http\Controllers\RoomController::class);
        Route::get('/reports', [\App\Http\Controllers\ReportController::class, 'index'])->name('reports.index');
        Route::get('/hybrid', [\App\Http\Controllers\CloudController::class, 'index'])->name('hybrid.index');
        Route::post('/hybrid/sync', [\App\Http\Controllers\CloudController::class, 'sync'])->name('hybrid.sync');
    });

    // RESOURCE CATALOG ROUTE (Public/Read-Only View)
// ============================================
Route::get('/resources', function (\Illuminate\Http\Request $request) {
    $query = \App\Models\Resource::with('category')->where('is_active', true);
    
    if ($request->has('category_id') && $request->category_id != '') {
        $query->where('category_id', $request->category_id);
    }

    $resources = $query->get();
    $categories = \App\Models\Category::all();
    
    return Inertia::render('App', [  // Change to 'ResourceCatalog' if you've renamed the component
        'resources' => $resources,
        'categories' => $categories,
    ]);
})->name('resources.index');

    // ============================================
    // MANAGER ROUTES
    // ============================================
    Route::middleware(['role:manager'])->prefix('manager')->name('manager.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'manager'])->name('dashboard');
        Route::resource('resources', \App\Http\Controllers\ResourceController::class);
        Route::get('/reservations', [\App\Http\Controllers\ReservationController::class, 'managerIndex'])->name('reservations.index');
        Route::patch('/reservations/{reservation}', [\App\Http\Controllers\ReservationController::class, 'updateStatus'])->name('reservations.update');
    });

    // ============================================
    // USER ROUTES
    // ============================================
    Route::middleware(['role:user'])->prefix('user')->name('user.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'user'])->name('dashboard');
        Route::resource('reservations', \App\Http\Controllers\ReservationController::class)->only(['index', 'create', 'store', 'show', 'destroy']);
        Route::resource('incidents', \App\Http\Controllers\IncidentController::class)->only(['index', 'create', 'store']);
    });
});