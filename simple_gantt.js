
// scale should be up to minutes
// 
var chart = (function(){

    var loadedData;

    var startDate = new Date();
    var endDate = new Date();

    var scale = 60; // should be value in miliseconds for each 60 pixels

    var cellWidth = 60;
    var timeInCell = 18e5;
    var leftMargin = 150;
    

    get = function(){

    }

    draw = function(){

    }

    drawTimeLine = function(){
        startDate = new Date("December 1, 2019, 12:00:00");
        endDate = new Date("December 1, 2019, 23:00:00");
        // returns difference in miliseconds 18e5 - half an hour
        let steps = Math.abs(endDate - startDate) / timeInCell; 
        console.log(steps);
        //let cellTime = startDate;
        let cellTime = new Date("December 1, 2019, 12:30:00");
        for (var x = 0; x < steps; x++)
        {
            let hours = ("0" + cellTime.getHours()).slice(-2);
            let minutes = ("0" + cellTime.getMinutes()).slice(-2);
            drawTimeCell(hours + ":" + minutes);
            cellTime = new Date(cellTime.getTime() + 1800000);
        }

    }

    drawResources = function(){
        for (var x = 0; x < chartData.length; x++){
            drawSingleResource(chartData[x].name, chartData[x].activities.length);
            drawActivities(chartData[x].activities);
        }

    }

    drawSingleResource = function(name, numberOfActivities){
        
        var cell = document.createElement("div");
        cell.setAttribute("style", "height:" + (numberOfActivities + 1 )* 30 + "px;");
        cell.setAttribute("class", "row-resource");
        cell.innerText = name;
        document.getElementsByClassName("panel-left")[0].appendChild(cell);

        
    }

    drawActivities = function(activities){
        for (var x = 0; x < activities.length; x++){
            drawSingleActivity(activities[x]);
        }
    }

    drawSingleActivity = function(activity){
        var activityEl = document.createElement("div");
        var actStart = new Date(activity.actualStart);
        var actEnd = new Date(activity.actualEnd);
        var margin =  leftMargin + (1 + actStart.getHours() - startDate.getHours()) * cellWidth;


        var width  = cellWidth * (actEnd.getHours() - actStart.getHours()); 
        activityEl.setAttribute("style", "width:" + width + "px;margin-left:" + margin);
        activityEl.setAttribute("class", "row-activity");
        activityEl.innerText = activity.name;

        document.getElementsByClassName("panel-right")[0].appendChild(activityEl);
    }


    drawTimeCell = function(time){
        let width = 59;
        var cell = document.createElement("div");
        cell.setAttribute("style", "width:" + width);
        cell.setAttribute("class", "time-cell");
        cell.innerText = time;
        document.getElementsByClassName("timeline")[0].appendChild(cell);
    }

    drawGanttRow = function(time){
        
        let rowTime = new Date(startDate.getTime() + timeInCell * Math.floor(Math.random() * 100))

        var margin = rowTime.getHours() * cellWidth;

        //var margin = Math.floor((Math.random() * 1000) + 1);
        var width  = Math.floor((Math.random() * 100) + 100 );
        var activity = document.createElement("div");
        activity.setAttribute("style", "width:" + width + "px;margin-left:" + margin);
        activity.setAttribute("class", "row-activity");
        activity.innerText = "activity";
        return activity;
    }

    function getStartDate(data){
        
        for (var x = 0; x < data.length; x++){
            if (data[x].activities === undefined) continue;
            for (var y = 0; y < data[x].activities.length; y++){
                startDate = getLowerDate(startDate, data[x].activities[y].actualStart)
                
            }
        }
        console.log(startDate);
    }

    function getLowerDate(startDate, actualStart){
        
        if (new Date(startDate) > new Date(actualStart)){
            return actualStart;
        } else {
            return startDate;
        }
         
    
    }

    init = function(data){
        loadedData = data;
        startDate = getStartDate(loadedData);
        
        drawTimeLine();
        drawResources();
    }

    return {
        init : init,
        drawGanttRow : drawGanttRow,
        drawTimeCell : drawTimeCell,
        drawTimeLine : drawTimeLine
    }
})();
