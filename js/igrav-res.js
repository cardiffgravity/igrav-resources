var filters={
    'domain':{
        tag:'dom',
        title:'Resource Domain',
        type:'normal',
        select:{
            'online-tool':{'tag':'dom-online-tool',name:"Online Tool",icon:'dom-online.svg'},
            'education':{'tag':'dom-education',name:"Education",icon:'dom-education.svg'},
            'data':{'tag':'dom-data',name:"Data",icon:'dom-data.svg'}
      }
    },'subject':{
        tag:'subj',
        title:'Resource Domain',
        type:'normal',
        select:{
            'gw':{'tag':'subj-gravitational-waves',name:"Gravitational Waves",icon:'subj-online.svg'},
            'physics':{'tag':'subj-physics',name:"Physics",icon:'subj-education.svg'},
            'astronomy':{'tag':'subj-astro',name:"Astronomy",icon:'subj-data.svg'},
            'coding':{'tag':'subj-coding',name:"Coding",icon:'subj-data.svg'},
            'mma':{'tag':'subj-mma',name:"Multimessenger Astronomy",icon:'subj-data.svg'}
        }
    },'types':{
        sort:true,
        tag:'type',
        title:'Activity types',
        type:'normal',
        select:{
            'Printable':{'tag':'type-printable-activity',name:"Printable Activity",icon:'svg'},
            'Presentation':{'tag':'type-presentation',name:"Presentation Materials",icon:'svg'},
            'Online':{'tag':'type-online',name:"Online",icon:'svg'},
            'Interactive':{'tag':'type-interactive',name:"Interactive",icon:'svg'},
            'Coding':{'tag':'type-coding',name:"Coding",icon:'svg'},
            'Reading':{'tag':'type-reading',name:"Reading",icon:'svg'},
            'Degree prep':{'tag':'type-degree-prep',name:"Degree-prep",icon:'svg'},
            'Craft':{'tag':'type-craft',name:"Craft",icon:'svg'},
            'Worksheet':{'tag':'type-worksheet',name:"Worksheet",icon:'svg'},
            'Video':{'tag':'type-video',name:"Video",icon:'svg'},
            'Podcast':{'tag':'type-podcast',name:"Podcast",icon:'svg'},
            'Observing':{'tag':'type-observing',name:"Observing",icon:'svg'},
            'AR':{'tag':'type-augmented-reality',name:"Augmented Reality",icon:'svg'},
            'VR':{'tag':'type-virtual-reality',name:"Virtual Reality",icon:'svg'},
            'App':{'tag':'type-app',name:"App",icon:'svg'},
            'Collection':{'tag':'type-collection',name:"Collection",icon:'svg'},
            'Research':{'tag':'type-independent-research',name:"Independent Research",icon:'svg'}
        }
    },'requirements':{
        sort:true,
        tag:'req',
        title:'Requirements',
        type:'req',
        desc:'Deselect any that are unavailable',
        select:{
            'Any-device':{'tag':'req-any-device',name:"Any device",icon:'svg'},
            'Web-access':{'tag':'req-web-access',name:"Web access",icon:'svg'},
            'Craft':{'tag':'req-craft',name:"Craft",icon:'svg'},
            'Printer':{'tag':'req-printer',name:"Printer",icon:'svg'},
            'Computer':{'tag':'req-computer',name:"Computer",icon:'svg'},
            'Phone':{'tag':'req-phone',name:"Phone/Tablet",icon:'svg'},
            'Android':{'tag':'req-android',name:"Android Device",icon:'svg'},
            'Apple':{'tag':'req-apple',name:"Apple Device",icon:'svg'},
            'Audio':{'tag':'req-audio',name:"Audio",icon:'svg'},
            'Group':{'tag':'req-groups',name:"Groups",icon:'svg'},
            'VR:':{'tag':'req-vr-headset',name:"VR Headset",icon:'svg'}
        }
    },'age':{
        tag:'age',
        title:'Age',
        type:'normal',
        select:{
            'age47':{'tag':'age-4-7',name:"4-7"},
            'age79':{'tag':'age-7-9',name:"7-9"},
            'age911':{'tag':'age-9-11',name:"9-11"},
            'age1114':{'tag':'age-11-14',name:"11-14"},
            'age1416':{'tag':'age-14-16',name:"14-16"},
            'age1618':{'tag':'age-16-18',name:"16-18"},
            'ageundergrad':{'tag':'age-undergrad',name:"Undergrad"},
            'ageresearcher':{'tag':'age-researcher',name:"Researcher"}
        },
    // },'author':{
    //     tag:'author',
    //     title:'Author',
    //     type:'normal',
    //     select:{
    //         'lvk':{'tag':'author-lvk',name:"LIGO-Virgo-KAGRA"},
    //         'external':{'tag':'author-external',name:"External provider"}
    //     }
    }
}
var presets={
    'education':{
        button:true,
        title:'Education',
        selected:{dom:['subj-education']},
        unselected:{type:[],age:[],req:[],author:[]}
    },
    'presentation':{
        button:true,
        title:'Presentation Materials',
        selected:{type:['type-presentation']},
        unselected:{age:[],dom:[],req:[],author:[]}
    },
    'degree':{
        button:false,
        title:'Degree Prep',
        selected:{age:['age-16-18','age-gt18'],type:['type-degree-prep']},
        unselected:{dom:[],req:[],author:[]}
    },
    'all':{
        button:true,
        title:'All',
        unselected:{age:[],type:[],dom:[],req:[],author:[]}
    },
    'noweb':{
        button:false,
        title:'No web-access',
        unselected:{req:['req-web-access'],age:[],type:[],dom:[],author:[]}
    },
    'lvk-only':{
        button:false,
        title:'LVK-only',
        selected:{author:['author-lvk']},
        unselected:{age:[],type:[],dom:[],req:[]}
    }

}
var dirs={
    img:'../img'
}
var hid='content';
function initPage(fileIn='../data/data.jsonp'){
    // console.log(fileIn,pop);
    $('#filter-button').click(function(){
        // console.log('filter-button clicked');
        if ($(this).hasClass('closed')){
            $(this).removeClass('closed');
            $('#filter-holder').removeClass('closed');
            $('#filter-label').removeClass('closed');
            // var filtleft=$('#main').css('marginLeft');
            // var lableft=320-40-$('#filter-label').width()-48;
            // $('#filter-label').css({'margin-left':lableft})
            // $('#filter-holder').css({'left':filtleft})
        }else{
            $(this).addClass('closed');
            $('#filter-holder').addClass('closed');
            $('#filter-label').addClass('closed');
            // var filtleft=$('#main').css('marginLeft')-$('#filter-holder').width()-50;
            // $('#filter-holder').css({'left':filtleft})
            // // var left=$('filter-holder').offsetWidth-$('filter-label').offsetWidth
            // $('#filter-label').css({'margin-left':0})
        }

    })
    makeFilters();
    makePresets();
    makeSearch();
    console.log('loading data from',fileIn)
    ajax(fileIn,{
		"dataType": "jsonp",
		"callback":"data",
        "this":this,
		"error": function(error) {
			console.log('events error:',error);
		},
		"success": function(dataIn){
            // this.data=dataIn;
            this.data=dataIn.sort(function(a,b){
                return (b['Resource Name'] > a['Resource Name'])?-1:1;
            })
            populateData();
            whenLoaded();
		}
	});
    // updateFilters();
}
function whenLoaded(){
    updateFilters();
    getUrlVars();
    if (this.vars.preset){
        // console.log('preset',this.vars.preset);
        applyPreset(this.vars.preset);
    }
}
function getUrlVars(){
    this.vars={};
    var hash,url = window.location.href;
    if (window.location.href.indexOf('?')!=-1){
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        url = window.location.href.slice(0,window.location.href.indexOf('?'));
        for(var i = 0; i < hashes.length; i++){
            hash = hashes[i].split('=');
            // vars.push(hash[0]);
            this.vars[hash[0]] = hash[1];
        }
    }
}
function populateData(){
    // console.log(hid);
    var _h=hid;
    for (d in this.data){
        _dx=this.data[d];
        _dx.classlist='';
        _i='item-'+d;
        // console.log($('#'+_h));
        $('#'+_h).append('<div class="block-item" id="'+_i+'"></div>');
        // console.log($('#'+_i));
        $('#'+_i).append('<div class="block-title"><h3 class="block-white"></h3></div>');
        if(typeof _dx.Image==="undefined"){
            $('#'+_i).append('<div class="block-img"></div>');
        }else if (_dx.Image.length>0){
            $('#'+_i).append('<div class="block-img"><img src="'+((_dx.Image.substring(0,4)=='http')?_dx.Image:'img/'+_dx.Image)+'" alt="image"></div>');
        }else{
            $('#'+_i).append('<div class="block-img"></div>');
        }
        if(_dx['LVK?']=='LVK'){$('#'+_i).append('<div class="res res-lvk">LVK</div>');}
        $('#'+_i).append('<p class="res res-type"></p>');
        $('#'+_i).append('<p class="res res-age"></p>');
        $('#'+_i).append('<p class="res res-req"></p>');
        if(_dx.Credit){
            $('#'+_i).append('<p class="res res-credit">'+_dx['Credit']+'</p>');
        }
        $('#'+_i).append('<p class="res res-author">'+_dx['Author/Originator']+'</p>');
        $('#'+_i).append('<p class="res res-desc">'+_dx['Description']+'</p>');
        if (_dx.URL){
            urltxt='<span class="res-url"><a title="'+_dx['Resource Name']+'" href="'+_dx.URL_+'">More info</a></span>';
            // $('#'+_i).append('<p class="res res-url">'+urltxt+'</p>');
            $('#'+_i+' .block-title h3').append('<a href="'+_dx.URL+'">'+_dx['Resource Name']+'</a>');
            $('#'+_i+' .block-img').append('<a href="'+_dx.URL+'"><div class="block-link">Click here</div></a>');
        }else{
            $('#'+_i+' .block-title h3').append(_dx['Resource Name']);
        }

        if (_dx['Age Range']){
            _dx.ages={};
            ages=_dx['Age Range'].split(';');
            for (a in ages){
                an=ages[a].trim().toLowerCase().replace('>','gt').replace(' ','-');
                _dx.ages[an]=ages[a];
                $('#'+_i).addClass('age-'+an);
                $('#'+_i+' .res-age').append('<span class="res-age-item age-'+an+'">'+ages[a]+'</span>');
                // _dx.classlist+=' age-'+an;
            }
        }
        if (_dx['Requirements']){
            _dx.reqs={};
            reqs=_dx['Requirements'].split(';');
            for (r in reqs){
                rq=reqs[r].trim().toLowerCase().replace(' ','-');
                _dx.reqs[rq]=reqs[r].trim();
                $('#'+_i).addClass('req-'+rq);
                $('#'+_i+' .res-req').append('<div class="res-req-item req-'+rq+'"><div class="icon icon-req-'+rq+'"></div><span class="res-req-label">'+reqs[r].trim()+'</div></div>');
                // $('#'+_i+' .res-req').append('<span class="res-req-item req-'+rq+'">'+reqs[r]+'</span>');
            }
        }else{
            $('#'+_i+' .res-req').addClass('hidden')
        }
        if (_dx['Domain']){
            _dx.doms={};
            doms=_dx['Domain'].split(';');
            for (o in doms){
                dm=doms[o].trim().toLowerCase().replace(' ','-');
                _dx.doms[dm]=doms[o];
                $('#'+_i).addClass('dom-'+dm);
                $('#'+_i+' .res-dom').append('<span class="res-dom-item dom-'+dm+'">'+doms[o].trim()+'</span>');
                $('#'+_i+' .block-title').append('<div class="icon icon-dom-'+dm+'"></div>');
            }
        }
        if (_dx['Subject']){
            _dx.subjs={};
            subjs=_dx['Subject'].split(';');
            for (s in subjs){
                sb=subjs[s].trim().toLowerCase().replace(' ','-');
                _dx.subjs[sb]=subjs[s];
                $('#'+_i).addClass('subj-'+sb);
                // $('#'+_i+' .block-title').append('<div class="icon icon-subj-'+sb+'"></div>');
              }
                $('#'+_i+' .res-subj').append('<div class="res-subj-item subj-'+sb+'"><div class="icon icon-subj-'+sb+'"></div><span class="res-subj-label">'+subjs[s].trim()+'</div></div>');
                if (_dx['Type of Resource']){
        }
            _dx.types={};
            types=_dx['Type of Resource'].split(';');
            for (t in types){
                tp=types[t].trim().toLowerCase().replace(' ','-');
                _dx.types[tp]=types[t].trim();
                $('#'+_i).addClass('type-'+tp);
                $('#'+_i+' .res-type').append('<div class="res-type-item type-'+tp+'"><div class="icon icon-type-'+tp+'"></div><span class="res-type-label">'+types[t].trim()+'</div></div>');
                // $('#'+_i+' .block-title').append('<div class="icon icon-type-'+tp+'"></div>');
            }
        }
        // if (_dx['LVK?']){
        //     console.log(_dx['Resource Name'],_dx['LVK?'].toLowerCase);
        //     if (_dx['LVK?'].toLowerCase()=='lvk'){
        //         $('#'+_i).addClass('author-lvk');
        //         $('#'+_i+' .block-title').append('<div class="icon icon-author-lvk"></div>');
        //     }else if (_dx['LVK?'].toLowerCase()=='collaboration'){
        //         $('#'+_i).addClass('author-collaboration');
        //         $('#'+_i+' .block-title').append('<div class="icon icon-author-lvk"></div>');
        //     }else{
        //         $('#'+_i).addClass('author-external');
        //     }
        // }else{
        //     $('#'+_i).addClass('author-external');
        // }
    }
}

