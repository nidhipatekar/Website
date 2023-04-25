$("#enquiry_form").on("submit", function (e) {
    e.preventDefault();
    let name = $("#enquiry_form input[name=name]").val();
    let email = $("#enquiry_form input[name=email]").val();
    let phone = $("#enquiry_form input[name=phone]").val();
    let address = $("#enquiry_form input[name=address]").val();
    let message = $("#enquiry_form textarea[name=message]").val();

    let error = false;
    error = check_data(name, "name_error", "Name should not be blank!") ? true : error;
    error = check_data(email, "email_error", "Email should not be blank!") ? true : error;
    error = check_data(phone, "phone_error", "Phone should not be blank!") ? true : error;
    error = check_data(address, "address_error", "Address should not be blank!") ? true : error;
    error = check_data(message, "message_error", "Message should not be blank!") ? true : error;
    if (error) return false;

    $("#enquiry_form buttom[type=submit]").hide();
    $.ajax({
        type: "POST",
        url: "api/faqs.php",
        data: $(this).serialize() + "&submit=enquiry_form",
        cache: false,
        success: function (response) {
            response = JSON.parse(response);
            if (response.success === true) {
                swal({
                    title: "Request send!",
                    text: response.message,
                    icon: "success",
                    button: "ok!",
                });
                $('#enquiry_form')[0].reset();
            } else {
                if(typeof response.data == "string"){
                    swal({
                        title: "Request error!",
                        text: response.message,
                        icon: "error",
                        button: "ok!",
                    });
                }
                else{
                    for (let error in response.data) {
                        $('#' + error + '_error').text(response.data[error]);
                    }
                }
            }
        },
        error: function (error) {
            swal({
                icon: "error",
                title: "something went wrong",
                text: response.message
            });
        },
        complete: () => $("#enquiry_form buttom[type=submit]").show(),
    });

});

