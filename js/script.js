$(document).ready(function(e){
  
   let src =$('#product-img').css('background-image');
   src = src.split('/');
   let len = src.length;
   let img = src[len-1];
   let ind = img.indexOf('"');
   img = img.slice(0, ind);
   
   $('#product-img').mousemove(function (e) { 
    e = e || window.event;
    // alert($(this).position().left);
    /*get the x and y positions of the image:*/
    // let img_background_position = $(this).css("background-position").split(' ');
    let h = $(this).css("height");
    let w = $(this).css("width");
    let img_x = $(this).position().left;//parseFloat(img_background_position[0].replace(/[^0-9-]/g, ''));
    let img_y = $(this).position().top;//parseFloat(img_background_position[1].replace(/[^0-9-]/g, ''));
    
    
    // /*calculate the cursor's x and y coordinates, relative to the image:*/
    let x = e.pageX - img_x;
    let y = e.pageY - img_y;

       
    $("#product-img").css({"background-image": "url(img/"+img+")","background-size": "200% 200%","background-repeat": "no-repeat","background-position": x+"px " + y+"px"});
    
    
    function imageZoom(imgID, resultID) {
        var img, lens, result, cx, cy;
        img = document.getElementById(imgID);
        result = document.getElementById(resultID);
        /*create lens:*/
        lens = document.createElement("DIV");
        lens.setAttribute("class", "img-zoom-lens");
        /*insert lens:*/
        img.parentElement.insertBefore(lens, img);
        /*calculate the ratio between result DIV and lens:*/
        cx = result.offsetWidth / lens.offsetWidth;
        cy = result.offsetHeight / lens.offsetHeight;
        /*set background properties for the result DIV:*/
        result.style.backgroundImage = "url('" + img.src + "')";
        result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
        /*execute a function when someone moves the cursor over the image, or the lens:*/
        lens.addEventListener("mousemove", moveLens);
        img.addEventListener("mousemove", moveLens);
        /*and also for touch screens:*/
        lens.addEventListener("touchmove", moveLens);
        img.addEventListener("touchmove", moveLens);
        function moveLens(e) {
          var pos, x, y;
          /*prevent any other actions that may occur when moving over the image:*/
          e.preventDefault();
          /*get the cursor's x and y positions:*/
          pos = getCursorPos(e);
          /*calculate the position of the lens:*/
          x = pos.x - (lens.offsetWidth / 2);
          y = pos.y - (lens.offsetHeight / 2);
          /*prevent the lens from being positioned outside the image:*/
          if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
          if (x < 0) {x = 0;}
          if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
          if (y < 0) {y = 0;}
          /*set the position of the lens:*/
          lens.style.left = x + "px";
          lens.style.top = y + "px";
          /*display what the lens "sees":*/
          result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
        }
        function getCursorPos(e) {
          var a, x = 0, y = 0;
          e = e || window.event;
          /*get the x and y positions of the image:*/
          a = img.getBoundingClientRect();
          /*calculate the cursor's x and y coordinates, relative to the image:*/
          x = e.pageX - a.left;
          y = e.pageY - a.top;
          /*consider any page scrolling:*/
          x = x - window.pageXOffset;
          y = y - window.pageYOffset;
          return {x : x, y : y};
        }
      }
       
   });

   $('#product-img').mouseout(function () { 
      $(this).css({"background-image": "url(img/"+img+")","background-size": "100% 100%","background-repeat": "no-repeat","background-position": "0% 0%"});    
   });

   function Product(pname, pimage, pprice, pcolor, psize, pquantity){
       this.pname = pname || '',
       this.pimage = pimage || '',
       this.pprice = pprice || 0.00,
       this.pcolor = pcolor || '',
       this.psize = psize || '',
       this.pquantity = pquantity || 1
   };

   let name = $('#name').text().trim();
   let image = "img/"+img;
   let price = parseFloat($('#price span:first-child').text().split('$')[1]);
  // let color = $('#color  span:first-child').text().split(':')[1].trim();
   let color = $('#pickcolor').val();
   $('#c').css("background-color",color) ;
   $("#pickcolor").change(function(){
       color = $(this).val();
      $('#c').css("background-color",color) ;
   });

   let product = null;
   let total_items = 0;
   
   $('#size-list div').click(function(){

       $("#size-choice").text($(this).text().trim());
       $("#size-quantity").text($(this).attr("data").trim() + " in stock").css({"margin-top":"10px","color":"#d7226f"});
   });

  
   let show_lightbox = false;
   $("#lightbox").hide();

   $('#add_to_cart').click(function(){
    
        let size = $("#size-choice").text();
        let quantity = $('#qnty input').val();
        $('#qnty input').change(function(){
            quantity = Number($(this).val());
            if(quantity == NaN){
                $('qnty-error').text("Please Enter a valid number").css("color","#d7226f");
                return false;
            }
        });

        
    
        if(size == "" || size == "Please select a size."){
            $("#size-choice").text("Please select a size.");
        }else{
            product = new Product(name, image, price, color, size,quantity);
            let total_quantity = 0;
            total_items = 0;
            total_quantity += quantity;
            total_items += total_quantity
            $("#item_count").text(total_items);
          //  console.log(product);
          localStorage.setItem("product", JSON.stringify(product));
          
          show_lightbox = true;

          if(show_lightbox){
                product = JSON.parse(localStorage.getItem("product"));
                let cart_subtotal = parseFloat(Number(product.pquantity)*product.pprice).toFixed(2);
                
                $("#p-summary div img").attr({"src": product.pimage, "alt": product.pname});
                $("#p-summary div h2").text(product.pname).css("color","#262a39");
                $("#p-summary div p:first").text("Price : $"+product.pprice).css({"color":"#d7226f"});
                $("#p-summary div :nth-child(3)").text("Size : "+product.psize).css({"color":"#262a39"});
                $("#p-summary div :nth-child(4)").text("Color : "+product.pcolor).css({"background-color":color});
                $("#p-summary div :nth-child(5)").text("Quantity : "+product.pquantity).css({"color":"#262a39"});
                $("#p-summary div :nth-child(6)").text("Cart Sub-Total : $"+ cart_subtotal).css({"color":"#262a39","background-color":"#e2e2e2","padding":"15px 0"});
                // console.log(product.psize);
                $("#lightbox").show("slow");

          }
        }
    
   });

  $("#close").click(function () {  
      $("#lightbox").hide("slow");
  });

  $(".thumbnail").click(function(){
      let src = $(this).attr('src');
      $("#product-img").css({"background-image": "url("+src+")","background-size": "100% 100%","background-repeat": "no-repeat","background-position": "0% 0%"});          
  });

});