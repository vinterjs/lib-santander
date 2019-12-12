$(document).ready(function(){
    //rut
    var no_permitidas = ['!', '"', '$', '%', '&', '/', '(', ')', '=', '?', 'Ã‚Â¿', '*', 'Ã‚Â¨', '^', '{', '}', 'Ãƒâ€¡', 'ÃƒÂ§', 'Ã‚Âª', 'Ã‚Âº', ',', 'Dead', 'Ã‚Â´', '+', '`', '_', '@', '#', '|', 'Ã‚Â¢', 'Ã¢Ë†Å¾', 'Ã‚Â¬', 'ÃƒÂ·', 'Ã¢â‚¬Â', 'Ã¢â€° ', 'Ã‚Â´'];
    var no_permitidas_eventkey = [192, 222, 16, 220, 186, 187];
    var permitidas_eventkey = [190, 173, 110];
    $("#rut").keyup(function(e) {
        var valorRut = $("#rut").val();
        if (!e.charCode) {
            key = String.fromCharCode(e.which);
        } else {
            key = String.fromCharCode(e.charCode);
        }
        if (no_permitidas_eventkey.indexOf(e.keyCode) !== -1 || no_permitidas.indexOf(e.key) !== -1) {
            e.preventDefault();
        }
        if (e.keyCode !== 8 && e.keyCode !== 9 && e.keyCode !== 37 && e.keyCode !== 39 && e.keyCode !== 91 && e.keyCode !== 86 && e.keyCode !== 190) {
            if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 75 || permitidas_eventkey.indexOf(e.keyCode) !== -1) {
                console.log("k");
            } else {
                if (e.keyCode !== 13) {
                    if (String.fromCharCode(e.keyCode).match(/(\w|\s)/g)) {
                        valorRut = valorRut.substr(0, valorRut.length - 1);
                    }
                }
                vl(valorRut);
            }
        }
        vl(valorRut);
    });
    $("#rut").focusout(function() {
        var vrt = $(this).val();
        $(this).val(formatear(vrt))
        if (!$(this).val()) {
            $("#rut").removeClass("invalid valid");
        }
    });
    //focus para el label
    $(".input-std label").click(function(){
        $(this).parent().find("input").focus();
    });
    //focus para el label
    $(".input-std-textarea label").click(function(){
        $(this).parent().find("textarea").focus();
    });
    //solo numeros
    $(".soloNumeros").inputFilter(function(value){
        return /^-?\d*$/.test(value);
    });
    //solo nombre
    $(".soloLetras").inputFilter(function(value){
        return /^[A-zÀ-ÖØ-öø-ÿ´`-]*$/i.test(value);
    });
    //solo texto y espacio
    $(".soloNombre").inputFilter(function(value){
        return /^[ A-zÀ-ÖØ-öø-ÿ´`-]*$/i.test(value);
    });
    //contador textarea
    $(".input-std-textarea > textarea").keyup(function(){
        var valor = $(this).val().length;
        $(this).parent().find(".contador-text").find("span").text(valor);
    });
    //validacion telefono
    $(".input-std input.telefono").focusout(function(){
        if($(this).val()){
            if( $(this).val().length < 8 ){
                $(this).addClass("invalid").removeClass("valid");
            }else{
                $(this).removeClass("invalid").addClass("valid");
            }
        }else{
            $(this).removeClass("invalid valid");
        }
    });
    //mail
    $(".email").focusout(function(){
        isMail($(this).val(), $(this));
    });

    $(".monto").keyup(function(e){
        $(e.target).val(function(index, value) {
            return value.replace(/\D/g, "")
              .replace(/([0-9])([0-9]{3})$/, '$1.$2')
              .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
          });
    });

    //monto
    $(".input-std > .monto").focusout(function(){
        if( $(this).val() ){
            var attr = $(this).attr("monto-minimo");
            if( typeof attr !== typeof undefined && attr !== false ){
                var valMin = parseInt($(this).attr("monto-minimo").split(".").join(""));
                var valMax = parseInt($(this).attr("monto-maximo").split(".").join(""));
                var monto = parseInt($(this).val().split(".").join(""));
                if( monto < valMin ){
                    $(this).removeClass("valid").addClass("invalid").parent().find(".msj-input-error").text("El monto mínimo es de $"+valMin+".");
                }else if(monto > valMax){
                    $(this).removeClass("valid").addClass("invalid").parent().find(".msj-input-error").text("El monto máximo es de $"+valMax+".");
                }else{
                    $(this).removeClass("invalid").addClass("valid");
                }
            }
        }else{
            $(this).removeClass("valid invalid");
        }
    });
});

