	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
	//::::::::::::::::::::: PLUGIN OPTIONS :::::::::::::::::::::::://
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://


	// default options
	var settings = {
		
		// default option values										
		owners: true,
		appreciations: true,
		views: true,
		publishedDate: true,
		projectUrl: true,
		fields: true,
		apiKey: 'v8SNqxsyD70hgx1EXIQPjmjiQVe9K7HQ', // token api -----------------//
		itemsPerPage: '6',
		userName: 'larguar', //---------username-----------//
		infiniteScrolling: true,
		imageCaption: false,
		ownerLink: true,
		description: true,
		tags: true,
		themeColor: '#222222',
		animationDuration: 1000,
		animationEasing: 'easeInOutExpo'

	};




	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
	//:::::::::::::::::::::::: VARIABLES :::::::::::::::::::::::::://
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://


	
	// ::::::::::: PAGINATION ::::::::::::::://

	var urlListNext = []; // it makes an ajax call for checking if another pagination is available
	var page = 1; // it stores how many elements have to be shown for any pagination


	// ::::::::::: DATA-STORAGE ::::::::::::::://

	var dataExtracted = []; // the data extracted from the json call, already wrapped into divs
	var html = ''; // it wraps all the data with outer containers and make the actual layout structure
	var scrollBarPosition; // it stores the scrollbar position
	var style = [];

	// ::::::::::: FLAGS ::::::::::::::://

	var hasAnotherPage = 1; // if true, there is another page to paginate
	var isDetail = 0; // it checks if the detail has been opened
	var sidebarData = 0; // it checks whether the sidebar is printed or not
	var infinitePaginationOnGoing = 0; // it checks if an infinitePagination request has been already made


	//:::::::::::::::::::::::::::::: Behance API call ::::::::::::::::::::::::::::::: //
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://

	var urlList = ['https://api.behance.net/v2/users/', settings.userName, '/projects?client_id=', settings.apiKey, '&per_page=', settings.itemsPerPage, '&page=', page];





	var callBehanceProjectDetail = function(urlDetail) {

		
		// reset dataextracted
		dataExtracted = [];

		$.ajax({
		
			url: urlDetail,
			dataType: 'jsonp',
			success: function(data) {
				dataExtractedParams(0, data.project, 'template');			

				/* template function for printing data extracted */
				printContentForDetail();

			},
			error: function(error) {
				console.log('ERROR: ', error);

			}

		});

	};


    function dataExtractedParams(token = false, value = false) {

		//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
		//:::::::::::: CONTENT DATA EXTRACTOR for PROJECT DETAIL and LIST ::::::::::://
		//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
		
		dataExtracted[token] = {

			// fetch data from json
			rawId: 			designTemplate('rawId', value),
			rawProjectUrl:	designTemplate('rawProjectUrl', value),
			owners: 		designTemplate('owners', value),
			works: 			designTemplate('works', value),
			appreciations: 	designTemplate('appreciations', value),
			views: 			designTemplate('views', value),
			cover: 			designTemplate('cover', value),
			title: 			designTemplate('title', value),
			publishedDate: 	designTemplate('publishedDate', value),
			projectUrl: 	designTemplate('projectUrl', value),
			fields: 		designTemplate('fields', value),
			description: 	designTemplate('description', value),
			tags: 			designTemplate('tags', value)
			
		};

		//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
		//:::::::::::::::::: STYLE DATA EXTRACTOR for PROJECT DETAIL :::::::::::::::://
		//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://

		// if(isDetail == true) {

		// 	function applyCSS(){	

		// 		style['title'] = 	'.eb-container .box-inner-main .title {\n\t' +
											
		// 									'font-family: ' 	+ 	value.styles.text.title.font_family 		+ ';\n\t' +
		// 									'font-weight: ' 	+ 	value.styles.text.title.font_weight 		+ ';\n\t' +
		// 									'color: '			+	value.styles.text.title.color 				+ ';\n\t' +
		// 									'text-align: ' 		+	value.styles.text.title.text_align 			+ ';\n\t' +
		// 									'line-height:  '	+	value.styles.text.title.line_height 		+ ';\n\t' +
		// 									'font-size: '		+	value.styles.text.title.font_size 			+ ';\n\t' +
		// 									'text-decoration: ' +	value.styles.text.title.text_decoration 	+ ';\n\t' +
		// 									'font-style: ' 		+	value.styles.text.title.font_style 			+ ';\n\t' +
		// 									'text-transform: ' 	+	value.styles.text.title.text_transform 		+ ';\n'   +
		// 							'}',		

				
		// 		style['subtitle'] = '.eb-container .box-inner-main .sub-title {\n\t' +

		// 									'font-family: ' 	+ 	value.styles.text.subtitle.font_family 		+ ';\n\t' +
		// 									'font-weight: ' 	+ 	value.styles.text.subtitle.font_weight 		+ ';\n\t' +
		// 									'color: '			+	value.styles.text.subtitle.color 			+ ';\n\t' +
		// 									'text-align: ' 		+	value.styles.text.subtitle.text_align 		+ ';\n\t' +
		// 									'line-height:  '	+	value.styles.text.subtitle.line_height 		+ ';\n\t' +
		// 									'font-size: '		+	value.styles.text.subtitle.font_size 		+ ';\n\t' +
		// 									'text-decoration: ' +	value.styles.text.subtitle.text_decoration 	+ ';\n\t' +
		// 									'font-style: ' 		+	value.styles.text.subtitle.font_style 		+ ';\n\t' +
		// 									'text-transform: ' 	+	value.styles.text.subtitle.text_transform 	+ ';\n'   +
		// 							'}',


		// 		style['paragraph'] = '.eb-container .box-inner-main .main-text {\n\t' +

		// 									'font-family: ' 	+ 	value.styles.text.paragraph.font_family 	+ ';\n\t' +
		// 									'font-weight: ' 	+ 	value.styles.text.paragraph.font_weight 	+ ';\n\t' +
		// 									'color: '			+	value.styles.text.paragraph.color 			+ ';\n\t' +
		// 									'text-align: ' 		+	value.styles.text.paragraph.text_align 		+ ';\n\t' +
		// 									'line-height:  '	+	value.styles.text.paragraph.line_height 	+ ';\n\t' +
		// 									'font-size: '		+	value.styles.text.paragraph.font_size 		+ ';\n\t' +
		// 									'text-decoration: ' +	value.styles.text.paragraph.text_decoration + ';\n\t' +
		// 									'font-style: ' 		+	value.styles.text.paragraph.font_style 		+ ';\n\t' +
		// 									'text-transform: ' 	+	value.styles.text.paragraph.text_transform 	+ ';\n'   +
		// 							'}',


		// 		style['caption'] = '.eb-container .box-inner-main .caption {\n\t' +

		// 									'font-family: ' 	+ 	value.styles.text.caption.font_family 		+ ';\n\t' +
		// 									'font-weight: ' 	+ 	value.styles.text.caption.font_weight 		+ ';\n\t' +
		// 									'color: '			+	value.styles.text.caption.color 			+ ';\n\t' +
		// 									'text-align: ' 		+	value.styles.text.caption.text_align 		+ ';\n\t' +
		// 									'line-height:  '	+	value.styles.text.caption.line_height 		+ ';\n\t' +
		// 									'font-size: '		+	value.styles.text.caption.font_size 		+ ';\n\t' +
		// 									'text-decoration: ' +	value.styles.text.caption.text_decoration 	+ ';\n\t' +
		// 									'font-style: ' 		+	value.styles.text.caption.font_style 		+ ';\n\t' +
		// 									'text-transform: ' 	+	value.styles.text.caption.text_transform 	+ ';\n'   +
		// 							'}',


		// 		style['link'] = '.eb-container .box-inner-main a {\n\t' +

		// 									'font-family: ' 	+ 	value.styles.text.link.font_family 			+ ';\n\t' +
		// 									'font-weight: ' 	+ 	value.styles.text.link.font_weight 			+ ';\n\t' +
		// 									'color: '			+	value.styles.text.link.color 				+ ';\n\t' +
		// 									'text-align: ' 		+	value.styles.text.link.text_align 			+ ';\n\t' +
		// 									'line-height:  '	+	value.styles.text.link.line_height 			+ ';\n\t' +
		// 									'font-size: '		+	value.styles.text.link.font_size 			+ ';\n\t' +
		// 									'text-decoration: ' +	value.styles.text.link.text_decoration 		+ ';\n\t' +
		// 									'font-style: ' 		+	value.styles.text.link.font_style 			+ ';\n\t' +
		// 									'text-transform: ' 	+	value.styles.text.link.text_transform 		+ ';\n'   +
		// 							'}',	

			
		// 		style['background'] =	'.eb-container .box-inner-main {\n\t' +
									
		// 									'background-color: #' + value.styles.background.color 				+ ';\n\t' +
		// 								'}',


		// 		style['bottom_margin'] ='.eb-container .box-inner-main .spacer {\n\t' +
									
		// 									'height: ' + value.styles.spacing.modules.bottom_margin				+ 'px;\n\t' +
		// 								'}',

		// 		style['top_margin']	  ='.eb-container .box-inner-main .wrap-works-outer {\n\t' +
									
		// 									'padding-top: ' + value.styles.spacing.project.top_margin			+ 'px;\n\t' +
		// 								'}',

		// 		style['dividers'] = '.eb-container .box-inner-main .spacer .divider {\n\t' +

		// 									'font-size: '   	+ 	value.styles.dividers.font_size				+ ';\n\t' +
		// 									'line-height: '   	+ 	value.styles.dividers.line_height			+ ';\n\t' +
		// 									'height: '   		+ 	value.styles.dividers.height				+ ';\n\t' +
		// 									'border-color: '   	+ 	value.styles.dividers.border_color			+ ';\n\t' +
		// 									'margin: '   		+ 	value.styles.dividers.margin				+ ';\n\t' +
		// 									'position: '   		+ 	value.styles.dividers.position				+ ';\n\t' +
		// 									'top: '   			+ 	value.styles.dividers.top					+ ';\n\t' +
		// 									'border-width: '   	+ 	value.styles.dividers.border_width			+ ';\n\t' +
		// 									'border-style: '   	+ 	value.styles.dividers.border_style			+ ';\n\t' +
		// 							'}',

				
				//:::::::::::::::::: PRINT THE STYLES :::::::::::::::://

	// 			$('head').append(	'<style type="text/css" data-css="embed-behance">' 	+ '\n\t' + 

	// 									style['title'] 			+ '\n' +
	// 									style['subtitle'] 		+ '\n' +
	// 									style['paragraph']		+ '\n' +
	// 									style['link']			+ '\n' +
	// 									style['caption']		+ '\n' +
	// 									style['background']		+ '\n' +
	// 									style['bottom_margin']	+ '\n' +
	// 									style['top_margin']		+ '\n' +
	// 									style['dividers']		+ '\n\t' +
									
	// 								'</style>');

	// 		}

	// 		applyCSS(); // fire the function that applys the dynamic CSS styles to projects

	// 	}

	}

