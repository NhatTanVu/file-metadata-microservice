'use strict';

(function(){
   $(function() {
   	$("#uploadedFile").change(function(event) {
   		$("#output").hide();
   		$("#uploadButton").prop("disabled", false);
   	});
   	
      $("#inputForm").submit(function(event) {

         event.preventDefault();

         var formData = new FormData(this);
      
         $.ajax({
            url: $(this).attr("action"),
				type: 'POST',
				data: formData,
				cache: false,
				processData: false,
				contentType: false,
				error: function(jqXHR, textStatus, errorThrown) {
				   alert('ERRORS: ' + textStatus);
				   $("#output").hide();
				},
				success: function(data) {
					$("#output").show();
					$("#output #fileName").html(data.fileName);
					$("#output #fileSize").html(Math.ceil(data.fileSize/1024) + " KB");
					$("#uploadButton").prop("disabled", true);
				}
			});
      });
   });
})();