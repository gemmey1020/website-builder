@extends('layout.default', [
	'appFooter' => true,
	'appClass' => 'app-footer-fixed'
])

@section('title', 'Fixed Footer')

@push('js')
	<script src="/assets/plugins/@highlightjs/cdn-assets/highlight.min.js"></script>
	<script src="/assets/js/demo/highlightjs.demo.js"></script>
@endpush

@section('content')
	<ul class="breadcrumb">
		<li class="breadcrumb-item"><a href="#">LAYOUT</a></li>
		<li class="breadcrumb-item active">FIXED FOOTER</li>
	</ul>

	<h1 class="page-header">
		Fixed Footer <small>page header description goes here...</small>
	</h1>

	<hr class="mb-4">

	<p>
		Add the following page variable for fixed footer page setting.
	</p>

	<div class="card">
		<div class="hljs-container border-0">
			<pre><code data-url="/assets/data/layout-fixed-footer/code-1.json"></code></pre>
		</div>
		<div class="card-arrow">
			<div class="card-arrow-top-left"></div>
			<div class="card-arrow-top-right"></div>
			<div class="card-arrow-bottom-left"></div>
			<div class="card-arrow-bottom-right"></div>
		</div>
	</div>
@endsection
