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
    $activeReservations = \App\Models\Resource::where('is_active', true)->count();
    $utilizationRate = $totalResources > 0 
        ? round(($activeReservations / $totalResources) * 100) . '%' 
        : '0%';

    return Inertia::render('Home', [
        'totalResources' => $totalResources,
        'utilizationRate' => $utilizationRate,
        'activeReservations' => $activeReservations,
    ]);
})->name('home');

// ============================================
// PAGE TIMELINE PUBLIQUE
// ============================================
Route::get('/timeline', [\App\Http\Controllers\TimelineController::class, 'index'])->name('timeline');

// ============================================
// AUTHENTICATION ROUTES
// ============================================
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// ============================================
// AUTHENTICATED ROUTES
// ============================================
Route::middleware('auth')->group(function () {
    
    // Notifications (disponible pour tous les utilisateurs connectés)
    Route::get('/notifications', [\App\Http\Controllers\NotificationController::class, 'index'])->name('notifications.index');
    Route::patch('/notifications/{notification}/read', [\App\Http\Controllers\NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::post('/notifications/read-all', [\App\Http\Controllers\NotificationController::class, 'markAllAsRead'])->name('notifications.markAllRead');

    // ============================================
    // ADMIN ROUTES
    // ============================================
    Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'admin'])->name('dashboard');
        
        // Categories Management
        Route::resource('categories', \App\Http\Controllers\CategoryController::class);
        
        // Users Management
        Route::resource('users', \App\Http\Controllers\UserController::class);
        
        // Logs
        Route::get('/logs', [\App\Http\Controllers\LogController::class, 'index'])->name('logs.index');
        
        // Rack Management
        Route::resource('racks', \App\Http\Controllers\RackController::class);
        
        // Rooms Management
        Route::resource('rooms', \App\Http\Controllers\RoomController::class);

        // Monitoring
        Route::get('/monitoring', [\App\Http\Controllers\MonitoringController::class, 'index'])->name('monitoring.index');

        // Maintenance
        Route::get('/maintenance', [\App\Http\Controllers\MaintenanceController::class, 'index'])->name('maintenance.index');
        Route::get('/maintenance/create', [\App\Http\Controllers\MaintenanceController::class, 'create'])->name('maintenance.create');
        Route::post('/maintenance', [\App\Http\Controllers\MaintenanceController::class, 'store'])->name('maintenance.store');
        Route::patch('/maintenance/{ticket}', [\App\Http\Controllers\MaintenanceController::class, 'update'])->name('maintenance.update');
    
        // Capacity Planning
        Route::get('/capacity', [\App\Http\Controllers\CapacityController::class, 'index'])->name('capacity.index');
        
        // Reports & Analytics
        Route::get('/reports', [\App\Http\Controllers\ReportController::class, 'index'])->name('reports.index');
    
        // Hybrid Cloud
        Route::get('/hybrid', [\App\Http\Controllers\CloudController::class, 'index'])->name('hybrid.index');
        Route::post('/hybrid/sync', [\App\Http\Controllers\CloudController::class, 'sync'])->name('hybrid.sync');
    });

    // ============================================
    // MANAGER ROUTES
    // ============================================
    Route::middleware(['role:manager'])->prefix('manager')->name('manager.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'manager'])->name('dashboard');
        
        // Resources Management
        Route::resource('resources', \App\Http\Controllers\ResourceController::class);
        
        // Reservations Management
        Route::get('/reservations', [\App\Http\Controllers\ReservationController::class, 'managerIndex'])->name('reservations.index');
        Route::patch('/reservations/{reservation}', [\App\Http\Controllers\ReservationController::class, 'updateStatus'])->name('reservations.update');
    });

    // ============================================
    // USER ROUTES
    // ============================================
    Route::middleware(['role:user'])->prefix('user')->name('user.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'user'])->name('dashboard');
        
        // Reservations
        Route::resource('reservations', \App\Http\Controllers\ReservationController::class)
            ->only(['index', 'create', 'store', 'show', 'destroy']);
        
        // Incidents
        Route::resource('incidents', \App\Http\Controllers\IncidentController::class)
            ->only(['index', 'create', 'store']);
    });
});