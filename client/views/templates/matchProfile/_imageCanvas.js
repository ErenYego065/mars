Template.imageCanvas.rendered = function(){
  // let images =Template.instance().data.image_uri;

  $('.carouselImages').slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    centerMode: true,
    cssEase: 'linear'
  });

  // for(index=0;index<images.length;index++){
  //   $('.carouselImages').slickAdd('<div class="item"><img data-type="imageCanvas" src="' + 
  //     images[index] +'" class="img-responsive img-rounded"></div>');
  // }

  // $("[data-type='imageCanvas']").each(function() {
  //   if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
  //     this.src = '/images/brokenImage.png';
  //   }
  // });
};