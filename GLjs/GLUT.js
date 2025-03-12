WebGLUtils = function() {
	var mobileCheck = function() {
	  let check = false;
	  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	  return check;
	};
	function detectIE() {
		var ua = window.navigator.userAgent;

		// Test values; Uncomment to check result …

		// IE 10
		// ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

		// IE 11
		// ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

		// IE 12 / Spartan
		// ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

		// Edge (IE 12+)
		// ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			// IE 11 => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			// Edge (IE 12+) => return version number
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}

		// other browser
		return false;
	}
	
	var makeFailHTML = function(msg) {
		return '' +
			'<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
			'<td align="center">' +
			'<div style="display: table-cell; vertical-align: middle;">' +
			'<div style="">' + msg + '</div>' +
			'</div>' +
			'</td></tr></table>';
	};
	var GET_A_WEBGL_BROWSER = '' +
		'This page requires a browser that supports WebGL.<br/>' +
		'<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';
	var OTHER_PROBLEM = '' +
		"It doesn't appear your computer can support WebGL.<br/>" +
		'<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';
	var setupWebGL = function(canvas, opt_attribs, opt_onError) {
		var setting_error;
		function handleCreationError(msg) {
			var container = canvas.parentNode;
			if (container) {
				var str = window.WebGLRenderingContext ?
				OTHER_PROBLEM :
				GET_A_WEBGL_BROWSER;
				if(setting_error)str=setting_error;
				if (msg) {
					str += "<br/><br/>Status: " + msg;
				}
				container.innerHTML = makeFailHTML(str);
			}
		};
		var originalElement=canvas;
		var controlHTML = document.createElement("div");
		var copyAttributeList=[['width',true],['height',true],['style',false]];
		for(var i=0; i<canvas.classList.length; ++i)controlHTML.classList.add(canvas.classList[i]);
		for(var i=0; i<controlHTML.classList.length; ++i)canvas.classList.remove(controlHTML.classList[i]);
		for(var i=0; i<copyAttributeList.length; ++i){
			if(!canvas.hasAttribute(copyAttributeList[i][0]))continue;
			var htmlAttribute=canvas.getAttribute(copyAttributeList[i][0]);
			if(htmlAttribute.toString().replace(trim_regexp,'')!='')
			canvas.setAttribute(copyAttributeList[i][0],htmlAttribute);
			if(copyAttributeList[i][1])canvas.removeAttribute(copyAttributeList[i][0]);
		}
		if(canvas.hasAttribute('id')){
			controlHTML.setAttribute('id',canvas.getAttribute('id').toString().replace(trim_regexp,'')+'-control');
		}
		if(canvas.style.width)controlHTML.style.width=canvas.style.width;
		if(canvas.style.height)controlHTML.style.height=canvas.style.height;
		canvas.parentNode.insertBefore(controlHTML, canvas.nextSibling);
		canvas.parentNode.removeChild(canvas);
		controlHTML.appendChild(canvas);

		opt_onError = opt_onError || handleCreationError;
		var handle_onError=function(e){
			var el = document.createElement("div");

			el.style.width=(canvas.clientWidth<300?300:canvas.clientWidth)+'px';
			el.style.height=(canvas.clientHeight<300?300:canvas.clientHeight)+'px';

			canvas.parentNode.insertBefore(el, canvas.nextSibling);
			canvas.parentNode.removeChild(canvas);
			el.appendChild(canvas);
			opt_onError(e);
		}
		var tag_name=canvas.tagName.toString().toLowerCase();
		var is_ie=detectIE();
		if(is_ie || tag_name!='canvas'){
			if(is_ie || tag_name=='div'){
				var newCanvas = document.createElement(is_ie?"object":"canvas");
				newCanvas.type="application/x-webgl";
				newCanvas.style.width='100%';
				newCanvas.style.height='100%';
				canvas.appendChild(newCanvas);
				canvas=newCanvas;
			}else{
				setting_error = '' +
				"It doesn't appear HTML tag &lt;"+tag_name+"&gt; can support WebGL.<br/>" +
				'Please check your HTML code.';
				handle_onError("");
				return null;
			}
		}

		if (canvas.addEventListener) {
			canvas.addEventListener("webglcontextcreationerror", function(event) {
				handle_onError(event.statusMessage);
			}, false);
		}
		var context = create3DContext(canvas, opt_attribs);
		if (!context) {
			if (!window.WebGLRenderingContext) {
				handle_onError("");
			}
		}
		context.controlHTML=controlHTML;
		context.originalHTML=originalElement;
		context.canvasHTML=canvas;
		return context;
	};
	var create3DContext = function(canvas, opt_attribs) {
		var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
		var context = null;
		for (var ii = 0; ii < names.length; ++ii) {
			try {
				context = canvas.getContext(names[ii], opt_attribs);
			} catch(e) {}
			if (context) {
				break;
			}
		}
		return context;
	}
	window.requestAnimFrame = (function() {
	  return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {return window.setTimeout(callback, 1000/60);};
	})();
	window.cancelAnimFrame = (function () {
		return window.cancelAnimationFrame ||
			window.webkitCancelAnimationFrame ||
			window.mozCancelAnimationFrame ||
			window.oCancelAnimationFrame ||
			window.msCancelAnimationFrame ||
			function (id) {window.clearTimeout(id);};
	})();


	var setupGLUT = function(canvas, opt_attribs, opt_onError) {
		if(canvas.gl)return canvas.gl;
		try{$.noop()}catch(ex){
			//load jquery
			var script = document.createElement('script');
			/*script.onload = function () {
				//do stuff with the script
			};*/
			script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
			document.head.appendChild(script); //or something of the likes
		}
		var is_ie=detectIE();
		var gl;
		var max_light=8;
		if(mobileCheck())max_light=2;
		var htmlContainer, mainContainer,cameraElement;
		var glut_looping=false;
		var lightStructMembers = [
			"position",
			"direction",

			"diffuse",
			"specular",
			"ambient",

			"spotCutOff",
			"constantAttenuation",
			"linearAttenuation",
			"quadraticAttenuation",
			"spotExponent",
			"isSpot",
		];

		var materialStructMembers = [
			"ambient",
			"diffuse",
			"specular",
			"emission",
			"shiness"
		];
		var glLightEnable=false;
		var light_sources_data=[];
		var material_data={
			ambient:[0.1, 0.1, 0.1, 1.0],
			diffuse:[1.0, 1.0, 1.0, 1.0],
			specular:[0.2, 0.2, 0.2, 1.0],
			emission:[0.0, 0.0, 0.0, 1.0],
			shiness:256
		};
		for(var i=0; i<max_light; ++i){
			light_sources_data[i] = {
				direction: [0.0, -1.0, 0.0, 0.0],
				position: [0.0, 0.0, 0.0, 1.0],

				ambient: [0.1, 0.1, 0.1, 1.0],
				diffuse: [0.0, 0.0, 0.0, 1.0],
				specular: [0.0, 0.0, 0.0, 1.0],

				spotCutOff: 180.0,
				spotExponent: 0.0,
				constantAttenuation: 1.0,
				linearAttenuation: 0.0,
				quadraticAttenuation: 0.0,
				isSpot: false
			};
		}
		var default_attribs={
			preserveDrawingBuffer:true,
		};
		Object.keys(_checkNULL(opt_attribs)?{}:opt_attribs).map(function(objectKey, index) {
			 default_attribs[objectKey]=opt_attribs[objectKey];
		});
		var att_preserveDrawingBuffer=default_attribs.preserveDrawingBuffer;
		gl = setupWebGL(canvas, default_attribs, opt_onError);
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
		gl.getExtension('OES_standard_derivatives');
		gl.getExtension('EXT_shader_texture_lod');
		if (!gl) {
			return null;
		}
	   //若不提供uniform boolean傳遞，則用uniform1i代替
		if(typeof gl.uniform1b !== 'function')
		gl.uniform1b = function(binding_data, bool_val){
		  gl.uniform1i(binding_data, !bool_val ? 0 : 1);
		};
		
		//gl.POINTS
		//Treats each vertex as a single point. Vertex n defines point n. N points are drawn. 
		
		//gl.LINES
		//Treats each pair of vertices as an independent line segment. Vertices 2 ⁢ n - 1 and 2 ⁢ n define line n. N 2 lines are drawn. 
		
		//gl.LINE_STRIP
		//Draws a connected group of line segments from the first vertex to the last. Vertices n and n + 1 define line n. N - 1 lines are drawn. 
		
		//gl.LINE_LOOP
		//Draws a connected group of line segments from the first vertex to the last, then back to the first. Vertices n and n + 1 define line n. The last line, however, is defined by vertices N and 1 . N lines are drawn.
		
		//gl.TRIANGLES
		//Treats each triplet of vertices as an independent triangle. Vertices 3 ⁢ n - 2 , 3 ⁢ n - 1 , and 3 ⁢ n define triangle n. N 3 triangles are drawn. 
		
		//gl.TRIANGLE_STRIP
		//Draws a connected group of triangles. One triangle is defined for each vertex presented after the first two vertices. For odd n, vertices n, n + 1 , and n + 2 define triangle n. For even n, vertices n + 1 , n, and n + 2 define triangle n. N - 2 triangles are drawn. 
		
		//gl.TRIANGLE_FAN
		//Draws a connected group of triangles. One triangle is defined for each vertex presented after the first two vertices. Vertices 1 , n + 1 , and n + 2 define triangle n. N - 2 triangles are drawn. 
		
		//gl.QUADS
		//Treats each group of four vertices as an independent quadrilateral. Vertices 4 ⁢ n - 3 , 4 ⁢ n - 2 , 4 ⁢ n - 1 , and 4 ⁢ n define quadrilateral n. N 4 quadrilaterals are drawn. 
		
		//gl.QUAD_STRIP
		//Draws a connected group of quadrilaterals. One quadrilateral is defined for each pair of vertices presented after the first pair. Vertices 2 ⁢ n - 1 , 2 ⁢ n , 2 ⁢ n + 2 , and 2 ⁢ n + 1 define quadrilateral n. N/2 - 1 quadrilaterals are drawn. Note that the order in which vertices are used to construct a quadrilateral from strip data is different from that used with independent data. 

		//gl.POLYGON
		//Draws a single, convex polygon. Vertices 1 through N define this polygon. 

		//gl.CONCAVE_POLYGON
		//Draws a single, concave polygon. Vertices 1 through N define this polygon. Complex polygon can not be currect.

		//gl.POLYGON_STRIP
		//Draws a connected group of polygons. One polygonal is defined for each set of vertices presented after the first set. Vertices k n + 1, k n + 2, ..., k n + k, k n, k n - 1 define polygonal n. N/k - 1 polygons are drawn. where k = side - 2. Note that the order in which vertices are used to construct a polygonal from strip data is different from that used with independent data. 

		//gl.POLYHEDRON
		//Draws a single, convex polyhedron. Convex hull of vertices 1 through N define this polyhedron. 
		
		//gl.HTML
		//Draws HTML elements in current modelview space.
		gl.QUADS||(gl.QUADS='quads');
		gl.QUAD_STRIP||(gl.QUAD_STRIP='quad_strip');
		gl.POLYGON||(gl.POLYGON='POLYGON');
		gl.POLYGONS=function(side){return 'POLYGONS'+side;};
		var check_gl_polygon = function(str){return parseInt(str.toString().replace('POLYGONS',''));};
		gl.CONCAVE_POLYGON='concave_polygon';
		gl.POLYGON_STRIP=function(side){return 'POLYGON_STRIP'+side;};
		var check_gl_polygon_strip = function(str){return parseInt(str.toString().replace('POLYGON_STRIP',''));};
		gl.FILL||(gl.FILL='fill');
		gl.LINE||(gl.LINE='line');
		gl.TRIANGLE||(gl.TRIANGLE='triangle');
		gl.POINT||(gl.POINT='point');
		gl.HTML||(gl.HTML='html');
		gl.DOM_DEPTH_TEST||(gl.DOM_DEPTH_TEST='dom_depth');
		gl.POLYHEDRON||(gl.POLYHEDRON='polyhedron');
		gl.TETRAHEDRONS||(gl.TETRAHEDRONS='tetrahedrons');
		gl.STRAIGHT_LINES||(gl.STRAIGHT_LINES='straight_lines');
		gl.RAYS||(gl.RAYS='rays');
		
		for(var i=0; i<max_light; ++i)eval("gl.LIGHT"+i+"='light'+"+i);
		gl.LIGHTING||(gl.LIGHTING='lighting');
		gl.AMBIENT||(gl.AMBIENT='ambient');
		gl.DIFFUSE||(gl.DIFFUSE='diffuse');
		gl.SPECULAR||(gl.SPECULAR='specular');
		gl.EMISSION||(gl.EMISSION='emission');
		gl.SHININESS||(gl.SHININESS='shiness');
		gl.POSITION||(gl.POSITION='position');
		gl.DIRECTION||(gl.DIRECTION='direction');
		gl.SPOT_CUTOFF||(gl.SPOT_CUTOFF='spotCutOff');
		gl.SPOT_DIRECTION||(gl.SPOT_DIRECTION='direction');
		gl.SPOT_EXPONENT||(gl.SPOT_EXPONENT='spotExponent');
		gl.CONSTANT_ATTENUATION||(gl.CONSTANT_ATTENUATION='constantAttenuation');
		gl.LINEAR_ATTENUATION||(gl.LINEAR_ATTENUATION='linearAttenuation');
		gl.QUADRATIC_ATTENUATION||(gl.QUADRATIC_ATTENUATION='quadraticAttenuation');
		gl.FOG||(gl.FOG='fog');
		gl.FOG_MODE||(gl.FOG_MODE='fog_mode');
		gl.FOG_DENSITY||(gl.FOG_DENSITY='fog_density');
		gl.FOG_START||(gl.FOG_START='fog_start');
		gl.FOG_END||(gl.FOG_END='fog_end');
		gl.FOG_DEPTH_MODE||(gl.FOG_DEPTH_MODE='fog_depth_mode');
		gl.PLANE_BASED||(gl.PLANE_BASED='plane_based');
		gl.RANGE_BASED||(gl.RANGE_BASED='range_based');
		gl.FOG_INDEX||(gl.FOG_INDEX='fog_index');
		gl.FOG_COLOR||(gl.FOG_COLOR='fog_color');
		gl.FOG_COORD_SRC||(gl.FOG_COORD_SRC='fog_coord_src');
		gl.FOG_COORD||(gl.FOG_COORD='fog_coord');
		gl.FRAGMENT_DEPTH||(gl.FRAGMENT_DEPTH='fragment_depth');
		gl.LINEAR||(gl.LINEAR='linear');
		gl.EXP||(gl.EXP='exp'); 
		gl.EXP2||(gl.EXP2='exp2');
		gl.RGB||(gl.RGB='rgb');
		gl.RGBA||(gl.RGBA='rgba'); 
		gl.CMYK||(gl.CMYK='cmyk'); 
		gl.HSV||(gl.HSV='hsv');
		var light_datatype = {
			ambient:[4,'uniform4fv'],
			diffuse:[4,'uniform4fv'],
			specular:[4,'uniform4fv'],
			emission:[4,'uniform4fv'],
			shiness:[1,'uniform1i'],
			position:[4,'uniform4fv'],
			direction:[4,'uniform4fv'],
			spotCutOff:[1,'uniform1i'],
			spotExponent:[4,'uniform4fv'],
			constantAttenuation:[1,'uniform1i'],
			linearAttenuation:[1,'uniform1i'],
			quadraticAttenuation:[1,'uniform1i'],
			isSpot:[1,'uniform1b'],
		}
		gl.FLAT||(gl.FLAT='flat');
		gl.SMOOTH||(gl.SMOOTH='smooth');
		gl.BLINN||(gl.BLINN='blinn');
		
		gl.CURRENT_NORMAL||(gl.CURRENT_NORMAL='current_normal');
		gl.CURRENT_FOG_COORD||(gl.CURRENT_FOG_COORD='current_fog_coord');
		gl.CURRENT_COLOR||(gl.CURRENT_COLOR='current_color');
		gl.CURRENT_PROGRAM||(gl.CURRENT_PROGRAM='current_program');
		gl.CURRENT_TEXTURE_COORDS||(gl.CURRENT_TEXTURE_COORDS='current_tex_coord');
		//gl.||(=);

		//GLUT
		gl.UT_NULLFUNC=function(){};
		gl.UT_UP='up';
		gl.UT_DOWN='down';

		gl.UT_NOT_VISIBLE='NOT_VISIBLE';
		gl.UT_VISIBLE='VISIBLE';

		var warning_count=0;
		var max_warning=32;
		gl.debug_print=0;
		gl.console_log=function(...msg){if(gl.debug_print>0)(console.log(...msg),--gl.debug_print);}
		var console_warn=function(...msg){
			if(warning_count>max_warning)return;
			console.warn(...msg)||(++warning_count==max_warning&&console.warn("WebGLUT: too many warnings, no more warnings will be reported to the console for this context."));
		}
		
		var get_tetraIdx=function(type,i){return ([[0+i, 1+i, 2+i, 1+i, 0+i, 3+i, 2+i, 3+i, 0+i, 3+i, 2+i, 1+i],[ 0+i, 1+i, 1+i, 2+i, 2+i, 0+i, 1+i, 0+i, 0+i, 3+i, 3+i, 1+i, 2+i, 3+i, 3+i, 0+i, 0+i, 2+i, 3+i, 2+i, 2+i, 1+i, 1+i, 3+i ]])[type]};
		var drawing_index_array=[];
		
		var _width = canvas.clientWidth;
		var _height = canvas.clientHeight;
		var _widthHalf = _width / 2;
		var _heightHalf = _height / 2;
		
		var DOMList=[];
		var DOMScene=[];
		var DOMCameraCache = { fov: 0, style: '' };
		var DOMDrawareaCache = { width: 0, height: 0 };

		var shouldReDraw=false;
		var firstCall=true;
		var aniProcess=-1;
		var lastTime = 0;
		var last_draw_time=0;
		var last_frame_time=0;
		var mouseDown = false;
		var mouseInside = false;
		var lastMouseX = null;
		var lastMouseY = null;
		var MouseAtX = null;
		var MouseAtY = null;
		var oldPMX=-1, oldPMY=-1;
		var oldDMX=-1, oldDMY=-1;
		var isDragging = false;
		var visibility_state=true;
		var old_visibility_state=true;
		var timer_list=[];
		var randerPause=false;
		var draw_completed=false;
		var draw_DOMElement=false;
		
		var displayFunc=gl.UT_NULLFUNC;
		var idleFunc=gl.UT_NULLFUNC;
		var reshapeFunc=function(width,height){};
		var mouseFunc=function(eventData, state, x, y){};
		var draggingFunc=function(x, y, dx, dy){};
		var pMotionFunc=function(x, y){};
		var visibilityFunc=function(state){};

		gl.glEnable=gl.enable;
		gl.glDisable=gl.disable;
		gl.glIsEnabled=gl.isEnabled;
		gl.glGet=gl.getParameter;
		
		gl.glEnable=gl.glEnable.bind(gl);
		gl.glDisable=gl.glDisable.bind(gl);
		gl.glIsEnabled=gl.glIsEnabled.bind(gl);
		gl.glGet=gl.glGet.bind(gl);
		//vertex buffer state
		var holeId = -1;
		var vertId = 0;
		var holeList = [];
		
		//GLSL preprocessing
		var pros_code='';
		var include_it=0;
		var pre_include_it=0;
		
		//Matrix Stacks
		var TopMatrix;
		var Matries = [];
		var register_matrix=mat4.create();
		var user_define_mateix=[];
		
		function UpdateLighting(sProgram){
			for(var i=0; i<max_light; ++i){
				gl.uniform4fv(sProgram.gl_lightsUniform[i].direction,
				  light_sources_data[i].direction);
				gl.uniform4fv(sProgram.gl_lightsUniform[i].position,
				  light_sources_data[i].position);

				gl.uniform4fv(sProgram.gl_lightsUniform[i].ambient,
				  light_sources_data[i].ambient);
				gl.uniform4fv(sProgram.gl_lightsUniform[i].diffuse,
				  light_sources_data[i].diffuse);
				gl.uniform4fv(sProgram.gl_lightsUniform[i].specular,
				  light_sources_data[i].specular);

				gl.uniform1f(sProgram.gl_lightsUniform[i].spotCutOff,
				  light_sources_data[i].spotCutOff);
				gl.uniform1f(sProgram.gl_lightsUniform[i].spotExponent,
				  light_sources_data[i].spotExponent);
				gl.uniform1f(sProgram.gl_lightsUniform[i].constantAttenuation,
				  light_sources_data[i].constantAttenuation);
				gl.uniform1f(sProgram.gl_lightsUniform[i].linearAttenuation,
				  light_sources_data[i].linearAttenuation);
				gl.uniform1f(sProgram.gl_lightsUniform[i].quadraticAttenuation,
				  light_sources_data[i].quadraticAttenuation);
				gl.uniform1b(sProgram.gl_lightsUniform[i].isSpot,
				  light_sources_data[i].isSpot);
			}
		}
		function UpdateMaterial(sProgram){
			gl.uniform4fv(sProgram.gl_materialUniform.ambient,
			material_data.ambient);
			gl.uniform4fv(sProgram.gl_materialUniform.diffuse,
			material_data.diffuse);
			gl.uniform4fv(sProgram.gl_materialUniform.specular,
			material_data.specular);
			gl.uniform4fv(sProgram.gl_materialUniform.emission,
			material_data.emission);
			gl.uniform1f(sProgram.gl_materialUniform.shiness,
			material_data.shiness);
		}
		function preinitGLUT(){
			//setup HTML events
			initHTMLEventHandlers();
		
			//setup built-in shaders
			gl.compileShaderWithSource=compileShaderWithSource;
			gl.compileAndLinkProgram=compileAndLinkProgram;
			gl.INIT_GLSL_PROGRAM=INIT_GLSL_PROGRAM();
			
			//setup matrix stack buffers
			initMatrix();
			gl.setMatrixUniforms=setMatrixUniforms;
			gl.PushMatrix=PushMatrix;
			gl.PopMatrix=PopMatrix;
			gl.defineMatrix4f=defineMatrix4f;
			
			//define transformation
			gl.Translate=Translate;
			gl.Scale=Scale;

			initGLUT(gl);
			var webglut_enable_table = {
				LIGHTING:'Light',
				FOG:'Fog',
				TEXTURE_2D:'Texture2D',
				DOM_DEPTH_TEST:'DOMDepth',
			};
			for(var i=0; i<max_light; ++i)webglut_enable_table['LIGHT'+i]='Light';
			var enable_data={};
			Object.keys(webglut_enable_table).map(function(objectKey, index) {
				if(!_checkNULL(gl[objectKey])){
					webglut_enable_table[gl[objectKey]]=webglut_enable_table[objectKey];
					enable_data[gl[objectKey]]=false;
				}
			});

			
			gl.enable = function(param){
				enable_data[param]=true;
				if(webglut_enable_table[param])
					gl['enable'+(webglut_enable_table[param]?webglut_enable_table[param]:'')](param);
				else gl.glEnable(param);
			}
			gl.disable = function(param){
				enable_data[param]=true;
				if(webglut_enable_table[param])
					gl['disable'+(webglut_enable_table[param]?webglut_enable_table[param]:'')](param);
				else gl.glDisable(param);
			}
			gl.isEnabled = function(param){
				if(webglut_enable_table[param])
					return !!(webglut_enable_table[param]?enable_data[param]:gl.isEnabled(param));
				else return !!gl.glIsEnabled(param);
			}
			gl.isDisable = function(param){
				if(webglut_enable_table[param])
					return !(webglut_enable_table[param]?enable_data[param]:gl.isEnabled(param));
				else return !gl.glIsEnabled(param);
			}
			gl.isDisabled=gl.isDisable;
			//DEBUG
			gl.topAttributes=topAttributes;
			gl.putTopAttribute=putTopAttribute;
			//gl.FbindBuffer=FbindBuffer;
			canvas.gl=gl;
			gl.getParameter=gl.Get;
			gl.getGlu=function(){
				var glu={};
				for(var key in gl){
					var func_name=key.toString();
					if(func_name.charAt(0)=='u'){
						var check_word = func_name.charAt(1);
						if(check_word==check_word.toUpperCase()){
							var final_func_name=check_word.toLowerCase()+func_name.substring(2,func_name.length);
							glu[final_func_name]=gl[key];
							glu[final_func_name].bind(gl);
						}
					}else if(func_name.substring(0,2)=='U_'){
						glut[func_name.substring(2,func_name.length)]=gl[key];
					}
				}
				return glu;
			}
			gl.getGlut=function(){
				var glut={};
				for(var key in gl){
					var func_name=key.toString();
					if(func_name.substring(0,2)=='ut'){
						var check_word = func_name.charAt(2);
						if(check_word==check_word.toUpperCase()){
							var final_func_name=check_word.toLowerCase()+func_name.substring(3,func_name.length);
							glut[final_func_name]=gl[key];
							glut[final_func_name].bind(gl);
						}
					}else if(func_name.substring(0,3)=='UT_'){
						glut[func_name.substring(3,func_name.length)]=gl[key];
					}
				}
				return glut;
			}
			return gl;
		}
		
		/*
		*
		* Utilities
		*
		*/
		function epsilon( value ) { return Math.abs( value ) < 1e-10 ? 0 : value;}
		gl.getGLEnumName=function(param){
			for (var property in gl) {
				var check_string=property.toString();
				if(check_string.toUpperCase()==check_string){
					if (gl[property]==param) {
						var check_lib=check_string.split('_')[0];
						if(check_lib=='U')return 'GLU_'+check_string.substring(2,check_string.length);
						if(check_lib=='UT')return 'GLUT_'+check_string.substring(3,check_string.length);
						return 'GL_'+check_string;
					}
				}
			}
			return 'GL_UNDEFINED';
		}
		
		/*
		*
		* GLSL preprocessing
		*
		*/
		function do_include(final_callback){
			var include_checker=include_regexp[include_it].exec(pros_code)
			var callback=function(){
				++include_it;
				if(include_it>=include_regexp.length){
					if(typeof(final_callback)==typeof(function(){}))final_callback();
				}else do_include(final_callback);
			};
			var setCode=function(replacement,data_code,include_name){
				pros_code=pros_code.replace(replacement,code_lineid(data_code,include_name.toString().replace('[,;\s]+',' ')).replace(trim_regexp,'')+'\n');
			};
			var getHTTP=function(do_include_it,do_pre_include_it,do_include_src, do_header_data){
				return function(){
					pros_code=pros_code.replace(include_regexp[do_include_it],"#include"+do_pre_include_it+'\n');
					if(code_cache[do_include_src]){
						setCode("#include"+src_include_it+'\n', code_cache[do_include_src].data, do_header_data+do_include_src);
						do_include(final_callback);
					}else{
						var request = new XMLHttpRequest();
						request.open("GET", do_include_src);
						request.onreadystatechange = (function (src_include_it, src_do_include_src, do_src_include_src) { 
							return function () {
								if (request.readyState == 4) {
									setCode("#include"+src_include_it+'\n', request.responseText, src_do_include_src+do_src_include_src);
									code_cache[do_src_include_src]={data:request.responseText};
									do_include(final_callback);
								}
							};
						})(do_pre_include_it, do_header_data, do_include_src);
						request.send();
					}
				}
			};
			var pasteCode=function(do_include_it,do_include_src,do_include_name,do_include_file){
				return function(){
					code_cache[do_include_file]={data:do_include_src};
					setCode(include_regexp[do_include_it], do_include_src, do_include_name);
					do_include(final_callback);
				};
			};
			var check_flag=false;
			if(include_checker){

				var start_index = pros_code.substring(0, include_checker.index).lastIndexOf('linedata');
				var header_data = ''
				var header_include = pros_code.substring(start_index, include_checker.index).split(',');
				if(header_include.length>2)header_include=header_include[1];
				else header_include='';
				if(header_include!='')header_data=header_include+';';
				var deeper = header_include.split(';').length;
				var loop_check = header_include.split(';');
				loop_check = loop_check[loop_check.length-1];

				if(include_checker[2]){
					if(deeper>10){
						callback=pasteCode(include_it,"ERROR_TOO_HEADER_DEEP",header_data+get_code+';ERROR');
					}else{
						if(include_checker[2].charAt(0)=='"'||include_checker[2].charAt(0)=='\''){
							var is_query
							var get_code=include_checker[2];
							try{get_code=eval(get_code);}catch(ex){};
							var get_jquery=document.getElementById(get_code);
							if(!get_jquery)try{get_jquery=$(get_code);}catch(ex){}
							else get_jquery=$(get_jquery);
							if(get_code==loop_check){
								callback=pasteCode(include_it,"ERROR_HEADER_LOOP",header_data+get_code+';ERROR','ERROR');
							}else if(get_jquery.length>0){
								callback=pasteCode(include_it,get_jquery.text(),header_data+get_code,get_code);
							}else{
								if(get_code.charAt(0)!='#'){
									callback=getHTTP(include_it,pre_include_it,get_code, header_data);
									check_flag=true;
								}else{
									callback=pasteCode(include_it,"",header_data+get_code,get_code);
								}
							}
						}else{
							if(include_checker[2]==loop_check){
								callback=pasteCode(include_it,"ERROR_HEADER_LOOP",header_data+include_checker[2]+';ERROR',"ERROR");
							}else{
								callback=getHTTP(include_it,pre_include_it,include_checker[2],header_data);
								check_flag=true;
							}
						}
					}
				}
			}
			if(check_flag)++pre_include_it;
			callback();
		}
		function code_lineid(code,file_name){
			var norm_code = code.replace(/[\n\r]+/,'\n');
			var put_file_name = '';
			if(file_name){
				put_file_name=file_name;
				norm_code = norm_code.replace(/(\w+\s+)(main)(\s*\([\s\S]*\)\s*\{)/g,"$1 _$2 $3");
			}
			var lines = norm_code.split('\n');
			var final_code=''
			for(var i = 0;i < lines.length;i++)final_code +="//#linedata,"+put_file_name+","+(i+1)+"\n"+lines[i]+"\n";
			return final_code;
		}
		function genCodeByToken(token_top){
			var define_body = ''+token_top.define.replaceStr;
			for(var i=0; i<token_top.define.args.length; ++i){
				var token_args = ''
				if(Array.isArray(token_top.argdata[i])){
					for(var j=0; j<token_top.argdata[i].length; ++j){
						if(token_args != '')token_args+=' ';
						token_args+=token_top.argdata[i][j].replace(/^[\s\uFEFF\xA0\r]+|[\s\uFEFF\xA0\r]+$/g,'');
					}
				}else if(typeof(token_top.argdata[i])==typeof('')){
					token_args=token_top.argdata[i];
				}
				var esc_str=new RegExp(' \\$'+(i+1)+' ', 'g');
				define_body=define_body.replace(esc_str,token_args);
			}
			return token_top.tokenBuffer.join(' ')+define_body;
		}
		function code_find_perline(code){
			var norm_code = code.replace(/[\n\r]+/g,'\n');
			norm_code = norm_code.replace(/\/\//g,' // ');
			norm_code = norm_code.replace(/\/\*/g,' /* ');
			norm_code = norm_code.replace(/\*\//g,' */ ');
			var define_table = {
				'(':{
					fullprefix:'()',
					name:'(',
					args:[''],
					body:'()',
					replaceStr:'( $1 )'
				}
			};
			var final_code='';
			var lines = norm_code.split('\n');
			lines.push('');
			var token_buffer = [];
			var macro_stack=[];
			var multiline_cmt = false;
			var singleline_cmt = false;
			for(var i = -1;i < lines.length;i++){
				var org_line = '';
				if(i>=0)org_line=lines[i];
				var line_trim = org_line.replace(trim_regexp,'');

				if(macro_stack.length>0){
					if(macro_stack[macro_stack.length-1].ready){
						macro_stack[macro_stack.length-1].argdata[macro_stack[macro_stack.length-1].argdata.length-1].push('\n');
					}else{
						macro_stack[macro_stack.length-1].tokenBuffer.push('\n');
					}
				}else{
					token_buffer.push('\n');
				}

				if(line_trim.substring(0,2)=='//'){
					if(macro_stack.length>0){
						if(macro_stack[macro_stack.length-1].ready){
							macro_stack[macro_stack.length-1].argdata[macro_stack[macro_stack.length-1].argdata.length-1].push(line_trim);
						}else{
							macro_stack[macro_stack.length-1].tokenBuffer.push(line_trim);
						}
					}else{
						token_buffer.push(line_trim);
					}
					continue;
				}
				singleline_cmt=false;
				if(line_trim.charAt(0)=='#'){
					var check_prefix = /#\s*(\w+)\b/.exec(line_trim);
					if(typeof(check_prefix[1])==typeof("")){
						check_prefix=check_prefix[1];
						check_prefix=check_prefix.replace(trim_regexp,'');
						check_prefix=check_prefix.toLowerCase();
					}
					if(check_prefix=='extension'||check_prefix=='define')token_buffer.push(line_trim);
					else if(check_prefix=='predefine'){
						var definer=line_trim.replace(/#\s*[Pp][Rr][Ee][Dd][Ee][Ff][Ii][Nn][Ee]/,'');
						var define_prefix=/\w+\s*(\([^\)]*\))?/.exec(definer);
						var define_name='';
						var define_fullprefix='';
						var define_body = '';
						var define_args = '';
						var define_args_regexp_replace_str = '';
						if(define_prefix){
							define_name=/\w+/.exec(definer)[0];
							if(define_prefix[1]){
								define_fullprefix=define_prefix[0];
								define_args=define_fullprefix.replace(define_name,'');
							}else{
								define_fullprefix=define_name;
							}
							define_body=definer.replace(define_fullprefix,'');
							define_args=define_args.replace(/^[\(\s\uFEFF\xA0\n\r]+|[\)\s\uFEFF\xA0\n\r]+$/g,'').split(',');
							for(var i_a=0; i_a<define_args.length; ++i_a){
								define_args[i_a]=define_args[i_a].replace(trim_regexp,'');
							}
							define_args_regexp_replace_str = define_body;
							define_args_regexp_replace_str = define_args_regexp_replace_str.replace(/\$/g,'$$$$');
							for(var i_a=0; i_a<define_args.length; ++i_a){
								if(define_args[i_a]!=''){
									var esc_str=new RegExp('\\b'+define_args[i_a]+'\\b', 'g');
									define_args_regexp_replace_str = define_args_regexp_replace_str.replace(esc_str,' $$'+(i_a+1)+' ');
								}
							}
							define_table[define_name]={
								fullprefix:define_fullprefix,
								name:define_name,
								args:define_args,
								body:define_body,
								replaceStr:define_args_regexp_replace_str
							};					
						}else{
							token_buffer.push(line_trim);
						}
					}else{
						token_buffer.push(line_trim);
					}
				}else{
					var tokens = line_trim.replace(/\b/g,' ').replace(/([\(\)\[\]\+\-\.\,\;])/g,' $1 ').replace(/\s+/g,' ').split(' ');
					for(var i_t=0; i_t < tokens.length; ++i_t){
						var this_token = tokens[i_t].replace(trim_regexp,'');
						if(this_token=='')continue;

						if(this_token!='(' && define_table[this_token]){
							macro_stack.push({
								name:this_token,
								define:define_table[this_token],
								tokenBuffer:[],
								argdata:[],
								ready:false
							});

						}else if(this_token=='/*' && !multiline_cmt){
							if(macro_stack.length>0){
								if(macro_stack[macro_stack.length-1].ready){
									macro_stack[macro_stack.length-1].argdata[macro_stack[macro_stack.length-1].argdata.length-1].push(this_token);
								}else{
									macro_stack[macro_stack.length-1].tokenBuffer.push(this_token);
								}
							}else{
								token_buffer.push(this_token);
							}
							multiline_cmt=true;
						}else if(multiline_cmt){
							if(macro_stack.length>0){
								if(macro_stack[macro_stack.length-1].ready){
									macro_stack[macro_stack.length-1].argdata[macro_stack[macro_stack.length-1].argdata.length-1].push(this_token);
								}else{
									macro_stack[macro_stack.length-1].tokenBuffer.push(this_token);
								}
							}else{
								token_buffer.push(this_token);
							}
							if(this_token=='*/')multiline_cmt=false;
						}else if(this_token=='//' && !singleline_cmt){

							if(macro_stack.length>0){
								if(macro_stack[macro_stack.length-1].ready){
									macro_stack[macro_stack.length-1].argdata[macro_stack[macro_stack.length-1].argdata.length-1].push(this_token);
								}else{
									macro_stack[macro_stack.length-1].tokenBuffer.push(this_token);
								}
							}else{
								token_buffer.push(this_token);
							}
							singleline_cmt=true;
						}else if(singleline_cmt){

							if(macro_stack.length>0){
								if(macro_stack[macro_stack.length-1].ready){
									macro_stack[macro_stack.length-1].argdata[macro_stack[macro_stack.length-1].argdata.length-1][macro_stack[macro_stack.length-1].argdata[macro_stack[macro_stack.length-1].argdata.length-1].length-1]+=' '+this_token;
								}else{
									macro_stack[macro_stack.length-1].tokenBuffer[macro_stack[macro_stack.length-1].tokenBuffer.length-1]+=' '+this_token;
								}
							}else{
								token_buffer[token_buffer.length-1]+=' '+this_token;
							}
							if(this_token=='\n')singleline_cmt=false;
						}else if(macro_stack.length<=0){
							token_buffer.push(this_token);
						}else{
							if( (!macro_stack[macro_stack.length-1].ready) && this_token != '('){

								var defined_code = genCodeByToken(macro_stack[macro_stack.length-1]);
								macro_stack.pop();
								if(macro_stack.length<=0){
									token_buffer.push(defined_code);
								}else{
									macro_stack[macro_stack.length-1].argdata[macro_stack[macro_stack.length-1].argdata.length-1].push(defined_code);
								}

							}else if(this_token=='('){
								if(macro_stack[macro_stack.length-1].ready){
									macro_stack.push({
										name:'(',
										define:define_table['('],
										tokenBuffer:[],
										argdata:[[]],
										ready:true
									});

								}else{
									macro_stack[macro_stack.length-1].ready=true;
									macro_stack[macro_stack.length-1].argdata.push([]);

								}
							}else if(this_token==')'){

								var defined_code = genCodeByToken(macro_stack[macro_stack.length-1]);
								macro_stack.pop();
								if(macro_stack.length<=0){
									token_buffer.push(defined_code);
								}else{
									macro_stack[macro_stack.length-1].argdata[macro_stack[macro_stack.length-1].argdata.length-1].push(defined_code);
								}

							}else if(this_token==','){
								if(macro_stack[macro_stack.length-1].name=='('){
									macro_stack[macro_stack.length-1].argdata[macro_stack[macro_stack.length-1].argdata.length-1].push(this_token);
								}else{
									macro_stack[macro_stack.length-1].argdata.push([]);
								}
							}else{
							
								macro_stack[macro_stack.length-1].argdata[macro_stack[macro_stack.length-1].argdata.length-1].push(this_token);
							}
							
						}

					}
					//token_buffer.push();
				}
			}
			var gened_code=token_buffer.join(' ');
			gened_code=gened_code.replace(/\b[ \f\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+(\W)/g,'$1');
			gened_code=gened_code.replace(/(\W)[ \f\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+\b/g,'$1');
			gened_code=gened_code.replace(/\+\s+\+/g,'++');
			gened_code=gened_code.replace(/\-\s+\-/g,'--');
			gened_code=gened_code.replace(/([\+\-\*\/\=])\s+\=/g,'$1=');
			//console.log(gened_code);
			return gened_code;
		}

		/*
		*
		* Shader preprocessing
		*
		*/
		function compileShaderWithSource(shader,code){
			if(gl.glGet(gl.MAX_VARYING_VECTORS)<25)max_light=2;


			pros_code=code.replace(/[\n\r]+/g,'\n');

			var code_line=pros_code.split('\n');

			include_it=0;
			pre_include_it=0;
			pros_code=pros_code.replace(/@/g,'$@');
			pros_code=pros_code.replace(/(\w+\s+main\s*\([^\)]*\)\s*\{)/,"@@start_point@@$1@@end_point@@");
			pros_code=code_lineid(pros_code);
			pros_code=pros_code.replace(/(\/\/#linedata,,\d+[\n\r]+)\s*(@@start_point@@)/m,"$2\n$1");

			do_include(function(){

				var new_code = code_find_perline(pros_code);
/*
float mix(float x, float y, bool a) {
  return a ? y : x;
}
float atan2(in float y, in float x)
{
	bool s = (abs(x) > abs(y));
	return mix(0.5*3.141592653589793238 - atan(x,y), atan(y,x), s);
}

bool isZero(float number){
	return abs(number) <= 1e-3;
}
mat3 transpose(in mat3 inMatrix)
{
	vec3 i0 = inMatrix[0];
	vec3 i1 = inMatrix[1];
	vec3 i2 = inMatrix[2];

	mat3 outMatrix = mat3(
		vec3(i0.x, i1.x, i2.x),
		vec3(i0.y, i1.y, i2.y),
		vec3(i0.z, i1.z, i2.z)
	);

	return outMatrix;
}
vec3 _gl_LightBlinnPhong(vec3 pView, vec3 pNormal, vec3 pPixel, vec3 pDiffuse, vec3 pSpecular, vec3 pEmission, float pShiness){
	vec3 result_light=vec3(0.0,0.0,0.0);
	if(_gl_EnableLighting[0]){
		vec3 Normal = normalize(pNormal);
		vec3 View = normalize(pView);
		vec3 lDiffuse = vec3(0.0,0.0,0.0);
		vec3 lAmbient = vec3(0.0,0.0,0.0);
		vec3 lSpecular = vec3(0.0,0.0,0.0);
		vec3 lEmission = _gl_BaseMaterial.emission.rgb + pEmission;
		for(int i=0; i<MAX_LIGHT; ++i){
			if(_gl_EnableLighting[i+1]){
				_gl_Light lightData=_gl_BaseLights[i];
				vec3 Light = normalize(_gl_LightingVec[i]);
				vec3 LightDir = Light;
				vec3 Half = normalize(View+Light);
				vec3 vDiffuse = _gl_color.rgb * _gl_BaseMaterial.diffuse.rgb * pDiffuse;
				vec3 vSpecular = _gl_BaseMaterial.specular.rgb + pSpecular;
				float vShiness = _gl_BaseMaterial.shiness;
				float LightDist = length(Light);
				if(_gl_ObjDrawing){
					vSpecular= vSpecular + _gl_objSpecular_;
					vShiness = _gl_objSpecularExponent;
				}
				vShiness *= pShiness;
				if( !isZero(length(lightData.direction.xyz)) ) LightDir = normalize(-(_gl_ViewMatrix * lightData.direction).xyz);
				if( isZero(lightData.position.w) ) Light = LightDir; // is directional light
				float I_D = max(dot(Normal,Light),0.0);
				float I_S = pow(max(dot(Half,Normal),0.0),vShiness);

				vec3 diffuse = I_D * lightData.diffuse.rgb * vDiffuse;
				vec3 specular = I_S * lightData.specular.rgb * vSpecular;
				vec3 ambient = lightData.ambient.rgb * _gl_BaseMaterial.ambient.rgb;

				float attenuation = 1.0;

				if (lightData.spotCutOff <= 3.141592653589793238 - 1e-3 && lightData.spotCutOff >= -1e-3) { // the light is a spotlight
					float spotCosine = dot(LightDir, -Light.xyz);
					if (spotCosine >= cos(lightData.spotCutOff)) {
						attenuation = clamp(pow(spotCosine,lightData.spotExponent), 0.0, 1.0);
					}else{
					  attenuation = 0.0;
					}
				}
				attenuation = attenuation / (lightData.constantAttenuation
					+ lightData.linearAttenuation * LightDist
					+ lightData.quadraticAttenuation * LightDist * LightDist);
				lDiffuse += diffuse * attenuation;
				lAmbient += ambient;
				lSpecular += specular * attenuation;
			}
		}
		lDiffuse = clamp(lDiffuse*pPixel,vec3(0,0,0),vec3(1,1,1));
		lAmbient = clamp(lAmbient,vec3(0,0,0),vec3(1,1,1));
		lSpecular = clamp(lSpecular,vec3(0,0,0),vec3(1,1,1));
		lEmission = clamp(lEmission,vec3(0,0,0),vec3(1,1,1));
		result_light = clamp(lDiffuse+lAmbient+lSpecular+lEmission,vec3(0,0,0),vec3(1,1,1));
	}else{
		result_light=pPixel;
	}
	return result_light;
}
*/
				var header_code='VF mix(VF x,VF y,bool a){return a?y:x;}\nVF atan2(in VF y,in VF x){bool s=(abs(x)>abs(y));return mix(0.5*3.141592653589793238-atan(x,y),atan(y,x),s);}\nbool isZero(VF number){return abs(number)<=1e-3;}\nmat3 transpose(in mat3 im){V3 i0=im[0];V3 i1=im[1];V3 i2=im[2];mat3 om=mat3(V3(i0.x,i1.x,i2.x),V3(i0.y,i1.y,i2.y),V3(i0.z,i1.z,i2.z));return om;}\nV3 _gl_LightBlinnPhong(V3 pv,V3 pn,V3 pp,V3 pd,V3 ps,V3 pe,VF pS){V3 rl=V3(0.0,0.0,0.0),lz=V3(0.0,0.0,0.0),l1=V3(1.0,1.0,1.0);if(_gl_EnableLighting[0]){V3 lN=NZ(pn),lv=NZ(pv),ld=lz,la=lz,ls=lz,le=_gl_BaseMaterial.emission.rgb+pe;for(int i=0;i<MAX_LIGHT;++i){if(_gl_EnableLighting[i+1]){_gl_Light ldb=_gl_BaseLights[i];V3 ll=NZ(_gl_LightingVec[i]),vd=_gl_color.rgb*_gl_BaseMaterial.diffuse.rgb*pd,vs=_gl_BaseMaterial.specular.rgb+ps;V3 LD=ll,lh=NZ(lv+ll);VF vS=_gl_BaseMaterial.shiness,lLD=length(ll);if(_gl_ObjDrawing){vs=vs+_gl_objSpecular_;vS=_gl_objSpecularExponent;}vS*=pS;if(!isZero(length(ldb.direction.xyz)))LD=NZ(-(_gl_ViewMatrix*ldb.direction).xyz);if(isZero(ldb.position.w))ll=LD;VF id=max(dot(lN,ll),0.0),is=pow(max(dot(lh,lN),0.0),vS),at=1.0,sc=dot(LD,-ll.xyz);V3 df=id*ldb.diffuse.rgb*vd,sr=is*ldb.specular.rgb*vs,ab=ldb.ambient.rgb*_gl_BaseMaterial.ambient.rgb;if(ldb.spotCutOff<=3.141592653589793238-1e-3&&ldb.spotCutOff>=-1e-3){if(sc>=cos(ldb.spotCutOff)){at=clamp(pow(sc,ldb.spotExponent),0.0,1.0);}else{at=0.0;}}at=at/(ldb.constantAttenuation+ldb.linearAttenuation*lLD+ldb.quadraticAttenuation*lLD*lLD);ld+=df*at;la+=ab;ls+=sr*at;}}ld=clamp(ld*pp,lz,l1);la=clamp(la,lz,l1);ls=clamp(ls,lz,l1);le=clamp(le,lz,l1);rl=clamp(ld+la+ls+le,lz,l1);}else{rl=pp;}return rl;}\n'.replace(/V(\d)/g,'vec$1').replace(/VF/g,'float').replace(/vy/g,'varying').replace(/NZ/g,'normalize');
				var built_in_type = {vertex:gl.VERTEX_SHADER,fragment:gl.FRAGMENT_SHADER};
				built_in_type[gl.VERTEX_SHADER]='vertex';
				built_in_type[gl.FRAGMENT_SHADER]='fragment';
				var built_in_list=['vertex','normal','color','fog','tex','model','proj','view','light','material','enable','base'];
/*
precision mediump float;
#define MAX_LIGHT ${max_light}
struct _gl_Light {
	vec4 position;
	vec4 direction;
	vec4 ambient;
	vec4 diffuse;
	vec4 specular;
	float spotCutOff;
	float constantAttenuation;
	float linearAttenuation;
	float quadraticAttenuation;
	float spotExponent;
	bool isSpot;
};
struct _gl_Material {
	vec4 ambient;
	vec4 diffuse;
	vec4 specular;
	vec4 emission;
	float shiness;
};
  struct _gl_Fog {
	float density;
	vec4 color;
	//1 linear; 2 exponential; 3 exponential square
	int type;
	//0 plane based; 1 range based
	int depthType;
	float fstart;
	float fend;
  };
  const int _gl_FOG_PLANE_BASED = 0;
  const int _gl_FOG_RANGE_BASED = 1;
  const int _gl_FOG_NONE = 0;
  const int _gl_FOG_LINEAR = 1;
  const int _gl_FOG_EXPONENTIAL = 2;
  const int _gl_FOG_EXPONENTIAL_SQUARE = 3;
  const float _gl_FOG_LOG2 = 1.442695;
*/
				var built_in_typedef='precision mediump float;\n#define MAX_LIGHT '+max_light+'\nstruct _gl_Light{V4 position,direction,ambient,diffuse,specularVF spotCutOff,constantAttenuation,linearAttenuation,quadraticAttenuation,spotExponent;bool isSpot;};\nstruct _gl_Material{V4 ambient,diffuse,specular,emissionVF shiness;};\nstruct _gl_Fog{V4 color;int type,depthTypeVF density,fstart,fend;};\nconst int _gl_FOG_PLANE_BASED=0CI _gl_FOG_RANGE_BASED=1CI _gl_FOG_NONE=0CI _gl_FOG_LINEAR=1CI _gl_FOG_EXPONENTIAL=2CI _gl_FOG_EXPONENTIAL_SQUARE=3;CF _gl_FOG_LOG2=1.442695;\n'.replace(/V(\d)/g,'vec$1').replace(/VF/g,';float').replace(/CF/g,'const float').replace(/CI/g,';const int');
/*
//vertex header

	attribute vec4 _gl_Vertex;
	attribute vec3 _gl_Normal;
	attribute vec4 _gl_Color;
	attribute vec4 _gl_TexCoord;
	attribute float _gl_FogCoord;
	attribute vec3 _gl_ObjSpecular;
	attribute float _gl_ObjSpecularExponent;

	varying vec4 _gl_vertex;
	varying vec3 _gl_normal;
	varying vec4 _gl_color;
	varying vec4 _gl_texCoord;
	varying vec3 _gl_objSpecular_;

	varying vec3 _gl_LightingVec[MAX_LIGHT];
	varying vec3 _gl_ViewingVec;

	varying float _gl_lightingDefault;

	varying float _gl_FogFragCoord;
	varying float _gl_objSpecularExponent;

	uniform mat4 _gl_ModelMatrix;
	uniform mat4 _gl_ViewMatrix;
	uniform mat4 _gl_ProjectMatrix;
	uniform mat4 _gl_ModelViewMatrix;
	uniform mat4 _gl_ModelViewProjectMatrix;
	uniform mat3 _gl_NormalMatrix;
	uniform mat4 _gl_ColorMatrix;
	uniform mat4 _gl_TextureMatrix;

	uniform bool _gl_ObjDrawing;
	uniform _gl_Material _gl_BaseMaterial;
	uniform _gl_Light _gl_BaseLights[MAX_LIGHT];
	uniform bool _gl_EnableLighting[9];
	uniform float _gl_pointSize;

	${header_code}

	vec4 ftransform(){
		float homo = _gl_Vertex.w;
		if(abs(homo)<1e-14)homo=1.0;
		return _gl_ModelViewProjectMatrix*(_gl_Vertex/homo);
	}

//vertex main

	gl_Position = ftransform();
	_gl_vertex=_gl_Vertex;
	_gl_normal=_gl_Normal;
	_gl_color=_gl_Color;
	if(_gl_ObjDrawing){
		_gl_texCoord=_gl_TextureMatrix*_gl_TexCoord;
		if(_gl_TexCoord.t >= 2.0)_gl_texCoord.t=_gl_TexCoord.s;
		_gl_FogFragCoord=1.0;
		_gl_objSpecular_=_gl_ObjSpecular;
		_gl_objSpecularExponent=_gl_ObjSpecularExponent;
	}else{
		_gl_texCoord=_gl_TextureMatrix*_gl_TexCoord;
		_gl_FogFragCoord=_gl_FogCoord;
		_gl_objSpecular_=vec3(0.0,0.0,0.0);
		_gl_objSpecularExponent=255.0;
	}
	gl_PointSize = _gl_pointSize;
	vec4 eyePosition = _gl_ModelViewMatrix * _gl_Vertex;
	_gl_ViewingVec = -eyePosition.xyz;
	if(_gl_EnableLighting[0]){
		for(int i=0; i<MAX_LIGHT; ++i){
			if(_gl_EnableLighting[i+1]){
				vec4 eyeLightPos = _gl_ViewMatrix * _gl_BaseLights[i].position;
				_gl_LightingVec[i] = (eyeLightPos - eyePosition).xyz ;
			}
		}
	}
	_gl_lightingDefault=2.0;

//fragment header

	varying vec4 _gl_vertex;
	varying vec3 _gl_normal;
	varying vec4 _gl_color;
	varying vec4 _gl_texCoord;

	varying vec3 _gl_objSpecular_;
	varying vec3 _gl_LightingVec[MAX_LIGHT];
	varying vec3 _gl_ViewingVec;

	varying float _gl_lightingDefault;

	varying float _gl_FogFragCoord;
	varying float _gl_objSpecularExponent;

	uniform mat4 _gl_ModelViewMatrix;
	uniform mat4 _gl_ViewMatrix;
	uniform mat4 _gl_ProjectMatrix;
	uniform mat4 _gl_ModelViewProjectMatrix;
	uniform mat3 _gl_NormalMatrix;
	uniform mat4 _gl_ColorMatrix;
	uniform mat4 _gl_TextureMatrix;

	uniform bool _gl_ObjDrawing;

	uniform _gl_Material _gl_BaseMaterial;
	uniform _gl_Light _gl_BaseLights[MAX_LIGHT];
	uniform bool _gl_EnableLighting[9];

	uniform bool _gl_texEnable2D;
	uniform sampler2D _gl_texSamplerTexture2D;

	${header_code}

	vec4 textureSphere(sampler2D samp, vec3 texcoord)
	{
		float s_rad=0.5*(atan2(texcoord.s, texcoord.p)+1.5*3.141592653589793238)/3.141592653589793238;
		float t_rad=(atan2(texcoord.t, sqrt(texcoord.s*texcoord.s+texcoord.p*texcoord.p))+0.5*3.141592653589793238)/3.141592653589793238;
		return texture2D(samp,vec2(s_rad,t_rad));
	}

	vec4 ftransform(){
		return _gl_ModelViewProjectMatrix*_gl_vertex;
	}

//fragment main

	vec4 _gl_Vertex=_gl_vertex;
	vec3 _gl_Normal=_gl_normal;
	vec4 _gl_Color=_gl_color;
	vec4 _gl_TexCoord=_gl_texCoord;
	if(_gl_texEnable2D){
		_gl_Color = vec4(_gl_Color.rgb * texture2D(_gl_texSamplerTexture2D,_gl_TexCoord.st).rgb,_gl_Color.a);
	}
	if(_gl_lightingDefault>1.0){
		_gl_Color = vec4(_gl_LightBlinnPhong(_gl_ViewingVec,
			_gl_NormalMatrix*_gl_normal,_gl_Color.rgb,
			vec3(1.0,1.0,1.0),vec3(0.0,0.0,0.0),vec3(0.0,0.0,0.0),1.0
			),_gl_Color.a);
	}
	gl_FragColor = _gl_ColorMatrix*_gl_Color;

*/
				var built_in_code={vertex:['\nattribute vec4 _gl_Vertex;attribute vec3 _gl_Normal;attribute vec4 _gl_Color;attribute vec4 _gl_TexCoord;attribute float _gl_FogCoord;attribute vec3 _gl_ObjSpecular;attribute float _gl_ObjSpecularExponent;varying vec4 _gl_vertex;varying vec3 _gl_normal;varying vec4 _gl_color;varying vec4 _gl_texCoord;varying vec3 _gl_objSpecular_;varying vec3 _gl_LightingVec[MAX_LIGHT];varying vec3 _gl_ViewingVec;varying float _gl_lightingDefault;varying float _gl_FogFragCoord;varying float _gl_objSpecularExponent;uniform mat4 _gl_ModelMatrix;uniform mat4 _gl_ViewMatrix;uniform mat4 _gl_ProjectMatrix;uniform mat4 _gl_ModelViewMatrix;uniform mat4 _gl_ModelViewProjectMatrix;uniform mat3 _gl_NormalMatrix;uniform mat4 _gl_ColorMatrix;uniform mat4 _gl_TextureMatrix;uniform bool _gl_ObjDrawing;uniform _gl_Material _gl_BaseMaterial;uniform _gl_Light _gl_BaseLights[MAX_LIGHT];uniform bool _gl_EnableLighting[9];uniform float _gl_pointSize;\n'+header_code+'\nvec4 ftransform(){float homo=_gl_Vertex.w;if(abs(homo)<1e-14)homo=1.0;return _gl_ModelViewProjectMatrix*(_gl_Vertex/homo);}\n','\ngl_Position=ftransform();_gl_vertex=_gl_Vertex;_gl_normal=_gl_Normal;_gl_color=_gl_Color;if(_gl_ObjDrawing){_gl_texCoord=_gl_TextureMatrix*_gl_TexCoord;if(_gl_TexCoord.t>=2.0)_gl_texCoord.t=_gl_TexCoord.s;_gl_FogFragCoord=1.0;_gl_objSpecular_=_gl_ObjSpecular;_gl_objSpecularExponent=_gl_ObjSpecularExponent;}else{_gl_texCoord=_gl_TextureMatrix*_gl_TexCoord;_gl_FogFragCoord=_gl_FogCoord;_gl_objSpecular_=vec3(0.0,0.0,0.0);_gl_objSpecularExponent=255.0;}gl_PointSize=_gl_pointSize;vec4 eyePosition=_gl_ModelViewMatrix*_gl_Vertex;_gl_ViewingVec=-eyePosition.xyz;if(_gl_EnableLighting[0]){for(int i=0;i<MAX_LIGHT;++i){if(_gl_EnableLighting[i+1]){vec4 eyeLightPos=_gl_ViewMatrix*_gl_BaseLights[i].position;_gl_LightingVec[i]= (eyeLightPos-eyePosition).xyz;}}}_gl_lightingDefault=2.0;\n'],fragment:['\nvarying vec4 _gl_vertex;varying vec3 _gl_normal;varying vec4 _gl_color;varying vec4 _gl_texCoord;varying vec3 _gl_objSpecular_;varying vec3 _gl_LightingVec[MAX_LIGHT];varying vec3 _gl_ViewingVec;varying float _gl_lightingDefault;varying float _gl_FogFragCoord;varying float _gl_objSpecularExponent;uniform mat4 _gl_ModelViewMatrix;uniform mat4 _gl_ViewMatrix;uniform mat4 _gl_ProjectMatrix;uniform mat4 _gl_ModelViewProjectMatrix;uniform mat3 _gl_NormalMatrix;uniform mat4 _gl_ColorMatrix;uniform mat4 _gl_TextureMatrix;uniform bool _gl_ObjDrawing;uniform _gl_Material _gl_BaseMaterial;uniform _gl_Light _gl_BaseLights[MAX_LIGHT];uniform bool _gl_EnableLighting[9];uniform bool _gl_texEnable2D;uniform sampler2D _gl_texSamplerTexture2D;\n'+header_code+'\nvec4 textureSphere(sampler2D samp, vec3 texcoord){float s_rad=0.5*(atan2(texcoord.s,texcoord.p)+1.5*3.141592653589793238)/3.141592653589793238;float t_rad=(atan2(texcoord.t,sqrt(texcoord.s*texcoord.s+texcoord.p*texcoord.p))+0.5*3.141592653589793238)/3.141592653589793238;return texture2D(samp,vec2(s_rad,t_rad));}vec4 ftransform(){return _gl_ModelViewProjectMatrix*_gl_vertex;}\n','\nvec4 _gl_Vertex=_gl_vertex;vec3 _gl_Normal=_gl_normal;vec4 _gl_Color=_gl_color;vec4 _gl_TexCoord=_gl_texCoord;if(_gl_texEnable2D){_gl_Color=vec4(_gl_Color.rgb*texture2D(_gl_texSamplerTexture2D,_gl_TexCoord.st).rgb,_gl_Color.a);}if(_gl_lightingDefault>1.0){_gl_Color=vec4(_gl_LightBlinnPhong(_gl_ViewingVec,_gl_NormalMatrix*_gl_normal,_gl_Color.rgb,vec3(1.0,1.0,1.0),vec3(0.0,0.0,0.0),vec3(0.0,0.0,0.0),1.0),_gl_Color.a);}gl_FragColor=_gl_ColorMatrix*_gl_Color;\n']};
				for(var ig=0;ig<built_in_list.length;++ig){
					new_code=new_code.replace(new RegExp("(gl_"+built_in_list[ig]+")",'ig'),"_$1");
				}
				
				new_code=new_code.replace(/@@\s*start_point\s*@@/m,built_in_code[built_in_type[shader.shader_type]][0]);
				new_code=built_in_typedef+'\n'+new_code.replace(/@@\s*end_point\s*@@/m,built_in_code[built_in_type[shader.shader_type]][1]);

				gl.shaderSource(shader, new_code);
				gl.compileShader(shader);

				//if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
					var lines = new_code.split('\n');
					var errs = gl.getShaderInfoLog(shader).split('\n');
					var error_datas=[];
					for(var i=0; i<errs.length; ++i){
						var err_ele = {};
						var err_mem = errs[i].split(':');
						if(err_mem.length>1){
							err_ele.type=err_mem[0];
							err_ele.index=err_mem[1];
							err_ele.line=err_mem[2];
							err_ele.syntax=err_mem[3];
							err_ele.message='';
							for(var j=4;j<err_mem.length;++j){
								if(err_ele.message != '')err_ele.message+=':';
								err_ele.message+=err_mem[j];
							}
							error_datas[i]=err_ele;
						}
					}
					var error_norm_datas=[];
					for(var i=0; i<error_datas.length; ++i){
						var err_ele = {};
						var line_info = lines[parseInt(error_datas[i].line)-2];
						var line_data = lines[parseInt(error_datas[i].line)-1];
						var check_line=/#linedata/.exec(line_info);
						if(check_line){
							var check_line_split = line_info.substring(check_line.index+10,line_info.length).split(',');
							err_ele.file=check_line_split[0].split(';');
							err_ele.line=parseInt(check_line_split[1]);
							err_ele.post_code=line_data;
							var code_line_check;
							var code_offset=-1;
							if(err_ele.file[err_ele.file.length-1]!=''){
								if(code_cache[err_ele.file[err_ele.file.length-1]]){

									var find_codes=code_cache[err_ele.file[err_ele.file.length-1]].data;
									if(find_codes){
										code_line_check=find_codes.replace(/[\n\r]+/g,'\n').split('\n');
										code_offset=-1;
									}
								}
							}else{
								code_line_check=code_line;
							}
							if(code_line_check)err_ele.code=code_line_check[err_ele.line+code_offset];
						}else{
							//內部錯誤
						}
						err_ele.type=error_datas[i].type;
						err_ele.syntax=error_datas[i].syntax;
						err_ele.message=error_datas[i].message;
						error_norm_datas[i]=err_ele;
						
					}
					shader.infoLog=error_norm_datas;
					if(typeof(shader.onload)==typeof(function(){})){
						shader.onload(shader);
					}

				//}

			});
			
			
		}
		function compileAndLinkProgram(sProgram,vert_code,frag_code){
			function compile_fragment(sProgram,fragment_code){
				var shader_type = gl.FRAGMENT_SHADER;
				var shader = gl.createShader(shader_type);
				shader.shader_type = shader_type;
				shader.onload=function(s){
					gl.attachShader(sProgram, s);
					sProgram.fragment=s;
					gl.linkProgram(sProgram);
					if(gl.getProgramParameter(sProgram, gl.LINK_STATUS)){
						var curr_prog=gl.glGet(gl.CURRENT_PROGRAM);
						gl.useProgram(sProgram);
						for(var i=0; i<built_in_attribute.length; ++i){
							sProgram[built_in_attribute[i]] = gl.getAttribLocation(sProgram, "_"+built_in_attribute[i]);
							if(parseInt(sProgram[built_in_attribute[i]])>=0)gl.enableVertexAttrib(sProgram[built_in_attribute[i]]);
						}
						for(var i=0; i<built_in_uniform.length; ++i){
							sProgram[built_in_uniform[i]] =
								gl.getUniformLocation(sProgram, "_"+built_in_uniform[i]);
						}
						gl.useProgram(curr_prog);
					}
					finishProgramDefine(sProgram);
					if(typeof(sProgram.onload)==typeof(function(){}))sProgram.onload(sProgram);
				}
				gl.compileShaderWithSource(shader,fragment_code);
			}
			function compile_vertex(sProgram,vertex_code,fragment_code){
				var shader_type = gl.VERTEX_SHADER;
				var shader = gl.createShader(shader_type);
				shader.shader_type = shader_type;
				shader.onload=function(s){
					gl.attachShader(sProgram, s);
					sProgram.vertex=s;
					compile_fragment(sProgram,fragment_code);
				}
				gl.compileShaderWithSource(shader,vertex_code);
			}
			compile_vertex(sProgram,vert_code,frag_code);
		}
		function finishProgramDefine(sProgram){
			var attrs = {
			  _gl_Vertex: OBJ.Layout.POSITION4.key,
			  _gl_Normal: OBJ.Layout.NORMAL.key,
			  _gl_Color: OBJ.Layout.DIFFUSE.key,
			  _gl_TexCoord: OBJ.Layout.UV4.key,
			  _gl_ObjSpecular: OBJ.Layout.SPECULAR.key,
			  _gl_ObjSpecularExponent: OBJ.Layout.SPECULAR_EXPONENT.key
			};
			var attr_it = [
			  "_gl_Vertex",
			  "_gl_Normal",
			  "_gl_Color",
			  "_gl_TexCoord",
			  "_gl_ObjSpecular",
			  "_gl_ObjSpecularExponent",
			];
			
			  sProgram.attrIndices = {};
			  for (var i_a = 0; i_a < attr_it.length; ++i_a) {
				var attrName = attr_it[i_a];
				if (!attrs.hasOwnProperty(attrName))continue;
				sProgram.attrIndices[attrName] = gl.getAttribLocation(sProgram, attrName);
			  }
			sProgram.cancelAttributePointers = function(mesh) {
				for (const attrName in attrs) {
				  gl.disableVertexAttribArray(sProgram.attrIndices[attrName]);
				}
				for(var ptr=0; ptr<=sProgram.max_ptr; ++ptr){
					try{gl.enableVertexAttribArray(ptr)}catch(ex){};
				}
			}
			sProgram.applyAttributePointers = function(mesh) {
				for(var ptr=0; ptr<=global_max_attrib_ptr; ++ptr){
					try{gl.disableVertexAttribArray(ptr)}catch(ex){};
				}
				const layout = mesh.vertexBuffer.layout;
				for (const attrName in attrs) {
				  if (!attrs.hasOwnProperty(attrName) || sProgram.attrIndices[attrName] == -1) {
					continue;
				  }
				  gl.enableVertexAttribArray(sProgram.attrIndices[attrName]);
				  const layoutKey = attrs[attrName];
				  if (sProgram.attrIndices[attrName] != -1) {
					const attr = layout.attributeMap[layoutKey];

					gl.vertexAttribPointer(
					  sProgram.attrIndices[attrName],
					  attr.size,
					  gl[attr.type],
					  attr.normalized,
					  attr.stride,
					  attr.offset
					);
				  }
				}
			  };

			sProgram.gl_materialUniform = {};
			var structMembers = {};
			for (var jj = 0; jj < materialStructMembers.length; ++jj) {
				var name = materialStructMembers[jj];
				structMembers[name] = gl.getUniformLocation(sProgram,
				"_gl_BaseMaterial." + name);
			}
			sProgram.gl_materialUniform = structMembers;

			sProgram.gl_lightsUniform = {};
			for (var ll = 0; ll < max_light; ++ll) {
				structMembers = {};
				for (var jj = 0; jj < lightStructMembers.length; ++jj) {
					var name = lightStructMembers[jj];
					structMembers[name] = gl.getUniformLocation(sProgram,
					"_gl_BaseLights[" + ll + "]." + name);
				}
				sProgram.gl_lightsUniform[ll] = structMembers;
			}
			  
		}
		function INIT_GLSL_SHADER(call_back){
			var shaderProgram = gl.createProgram();
			function GLUT_FRAGMENT_SHADER(sProgram,call_back){
				var shader_type = gl.FRAGMENT_SHADER;
				var shader = gl.createShader(shader_type);
				shader.shader_type = shader_type;
				shader.onload=function(s){
					gl.attachShader(sProgram, s);
					sProgram.fragment=s;
					gl.linkProgram(sProgram);
					if(typeof(call_back)==typeof(function(){}))call_back(sProgram);
				}
				gl.compileShaderWithSource(shader,glBuiltInShaderCode.fragment);
			}
			function GLUT_VERTEX_SHADER(sProgram,call_back){
				var shader_type = gl.VERTEX_SHADER;
				var shader = gl.createShader(shader_type);
				shader.shader_type = shader_type;
				shader.onload=function(s){
					gl.attachShader(sProgram, s);
					sProgram.vertex=s;
					GLUT_FRAGMENT_SHADER(sProgram,call_back);
				}
				gl.compileShaderWithSource(shader,glBuiltInShaderCode.vertex);
			}
			GLUT_VERTEX_SHADER(shaderProgram,call_back);
			return shaderProgram;
		}
		function INIT_GLSL_PROGRAM(){
			var shaderProgram=INIT_GLSL_SHADER(function(prog){


				if(gl.getProgramParameter(prog, gl.LINK_STATUS)){
					gl.useProgram(prog);
					for(var i=0; i<built_in_attribute.length; ++i){
						prog[built_in_attribute[i]] = gl.getAttribLocation(prog, "_"+built_in_attribute[i]);
						if(parseInt(prog[built_in_attribute[i]])>=0)gl.enableVertexAttrib(prog[built_in_attribute[i]]);
					}
					for(var i=0; i<built_in_uniform.length; ++i){
						prog[built_in_uniform[i]] =
							gl.getUniformLocation(prog, "_"+built_in_uniform[i]);
					}
					finishProgramDefine(prog);
				}else{
					//console.log(gl.glGet(gl.MAX_VARYING_VECTORS));
					//console.log(gl.getProgramInfoLog(prog));
				}
				prog.buffers=initBuffer(prog);
				//console.log(prog);
			});
			return shaderProgram;
		}
		var global_max_attrib_ptr=0;
		gl.useProgramDefault=function(){
			for(var ptr=gl.INIT_GLSL_PROGRAM.max_ptr+1; ptr<=global_max_attrib_ptr; ++ptr){
				try{gl.disableVertexAttribArray(ptr)}catch(ex){};
			}
			gl.useProgram(gl.INIT_GLSL_PROGRAM);
		}

		/*
		*
		* Matrix stack
		*
		*/
		var special_matrix_modes = {
		  "modelview":{
			  "get_matrix":function(){
				  var result = mat4.create();
				  mat4.multiply(TopMatrix("view"), TopMatrix("model"), result);
				  return result;
			  },
			  readOnly:true,
		  },
		  "modelviewprojection":{
			  "get_matrix":function(){
				  var result = mat4.create();
				  mat4.multiply(TopMatrix("projection"), TopMatrix("modelview"), result);
				  return result;
			  },
			  readOnly:true,
		  },
			"modelprojection":{
			  "get_matrix":function(){
				  var result = mat4.create();
				  mat4.multiply(TopMatrix("projection"), TopMatrix("model"), result);
				  return result;
			  },
			  readOnly:true,
		  },
			"viewprojection":{
			  "get_matrix":function(){
				  var result = mat4.create();
				  mat4.multiply(TopMatrix("projection"), TopMatrix("view"), result);
				  return result;
			  },
			  readOnly:true,
		  },
		  "normal":{
			  "get_matrix":function(){
				  var normalMatrix = mat3.create();
				  mat4.toInverseMat3(TopMatrix("modelview"), normalMatrix);
				  mat3.transpose(normalMatrix);
				  return normalMatrix;
			  },
			  readOnly:true,
		  },
		  "identity":{
			  "get_matrix":function(){
				  var result = mat4.create();
				  mat4.identity(result);
				  return result;
			  },
			  readOnly:true,
		  },
		  "zero":{
			  "get_matrix":function(){
				  var result = mat4.create();
				  mat4.set([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],result);
				  return result;
			  },
			  readOnly:true,
		  },
		  "one":{
			  "get_matrix":function(){
				  var result = mat4.create();
				  mat4.set([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],result);
				  return result;
			  },
			  readOnly:true,
		  },
		  "register":{
			  "get_matrix":function(){
				  return register_matrix;
			  },
			  readOnly:false,
		  },
		};
		function initMatrix(){
			for(var i=0; i<matrix_modes.length; ++i){
				Matries[matrix_modes[i]] = [mat4.create()];
				mat4.identity(Matries[matrix_modes[i]][Matries[matrix_modes[i]].length-1]);
			}
		}
		var handleMatrixError=function(matrix_mode,non){
			if(typeof(TopMatrix(matrix_mode))===typeof(undefined))throw new Error("\""+matrix_mode+" matrix\" doesn't exist.");
			if(!!non)return;
			if(!gl.checkMatrix(matrix_mode))throw new Error("\""+matrix_mode+" matrix\" is readonly.");
		}
		TopMatrix = function(matrix_mode) {
			if(special_matrix_modes[matrix_mode] &&
				typeof special_matrix_modes[matrix_mode].get_matrix === "function"){
				  return special_matrix_modes[matrix_mode].get_matrix();
			}
			return Matries[matrix_mode]?Matries[matrix_mode][Matries[matrix_mode].length-1]:Matries[matrix_mode];
		}
		function PushMatrix(matrix_mode) {
			handleMatrixError(matrix_mode);
			if(!Matries[matrix_mode])throw new Error("\""+matrix_mode+" matrix\" can not be push!");
			  var copy = mat4.create();
			  mat4.set(TopMatrix(matrix_mode), copy);
			  Matries[matrix_mode].push(copy);
		}
		function PopMatrix(matrix_mode) {
			handleMatrixError(matrix_mode);
			if(!Array.isArray(Matries[matrix_mode]))throw new Error("\""+matrix_mode+" matrix\" can not be pop!");
			if (Matries[matrix_mode].length == 0) {
				throw new Error("Invalid popMatrix!");
			}
			Matries[matrix_mode].pop();
		}
		gl.CleanMatrixStack=function(matrix_mode) {
			handleMatrixError(matrix_mode);
			if(!Array.isArray(Matries[matrix_mode]))throw new Error("\""+matrix_mode+" matrix\" can not be pop!");
			while(Matries[matrix_mode].length>1)Matries[matrix_mode].pop();
		}
		function setMatrixUniforms(sProgram) {
			for(var m_i=0; m_i<built_in_matrix_modes_list.length; ++m_i){
				var matrix_mode = built_in_matrix_modes_list[m_i];
				var matrix_data = built_in_matrix_modes[matrix_mode];
				if(sProgram[matrix_data[0]])gl[matrix_data[1]](sProgram[matrix_data[0]],false,TopMatrix(matrix_mode));
			}
			for(var m_i=0; m_i<user_define_mateix.length; ++m_i){
				if(user_define_mateix[m_i].uniform){
					gl.uniformMatrix4fv(gl.getUniformLocation(sProgram,user_define_mateix[m_i].uniform),false,TopMatrix(user_define_mateix[m_i].matrix_mode));
				}
			}
		}
		function defineMatrix4f(matrix_mode,uniform){
			if((special_matrix_modes[matrix_mode] &&
				typeof special_matrix_modes[matrix_mode].get_matrix === "function") ||
				!!Matries[matrix_mode])throw new Error("matrix \""+matrix_mode+"\" are already exist!");
			user_define_mateix.push({
				matrix_mode:matrix_mode,
				uniform:uniform
			});
			Matries[matrix_mode] = [mat4.create()];
		}
		/*
		*
		* attributesk
		*
		*/
		var glVertexIndexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glVertexIndexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([]), gl.STATIC_DRAW);
		glVertexIndexBuffer.itemSize = 1;
		
		function initTopAttribute(){
			var att={};
			for(var a_i=0; a_i<built_in_attribute_list.length; ++a_i){
				var attribute_name = built_in_attribute_list[a_i];
				var attribute_data = built_in_attributes[attribute_name];
				var att_ele=[];
				for(var a_j=0; a_j<attribute_data[1]; ++a_j){
					att_ele[a_j]=0;
				}
				var check_index=/\[/.exec(attribute_name);
				if(check_index){
					var buffer_id=attribute_name.substring(0,check_index.index);
					if(!att[buffer_id])att[buffer_id]=[];
				}
				att[attribute_name]=att_ele;
			}
			return att;
		}
		var topAttributes=initTopAttribute();
		function putTopAttribute(clear){
			var att={};
			for(var a_i=0; a_i<built_in_attribute_list.length; ++a_i){
				var attribute_name = built_in_attribute_list[a_i];
				var attribute_data = built_in_attributes[attribute_name];
				var att_ele=[];
				var att_data=[];
				att_ele=topAttributes[attribute_name];
				att_data=gl.INIT_GLSL_PROGRAM.buffers[attribute_name].data;
				var numItems=(att_data.length+att_ele.length)/attribute_data[1];
				if(clear){
					//att_data=[];
					att_ele=[];
					gl.INIT_GLSL_PROGRAM.buffers[attribute_name].data=[];
					numItems=0;
				}
				//gl.INIT_GLSL_PROGRAM.buffers[attribute_name].data=att_data.concat(att_ele);
				gl.INIT_GLSL_PROGRAM.buffers[attribute_name].data.push(...att_ele);
				gl.INIT_GLSL_PROGRAM.buffers[attribute_name].numItems=numItems;
			}
			if(clear){
				var old_prog=gl.glGet(gl.CURRENT_PROGRAM);
				if(old_prog&&old_prog.USER_ATTRIB)Object.keys(old_prog.USER_ATTRIB||{}).map(function(objectKey, index) {
					var value = old_prog.USER_ATTRIB[objectKey];
					if(value.topAttrib)value.data=[];
				});
			}
		}
		function FbindBuffer(sProgram){
			var old_prog=gl.glGet(gl.CURRENT_PROGRAM);
			for(var a_i=0; a_i<built_in_attribute_list.length; ++a_i){
				var attribute_name = built_in_attribute_list[a_i];
				var attribute_data = built_in_attributes[attribute_name];
				var temp_buffer;
				temp_buffer=gl.INIT_GLSL_PROGRAM.buffers[attribute_name];
				if(sProgram){
					if(sProgram[attribute_data[0]]>=0){
						gl.useProgram(sProgram);

						gl.bindBuffer(gl.ARRAY_BUFFER, temp_buffer);
						gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(temp_buffer.data), gl.STATIC_DRAW);
						temp_buffer.numItems = temp_buffer.data.length / temp_buffer.itemSize;
						gl.enableVertexAttrib(sProgram[attribute_data[0]]);
						gl.vertexAttribPointer(sProgram[attribute_data[0]], temp_buffer.itemSize, gl.FLOAT, false, 0, 0);
					}
				}
			}
			if(sProgram.USER_ATTRIB)Object.keys(sProgram.USER_ATTRIB).map(function(objectKey, index) {
				var value = sProgram.USER_ATTRIB[objectKey];
				if(value.topAttrib){
					gl.bindBuffer(gl.ARRAY_BUFFER, value);

					gl.bufferData(gl.ARRAY_BUFFER, new value.transData(value.data), gl.STATIC_DRAW);
					value.numItems = value.data.length / value.itemSize;
					gl.enableVertexAttrib(objectKey);
					gl.vertexAttribPointer(objectKey, value.itemSize, gl.FLOAT, false, 0, 0);
				}
			});
			gl.useProgram(old_prog);
		}

		function packBuffer(){
			var sProgram=gl.glGet(gl.CURRENT_PROGRAM);
			var result={buffers:[],otherBuffer:[],vertexBuffer:[],holeBuffer:[]};
			for(var a_i=0; a_i<built_in_attribute_list.length; ++a_i){
				var attribute_name = built_in_attribute_list[a_i];
				var attribute_data = built_in_attributes[attribute_name];
				var temp_buffer;
				temp_buffer=gl.INIT_GLSL_PROGRAM.buffers[attribute_name];
				if(sProgram){
					if(sProgram[attribute_data[0]]>=0){
						if(attribute_name=='Vertex'){
							if(holeId>0){
								for(var h_i=0; h_i<holeId; ++h_i)
									for(var h_j=0; h_j<4; ++h_j)
										result.vertexBuffer.push(temp_buffer.data[h_i*4+h_j]);
								for(var h_i=holeId*4; h_i<temp_buffer.data.length; ++h_i)
									result.holeBuffer.push(temp_buffer.data[h_i]);
							}else{
								result.vertexBuffer=temp_buffer.data;
							}
						}else{
							result.buffers.push([sProgram[attribute_data[0]],temp_buffer,Float32Array]);
							result.otherBuffer.push({
							data:temp_buffer.data,dim:temp_buffer.itemSize});
						}
					}
				}
			}
			if(sProgram.USER_ATTRIB)Object.keys(sProgram.USER_ATTRIB).map(function(objectKey, index) {
				var value = sProgram.USER_ATTRIB[objectKey];
				if(value.topAttrib){
					result.buffers.push([objectKey,value,value.transData]);
					result.otherBuffer.push({
					data:value.data,dim:value.itemSize});
				}
			});
			return result;
		}
		function initBuffer(sProgram){
			var pre_buffer={}
			for(var a_i=0; a_i<built_in_attribute_list.length; ++a_i){
				var attribute_name = built_in_attribute_list[a_i];
				var attribute_data = built_in_attributes[attribute_name];
				var temp_buffer = gl.createBuffer();
				temp_buffer.data=[];
				temp_buffer.name=attribute_name;
				gl.bindBuffer(gl.ARRAY_BUFFER, temp_buffer);
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(temp_buffer.data), gl.STATIC_DRAW);
				temp_buffer.itemSize = attribute_data[1];
				
				if(sProgram)if(sProgram[attribute_data[0]] || sProgram[attribute_data[0]]==0){
					temp_buffer.pointer=sProgram[attribute_data[0]];
					temp_buffer.program=sProgram;
				};
				var check_index=/\[/.exec(attribute_name);
				if(check_index){
					var buffer_id=attribute_name.substring(0,check_index.index);
					if(!pre_buffer[buffer_id])pre_buffer[buffer_id]=[];
				}
				pre_buffer[attribute_name]=temp_buffer;
			}
			return pre_buffer;
		}
		function genBufferByType(type){
			if(
				type=='int'||type=='ivec'||type=='ivec2'||type=='ivec3'||type=='ivec4'||
				type=='i'||type=='i2'||type=='i3'||type=='i4'||
				type=='float'||type=='fvec'||type=='fvec2'||type=='fvec3'||type=='fvec4'||type=='vec'||type=='vec2'||type=='vec3'||type=='vec4'||
				type=='f'||type=='f2'||type=='f3'||type=='f4'||
				type=='v'||type=='v2'||type=='v3'||type=='v4'||
				type=='uint'||type=='u'||type=='uvec'||type=='uvec2'||type=='uvec3'||type=='uvec4'||
				type=='u'||type=='u2'||type=='u3'||type=='u4'||
				type=='bool'||type=='b'||type=='bvec'||type=='bvec2'||type=='bvec3'||type=='bvec4'||
				type=='b'||type=='b2'||type=='b3'||type=='b4'||
				type=='double'||type=='d'||type=='dvec'||type=='dvec2'||type=='dvec3'||type=='dvec4'||
				type=='d'||type=='d2'||type=='d3'||type=='d4'
			){
				var count=1;
				if(
					type=='i2'||type=='ivec2'||type=='u2'||type=='uvec2'||
					type=='f2'||type=='fvec2'||type=='d2'||type=='dvec2'||
					type=='b2'||type=='bvec2'||type=='v2'||type=='vec2'
				)count=2;else if(
					type=='i3'||type=='ivec3'||type=='u3'||type=='uvec3'||
					type=='f3'||type=='fvec3'||type=='d3'||type=='dvec3'||
					type=='b3'||type=='bvec3'||type=='v3'||type=='vec3'
				)count=3;else if(
					type=='i4'||type=='ivec4'||type=='u4'||type=='uvec4'||
					type=='f4'||type=='fvec4'||type=='d4'||type=='dvec4'||
					type=='b4'||type=='bvec4'||type=='v4'||type=='vec4'||type=='v'||
					type=='ivec'||type=='uvec'||type=='fvec'||type=='dvec'||
					type=='bvec'||type=='vec'
				)count=4;
				var buffer_data_trans=null;
				if(
					type=='int'||type=='ivec'||type=='ivec2'||type=='ivec3'||type=='ivec4'||
					type=='i'||type=='i2'||type=='i3'||type=='i4'||
					type=='bool'||type=='b'||type=='bvec'||type=='bvec2'||type=='bvec3'||type=='bvec4'||
					type=='b'||type=='b2'||type=='b3'||type=='b4'
				)buffer_data_trans=Int32Array;else if(
					type=='float'||type=='fvec'||type=='fvec2'||type=='fvec3'||type=='fvec4'||type=='vec'||type=='vec2'||type=='vec3'||type=='vec4'||
					type=='f'||type=='f2'||type=='f3'||type=='f4'||
					type=='v'||type=='v2'||type=='v3'||type=='v4'
				)buffer_data_trans=Float32Array;else if(
					type=='uint'||type=='u'||type=='uvec'||type=='uvec2'||type=='uvec3'||type=='uvec4'||
					type=='u'||type=='u2'||type=='u3'||type=='u4'
				)buffer_data_trans=Uint32Array;else if(
					type=='double'||type=='d'||type=='dvec'||type=='dvec2'||type=='dvec3'||type=='dvec4'||
					type=='d'||type=='d2'||type=='d3'||type=='d4'
				)buffer_data_trans=Float64Array;
				if(typeof(buffer_data_trans)==typeof(function(){})){
					var temp_buffer=gl.createBuffer();
					temp_buffer.data=[];
					temp_buffer.transData=buffer_data_trans;
					gl.bindBuffer(gl.ARRAY_BUFFER, temp_buffer);
					gl.bufferData(gl.ARRAY_BUFFER, new temp_buffer.transData(temp_buffer.data), gl.STATIC_DRAW);
					temp_buffer.itemSize = count;
					temp_buffer.numItems = 0;
					return temp_buffer;
				}
			}
			return null;
		}
		gl.VertexAttrib=function(attrib_name,type,...theArgs){
			var curr_prog=gl.glGet(gl.CURRENT_PROGRAM);
			var attrib_ptr = gl.getAttribLocation(curr_prog, attrib_name);
			if(parseInt(attrib_ptr)>=0){
				if(!curr_prog.USER_ATTRIB)curr_prog.USER_ATTRIB={};
				if(!curr_prog.USER_ATTRIB[attrib_ptr]){
					curr_prog.USER_ATTRIB[attrib_ptr]=genBufferByType(type);
				}
				var final_args=[];
				for(var i=0;i<theArgs.length;++i)final_args[i]=theArgs[i];
				if(Array.isArray(final_args[0]))final_args=final_args[0];
				var attri_val=[];
				for(var i=0;i<curr_prog.USER_ATTRIB[attrib_ptr].itemSize;++i){
					if(typeof(final_args[i])!=typeof(0))attri_val[i]=0;
					else attri_val[i]=final_args[i];
				}

				curr_prog.USER_ATTRIB[attrib_ptr].topAttrib=attri_val;
			}
		}
		gl.enableVertexAttrib=function(ptr){
			var curr_prog=gl.glGet(gl.CURRENT_PROGRAM);
			if(typeof(curr_prog.max_ptr)!=typeof(0))curr_prog.max_ptr=ptr;
			if(ptr>=curr_prog.max_ptr)curr_prog.max_ptr=ptr;
			if(ptr>=global_max_attrib_ptr)global_max_attrib_ptr=ptr;
			gl.enableVertexAttribArray(ptr);
		}

		/*
		*
		* geometry
		*
		*/
var concaveBufferIndices=function(){function t(t,e){this.a=t,this.b=e}function e(t,e,r,i){var o=t.x,x=e.x,a=r.x,u=i.x,f=t.y,h=e.y,c=r.y,v=i.y,s=t.z,l=e.z,y=r.z,p=i.z,g=o-x,d=a-u,w=f-h,m=c-v,M=g*m-w*d;if(0==M)return null;var P=o*h-f*x,Z=a*v-c*u,z=(P*d-g*Z)/M,b=(P*m-w*Z)/M;if(z<Math.min(o,x)||z>Math.max(o,x)||z<Math.min(a,u)||z>Math.max(a,u))return null;if(b<Math.min(f,h)||b>Math.max(f,h)||b<Math.min(c,v)||b>Math.max(c,v))return null;var V=Math.sqrt((o-z)*(o-z)+(f-b)*(f-b)),A=Math.sqrt((x-z)*(x-z)+(h-b)*(h-b)),I=Math.sqrt((a-z)*(a-z)+(c-b)*(c-b)),q=Math.sqrt((u-z)*(u-z)+(v-b)*(v-b)),B=V+A+I+q,F=new n(z,b,((B-V)*s+(B-A)*l+(B-I)*y+(B-q)*p)/B);return Array.isArray(t.data)&&(F.data=[...new Array(t.data.length)].map(function(n,o){return((B-V)*t.data[o]+(B-A)*e.data[o]+(B-I)*r.data[o]+(B-q)*i.data[o])/B})),F}function n(t,e,n){var r=1;0!=n&&1!=n&&(r=1/n),this.x=t*r,this.y=e*r,this.z=n*r}function r(t,e,n){n=n||2;var r,a,u,f,h,s,l,p=e&&e.length,g=p?e[0]*n:t.length,d=i(t,0,g,n,!0),w=[];if(!d||d.next===d.prev)return w;if(p&&(d=function(t,e,n,r){var x,a,u,f,h,s=[];for(x=0,a=e.length;x<a;x++)u=e[x]*r,f=x<a-1?e[x+1]*r:t.length,(h=i(t,u,f,r,!1))===h.next&&(h.steiner=!0),s.push(y(h));for(s.sort(c),x=0;x<s.length;x++)v(s[x],n),n=o(n,n.next);return n}(t,e,d,n)),t.length>80*n){r=u=t[0],a=f=t[1];for(var m=n;m<g;m+=n)(h=t[m])<r&&(r=h),(s=t[m+1])<a&&(a=s),h>u&&(u=h),s>f&&(f=s);l=0!==(l=Math.max(u-r,f-a))?1/l:0}return x(d,w,n,r,a,l),w}function i(t,e,n,r,i){var o,x;if(i===I(t,e,n,r)>0)for(o=e;o<n;o+=r)x=b(o,t[o],t[o+1],x);else for(o=n-r;o>=e;o-=r)x=b(o,t[o],t[o+1],x);return x&&w(x,x.next)&&(V(x),x=x.next),x}function o(t,e){if(!t)return t;e||(e=t);var n,r=t;do{if(n=!1,r.steiner||!w(r,r.next)&&0!==d(r.prev,r,r.next))r=r.next;else{if(V(r),(r=e=r.prev)===r.next)break;n=!0}}while(n||r!==e);return e}function x(t,e,n,r,i,c,v){if(t){!v&&c&&function(t,e,n,r){var i=t;do{null===i.z&&(i.z=l(i.x,i.y,e,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next}while(i!==t);i.prevZ.nextZ=null,i.prevZ=null,function(t){var e,n,r,i,o,x,a,u,f=1;do{for(n=t,t=null,o=null,x=0;n;){for(x++,r=n,a=0,e=0;e<f&&(a++,r=r.nextZ);e++);for(u=f;a>0||u>0&&r;)0!==a&&(0===u||!r||n.z<=r.z)?(i=n,n=n.nextZ,a--):(i=r,r=r.nextZ,u--),o?o.nextZ=i:t=i,i.prevZ=o,o=i;n=r}o.nextZ=null,f*=2}while(x>1)}(i)}(t,r,i,c);for(var s,y,p=t;t.prev!==t.next;)if(s=t.prev,y=t.next,c?u(t,r,i,c):a(t))e.push(s.i/n),e.push(t.i/n),e.push(y.i/n),V(t),t=y.next,p=y.next;else if((t=y)===p){v?1===v?x(t=f(o(t),e,n),e,n,r,i,c,2):2===v&&h(t,e,n,r,i,c):x(o(t),e,n,r,i,c,1);break}}}function a(t){var e=t.prev,n=t,r=t.next;if(d(e,n,r)>=0)return!1;for(var i=t.next.next;i!==t.prev;){if(p(e.x,e.y,n.x,n.y,r.x,r.y,i.x,i.y)&&d(i.prev,i,i.next)>=0)return!1;i=i.next}return!0}function u(t,e,n,r){var i=t.prev,o=t,x=t.next;if(d(i,o,x)>=0)return!1;for(var a=i.x<o.x?i.x<x.x?i.x:x.x:o.x<x.x?o.x:x.x,u=i.y<o.y?i.y<x.y?i.y:x.y:o.y<x.y?o.y:x.y,f=i.x>o.x?i.x>x.x?i.x:x.x:o.x>x.x?o.x:x.x,h=i.y>o.y?i.y>x.y?i.y:x.y:o.y>x.y?o.y:x.y,c=l(a,u,e,n,r),v=l(f,h,e,n,r),s=t.prevZ,y=t.nextZ;s&&s.z>=c&&y&&y.z<=v;){if(s!==t.prev&&s!==t.next&&p(i.x,i.y,o.x,o.y,x.x,x.y,s.x,s.y)&&d(s.prev,s,s.next)>=0)return!1;if(s=s.prevZ,y!==t.prev&&y!==t.next&&p(i.x,i.y,o.x,o.y,x.x,x.y,y.x,y.y)&&d(y.prev,y,y.next)>=0)return!1;y=y.nextZ}for(;s&&s.z>=c;){if(s!==t.prev&&s!==t.next&&p(i.x,i.y,o.x,o.y,x.x,x.y,s.x,s.y)&&d(s.prev,s,s.next)>=0)return!1;s=s.prevZ}for(;y&&y.z<=v;){if(y!==t.prev&&y!==t.next&&p(i.x,i.y,o.x,o.y,x.x,x.y,y.x,y.y)&&d(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function f(t,e,n){var r=t;do{var i=r.prev,x=r.next.next;!w(i,x)&&m(i,r,r.next,x)&&Z(i,x)&&Z(x,i)&&(e.push(i.i/n),e.push(r.i/n),e.push(x.i/n),V(r),V(r.next),r=t=x),r=r.next}while(r!==t);return o(r)}function h(t,e,n,r,i,a){var u=t;do{for(var f=u.next.next;f!==u.prev;){if(u.i!==f.i&&g(u,f)){var h=z(u,f);return u=o(u,u.next),h=o(h,h.next),x(u,e,n,r,i,a),void x(h,e,n,r,i,a)}f=f.next}u=u.next}while(u!==t)}function c(t,e){return t.x-e.x}function v(t,e){if(e=function(t,e){var n,r=e,i=t.x,o=t.y,x=-1/0;do{if(o<=r.y&&o>=r.next.y&&r.next.y!==r.y){var a=r.x+(o-r.y)*(r.next.x-r.x)/(r.next.y-r.y);if(a<=i&&a>x){if(x=a,a===i){if(o===r.y)return r;if(o===r.next.y)return r.next}n=r.x<r.next.x?r:r.next}}r=r.next}while(r!==e);if(!n)return null;if(i===x)return n;var u,f=n,h=n.x,c=n.y,v=1/0;r=n;do{i>=r.x&&r.x>=h&&i!==r.x&&p(o<c?i:x,o,h,c,o<c?x:i,o,r.x,r.y)&&(u=Math.abs(o-r.y)/(i-r.x),Z(r,t)&&(u<v||u===v&&(r.x>n.x||r.x===n.x&&s(n,r)))&&(n=r,v=u)),r=r.next}while(r!==f);return n}(t,e)){var n=z(e,t);o(e,e.next),o(n,n.next)}}function s(t,e){return d(t.prev,t,e.prev)<0&&d(e.next,t,t.next)<0}function l(t,e,n,r,i){return(t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t=32767*(t-n)*i)|t<<8))|t<<4))|t<<2))|t<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=32767*(e-r)*i)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function y(t){var e=t,n=t;do{(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next}while(e!==t);return n}function p(t,e,n,r,i,o,x,a){return(i-x)*(e-a)-(t-x)*(o-a)>=0&&(t-x)*(r-a)-(n-x)*(e-a)>=0&&(n-x)*(o-a)-(i-x)*(r-a)>=0}function g(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!function(t,e){var n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&m(n,n.next,t,e))return!0;n=n.next}while(n!==t);return!1}(t,e)&&(Z(t,e)&&Z(e,t)&&function(t,e){var n=t,r=!1,i=(t.x+e.x)/2,o=(t.y+e.y)/2;do{n.y>o!=n.next.y>o&&n.next.y!==n.y&&i<(n.next.x-n.x)*(o-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next}while(n!==t);return r}(t,e)&&(d(t.prev,t,e.prev)||d(t,e.prev,e))||w(t,e)&&d(t.prev,t,t.next)>0&&d(e.prev,e,e.next)>0)}function d(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function w(t,e){return t.x===e.x&&t.y===e.y}function m(t,e,n,r){var i=P(d(t,e,n)),o=P(d(t,e,r)),x=P(d(n,r,t)),a=P(d(n,r,e));return i!==o&&x!==a||(!(0!==i||!M(t,n,e))||(!(0!==o||!M(t,r,e))||(!(0!==x||!M(n,t,r))||!(0!==a||!M(n,e,r)))))}function M(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function P(t){return t>0?1:t<0?-1:0}function Z(t,e){return d(t.prev,t,t.next)<0?d(t,e,t.next)>=0&&d(t,t.prev,e)>=0:d(t,e,t.prev)<0||d(t,t.next,e)<0}function z(t,e){var n=new A(t.i,t.x,t.y),r=new A(e.i,e.x,e.y),i=t.next,o=e.prev;return t.next=e,e.prev=t,n.next=i,i.prev=n,r.next=n,n.prev=r,o.next=r,r.prev=o,r}function b(t,e,n,r){var i=new A(t,e,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function V(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function A(t,e,n){this.i=t,this.x=e,this.y=n,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}function I(t,e,n,r){for(var i=0,o=e,x=n-r;o<n;o+=r)i+=(t[x]-t[o])*(t[o+1]+t[x+1]),x=o;return i}return t.prototype.selfIntersectWith=function(t){for(var n=[],r=Math.sqrt(Math.pow(this.a.x-this.b.x,2)+Math.pow(this.a.y-this.b.y,2)),i=0;i<t.length;i++){var o=t[i],x=t.getNextPointFrom(o);if(x!=this.b){var a=e(this.a,this.b,o,x);if(null!=a){var u=Math.sqrt(Math.pow(this.a.x-a.x,2)+Math.pow(this.a.y-a.y,2));u>.1&&u<r&&n.push({a:this.a,b:this.b,startPoint:o,intersectionPoint:a,endPoint:x,length:u})}}}return n.sort(function(t,e){return t.length-e.length}),n},n.prototype.toArr=function(){var t=1;return 0!=this.z&&1!=this.z&&(t=this.z),[this.x*t,this.y*t,this.z*t]},r.deviation=function(t,e,n,r){var i=e&&e.length,o=i?e[0]*n:t.length,x=Math.abs(I(t,0,o,n));if(i)for(var a=0,u=e.length;a<u;a++){var f=e[a]*n,h=a<u-1?e[a+1]*n:t.length;x-=Math.abs(I(t,f,h,n))}var c=0;for(a=0;a<r.length;a+=3){var v=r[a]*n,s=r[a+1]*n,l=r[a+2]*n;c+=Math.abs((t[v]-t[l])*(t[s+1]-t[v+1])-(t[v]-t[s])*(t[l+1]-t[v+1]))}return 0===x&&0===c?0:Math.abs((c-x)/x)},r.flatten=function(t){for(var e=t[0][0].length,n={vertices:[],holes:[],dimensions:e},r=0,i=0;i<t.length;i++){for(var o=0;o<t[i].length;o++)for(var x=0;x<e;x++)n.vertices.push(t[i][o][x]);i>0&&(r+=t[i-1].length,n.holes.push(r))}return n},function(e,i,o,x,a){var u=o,f={};Array.isArray(u)?f.otherBuffer=[]:u=[];for(var h,c=[],v=0,s=0;v<e.length;v+=i,++s){for(var l=new n(e[v],e[v+1],e[v+2]),y=[],p=0;p<u.length;++p)for(var g=0;g<u[p].dim;++g)y.push(u[p].data[s*u[p].dim+g]);l.data=y,c.push(l)}(h=c).getNextPointFrom=function(t){return this[(this.indexOf(t)+1)%this.length]};var d=function(e){newPoly=[],currentPoint=e[0],newPoly.push(currentPoint),nextPoint=e.getNextPointFrom(currentPoint);do{currentSegment=new t(currentPoint,nextPoint),intersections=currentSegment.selfIntersectWith(e),0==intersections.length?(newPoly.push(nextPoint),currentPoint=nextPoint,nextPoint=e.getNextPointFrom(currentPoint)):(closestIntersection=intersections[0],newPoly.push(closestIntersection.intersectionPoint),currentPoint=closestIntersection.intersectionPoint,nextPoint=closestIntersection.endPoint)}while(currentPoint!=e[0]);return newPoly}(c=h);f.bufferData=[];for(v=0;v<u.length;++v)f.otherBuffer[v]={data:[],dim:u[v].dim};var w=[];for(v=0;v<d.length;++v){var m=d[v].toArr();for(s=m.length;s<i;++s)m[s]=s+1==i&&i>3?1:0;for(s=0,p=0;s<u.length;p+=u[s].dim,++s){var M=[];for(g=0;g<u[s].dim;++g)M[g]=d[v].data[p+g];f.otherBuffer[s].data.push(...M)}f.bufferData.push(...m),w.push(...d[v].toArr())}var P=e.length/i,Z=f.bufferData.length/i;if(x.length>0)for(var z=0;z<x.length;z+=i){for(v=z/i,s=(e.length+z)/i,p=0;p<i;++p)f.bufferData.push(x[z+p]),p<3&&w.push(x[z+p]);for(p=0;p<u.length;++p)for(g=0;g<u[p].dim;++g)f.otherBuffer[p].data.push(u[p].data[s*u[p].dim+g])}var b=null;for(v=0;v<a.length;++v)Array.isArray(b)||(b=[]),b.push(a[v]-P+Z);return f.indices=r(w,b,3),f}}();function vec_cross(t,e){return[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]]}function vec_minus(t,e){return[e[0]-t[0],e[1]-t[1],e[2]-t[2]]}function lineIntersection(t,e,n,r){if(0==e.dot(r.normalize()))return null;var i=(e.dot(t)-e.dot(n))/e.dot(r.normalize());return(new Vector3).addVectors(n,r.normalize().multiplyScalar(i))}function getTransFromVec(t){var e=vec3.create(),n=vec3.create(),r=vec3.create(),i=vec3.create();vec3.normalize(t,n),vec3.length(n)<=1e-14&&(n[0]=1),vec3.set(n,e);var o=e[0];e[0]=e[1],e[1]=o,e[0]==e[1]&&(e[0]+=1),vec3.cross(n,e,i),vec3.normalize(i),vec3.cross(i,n,r),vec3.normalize(r);var x=mat4.create();return mat4.set([n[0],r[0],i[0],0,n[1],r[1],i[1],0,n[2],r[2],i[2],0,0,0,0,1],x),x}var getProjectionSpaceIntersection=function(){const t=[[new Vector3(1,1,0),new Vector3(0,1,0)],[new Vector3(1,-1,0),new Vector3(0,-1,0)],[new Vector3(1,1,0),new Vector3(1,0,0)],[new Vector3(-1,1,0),new Vector3(-1,0,0)],[new Vector3(1,0,0),new Vector3(0,0,-1)],[new Vector3(1,0,1),new Vector3(0,0,1)]];new Vector3(1,0,0),new Vector3(0,0,-1),new Vector3(1,0,1),new Vector3(0,0,1);return function(e,n){for(var r=[],i=new Vector3(e[0],e[1],e[2]),o=new Vector3(n[0]-e[0],n[1]-e[1],n[2]-e[2]),x=0;x<t.length;++x){var a=lineIntersection(t[x][0].clone(),t[x][1].clone(),i.clone(),o.clone());if(typeof a!=typeof{}[0]&&null!=a){for(var u=!1,f=0;f<r.length;++f)if(Math.abs(a.x-r[f][0])<1e-8&&Math.abs(a.y-r[f][1])<1e-8&&Math.abs(a.z-r[f][2])<1e-8){u=!0;break}if(u)continue;r.push([a.x,a.y,a.z])}}return r.sort(function(t,e){return t[0]*t[0]+t[1]*t[1]+t[2]*t[2]-(e[0]*e[0]+e[1]*e[1]+e[2]*e[2])}),r.length>1?[[r[0][0],r[0][1],r[0][2]],[r[1][0],r[1][1],r[1][2]]]:[]}}();
		function calc_inf_line_vertex(point1,point2){
			var turn_back=mat4.create();
			var modelviewprojection=mat4.create();
			var vec_1=[point1[0],point1[1],point1[2],1];
			var vec_2=[point2[0],point2[1],point2[2],1];
			var vecp_1=[point1[0],point1[1],point1[2],1];
			var vecp_2=[point2[0],point2[1],point2[2],1];
			mat4.set(TopMatrix('modelviewprojection'), modelviewprojection);
			mat4.set(modelviewprojection, turn_back);
			mat4.inverse(turn_back);
			mat4.multiplyVec4(modelviewprojection,vec_1,vecp_1);
			mat4.multiplyVec4(modelviewprojection,vec_2,vecp_2);
			vecp_1=[vecp_1[0]/vecp_1[3],vecp_1[1]/vecp_1[3],vecp_1[2]/vecp_1[3],1];
			vecp_2=[vecp_2[0]/vecp_2[3],vecp_2[1]/vecp_2[3],vecp_2[2]/vecp_2[3],1];
			var intsect_p = getProjectionSpaceIntersection(vecp_1,vecp_2);
			if((intsect_p||[]).length<2)return[];
			mat4.multiplyVec4(turn_back,[...intsect_p[0],1],vecp_1);
			mat4.multiplyVec4(turn_back,[...intsect_p[1],1],vecp_2);
			vecp_1=[vecp_1[0]/vecp_1[3],vecp_1[1]/vecp_1[3],vecp_1[2]/vecp_1[3],1];
			vecp_2=[vecp_2[0]/vecp_2[3],vecp_2[1]/vecp_2[3],vecp_2[2]/vecp_2[3],1];
			var dir_check=[point1[0],point1[1],point1[2]];
			var simr1 = vec3.length(vec3.subtract(vecp_1,vec_1,dir_check));
			var simr2 = vec3.length(vec3.subtract(vecp_1,vec_2,dir_check));
			if(simr1<simr2)return[vecp_1,vecp_2];
			return[vecp_2,vecp_1];
		}
		gl.calc_inf_line_vertex=calc_inf_line_vertex;
		function mouse_pos_distance(matrix_mode,point1,m_x,m_y,point_flag){
			var get_mode=matrix_mode;
			if((typeof(get_mode)!=typeof(''))||get_mode=='model'||get_mode=='view'||get_mode=='modelview'||get_mode==''){
				get_mode=((typeof(get_mode)!=typeof(''))?'':get_mode)+'projection';
			}else get_mode='projection';
			//gl.console_log(get_mode);
			var turn_back=mat4.create();
			var uv_x= 2*(_argInit(m_x,MouseAtX)/_width)-1;
			var uv_y= 2*(1-_argInit(m_y,MouseAtY)/_height)-1;
			var modelviewprojection=mat4.create();
			var vec_1=[point1[0],point1[1],point1[2],1];
			var vecp_1=[point1[0],point1[1],point1[2],1];
			mat4.set(TopMatrix(get_mode), modelviewprojection);
			mat4.set(modelviewprojection, turn_back);
			mat4.inverse(turn_back);
			mat4.multiplyVec4(modelviewprojection,vec_1,vecp_1);
			var orig_pt = new Vector3(vecp_1[0]/vecp_1[3],vecp_1[1]/vecp_1[3],vecp_1[2]/vecp_1[3]);
			var intsect_p = orig_pt.clone().toLinePoint(new Vector3(uv_x,uv_y,0),new Vector3(uv_x,uv_y,1));
			mat4.multiplyVec4(turn_back,[intsect_p.x,intsect_p.y,intsect_p.z,1],vecp_1);
			vecp_1=[vecp_1[0]/vecp_1[3],vecp_1[1]/vecp_1[3],vecp_1[2]/vecp_1[3],1];
			if(point_flag)return vecp_1;
			
		}
		gl.mouse_pos_distance=mouse_pos_distance;
		
		
		function get_triangle(id, vertex_list, indices, dim, inv_flag){
			var vex0 = [
				vertex_list[indices[id]*dim],
				vertex_list[indices[id]*dim+1],
				vertex_list[indices[id]*dim+2]
			];
			var vex1 = [
				vertex_list[indices[id+1]*dim],
				vertex_list[indices[id+1]*dim+1],
				vertex_list[indices[id+1]*dim+2]
			];
			var vex2 = [
				vertex_list[indices[id+2]*dim],
				vertex_list[indices[id+2]*dim+1],
				vertex_list[indices[id+2]*dim+2]
			];
			var vec_1 = vec_minus(vex1,vex0);
			var vec_2 = vec_minus(vex1,vex2);
			var norm = vec_cross(vec_1,vec_2);
			if(inv_flag==1)norm = vec_cross(vec_2,vec_1);
			vex0.push(1.0);
			var cur_prog=gl.glGet(gl.CURRENT_PROGRAM);
			gl.uniform4fv(gl.getUniformLocation(cur_prog,'_gl_vertex_uniform'), vex0);
			gl.uniform3fv(gl.getUniformLocation(cur_prog,'_gl_normal_uniform'), norm);
		}
		
		/*
		*
		* rendering
		*
		*/
		var fillmode=gl.FILL;
		var geo_buffer_type=gl.NONE;
		var cur_shade_mode=gl.BLINN;
		gl.drawElementsWithMode=function(mode, count, dtype, offset){
			if(fillmode==gl.POINT && mode != gl.POINTS){
				gl.drawElements(gl.POINTS, count, dtype, offset);
			}else if((fillmode==gl.LINE || fillmode==gl.TRIANGLE) && mode != gl.LINES && mode != gl.POINTS){
				gl.drawElements(gl.LINE_STRIP, count, dtype, offset);
			}else{
				gl.drawElements(mode, count, dtype, offset);
			}
		}
		gl.drawArraysVertex=function(mode, first, count){
			if (drawing_index_array.length<=0){
				gl.drawArrays(mode, first, count);
			}else{
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glVertexIndexBuffer);
				gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(drawing_index_array), gl.STATIC_DRAW);
				glVertexIndexBuffer.itemSize = 1;
				glVertexIndexBuffer.numItems = drawing_index_array.length;
				//gl.console_log(drawing_index_array);
				gl.drawElements(mode, glVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, first*2);
			}
		}
		gl.drawElementsVertex=function(mode, vertex_list, indices, dim, count, dtype, offset, cw){

			if(fillmode==gl.POINT && mode != gl.POINTS){
				gl.drawElements(gl.POINTS, count, dtype, offset);
				return;
			}else if((fillmode==gl.LINE || fillmode==gl.TRIANGLE) && mode != gl.LINES && mode != gl.POINTS){
				gl.drawElements(gl.LINE_STRIP, count, dtype, offset);
				return;
			}
			
			if(gl.getShadeModel()==gl.FLAT){
				var data_w = 1;
				if(dtype==gl.UNSIGNED_BYTE)data_w=1;
				else if(dtype==gl.UNSIGNED_SHORT)data_w=2;
				else if(dtype==gl.UNSIGNED_INT)data_w=4;

				if(mode==gl.POINTS||mode==gl.LINE_STRIP||mode==gl.LINE_LOOP||mode==gl.LINES||mode==gl.TRIANGLE_FAN){
					if(mode==gl.TRIANGLE_FAN)console_warn('sorry! gl.TRIANGLE_FAN will not spport gl.FLAT mode in this library.');
					gl.drawElements(mode, count, dtype, offset);
				}else{
					for(var i=Math.floor(offset/data_w); i<indices.length; i+=((mode==gl.TRIANGLES)?3:1)){
						if(i+1<indices.length && i+2<indices.length){
							var cw_flag=((mode==gl.TRIANGLES)?0:i%2);
							if(!!cw)cw_flag=!cw_flag;
							get_triangle(i, vertex_list, indices, dim, cw_flag );
							gl.drawElements(gl.TRIANGLES, 3, dtype, i*data_w);
						}
					}
				}
			}else{
				gl.drawElements(mode, count, dtype, offset);
			}
		}
		gl.getShadeModel=function(){return cur_shade_mode;};
		gl.ShadeModel=function(mode_id){
			var curr_prog=gl.glGet(gl.CURRENT_PROGRAM);
			var param = mode_id;
			switch(mode_id){
				case gl.FLAT:
					param=2;
					cur_shade_mode=gl.FLAT;
					break;
				case gl.BLINN:
					param=0;
					cur_shade_mode=gl.BLINN;
					break;
				case gl.SMOOTH:
				default:
					param=1;
					cur_shade_mode=gl.SMOOTH;
					break;
			}
			gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_color_shading_mode'), param);
		}
		function check_primitive_mode(primitive_mode){return!(
				primitive_mode!=gl.POINTS && 
				primitive_mode!=gl.LINES && 
				primitive_mode!=gl.LINE_STRIP && 
				primitive_mode!=gl.LINE_LOOP && 
				primitive_mode!=gl.TRIANGLES && 
				primitive_mode!=gl.TRIANGLE_STRIP && 
				primitive_mode!=gl.TRIANGLE_FAN && 
				primitive_mode!=gl.QUADS && 
				primitive_mode!=gl.QUAD_STRIP && 
				primitive_mode!=gl.POLYGON &&
				primitive_mode!=gl.POLYGONS &&
				!((primitive_mode||'').toString().startsWith('POLYGONS') && !Number.isNaN(check_gl_polygon(primitive_mode)) && check_gl_polygon(primitive_mode)>2 ) &&
				primitive_mode!=gl.POLYGON_STRIP &&
				!((primitive_mode||'').toString().startsWith('POLYGON_STRIP') && !Number.isNaN(check_gl_polygon_strip(primitive_mode)) && check_gl_polygon_strip(primitive_mode)>2) &&
				primitive_mode!=gl.CONCAVE_POLYGON &&
				primitive_mode!=gl.POLYHEDRON &&
				primitive_mode!=gl.HTML &&
				primitive_mode!=gl.TETRAHEDRONS &&
				primitive_mode!=gl.STRAIGHT_LINES &&
				primitive_mode!=gl.RAYS
		);};
		function gl_obj_state_reset(){
			putTopAttribute(true);
			vertId=0;
			drawing_index_array=[];
			geo_buffer_type=gl.NONE;
			gl.useProgramDefault();
			initMatrix();
			raiseReshape(false);
			reshapeFunc(_width,_height);
			raiseVisibilityFunc(visibility_state);
			draw_completed=true;
		}
		function getMaxVertex(){
			if (drawing_index_array.length>0)return drawing_index_array.length;
			return vertId;
		}
		function hasIndexArray(){
			return drawing_index_array.length>0;
		}
		function getVertexIndex(id){
			var result=id;
			if (drawing_index_array.length>0){
				result=drawing_index_array[id];
				if(id>=drawing_index_array.length)result=drawing_index_array[drawing_index_array.length-1];
				if(id<0)result=drawing_index_array[0];
			}
			return result;
		}
		function addIndice(vIndiceList,...id){
			vIndiceList.push(...id.map(getVertexIndex));
		}
		gl.Begin=function(mode){
			if(geo_buffer_type!=gl.NONE){
				throw new Error("already drawing!");
				return;
			}
			if(!(check_primitive_mode(geo_buffer_type))){
				throw new Error("unknown primitive type : "+gl.getGLEnumName(gl.VERSION));
				return;
			}
			geo_buffer_type=mode;
			putTopAttribute(true);
		}
		gl.IndexArray=function(...ids){
			if(ids.length>0)drawing_index_array.push(...ids);
			//gl.console_log(drawing_index_array);
		}
		gl.Vertex=function(x,y,z,w){
			if(geo_buffer_type==gl.HTML){
				console_warn(Error("Invalid geometry object!"));
				return;
			}
			var vert=[x,y,z,w];
			if(Array.isArray(x))vert=x;
			for(var i=0;i<4;++i)if(typeof(vert[i])!=typeof(0)){
				vert[i]=0;
				if(i==3)vert[i]=1;
			}
			topAttributes.Vertex=vert;
			var curr_prog=gl.glGet(gl.CURRENT_PROGRAM);
			if(curr_prog.USER_ATTRIB)Object.keys(curr_prog.USER_ATTRIB).map(function(objectKey, index) {
				var value = curr_prog.USER_ATTRIB[objectKey];
				if(value.topAttrib){
					//curr_prog.USER_ATTRIB[objectKey].data=value.data.concat(value.topAttrib);
					curr_prog.USER_ATTRIB[objectKey].data.push(...value.topAttrib);
				}
			});
			++vertId;
			putTopAttribute();
		}
		gl.Html=function(o,width,height){
			if(
				//typeof o.tagName ==="string"
				typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
				o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
			){
				pushDOMElement(o,width,height);
			}else{
				console_warn(new Error("Invalid geometry object!"));
				return;
			}
		}
		gl.End=function(){
			var vectexCount = getMaxVertex();
			if(!(check_primitive_mode(geo_buffer_type))){
				var index_data=[];
				drawing_index_array=[];
				putTopAttribute(true);
				vertId=0;
				geo_buffer_type=gl.NONE;
				throw new Error("not valid drawing!");
				return;
			}
			if((geo_buffer_type!=gl.HTML&&vectexCount<=0)||(geo_buffer_type==gl.HTML&&DOMScene.length<=0)){
				var index_data=[];
				drawing_index_array=[];
				vertId=0;
				geo_buffer_type=gl.NONE;
				console_warn(new Error("Nohting to draw!"));
			}
			var cur_prog=gl.glGet(gl.CURRENT_PROGRAM);
			if(geo_buffer_type!=gl.HTML){
				FbindBuffer(cur_prog);
				setMatrixUniforms(cur_prog);
			}
			var temp_buffer=gl.INIT_GLSL_PROGRAM.buffers.Vertex;
			
			if(
				geo_buffer_type==gl.POINTS||
				geo_buffer_type==gl.LINES||
				geo_buffer_type==gl.LINE_STRIP||
				geo_buffer_type==gl.LINE_LOOP||
				geo_buffer_type==gl.TRIANGLES||
				geo_buffer_type==gl.TRIANGLE_STRIP||
				geo_buffer_type==gl.TRIANGLE_FAN
			){
			//webgl supported primitives 
				if(fillmode==gl.FILL)gl.drawArraysVertex(geo_buffer_type, 0, temp_buffer.numItems);
				else if(fillmode==gl.POINT)gl.drawArraysVertex(gl.POINTS, 0, vectexCount);
				else{
					if(
						geo_buffer_type==gl.POINTS||
						geo_buffer_type==gl.LINES||
						geo_buffer_type==gl.LINE_STRIP||
						geo_buffer_type==gl.LINE_LOOP
					)gl.drawArraysVertex(geo_buffer_type, 0, temp_buffer.numItems);
					else if(geo_buffer_type==gl.TRIANGLES){
						var max_poly = Math.floor((vectexCount+1e-7)/3);
						var poly_indices = [];
						for(var i=0; i<max_poly; ++i){
							for(var j=0; j<3; ++j){
								//poly_indices.push(i*3+j);
								//poly_indices.push(i*3+(j+1)%3);
								addIndice(poly_indices,i*3+j);
								addIndice(poly_indices,i*3+(j+1)%3);
							}
						}
						gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glVertexIndexBuffer);
						gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(poly_indices), gl.STATIC_DRAW);
						glVertexIndexBuffer.itemSize = 1;
						glVertexIndexBuffer.numItems = poly_indices.length;
						gl.drawElements(gl.LINES, glVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
					}else if(
						geo_buffer_type==gl.TRIANGLE_STRIP ||
						geo_buffer_type==gl.TRIANGLE_FAN
					){
						var poly_indices = [];
						for(var i=(geo_buffer_type==gl.TRIANGLE_STRIP?0:1); i<vectexCount; ++i){
							if(geo_buffer_type==gl.TRIANGLE_STRIP){
								if(i-2>=0){
									//poly_indices.push(i-2);
									//poly_indices.push(i);
									addIndice(poly_indices,i-2);
									addIndice(poly_indices,i);
								}
							}else{
								//poly_indices.push(0);
								//poly_indices.push(i);
								addIndice(poly_indices,0);
								addIndice(poly_indices,i);
							}
							if(i+1<vectexCount){
								//poly_indices.push(i);
								//poly_indices.push(i+1);
								addIndice(poly_indices,i);
								addIndice(poly_indices,i+1);
							}
						}
						gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glVertexIndexBuffer);
						gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(poly_indices), gl.STATIC_DRAW);
						glVertexIndexBuffer.itemSize = 1;
						glVertexIndexBuffer.numItems = poly_indices.length;
						
						gl.drawElements(gl.LINES, glVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
					}
				}
			}else if(geo_buffer_type==gl.HTML){
			//HTML primitives 

			}else if(geo_buffer_type==gl.STRAIGHT_LINES || geo_buffer_type==gl.RAYS){
			//line (infinite length) primitives
				if(hasIndexArray())console_warn('webGLUT: primitive \''+gl.getGLEnumName(geo_buffer_type)+'\' with polygon mode \''+gl.getGLEnumName(fillmode)+'\' not support index array.');
				var line_count = Math.floor((vectexCount+1e-7)/2);
				var draw_indices = [];
				if(fillmode==gl.POINT)gl.drawArraysVertex(gl.POINTS, 0, vectexCount);
				else{
					var old_data=gl.INIT_GLSL_PROGRAM.buffers.Vertex.data;
					for(var i=0; i<line_count; ++i){
						var i_i=getVertexIndex(i*2);
						var j_i=getVertexIndex(i*2+1);
						var new_line_vex = calc_inf_line_vertex(
							[old_data[i_i*4],old_data[i_i*4+1],old_data[i_i*4+2]],
							[old_data[j_i*4],old_data[j_i*4+1],old_data[j_i*4+2]]
						);
						
						if((new_line_vex||[]).length>0){
							//draw_indices.push(i);
							//draw_indices.push(i+1);
							addIndice(draw_indices,i*2);
							addIndice(draw_indices,i*2+1);
							if(geo_buffer_type!=gl.RAYS){
								old_data[i_i*4]=new_line_vex[0][0];
								old_data[i_i*4+1]=new_line_vex[0][1];
								old_data[i_i*4+2]=new_line_vex[0][2];
							}
							old_data[j_i*4]=new_line_vex[1][0];
							old_data[j_i*4+1]=new_line_vex[1][1];
							old_data[j_i*4+2]=new_line_vex[1][2];
						}
					}
					var temp_buffer=gl.INIT_GLSL_PROGRAM.buffers.Vertex
					gl.bindBuffer(gl.ARRAY_BUFFER, temp_buffer);
					gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(old_data), gl.STATIC_DRAW);
					temp_buffer.numItems = old_data.length / temp_buffer.itemSize;
					gl.enableVertexAttrib(cur_prog[built_in_attributes.Vertex[0]]);
					gl.vertexAttribPointer(cur_prog[built_in_attributes.Vertex[0]], temp_buffer.itemSize, gl.FLOAT, false, 0, 0);
					
					gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glVertexIndexBuffer);
					gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(draw_indices), gl.STATIC_DRAW);
					glVertexIndexBuffer.itemSize = 1;
					glVertexIndexBuffer.numItems = draw_indices.length;
					
					gl.drawElements(gl.LINES, glVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
				}
			}else if(geo_buffer_type==gl.TETRAHEDRONS){
			//tetrahedron primitives 
				if(fillmode==gl.POINT)gl.drawArraysVertex(gl.POINTS, 0, vectexCount);else{
					var tetra_count = Math.floor((vectexCount+1e-7)/4);
					var draw_indices = [];
					for(var i=0; i<tetra_count; ++i){
						//draw_indices.push(...(get_tetraIdx((fillmode==gl.FILL)?0:1,i*4)));
						addIndice(draw_indices,...(get_tetraIdx((fillmode==gl.FILL)?0:1,i*4)));
						//gl.console_log(draw_indices);
					}
					gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glVertexIndexBuffer);
					gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(draw_indices), gl.STATIC_DRAW);
					glVertexIndexBuffer.itemSize = 1;
					glVertexIndexBuffer.numItems = draw_indices.length;
					gl.drawElementsVertex(
						(fillmode==gl.FILL)?gl.TRIANGLES:gl.LINES,
						gl.INIT_GLSL_PROGRAM.buffers.Vertex.data,
						draw_indices,
						gl.INIT_GLSL_PROGRAM.buffers.Vertex.itemSize,
						glVertexIndexBuffer.numItems,
						gl.UNSIGNED_SHORT, 0, true
					);
				}
			}else if(
				geo_buffer_type==gl.POLYGON || 
				geo_buffer_type.toString().startsWith('POLYGONS') ||
				geo_buffer_type==gl.POLYGONS ||
				geo_buffer_type==gl.QUADS
			){
			//polygon (side > 3) primitives
				var side=check_gl_polygon(geo_buffer_type);
				if(Number.isNaN(side))side=vectexCount;
				if(geo_buffer_type==gl.QUADS)side=4;
				var max_poly = Math.floor((vectexCount+1e-7)/side);
				var poly_indices = [];
				
				if(fillmode==gl.FILL || fillmode==gl.TRIANGLE || fillmode==gl.LINE){
					
					for(var i=0; i<max_poly; ++i){

						for(var j=(fillmode==gl.LINE)?0:1; j<side-((fillmode==gl.LINE)?0:1); ++j){
							if(fillmode!=gl.LINE){
								//poly_indices.push(i*side);
								addIndice(poly_indices,i*side);
								if(fillmode==gl.TRIANGLE)//poly_indices.push(i*side+j);
									addIndice(poly_indices,i*side+j);
							}
							//poly_indices.push(i*side+j);
							addIndice(poly_indices,i*side+j);
							if(fillmode==gl.TRIANGLE)//poly_indices.push(i*side+j+1);
								addIndice(poly_indices,i*side+j+1);
							if(fillmode==gl.LINE)//poly_indices.push(i*side+(j+1)%side);
								addIndice(poly_indices,i*side+(j+1)%side);
							if(fillmode!=gl.LINE){
								//poly_indices.push(i*side+j+1);
								addIndice(poly_indices,i*side+j+1);
								if(fillmode==gl.TRIANGLE)//poly_indices.push(i*side);
									addIndice(poly_indices,i*side);
							}
						}

					}

					gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glVertexIndexBuffer);
					gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(poly_indices), gl.STATIC_DRAW);
					glVertexIndexBuffer.itemSize = 1;
					glVertexIndexBuffer.numItems = poly_indices.length;
					
					//gl.drawElements((fillmode==gl.FILL)?gl.TRIANGLES:gl.LINES, glVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
					
					gl.drawElementsVertex(
						(fillmode==gl.FILL)?gl.TRIANGLES:gl.LINES,
						gl.INIT_GLSL_PROGRAM.buffers.Vertex.data,
						poly_indices,
						gl.INIT_GLSL_PROGRAM.buffers.Vertex.itemSize,
						glVertexIndexBuffer.numItems,
						gl.UNSIGNED_SHORT, 0
					);
					
				}else if(fillmode==gl.POINT)gl.drawArraysVertex(gl.POINTS, 0, vectexCount);
			}else if(
				geo_buffer_type==gl.POLYGON_STRIP ||
				geo_buffer_type.toString().startsWith('POLYGON_STRIP') ||
				geo_buffer_type==gl.QUAD_STRIP
			){
			//polygon (side > 3) strip primitives
				var side=check_gl_polygon_strip(geo_buffer_type);
				if(Number.isNaN(side))side=vectexCount;
				if(geo_buffer_type==gl.QUAD_STRIP)side=4;
				var strip_step = side-2;
				var max_poly = Math.floor((vectexCount-side+1e-7)/strip_step);
				var poly_indices = [];
				
				if(fillmode==gl.POINT)gl.drawArraysVertex(gl.POINTS, 0, vectexCount);
				else{
					for(var i=1; i<side-1; ++i){
						//poly_indices.push(0);
						addIndice(poly_indices,0);
						//poly_indices.push(i);
						addIndice(poly_indices,i);
						//poly_indices.push(i+1);
						addIndice(poly_indices,i+1);
					}

					for(var i=0; i<max_poly; ++i){
						//poly_indices.push(side+strip_step*i-2);
						addIndice(poly_indices,side+strip_step*i-2);
						//poly_indices.push(side+strip_step*i-1);
						addIndice(poly_indices,side+strip_step*i-1);
						//poly_indices.push(side+strip_step*i+strip_step-1); 
						addIndice(poly_indices,side+strip_step*i+strip_step-1);
						for(var j=0; j<strip_step-1; ++j){
							//poly_indices.push(side+strip_step*i-2);
							addIndice(poly_indices,side+strip_step*i-2);
							//poly_indices.push(side+strip_step*i+j);
							addIndice(poly_indices,side+strip_step*i+j);
							//poly_indices.push(side+strip_step*i+j+1);
							addIndice(poly_indices,side+strip_step*i+j+1);
						}
					}
					var draw_indices = poly_indices;
					if(fillmode==gl.TRIANGLE){
						draw_indices=[];
						for(var i=0; i<poly_indices.length; ++i){
							draw_indices.push(poly_indices[i]);
							draw_indices.push(poly_indices[(i+1)%poly_indices.length]);
						}
					}else if(fillmode==gl.LINE){
						draw_indices=[];
						for(var i=0; i<side; ++i){
							//draw_indices.push(i);
							addIndice(draw_indices,i);
							//draw_indices.push((i+1)%side);
							addIndice(draw_indices,(i+1)%side);
						}
						for(var i=0; i<max_poly; ++i){
							//draw_indices.push(side+strip_step*i-2);
							addIndice(draw_indices,side+strip_step*i-2);
							//draw_indices.push(side+strip_step*i);
							addIndice(draw_indices,side+strip_step*i);
							//draw_indices.push(side+strip_step*i-1);
							addIndice(draw_indices,side+strip_step*i-1);
							//draw_indices.push(side+strip_step*i+strip_step-1); 
							addIndice(draw_indices,side+strip_step*i+strip_step-1);
							for(var j=0; j<strip_step-1; ++j){
								//draw_indices.push(side+strip_step*i+j);
								addIndice(draw_indices,side+strip_step*i+j);
								//draw_indices.push(side+strip_step*i+j+1);
								addIndice(draw_indices,side+strip_step*i+j+1);
							}
						}
					}
					gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glVertexIndexBuffer);
					gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(draw_indices), gl.STATIC_DRAW);
					glVertexIndexBuffer.itemSize = 1;
					glVertexIndexBuffer.numItems = draw_indices.length;
					
					gl.drawElements((fillmode==gl.FILL)?gl.TRIANGLES:gl.LINES, glVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
				}

			}else if(geo_buffer_type==gl.CONCAVE_POLYGON){
			//concave polygon primitives
				if(fillmode==gl.LINE){
					var poly_indices = [];
					for(var i=-1; i<holeList.length; ++i){
						var vec_start=(i<0)?0:holeList[i];
						var vec_end=((i+1>=holeList.length)?vectexCount:holeList[i+1])-1;
						//poly_indices.push(vec_start);
						addIndice(poly_indices,vec_start);
						//poly_indices.push(vec_end);
						addIndice(poly_indices,vec_end);
						for(var j=vec_start; j<vec_end; ++j){
							//poly_indices.push(j);
							addIndice(poly_indices,j);
							//poly_indices.push(j+1);
							addIndice(poly_indices,j+1);
						}
					}
					gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glVertexIndexBuffer);
					gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(poly_indices), gl.STATIC_DRAW);
					glVertexIndexBuffer.itemSize = 1;
					glVertexIndexBuffer.numItems = poly_indices.length;
					
					gl.drawElements(gl.LINES, glVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
				}else if(fillmode==gl.POINT)gl.drawArraysVertex(gl.POINTS, 0, vectexCount);
				else{
					if(hasIndexArray())console_warn('webGLUT: primitive \'GL_CONCAVE_POLYGON\' with polygon mode \''+gl.getGLEnumName(fillmode)+'\' not support index array.');
					var packed = packBuffer();
					
					var unpack = concaveBufferIndices(packed.vertexBuffer,4,packed.otherBuffer,packed.holeBuffer, holeList);
					
					for(var i=0;i<packed.buffers.length; ++i){
						gl.bindBuffer(gl.ARRAY_BUFFER, packed.buffers[i][1]);
						gl.bufferData(gl.ARRAY_BUFFER, new packed.buffers[i][2](unpack.otherBuffer[i].data), gl.STATIC_DRAW);
						packed.buffers[i][1].numItems = unpack.otherBuffer[i].data.length / packed.buffers[i][1].itemSize;
						gl.enableVertexAttrib(packed.buffers[i][0]);
						gl.vertexAttribPointer(packed.buffers[i][0], packed.buffers[i][1].itemSize, gl.FLOAT, false, 0, 0);
					}
					var temp_buffer=gl.INIT_GLSL_PROGRAM.buffers.Vertex
					gl.bindBuffer(gl.ARRAY_BUFFER, temp_buffer);
					gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(unpack.bufferData), gl.STATIC_DRAW);
					temp_buffer.numItems = unpack.bufferData.length / temp_buffer.itemSize;
					gl.enableVertexAttrib(cur_prog[built_in_attributes.Vertex[0]]);
					gl.vertexAttribPointer(cur_prog[built_in_attributes.Vertex[0]], temp_buffer.itemSize, gl.FLOAT, false, 0, 0);

					var draw_indices = unpack.indices;
					if(fillmode==gl.TRIANGLE){
						draw_indices=[];
						for(var i=0; i<unpack.indices.length; i+=3){
							for(var j=0; j<3; ++j){
								draw_indices.push(unpack.indices[i+j]);
								draw_indices.push(unpack.indices[i+(j+1)%3]);
							}
						}
					}
					gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glVertexIndexBuffer);
					gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(draw_indices), gl.STATIC_DRAW);
					glVertexIndexBuffer.itemSize = 1;
					glVertexIndexBuffer.numItems = draw_indices.length;
					
					gl.drawElements((fillmode==gl.FILL)?gl.TRIANGLES:gl.LINES, glVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
				}

				holeId = -1;
				holeList = [];
			}else if(geo_buffer_type==gl.POLYHEDRON){
			//polyhedron (face > 4) primitives
				if(fillmode==gl.POINT)gl.drawArraysVertex(gl.POINTS, 0, vectexCount);else{
					if(hasIndexArray())console_warn('webGLUT: primitive \'GL_POLYHEDRON\' with polygon mode \''+gl.getGLEnumName(fillmode)+'\' not support index array.');
					if(vertId<4){
						gl.drawArraysVertex((fillmode==gl.FILL&&vertId>2)?gl.TRIANGLES:((vertId<2)?gl.POINTS:gl.LINES), 0, vertId);
					}else{
						var draw_indices = QuickHull(gl.INIT_GLSL_PROGRAM.buffers.Vertex.data.reduce(function(input,item){
							var result=Array.isArray(input)?input:[[input]];
							if((result[result.length-1]||{length:4}).length<4)result[result.length-1].push(item);
							else result.push([item]);
							return result;
						}));
						var final_indices = draw_indices.indices;
						if(fillmode==gl.TRIANGLE){
							final_indices=[];
							for(var i=0; i<draw_indices.indices.length; i+=3){
								for(var j=0; j<3; ++j){
									final_indices.push(draw_indices.indices[i+j]);
									final_indices.push(draw_indices.indices[i+(j+1)%3]);
								}
							}
						}else if(fillmode==gl.LINE){
							var normalGroup=[];
							for(var i=0; i<draw_indices.normals.length; ++i){
								var vec_index=-1;
								var vec_check=draw_indices.normals[i];
								for(var j=0; j<normalGroup.length; ++j){
									var vec = normalGroup[j].index;
									if(Math.abs(vec[0]*vec_check[0]+vec[1]*vec_check[1]+vec[2]*vec_check[2])>0.9){
										vec_index=j;
										break;
									}
								}
								if(vec_index<0){
									normalGroup.push({
										index:[vec_check[0],vec_check[1],vec_check[2]],
										faces:[i]
									})
								}else{
									normalGroup[vec_index].faces.push(i);
								}
							}
							for(var i=0; i<normalGroup.length; ++i){
								for(var j=0; j<normalGroup[i].faces.length; ++j){
									var iterator=[];
									var face_id=normalGroup[i].faces[j];
									for(var k=0; k<3; ++k)iterator[k]=draw_indices.indices[face_id*3+k];
									if(!Array.isArray(normalGroup[i].groups)){
										normalGroup[i].groups=[iterator];
									}else{
										var combine_success=[];
										for(var k=0; k<normalGroup[i].groups.length; ++k){
											var to_concat=normalGroup[i].groups[k];
											var concat_to=[];
											var edge_flag=false;
											var combine_flag=false;
											for(var l=0; l<iterator.length; ++l){
												if(concat_to[concat_to.length-1]!=iterator[l])concat_to.push(iterator[l]);
												var find_point=to_concat.indexOf(iterator[l]);
												var next_point=to_concat.indexOf(iterator[(l+1)%iterator.length]);
												if(find_point<0||next_point<0)continue;
												if(edge_flag){
													edge_flag=false;
													continue;
												}
												for(var il=1; il<to_concat.length; ++il){
													var combine_id=to_concat[(find_point+il)%to_concat.length];
													if(concat_to.indexOf(combine_id)<0)concat_to.push(to_concat[(find_point+il)%to_concat.length]);
												}
												edge_flag=true;
												combine_flag=true;
											}
											iterator=concat_to;
											if(combine_flag)combine_success.push(k);
											
										}
										for(var del_it=combine_success.length-1;del_it>=0;--del_it){
											normalGroup[i].groups.splice(combine_success[del_it], 1);
										}
										normalGroup[i].groups.push(iterator);
									}

								}
							}
							final_indices=[];
							for(var i=0; i<normalGroup.length; ++i){
								for(var j=0; j<normalGroup[i].groups.length; ++j){
									for(var k=0; k<normalGroup[i].groups[j].length; ++k){
										final_indices.push(normalGroup[i].groups[j][k]);
										final_indices.push(normalGroup[i].groups[j][(k+1)%normalGroup[i].groups[j].length]);
									}
								}
							}
						}
						gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glVertexIndexBuffer);
						gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(final_indices), gl.STATIC_DRAW);
						glVertexIndexBuffer.itemSize = 1;
						glVertexIndexBuffer.numItems = final_indices.length;
							
						gl.drawElementsVertex(
							(fillmode==gl.FILL)?gl.TRIANGLES:gl.LINES,
							gl.INIT_GLSL_PROGRAM.buffers.Vertex.data,
							final_indices,
							gl.INIT_GLSL_PROGRAM.buffers.Vertex.itemSize,
							glVertexIndexBuffer.numItems,
							gl.UNSIGNED_SHORT, 0, true
						);
					}
				}
			}else{
			//unknown primitives

			}

			var index_data=[];
			if(geo_buffer_type!=gl.HTML){
				putTopAttribute(true);
			}
			drawing_index_array=[];
			vertId=0;
			geo_buffer_type=gl.NONE;
		}
		gl.SetHole=function(){
			if(holeId<0)holeId=vertId;
			holeList.push(vertId);
		}
		gl.PolygonMode=function(mode){
			if(
				mode!=gl.FILL &&
				mode!=gl.LINE &&
				mode!=gl.TRIANGLE &&
				mode!=gl.POINT
			)return;
			fillmode=mode;
		}
		gl.getPolygonMode=function(){
			return fillmode;
		}
		gl.PointSize=function(size){
			var curr_prog=gl.glGet(gl.CURRENT_PROGRAM);
			var param = parseFloat(size);
			gl.uniform1f(gl.getUniformLocation(curr_prog,'_gl_pointSize'), Number.isNaN(param)?1:param);
		}
		
		/*
		*
		* transformation
		*
		*/
		gl.degToRad=function(degrees){return degrees * Math.PI / 180;};
		gl.radToDeg=function(rad){return rad*180/Math.PI;};
		function Translate(matrix_mode,a,b,c) {
			handleMatrixError(matrix_mode);
			var trans_vec=[a,b,c];
			if(Array.isArray(a))trans_vec=a;
			for(var i=0;i<3;++i)if(typeof(trans_vec[i])!=typeof(0))trans_vec[i]=0;
			mat4.translate(TopMatrix(matrix_mode), trans_vec);
		}
		gl.Rotate=function(matrix_mode,angle,axis){
			handleMatrixError(matrix_mode);
			mat4.rotate(TopMatrix(matrix_mode), gl.degToRad(angle), axis);
		}
		function Scale(matrix_mode,a,b,c,d) {
			handleMatrixError(matrix_mode);
			var scale_vec=[a,b,c];
			if(typeof(a)==typeof(0)&&typeof(b)!=typeof(0)){
				mat4.scale(TopMatrix(matrix_mode), [a,a,a]);
				return;
			}
			if(Array.isArray(a))scale_vec=a;
			for(var i=0;i<3;++i)if(typeof(scale_vec[i])!=typeof(0))scale_vec[i]=1;
			mat4.scale(TopMatrix(matrix_mode), scale_vec);
			if(typeof(d)==typeof(0))TopMatrix(matrix_mode)[15]=d;
		}
		gl.checkMatrix=function(matrix_mode){return !((special_matrix_modes[matrix_mode]||{}).readOnly);};
		gl.uPerspective=function(matrix_mode,fovy,aspect,zNear,zFar){
			handleMatrixError(matrix_mode);
			if(matrix_mode=='projection')isOrthographic=false;
			mat4.perspective(fovy, aspect, zNear, zFar, TopMatrix(matrix_mode));
		}
		var isOrthographic=true;
		gl.uOrtho2D=function(matrix_mode,left,right,bottom,top){
			handleMatrixError(matrix_mode);
			if(matrix_mode=='projection')isOrthographic=true;
			mat4.ortho(left, right, bottom, top, -1, 1, TopMatrix(matrix_mode));
		}
		gl.uOrtho=function(matrix_mode,left,right,bottom,top,nearVal,farVal){
			handleMatrixError(matrix_mode);
			if(matrix_mode=='projection')isOrthographic=true;
			mat4.ortho(left, right, bottom, top, nearVal, farVal, TopMatrix(matrix_mode));
		}
		gl.MultMatrix=function(matrix_mode,matrix){
			handleMatrixError(matrix_mode);
			mat4.multiply(TopMatrix(matrix_mode), matrix);
		}
		gl.LoadMatrix=function(matrix_mode,matrix){
			handleMatrixError(matrix_mode);
			mat4.set(matrix, TopMatrix(matrix_mode));
		}
		gl.getMatrix=function(matrix_mode){
			handleMatrixError(matrix_mode,true);
			var temp_mat = mat4.create();
			mat4.set(TopMatrix(matrix_mode), temp_mat);
			return temp_mat;
		}
		gl.uLookAt=function(matrix_mode,eye,center,up){
			handleMatrixError(matrix_mode);
			mat4.lookAt(eye, center, up, TopMatrix(matrix_mode));
		}
		gl.LoadIdentity=function(matrix_mode,matrix){
			handleMatrixError(matrix_mode);
			mat4.identity(TopMatrix(matrix_mode));
		}

		gl.Normal=function(x,y,z){
			var norm=[x,y,z];
			if(Array.isArray(x))norm=x;
			for(var i=0;i<3;++i)if(typeof(norm[i])!=typeof(0))norm[i]=0;
			topAttributes.Normal=norm;
		}
		gl.Color=function(r,g,b,a){
			var color=[r,g,b,a];
			if(Array.isArray(r))color=r;
			if(typeof(r)==typeof('')){
				color=[];
				color.push(...gl.colorToRGBA(r));
			}
			for(var i=0;i<4;++i)if(typeof(color[i])!=typeof(0)){
				color[i]=0;
				if(i==3)color[i]=1;
			}
			topAttributes.Color=color;
		}
		gl.ColorSpace=function(param){
			var cSpace=param;
			if(param==gl.RGB || param==gl.RGBA)cSpace=0;
			else if(param==gl.CMYK)cSpace=1;
			else if(param==gl.HSV)cSpace=2;
			else cSpace=0;
			var curr_prog=gl.glGet(gl.CURRENT_PROGRAM);
			gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_color_space'), cSpace);
		}
		gl.FogCoord=(fogCoord)=>topAttributes.FogCoord[0]=Array.isArray(fogCoord)?fogCoord[0]:fogCoord;
		gl.TexCoord=function(s,t,p,q){
			var stpq=[s,t,p,q];
			if(Array.isArray(s))stpq=s;
			for(var i=0;i<4;++i)if(typeof(stpq[i])!=typeof(0))stpq[i]=0;
			topAttributes.TexCoord=stpq;
		}
