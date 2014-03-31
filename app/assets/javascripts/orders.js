$(function(){
	//alert('called');
	Stripe.setPublishableKey($("meta[name=stripe-key]").attr('content'));
		payment ={
		setUpForm: function(){
			$('#new_order').submit(function(){
				$('input[type=submit]').attr('disabled',true);
				Stripe.card.createToken($('#new_order'),payment.handleStripeResponse);
			return false
     })//end submit handler
   },//end setUpForm function


   handleStripeResponse: function(status,response){
   	var $form = $('#new_order');
   	if (response.error) {
    // Show the errors on the form
    $('#stripe_error').html("<p class = text-center >" + response.error.message+ "</p>");
    $('#stripe_error').show //css('display','block');

    $('input[type=submit]').attr('disabled',false);
    //alert(response.error.message); // for testing response
  } else {
    // token contains id, last4, and card type
    var token = response.id;
    // Insert the token into the form so it gets submitted to the server
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    // and submit
    $form.get(0).submit();
    //alert('success' + response.id);
  }
   }//end handleStripeResponse function


  }//end payment Object

  payment.setUpForm();

})//end dom ready