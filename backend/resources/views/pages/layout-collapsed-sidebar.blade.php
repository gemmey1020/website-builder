@extends('layout.default', [
	'appClass' => 'app-sidebar-collapsed'
])

@section('title', 'Minified Sidebar')

@push('js')
	<script src="/assets/plugins/@highlightjs/cdn-assets/highlight.min.js"></script>
	<script src="/assets/js/demo/highlightjs.demo.js"></script>
@endpush

@section('content')
  <ul class="breadcrumb">
		<li class="breadcrumb-item"><a href="#">LAYOUT</a></li>
		<li class="breadcrumb-item active">COLLAPSED SIDEBAR</li>
	</ul>

	<h1 class="page-header">
		Collpased Sidebar <small>page header description goes here...</small>
	</h1>

	<hr class="mb-4">

	<p>
		Add the <code>.app-sidebar-collapsed</code> css class to <code>.app</code> container for collapsed sidebar page setting.
	</p>

	<div class="card">
		<div class="hljs-container border-0">
			<pre><code data-url="/assets/data/layout-collapsed-sidebar/code-1.json"></code></pre>
		</div>
		<div class="card-arrow">
			<div class="card-arrow-top-left"></div>
			<div class="card-arrow-top-right"></div>
			<div class="card-arrow-bottom-left"></div>
			<div class="card-arrow-bottom-right"></div>
		</div>
	</div>
@endsection
