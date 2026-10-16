@extends('layout.default', [
	'bodyClass' => 'app-with-bg',
	'appClass' => 'app-boxed-layout'
])

@section('title', 'Boxed Layout')

@push('js')
	<script src="/assets/plugins/@highlightjs/cdn-assets/highlight.min.js"></script>
	<script src="/assets/js/demo/highlightjs.demo.js"></script>
@endpush

@section('content')
  <ul class="breadcrumb">
		<li class="breadcrumb-item"><a href="#">LAYOUT</a></li>
		<li class="breadcrumb-item active">BOXED LAYOUT</li>
	</ul>

	<h1 class="page-header">
		Boxed Layout <small>page header description goes here...</small>
	</h1>

	<hr class="mb-4">

	<p>
		Add the <code>.app-boxed-layout</code> css class to <code>.app</code> container and <code>.app-with-bg</code> css class to <code>&lt;body&gt;</code> for boxed layout page setting.
	</p>

	<div class="card">
		<div class="hljs-container border-0">
			<pre><code data-url="/assets/data/layout-boxed-layout/code-1.json"></code></pre>
		</div>
		<div class="card-arrow">
			<div class="card-arrow-top-left"></div>
			<div class="card-arrow-top-right"></div>
			<div class="card-arrow-bottom-left"></div>
			<div class="card-arrow-bottom-right"></div>
		</div>
	</div>
@endsection
