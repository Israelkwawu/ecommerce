$(document).ready(function(){

    product = JSON.parse(localStorage.getItem("product"));
    let subtotal = 0;
    let sum_total = 0;
   // let total = 0;

    if(product){
        $("#cart-page-product div img").attr({"src":product.pimage, "alt": product.pname});
        $("#cart-page-product :nth(2) h3").text(product.pname).css("color","#262a39");
        $("#cart-page-product :nth(2) p").html("Size : "+ product.psize + "<br>"+"Color : "+product.pcolor).css("color","#262a39");
        $('#co').css({"display: ":"block","background-color":product.pcolor,"height":"15px","width":"15px"}) ;
        $("#q").html('<input id="v" type="number" min="1" value="'+product.pquantity+'">').css("color","#262a39");
        $("#p").text("$"+product.pprice).css("color","#262a39");
        if( product.pquantity == NaN){
            $("#v").val(1);
        }

        subtotal = (Number(product.pquantity)  * parseFloat(product.pprice)).toFixed(2) ;
        sum_total = subtotal;
       // total = total  + subtotal;

        $("#s").text("$"+subtotal).css("color","#262a39");
        $("#total").text("$"+subtotal).css("color","#ffffff");
        $("#sum-subtotal").text("$"+subtotal);
        $("#sum-estotal").text("$"+subtotal);
        $("#sum-total").text("$"+sum_total);

        $("#v").change(function (e) { 
            e.preventDefault();
            if( $(this).val() == NaN){
                $("#v").val(1);
                subtotal = (Number($(this).val())  * parseFloat(product.pprice)).toFixed(2) ;
                $("#s").text("$"+subtotal).css("color","#262a39");
                sum_total = subtotal;

                $("#total").text("$"+subtotal).css("color","#262a39");
                $("#sum-total").text("$"+sum_total);
            }
            subtotal = (Number($(this).val())  * parseFloat(product.pprice)).toFixed(2) ;
            sum_total = subtotal;
            $("#s").text("$"+subtotal).css("color","#262a39");

           // total = total + subtotal;
            $("#total").text("$"+subtotal).css("color","#ffffff");
            $("#sum-subtotal").text("$"+subtotal);
            $("#sum-estotal").text("$"+subtotal);
            $("#sum-total").text("$"+sum_total);
        });
        
       
    }else{
        $("tbody").html("<tr><td colspan='7'>No Item Available</td></tr>");
    }
    
    $("#remove").click(function (e) { 
        e.preventDefault();
        
        localStorage.removeItem('product');
        window.location.reload();
        if(product){
            $("#cart-page-product div img").attr({"src":product.pimage, "alt": product.pname});
            $("#cart-page-product :nth(2) h3").text(product.pname).css("color","#262a39");
            $("#cart-page-product :nth(2) p").text("Size : "+ product.psize + " | "+"Color : "+product.pcolor).css("color","#262a39");
            $("#q").html('<input id="v" type="number" min="1" value="'+product.pquantity+'">').css("color","#262a39");
            $("#p").text("$"+product.pprice).css("color","#262a39");
    
            let subtotal = (Number(product.pquantity)  * parseFloat(product.pprice)).toFixed(2) ;
    
            $("#s").text("$"+subtotal).css("color","#262a39");
            $("#v").change(function (e) { 
                e.preventDefault();
                subtotal = (Number($(this).val())  * parseFloat(product.pprice)).toFixed(2) ;
                $("#s").text("$"+subtotal).css("color","#262a39");
                $("#sum-total").text("$"+sum_total);
            });
    
    
        }else{
            $("tbody").html("<tr><td colspan='7'>No Item Available</td></tr>");
        }
        
    });

    $("#thank").attr("href",'');

    $("#apply").click(function(){
        let code = $("#code").val();
        if(code.length == 5){
            $(this).css({"background-color":"#364a53"});
            $("#code").css({"background-color":"white"});
            sum_total *= .5;
            $("#sum-total").text("$"+sum_total);
            $(this).attr('id','');
            $("#code").attr('id','');
            $("sum-checkout a").attr("disable",false);
            $("#thank").attr("href",'thank.html');
        }else{
            $(this).css({"background-color":"red"});
            $("#code").css({"background-color":"red"});
        }
    });

   
    
});