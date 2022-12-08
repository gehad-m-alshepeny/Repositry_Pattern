<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title')</title>
    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">

    <link rel="stylesheet" href="{{ asset('assets/css/style.min.css') }}">


<style>.select2-container {    width: 100% !important;}</style>
    @stack('Styles')
</head>


<body class="@yield('bodyClass')">
@yield('pageContent')

<script src="{{ asset('assets/js/scripts.min.js') }}"></script>
<script src="{{ asset('assets/js/applicationJs/common/utils.js') }}"></script>
<script src="{{ asset('assets/js/applicationJs/common/dropDown.js') }}"></script>
<script src="{{ asset('assets/js/applicationJs/common/modal.js') }}"></script>
<script src="{{ asset('assets/js/applicationJs/common/dataTable.js') }}"></script>
<script src="{{ asset('assets/js/applicationJs/common/ajaxControl.js') }}"></script>




@stack('Scripts')

</body>
</html>
