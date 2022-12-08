<form class="" id="filter">
    <div class="row">
        @foreach ($filterConfig['inputs'] as $input)
        @if($input['type'] == 'select')
        <div class="col-lg-3 mb-6">
            <label>{{ $input['lable'] }}</label>
            <select class="form-control dropDown" id="{{ $input['name'] }}" name="{{ $input['name'] }}">
                <option></option>
                @foreach ($input['dropDownData'] as $data)
                <option value="{!! $data->{$input['dropDownValue']} !!}">{!! $data->{$input['dropDownText']} !!}</option>
                @endforeach
            </select>
        </div>
        @else
        <div class="col-lg-3 mb-6">
            <label>{{ $input['lable'] }}</label>
            <input {!! ($loop->first) ? "autofocus" : '' !!} type="{{ $input['type'] }}" class="form-control datatable-input"
                placeholder="{{ $input['placeholder'] }}" name="{{ $input['name'] }}">
        </div>
        @endif
        @endforeach
    </div>
    <br>
    <div class="row">
        <div class="col-lg-12">
            <button class="btn btn-primary btn-primary--icon" id="kt_search">
                <span>
                    <i class="la la-search"></i>
                    <span>@lang('home.search')</span>
                </span>
            </button>&nbsp;&nbsp;
            <button class="btn btn-outline-secondary btn-secondary--icon" id="kt_reset">
                <span>
                    <i class="la la-close"></i>
                    <span>@lang('home.reset')</span>
                </span>
            </button></div>
    </div>

    <hr class="mb-10 mt-10">
</form>


@push('Scripts')
<script>
$(function(){

@if(isset($filterConfig['dropDownInput']))
@foreach($filterConfig['dropDownInput'] as $dropDownInputData)
$('#{{$dropDownInputData['id']}}').select2({
    placeholder: "{{$dropDownInputData['placeholder']}}",
    allowClear: true
});
@endforeach
@endif

});
/*====================================================*/
</script>
@endpush
