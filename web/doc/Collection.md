### css ###

- visibility and display

	jquery hide() function set the **display** style to none, which completely removes the element from the document flow and causes it to not take up space.

	**visibility**:hidden keeps the space as it is.


- innerwidth, outerwidth, outerwidth和width的区别

	- width(): the width of element

	- innerwidth() : width + padding

	- outerwidth(): innerwidth + border

	- outerwidth(True): outerwidth + margin


		下面demo输出：200, 220, 240, 260		

			<script type="text/javascript">
				$(document).ready(function(){
				  $(".btn1").click(function(){
				    var obj=$("#p_obj");
				    alert(obj.width());
				    alert(obj.innerWidth());
				    alert(obj.outerWidth());
				    alert(obj.outerWidth(true));
				  });
				});
			</script>
			<p id="p_obj" style="background-color:yellow; width:200px; padding:10px; border:10px solid blue; margin:10px;">
				This is a paragraph.
			</p>
			<button class="btn1">输出高度</button>


		`