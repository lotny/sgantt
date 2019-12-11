var chart = (function(){

    var loadedData;
    var startDate = null;
    var endDate = null;
    var scale = 60; // should be value in miliseconds for each 60 pixels
    var cellWidth = 60;
    var timeInCell = 18e5; //should it be miliseconds or just minutes?

    var leftMargin = 150;
    


    var attachScrollEvents = function(){
        document.getElementsByClassName("panel-right")[0].addEventListener("scroll", onScrollVertical)

            }

    function onScrollVertical(ev){
        //console.info("scroll detected");
        var scrollLeft = ev.target.scrollLeft;
        //console.log(scrollLeft);
        document.getElementsByClassName("gnt-panel-timeline")[0].scrollLeft = scrollLeft;
        //console.log(your_div);
        //your_div.scrollLeft = scrollLeft ;

    }

    var setScale = function(scale){
        console.log(scale);
        
        switch (scale){
            case "day":
                timeInCell = 432e5;
                break;
            case "hour":
                timeInCell = 18e5;
                break;
        }

        redraw();
    }

    var redraw = function(){
        //destroyActivities();
        destroyTimeLine();
        drawTimeLine();
        destroyResources();
        drawResources();
    }

    var get = function(){

    }

    var draw = function(){

    }

    var drawUpperTimeLine = function(){

    }

    var drawTimeLine = function(){
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
        
        //  should be a limit on steps!
        steps = steps > 100 ? 100 : steps;
        // time of the first cell
        let cellTime = sDate; //new Date("December 1, 2019, 12:30:00");

        for (var x = 0; x < steps; x++)
        {
            let hours = ("0" + cellTime.getHours()).slice(-2);
            let minutes = ("0" + cellTime.getMinutes()).slice(-2);
            if (timeInCell == 18e5){
                drawTimeCell(   minutes);
            } else {
                drawTimeCell(hours + ":" + minutes);
            }
            
            
            if (x % 2 == 0){
                drawParentTimeCell(cellTime);
            }
            cellTime = new Date(cellTime.getTime() + timeInCell);
        }

    }

    var destroyResources = function(){
        var activitiesNode = document.getElementsByClassName("activities")[0];
        activitiesNode.innerHTML = "";
        var panelLeftNode = document.getElementsByClassName("panel-left")[0];
        panelLeftNode.innerHTML = "";

    }

    var drawResources = function(){
        for (var x = 0; x < chartData.length; x++){
            drawSingleResource(chartData[x].name, chartData[x].activities.length);
            drawActivities(chartData[x].activities);
        }

    }

    var drawSingleResource = function(name, numberOfActivities){
        var cell = document.createElement("div");
        let height = numberOfActivities == 0 ? 50 : numberOfActivities * 50;
        cell.setAttribute("style", "height:" + height + "px;");
        cell.setAttribute("class", "row-resource");
        cell.innerText = name;
        document.getElementsByClassName("panel-left")[0].appendChild(cell);
    }

    var destroyActivities = function(){
        var activities = document.getElementsByClassName("row-activity");
        //for (var x = 0; x < activities.length; x++){
        //    activities[x].remove();
        //}
    }

    var destroyTimeLine = function(){
        var timeline = document.getElementsByClassName("timeline")[0];
        timeline.innerHTML = "";
        var parentTimeline = document.getElementsByClassName("timeline-top")[0];
        parentTimeline.innerHTML = "";
    }

    var drawActivities = function(activities){
        var activitiesCount = activities.length
        var actGroupEl = document.createElement("div");
        actGroupEl.setAttribute("style", "height:" + (activitiesCount * 50) + "px;");

        for (var x = 0; x < activitiesCount; x++){
            drawSingleActivity(activities[x], actGroupEl);
        }

        document.getElementsByClassName("activities")[0].appendChild(actGroupEl);
    }

    var drawSingleActivity = function(activity, parentEl){
        
        let activityRowEl = document.createElement("div");
        activityRowEl.setAttribute("class","row-activity-parent")
        
        var activityEl = document.createElement("div");
        var actStart = new Date(activity.actualStart);
        var actEnd = new Date(activity.actualEnd);
        var margin =  leftMargin +  ((actStart.getHours() - startDate.getHours()) * cellWidth);

   

        var width = 1;
        if ( timeInCell == 432e5){
            width  =  2 * cellWidth * (actEnd.getDate() - actStart.getDate());
        
        } else {

            width  =  cellWidth * ((actEnd - actStart) / timeInCell); 
        }
        if (width < 1){
            width = 2;
        } 
      
        //var fillerLeftEl = document.createElement("div");
        //fillerLeftEl.setAttribute("style", "width:" + margin + "px;");

        activityEl.setAttribute("data-start", actStart);
        activityEl.setAttribute("style", "left:" + margin + "px;" + "width:" + width + "px;");
        activityEl.setAttribute("class", "row-activity " + activity.status);
        activityEl.innerText = activity.name;

        //activityRowEl.appendChild(fillerLeftEl);
        //activityRowEl.appendChild(activityEl);
        parentEl.appendChild(activityEl);
    }


    var drawParentTimeCell = function(date){
        
        let parentCellDate = new Date(date);
        let innerText = "";
        if (timeInCell == 18e5){
            innerText = parentCellDate.getHours();
        } else {
            innerText = parentCellDate.getDate();
        }

        let width = (cellWidth * 2) - 1;
        var cell = document.createElement("div");
        cell.setAttribute("style", "width:" + width);
        cell.setAttribute("class", "time-cell-top");
        cell.innerText = innerText;
        document.getElementsByClassName("timeline-top")[0].appendChild(cell);
    }

    var drawTimeCell = function(timeText){
        let width = 59;
        var cell = document.createElement("div");
        cell.setAttribute("style", "width:" + width + "px");
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
        console.log("start date");
        console.log(startDate);
    }

    function getHigherDate(endDate, actualEnd){
        if (endDate === null){
            endDate = actualEnd;
        }
        if (new Date(actualEnd) > new Date(endDate)){
            return new Date(actualEnd);
        } else {
            return new Date(endDate);
        }
    }

    function getLowerDate(startDate, actualStart){
        if (startDate === null){
            startDate = actualStart;
        }
        if (new Date(startDate) > new Date(actualStart)){
            return new Date(actualStart);
        } else {
            return new Date(startDate);
        }
         
    
    }

    var init = function(data){
        loadedData = data;
        getDateRange(loadedData);


        drawTimeLine();
        drawResources();
        attachScrollEvents();
    }

    return {
        init : init,
        
        drawTimeCell : drawTimeCell,
        drawTimeLine : drawTimeLine,
        setScale : setScale
    }
})();