function makeFilters(){
    fH=$('#filter-holder');
    // fH.append('<h2 class="filter-title">Filters</h2>');
    for (filt in filters){
        // console.log(filt);
        var ftag=filters[filt].tag;
        $('#filter-holder').append('<div class="filter open" id="filter-'+ftag+'"><h3 class="filter-name">'+filters[filt].title+'</h3></div>')
        $('#filter-'+ftag+'.filter').append('<div class="select"><div class="select-none">Select None</div><div class="select-all">Select All</div></div>');
        $('.select-none').each(function(){
            $(this).click(function(){
                $(this).parent().siblings('.filt-option').each(function(){
                    $(this).find('input').prop('checked',false);
                });
                updateFilters();
            });
        });
        $('.select-all').each(function(){
            $(this).click(function(){
                $(this).parent().siblings('.filt-option').each(function(){
                    $(this).find('input').prop('checked',true);
                });
                updateFilters();
            });
        });
        if (filters[filt].desc){
            $('#filter-'+ftag+'.filter').append('<div class="filt-desc">'+filters[filt].desc+'</div>');
        }
        // sort filter order
        var filtOrder=[];
        for (s in filters[filt].select){filtOrder.push(s)}
        console.log('unordered',filt,filtOrder);
        var fsel=filters[filt].select;
        if (filters[filt].sort){
            filtOrder=filtOrder.sort(function(a,b){
                return (fsel[a].name > fsel[b].name)?1:-1;
            })
            console.log('ordered',filt,filtOrder);
        }
        for (sx in filtOrder){
            var s=filtOrder[sx];
            var stag=filters[filt].select[s].tag;
            // console.log(s);
            $('#filter-'+ftag+'.filter').append('<div class="filt-option '+stag+'" id="filt-'+stag+'_option"></div>')
            $('#filt-'+stag+'_option').append('<input type="checkbox" id="filt-'+stag+'" name="filt-'+stag+'" checked=true>');
            if (filters[filt].select[s].icon){
                $('#filt-'+stag+'_option').append('<div class="icon icon-'+stag+'"></div>');
            }
            $('#filt-'+stag+'_option').append('<label class="filt-item '+ftag+' '+stag+'" for="filt-'+stag+'" id="filt-'+stag+'_label"><span class="filt-name">'+filters[filt].select[s].name+'</span> (<span class="filt-count"></span>)</label>');
            $('#filt-'+stag).change(function(){
                updateFilters();
            })
        }
    }
    $('.filter-name').each(function(){
        $(this).click(function(){
            if ($(this).parent().hasClass("open")){
                $(this).parent().removeClass("open");
                $(this).parent().addClass("closed");
            }else{
                $(this).parent().removeClass("closed");
                $(this).parent().addClass("open");
            }
        })
    })
    // fH=window.innerHeight;
    // -$('#title-bar').height()-parseFloat($('#title-bar').css('paddingTop'));
    // console.log(window.innerHeight,$('#title-bar').height(),parseFloat($('#title-bar').css('paddingTop')),fH)
    // $('#filter-holder').height(fH-8);
    // updateFilters();
    $('#filter-holder').append($('#about'));
}

