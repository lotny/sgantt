
// scale should be up to minutes
// 
var chart = (function(){

    var startDate = new Date();
    var endDate = new Date();

    var data;

    get = function(){

    }

    draw = function(){

    }

    drawTimeLine = function(){
        startDate = Date.UTC(2019,12,1,12,0);
        endDate = Date.UTC(2019,12,1,24,0);
        // returns difference in miliseconds 18e5 - half an hour
        let range = Math.abs(endDate - startDate) / 18e5; 
        console.log(range);
        //let cellTime = startDate;
        let cellTime = new Date("December 1, 2019, 12:30:00");
        for (var x = 0; x<range; x++)
        {
            let hours = cellTime.getHours() == "0" ? "00" : cellTime.getHours();
            let minutes = cellTime.getMinutes() == "0" ? "00" : cellTime.getMinutes();
            drawTimeCell(hours + ":" + minutes);
            cellTime = new Date(cellTime.getTime() + 1800000);
        }

    }

    drawActivities = function(){

        //for (var x = 0; x < )
    }


    drawTimeCell = function(time){
        let width = 60;
        var cell = document.createElement("div");
        cell.setAttribute("style", "width:" + width);
        cell.setAttribute("class", "time-cell");
        cell.innerText = time;
        document.getElementsByClassName("timeline")[0].appendChild(cell);
    }

    drawGanttRow = function(time){

        var margin = Math.floor((Math.random() * 1000) + 1);
        var width  = Math.floor((Math.random() * 100) + 100 );
        var activity = document.createElement("div");
        activity.setAttribute("style", "width:" + width + "px;margin-left:" + margin);
        activity.setAttribute("class", "row-activity");
        activity.innerText = "activity";
        return activity;
    }

    function getStartDate(data){

    }

    init = function(data){
        startDate = getStartDate(data);
         
    }

    return {
        init : init,
        drawGanttRow : drawGanttRow,
        drawTimeCell : drawTimeCell,
        drawTimeLine : drawTimeLine
    }
})();
