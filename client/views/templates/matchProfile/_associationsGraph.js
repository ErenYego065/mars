Template.associationsGraph.rendered = function () {
  getAllAssociations();
  // Tracker.autorun(function () {getAllAssociations();});
};

Template.associationsGraph.helpers({
  associations: function () {
    return Session.get('allAssociations');
  }
});

getAllAssociations = function () {
  activateSpinner3();
  let customerId = FlowRouter.getParam("_CustId");
  let screeningId = FlowRouter.getParam("_ScreeningId");
  let matchId = FlowRouter.getParam("_MatchId");

  Meteor.call('getResource', Session.get('isLive'), URI_ALL_ASSOCIATIONS, customerId, null, screeningId, matchId, function (err, res) {
    if (err) {
      deactivateSpinner3();
      toastr.error(err.details, err.reason);
    } else {
      let allAssociations = JSON.parse(res.content);
      Session.set('allAssociations', allAssociations);
      drawAssociationsGraph();
      deactivateSpinner3();
    }
  });
};

getAssociation = function (associationId) {
  for (let i = 0; i < Session.get('allAssociations').content.length; i++) {
    if (associationId === Session.get('allAssociations').content[i].id) {
      Session.set('association', Session.get('allAssociations').content[i]);
      break;
    }
  }
  // activateSpinner3();  
  // let customerId = FlowRouter.getParam("_CustId");
  // let screeningId = FlowRouter.getParam("_ScreeningId");
  // let matchId = FlowRouter.getParam("_MatchId");
  // let associationId = Session.get("associationId");

  // Meteor.call('getResource', Session.get('isLive'), URI_ASSOCIATION, customerId, null, screeningId, matchId, associationId, function(err,res){
  //   if(err) {
  //     deactivateSpinner3();  
  //     toastr.error(err.details, err.reason); 
  //   } 
  //   else {
  //     let association = JSON.parse(res.content);
  //     Session.set('association', association);
  //     deactivateSpinner3();  
  //   }          
  // });
};

drawAssociationsGraph = function () {
  let container = document.getElementById('mynetwork');
  let matchType = Session.get('matchProfile');
  let allAssociations = Session.get('allAssociations');
  let nodesConfig = [];
  let edgesConfig = [];
  let matchImage = Session.get("matchImage");
  let matchFullName = Session.get("matchFullName");
  let associationFullName;

  nodesConfig.push({
    id: 0,
    level: 1,
    shape: (matchType.entity_type === 'INDIVIDUAL') ?
      'circularImage' : 'icon',
    group: 'icons',
    // label: matchFullName,
    image: matchImage || '/images/brokenImage.png',
    brokenImage: '/images/brokenImage.png',
    size: 55
  });

  let level = 2;

  for (ccCount = 0; ccCount < allAssociations.content.length; ccCount++) {
    if (allAssociations.content[ccCount].entity_type === 'INDIVIDUAL') {
      // if (allAssociations.content[ccCount].direction === "OUTBOUND") {
        for (index = 0; index < allAssociations.content[ccCount].names.length; index++) {
          if (allAssociations.content[ccCount].names[index].name_type === "PRIMARY_NAME") {
            associationFullName =
              allAssociations.content[ccCount].names[index].first_name + ' ' +
              allAssociations.content[ccCount].names[index].last_name + ' ' +
              allAssociations.content[ccCount].names[index].maiden_name;
          }
        }

        nodesConfig.push({
          id: allAssociations.content[ccCount].id,
          level: level,
          shape: 'circularImage',
          borderWidthSelected: 1,
          label: associationFullName,
          image: allAssociations.content[ccCount].image_uri[0] || '/images/brokenImage.png',
          brokenImage: '/images/brokenImage.png',
          size: 55
        });

        edgesConfig.push({
          from: 0,
          to: allAssociations.content[ccCount].id,
          dashes: (allAssociations.content[ccCount].status === 'CURRENT') ? false : true,
          arrows: 'to',
          length: 100
        });
      // }
    } else {
      // if (allAssociations.content[ccCount].direction === "OUTBOUND") {
        for (index = 0; index < allAssociations.content[ccCount].names.length; index++) {
          if (allAssociations.content[ccCount].names[index].name_type === "PRIMARY_NAME") {
            associationFullName = allAssociations.content[ccCount].names[index].company_name;
          }
        }

        nodesConfig.push({
          id: allAssociations.content[ccCount].id,
          level: level,
          shape: 'icon',
          group: 'icons',
          borderWidthSelected: 1,
          label: associationFullName,
          // font: {align: 'horizontal'},            
          size: 55
        });

        edgesConfig.push({
          from: 0,
          to: allAssociations.content[ccCount].id,
          dashes: (allAssociations.content[ccCount].status === 'CURRENT') ? false : true,
          label: getTextFromValue(DISPLAY_TEXT, allAssociations.content[ccCount].association_type),
          // font: {align: 'middle'},      
          arrows: 'to',
          length: 100
        });
      // }
    }
    if (allAssociations.content.length > 8){level = (level === 2) ? 5 : 2;}
  }
  nodesConfig = removeDuplicates(nodesConfig,'label');

  let nodes = new vis.DataSet(nodesConfig);
  let edges = new vis.DataSet(edgesConfig);
  let data = {
    nodes: nodes,
    edges: edges
  };

  var options = {
    height: '550px',
    width: '100%',
    // shape: "box",
    // interaction: {dragNodes:false},
    nodes: {
      borderWidth: 0,
      font: {
        color: 'black'
        // size: 25
      },
      color: {
        border: '#406897',
        background: '#6AAFFF'
      },
    },
    edges: {
      color: {
        color: 'lightgray',
        highlight: '#324157'
      },
      // style: 'arrow',
      smooth: {
        type: "cubicBezier",
        forceDirection: "vertical",
        // forceDirection: "none",
        roundness: 1
      }
    },
    groups: {
      icons: {
        shape: 'icon',
        icon: {
          face: 'FontAwesome',
          code: '\uf0c0',
          size: 55,
          color: '#324157'
        }
      }
    },
    layout: {
      hierarchical: {
        enabled: true,
        sortMethod: 'directed',
        direction: 'UD',
        levelSeparation: 150,
        nodeSpacing: 175,
        treeSpacing: 200,
        blockShifting: true,
        edgeMinimization: false,
      }
    }
  };

  network = new vis.Network(container, data, options);
  network.setOptions({
    physics: false
  });

  network.on("beforeDrawing", function (ctx) {
    //ref: http://jsbin.com/juperowedo/1/edit?html,output
    let nodeId = 0;
    let nodePosition = network.getPositions([nodeId]);
    let scale = network.getScale();
    let fontsize = 20;
    let xAxisDistance = (matchFullName.length * 5.5) / 2;
    let visibleFontSize = 20 * scale;
    ctx.font = 12 + "px Arial";
    ctx.fillText(matchFullName, nodePosition[nodeId].x - xAxisDistance, nodePosition[nodeId].y - 65);
  });


  network.on("selectNode", function (params) {
    if (params.nodes[0] != 0) {
      Session.set('associationId', params.nodes[0]);
      getAssociation(params.nodes[0]);
      Session.set('isAssociateSelected', true);
    }
  })
}