function makePresets(){
    $('#presets').append('<div class="preset less" id="preset-more"></div>');
    for (pre in presets){
        if (presets[pre].button){
            $('#preset-more').before('<div class="preset" id="preset-'+pre+'">'+presets[pre].title+'</div>');
        }else{
            $('#preset-more').after('<div class="preset hideable hidden" id="preset-'+pre+'">'+presets[pre].title+'</div>');
        }
        // preclass=(presets[pre].button)?'preset':'preset hideable hidden';
        // $('#presets').append('<div class="'+preclass+'" id="preset-'+pre+'">'+presets[pre].title+'</div>');
        $('#preset-'+pre).click(function(){
            pid=$(this).prop('id').replace('preset-','');
            applyPreset(pid);
        })
    }
    $('#preset-more').click(function(){
        if ($(this).hasClass('less')){
            $(this).removeClass('less');
            $(this).addClass('more');
            $('.preset.hideable').removeClass('hidden');
        }else{
            $(this).removeClass('more');
            $(this).addClass('less');
            $('.preset.hideable').addClass('hidden');
        }
    })
}
function makeSearch(){
    $('#search-input').val('');
    $('#search-opt-toggle').click(function(){
        if ($(this).hasClass('less')){
            $(this).removeClass('less');
            $(this).addClass('more');
            $('#search-options').removeClass('hidden');
        }else{
            $(this).removeClass('more');
            $(this).addClass('less');
            $('#search-options').addClass('hidden');
        }
    });
    $('.search-opt > input').change(function(){
        searchList();
    });
    $('#search-clear').click(function(){
        console.log(this);
        $('#search-input').val('');
        searchList();
    });
    searchList();

}
function applyPreset(pid){
    if (!presets[pid]){console.log('invalid preset',pid);return;}
    px=presets[pid];
    console.log(pid,px);
    if (px.selected){
        for (filt in px.selected){
            $('#filter-'+filt).find('input').each(function(){$(this).prop('checked',false)})
            for (s in px.selected[filt]){
                console.log(px.selected[filt][s]);
                $('#filt-'+px.selected[filt][s]).prop('checked',true);
            }
        }
    }
    if (px.unselected){
        for (filt in px.unselected){
            $('#filter-'+filt).find('input').each(function(){$(this).prop('checked',true)})
            for (s in px.unselected[filt]){
                // console.log(px.unselected[filt][s]);
                $('#filt-'+px.unselected[filt][s]).prop('checked',false);
            }
        }
    }
    updateFilters();
    return;
}
function updateFilters(){
    for (filt in filters){
        for (s in filters[filt].select){
            filters[filt].select[s].nactive=0;
        }
    }
    $('.block-item').each(function(){
        var filtTotal=1;
        var filtSub={};
        for (filt in filters){
            filtSub[filt]=(filters[filt].type=='req')?1:0;
            for (s in filters[filt].select){
                var stag=filters[filt].select[s].tag;
                if (filters[filt].type=='normal'){
                    if($('input#filt-'+stag).prop('checked')){
                        if ($(this).hasClass(stag)){
                            filtSub[filt]+=1;
                            filters[filt].select[s].nactive+=1;
                        }
                    }
                }else if (filters[filt].type=='req'){
                    if ($(this).hasClass(stag)){
                        filters[filt].select[s].nactive+=1;
                    }
                    // console.log(stag,$('input#filt-'+stag).prop('checked'),$(this).hasClass(stag),filtSub[filt])
                    if(!$('input#filt-'+stag).prop('checked')){
                        if ($(this).hasClass(stag)){
                            filtSub[filt]=0;
                            // console.log(filtSub[filt]);
                        }
                    }
                }
            }
            filtTotal*=filtSub[filt]
        }
        console.log($(this).find('h3 > a').html(),filtSub,filtTotal)
        if (filtTotal==0){
            $(this).addClass('hidden');
        }else{
            $(this).removeClass('hidden');
        }
    });
    for (filt in filters){
        for (s in filters[filt].select){
            var nactive=0;
            var stag=filters[filt].select[s].tag;
            $('.block-item').each(function(){
                if (!$(this).hasClass('hidden') && $(this).hasClass(stag)){nactive+=1}
            })
            // $('#filt-'+stag+'_label > .filt-count').html(filters[filt].select[s].nactive);
            $('#filt-'+stag+'_label > .filt-count').html(nactive);
        }
    }
}
function searchList(){
    // Declare variables
    console.log('')
    var input, filter, title, desc, author;
    input = document.getElementById('search-input');
    filter = input.value.toUpperCase();
    // Loop through all list items, and hide those who don't match the search query
    $('.block-item').each(function(){
        // title=$(this).find('.block-title > h3').text();
        desc=$(this).find('.res-desc').text();
        desc=$(this).find('.res-author').text();
        srchtxt='';
        if ($('#search-title-input').prop('checked')){
            srchtxt+=$(this).find('.block-title > h3').text();
        }
        if ($('#search-desc-input').prop('checked')){
            srchtxt+=$(this).find('.res-desc').text();
        }
        if ($('#search-author-input').prop('checked')){
            srchtxt+=$(this).find('.res-author').text();
        }
        if (srchtxt.toUpperCase().indexOf(filter) > -1){
            console.log('show',title);
            $(this).removeClass('search-hidden');
        }else{
            console.log('hide',title);
            $(this).addClass('search-hidden');
        }

    });
}
function ajax(url,attrs){
    // courtesy of slowe
	if(typeof url!=="string") return false;
	if(!attrs) attrs = {};
	var cb = "",qs = "";
	var oReq;
	if(attrs['dataType']=="jsonp"){
        if(typeof attrs['callback']==="string") cb = attrs['callback'];
        else cb = 'fn_'+(new Date()).getTime();
		window[cb] = function(rsp){
			if(typeof attrs.success==="function") attrs.success.call((attrs['this'] ? attrs['this'] : this), rsp, attrs);
		};
	}
	if(typeof attrs.cache==="boolean" && !attrs.cache) qs += (qs ? '&':'')+(new Date()).valueOf();
	if(cb) qs += (qs ? '&':'')+'callback='+cb;
	if(attrs.data) qs += (qs ? '&':'')+attrs.data;

	// Build the URL to query
	attrs['url'] = url+(qs ? '?'+qs:'');

	if(attrs['dataType']=="jsonp"){
		var script = document.createElement('script');
		script.src = attrs['url'];
		document.body.appendChild(script);
		return this;
	}

	// code for IE7+/Firefox/Chrome/Opera/Safari or for IE6/IE5
	oReq = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	oReq.addEventListener("load", window[cb] || complete);
	oReq.addEventListener("error", error);
	if(attrs.beforeSend) oReq = attrs.beforeSend.call((attrs['this'] ? attrs['this'] : this), oReq, attrs);

	function complete(evt) {
		if(oReq.status === 200) {
			attrs.header = oReq.getAllResponseHeaders();
			var rsp = oReq.response || oReq.responseText;
			// Parse out content in the appropriate callback
			if(attrs['dataType']=="json") try { rsp = JSON.parse(rsp.replace(/[\n\r]/g,"\\n").replace(/^([^\(]+)\((.*)\)([^\)]*)$/,function(e,a,b,c){ return (a==cb) ? b:''; }).replace(/\\n/g,"\n")) } catch(e){};
			if(attrs['dataType']=="script"){
				var fileref=document.createElement('script');
				fileref.setAttribute("type","text/javascript");
				fileref.innerHTML = rsp;
				document.head.appendChild(fileref);
			}
			attrs['statusText'] = 'success';
			if(typeof attrs.success==="function") attrs.success.call((attrs['this'] ? attrs['this'] : this), rsp, attrs);
		}else{
			attrs['statusText'] = 'error';
			error(evt);
		}
		if(typeof attrs.complete==="function") attrs.complete.call((attrs['this'] ? attrs['this'] : this), rsp, attrs);
	}

	function error(evt){
		if(typeof attrs.error==="function") attrs.error.call((attrs['this'] ? attrs['this'] : this),evt,attrs);
	}

	if(attrs['dataType']) oReq.responseType = attrs['dataType'];

	try{ oReq.open('GET', attrs['url']); }
	catch(err){ error(err); }

	try{ oReq.send(); }
	catch(err){ error(err); }

	return this;
} // End default ajax() function
