//js jquery ajax file
/*global $ */


$(document).ready(function()
{
    var isValid = true;
    var usernameAvailable = false; 
    $("#zip").on("change", function()
    {
        //alert("#zip").val()
        $.ajax({

        method: "GET",
        url: "https://cst336.herokuapp.com/projects/api/cityInfoAPI.php",
        dataType: "json",
        data: { "zip": $("#zip").val() },
        success: function(result,status) 
        {
            //alert(result);
            $("#city").html(result.city);
            $("#longitude").html(result.longitude);
            $("#latitude").html(result.latitude);
            
        },
        Error: function()
        {
            alert("Error, please enter a valid zip");
        }
        });//ajax END
    });//zip END
        
    $("#state").on("change", function()
    {
        //alert($("#state").val)
        $.ajax({

        method: "GET",
        url: "https://cst336.herokuapp.com/projects/api/countyListAPI.php",
        dataType: "json",
        data: { "state": $("#state").val() },
        success: function(result,status) 
        {
            //alert(result[0], county);
            $("#county").html("<option> Select One </option>");
            for(let i = 0 ; i < result.length; i++)
            {
                $("#county").append("<option>" + result[i].county + "</option>");
                //$("#state").append("<option>" + result[i].state + "</option>");
            }
            
        }
        });//ajax END
    });//state END
    
    $("#username").change(function()
    {
        //alert($("#username").val());
        
        $.ajax({

            method: "GET",
            url: "https://cst336.herokuapp.com/projects/api/usernamesAPI.php",
            dataType: "json",
            data: { "username": $("#username").val() },
            success: function(result,status) 
            {
                if(result.available)
                {
                    $("#usernameError").html("Username is available!");
                    $("usernameError").css("color", "green");
                    usernameAvailable = true; 
                }
                else
                {
                    $("#usernameError").html("Username is unavailable!");
                    $("#usernameError").css("color", "red");
                    usernameAvailable = false; 
                }
            }
        });//ajax END
        
    });//end username
    
     $("#password").change(function(){
        if($("#password").size() < 6)
        {
        $("#passwordError").html("Password must be longer than 6 characters");
        $("#passwordError").css("color", "red");
        isValid = false; 
        }
        }); 
    
    $("#signupForm").on("submit", function(e)
    {
        alert("Submitting form...");
        if(!isFormValid())
        {
        e.preventDefault();
        }
    });//end sign up submit
    
  
    
    function isFormValid()
    {
        isValid = true; 
        if(!usernameAvailable)
        {
            isValid = false;
        }
        if($("#username").val().length == 0)
        {
            isValid = false; 
            $("#usernameError").html("Username is required");
        }
        if($("#password").size() < 6)
        {
            $("#passwordError").html("Password must be longer than 6 characters");
            $("#passwordError").css("color", "red");
            isValid = false; 
        }
        if($("#password").val() != $("#passwordConfirmation").val())
        {
            $("#passwordError").html("Password Mismatch");
            isValid = false; 
        }
        return isValid; 
    }

    
    
    
    
    
    
});//document ready END
