Template.dashboard.rendered = function(){
  activateSpinner();
  Meteor.call('getResource', Session.get('isLive'), URI_CUSTOMER_STATS, function(err,res){
    if(err) {
      if(err.error === 401){Meteor.logout(function() {FlowRouter.go('/login');});}
      toastr.error(err.details, err.reason); 
      deactivateSpinner();      
    } 
    else {
      Session.set('customerStats',res.data);
      var doughnutData;
      var doughnutEmptyOptions = {
        responsive: false,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
      var doughnutOptions = {
        responsive: false,
        legend: {
          display: false
        }
      };

      let riskLow = 0;
      let riskMedium = 0;
      let riskHigh = 0;
      
      if(res.data.hasOwnProperty('risk_levels_breakdown')){
        if(res.data.risk_levels_breakdown.hasOwnProperty('LOW')){
          riskLow = res.data.risk_levels_breakdown.LOW;
          $('#riskScoreAggregate').show();                 
        }
        if(res.data.risk_levels_breakdown.hasOwnProperty('MEDIUM')){
          riskMedium = res.data.risk_levels_breakdown.MEDIUM;
          $('#riskScoreAggregate').show();          
        }
        if(res.data.risk_levels_breakdown.hasOwnProperty('HIGH')){
          riskHigh = res.data.risk_levels_breakdown.HIGH;
          $('#riskScoreAggregate').show();
        }
        if((riskLow + riskMedium + riskHigh) > 0){        
          let unset = res.data.total_customers - (riskHigh + riskMedium + riskLow)
          doughnutData = {
            labels: ["High","Medium","Low", "Risk not calculated"],
            datasets: [{
                data: [riskHigh, riskMedium, riskLow, unset],
                backgroundColor: ["#d9534f","#f7ac62","#37aa73", "#E6E6E6"]
              }]
          };
          var ctx4 = document.getElementById("riskProfileDoughnut").getContext("2d");
          new Chart(ctx4, {type: 'doughnut', data: doughnutData, options:doughnutOptions});
          $('#riskScoreAggregate').show();          
        }

        else{
          doughnutData = {
            labels: ["Risk not calculated"],
            datasets: [{
                data: [1],
                backgroundColor: ["#E6E6E6"]
           }]
          };
          var ctx4 = document.getElementById("riskProfileDoughnut").getContext("2d");
          new Chart(ctx4, {type: 'doughnut', data: doughnutData, options:doughnutEmptyOptions});
          $('#riskScoreAggregate').show();    
        }

      }
    
      let standardIndividuals = 0;
      let pepIndividuals = 0;
      let watchlistIndividuals = 0;   
      let adverseMediaIndividuals = 0;   
      let disqualifiedEntityIndividuals = 0;   
      
      if(res.data.hasOwnProperty('risk_flags_individuals')){
        if(res.data.risk_flags_individuals.hasOwnProperty('pep')){
          pepIndividuals = res.data.risk_flags_individuals.pep;
          $('#individualBreakdownFlag').show();                 
        }
        if(res.data.risk_flags_individuals.hasOwnProperty('watchlist')){
          watchlistIndividuals = res.data.risk_flags_individuals.watchlist;
          $('#individualBreakdownFlag').show();                            
        }
        if(res.data.risk_flags_individuals.hasOwnProperty('am')){
          adverseMediaIndividuals = res.data.risk_flags_individuals.am;
          $('#individualBreakdownFlag').show();                            
        }
        if(res.data.risk_flags_individuals.hasOwnProperty('de')){
          disqualifiedEntityIndividuals = res.data.risk_flags_individuals.de;
          $('#individualBreakdownFlag').show();                            
        }
        if((pepIndividuals + watchlistIndividuals + adverseMediaIndividuals + disqualifiedEntityIndividuals) > 0){
          // standardIndividuals = res.data.individuals - (pepIndividuals + watchlistIndividuals + adverseMediaIndividuals + disqualifiedEntityIndividuals);         
          doughnutData = {
            labels: ["PEP","Adverse Media","Disqualified Person", "Watchlist"],
            datasets: [{
                data: [pepIndividuals,adverseMediaIndividuals,disqualifiedEntityIndividuals, watchlistIndividuals],
                backgroundColor: ["#428bca", "#D9B74F", "#D9824F","#d9534f"]                
           }]
          };
          var ctx4 = document.getElementById("individualBreakdownDoughnut").getContext("2d");
          new Chart(ctx4, {type: 'doughnut', data: doughnutData, options:doughnutOptions});
          $('#individualBreakdownFlag').show();                                                 
        }
       
        else{
          doughnutData = {
            labels: ["No individuals registered"],
            datasets: [{
                data: [1],
                backgroundColor: ["#E6E6E6"]
           }]
          };
          var ctx4 = document.getElementById("individualBreakdownDoughnut").getContext("2d");
          new Chart(ctx4, {type: 'doughnut', data: doughnutData, options:doughnutEmptyOptions});
          $('#individualBreakdownFlag').show();    
        }
      }

      let standardCompanies = 0;
      let pepCompanies = 0;
      let watchlistCompanies = 0;   
      let adverseMediaCompanies= 0;   
      let disqualifiedEntityCompanies = 0;   

      if(res.data.hasOwnProperty('risk_flags_companies')){
        if(res.data.risk_flags_companies.hasOwnProperty('pep')){
          pepCompanies = res.data.risk_flags_companies.pep;
          $('#companyBreakdownFlag').show();                 
        }
        if(res.data.risk_flags_companies.hasOwnProperty('watchlist')){
          watchlistCompanies = res.data.risk_flags_companies.watchlist;
          $('#companyBreakdownFlag').show();                              
        }
        if(res.data.risk_flags_companies.hasOwnProperty('am')){
          adverseMediaCompanies = res.data.risk_flags_individuals.am;
          $('#individualBreakdownFlag').show();                            
        }
        if(res.data.risk_flags_companies.hasOwnProperty('de')){
          disqualifiedEntityCompanies = res.data.risk_flags_individuals.de;
          $('#individualBreakdownFlag').show();                            
        }
        if((pepCompanies + watchlistCompanies + adverseMediaCompanies + disqualifiedEntityCompanies) > 0){
          // standardCompanies = res.data.companies - (pepCompanies + watchlistCompanies);         
          doughnutData = {
            labels: ["PEP","Adverse Media","Disqualified Entity", "Watchlist"],
            datasets: [{
                data: [pepCompanies,adverseMediaCompanies,disqualifiedEntityCompanies, watchlistCompanies],
                backgroundColor: ["#428bca", "#D9B74F", "#D9824F","#d9534f"]                
           }]
          };
          var ctx4 = document.getElementById("companyBreakdownDoughnut").getContext("2d");
          new Chart(ctx4, {type: 'doughnut', data: doughnutData, options:doughnutOptions});
          $('#companyBreakdownFlag').show();                                                       
        }
        else{
          doughnutData = {
            labels: ["No companies registered"],
            datasets: [{
                data: [1],
                backgroundColor: ["#E6E6E6"]
           }]
          };
          var ctx4 = document.getElementById("companyBreakdownDoughnut").getContext("2d");
          new Chart(ctx4, {type: 'doughnut', data: doughnutData, options:doughnutEmptyOptions});
          $('#companyBreakdownFlag').show();    
        }
      }

      let mapDataString = "";
      let mapDataJSON; 
      let countryName;      
      let countryList = [];
      if(res.data.hasOwnProperty('countries_breakdown')){
        for (let country in res.data.countries_breakdown) {
          countryName = convertCountryIso3ToIso2(country)
            if(countryName){
            mapDataString += "\"" + convertCountryIso3ToIso2(country) + "\"" + ":" + res.data.countries_breakdown[country] + ",";
            countryList.push({
              country : convertCountryCode(country),
              population : res.data.countries_breakdown[country],
            });
          }
        }
        Session.set('countryList', countryList);             
      }  
      if(mapDataString){
        mapDataString = "{" + mapDataString.replace(/.$/,"}");    
        mapDataJSON = JSON.parse(mapDataString);
        $('#worldMap').show();
        $('#world-map').vectorMap({
          map: 'world_mill_en',
          zoomOnScroll : false,
          zoomButtons : false,
          backgroundColor: "transparent",
          showTooltip: true,
          showLabels: true,
          regionStyle: {
            initial: {
              fill: '#e4e4e4',
              "fill-opacity": 0.9,
              stroke: 'none',
              "stroke-width": 0,
              "stroke-opacity": 0
            }
          },
          series: {
            regions: [{
              values: mapDataJSON,
              scale: ["#37aa73", "#22d6b1"],
              normalizeFunction: 'polynomial'
            }]
          }
        });
      }
      deactivateSpinner();
    }          
  });

  Meteor.call('getResource', Session.get('isLive'), URI_SCREENING_STATS, function(err,res){
    if(err) {
      if(err.error === 401){Meteor.logout(function() {FlowRouter.go('/login');});}
      toastr.error(err.details, err.reason); 
    } 
    else {
      Session.set('screeningStats',res.data);
    }          
  });
};

Template.dashboard.helpers({
  isLive : function(){if(Session.get('isLive')){return 'active'};},  
  customerStats: function() {return Session.get('customerStats');},
  screeningStats: function() {return Session.get('screeningStats');},
  openScreening: function() {return Session.get('openScreening');},
  countryList: function() {return Session.get('countryList');},  
  customerTotalSinceLastWeek : function() {
    let customerStats = Session.get('customerStats');
    if(customerStats){
      if((customerStats.individuals_week_ago === 0) && (customerStats.companies_week_ago === 0)){return 0;}
      else{
        return (((customerStats.individuals_week_ago + customerStats.companies_week_ago) / (customerStats.total_customers - (customerStats.individuals_week_ago + customerStats.companies_week_ago)))*100);
      }
    }
    else{return 0;}
  },
  individualTotalSinceLastWeek : function() {
    let customerStats = Session.get('customerStats');
    if(customerStats){
      if((customerStats.individuals === 0)){return 0;}
      else{
        return (((customerStats.individuals_week_ago) / (customerStats.individuals - (customerStats.individuals_week_ago)))*100);
      }
    }
    else{return 0;}
  },
  companyTotalSinceLastWeek : function() {
    let customerStats = Session.get('customerStats');
    if(customerStats){
      if((customerStats.companies === 0)){return 0;}
      else{
        return (((customerStats.companies_week_ago) / (customerStats.companies - (customerStats.companies_week_ago)))*100);
      }
    }
    else{return 0;}
  },
  
  companyName: function(){
    let profile = UserProfile.findOne({userId: Meteor.userId()});
    return profile && profile.companyName;
  },
  lastLoggedIn: function(){
    let loginTime = Meteor.user();
    return loginTime && loginTime.profile.lastLoggedIn ;
  }
});