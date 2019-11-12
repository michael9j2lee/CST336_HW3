            


/*global $*/

//========================================
//Event Handler
//========================================


$("#pokemon").on("submit",function(event) {
    
   let inputPokemon = document.getElementById("inputPokemon").value;
   let inputURL = "https://pokeapi.co/api/v2/pokemon/"+inputPokemon;
//   alert(inputPokemon);
//   alert(inputURL);
    $.ajax({
                 url: inputURL,
            headers: { "Accept": "application/json",
            "Access-Control-Allow-origin": "*"
            },
            dataType: "json",
            crossDomain: true,
            beforeSend: function(xhr){
                xhr.withCredentials = true;
          },
            success: function(result) {
                //alert(result.moves[0].move.name);
                let outputTable = createTable(result);
                //alert(outputTable);
                
                $("#infoTable").html('<table class="table table-dark">'+outputTable +'</table>');
                //document.write('<table>'+outputTable +'</table>');
                // for (let i = 0; i<= outMoves.length; i++){
                //     allMoves+=result.moves[i].move.name;
                //     $("#moves").html(result.moves[i].move.name);
                // }
                //alert(allMoves);
                
                 //document.getElementById("pokeSprite").src=result.sprite.backdefault;
            },
            error: function(obj,textStatus,errorThrown){
                console.log("obj " + obj);
                alert("Status: " + textStatus); 
                alert("Error: " + errorThrown); 
            }
        });//ajax
        event.preventDefault();
    });

    function createTable(result){
        //alert("creating table");
        var outMoves = result.moves;
        var table = '';
        var rows = outMoves.length;
        var level = 0;
        
        table+= '<tr><th>Moves</th><th>Level Learned at </th></tr>';
        for (let r= 0; r< rows; r++) {
            level = outMoves[r].version_group_details[0].level_learned_at;
            if (level !=0){
                table+='<tr>';
                table+= '<td>' + outMoves[r].move.name + '</td>';
                table+= '<td>' + outMoves[r].version_group_details[0].level_learned_at +'</td>';
                table+='</tr>';
            }

        }
        return table;
    }
        
    

// function genRandomNumber(inputNum){
//     return Math.floor(Math.random() * inputNum) ; 
// }


//==================================================
//EVENT HANDLERS
//==================================================
//Displaying City from API after typing a zip code
/*
$("#zip").on("change",function(){
    $("#zipCheck").html("");
    $.ajax({
          method: "GET",
             url: "https://cst336.herokuapp.com/projects/api/cityInfoAPI.php",
        dataType: "json",
            data: { "zip": $("#zip").val() },
        success: function(result,status) {
            if(result){
                 //alert(result);
                 $("#city").html(result.city.trim());
                 $("#latitude").html(result.latitude);
                 $("#longitude").html(result.longitude);
            }
            else{
                $("#city").html("");
                $("#latitude").html("");
                $("#longitude").html("");
                $("#zipCheck").html("Zip Code Invalid!");
                $("#zipCheck").css("color","red");
            }
        } 
    });//ajax
});//zip


$("#state").on("change",function(){
    
    //alert($("#state").val());
    //$("#county").val([]);
    removeOptions(document.getElementById("county"));
    
    $.ajax({
          method: "GET",
             url: "https://cst336.herokuapp.com/projects/api/countyListAPI.php",
        dataType: "json",
            data: { "state": $("#state").val() },
        success: function(result,status) {
            
            
            
            //alert(result[0].county);
            
            
            for (let i=0; i < result.length; i++){
                $("#county").append("<option>" + result[i].county + "</option>");
                
            }
        } 
    });//ajax
});//state


$("#username").change(function(){
    
    //alert($("#username").val());
    $.ajax({
          method: "GET",
             url: "https://cst336.herokuapp.com/projects/api/usernamesAPI.php",
        dataType: "json",
            data: { "username": $("#username").val() },
        success: function(result,status) {
            if(result.available){
                $("#usernameError").html("Username is available!");
                $("#usernameError").css("color","green");
                usernameAvailable = true;
            } 
            else {
                $("#usernameError").html("Username is unavailable!");
                $("#usernameError").css("color","red");
                usernameAvailable = false;
            }
        } 
    });//ajax
});//username

$("#password").change(function(){
    $("#passwordLengthCheck").html("");
    $("#passwordAgainError").html("");
    if(!lenCheckPassword($("#password").val().length)) {
        $("#passwordLengthCheck").html("Password must be at least 6 characters!");
        $("#passwordLengthCheck").css("color","red");
    }
});

$("#signupForm").on("submit",function(event) {
   
//   alert("Submitting form...");
   if (!isFormValid()){
       event.preventDefault();
   }
});
//==================================================
//Functions
//==================================================
function removeOptions(selectbox)
{
    var i;
    
    for( i = selectbox.options.length-1;i>=0;i--)
    {
        selectbox.remove(i);
    }
}

function getStates(){
    $.ajax({
          method: "GET",
             url: "https://cst336.herokuapp.com/projects/api/state_abbrAPI.php",
        dataType: "json",
            //data: {  },
        success: function(result,status) {
                //alert("States");
                //$("state").append("<option>");
                for (let i=0; i < result.length; i++){
                    $("#state").append("<option value='"+ result[i].usps + "'>" + result[i].state + "</option>");
            }
        } 
    });//ajax
} //get states


function lenCheckPassword(inputLength){
    let isMinLength = true;
    if (inputLength < 6){
        isMinLength = false;
    }
    return isMinLength;
    
}

function isFormValid(){
    let isValid = true;
    if (!usernameAvailable){
        isValid = false;
    }
    
    if ($("#username").val().length ==0){
        $("#usernameError").html("Username is required");
        $("#usernameError").css("color","red");
        isValid = false;
    }
    
    if ($("#password").val() != $("#passwordAgain").val()){
        $("#passwordAgainError").html("Password Mismatch!");
        $("#passwordAgainError").css("color","red");
        isValid = false;
    }
    
    if ($("#password").val().length < 6) {
       $("#passwordLengthCheck").html("Password must be at least 6 characters!");
        $("#passwordLengthCheck").css("color","red");
        isValid = false;
    }
    
    return isValid;
}
*/