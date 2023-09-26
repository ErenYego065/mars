Template.riskProfileViewBox.rendered = function(){
  Session.set('riskBreakdownShownFlag',false);
  this.autorun(function(){
    drawRiskProfileChart();
    // console.log('Risk Recalc');
  }.bind(this));
};

Template.riskProfileViewBox.helpers({
  displaySection : function(){ 
    if(Session.get('riskBreakdownShownFlag')){
      return "display:inline;"
    }
    else{
      return "display:none;"
    }
  },
  riskBreakdownShownFlag : function(){return Session.get('riskBreakdownShownFlag');}
});

function getRiskNumber (str){
  if(!str){
    return 0;
  }
  else if(str === 'LOW'){
    return 1.66;
  }
  else if(str === 'MEDIUM'){
    return 3.33;
  }
  else {
    return 5;
  }
}

function getRiskString (num){
  if(num===0){
    return "Not set";
  }
  else if(num === 1.66){
    return 'LOW';
  }
  else if(num === 3.33){
    return 'MEDIUM';
  }
  else {
    return 'HIGH';
  }
}

function drawRiskProfileChart (){
  let risk = Session.get('riskProfileDetails');
  let countryRisk = getRiskNumber(risk.risk.country);
  let occupationRisk = getRiskNumber(risk.risk.occupation);
  let politicalExposureRisk = getRiskNumber(risk.risk.political_exposure);
  let watchlistRisk = getRiskNumber(risk.risk.watchlist);
  let relationshipRisk = getRiskNumber(risk.risk.relationship);
  
  let radarData = {
      labels: ["Country", "Occupation", "Political Exposure", "Relationship", "Watchlist"],
      datasets: [
          {
              pointStyle:'circle',
              pointRadius: 1,
              pointBorderColor: "rgba(42, 85,142,0.2)",
              pointBackgroundColor:"rgba(42, 85,142,0.2)",
              backgroundColor: "rgba(51,170,112,0.4)",
              borderColor: "rgba(42, 85,142,1)",
              data: [countryRisk, occupationRisk, politicalExposureRisk, relationshipRisk, watchlistRisk]
          }
      ]
    };
    
    let radarOptions = {
      responsive: true,
      tooltips: {
        callbacks: {
          title: function(tooltipItem, data) {
            return data['labels'][tooltipItem[0]['index']] + ' Risk';
          },
          label: function(tooltipItem, data) {
            return toTitleCase(getRiskString(Number(data['datasets'][0]['data'][tooltipItem['index']])));
          }
        }
      },
      legend: {
          display: false,
      },
      scale: {
        ticks: {
          maxTicksLimit: 4,
          beginAtZero: true,
          min: 0,
          max: 5,
          display: false,
        },
        pointLabels: {
          fontSize: 10
        }
      }
    };
    
    let ctx = document.getElementById("radarChart").getContext("2d");
    new Chart(ctx, {type: 'radar', data: radarData, options:radarOptions});
}