//////////////////////////////////// TEMPLATE FUNCTION ///////////////////////////////////////
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
	//::::::::::::::: MAIN FUNCTION THAT EXTRACTS THE RAW DATA AND WRAP THEM ::::::::::::::::::://
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://


	// core function to design the fields wrapper around the data across list and detail
	function designTemplate(token, value) {

		var dataWrapper = '';

		switch(token) {

			//id
			case 'rawId':

			dataWrapper = '<div class="raw-project-id" style="display: none;">' + value.id + '</div>';

			break;

			//id
			case 'rawProjectUrl':

			dataWrapper += '<div class="raw-project-url" style="display: none;">' + value.url + '</div>';

			break;

			// owners
			case 'owners':

			if(settings.owners == true) {


				dataWrapper += '<div class="card">';

					$.each(value.owners, function(key, value) {

						dataWrapper += '<div class="card-body d-flex">';
							
							// check if it's detail to show the profile picture
							if(isDetail == true) {
								
								dataWrapper += '<div class="profile-pic">';
								
								// check if URL on the owner name is enabled (only in the detail)
								if(settings.ownerLink == true) {
									dataWrapper += '<a style="color: ' + settings.themeColor + '" href="' + value['url'] + '" target="_blank"><img class="img-responsive img-rounded" style="max-height: 50px; max-width: 50px;" src="' + value['images']['100'] +  '" alt="' + value['display_name'] + ' profile picture" /></a>';	
								} else {
									dataWrapper += '<img class="img-responsive img-rounded" style="max-height: 50px; max-width: 50px;" src="' + value['images']['100'] +  '" alt="' + value['display_name'] + ' profile picture" />';
								}
								
								dataWrapper += '</div>';
							}

							// print the full name

								if(settings.ownerLink == true) {
									dataWrapper += '<a class="card-link stretched-link ml-1" style="color: ' + settings.themeColor + '" href="' + value['url'] + '" target="_blank">' + value['display_name'] + '</a>';
								} else {
									dataWrapper += '<div class="ml-1"' + value['display_name'] + '"</div>"';
								}
							
							dataWrapper += '</div>';

						dataWrapper += '</div>';
					});

				dataWrapper += '</div>' ;

				// dataWrapper =  '<div class="wrap-owners-outer">' + dataWrapper + '</div>';

				sidebarData = 1;

			}
			
			break;

			// works
			case 'works':

			dataWrapper += '<ul class="list-group">';

			// save the title for the image alt
			var imgAlt = value.name;

				// loop through all the projects type (image, text, embed)
				$.each(value.modules, function(key, value) {

					function caption() {
						if ('caption' in value && settings.imageCaption == true) {
							return '<li class="list-group-item caption">' + value['caption'] + '</li>';
						} else {
							return '';
						}
					}

					function fullBleed(){

						if( value.full_bleed == 1 ){
							return ' img-fluid w-100';
						} else {
							return 'img-fluid w-100';
						}
					}

					switch(value['type']) {

						case 'image':

						dataWrapper += '<li class="list-group-item">';
							dataWrapper += '<img class="' + fullBleed() + '" src="' + value['sizes']['disp'] + '" alt="' + imgAlt + '"style="width:100%">';
					
							// dataWrapper += '<picture>';
							// 	dataWrapper += '<source media="(min-width: 30em)" srcset="' + value['sizes']['original'] + '">';
							// 	dataWrapper += '<img src="' + value['sizes']['disp'] + '" alt="' + imgAlt + '" />';
							// dataWrapper += '</picture>'; 

						dataWrapper += '</li>';

						// behance spacer (mandatory on after any project module)
						dataWrapper += caption();

						// // behance spacer (mandatory on after any project module)
						// dataWrapper += '<li class="list-group-item spacer"><div class="divider"></div></li>';

						break;

						case 'text':
						dataWrapper += '<li class="list-group-item hightlight">' + value['text'] + '</li>';

						// behance spacer (mandatory on after any project module)
						dataWrapper += caption();

						// behance spacer (mandatory on after any project module)
						// dataWrapper += '<li class="list-group-item spacer"><div class="divider"></div></li>';

						break;

						case 'embed':
						dataWrapper += '<li class="list-group-item single-embed' + fullBleed() + '"><div class="inner">' + value['embed'] + '</div></li>';

						// behance spacer (mandatory on after any project module)
						dataWrapper += caption();

						// behance spacer (mandatory on after any project module)
						// dataWrapper += '<li class="list-group-item spacer"><div class="divider"></div></li>';
					}

				});

			dataWrapper += '</ul>';

			
			
			break;


			// appreciations
			case 'appreciations':
			
			if(settings.appreciations == true) {

				dataWrapper = '<h5><span class="badge bg-dark"><i class="icon ion-thumbsup"></i></span>' + value.stats.appreciations + '</h5>'

				sidebarData = 1;

			}

			break;


			// views
			case 'views':

			if(settings.views == true) {

			
				dataWrapper = '<h5><span class="badge bg-dark"><i class="icon ion-eye"></i></span>' + value.stats['views'] + '</h5>'

				sidebarData = 1;

			}

			break;


			// cover
			case 'cover':

			dataWrapper += '<div class="wrap-cover">';
				dataWrapper += '<img src="' + value.covers['404'] + '" alt="' + value.name + '" />';

				if(settings.fields == true) {

					dataWrapper += '<ul class="fields-in-cover">' + '<i class="bi bi-stack"></i>';

					$.each(value.fields, function(key, value) {
						dataWrapper += '<li class="single">' + value + '</li>';
					});

					dataWrapper += '</ul>';

				}

			dataWrapper += '</div>';
			
			break;


			// title
			case 'title':

			dataWrapper += value.name ;
			
			break;


			// publishedDate
			case 'publishedDate':

			function dateConversion(token) {

		    	var fancyDate = new Date(token*1000);
		    	fancyDate = fancyDate.toDateString();
		    	return fancyDate;

			}

			if(settings.publishedDate == true) {

				dataWrapper += '<div class="wrap-label">Published:</div>';
				dataWrapper += '<div class="wrap-value">' + dateConversion(value.published_on) + '</div>';
				dataWrapper =  '<div class="wrap-published-date-outer">' + dataWrapper + '</div>';

				sidebarData = 1;

			}
			
			break;


			// project url
			case 'projectUrl':

			if(settings.projectUrl == true) {

				dataWrapper += '<a style="background-color: ' + settings.themeColor + '" href="' + value.url + '" title="' + value.name + '" target="_blank"> Appreciate it in Behance </a>';
				dataWrapper =  '<div class="wrap-project-url">' + dataWrapper + '</div>';

				sidebarData = 1;

			}
			
			break;



			// fields
			case 'fields':

			if(settings.fields == true) {

				dataWrapper += '<div class="wrap-label">' + '<i class="bi bi-stack"></i>' + 'Fields:</div>';
				dataWrapper += '<ul class="wrap-values">';

					$.each(value.fields, function(key, value) {
						dataWrapper += '<li class="single">' + value + '</li>';
					});

				dataWrapper += '</ul>';
				dataWrapper =  '<div class="wrap-fields-outer">' + dataWrapper + '</div>';

				sidebarData = 1;

			}

			break;



			// tags
			case 'tags':

			if(settings.tags == true) {

				dataWrapper += '<div class="wrap-label">' + 'iconTags' + 'Tags:</div>';
				dataWrapper += '<ul class="wrap-values">';

					$.each(value.tags, function(key, value) {
						dataWrapper += '<li class="single">' + value + '</li>';
					});

				dataWrapper += '</ul>';
				dataWrapper =  '<div class="wrap-tags-outer">' + dataWrapper + '</div>';

				sidebarData = 1;

			}

			break;



			// description
			case 'description':

			if(settings.description == true && value.description !== '') {

				dataWrapper += '<div class="wrap-description">' + value.description + '</div>';

			}

			break;


		}


		return dataWrapper;


	}

	

