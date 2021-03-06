
function get_xhr() {
    var xhr = null;

    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest();
        }
    } else {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }
    return xhr;
}

function verifierLogin(f) {

    var xhr = get_xhr();
    var login = encodeURIComponent(document.getElementById("login_connexion").value);
    var mdp = encodeURIComponent(document.getElementById("mdp_connexion").value);

    //    xhr.onreadystatechange = function() {
    //        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
    //            alert("OK"); // C'est bon \o/
    //        }
    //    };
    
    xhr.open("POST", "connexion.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("login=" + login + "&mdp=" + mdp);

}

function maxlength_textarea(id, crid, max)
{
    var txtarea = document.getElementById(id);
    document.getElementById(crid).innerHTML=max-txtarea.value.length;
    txtarea.onkeypress=function(){
        eval('v_maxlength("'+id+'","'+crid+'",'+max+');')
        };
    txtarea.onblur=function(){
        eval('v_maxlength("'+id+'","'+crid+'",'+max+');')
        };
    txtarea.onkeyup=function(){
        eval('v_maxlength("'+id+'","'+crid+'",'+max+');')
        };
    txtarea.onkeydown=function(){
        eval('v_maxlength("'+id+'","'+crid+'",'+max+');')
        };
}

function v_maxlength(id, crid, max)
{
    var txtarea = document.getElementById(id);
    var crreste = document.getElementById(crid);
    var len = txtarea.value.length;
    if(len>max)
    {
        txtarea.value=txtarea.value.substr(0,max);
    }
    len = txtarea.value.length;
    crreste.innerHTML=max-len;
}

function reset(){
    $(function(){
        $('anecdote').html("Aujourd'hui, ");
    });
}

function upVote(numAnecdote){
    $(function(){
        $.get(
            'fragments/traitements/upvotes.php',
            {
                id: numAnecdote
            },
            function(data){
                if(data == "Success"){
                    $("#"+numAnecdote.toString()).html(parseInt($("#"+numAnecdote.toString()).html())+1);
                }else{
                    $("#e"+numAnecdote.toString()).html("Vous avez déjà voté");
                }
            },
            ''
        );
    });
}

function downVote(numAnecdote){
    $(function(){
        $.get(
            'fragments/traitements/downvotes.php',
            {
                id: numAnecdote
            },
            function(data){
                if(data == "Success"){
                    $("#"+numAnecdote.toString()).html(parseInt($("#"+numAnecdote.toString()).html())-1);
                }else{
                    $("#e"+numAnecdote.toString()).html("Vous avez déjà voté");
                }
            },
            ''
        );
    });
}

$(function(){
    $("#id").blur(function(){
        $("#loginf").html("Erreur");
    });
});