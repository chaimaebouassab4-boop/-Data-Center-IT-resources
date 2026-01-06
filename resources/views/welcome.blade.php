@extends('layouts.app')

@section('content')
<div class="container">
    <div style="text-align: center; margin-bottom: 3rem;">
        <h1 style="font-size: 2.5rem; color: var(--primary-color); margin-bottom: 1rem;">Data Center Resource Catalog</h1>
        <p style="color: var(--text-muted); font-size: 1.125rem;">Browse available hardware and resources. Login to make a reservation.</p>
        
        @auth
            <div style="margin-top: 1.5rem;">
                @if(Auth::user()->role->name == 'Data Center Administrator')
                    <a href="{{ route('admin.dashboard') }}" class="btn btn-primary">Go to Dashboard</a>
                @elseif(Auth::user()->role->name == 'Technical Resource Manager')
                    <a href="{{ route('manager.dashboard') }}" class="btn btn-primary">Go to Dashboard</a>
                @else
                    <a href="{{ route('user.dashboard') }}" class="btn btn-primary">Go to Dashboard</a>
                @endif
            </div>
        @else
            <div style="margin-top: 1.5rem;">
                <a href="{{ route('login') }}" class="btn btn-primary">Login</a>
            </div>
        @endauth
    </div>

    <div class="card" style="margin-bottom: 2rem; padding: 1rem;">
        <form action="{{ url('/') }}" method="GET" style="display: flex; gap: 1rem; align-items: center;">
            <label for="category_id" style="margin: 0; white-space: nowrap;">Filter by Category:</label>
            <select name="category_id" id="category_id" style="width: auto; flex-grow: 1; max-width: 300px;" onchange="this.form.submit()">
                <option value="">All Categories</option>
                @foreach($categories as $category)
                    <option value="{{ $category->id }}" {{ request('category_id') == $category->id ? 'selected' : '' }}>
                        {{ $category->name }}
                    </option>
                @endforeach
            </select>
        </form>
    </div>

    <div class="grid-cols-3">
        @forelse($resources as $resource)
            <div class="card" style="display: flex; flex-direction: column;">
                <div style="margin-bottom: 1rem;">
                    <span style="background-color: #f1f5f9; color: var(--text-muted); padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; text-transform: uppercase; font-weight: bold;">
                        {{ $resource->category->name }}
                    </span>
                </div>
                <h3 style="margin-bottom: 0.5rem;">{{ $resource->name }}</h3>
                
                <div style="flex-grow: 1;">
                    <ul style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1rem;">
                        @if(isset($resource->specifications['cpu'])) <li>CPU: {{ $resource->specifications['cpu'] }}</li> @endif
                        @if(isset($resource->specifications['ram'])) <li>RAM: {{ $resource->specifications['ram'] }}</li> @endif
                        @if(isset($resource->specifications['storage'])) <li>Storage: {{ $resource->specifications['storage'] }}</li> @endif
                    </ul>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 1rem; margin-top: 1rem;">
                    <span style="
                        font-weight: 600; 
                        color: {{ $resource->status === 'available' ? '#166534' : ($resource->status === 'maintenance' ? '#991b1b' : '#92400e') }};
                    ">
                        {{ ucfirst($resource->status) }}
                    </span>
                    
                    @auth
                        @if($resource->status === 'available' && Auth::user()->role->name === 'Internal User')
                            <a href="{{ route('user.reservations.create', ['resource_id' => $resource->id]) }}" class="btn btn-primary" style="padding: 0.25rem 0.75rem; font-size: 0.875rem;">Book</a>
                        @endif
                    @endauth
                </div>
            </div>
        @empty
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
                <p>No resources currently available in the catalog.</p>
            </div>
        @endforelse
    </div>
</div>
@endsection
