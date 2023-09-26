Template.scorecardBreakdown.rendered = function(){
  $("*#nestableScorecard").nestable({
    maxDepth: 0,
    dragClass:'dd-nodrag',
    handleClass:'dd-nodrag',
    collapsedClass:'dd-collapsed',
  }).nestable('collapseAll');
};