//funciones
(function($){
    $.fn.inputFilter = function(inputFilter){
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function(){
            if( inputFilter(this.value) ){
               this.oldValue = this.value;
               this.oldSelectionStart = this.selectionStart;
               this.oldSelectionEnd = this.selectionEnd;
            }else if(this.hasOwnProperty("oldValue")){
               this.value = this.oldValue;
               this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }else{
               this.value = "";
            }
        });
    };
}(jQuery));

//resize textarea
(function($){
    $(".resize-textarea").each(function(){
        var $this = $(this);
        $this.css("min-height", $this.css("height"));
        $this.css("overflow", "hidden");
    }).on("input paste", function(){
        var $this = $(this);
        var offset = $this.innerHeight() - $this.height();
        if( $this.innerHeight < this.scrollHeight ){
            $this.height(this.scrollHeight - offset);
        }else{
            $this.height(1);
            $this.height(this.scrollHeight - offset);
        }
    });
}(jQuery));

function isMail(mail, el){
    var rg=/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!rg.test(mail)){
        if(mail==""){
            el.removeClass("invalid valid");
            return false;
        }else{
            el.removeClass("valid").addClass("invalid");
            return false;
        }
    }else{
        el.removeClass("invalid").addClass("valid");
        return true;
    }
}

function vl(vl) {
    var rut = vl;
    while (rut.charAt(0) === '0') {
        rut = rut.substr(1)
    }
    $("#rut").val(rut)
}

function formatear(vv) {
    var iniVal = this.quitar_formato(vv);
    var rut_2 = iniVal.substring(0, iniVal.length - 1),
        f = "";
    while (rut_2.length > 3) {
        f = '.' + rut_2.substr(rut_2.length - 3) + f;
        rut_2 = rut_2.substring(0, rut_2.length - 3);
    }
    if ($.trim(rut_2) === '') {
        return '';
    } else {
        var ok = rut_2 + f + "-" + iniVal.charAt(iniVal.length - 1);
        if (valida(ok)) {
            $("#rut").removeClass("invalid").addClass("valid");
        } else {
            $("#rut").removeClass("valid").addClass("invalid");
        }
        return rut_2 + f + "-" + iniVal.charAt(iniVal.length - 1);
    }
}

function quitar_formato(rut) {
    rut = rut.split(' ').join('').split('-').join('').split('.').join('');
    return rut;
}

function valida(rutValidar) {
    if (!/[0-9]{1,3}.[0-9]{3}.[0-9]{3}-[0-9Kk]{1}/.test(rutValidar) || /^00*/.test(rutValidar)) {
        $("#rut").removeClass("valid").addClass("invalid");
    } else {
        $("#rut").removeClass("invalid").addClass("valid");
    }
    var tmp = rutValidar.split('-');
    var dv_2 = tmp[1],
        rut_v2 = tmp[0].split('.').join('');
    if (dv_2 === 'K' || dv_2 === 'k') {
        dv_2 = 'k';
    } else {
        dv_2 = parseInt(tmp[1]);
    }
    return (dv(rut_v2) === dv_2)
}

function dv(rut) {
    var M = 0,
        S = 1;
    for (; rut; rut = Math.floor(rut / 10)) {
        S = (S + rut % 10 * (9 - M++ % 6)) % 11;
    }
    if (S) {
        return S - 1;
    } else {
        return 'k'
    }
}