function printContentForDetail(){



    // print the sidebar
    function printAsideContent() {

        html += '<div>'

            html += dataExtracted[0]['views'];
            html += dataExtracted[0]['appreciations'];
            html += dataExtracted[0]['fields'];
            html += dataExtracted[0]['tags'];
            html += dataExtracted[0]['projectUrl'];
            html += dataExtracted[0]['publishedDate'];

        html += '</div>';

    }

    html = '<div class="container-fluid">';	

		html += '<div class="row d-flex">';
			html += '<div class="col-md-10">';
				html += '<div class="container-fluid">';
					html += '<div class="intro">';
						html += '<h2 class="text-center">'+ dataExtracted[0]['title'] +'</h2>';
					html += '</div>';
				html += '</div>';
			html += '</div>';
			html += '<div class="col-md-2">';
					html += dataExtracted[0]['owners'];
			html += '</div>';
		html += '</div>';

		html += '<div class="row d-flex">';
		
			// main column
			html += '<div class="col-md-10">';
				html += dataExtracted[0]['works'];
			html += '</div>';
			
			html += '<div class="col-md-2">';
				printAsideContent()
			html += '</div>';	

		html += '</div>';
	html += '</div>';
		

	

    // check if one of the sidebar fields is printed
    // if(sidebarData == true) {

    //     // sidebar for mobile
    //     html += '<aside class="box-inner-sidebar sidebar-mobile">';

    //         printAsideContent();

    //         html += '<a class="bh-show" style="background-color: ' + settings.themeColor + '"><span class="label">Show Info</span><span class="icon-chevron">' + 'iconChervronDown' + '</span></a>';

    //     html += '</aside>';

    //     // sidebar for desktop
    //     html += '<aside class="box-inner-sidebar sidebar-desktop">';

    //         html += '<div class="eb-desktop-info" style="background-color: ' + settings.themeColor + '"><span class="icon">' + 'iconChevronRight' + '</span><span class="label">Info</span></div>';

    //         printAsideContent();

    //     html += '</aside>';

    // }



	$('#lightbox').on('shown.bs.modal', function(e) {
		// $(e.currentTarget).find('.title-modal').replaceWith(`<h3>` + dataExtracted[0]['title'] + `</h3>`);
		$(e.currentTarget).find('#bhContain').html(html);
	});

    // // wrap all the data belongs to one project and append the wrapper
    // html = '<div class="box-project eb-container">' + html + '</div>';	

    // // print all the content into the div
    // $(html).insertAfter($('.eb-total-outer-container'));

    
    // if there is the sidebar
    // if(sidebarData == true) {

    //     // add a class to the wrapper if there's the sidebar
    //     $('.eb-container .box-project').addClass('has-sidebar');

    // }

}





