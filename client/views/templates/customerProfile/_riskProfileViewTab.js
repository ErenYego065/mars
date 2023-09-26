Template.riskProfileViewTab.helpers({
  riskProfile : function(){return Session.get('riskProfileDetails');}
});

// Template.riskProfileViewTab.rendered = function(){
//   let radarData = {
//     labels: ["Country", "Occupation", "Political Exposure", "Watchlist", "Relationship"],
//     datasets: [
//         {
//             label: "My First dataset",
//             backgroundColor: "rgba(220,220,220,0.2)",
//             borderColor: "rgba(220,220,220,1)",
//             data: [0, 33, 66, 100, 33]
//         }
//         // ,
//         // {
//         //     label: "My Second dataset",
//         //     backgroundColor: "rgba(26,179,148,0.2)",
//         //     borderColor: "rgba(26,179,148,1)",
//         //     data: [28, 48, 40, 19, 96, 27, 100]
//         // }
//     ]
//   };
  
//   let radarOptions = {responsive: true};
  
//   let ctx5 = document.getElementById("radarChart").getContext("2d");
//   new Chart(ctx5, {type: 'radar', data: radarData, options:radarOptions});
// };