@extends('layout.default', [
	'appClass' => 'app-content-full-height',
	'appContentClass' => 'p-0'
])

@section('title', 'Full Height')

@push('js')
	<script src="/assets/plugins/@highlightjs/cdn-assets/highlight.min.js"></script>
	<script src="/assets/js/demo/highlightjs.demo.js"></script>
@endpush

@section('content')
	<div class="app-content-inner-padding" data-scrollbar="true" data-height="100%" data-skip-mobile="true">
		<ul class="breadcrumb">
			<li class="breadcrumb-item"><a href="#">LAYOUT</a></li>
			<li class="breadcrumb-item active">FULL HEIGHT</li>
		</ul>

		<h1 class="page-header">
			Full Height <small>page header description goes here...</small>
		</h1>

		<hr class="mb-4">

		<p>
			Add the <code>.app-content-full-height</code> css class to <code>.app</code> container for full height page setting.
		</p>

		<div class="card mb-3">
			<div class="hljs-container border-0">
				<pre><code data-url="/assets/data/layout-full-height/code-1.json"></code></pre>
			</div>
			<div class="card-arrow">
				<div class="card-arrow-top-left"></div>
				<div class="card-arrow-top-right"></div>
				<div class="card-arrow-bottom-left"></div>
				<div class="card-arrow-bottom-right"></div>
			</div>
		</div>

		<div>
			Content Area with scrollbar. Try to scroll down. <i class="bi bi-chevron-down text-theme"></i>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			You got the bottom
		</div>
	</div>
@endsection
