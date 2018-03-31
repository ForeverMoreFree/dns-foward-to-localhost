
	// bind to the form's submit event
	//$('body').on('submit','.frmUploader',function (ev)) {
	//	ev.preventDefault();
	//	window.fetch
	//return false;
	//});



function handleFileSelect(evt) {
  var f = evt.target.files[0];
  var reader = new FileReader();

  // Closure to generate the handler we need
  // with the correct scope.
  reader.onload = (function(theFile) {
    
    // returning the handler that will be called for reader.onload
    return function(e) {
      
      // Render thumbnail.
      var span = document.createElement('span');
      span.innerHTML = ['<img class="thumb" src="', e.target.result,
                        '" title="', escape(theFile.name), '" width="250"/>'].join('');
      document.getElementById('list').insertBefore(span, null);
    };
  })(f);

  // Read in the image file as a data URL.
  // this triggers reader.onload
reader.readAsDataURL(f);
}

document.getElementById('file').addEventListener('change', handleFileSelect, false);