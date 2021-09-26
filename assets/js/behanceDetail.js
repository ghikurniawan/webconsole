     //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
	//::::::::::::::::::::: PLUGIN OPTIONS :::::::::::::::::::::::://
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://


	// default options
	var settings = $.extend({
		
		// default option values										
		owners: true,
		appreciations: true,
		views: true,
		publishedDate: true,
		projectUrl: true,
		fields: true,
		apiKey: '',
		itemsPerPage: '1',
		userName: '',
		infiniteScrolling: false,
		imageCaption: false,
		ownerLink: true,
		description: true,
		tags: true,
		themeColor: '#2183ee',
		animationDuration: 1000,
		animationEasing: 'easeInOutExpo'

	}, options );

	
    
    
    
    
    
    
    
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

				dataWrapper += '<div class="wrap-label">By: </div>';
				dataWrapper += '<ul class="wrap-values">';

					$.each(value.owners, function(key, value) {
						dataWrapper += '<li class="single">';
							
							// check if it's detail to show the profile picture
							if(isDetail == true) {
								
								dataWrapper += '<div class="profile-pic">';
								
								// check if URL on the owner name is enabled (only in the detail)
								if(settings.ownerLink == true) {
									dataWrapper += '<a style="color: ' + settings.themeColor + '" href="' + value['url'] + '" target="_blank"><img src="' + value['images']['100'] +  '" alt="' + value['display_name'] + ' profile picture" /></a>';	
								} else {
									dataWrapper += '<img src="' + value['images']['100'] +  '" alt="' + value['display_name'] + ' profile picture" />';
								}
								
								dataWrapper += '</div>';
							}

							// print the full name
							dataWrapper += '<div class="owner-full-name">' + iconsSet('owner');

								if(settings.ownerLink == true) {
									dataWrapper += '<a style="color: ' + settings.themeColor + '" href="' + value['url'] + '" target="_blank">' + value['display_name'] + iconsSet('chevronRight') + '</a>';
								} else {
									dataWrapper += value['display_name'];
								}
							
							dataWrapper += '</div>';

						dataWrapper += '</li>';
					});

				dataWrapper += '</ul>' ;

				dataWrapper =  '<div class="wrap-owners-outer">' + dataWrapper + '</div>';

				sidebarData = 1;

			}
			
			break;

			// works
			case 'works':

			dataWrapper += '<ul class="wrap-values">';

			// save the title for the image alt
			var imgAlt = value.name;

				// loop through all the projects type (image, text, embed)
				$.each(value.modules, function(key, value) {

					function caption() {
						if ('caption' in value && settings.imageCaption == true) {
							return '<li class="caption">' + value['caption'] + '</li>';
						} else {
							return '';
						}
					}

					function fullBleed(){

						if( value.full_bleed == 1 ){
							return ' full-bleed';
						} else {
							return '';
						}
					}

					switch(value['type']) {

						case 'image':

							dataWrapper += '<li class="single-image' + fullBleed() + '">';
					
							dataWrapper += '<picture>';
								dataWrapper += '<source media="(min-width: 30em)" srcset="' + value['sizes']['original'] + '">';
								dataWrapper += '<img src="' + value['sizes']['disp'] + '" alt="' + imgAlt + '" />';
							dataWrapper += '</picture>'; 

						dataWrapper += '</li>';

						// behance spacer (mandatory on after any project module)
						dataWrapper += caption();

						// behance spacer (mandatory on after any project module)
						dataWrapper += '<li class="spacer"><div class="divider"></div></li>';

						break;

						case 'text':
						dataWrapper += '<li class="single-text">' + value['text'] + '</li>';

						// behance spacer (mandatory on after any project module)
						dataWrapper += caption();

						// behance spacer (mandatory on after any project module)
						dataWrapper += '<li class="spacer"><div class="divider"></div></li>';

						break;

						case 'embed':
						dataWrapper += '<li class="single-embed' + fullBleed() + '"><div class="inner">' + value['embed'] + '</div></li>';

						// behance spacer (mandatory on after any project module)
						dataWrapper += caption();

						// behance spacer (mandatory on after any project module)
						dataWrapper += '<li class="spacer"><div class="divider"></div></li>';
					}

				});

			dataWrapper += '</ul>';
			dataWrapper =  '<div class="wrap-works-outer">' + dataWrapper + '</div>';
			
			break;


			// appreciations
			case 'appreciations':
			
			if(settings.appreciations == true) {

				dataWrapper += '<div class="wrap-label">' + iconsSet('thumbsUp') + '</div>';
				dataWrapper += '<div class="wrap-value">' + value.stats.appreciations  + '</div>';
				dataWrapper =  '<div class="wrap-appreciations-outer">' + dataWrapper + '</div>';

				sidebarData = 1;

			}

			break;


			// views
			case 'views':

			if(settings.views == true) {
			
				dataWrapper += '<div class="wrap-label">' + iconsSet('views') + '</div>';
				dataWrapper += '<div class="wrap-value">' + value.stats['views']  + '</div>';
				dataWrapper =  '<div class="wrap-views-outer">' + dataWrapper + '</div>';

				sidebarData = 1;

			}

			break;


			// cover
			case 'cover':

			dataWrapper += '<div class="wrap-cover">';
				dataWrapper += '<img src="' + value.covers['404'] + '" alt="' + value.name + '" />';

				if(settings.fields == true) {

					dataWrapper += '<ul class="fields-in-cover">' + iconsSet('fields');

					$.each(value.fields, function(key, value) {
						dataWrapper += '<li class="single">' + value + '</li>';
					});

					dataWrapper += '</ul>';

				}

			dataWrapper += '</div>';
			
			break;


			// title
			case 'title':

			dataWrapper += '<div class="wrap-title">' + value.name + '</div>';
			
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

				dataWrapper += '<div class="wrap-label">' + iconsSet('fields') + 'Fields:</div>';
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

				dataWrapper += '<div class="wrap-label">' + iconsSet('tags') + 'Tags:</div>';
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