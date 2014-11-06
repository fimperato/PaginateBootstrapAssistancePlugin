/* 
 * paginateBootstrapAssistance | a jQuery plugin for a basic assistance pagination with Bootstrap Framework
 * @author Francesco Imperato
 * @Link http://www.francescoimperato.it
 */
 (function($) {

  $.fn.paginateBootstrapAssistance = function(options, callback) {
  
		var defaults = {
			idToReload: "pageContentsToReload",
			contentsFolderName: "contentsFolder",
			numberOfPage: 1,
			numberOfVisiblePage: 1,
			selectedColor: "#C0C0C0",
			fadeOutDuration: 'fast',
			fadeOutEasing: 'swing',
			fadeInDuration: 'slow',
			renderAllComponent: false //Sincronizzazione delle pagination in pagina
		};
		options = $.extend(defaults, options);
		
		// Codice del plugin:
		var that = this;
		return that.each(function(index, element) {
		
			//Creazione della porzione DOM della paginazione (a partire da quella Bootstrap):
			$(element).empty();
			$(element).append('<li><a id="pagination-prev" href="#">&laquo;</a></li>');
			for (var p = 1; p <= options.numberOfVisiblePage; p++) {
				var aStyle='';
				if(p==1)
					aStyle = 'style=background-color:'+options.selectedColor+';' ;
				$(element).append('<li><a '+aStyle+' id="pagination_'+$.strPad(p,3)+'" href="#">'+p+'</a></li>');
			}
			$(element).append('<li><a id="pagination-next" href="#">&raquo;</a></li>');
					
			//Inizializzazione della porzione DOM della paginazione (a partire da quella Bootstrap):
			var sizeLiList = $(element).children().length;
			$(element).children().each(function(i, liChild) {
				if(i==0) { 
					liChild.firstChild.id = "pageContents_prev";
				}
				else if(i==(options.numberOfVisiblePage + 1)) { 
					liChild.firstChild.id = "pageContents_next";
				} 
				else { 
					liChild.firstChild.id = "pageContents_"+$.strPad(i,3);
				} 
			});
			
			//Eventi di reload pagina e componente
			$(element).click(function(event){
				event.preventDefault();
				var paginationElement = options.renderAllComponent ? '.pagination' : element;
				
				var aLiItem = event.target;
				var eventId=aLiItem.id;
				var pageSuffix="";
				if(eventId!=null) {
					pageSuffix=eventId.split("_")[1];  
					if(pageSuffix=="next")
						pageSuffix=$.strPad(options.numberOfPage,3);
					else if(pageSuffix=="prev")
						pageSuffix=$.strPad(1,3);
				}
				
				//Reload di paginazione:
				$('#'+options.idToReload).fadeOut(options.fadeOutDuration, options.fadeOutEasing, function(){ 
					$('#'+options.idToReload).load(options.contentsFolderName+"/pageContents_"+pageSuffix+".html", function(){
						$('#'+options.idToReload).fadeIn(options.fadeInDuration);
						
						//End of reloading page: callback function
						if(callback) 
							callback();
						
					});
				});
				
				/* Reload componente paginazione */
				//Shift per ultimo elemento in lista:
				var liItem=aLiItem.parentNode
				//paginationElement: var ulElement=event.target.parentElement.parentElement;
				var positionInPaginationComponent=$(paginationElement).find("li").index(liItem);
				var nPage = parseInt(pageSuffix);
				if((positionInPaginationComponent % (options.numberOfVisiblePage + 2))==options.numberOfVisiblePage && nPage < options.numberOfPage) 
				{
					var sizeLiList = $(paginationElement).children().length;
					$(paginationElement).children().each(function(i, liChild) {
						if(i!=0 && (i % (options.numberOfVisiblePage + 2))!=0 && i!=(options.numberOfVisiblePage + 1) && (i % (options.numberOfVisiblePage + 2))!=(options.numberOfVisiblePage + 1) ) { 
							var pageNowId=liChild.firstChild.id;
							if(pageNowId!=null) {
								var pageNow=pageNowId.split("_")[1]; 
								var nPageNext=parseInt(pageNow) + 1;
								liChild.firstChild.id = "pageContents_"+$.strPad(nPageNext,3);
								liChild.firstChild.innerHTML=nPageNext;
							}
						} 
					});
				}
				//Shift per primo elemento in lista:
				if((positionInPaginationComponent % (options.numberOfVisiblePage + 2))==1 && nPage > 1) 
				{
					var sizeLiList = $(paginationElement).children().length;
					$(paginationElement).children().each(function(i, liChild) {
						if(i!=0 && (i % (options.numberOfVisiblePage + 2))!=0 && i!=(options.numberOfVisiblePage + 1) && (i % (options.numberOfVisiblePage + 2))!=(options.numberOfVisiblePage + 1) ) { 
							var pageNowId=liChild.firstChild.id;
							if(pageNowId!=null) {
								var pageNow=pageNowId.split("_")[1]; 
								var nPagePrev=parseInt(pageNow) - 1;
								liChild.firstChild.id = "pageContents_"+$.strPad(nPagePrev,3);
								liChild.firstChild.innerHTML=nPagePrev;
							}
						} 
					});
				}
				
				//Elemento prev: prima pagina -> shift a primo elemento in lista:
				if((positionInPaginationComponent % (options.numberOfVisiblePage + 2))==0) {
					var sizeLiList = $(paginationElement).children().length;
					var iCountPrev=0;
					$(paginationElement).children().each(function(i, liChild) {
						if(i==0 || (i % (options.numberOfVisiblePage + 2))==0)
							iCountPrev=0;
						if(i!=0 && (i % (options.numberOfVisiblePage + 2))!=0 && i!=(options.numberOfVisiblePage + 1) && (i % (options.numberOfVisiblePage + 2))!=(options.numberOfVisiblePage + 1) ) { 
							var pageNowId=liChild.firstChild.id;
							if(pageNowId!=null) {
								var nPageAssign=iCountPrev;
								liChild.firstChild.id = "pageContents_"+$.strPad(nPageAssign,3);
								liChild.firstChild.innerHTML=nPageAssign;
							}
						}
						iCountPrev++;
					});
				}
				//Elemento next: ultima pagina -> Shift all'ultimo elemento in lista: 
				if((positionInPaginationComponent % (options.numberOfVisiblePage + 2))== (options.numberOfVisiblePage + 1)) {
					var sizeLiList = $(paginationElement).children().length;
					var arrNPage = [];
					options.numberOfVisiblePage
					var iterations= sizeLiList / (options.numberOfVisiblePage + 2)
					for(var itr=0; itr<iterations; itr++)
					{
						var x=1;
						for (var j = options.numberOfVisiblePage; j >= 1 ; j--) {
							arrNPage[x + ((options.numberOfVisiblePage + 2) * itr)]=options.numberOfPage - j + 1;
							x++;
						}
					}
					$(paginationElement).children().each(function(i, liChild) {
						if(i!=0 && (i % (options.numberOfVisiblePage + 2))!=0 && i!=(options.numberOfVisiblePage + 1) && (i % (options.numberOfVisiblePage + 2))!=(options.numberOfVisiblePage + 1) ) { 
							var pageNowId=liChild.firstChild.id;
							if(pageNowId!=null) {
								var nPageAssign=arrNPage[i];
								liChild.firstChild.id = "pageContents_"+$.strPad(nPageAssign,3);
								liChild.firstChild.innerHTML=nPageAssign;
							}
						} 
					});
				}
				
				paintSelectionClass(paginationElement,nPage,options.numberOfVisiblePage,options.selectedColor);
				
			});
			
			
		});
      
  
  };


})(jQuery);

function paintSelectionClass(paginationElement, indexSelected,numberOfVisiblePage,selectedColor) {
	$(paginationElement).children().each(function(i, liChild) {
		if(i!=0 && i!=(numberOfVisiblePage + 1)) { 
			var pageNowId=liChild.firstChild.id;
			if(pageNowId!=null && parseInt(liChild.firstChild.innerHTML)==indexSelected) {
				liChild.firstChild.style.backgroundColor=selectedColor;
			} 
			else 
				liChild.firstChild.style.backgroundColor='';
		} 
	});
};