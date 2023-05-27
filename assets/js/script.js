$(document).ready(function () {
   $('#add_user').submit(function (event) {
      alert("data inserted succesfully");
   });

   $('#update_user').submit(function (event) {
      event.preventDefault();
      var unindexedArray =$(this).serializeArray();
      var data={};
      $.map(unindexedArray,function(n,i){
         data[n['name']]=n['value'];
      });
      var request={
         "url":`http://localhost:3000/api/users/${data.id}`,
         "method":"PUT",
         "data":data
      }
      $.ajax(request).done(function(response){
         alert("data updated succesfully");
        location.href='/';
      });
     });

     if(window.location.pathname=='/'){
      $('.delete').click(function(){
         var id =$(this).attr('data-id');
         var request={
            "url":`http://localhost:3000/api/users/${id}`,
            "method":"DELETE",
         }
         if(confirm("Do you want to delete this record")){
            $.ajax(request).done(function(response){
              location.href='/';
            });
         }
      });
   }
});
  
