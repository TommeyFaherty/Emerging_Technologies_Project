var canvas, ctx, flag = false,
                prevX = 0,
                currX = 0,
                prevY = 0,
                currY = 0,
                dot_flag = false;

            var x = "white",
                y = 8;

            function init() {
                canvas = document.getElementById('can');
                ctx = canvas.getContext("2d");
                w = canvas.width;
                h = canvas.height;

                //Fill in black background of canvas
                ctx.fillStyle = "black"
                ctx.fillRect(0, 0, w, h);

                canvas.addEventListener("mousemove", function (e) {
                    findxy('move', e)
                }, false);
                canvas.addEventListener("mousedown", function (e) {
                    findxy('down', e)
                }, false);
                canvas.addEventListener("mouseup", function (e) {
                    findxy('up', e)
                }, false);
                canvas.addEventListener("mouseout", function (e) {
                    findxy('out', e)
                }, false);
            }

            function draw() {
                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(currX, currY);
                ctx.strokeStyle = x;
                ctx.lineWidth = y;
                ctx.stroke();
                ctx.closePath();
            }

            function save() {
                document.getElementById("canvasimg").style.border = "2px solid";
                var dataURL = canvas.toDataURL();
                document.getElementById("canvasimg").src = dataURL;
                document.getElementById("canvasimg").style.display = "inline";
            }

            function findxy(res, e) {
                if (res == 'down') {
                    prevX = currX;
                    prevY = currY;
                    currX = e.clientX - canvas.offsetLeft;
                    currY = e.clientY - canvas.offsetTop;

                    flag = true;
                    dot_flag = true;
                    if (dot_flag) {
                        ctx.beginPath();
                        ctx.fillStyle = x;
                        ctx.fillRect(currX, currY, 2, 2);
                        ctx.closePath();
                        dot_flag = false;
                    }
                }
                if (res == 'up' || res == "out") {
                    flag = false;
                }
                if (res == 'move') {
                    if (flag) {
                        prevX = currX;
                        prevY = currY;
                        currX = e.clientX - canvas.offsetLeft;
                        currY = e.clientY - canvas.offsetTop;
                        draw();
                    }
                }
            }

            function copy() {
                var imgData = ctx.getImageData(10, 10, canvas.width, canvas.height);
                ctx.putImageData(imgData, 20, 20);
            }

            //function convertAndSend() {
            $("#submitButton").click(function(e) {

                e.preventDefault();
                
                var dataURL = canvas.toDataURL();

                //print image data
                //console.log(dataURL)

                //Send AJAX request
                $.post("/prediction", {"canvasAsImage": dataURL}, 
                function(data){
                    
                    //Update text area with predicted number
                    $("#predictionText").text(data.message);

                });
            });