gl.Get=function(parm){
	var result=null;
	if(parm==gl.CURRENT_NORMAL){
		result=[];
		topAttributes.Normal.map(function(val){result.push(val);});
	}else if(parm==gl.CURRENT_FOG_COORD){
		result=topAttributes.FogCoord[0];
	}else if(parm==gl.CURRENT_COLOR){
		result=[];
		topAttributes.Color.map(function(val){result.push(val);});
	}else if(parm==gl.CURRENT_PROGRAM){
		result=gl.glGet(gl.CURRENT_PROGRAM);
	}else if(parm==gl.CURRENT_TEXTURE_COORDS){
		result=[];
		topAttributes.TexCoord.map(function(val){result.push(val);});
	}else{
		result=gl.glGet(parm);
	}
	return result;
}
		
		/*
		*
		* texture mapping
		*
		*/
		var texture_2d_state=false;
		gl.enableTexture2D=function(){
			var curr_prog=gl.glGet(gl.CURRENT_PROGRAM);
			var curr_text=gl.glGet(gl.ACTIVE_TEXTURE);
			gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_texEnable2D'), true);
			gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_texSamplerTexture2D'), curr_text-gl.TEXTURE0);
			texture_2d_state=true;
		}
		gl.disableTexture2D=function(){
			var curr_prog=gl.glGet(gl.CURRENT_PROGRAM);
			gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_texEnable2D'), false);
			texture_2d_state=false;
		}
		gl.isEnabledTexture2D=function(){
			return !!texture_2d_state;
		}
		gl.bindSpecularMap=function(texture_id){
			var curr_prog=gl.glGet(gl.CURRENT_PROGRAM);
			var curr_text=gl.glGet(gl.ACTIVE_TEXTURE);
			if(typeof(texture_id)!=='undefined'){
				if(curr_text==gl.TEXTURE0)return;
				gl.bindTexture(gl.TEXTURE_2D,texture_id);
				gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_texSpecularMapEnable'), true);
				gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_texSpecularMapSampler'), curr_text-gl.TEXTURE0);
			}else gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_texSpecularMapEnable'), false);
		}
		gl.bindShinessMap=function(texture_id){
			var curr_prog=gl.glGet(gl.CURRENT_PROGRAM);
			var curr_text=gl.glGet(gl.ACTIVE_TEXTURE);
			if(typeof(texture_id)!=='undefined'){
				if(curr_text==gl.TEXTURE0)return;
				gl.bindTexture(gl.TEXTURE_2D,texture_id);
				gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_texShinessMapEnable'), true);
				gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_texShinessMapSampler'), curr_text-gl.TEXTURE0);
			}else gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_texShinessMapEnable'), false);
		}
		gl.bindBumpMap=function(texture_id){
			var curr_prog=gl.glGet(gl.CURRENT_PROGRAM);
			var curr_text=gl.glGet(gl.ACTIVE_TEXTURE);
			if(typeof(texture_id)!=='undefined'){
				if(curr_text==gl.TEXTURE0)return;
				gl.bindTexture(gl.TEXTURE_2D,texture_id);
				gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_texbumpMapEnable'), true);
				gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_texbumpMapSampler'), curr_text-gl.TEXTURE0);
			}else gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_texbumpMapEnable'), false);
		}
		gl.bindParallaxMap=function(texture_id,ParallaxStep,DepthScale){
			var curr_prog=gl.glGet(gl.CURRENT_PROGRAM);
			var curr_text=gl.glGet(gl.ACTIVE_TEXTURE);
			if(typeof(texture_id)!=='undefined'){
				if(curr_text==gl.TEXTURE0)return;
				gl.bindTexture(gl.TEXTURE_2D,texture_id);
				gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_texParallaxMapEnable'), true);
				gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_texParallaxMapSampler'), curr_text-gl.TEXTURE0);
				gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_texParallaxStep'), ParallaxStep?ParallaxStep:64);
				gl.uniform1f(gl.getUniformLocation(curr_prog,'_gl_texDepthScale'), DepthScale?DepthScale:0.01);
				gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_texParallaxMapEnable'), true);
			}else gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_texParallaxMapEnable'), false);
		}
		gl.bindEmissionMap=function(texture_id){
			var curr_prog=gl.glGet(gl.CURRENT_PROGRAM);
			var curr_text=gl.glGet(gl.ACTIVE_TEXTURE);

			if(typeof(texture_id)!=='undefined'){
				if(curr_text==gl.TEXTURE0)return;
				gl.bindTexture(gl.TEXTURE_2D,texture_id);
				gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_texEmissionMapEnable'), true);
				gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_texEmissionMapSampler'), curr_text-gl.TEXTURE0);
			}else gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_texEmissionMapEnable'), false);
		}

		/*
		*
		* lighting
		*
		*/
		function getLightID(param){
			var id=param,id_check=(typeof(id)!=typeof(0)?(id?id:''):id).toString();
			if(id_check.startsWith('light')){
				var checker=parseInt(id_check.substring(5,id_check.length));
				if(!Number.isNaN(checker))id=checker;
			}
			return id;
		}
		gl.enableLight=function(param){
			var curr_prog=gl.glGet(gl.CURRENT_PROGRAM);
			var id=getLightID(param);
			if(typeof(id)!=typeof(0)){
				gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_EnableLighting[0]'), true);
				glLightEnable=true;
				UpdateLighting(curr_prog);
				UpdateMaterial(curr_prog);
			}else{
				gl.uniform1i(gl.getUniformLocation(curr_prog,"_gl_EnableLighting["+(id+1)+"]"), true);
				if(!glLightEnable){
					UpdateLighting(curr_prog);
					UpdateMaterial(curr_prog);
				}
			}
		}
		gl.disableLight=function(param){
			var curr_prog=gl.glGet(gl.CURRENT_PROGRAM);
			var id=getLightID(param);
			if(typeof(id)!=typeof(0)){
				gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_EnableLighting[0]'), false);
				glLightEnable=false;
			}else gl.uniform1i(gl.getUniformLocation(curr_prog,"_gl_EnableLighting["+(id+1)+"]"), false);
		}
		gl.Light=function(light_id,pname,param){
			var curr_prog=gl.glGet(gl.CURRENT_PROGRAM);
			var light=getLightID(light_id);
			if(!light_sources_data[light])return;
			if(light_sources_data[light][pname]&&light_datatype[pname]){
				var norm_param=param;
				if(light_datatype[pname][0]==1){
					if(typeof(param)!=typeof(0))return;
					light_sources_data[light][pname]=param;
				}else{
					var arr_param=param;
					if(!Array.isArray(arr_param))arr_param=[param];
					for(var i=0; i<light_datatype[pname][0]; ++i)
						if(typeof(param[i])==typeof(0)){
							gl.console_log(i,param[i]);
						light_sources_data[light][pname][i]=param[i];
						}
				}
				gl.console_log(pname,curr_prog.gl_lightsUniform[light][pname],light_sources_data[light][pname]);
				gl[light_datatype[pname][1]](curr_prog.gl_lightsUniform[light][pname],light_sources_data[light][pname]);
			}
		}
		gl.Material=function(pname,param){
			var curr_prog=gl.glGet(gl.CURRENT_PROGRAM);
			if(material_data[pname]&&light_datatype[pname]){
				var norm_param=param;
				if(light_datatype[pname][0]==1){
					if(typeof(param)!=typeof(0))return;
					material_data[pname]=param;
				}else{
					var arr_param=param;
					if(!Array.isArray(arr_param))arr_param=[param];
					for(var i=0; i<light_datatype[pname][0]; ++i)
						if(typeof(param[i])==typeof(0))
							material_data[pname][i]=param[i];
				}
				gl[light_datatype[pname][1]](curr_prog.gl_materialUniform[pname],material_data[pname]);
			}
		}
		
		/*
		*
		* foggy effect
		*
		*/
		gl.Fog=function(pname,param){
			var curr_prog=gl.glGet(gl.CURRENT_PROGRAM);
			if(pname==gl.FOG_MODE){
				var mode_param=param;
				if(param==gl.LINEAR)mode_param=1;
				else if(param==gl.EXP)mode_param=2;
				else if(param==gl.EXP2)mode_param=3;
				gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_Fog_Data.type'), mode_param);
			}else if(pname==gl.FOG_DENSITY){
				gl.uniform1f(gl.getUniformLocation(curr_prog,'_gl_Fog_Data.density'), param);
			}else if(pname==gl.FOG_START){
				gl.uniform1f(gl.getUniformLocation(curr_prog,'_gl_Fog_Data.fstart'), param);
			}else if(pname==gl.FOG_END){
				gl.uniform1f(gl.getUniformLocation(curr_prog,'_gl_Fog_Data.fend'), param);
			}else if(pname==gl.FOG_INDEX){
				//??
			}else if(pname==gl.FOG_DEPTH_MODE){	
				 gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_Fog_Data.fend'), (param==gl.PLANE_BASED)?0:1);
			}else if(pname==gl.FOG_COLOR){
				gl.uniform4fv(gl.getUniformLocation(curr_prog,'_gl_Fog_Data.color'), param);
			}else if(pname==gl.FOG_COORD_SRC){
				gl.uniform1b(gl.getUniformLocation(curr_prog,'_gl_Fog_Data.fend'), (param==gl.FOG_COORD)?true:false);
			}
		}
		gl.enableFog=function(){
			var curr_prog=gl.glGet(gl.CURRENT_PROGRAM);
			gl.uniform1b(gl.getUniformLocation(curr_prog,'_gl_fog_enable'), true);
		}
		gl.disableFog=function(){
			var curr_prog=gl.glGet(gl.CURRENT_PROGRAM);
			gl.uniform1b(gl.getUniformLocation(curr_prog,'_gl_fog_enable'), false);
		}

		/*
		*
		* HTML controls
		*
		*/
		var DOMDepthTest=false;
		function swapNodes(a, b) {
			var aparent = a.parentNode;
			var asibling = a.nextSibling === b ? a : a.nextSibling;
			b.parentNode.insertBefore(a, b);
			aparent.insertBefore(b, asibling);
		}
		var zid_check_updater=10;
		function updateDOMDepth(){
			if(zid_check_updater>=0)return --zid_check_updater;
			var zid=parseInt(canvas.style.zIndex);
			if(DOMDepthTest){
				if(zid==-100){
					canvas.style.zIndex=100;
					mainContainer.style.zIndex=-100;
				}
			}else{
				if(zid==100){
					canvas.style.zIndex=-100;
					mainContainer.style.zIndex=100;
				}
			}
			
		}
		function enableDOMDepth(){
			if(!DOMDepthTest){
				canvas.style.zIndex=100;
				mainContainer.style.zIndex=-100;
			}
			DOMDepthTest=true;
		}
		function disableDOMDepth(){
			if(DOMDepthTest){
				canvas.style.zIndex=-100;
				mainContainer.style.zIndex=100;
			}
			DOMDepthTest=false;
		}
		gl.enableDOMDepth=enableDOMDepth;
		gl.disableDOMDepth=disableDOMDepth;
		function initGLHtmlContainer(){
			gl.controlHTML.style.overflow='hidden';


			mainContainer = document.createElement("div");
			mainContainer.style.width=canvas.clientWidth+'px';
			mainContainer.style.height=canvas.clientHeight+'px';
			mainContainer.style.position = 'absolute';
			mainContainer.style.overflow = 'hidden';
			canvas.parentNode.insertBefore(mainContainer, canvas);

			canvas.style.pointerEvents = 'none';
			gl.originalHTML.style.pointerEvents = 'none';
			mainContainer.style.pointerEvents = 'auto';

			htmlContainer = document.createElement("div");
			htmlContainer.style.width=canvas.clientWidth+'px';
			htmlContainer.style.height=canvas.clientHeight+'px';
			htmlContainer.style.overflow = 'hidden';
			mainContainer.appendChild(htmlContainer);
			
			cameraElement = document.createElement( 'div' );

			cameraElement.style.position='absolute';
			cameraElement.style.WebkitTransformStyle = 'preserve-3d';
			cameraElement.style.transformStyle = 'preserve-3d';
			cameraElement.style.pointerEvents = 'auto';
			cameraElement.style.transformOrigin= '-1px 1px';
			cameraElement.style.width= '100%';
			cameraElement.style.height= '100%';
			
			htmlContainer.appendChild( cameraElement );
			htmlContainer.style.pointerEvents = 'auto';
			raiseReshape(true);
			
gl.controlHTML.style.pointerEvents = 'none';
canvas.style.pointerEvents = 'auto';
gl.canvasHTML.style.pointerEvents = 'none';
			
		}
		var html_unit=100;
		var gl2html_unit=1/html_unit;
		function getObjectCSSMatrix( matrix, cameraCSSMatrix ) {
			return 'translate(-50%,-50%) matrix3d(' +
				epsilon( matrix[ 0 ] ) + ',' +
				epsilon( matrix[ 1 ] ) + ',' +
				epsilon( matrix[ 2 ] ) + ',' +
				epsilon( matrix[ 3 ] ) + ',' +
				epsilon( + matrix[ 4 ] ) + ',' +
				epsilon( + matrix[ 5 ] ) + ',' +
				epsilon( + matrix[ 6 ] ) + ',' +
				epsilon( + matrix[ 7 ] ) + ',' +
				epsilon( matrix[ 8 ] ) + ',' +
				epsilon( matrix[ 9 ] ) + ',' +
				epsilon( matrix[ 10 ] ) + ',' +
				epsilon( matrix[ 11 ] ) + ',' +
				epsilon( matrix[ 12 ] ) + ',' +
				epsilon( matrix[ 13 ] ) + ',' +
				epsilon( matrix[ 14 ] ) + ',' +
				epsilon( matrix[ 15 ] ) +
			')';
		}
		class DOMElement {
		  constructor(element,width,height) {
			this.height = height;
			this.width = width;
			this.element=element;
			var domE=document.createElement( 'div' );
			domE.style.position='absolute';
			domE.style.width=width;
			domE.style.height=height;
			domE.style.pointerEvents='auto';
			this.DomElement=domE;
			this.model=mat4.create();
			domE.appendChild(element);
		  }
		  updateModel(){
				var result = mat4.create();
				var result = mat4.create();
				var projection_matrix = mat4.create();
				
				gl.PushMatrix('model');
					mat4.scale(TopMatrix('model'),[gl2html_unit,-gl2html_unit,1]);
					//mat4.translate(TopMatrix('model'),[-this.width*0.5,-this.height*0.5,0]);
					mat4.set(TopMatrix('modelview'),this.model);
				gl.PopMatrix('model');
				
				mat4.set(TopMatrix('projection'),projection_matrix);
				projection_matrix[14]=-projection_matrix[14];//z-w flip
				mat4.multiply(projection_matrix, this.model, result);
				this.projection=result;
		  }
		  modelview(){
			  var modelview = mat4.create();
			  mat4.multiply(TopMatrix("view"), this.model, modelview);
			  return modelview;
		  }
		}
		function pushDOMElement(element,width,height){
			var index = -1;
			var ele;
			for(index=0;index<DOMList.length; ++index)if(DOMList[index].element===element)break;
			if(index>=DOMList.length){
				ele=new DOMElement(element,width,height);
				DOMList.push(ele);
			}else{
				ele=DOMList[index];
			}
			ele.updateModel();
			if(DOMScene.indexOf(ele)<0)DOMScene.push(ele);
		}
		function getDOMListElement(object){
			var index = DOMList.indexOf(object);
			if(index<0){
				DOMList.push(object);
				index=DOMList.length-1;
			}
			return DOMList[index];
		}
		var setFromMatrixPosition=function(vec,mat){
			vec.set(mat[12],mat[13],mat[14]);
		}
		var getDistanceToSquared = function () {
			var a = new Vector3();
			var b = new Vector3();
			return function ( object1 ) {
				a.set(0,0,0);
				setFromMatrixPosition(b, object1.modelview());

				return a.distanceToSquared( b );
			};
		}();
		function filterAndFlatten( scene ) {
			var result = [];
			for(i=0;i<scene.length; ++i){
				result.push( scene[i] );
			}
			return result;
		}

		function zOrder( scene ) {

			var sorted = filterAndFlatten( scene ).sort( function ( a, b ) {

				var distanceA = getDOMListElement( a ).distanceToCameraSquared;
				var distanceB = getDOMListElement( b ).distanceToCameraSquared;

				return distanceA - distanceB;

			} );

			var zMax = sorted.length;

			for ( var i = 0, l = sorted.length; i < l; i ++ ) {

				sorted[ i ].DomElement.style.zIndex = zMax - i;

			}

		}
		function setCSS(ele,prop,val){
			ele.style['Webkit'+prop] = val;
			ele.style[prop.toLowerCase()] = val;
		}
		function renderDOMObject( object, cameraCSSMatrix ) {
			var style;
			style = getObjectCSSMatrix( object.projection, cameraCSSMatrix );	
			var element = object.DomElement;
			var cachedObject = getDOMListElement(object);
			if ( cachedObject === undefined || cachedObject.style !== style ) {
				setCSS(element,'Transform',style);
				cachedObject.style = style;
				if ( is_ie ) {
					object.distanceToCameraSquared = getDistanceToSquared( object );
				}
				element.style.display='';
			}
			if(DOMDepthTest){
				var w_half=object.width*0.499;
				var h_half=object.height*0.499;
				gl.PushMatrix('model');
					mat4.set(object.model,TopMatrix('model'));
					var old_enable_blend=gl.glIsEnabled(gl.BLEND);
					var old_blend_src = gl.glGet(gl.BLEND_SRC_RGB);
					var old_blend_dst = gl.glGet(gl.BLEND_DST_RGB);
					var old_fillmode = fillmode;
					fillmode=gl.FILL;
					gl.glEnable(gl.BLEND);
					gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_ALPHA);
					gl.Begin(gl.QUADS);
						gl.Vertex(-w_half,-h_half);
						gl.Vertex(-w_half,h_half);
						gl.Vertex(w_half,h_half);
						gl.Vertex(w_half,-h_half);
					gl.End();
					fillmode=old_fillmode;
					if(!old_enable_blend)gl.glDisable(gl.BLEND);
					gl.blendFunc(old_blend_src, old_blend_dst);
				gl.PopMatrix('model');
			}
			if ( element.parentNode !== cameraElement ) {
				cameraElement.appendChild( element );
			}
		}
		function renderDOMElement(){
			var style = 'scale(' + (_widthHalf) + ',' + (-_heightHalf) + ')';
			if (DOMCameraCache.style !== style) {		
				setCSS(cameraElement,'Transform',style);
				DOMCameraCache.style = style;
			}
			for(var i=0; i<DOMList.length; ++i){
				DOMList[i].DomElement.style.display='none';
			}
			for(var i=0; i<DOMScene.length; ++i){
				renderDOMObject( DOMScene[i] );
			}
			if ( is_ie ) {

				// IE10 and 11 does not support 'preserve-3d'.
				// Thus, z-order in 3D will not work.
				// We have to calc z-order manually and set CSS z-index for IE.
				// FYI: z-index can't handle object intersection
				zOrder( DOMScene );

			}
			draw_DOMElement=true;
		}
		
		/*
		*
		* GLUT callback functions
		*
		*/
		gl.utGetFPS=function(){
			var timeNow = new Date().getTime();
			return 1000/last_frame_time;
		} 
		gl.utTimerFunc=function(msecs,func){
			var newtimer=new GLUT_Timer(msecs,func);
			for(var i=0; i<timer_list.length; ++i){
				if(timer_list[i].equalto(newtimer))return;
			}
			timer_list.push(newtimer);
		}
		gl.utPostRedisplay=function(){
			shouldReDraw=true;
		}
		gl.utMainLoop=function(){
			glut_looping=true;
			draw_completed=true;
			loopingFunc();
		}
		gl.utIsMainLoopRunning=function(){
			return !!glut_looping;
		}
		gl.utStopMainLoop=function(){
			glut_looping=false;
		}
		gl.utDisplayFunc=function(func){
			if(typeof(func)==typeof(function(){}))displayFunc=func;
		}
		gl.utIdleFunc=function(func){
			if(typeof(func)==typeof(function(){}))idleFunc=func;
		}
		gl.utReshapeFunc=function(func){
			if(typeof(func)==typeof(function(){})){
				reshapeFunc=func;
				reshapeFunc(canvas.clientWidth,canvas.clientHeight);
			}
		}
		gl.utVisibilityFunc=function(func){
			if(typeof(func)==typeof(function(){}))visibilityFunc=func;
		}
		gl.utPassiveMotionFunc=function(func){
			if(typeof(func)==typeof(function(){}))pMotionFunc=func;
		}
		gl.utMotionFunc=function(func){
			if(typeof(func)==typeof(function(){}))draggingFunc=func;
		}
		gl.utMouseFunc=function(func){
			if(typeof(func)==typeof(function(){}))mouseFunc=func;
		}

		/*
		*
		* Event handlers
		*
		*/
		function initHTMLEventHandlers(){
			initGLHtmlContainer();
			window.addEventListener('resize', function(){
				raiseReshape(false);
			});
			gl.controlHTML.addEventListener('mouseleave',function(e){mouseInside=false;});
			gl.controlHTML.addEventListener('mouseenter',function(e){mouseInside=true;});
			gl.controlHTML.addEventListener('mousedown', function(e){handleMousedown('mouse',e)});
			document.addEventListener('mousemove', function(e){handleMousemove('mouse',e,false)});
			gl.controlHTML.addEventListener('mousemove', function(e){handleMousemove('mouse',e,true)});
			document.addEventListener('mouseup', function handleMouseup(e) { isDragging = false;});
			gl.controlHTML.addEventListener('touchstart', function(e){handleMousedown('touch',e)});
			gl.controlHTML.addEventListener('touchmove', function(e){handleMousemove('touch',e,true)});
			gl.controlHTML.addEventListener('mouseup', function handleMouseup(e) { 
				isDragging = false;
				mouseFunc(e,gl.UT_UP,e.pageX,e.pageY);
			});
			document.addEventListener("visibilitychange", function() {
			  if (document.visibilityState === 'visible')visibility_state=true;
			  else visibility_state=false;
			  visibility_state_check();
			});
			window.addEventListener("pagehide", function(){
				visibility_state=false;
				visibility_state_check();
			}, false);
			window.addEventListener("pageshow", function(){
				visibility_state=true;
				visibility_state_check();
			}, false);
		}
		//visibility functions
		function raiseVisibilityFunc(new_visibility_state){
			randerPause=!new_visibility_state;
			visibilityFunc(new_visibility_state);
		}
		function visibility_state_check(){
			if(visibility_state!=old_visibility_state)raiseVisibilityFunc(visibility_state?gl.UT_VISIBLE:gl.UT_NOT_VISIBLE);
			old_visibility_state=visibility_state;
		}
		
		//tick functions
		class GLUT_Timer{
			constructor(msec,callback){
				this.triggerTime=msec;
				this.callback=callback;
				this.tick=0;
				if(typeof(this.callback)!==typeof(gl.UT_NULLFUNC)){
					this.callback=gl.UT_NULLFUNC;
				}
			}
			active(elapsed){
				this.tick+=elapsed;
				var total_elapsed=this.tick;
				if(this.tick>=this.triggerTime){
					this.tick=this.tick%Math.floor(this.triggerTime);
					this.callback(total_elapsed);
				}
			}
			equalto(timer){
				return this.triggerTime===timer.triggerTime && this.callback===timer.callback;
			}
		}
		function loopingAnimate() {
			var timeNow = new Date().getTime();
			if (lastTime != 0) {
			  var elapsed = timeNow - lastTime;
				for(var i=0; i<timer_list.length; ++i){
					timer_list[i].active(elapsed);
				}
			}
			lastTime = timeNow;
		}
		var loopfail_times=0;
		var loopingFunc=function(){
			if(aniProcess>=0){
				window.cancelAnimFrame(aniProcess);
				aniProcess=-1;
			}
			if(!glut_looping)return;
			if(draw_completed){
				draw_completed=false;
				draw_DOMElement=false;
				try{
					loopingAnimate();
					if(firstCall||!randerPause){
						if(check_resize())raiseReshape(false);
						updateDOMDepth();
						if(firstCall||shouldReDraw){
							var timeNow = new Date().getTime();
							displayFunc();
							shouldReDraw=false;
							last_frame_time=timeNow - last_draw_time;
							last_draw_time=timeNow;
						}
						if(DOMScene.length>0){
							renderDOMElement();
							DOMScene=[];
							draw_DOMElement=true;
						}
					}
					if(!draw_DOMElement)for(var i=0; i<DOMList.length; ++i){
						DOMList[i].DomElement.style.display='none';
					}		
					draw_completed=true;
					idleFunc();
					loopfail_times=0;
				}catch(ex_data){console_warn(ex_data);};
				firstCall=false;
			}else{
				console_warn(new Error("Draw not complete!"));
				gl_obj_state_reset();
				++loopfail_times;
				loopingAnimate();
				firstCall=false;
			}
			if(loopfail_times>max_warning){
				console.warn("Too many errors! glutMainLoop crashed!");
				window.cancelAnimFrame(aniProcess);
				glut_looping=false;
				return;
			}
			aniProcess=window.requestAnimFrame(loopingFunc);
		}
		
		//mouse functions
		function getMouseState(mouse_mode,e){
			var mouse_data = e;
			var mouseX='pageX';
			var mouseY='pageY';
			switch (mouse_mode) {
			  case 'touch':
				mouse_data=e.touches[0];
				mouseX='clientX';
				mouseY='clientY';
				break;
			  default:
			  case 'mouse':
				mouse_data=e;
				mouseX='pageX';
				mouseY='pageY';
				break;
			}
			return {data:mouse_data,X:mouseX,Y:mouseY};
		}
		var passTransparent_lock=0;
		function HTMLPassTransparent(mouseEventObj,eventType,flag){
			if(att_preserveDrawingBuffer){
				
				var MouseAtX=mouseEventObj.clientX-gl.controlHTML.offsetLeft;
				var MouseAtY=mouseEventObj.clientY-gl.controlHTML.offsetTop;
				var pixels = new Uint8Array(4);
				gl.readPixels(MouseAtX, gl.controlHTML.clientHeight-MouseAtY, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

				if(pixels[3]<1){
					//console.log("穿透!");
					canvas.style.zIndex=-100;
					mainContainer.style.zIndex=100;


	var ele = document.elementFromPoint(mouseEventObj.clientX, mouseEventObj.clientY);
	//try{
		if(ele==gl.controlHTML||ele==canvas){
			//console.log("糟糕，遞迴!!");
		}else{
			if(passTransparent_lock<32){
				//console.log("觸發傳遞",eventType);
				++passTransparent_lock;
				var evt = new MouseEvent(eventType, {
					clientX:mouseEventObj.clientX,
					clientY:mouseEventObj.clientY,
					button:mouseEventObj.button,
					buttons:mouseEventObj.buttons,
					bubbles: true,
					cancelable: true,
					view: window,
				});
				ele.dispatchEvent(evt);
				--passTransparent_lock;
			}

		}
	//}catch(m_ex){
	//	console.log("糟糕，壞掉!!");
	//}


				//canvas.style.zIndex=100;
				//mainContainer.style.zIndex=-100;

			
					if(zid_check_updater<0)zid_check_updater=5;
					return true;
				}
			}
			return false;
		}
		function handleMousedown(mouse_mode,e) {
			var mouse=getMouseState(mouse_mode,e);
			if(HTMLPassTransparent(e,(mouse_mode=='mouse')?'mousedown':'touchstart'))return;
			if(mouse_mode=='mouse')isDragging = true;
			lastMouseX = mouse.data[mouse.X];
			lastMouseY = mouse.data[mouse.Y];
			mouseFunc(e,gl.UT_DOWN,lastMouseX,lastMouseY);
		}
		function mouseIsInside(x,y){
			return x>=0 && x <=_width && y>=0 && y <=_width 
		}
		function raisePMotionFunc(PMX,PMY){
			if(Math.abs(oldPMX-PMX)>1 && Math.abs(oldPMY-PMY)>1){
				pMotionFunc(PMX,PMY);
				oldPMX=PMX;
				oldPMY=PMY;
			}
		}
		function raiseDraggingFunc(DMX,DMY){
			if(Math.abs(oldDMX-DMX)>1 && Math.abs(oldDMY-DMY)>1){
				draggingFunc(DMX,DMY,DMX-oldDMX,DMY-oldDMY);
				oldDMX=DMX;
				oldDMY=DMY;
			}
		}
		function handleMousemove(mouse_mode,e,local) {
			var mouse=getMouseState(mouse_mode,e);
			MouseAtX=e.clientX-gl.controlHTML.offsetLeft;
			MouseAtY=e.clientY-gl.controlHTML.offsetTop;
			if(local){
				if(!mouseInside)return;
				if(!(mouseIsInside(e.clientX-gl.controlHTML.offsetLeft,e.clientY-gl.controlHTML.offsetTop)))return;
				//if(HTMLPassTransparent(e,(mouse_mode=='mouse')?'mousemove':'touchmove'))return;
				if(mouse_mode!='touch')raisePMotionFunc(mouse.data[mouse.X],mouse.data[mouse.Y]);
			}else{
				if (isDragging || mouse_mode=='touch') {
					if(mouse_mode=='touch')e.preventDefault();
					var newX = mouse.data[mouse.X];
					var newY = mouse.data[mouse.Y];

					raiseDraggingFunc(newX,newY);

					lastMouseX = newX
					lastMouseY = newY;
				}
			}
		}
		
		//reshape functions
		function check_resize(){
			return Math.abs(DOMDrawareaCache.width-gl.controlHTML.clientWidth)>1.5 || Math.abs(DOMDrawareaCache.height-gl.controlHTML.clientHeight);
		}
		function raiseReshape(size_init){
			_width = gl.controlHTML.clientWidth;
			_height = gl.controlHTML.clientHeight;
			_widthHalf = _width / 2;
			_heightHalf = _height / 2;
			if(check_resize()){
				if(!size_init)reshapeFunc(_width,_height);
				gl.originalHTML.style.width=_width+'px';
				gl.originalHTML.style.height=_height+'px';
				mainContainer.style.width=_width+'px';
				mainContainer.style.height=_height+'px';
				htmlContainer.style.width=_width+'px';
				htmlContainer.style.height=_height+'px';
gl.canvasHTML.style.width=_width+'px';
gl.canvasHTML.style.height=_height+'px';
				DOMDrawareaCache.width=_width;
				DOMDrawareaCache.height=_height;
			}
		}

		return preinitGLUT();
	}
	return {
	  create3DContext: create3DContext,
	  setupWebGL: setupWebGL,
	  setupGLUT: setupGLUT
	};
}();