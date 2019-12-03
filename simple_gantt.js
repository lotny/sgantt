var chart = (function(){

    var loadedData;

    var startDate = new Date();
    var endDate = new Date();

    var scale = 60; // should be value in miliseconds for each 60 pixels

    var cellWidth = 60;
    var timeInCell = 18e5; //should it be miliseconds or just minutes?

    var leftMargin = 150;
    

    setScale = function(scale){
        console.log(scale);
        
        if (scale == "day"){
            timeInCell = 432e5;
            redraw();
        } 

        if (scale == "hour"){
            timeInCell = 18e5;
            redraw();
        }
        
    }

    redraw = function(){
        //destroyActivities();
        destroyTimeLine();
        drawTimeLine();
    }

    get = function(){

    }

    draw = function(){

    }

    drawUpperTimeLine = function(){

    }

    drawTimeLine = function(){
        sDate = new Date(startDate);
        sDate.setHours(sDate.getHours() + Math.round(sDate.getMinutes()/60));
        sDate.setMinutes(0);
        sDate.setSeconds(0);

        eDate = new Date(endDate);
        eDate.setHours(eDate.getHours() + Math.round(eDate.getMinutes()/60));
        eDate.setMinutes(0);
        eDate.setSeconds(0);

        // returns difference in miliseconds 18e5 - half an hour
        let steps = Math.floor(Math.abs(eDate - sDate) / timeInCell);
        console.log("steps:" + steps + ", time in cell:" + timeInCell);
        
        // time of the first cell
        let cellTime = sDate; //new Date("December 1, 2019, 12:30:00");



        for (var x = 0; x < steps; x++)
        {
            let hours = ("0" + cellTime.getHours()).slice(-2);
            let minutes = ("0" + cellTime.getMinutes()).slice(-2);
            drawTimeCell(hours + ":" + minutes);
            cellTime = new Date(cellTime.getTime() + timeInCell);
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


    destroyActivities = function(){
        var activities = document.getElementsByClassName("row-activity");
        //for (var x = 0; x < activities.length; x++){
        //    activities[x].remove();
        //}
    }

    destroyTimeLine = function(){
        var timeline = document.getElementsByClassName("timeline")[0];
        timeline.innerHTML = "";
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

        document.getElementsByClassName("activities")[0].appendChild(activityEl);
    }


    drawTimeCell = function(timeText){
        let width = 59;
        var cell = document.createElement("div");
        cell.setAttribute("style", "width:" + width);
        cell.setAttribute("class", "time-cell");
        cell.innerText = timeText;
        document.getElementsByClassName("timeline")[0].appendChild(cell);
    }



    function getDateRange(data){
        
        for (var x = 0; x < data.length; x++){
            if (data[x].activities === undefined) continue;
            for (var y = 0; y < data[x].activities.length; y++){
                startDate = getLowerDate(startDate, data[x].activities[y].actualStart);
                endDate = getHigherDate(endDate, data[x].activities[y].actualEnd);
                
            }
        }
    }

    function getHigherDate(endDate, actualEnd){
        if (new Date(actualEnd) > new Date(endDate)){
            return new Date(actualEnd);
        } else {
            return new Date(endDate);
        }
    }

    function getLowerDate(startDate, actualStart){
        
        if (new Date(startDate) > new Date(actualStart)){
            return new Date(actualStart);
        } else {
            return new Date(startDate);
        }
         
    
    }

    init = function(data){
        loadedData = data;
        getDateRange(loadedData);
        

        drawTimeLine();
        drawResources();
    }

    return {
        init : init,
        
        drawTimeCell : drawTimeCell,
        drawTimeLine : drawTimeLine,
        setScale : setScale
    }
})();
