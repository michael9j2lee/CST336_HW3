/*global $*/
//========================================
//Event Handler
//========================================

$("#pokemon").on("submit",function(event) {
   $("#errorCheck").html("");
   var inputPokemon = document.getElementById("inputPokemon").value;
   var inputURL = "https://pokeapi.co/api/v2/pokemon/"+inputPokemon;

    if (!validInputCheck(inputPokemon)){
        outputError();
    }
    else{
        $.ajax({
                     url: inputURL,
                headers: { "Accept": "application/json",
                            "Access-Control-Allow-origin": "*"},
                dataType: "json",
                crossDomain: true,
                beforeSend: function(xhr){
                    xhr.withCredentials = true;
              },
                success: function(result) {

                    var outputTable = createTable(result);

                    $("#infoTable").html('<table class="table">'+outputTable +'</table>');
                    $("#pokeName").html(result.forms[0].name);
                },
                error: function(obj,textStatus,errorThrown){
                    console.log("obj: " + obj + "textStatus: " + textStatus + "errorThrown: " +errorThrown);
                }
        });//ajax
    }
        event.preventDefault();
    });
    
    function outputError(){
        $("#errorCheck").html("Please input a pokemon or an ID");
        $("#errorCheck").css("color","red");
    }
    
    function validInputCheck(inputPokemon){
        check = true;
        if (inputPokemon.length == 0)
        {
            check = false;
        }
        return check;
    }
    
    function createTable(result){
        //alert("creating table");
        var outMoves = result.moves;
        var table = '';
        var rows = outMoves.length;
        var level = 0;
        
        table+= '<thead class="thead-dark"><tr><th>Moves</th><th>Level Learned at </th></tr></thead>';
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
        
    