var txtA1 = false;
var txtA2 = false;
var mouseY = 0;
var maxY = document.documentElement.clientHeight;
var percent = 50;

function run() {
  var el = document.getElementById('textarea1');
  el && eval(el.value);
}

$("#injectButton").click(function(){
    run();
    // $("#textarea2").val($("#textarea1").val());
    setTimeout(detectTA2, 10);
});

$("#deleteButton").click(function(){
    clearTA1();
    setTimeout(detectTA1, 10);
});

$("#deleteButton2").click(function(){
    clearTA2();
    setTimeout(detectTA2, 10);
});

$('#textarea1').bind('input propertychange', function() {
    setTimeout(detectTA1, 20);
});

$('#textarea2').bind('input propertychange', function() {
    setTimeout(detectTA2, 20);
});

function detectTA1(){
    var element = document.getElementById("textarea1");
    if (element.clientHeight < element.scrollHeight) {
        $("#injectButton").removeClass("mx-2").addClass("mx-4");
        $("#deleteButton").removeClass("mx-2").addClass("mx-4");
    } else {
        $("#injectButton").removeClass("mx-4").addClass("mx-2");
        $("#deleteButton").removeClass("mx-4").addClass("mx-2");
    }
}

function detectTA2(){
    var element = document.getElementById("textarea2");
    if (element.clientHeight < element.scrollHeight) {
        $("#logIcon").removeClass("mx-2").addClass("mx-4");
        $("#deleteButton2").removeClass("mx-2").addClass("mx-4");
    } else {
        $("#logIcon").removeClass("mx-4").addClass("mx-2");
        $("#deleteButton2").removeClass("mx-4").addClass("mx-2");
    }
}

function clearTA1(){
    $("#textarea1").val("");
}

function clearTA2(){
    document.getElementById("textarea2").value = "";
    // ta.val("");
    // ta.reset();
}

(function(){
    var oldLog = console.log;
    console.log = function (message) {
        $("#textarea2").val($("#textarea2").val() + message + "\n");
        $('#textarea2').scrollTop($('#textarea2')[0].scrollHeight);
        oldLog.apply(console, arguments);
    };
})();

// 
//  Resizer 
// 

var resizerObj = document.getElementById("resizer");

resizerObj.addEventListener("mousedown", start, false);

function start(e){
    mouseY = e.pageY;
    maxY = document.documentElement.clientHeight;
    // console.log("mouseY: " +  mouseY + "\nmaxY: " + maxY + "\nPercent on screen: " + parseFloat((mouseY / maxY) * 100).toFixed(2) + "%");

    document.addEventListener('mousemove', move, false);
    document.addEventListener('mouseup', end, false);
}

function move(e){
    maxY = document.documentElement.clientHeight;
    percent = parseFloat((e.pageY/maxY)*100).toFixed(2);
    // console.log(percent + "%");
    if ((percent > 17) && (percent < 83)){  
        $(".textarea1").height((percent - 5) + "vh");
        $(".textarea2").height((95 - percent) + "vh");
    }
}

function end(e){
    document.removeEventListener('mousemove', move, false);
    document.removeEventListener('mouseup', end, false);
}

$("#resizer").dblclick(function(){
    $(".textarea1").height(45 + "vh");
    $(".textarea2").height(45 + "vh");
});

// 
//  Resizer
// 


// 


// 
// Accept tab
// 

$("#textarea1").keydown(function(e) {
    if(e.keyCode === 9) { // tab was pressed
        // get caret position/selection
        var start = this.selectionStart;
            end = this.selectionEnd;

        var $this = $(this);

        // set textarea value to: text before caret + tab + text after caret
        $this.val($this.val().substring(0, start)
                    + "\t"
                    + $this.val().substring(end));

        // put caret at right position again
        this.selectionStart = this.selectionEnd = start + 1;

        // prevent the focus lose
        return false;
    }
});

// 
// Accept tab
// 
