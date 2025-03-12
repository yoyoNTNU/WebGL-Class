var trim_regexp=/^[\s\uFEFF\xA0\n\r]+|[\s\uFEFF\xA0\n\r]+$/g;
var include_regexp=[/#([Ii][Nn][Cc][Ll][Uu][Dd][Ee]|[Ii][Mm][Pp][Oo][Rr][Tt])\s+<([^>]+)>[\n\r]+/,/#([Ii][Nn][Cc][Ll][Uu][Dd][Ee]|[Ii][Mm][Pp][Oo][Rr][Tt])\s+(["'][^\n\r]+)[\n\r]+/];
var code_cache={};
function _checkNULL(val){return (typeof(val)===typeof(({})[0]))||(val==null);};
function _argInit(arg,init_val){return _checkNULL(arg)?init_val:arg;};
var built_in_attribute=[
'gl_Vertex',
'gl_Normal',
'gl_Color',
'gl_TexCoord',
'gl_FogCoord'];

var built_in_attribute_list = [
'Vertex',
'Normal',
'Color',
'TexCoord',
'FogCoord'];
var built_in_attributes = {
'Vertex':['gl_Vertex',4],
'Normal':['gl_Normal',3],
'Color':['gl_Color',4],
'TexCoord':['gl_TexCoord',4],
'FogCoord':['gl_FogCoord',1],};
var built_in_uniform=[
'gl_ModelMatrix',
'gl_ViewMatrix',
'gl_ProjectMatrix',
'gl_ModelViewMatrix',
'gl_ModelViewProjectMatrix',
'gl_NormalMatrix',
'gl_ColorMatrix',
'gl_TextureMatrix'];
var built_in_matrix_modes_list = ['model','view','projection','modelview','modelviewprojection','normal','color','texture'];
var built_in_matrix_modes = {
'model':['gl_ModelMatrix','uniformMatrix4fv'],
'view':['gl_ViewMatrix','uniformMatrix4fv'],
'projection':['gl_ProjectMatrix','uniformMatrix4fv'],
'modelview':['gl_ModelViewMatrix','uniformMatrix4fv'],
'modelviewprojection':['gl_ModelViewProjectMatrix','uniformMatrix4fv'],
'normal':['gl_NormalMatrix','uniformMatrix3fv'],
'color':['gl_ColorMatrix','uniformMatrix4fv'],
'texture':['gl_TextureMatrix','uniformMatrix4fv'],
};
var matrix_modes = [
"model",
"view",
"projection",
"color",
"texture",
];

/*

//vertex shader

	uniform vec4 gl_vertex_uniform;
	uniform vec3 gl_normal_uniform;
	uniform lowp int gl_color_shading_mode;
	varying vec4 gl_lightW;
	varying vec4 viewSpace;

	void main(void) {
		gl_lightingDefault=0.0;
		viewSpace = ftransform();
		gl_Position = viewSpace;
		gl_lightW=vec4(1.0,1.0,1.0,1.0);
		vec3 pre_normal = gl_normal;
		if(gl_color_shading_mode>0){
			if(gl_color_shading_mode==2){
				vec4 eyeP = gl_ModelViewMatrix * gl_vertex_uniform;
				gl_ViewingVec = -eyeP.xyz;
				if(gl_EnableLighting[0]){
					for(int i=0; i<MAX_LIGHT; ++i){
						if(gl_EnableLighting[i+1]){
							vec4 eyeL = gl_ViewMatrix * gl_BaseLights[i].position;
							gl_LightingVec[i] = (eyeL - eyeP).xyz ;
						}
					}
				}
				pre_normal=gl_normal_uniform;
			}
			vec4 preColor = vec4(1.0,1.0,1.0,1.0);
			gl_lightW=vec4(gl_LightBlinnPhong(gl_ViewingVec,
				gl_NormalMatrix*pre_normal,vec3(1.0,1.0,1.0),
				vec3(1.0,1.0,1.0),vec3(0.0,0.0,0.0),vec3(0.0,0.0,0.0),1.0
			),1.0);
		}
	}

//fragment shader



*/

var glBuiltInShaderCode={vertex:'uniform vec4 gl_vertex_uniform;uniform vec3 gl_normal_uniform;uniform lowp int gl_color_shading_mode;varying vec4 gl_lightW;varying vec4 viewSpace;\nvoid main(void){\nvec3 lz=vec3(0.0,0.0,0.0),l1=vec3(1.0,1.0,1.0);gl_lightingDefault=0.0;viewSpace=ftransform();gl_Position=viewSpace;gl_lightW=vec4(1.0,1.0,1.0,1.0);vec3 pn=gl_normal;if(gl_color_shading_mode>0){if(gl_color_shading_mode==2){vec4 ep=gl_ModelViewMatrix*gl_vertex_uniform;gl_ViewingVec=-ep.xyz;if(gl_EnableLighting[0]){for(int i=0;i<MAX_LIGHT;++i){if(gl_EnableLighting[i+1]){vec4 el=gl_ViewMatrix*gl_BaseLights[i].position;gl_LightingVec[i]= (el-ep).xyz;}}}pn=gl_normal_uniform;}gl_lightW=vec4(gl_LightBlinnPhong(gl_ViewingVec,gl_NormalMatrix*pn,l1,l1,lz,lz,1.0),1.0);}}',fragment:'#extension GL_EXT_shader_texture_lod : enable\n#extension GL_OES_standard_derivatives : enable\n'+'vy V4 gl_lightW;vy V4 viewSpace;uf sm2 gl_texSpecularMapSampler;uf sm2 gl_texShinessMapSampler;uf sm2 gl_texbumpMapSampler;uf sm2 gl_texParallaxMapSampler;uf sm2 gl_texEmissionMapSampler;uf bool gl_texSpecularMapEnable;uf bool gl_texShinessMapEnable;uf bool gl_texbumpMapEnable;uf bool gl_texParallaxMapEnable;uf bool gl_texEmissionMapEnable;uf highp int gl_texParallaxStep;uf VF gl_texDepthScale;uf highp int gl_texAlphaFunc;uf VF gl_texAlphaTestVal;uf V4 gl_vertex_uf;uf V3 gl_normal_uf;uf lowp int gl_color_shading_mode;uf gl_Fog gl_Fog_Data;uf bool gl_fog_coord_src;uf bool gl_fog_enable;uf int gl_color_space;mat3 cotangent_frame(V3 N,V3 p,V2 uv){V3 dp1=dFdx(p);V3 dp2=dFdy(p);V2 duv1=dFdx(uv);V2 duv2=dFdy(uv);V3 dp2perp=cross(dp2,N);V3 dp1perp=cross(N,dp1);V3 T=dp2perp*duv1.x+dp1perp*duv2.x;V3 B=dp2perp*duv1.y+dp1perp*duv2.y;VF invmax=inversesqrt(max(dot(T,T),dot(B,B)) );return mat3(T*invmax,B*invmax,N);}V2 parallax_uv(sm2 tex_depth,V2 uv,V3 view_dir,int num_layers,VF depth_scale){VF layer_depth=1.0/VF(num_layers);VF cur_layer_depth=0.0;V2 delta_uv=view_dir.xy*depth_scale/(view_dir.z*VF(num_layers));V2 cur_uv=uv;VF depth_from_tex=tx2(tex_depth,cur_uv).r;for(int i=0;i<127;i++){if(i>=num_layers)break;cur_layer_depth+=layer_depth;cur_uv-=delta_uv;depth_from_tex=tx2(tex_depth,cur_uv).r;if(depth_from_tex<cur_layer_depth)break;}V2 prev_uv=cur_uv+delta_uv;VF next=depth_from_tex-cur_layer_depth;VF prev=tx2(tex_depth,prev_uv).r-cur_layer_depth+layer_depth;VF weight=next/(next-prev);return mix(cur_uv,prev_uv,weight);}V3 _hsv2rgb(V3 c){V4 K=V4(1.0,2.0/3.0,1.0/3.0,3.0);V3 p=abs(fract(c.xxx+K.xyz)*6.0-K.www);return c.z*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),c.y);}V3 _CMYK2RGB(V4 cmyk){VF c=cmyk.x;VF m=cmyk.y;VF y=cmyk.z;VF k=cmyk.w;VF invK=1.0-k;VF r=1.0-min(1.0,c*invK+k);VF g=1.0-min(1.0,m*invK+k);VF b=1.0-min(1.0,y*invK+k);return clamp(V3(r,g,b),0.0,1.0);}V4 _getRGB(V4 in_color){if(gl_color_space==0)return in_color;if(gl_color_space==1)return V4(_CMYK2RGB(in_color),1.0);if(gl_color_space==2)return V4(_hsv2rgb(in_color.xyz),in_color.w);return in_color;}\nvoid main(void){\nmat3 lTangentMatrix=mat3(1.0);V2 lTextureCoord=gl_TexCoord.st;if(gl_texParallaxMapEnable)lTextureCoord=parallax_uv(gl_texParallaxMapSampler,gl_TexCoord.st,-gl_ViewingVec.xyz,gl_texParallaxStep,gl_texDepthScale);V4 transf_color=_getRGB(gl_ColorMatrix*gl_color);V4 texel=transf_color;if(gl_texEnable2D)texel=tx2(gl_texSamplerTexture2D,lTextureCoord);V3 pixel=texel.rgb;V3 Normal=gl_NormalMatrix*gl_normal;if(gl_color_shading_mode>0){pixel=texel.rgb*gl_lightW.rgb;}else{lTangentMatrix=cotangent_frame(Normal,-gl_ViewingVec,lTextureCoord);if(gl_texParallaxMapEnable){mat3 tbn=transpose(lTangentMatrix);lTextureCoord=parallax_uv(gl_texParallaxMapSampler,gl_TexCoord.st,normalize(tbn*(-gl_ViewingVec)),gl_texParallaxStep,gl_texDepthScale);lTangentMatrix=cotangent_frame(Normal,-gl_ViewingVec,lTextureCoord);if(gl_texEnable2D)texel=tx2(gl_texSamplerTexture2D,lTextureCoord);}V3 normal_texel=tx2(gl_texbumpMapSampler,lTextureCoord).xyz;normal_texel=normal_texel*255./127.-128./127.;if(gl_texbumpMapEnable){normal_texel.y=-normal_texel.y;Normal=lTangentMatrix*normal_texel;}Normal=normalize(Normal);V3 emission=V3(0.0,0.0,0.0);if(gl_texEmissionMapEnable){emission=tx2(gl_texEmissionMapSampler,lTextureCoord).rgb;}VF shiness=1.0;if(gl_texShinessMapEnable){shiness=tx2(gl_texShinessMapSampler,lTextureCoord).r;}V3 specular=V3(0.0,0.0,0.0);if(gl_texSpecularMapEnable){specular=tx2(gl_texSpecularMapSampler,lTextureCoord).rgb;}pixel=gl_LightBlinnPhong(gl_ViewingVec,Normal,texel.rgb,V3(1.0,1.0,1.0),specular,emission,shiness);}V4 preFragColor=V4(pixel,transf_color.a*texel.a);V4 fog_color=_getRGB(gl_Fog_Data.color);V4 finalColor=V4(0.0,0.0,0.0,transf_color.a);VF dist=0.0;VF fogFactor=0.0;if(gl_Fog_Data.depthType==gl_FOG_PLANE_BASED){dist=abs(viewSpace.z);if(gl_fog_coord_src)dist=gl_FogFragCoord;}else{dist=length(viewSpace);}if(gl_Fog_Data.type==gl_FOG_NONE||gl_fog_enable==false){finalColor=preFragColor;}if(gl_Fog_Data.type==gl_FOG_LINEAR){fogFactor=(gl_Fog_Data.fstart-dist)/(gl_Fog_Data.fstart-gl_Fog_Data.fend);fogFactor=clamp(fogFactor,0.0,1.0);finalColor=mix(fog_color,preFragColor,fogFactor);}else if(gl_Fog_Data.type==gl_FOG_EXPONENTIAL){fogFactor=1.0/exp(dist*gl_Fog_Data.density);fogFactor=clamp(fogFactor,0.0,1.0);finalColor=mix(fog_color,preFragColor,fogFactor);}else if(gl_Fog_Data.type==gl_FOG_EXPONENTIAL_SQUARE){fogFactor=1.0/exp((dist*gl_Fog_Data.density)*(dist*gl_Fog_Data.density));fogFactor=clamp(fogFactor,0.0,1.0);finalColor=mix(fog_color,preFragColor,fogFactor);}if(gl_texAlphaFunc>0){if(gl_texAlphaFunc==1){discard;}if(gl_texAlphaFunc==2){if(finalColor.a<gl_texAlphaTestVal)discard;}if(gl_texAlphaFunc==3){if(finalColor.a==gl_texAlphaTestVal)discard;}if(gl_texAlphaFunc==4){if(finalColor.a<=gl_texAlphaTestVal)discard;}if(gl_texAlphaFunc==5){if(finalColor.a>gl_texAlphaTestVal)discard;}if(gl_texAlphaFunc==6){if(finalColor.a!=gl_texAlphaTestVal)discard;}if(gl_texAlphaFunc==7){if(finalColor.a>=gl_texAlphaTestVal)discard;}if(finalColor.a<gl_texAlphaTestVal)discard;}gl_FragColor=clamp(finalColor,0.0,1.0);}'.replace(/uf/g,'uniform').replace(/sm2/g,'sampler2D').replace(/tx2/g,'texture2D').replace(/V(\d)/g,'vec$1').replace(/VF/g,'float').replace(/vy/g,'varying')};

var ObjLayout;
function initGLUT(gl) {
	function getPowerOfTwo(value, pow) {
		var pow = pow || 1;
		while(pow<value) {
			pow *= 2;
		}
		return pow;
	}
	var canvasTexture = gl.createTexture();
	canvasTexture.canvas = document.createElement('canvas');
	canvasTexture.ctx = canvasTexture.canvas.getContext('2d');

	//document.body.appendChild(canvasTexture.canvas);
	var canvasColorT = document.createElement('canvas');
	canvasColorT.height = 1;
	canvasColorT.width = 1;
	var canvasColorC = canvasColorT.getContext('2d');
	function colorToRGBA(color) {
		canvasColorC.fillStyle = color;
		canvasColorC.fillRect(0, 0, 1, 1);
		var result=[];
		return canvasColorC.getImageData(0, 0, 1, 1).data.map(x=>result.push(x/255.0));
	}
	gl.colorToRGBA=colorToRGBA;
	function measureText(ctx, textToMeasure) {
		return ctx.measureText(textToMeasure).width;
	}
	function handleLoadedCanvasTexture(in_canvas) {
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

		gl.bindTexture(gl.TEXTURE_2D, in_canvas);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, in_canvas.canvas); // This is the important line!
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
		gl.generateMipmap(gl.TEXTURE_2D);
	}
	function createMultilineText(ctx, textToWrite, maxWidth, text) {
		textToWrite = textToWrite.replace("\n"," ");
		var currentText = textToWrite;
		var futureText;
		var subWidth = 0;
		var maxLineWidth = 0;

		var wordArray = textToWrite.split(" ");
		var wordsInCurrent, wordArrayLength;
		wordsInCurrent = wordArrayLength = wordArray.length;

		// Reduce currentText until it is less than maxWidth or is a single word
		// futureText var keeps track of text not yet written to a text line
		while (measureText(ctx, currentText) > maxWidth && wordsInCurrent > 1) {
			wordsInCurrent--;
			var linebreak = false;

			currentText = futureText = "";
			for(var i = 0; i < wordArrayLength; i++) {
				if (i < wordsInCurrent) {
					currentText += wordArray[i];
					if (i+1 < wordsInCurrent) { currentText += " "; }
				}
				else {
					futureText += wordArray[i];
					if(i+1 < wordArrayLength) { futureText += " "; }
				}
			}
		}
		text.push(currentText); // Write this line of text to the array
		maxLineWidth = measureText(ctx, currentText);

		// If there is any text left to be written call the function again
		if(futureText) {
			subWidth = createMultilineText(ctx, futureText, maxWidth, text);
			if (subWidth > maxLineWidth) {
				maxLineWidth = subWidth;
			}
		}

		// Return the maximum line width
		return maxLineWidth;
	}
	function drawText(textToWrite, mWidth, squareTexture, textHeight, textAlignment, textColour, fontFamily, backgroundColour, output_data) {
			var canvasX, canvasY;
			var textX, textY;
			if(_checkNULL(output_data))output_data={};
			var text = [];


			var maxWidth = parseInt(mWidth, 10);

			canvasTexture.ctx.font = textHeight+"px "+fontFamily;
			var real_width=maxWidth;
			if (maxWidth && measureText(canvasTexture.ctx, textToWrite) > maxWidth ) {
				maxWidth = createMultilineText(canvasTexture.ctx, textToWrite, maxWidth, text);
				real_width=maxWidth;
				canvasX = getPowerOfTwo(maxWidth);
			} else {
				text.push(textToWrite);
				real_width=canvasTexture.ctx.measureText(textToWrite).width;
				canvasX = getPowerOfTwo(real_width);
			}
			//console.log(text.length+1);
			//console.log(textHeight);
			//console.log(canvasTexture.ctx.measureText(textToWrite).width);
			canvasY = getPowerOfTwo(textHeight*(text.length+1));
			if(squareTexture) {
				(canvasX > canvasY) ? canvasY = canvasX : canvasX = canvasY;
			}

			canvasTexture.canvas.width = canvasX;
			canvasTexture.canvas.height = canvasY;
			output_data.TextWidth=real_width;
			output_data.TextHeight=textHeight*(text.length+0.2);
			output_data.width=canvasX;
			output_data.height=canvasY;
			switch(textAlignment) {
				case "left":
					textX = 0;
					break;
				case "center":
					textX = canvasX/2;
					break;
				case "right":
					textX = canvasX;
					break;
				default:
					textX = canvasX/2;
					break;
			}
			textY = canvasY/2;

			canvasTexture.ctx.fillStyle = backgroundColour;
			canvasTexture.ctx.fillRect(0, 0, canvasTexture.ctx.canvas.width, canvasTexture.ctx.canvas.height);

			canvasTexture.ctx.fillStyle = textColour;
			canvasTexture.ctx.textAlign = textAlignment;

			canvasTexture.ctx.textBaseline = 'middle'; // top, middle, bottom
			canvasTexture.ctx.font = textHeight+"px "+fontFamily;

			var offset = (canvasY - textHeight*(text.length+1)) * 0.5;

			for(var i = 0; i < text.length; i++) {
				if(text.length > 1) {
					textY = (i+1)*textHeight + offset;
				}
				canvasTexture.ctx.fillText(text[i], textX,  textY);
			}
		}
	var cache_text={
		text:"",
		text_data:{},
	};
	gl.utBitmapCharacters=function(font, characters, charHeight, charColour, mWidth, resm){
		var maxWidth=(typeof(mWidth)==typeof(0))?mWidth:512;
		var textHeight=(typeof(charHeight)==typeof(0))?charHeight:128;
		var textColour=charColour?charColour:'#000';
		var draw_font=font;
		if(typeof(font)==typeof('')){
			if(font.toString().replace(trim_regexp,'')=='')draw_font='monospace';
		}else draw_font='monospace';
		var output_data={};
		var res=resm||4;
		var inv_res = 1/res;
		if(cache_text.text!=characters){
			drawText(characters, maxWidth*res, false, textHeight*res, 'center', textColour, draw_font, 'transparent',output_data);
			handleLoadedCanvasTexture(canvasTexture);
			cache_text.text=characters;
			cache_text.output_data=output_data;
		}else{
			output_data=cache_text.output_data;
		}
		gl.bindTexture(gl.TEXTURE_2D, canvasTexture);
		var full_width = 0.5/output_data.width;
		var t_left = full_width*(output_data.width-output_data.TextWidth);
		var t_right = full_width*(output_data.width+output_data.TextWidth);
		var t_width = output_data.TextWidth*0.01*inv_res;
		var full_height = 0.5/output_data.height;
		var t_bottom = full_height*(output_data.height-output_data.TextHeight);
		var t_top = full_height*(output_data.height+output_data.TextHeight);
		var t_height = output_data.TextHeight*0.01*inv_res;

		var tmp_texture=gl.isEnabledTexture2D(gl.TEXTURE_2D);
		var tmp_alphaid=old_alphaid;
		var tmp_alpharef=old_alpharef;
		var tmp_enable_blend=gl.glIsEnabled(gl.BLEND);
		var tmp_blend_src = gl.glGet(gl.BLEND_SRC_RGB);
		var tmp_blend_dst = gl.glGet(gl.BLEND_DST_RGB);
		gl.enableTexture2D();
		gl.glEnable(gl.BLEND);
		gl.AlphaFunc(gl.LESS,1e-4);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		gl.Begin(gl.QUADS);
			gl.TexCoord(t_left,t_bottom);
			gl.Color(1,1,1,1);
			gl.Normal(0,0,1);
			gl.Vertex(0,0,0);
			
			gl.TexCoord(t_right,t_bottom);
			gl.Vertex(t_width,0,0);
			
			gl.TexCoord(t_right,t_top);
			gl.Vertex(t_width,t_height,0);
			
			gl.TexCoord(t_left,t_top);
			gl.Vertex(0,t_height,0);
		gl.End();
		gl.AlphaFunc(tmp_alphaid, tmp_alpharef);
		gl.blendFunc(tmp_blend_src, tmp_blend_dst);
		if(!tmp_enable_blend)gl.glDisable(gl.BLEND);
		if(!tmp_texture)gl.disableTexture2D();
	}
var old_alphaid=gl.ALWAYS;
var old_alpharef=0;
gl.AlphaFunc=function(func,ref){
	if(typeof(ref)!=typeof(0))return;
	var curr_prog=gl.glGet(gl.CURRENT_PROGRAM);
	var func_id=0;
	switch (func) {
	  case gl.NEVER:
		func_id=1;
		break;
	  case gl.LESS:
		func_id=2;
		break;
	  case gl.EQUAL:
		func_id=3;
		break;
	  case gl.LEQUAL:
		func_id=4;
		break;
	  case gl.GREATER:
		func_id=5;
		break;
	  case gl.NOTEQUAL:
		func_id=6;
		break;
	  case gl.GEQUAL:
		func_id=7;
		break;
	  case gl.ALWAYS:
	  default:
		func_id=0;
	}
	gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_texAlphaFunc'), func_id);
	gl.uniform1f(gl.getUniformLocation(curr_prog,'_gl_texAlphaTestVal'), ref);
	old_alphaid=func;
	old_alpharef=ref;
}

	function textureSphere(position)
	{
		var texcoord={s:position[0],t:position[1],p:position[2],}
		var s_rad=0.5*(Math.atan2(texcoord.s, texcoord.p)+1.5*3.141592653589793238)/3.141592653589793238;
		var t_rad=(Math.atan2(texcoord.t, Math.sqrt(texcoord.s*texcoord.s+texcoord.p*texcoord.p))+0.5*3.141592653589793238)/3.141592653589793238;
		return [s_rad,t_rad];
	}
	function vec_m(a,b){
		return [b[0]-a[0],b[1]-a[1],b[2]-a[2]];
	}
	function vec_x(a,b){
		return [(a[1] * b[2] - a[2] * b[1]), (a[2] * b[0] - a[0] * b[2]), (a[0] * b[1] - a[1] * b[0])];
	}
	function new_texture(a){
		return [a[0],a[1],0,1];
	}
	function new_vex(a){
		return [a[0],a[1],a[2],1];
	}
	function decode_shape(shape_obj){
		var sqrt=Math.sqrt;
		var cbrt=Math.cbrt;
		var pow=Math.pow;
		var phi=(1 + sqrt(5)) / 2;
		var x=cbrt((phi + sqrt(phi-5/27))/2) + cbrt((phi - sqrt(phi-5/27))/2);
		
		var C=eval(shape_obj.c);
		var V=eval(shape_obj.v.replace(/(c)(\d+)/ig,'$1[$2]'));
		var T=[...new Array(V.length)].map((_,i)=>textureSphere(V[i]));
		var F=eval(shape_obj.f);
		var result={};
		var it=0;
		result.vertexPositions=[];
		result.vertexNormals=[];
		result.vertexTextureCoords=[];
		result.wireIndices=[];
		var push_vertex=function(f_i,v_i){
			var base_vex = V[F[f_i][0]];
			var vex1 = V[F[f_i][v_i]];
			var vex2 = V[F[f_i][v_i+1]];
			var base_tex = T[F[f_i][0]];
			var tex1 = T[F[f_i][v_i]];
			var tex2 = T[F[f_i][v_i+1]];
			var vec1 = vec_m(vex1,base_vex);
			var vec2 = vec_m(vex1,vex2);
			var norm = vec_x(vec2,vec1);
			//norm=norm.concat(norm).concat(norm);
			norm.push(...norm.concat(norm));
			base_vex=new_vex(base_vex);
			vex1=new_vex(vex1);
			vex2=new_vex(vex2);
			base_tex=new_texture(base_tex);
			tex1=new_texture(tex1);
			tex2=new_texture(tex2);
			var vex=base_vex.concat(vex1).concat(vex2);
			var tex=base_tex.concat(tex1).concat(tex2);
			result.vertexPositions=result.vertexPositions.concat(vex);
			result.vertexNormals=result.vertexNormals.concat(norm);
			result.vertexTextureCoords=result.vertexTextureCoords.concat(tex);
			it+=3;
		}
		for(var i=0; i<F.length; ++i){
			var start_it=it;
			result.wireIndices.push(it);
			result.wireIndices.push(it+1);
			for(var j=1; j<F[i].length-1; ++j){
				push_vertex(i,j);
				result.wireIndices.push(it-2);
				result.wireIndices.push(it-1);
			}
			result.wireIndices.push(it-1);
			result.wireIndices.push(start_it);
		}
		return result;
	}
	
	geoData=JSON.parse(new TextDecoder("utf-8").decode((new Zlib.Gunzip(new Uint8Array(atob(geomByte).split('').map(function(x){return x.charCodeAt(0);})))).decompress()));

	var geoShapes={};
	Object.keys(geoData).map(function(objectKey, index) {
		var shape_it=geoData[objectKey];
		if(typeof(shape_it.c)==typeof(""))
			geoShapes[objectKey]=decode_shape(shape_it);
	});
	//console.log(geoShapes);
	
	teapotData=JSON.parse(new TextDecoder("utf-8").decode((new Zlib.Gunzip(new Uint8Array(atob(teapotByte).split('').map(function(x){return x.charCodeAt(0);})))).decompress()));
	ObjLayout = new OBJ.Layout(
        OBJ.Layout.POSITION4,
        OBJ.Layout.NORMAL,
        OBJ.Layout.DIFFUSE,
        OBJ.Layout.UV4,
        OBJ.Layout.SPECULAR,
        OBJ.Layout.SPECULAR_EXPONENT
      );

	function initObjMesh(mesh){
		// Create the vertex buffer for this mesh
        var data_vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, data_vertexBuffer);
        var vertexData = mesh.makeBufferData(ObjLayout);
        gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);
        data_vertexBuffer.numItems = vertexData.numItems;
        data_vertexBuffer.layout = ObjLayout;
        mesh.vertexBuffer = data_vertexBuffer;

        mesh.texture_buffer = [];
		mesh.material_buffer = [];
		for (var i=0; i<mesh.indicesPerMaterial.length; ++i){
			// Create the index buffer for this mesh
			var tex_index = i;
			var indexBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
			var indexData = mesh.makeIndexBufferDataForMaterials(i);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexData, gl.STATIC_DRAW);
			indexBuffer.numItems = indexData.numItems;
			mesh.material_buffer[i] = indexBuffer;
			if(!(mesh.materialsByIndex[tex_index].mapDiffuse)) continue;
			mesh.texture_buffer[tex_index] = gl.createTexture();
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

			gl.bindTexture(gl.TEXTURE_2D, mesh.texture_buffer[tex_index]);

			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mesh.materialsByIndex[tex_index].mapDiffuse.texture);

			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
			gl.generateMipmap(gl.TEXTURE_2D);

			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}
	
    function drawObjModel(mesh){
		var curr_prog=gl.glGet(gl.CURRENT_PROGRAM);
		gl.setMatrixUniforms(curr_prog);
		gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_ObjDrawing'), true);
		
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);
		curr_prog.applyAttributePointers(mesh);

        for (var i=0; i< mesh.indicesPerMaterial.length ; ++i){
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, mesh.texture_buffer[i]);
			
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.material_buffer[i]);
			/*gl.drawElements(
				gl.TRIANGLES,
				mesh.material_buffer[i].numItems,
				gl.UNSIGNED_SHORT,
				0
			);*/

			var cur_smode = gl.getShadeModel();
			if(cur_smode==gl.FLAT)gl.ShadeModel(gl.SMOOTH);
			gl.drawElementsWithMode(
				gl.TRIANGLES,
				mesh.material_buffer[i].numItems,
				gl.UNSIGNED_SHORT,
				0
			);
			gl.ShadeModel(cur_smode);

        }
		gl.uniform1i(gl.getUniformLocation(curr_prog,'_gl_ObjDrawing'), false);
		curr_prog.cancelAttributePointers();
    }

	gl.uCreateObj=()=>({type:'obj'});
	gl.uLoadObj=function(obj_obj,file_name,mtl){
		if(obj_obj.type=='obj'){
			obj_obj.fileName=file_name;
			let loaderT = OBJ.downloadModels([{obj: file_name,mtl: mtl}]);
			loaderT.then(function(get_data){
				Object.keys(get_data).map(function(objectKey, index) {
					if(!obj_obj.mesh){
						if(get_data[objectKey].name){
							obj_obj.mesh=get_data[objectKey];
							initObjMesh(obj_obj.mesh);
							if(typeof(obj_obj.onload)==typeof(function(){}))obj_obj.onload(obj_obj);
						}
					}
				});

				
			});
		}
	};
	gl.uSolidObj=(obj_obj)=>drawObjModel(obj_obj.mesh);
	
	var teapotVertexPositionBuffer;
	var teapotVertexNormalBuffer;
	var teapotVertexTextureCoordBuffer;
	var teapotVertexIndexBuffer;

	teapotVertexNormalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexNormalBuffer);
	teapotVertexNormalBuffer.data=teapotData.vertexNormals;
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(teapotData.vertexNormals), gl.STATIC_DRAW);
	teapotVertexNormalBuffer.itemSize = 3;
	teapotVertexNormalBuffer.numItems = teapotData.vertexNormals.length / 3;

	var org_buf=2;
	teapotVertexTextureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexTextureCoordBuffer);
	var norm_to4=[];
	for(var i=0; i<teapotData.vertexTextureCoords.length / org_buf; ++i){
		for(var j=0; j<org_buf;++j)norm_to4.push(teapotData.vertexTextureCoords[i*org_buf+j]);
		norm_to4.push(0);norm_to4.push(1);
	}
	teapotVertexTextureCoordBuffer.data=norm_to4;
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(norm_to4), gl.STATIC_DRAW);
	teapotVertexTextureCoordBuffer.itemSize = 4;
	teapotVertexTextureCoordBuffer.numItems = teapotData.vertexTextureCoords.length / org_buf;

	org_buf=3;
	teapotVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexPositionBuffer);
	norm_to4=[];
	for(var i=0; i<teapotData.vertexPositions.length / org_buf; ++i){
		for(var j=0; j<org_buf;++j)norm_to4.push(teapotData.vertexPositions[i*org_buf+j]);
		norm_to4.push(1);
	}
	teapotVertexPositionBuffer.data=norm_to4;
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(norm_to4), gl.STATIC_DRAW);
	teapotVertexPositionBuffer.itemSize = 4;
	teapotVertexPositionBuffer.numItems = teapotData.vertexPositions.length / org_buf;

	teapotVertexIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, teapotVertexIndexBuffer);
	teapotVertexIndexBuffer.data=teapotData.indices;
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(teapotData.indices), gl.STATIC_DRAW);
	teapotVertexIndexBuffer.itemSize = 1;
	teapotVertexIndexBuffer.numItems = teapotData.indices.length;

	var sphereVertexPositionBuffer;
	var sphereVertexNormalBuffer;
	var sphereVertexTextureCoordBuffer;
	var sphereVertexIndexBuffer;

	sphereVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexPositionBuffer);
	sphereVertexPositionBuffer.data=[];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([]), gl.STATIC_DRAW);
	sphereVertexPositionBuffer.itemSize = 4;
	
	sphereVertexNormalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexNormalBuffer);
	sphereVertexNormalBuffer.data=[];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([]), gl.STATIC_DRAW);
	sphereVertexNormalBuffer.itemSize = 3;
	
	sphereVertexTextureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexTextureCoordBuffer);
	sphereVertexTextureCoordBuffer.data=[];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([]), gl.STATIC_DRAW);
	sphereVertexTextureCoordBuffer.itemSize = 4;

	sphereVertexIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereVertexIndexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([]), gl.STATIC_DRAW);
	sphereVertexIndexBuffer.itemSize = 1;
	sphereVertexIndexBuffer.numItems = 0;

	var torusVertexPositionBuffer;
	var torusVertexNormalBuffer;
	var torusVertexTextureCoordBuffer;
	var torusVertexIndexBuffer;

	torusVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, torusVertexPositionBuffer);
	torusVertexPositionBuffer.data=[];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([]), gl.STATIC_DRAW);
	torusVertexPositionBuffer.itemSize = 4;
	
	torusVertexNormalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, torusVertexNormalBuffer);
	torusVertexNormalBuffer.data=[];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([]), gl.STATIC_DRAW);
	torusVertexNormalBuffer.itemSize = 3;
	
	torusVertexTextureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, torusVertexTextureCoordBuffer);
	torusVertexTextureCoordBuffer.data=[];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([]), gl.STATIC_DRAW);
	torusVertexTextureCoordBuffer.itemSize = 4;

	torusVertexIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, torusVertexIndexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([]), gl.STATIC_DRAW);
	torusVertexIndexBuffer.itemSize = 1;
	torusVertexIndexBuffer.numItems = 0;

	var shapeVertexIndexBuffer;

	shapeVertexIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shapeVertexIndexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([]), gl.STATIC_DRAW);
	shapeVertexIndexBuffer.itemSize = 1;
	shapeVertexIndexBuffer.numItems = 0;

	function shapeBindBuffer(sProgram,shape,wire){
		var selected_shape=geoShapes[shape];
		if(!selected_shape)return;
		
		var shape_count = selected_shape.vertexNormals.length / 3;
		for(var a_i=0; a_i<built_in_attribute_list.length; ++a_i){
			var attribute_name = built_in_attribute_list[a_i];
			var attribute_data = built_in_attributes[attribute_name];
			var temp_buffer;
			temp_buffer=gl.INIT_GLSL_PROGRAM.buffers[attribute_name];
			if(sProgram){
				if(sProgram[attribute_data[0]]>=0){
					gl.useProgram(sProgram);
					var att_data=[];
					if(attribute_name=='Vertex'){
						att_data=selected_shape.vertexPositions;
					}else if(attribute_name=='Normal'){
						att_data=selected_shape.vertexNormals;
					}else if(attribute_name=='TexCoord'){
						att_data=selected_shape.vertexTextureCoords;
					}else{
						var att_ele=[];
						att_ele=gl.topAttributes[attribute_name];
						for(var i=0; i<shape_count; ++i){
							//att_data=att_data.concat(att_ele);
							att_data.push(...att_ele);
						}
					}
					gl.bindBuffer(gl.ARRAY_BUFFER, temp_buffer);
					gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(att_data), gl.STATIC_DRAW);
					temp_buffer.numItems = shape_count;
					gl.enableVertexAttrib(sProgram[attribute_data[0]]);
					gl.vertexAttribPointer(sProgram[attribute_data[0]], temp_buffer.itemSize, gl.FLOAT, false, 0, 0);
				}
			}
		}
		if(sProgram.USER_ATTRIB)Object.keys(sProgram.USER_ATTRIB).map(function(objectKey, index) {
			var value = sProgram.USER_ATTRIB[objectKey];
			if(value.topAttrib){
				gl.bindBuffer(gl.ARRAY_BUFFER, value);
				var att_ele=[];
				var att_data=[];
				att_ele=value.topAttrib;
				for(var i=0; i<shape_count; ++i){
					//att_data=att_data.concat(att_ele);
					att_data.push(...att_ele);
				}
				gl.bufferData(gl.ARRAY_BUFFER, new value.transData(att_data), gl.STATIC_DRAW);
				value.numItems = shape_count;
				gl.enableVertexAttrib(objectKey);
				gl.vertexAttribPointer(objectKey, value.itemSize, gl.FLOAT, false, 0, 0);
			}
		});
		if(wire){
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shapeVertexIndexBuffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(selected_shape.wireIndices), gl.STATIC_DRAW);
			shapeVertexIndexBuffer.itemSize = 1;
			shapeVertexIndexBuffer.numItems = selected_shape.wireIndices.length;
			return;
		}
		return shape_count;
	}
	var sphere_cache={radius:0,slices:0,stacks:0, vertexPositionData:[],normalData:[],textureCoordData:[],indexData:[]};
	function sphereBindBuffer(sProgram,radius,slices,stacks,in_height,in_base,in_top,in_start,in_sweep,in_disk){
        var latitudeBands = stacks;
        var longitudeBands = slices;
		
		var _base=_argInit(in_base,''), _top=_argInit(in_top,''), _height=_argInit(in_height,''), _start=_argInit(in_start,''), _sweep=_argInit(in_sweep,''), _disk=_argInit(in_disk,'');
		if(!_checkNULL(_disk))
			_disk=!!/^(1(\.\d*)?|[ty]|true|yes)$/i.exec(_disk.toString());
		else _disk = false;
        var vertexPositionData = [];
        var normalData = [];
        var textureCoordData = [];
		var indexData = [];
		var cache_flag=false;

		if(
			radius==sphere_cache.radius && slices==sphere_cache.slices && stacks==sphere_cache.stacks && 
			_base==sphere_cache.base && _top==sphere_cache.top && _height==sphere_cache.height &&
			_start==sphere_cache.start && _sweep==sphere_cache.sweep && _disk==sphere_cache.disk
			){
			vertexPositionData=sphere_cache.vertexPositionData;
			normalData=sphere_cache.normalData;
			textureCoordData=sphere_cache.textureCoordData;
			indexData=sphere_cache.indexData;
			cache_flag=true;
		}else{
			if(typeof(_base)===typeof(0)||typeof(_top)===typeof(0)||typeof(_height)===typeof(0)){
				_base=(typeof(_base)===typeof(0))?_base:1;
				_top=(typeof(_top)===typeof(0))?_top:1;
				_height=(typeof(_height)===typeof(0))?_height:2;
				
				//console.log([_base,_top,_height]);
			}
			_start=(typeof(_start)===typeof(0))?_start:0;
			_sweep=(typeof(_sweep)===typeof(0))?(Math.PI*_sweep/180):(2*Math.PI);

			for (var latNumber=0; latNumber <= latitudeBands; latNumber++) {
				var loop_rad = latNumber / latitudeBands;
				var theta = Math.PI * loop_rad;
				
				var sinTheta = Math.sin(theta);
				var cosTheta = Math.cos(theta);
				if(typeof(_base)===typeof(0)){
					var len_b_t=_base-_top;
					sinTheta=_top+(latNumber/ latitudeBands)*len_b_t;
					cosTheta=-(2*(latNumber/ latitudeBands)-1)*_height;
				}
				for (var longNumber=0; longNumber <= longitudeBands; longNumber++) {
					var phi = _start + longNumber * _sweep / longitudeBands;
					var sinPhi = Math.sin(phi);
					var cosPhi = Math.cos(phi);

					var x = cosPhi * sinTheta;
					var y = cosTheta;
					var z = sinPhi * sinTheta;
					var u = 1 - (longNumber / longitudeBands);
					var v = 1 - (latNumber / latitudeBands);
					if(typeof(_base)===typeof(0)){
						var cyTheta = -Math.atan(2*_height/(_base-_top));
						var cySgn = -Math.sign(Math.abs(_base-_top)<1e-8?1:(_base-_top));
						normalData.push(
							cySgn * cosPhi * Math.sin(cyTheta),
							Math.cos(cyTheta),
							cySgn * sinPhi * Math.sin(cyTheta)
						);
					}else{
						normalData.push(x,y,z);
					}
					if(_disk){
						var outer=Math.max(_base,_top);
						var inner=Math.min(_base,_top);
						var io_rad=inner/outer;
						
						//var uv_rad=((1-loop_rad)*(outer-inner)+1)/outer;
						var uv_rad=io_rad+(1-loop_rad)*(1-io_rad);
						textureCoordData.push(0.5+0.5*cosPhi*uv_rad,0.5+0.5*sinPhi*uv_rad,0.0,1.0);
					}else{
						textureCoordData.push(u,v,0.0,1.0);
					}
					vertexPositionData.push(radius * x, radius * y, radius * z, 1.0);
				}
			}
			for (var latNumber=0; latNumber < latitudeBands; latNumber++) {
				for (var longNumber=0; longNumber < longitudeBands; longNumber++) {
					var first = (latNumber * (longitudeBands + 1)) + longNumber;
					var second = first + longitudeBands + 1;
					indexData.push(first, second, first + 1);
					indexData.push(second, second + 1, first + 1);
				}
			}
			sphere_cache.radius=radius;
			sphere_cache.slices=slices;
			sphere_cache.stacks=stacks;
			sphere_cache.base=_base;
			sphere_cache.top=_top;
			sphere_cache.height=_height;
			sphere_cache.start=_start;
			sphere_cache.sweep=_sweep;
			sphere_cache.vertexPositionData=vertexPositionData;
			sphere_cache.normalData=normalData;
			sphere_cache.textureCoordData=textureCoordData;
			sphere_cache.indexData=indexData;
		}
		

		var sphere_count = normalData.length / 3;
		for(var a_i=0; a_i<built_in_attribute_list.length; ++a_i){
			var attribute_name = built_in_attribute_list[a_i];
			var attribute_data = built_in_attributes[attribute_name];
			var temp_buffer;
			temp_buffer=gl.INIT_GLSL_PROGRAM.buffers[attribute_name];
			if(sProgram){
				if(sProgram[attribute_data[0]]>=0){
					gl.useProgram(sProgram);
					var att_data=[];
					if(attribute_name=='Vertex'){
						att_data=vertexPositionData;
					}else if(attribute_name=='Normal'){
						att_data=normalData;
					}else if(attribute_name=='TexCoord'){
						att_data=textureCoordData;
					}else{
						var att_ele=[];
						att_ele=gl.topAttributes[attribute_name];
						for(var i=0; i<sphere_count; ++i){
							//att_data=att_data.concat(att_ele);
							att_data.push(...att_ele);
						}
					}
					gl.bindBuffer(gl.ARRAY_BUFFER, temp_buffer);
					temp_buffer.data=att_data;
					gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(att_data), gl.STATIC_DRAW);
					temp_buffer.numItems = sphere_count;
					gl.enableVertexAttrib(sProgram[attribute_data[0]]);
					gl.vertexAttribPointer(sProgram[attribute_data[0]], temp_buffer.itemSize, gl.FLOAT, false, 0, 0);
				}
			}
		}
		if(sProgram.USER_ATTRIB)Object.keys(sProgram.USER_ATTRIB).map(function(objectKey, index) {
			var value = sProgram.USER_ATTRIB[objectKey];
			if(value.topAttrib){
				gl.bindBuffer(gl.ARRAY_BUFFER, value);
				var att_ele=[];
				var att_data=[];
				att_ele=value.topAttrib;
				for(var i=0; i<sphere_count; ++i){
					//att_data=att_data.concat(att_ele);
					att_data.push(...att_ele);
				}
				gl.bufferData(gl.ARRAY_BUFFER, new value.transData(att_data), gl.STATIC_DRAW);
				value.numItems = sphere_count;
				gl.enableVertexAttrib(objectKey);
				gl.vertexAttribPointer(objectKey, value.itemSize, gl.FLOAT, false, 0, 0);
			}
		});
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereVertexIndexBuffer);
		sphereVertexIndexBuffer.data=indexData;
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
		sphereVertexIndexBuffer.itemSize = 1;
		sphereVertexIndexBuffer.numItems = indexData.length;
	}
	
	var torus_cache={innerRadius:0,outerRadius:0,nsides:0,rings:0, vertexPositionData:[],normalData:[],textureCoordData:[],indexData:[]};
	function torusBindBuffer(sProgram,innerRadius,outerRadius,nsides,rings){
        var _slices = nsides;
        var _loops = rings;
		
        var vertexPositionData = [];
        var normalData = [];
        var textureCoordData = [];
		var indexData = [];
		var cache_flag=false;

		if(innerRadius==torus_cache.innerRadius && outerRadius==torus_cache.outerRadius && nsides==torus_cache.nsides && rings==torus_cache.rings){
			vertexPositionData=torus_cache.vertexPositionData;
			normalData=torus_cache.normalData;
			textureCoordData=torus_cache.textureCoordData;
			indexData=torus_cache.indexData;
			cache_flag=true;
		}else{
			 for (let slice = 0; slice <= _slices; ++slice) {
				  const v = slice / _slices;
				  const slice_angle = v * 2 * Math.PI;
				  const cos_slices = Math.cos(slice_angle);
				  const sin_slices = Math.sin(slice_angle);
				  const slice_rad = outerRadius + innerRadius * cos_slices;

				  for (let loop = 0; loop <= _loops; ++loop) {
					//   x=(R+r·cos(v))cos(w)
					//   y=(R+r·cos(v))sin(w)
					//             z=r.sin(v)
					const u = loop / _loops;
					const loop_angle = u * 2 * Math.PI;
					const cos_loops = Math.cos(loop_angle);
					const sin_loops = Math.sin(loop_angle);

					const x = slice_rad * cos_loops;
					const y = slice_rad * sin_loops;
					const z = innerRadius * sin_slices;

					vertexPositionData.push(x, y, z, 1);
					normalData.push(
					   cos_loops * cos_slices, 
					   sin_loops * cos_slices, 
					   sin_slices);

					textureCoordData.push(u, v, 0, 1);
				  }
				}
				
				
				// 0  1  2  3  4  5
				// 6  7  8  9  10 11
				// 12 13 14 15 16 17

				const vertsPerSlice = _loops + 1;
				for (let i = 0; i < _slices; ++i) {
				  let v1 = i * vertsPerSlice;
				  let v2 = v1 + vertsPerSlice;

				  for (let j = 0; j < _loops; ++j) {

					indexData.push(v1, v1 + 1, v2);

					indexData.push(v2, v1 + 1, v2 + 1);

					v1 += 1;
					v2 += 1;
				}
			}
			torus_cache.innerRadius=innerRadius;
			torus_cache.outerRadius=outerRadius;
			torus_cache.nsides=nsides;
			torus_cache.rings=rings;
			torus_cache.vertexPositionData=vertexPositionData;
			torus_cache.normalData=normalData;
			torus_cache.textureCoordData=textureCoordData;
			torus_cache.indexData=indexData;
		}
		

		var torus_count = normalData.length / 3;
		for(var a_i=0; a_i<built_in_attribute_list.length; ++a_i){
			var attribute_name = built_in_attribute_list[a_i];
			var attribute_data = built_in_attributes[attribute_name];
			var temp_buffer;
			temp_buffer=gl.INIT_GLSL_PROGRAM.buffers[attribute_name];
			if(sProgram){
				if(sProgram[attribute_data[0]]>=0){
					gl.useProgram(sProgram);
					var att_data=[];
					if(attribute_name=='Vertex'){
						att_data=vertexPositionData;
					}else if(attribute_name=='Normal'){
						att_data=normalData;
					}else if(attribute_name=='TexCoord'){
						att_data=textureCoordData;
					}else{
						var att_ele=[];
						att_ele=gl.topAttributes[attribute_name];
						for(var i=0; i<torus_count; ++i){
							//att_data=att_data.concat(att_ele);
							att_data.push(...att_ele);
						}
					}
					gl.bindBuffer(gl.ARRAY_BUFFER, temp_buffer);
					temp_buffer.data=att_data;
					gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(att_data), gl.STATIC_DRAW);
					temp_buffer.numItems = torus_count;
					gl.enableVertexAttrib(sProgram[attribute_data[0]]);
					gl.vertexAttribPointer(sProgram[attribute_data[0]], temp_buffer.itemSize, gl.FLOAT, false, 0, 0);
				}
			}
		}
		if(sProgram.USER_ATTRIB)Object.keys(sProgram.USER_ATTRIB).map(function(objectKey, index) {
			var value = sProgram.USER_ATTRIB[objectKey];
			if(value.topAttrib){
				gl.bindBuffer(gl.ARRAY_BUFFER, value);
				var att_ele=[];
				var att_data=[];
				att_ele=value.topAttrib;
				for(var i=0; i<torus_count; ++i){
					//att_data=att_data.concat(att_ele);
					att_data.push(...att_ele);
				}
				gl.bufferData(gl.ARRAY_BUFFER, new value.transData(att_data), gl.STATIC_DRAW);
				value.numItems = torus_count;
				gl.enableVertexAttrib(objectKey);
				gl.vertexAttribPointer(objectKey, value.itemSize, gl.FLOAT, false, 0, 0);
			}
		});
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, torusVertexIndexBuffer);
		torusVertexIndexBuffer.data=indexData;
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
		torusVertexIndexBuffer.itemSize = 1;
		torusVertexIndexBuffer.numItems = indexData.length;
	}
	
	function vecEqual(vec1,vec2){
		if(typeof(vec1)!==typeof(vec2))return false;
		if(Array.isArray(vec1)!==Array.isArray(vec2))return false;
		if(Array.isArray(vec1)){
			if(vec1.length != vec2.length)return false;
			for(var i=0; i<vec1.length; ++i){
				if(Math.abs(vec1[i]-vec2[i])>1e-8)return false;
			}
			return true;
		}
		if(typeof(vec1)===typeof(0))return Math.abs(vec1-vec2)<1e-8;
		if(typeof(vec1)===typeof(''))return vec1==vec2;
		return vec1===vec2;
	}
	var teapot_cache={USER_ATTRIB:{}};
	function TeapotbindBuffer(sProgram){
		var teapot_count = teapotData.vertexNormals.length / 3;
		for(var a_i=0; a_i<built_in_attribute_list.length; ++a_i){
			var attribute_name = built_in_attribute_list[a_i];
			var attribute_data = built_in_attributes[attribute_name];
			var temp_buffer;
			var cache_flag=false;
			temp_buffer=gl.INIT_GLSL_PROGRAM.buffers[attribute_name];
			if(sProgram){
				if(sProgram[attribute_data[0]]>=0){
					gl.useProgram(sProgram);
					if(attribute_name=='Vertex'){
						gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexPositionBuffer);
					}else if(attribute_name=='Normal'){
						gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexNormalBuffer);
					}else if(attribute_name=='TexCoord'){
						gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexTextureCoordBuffer);
					}else{
						var att_ele=[];
						var att_data=[];
						att_ele=gl.topAttributes[attribute_name];
						cache_flag=false;
						if(teapot_cache[attribute_name]){
							if(vecEqual(teapot_cache[attribute_name].value,att_ele)){
								att_data=teapot_cache[attribute_name].data;
								cache_flag=true;
							}
						}
						if(!cache_flag){
							for(var i=0; i<teapot_count; ++i){
								//att_data=att_data.concat(att_ele);
								att_data.push(...att_ele);
							}
							if(!teapot_cache[attribute_name])teapot_cache[attribute_name]={};
							teapot_cache[attribute_name].value=att_ele;
							teapot_cache[attribute_name].data=att_data;
						}
						gl.bindBuffer(gl.ARRAY_BUFFER, temp_buffer);
						gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(att_data), gl.STATIC_DRAW);
						temp_buffer.numItems = teapot_count;
					}
					gl.enableVertexAttrib(sProgram[attribute_data[0]]);
					gl.vertexAttribPointer(sProgram[attribute_data[0]], temp_buffer.itemSize, gl.FLOAT, false, 0, 0);
				}
			}
		}
		if(sProgram.USER_ATTRIB)Object.keys(sProgram.USER_ATTRIB).map(function(objectKey, index) {
			var value = sProgram.USER_ATTRIB[objectKey];
			if(value.topAttrib){
				gl.bindBuffer(gl.ARRAY_BUFFER, value);
				var att_ele=[];
				var att_data=[];
				att_ele=value.topAttrib;
				cache_flag=false;
				if(teapot_cache.USER_ATTRIB[objectKey]){
					if(vecEqual(teapot_cache.USER_ATTRIB[objectKey].value,att_ele)){
						att_data=teapot_cache.USER_ATTRIB[objectKey].data;
						cache_flag=true;
					}
				}
				if(!cache_flag){
					for(var i=0; i<teapot_count; ++i){
						//att_data=att_data.concat(att_ele);
						att_data.push(...att_ele);
					}
					if(!teapot_cache[attribute_name])teapot_cache.USER_ATTRIB[objectKey]={};
					teapot_cache.USER_ATTRIB[objectKey].value=att_ele;
					teapot_cache.USER_ATTRIB[objectKey].data=att_data;
				}
				gl.bufferData(gl.ARRAY_BUFFER, new value.transData(att_data), gl.STATIC_DRAW);
				value.numItems = teapot_count;
				gl.enableVertexAttrib(objectKey);
				gl.vertexAttribPointer(objectKey, value.itemSize, gl.FLOAT, false, 0, 0);
			}
		});
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, teapotVertexIndexBuffer);
	}

	function drawTeapot(rad){
		var teapot_size=rad;
		if(typeof(rad)!=typeof(0))teapot_size=1;
		if(rad<=0)teapot_size=1;
		var cur_prog=gl.glGet(gl.CURRENT_PROGRAM);
		gl.PushMatrix('model');
		gl.Scale('model',0.06*teapot_size);
		gl.setMatrixUniforms(cur_prog);
		TeapotbindBuffer(cur_prog);
		//gl.drawElements(gl.TRIANGLES, teapotVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
		gl.drawElementsVertex(
			gl.TRIANGLES,
			teapotVertexPositionBuffer.data,
			teapotVertexIndexBuffer.data,
			4,
			teapotVertexIndexBuffer.numItems,
			gl.UNSIGNED_SHORT, 0, true
		);
		//teapotVertexIndexBuffer teapotVertexPositionBuffer
		
		
		gl.PopMatrix('model');
		gl.putTopAttribute(true);
	}
	gl.utSolidTeapot=drawTeapot;
	
	function drawSphere(radius,slices,stacks,in_height,in_base,in_top,in_start,in_sweep,in_disk){
		var cur_prog=gl.glGet(gl.CURRENT_PROGRAM);
		gl.setMatrixUniforms(cur_prog);
		sphereBindBuffer(cur_prog,radius,slices,stacks,in_height,in_base,in_top,in_start,in_sweep,in_disk);
		
		//gl.drawElements(gl.TRIANGLES, sphereVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
		gl.drawElementsVertex(
			gl.TRIANGLES,
			gl.INIT_GLSL_PROGRAM.buffers.Vertex.data,
			sphereVertexIndexBuffer.data,
			4,
			sphereVertexIndexBuffer.numItems,
			gl.UNSIGNED_SHORT, 0
		);
		gl.putTopAttribute(true);
	}
	gl.uSphere=function(radius,slices,stacks,start,sweep){
		drawSphere(radius,slices,stacks,null,null,null,start,sweep);
	};
	gl.uCylinder=function(cy_base,cy_top,cy_height,cy_slices,cy_stacks,cy_start,cy_sweep){
		drawSphere(1.0,cy_slices,cy_stacks,cy_height,cy_base,cy_top,cy_start,cy_sweep);
	};
	gl.uPartialDisk=function(inner,outer,slices,loops,start,sweep){
		drawSphere(1.0,slices,loops,0,inner,outer,start,sweep,true);
	};
	gl.uDisk=function(inner,outer,slices,loops,start,sweep){
		drawSphere(1.0,slices,loops,0,inner,outer,null,null,true);
	};
	gl.utSolidCone=function(base,height,slices,stacks){
		drawSphere(1.0,slices,stacks,height,base,base);
	};
	function drawTorus(innerRadius,outerRadius,nsides,rings){
		var cur_prog=gl.glGet(gl.CURRENT_PROGRAM);
		gl.setMatrixUniforms(cur_prog);
		torusBindBuffer(cur_prog,innerRadius,outerRadius,nsides,rings);
		//gl.drawElements(gl.TRIANGLES, torusVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
		gl.drawElementsVertex(
			gl.TRIANGLES,
			gl.INIT_GLSL_PROGRAM.buffers.Vertex.data,
			torusVertexIndexBuffer.data,
			4,
			torusVertexIndexBuffer.numItems,
			gl.UNSIGNED_SHORT, 0, true
		);
		gl.putTopAttribute(true);
	}
	gl.utSolidTorus=drawTorus;

	function drawShape(shape_name,wire){
		var cur_prog=gl.glGet(gl.CURRENT_PROGRAM);
		var cur_smode=gl.getShadeModel();
		var selected_shape=geoShapes[shape_name];
		if(!selected_shape)return;
		gl.setMatrixUniforms(cur_prog);
		var triangle_count = shapeBindBuffer(cur_prog,shape_name,wire);
		if(!wire && triangle_count)gl.drawArrays(gl.TRIANGLES, 0, triangle_count);
		else gl.drawElements(wire?gl.LINES:gl.TRIANGLES, (wire?selected_shape.wireIndices:(selected_shape.indices?selected_shape.indices:[])).length, gl.UNSIGNED_SHORT, 0);
		gl.putTopAttribute(true);
	}
	gl.uRegularPolyhedron=drawShape;
	gl.uGetRegularPolyhedrons=function(){
		var result=[];
		Object.keys(geoShapes).map(function(objectKey, index) {
			var value = geoShapes[objectKey];
			if(value.vertexNormals != null){
				result.push(objectKey);
			}
		});
		return result;
	}
gl.utSolidCube=()=>gl.uRegularPolyhedron('Cube');
gl.utWireCube=()=>gl.uRegularPolyhedron('Cube',true);
gl.utSolidDodecahedron=()=>gl.uRegularPolyhedron('Dodecahedron');
gl.utWireDodecahedron=()=>gl.uRegularPolyhedron('Dodecahedron',true);
gl.utSolidOctahedron=()=>gl.uRegularPolyhedron('Octahedron');
gl.utWireOctahedron=()=>gl.uRegularPolyhedron('Octahedron',true);
gl.utSolidTetrahedron=()=>gl.uRegularPolyhedron('Tetrahedron');
gl.utWireTetrahedron=()=>gl.uRegularPolyhedron('Tetrahedron',true);
gl.utSolidIcosahedron=()=>gl.uRegularPolyhedron('Icosahedron');
gl.utWireIcosahedron=()=>gl.uRegularPolyhedron('Icosahedron',true);
	
	//shapeBindBuffer
}

class Vector3{constructor(t=0,e=0,n=0){Object.defineProperty(this,"isVector3",{value:!0}),this.x=t,this.y=e,this.z=n}set(t,e,n){return void 0===n&&(n=this.z),this.x=t,this.y=e,this.z=n,this}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}cross(t,e){return void 0!==e?this.crossVectors(t,e):this.crossVectors(this,t)}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}clone(){return new this.constructor(this.x,this.y,this.z)}divideScalar(t){return this.multiplyScalar(1/t)}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}lengthSquared(){return this.x*this.x+this.y*this.y+this.z*this.z}normalize(){return this.divideScalar(this.length()||1)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,i=e.x,o=e.y,a=e.z;return this.x=s*a-r*o,this.y=r*i-n*a,this.z=n*o-s*i,this}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}sub(t,e){return void 0!==e?this.subVectors(t,e):(this.x-=t.x,this.y-=t.y,this.z-=t.z,this)}add(t,e){return void 0!==e?this.addVectors(t,e):(this.x+=t.x,this.y+=t.y,this.z+=t.z,this)}set(t){return void 0===t[2]&&(z=this.z),this.x=t[0],this.y=t[1],this.z=t[2],this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}toLinePoint(t,e){var n=this.clone(),s=e.clone().sub(t).normalize(),r=n.clone().sub(t).dot(s);return t.clone().add(s.clone().multiplyScalar(r))}toLine(t,e){return Math.sqrt(this.distanceToSquared(this.toLinePoint(t,e)))}}class Matrix3{constructor(){Object.defineProperty(this,"isMatrix3",{value:!0}),this.elements=[1,0,0,0,1,0,0,0,1]}set(t,e,n,s,r,i,o,a,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=a,h[6]=n,h[7]=i,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}clone(){return(new this.constructor).fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,i=n[0],o=n[3],a=n[6],c=n[1],h=n[4],u=n[7],l=n[2],d=n[5],p=n[8],v=s[0],m=s[3],f=s[6],x=s[1],y=s[4],g=s[7],_=s[2],w=s[5],V=s[8];return r[0]=i*v+o*x+a*_,r[3]=i*m+o*y+a*w,r[6]=i*f+o*g+a*V,r[1]=c*v+h*x+u*_,r[4]=c*m+h*y+u*w,r[7]=c*f+h*g+u*V,r[2]=l*v+d*x+p*_,r[5]=l*m+d*y+p*w,r[8]=l*f+d*g+p*V,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],i=t[4],o=t[5],a=t[6],c=t[7],h=t[8];return e*i*h-e*o*c-n*r*h+n*o*a+s*r*c-s*i*a}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],i=t[4],o=t[5],a=t[6],c=t[7],h=t[8],u=h*i-o*c,l=o*a-h*r,d=c*r-i*a,p=e*u+n*l+s*d;if(0===p)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return t[0]=u*v,t[1]=(s*c-h*n)*v,t[2]=(o*n-s*i)*v,t[3]=l*v,t[4]=(h*e-s*a)*v,t[5]=(s*r-o*e)*v,t[6]=d*v,t[7]=(n*a-c*e)*v,t[8]=(i*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).copy(this).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,i,o){const a=Math.cos(r),c=Math.sin(r);this.set(n*a,n*c,-n*(a*i+c*o)+i+t,-s*c,s*a,-s*(-c*i+a*o)+o+e,0,0,1)}scale(t,e){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=e,n[4]*=e,n[7]*=e,this}rotate(t){const e=Math.cos(t),n=Math.sin(t),s=this.elements,r=s[0],i=s[3],o=s[6],a=s[1],c=s[4],h=s[7];return s[0]=e*r+n*a,s[3]=e*i+n*c,s[6]=e*o+n*h,s[1]=-n*r+e*a,s[4]=-n*i+e*c,s[7]=-n*o+e*h,this}translate(t,e){const n=this.elements;return n[0]+=t*n[2],n[3]+=t*n[5],n[6]+=t*n[8],n[1]+=e*n[2],n[4]+=e*n[5],n[7]+=e*n[8],this}equals(t){const e=this.elements,n=t.elements;for(let t=0;t<9;t++)if(e[t]!==n[t])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}}const _startP=new Vector3,_startEnd=new Vector3,_lut=[];for(let t=0;t<256;t++)_lut[t]=(t<16?"0":"")+t.toString(16);let _seed=1234567;const MathUtils={DEG2RAD:Math.PI/180,RAD2DEG:180/Math.PI,generateUUID:function(){const t=4294967295*Math.random()|0,e=4294967295*Math.random()|0,n=4294967295*Math.random()|0,s=4294967295*Math.random()|0;return(_lut[255&t]+_lut[t>>8&255]+_lut[t>>16&255]+_lut[t>>24&255]+"-"+_lut[255&e]+_lut[e>>8&255]+"-"+_lut[e>>16&15|64]+_lut[e>>24&255]+"-"+_lut[63&n|128]+_lut[n>>8&255]+"-"+_lut[n>>16&255]+_lut[n>>24&255]+_lut[255&s]+_lut[s>>8&255]+_lut[s>>16&255]+_lut[s>>24&255]).toUpperCase()},clamp:function(t,e,n){return Math.max(e,Math.min(n,t))},euclideanModulo:function(t,e){return(t%e+e)%e},mapLinear:function(t,e,n,s,r){return s+(t-e)*(r-s)/(n-e)},lerp:function(t,e,n){return(1-n)*t+n*e},smoothstep:function(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e))*t*(3-2*t)},smootherstep:function(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e))*t*t*(t*(6*t-15)+10)},randInt:function(t,e){return t+Math.floor(Math.random()*(e-t+1))},randFloat:function(t,e){return t+Math.random()*(e-t)},randFloatSpread:function(t){return t*(.5-Math.random())},seededRandom:function(t){return void 0!==t&&(_seed=t%2147483647),((_seed=16807*_seed%2147483647)-1)/2147483646},degToRad:function(t){return t*MathUtils.DEG2RAD},radToDeg:function(t){return t*MathUtils.RAD2DEG},isPowerOfTwo:function(t){return 0==(t&t-1)&&0!==t},ceilPowerOfTwo:function(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))},floorPowerOfTwo:function(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))},setQuaternionFromProperEuler:function(t,e,n,s,r){const i=Math.cos,o=Math.sin,a=i(n/2),c=o(n/2),h=i((e+s)/2),u=o((e+s)/2),l=i((e-s)/2),d=o((e-s)/2),p=i((s-e)/2),v=o((s-e)/2);switch(r){case"XYX":t.set(a*u,c*l,c*d,a*h);break;case"YZY":t.set(c*d,a*u,c*l,a*h);break;case"ZXZ":t.set(c*l,c*d,a*u,a*h);break;case"XZX":t.set(a*u,c*v,c*p,a*h);break;case"YXY":t.set(c*p,a*u,c*v,a*h);break;case"ZYZ":t.set(c*v,c*p,a*u,a*h)}}},_vector1=new Vector3,_vector2=new Vector3,_normalMatrix=new Matrix3;class Plane{constructor(t,e){Object.defineProperty(this,"isPlane",{value:!0}),this.normal=void 0!==t?t:new Vector3(1,0,0),this.constant=void 0!==e?e:0}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=_vector1.subVectors(n,e).cross(_vector2.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}clone(){return(new this.constructor).copy(this)}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return void 0===e&&(e=new Vector3),e.copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t)}intersectLine(t,e){void 0===e&&(e=new Vector3);const n=t.delta(_vector1),s=this.normal.dot(n);if(0===s)return 0===this.distanceToPoint(t.start)?e.copy(t.start):void 0;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?void 0:e.copy(n).multiplyScalar(r).add(t.start)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return void 0===t&&(t=new Vector3),t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||_normalMatrix.getNormalMatrix(t),s=this.coplanarPoint(_vector1).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}}const _v0$1=new Vector3,_v1$3=new Vector3,_v2$1=new Vector3,_v3=new Vector3,_vab=new Vector3,_vac=new Vector3,_vbc=new Vector3,_vap=new Vector3,_vbp=new Vector3,_vcp=new Vector3;class Triangle{constructor(t,e,n){this.a=void 0!==t?t:new Vector3,this.b=void 0!==e?e:new Vector3,this.c=void 0!==n?n:new Vector3}static getNormal(t,e,n,s){void 0===s&&(s=new Vector3),s.subVectors(n,e),_v0$1.subVectors(t,e),s.cross(_v0$1);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){_v0$1.subVectors(s,e),_v1$3.subVectors(n,e),_v2$1.subVectors(t,e);const i=_v0$1.dot(_v0$1),o=_v0$1.dot(_v1$3),a=_v0$1.dot(_v2$1),c=_v1$3.dot(_v1$3),h=_v1$3.dot(_v2$1),u=i*c-o*o;if(void 0===r&&(r=new Vector3),0===u)return r.set(-2,-1,-1);const l=1/u,d=(c*a-o*h)*l,p=(i*h-o*a)*l;return r.set(1-d-p,p,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,_v3),_v3.x>=0&&_v3.y>=0&&_v3.x+_v3.y<=1}static getUV(t,e,n,s,r,i,o,a){return this.getBarycoord(t,e,n,s,_v3),a.set(0,0),a.addScaledVector(r,_v3.x),a.addScaledVector(i,_v3.y),a.addScaledVector(o,_v3.z),a}static isFrontFacing(t,e,n,s){return _v0$1.subVectors(n,e),_v1$3.subVectors(t,e),_v0$1.cross(_v1$3).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}clone(){return(new this.constructor).copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return _v0$1.subVectors(this.c,this.b),_v1$3.subVectors(this.a,this.b),.5*_v0$1.cross(_v1$3).length()}getMidpoint(t){return void 0===t&&(t=new Vector3),t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Triangle.getNormal(this.a,this.b,this.c,t)}getPlane(t){return void 0===t&&(t=new Plane),t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Triangle.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,s,r){return Triangle.getUV(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Triangle.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Triangle.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){void 0===e&&(e=new Vector3);const n=this.a,s=this.b,r=this.c;let i,o;_vab.subVectors(s,n),_vac.subVectors(r,n),_vap.subVectors(t,n);const a=_vab.dot(_vap),c=_vac.dot(_vap);if(a<=0&&c<=0)return e.copy(n);_vbp.subVectors(t,s);const h=_vab.dot(_vbp),u=_vac.dot(_vbp);if(h>=0&&u<=h)return e.copy(s);const l=a*u-h*c;if(l<=0&&a>=0&&h<=0)return i=a/(a-h),e.copy(n).addScaledVector(_vab,i);_vcp.subVectors(t,r);const d=_vab.dot(_vcp),p=_vac.dot(_vcp);if(p>=0&&d<=p)return e.copy(r);const v=d*c-a*p;if(v<=0&&c>=0&&p<=0)return o=c/(c-p),e.copy(n).addScaledVector(_vac,o);const m=h*p-d*u;if(m<=0&&u-h>=0&&d-p>=0)return _vbc.subVectors(r,s),o=(u-h)/(u-h+(d-p)),e.copy(s).addScaledVector(_vbc,o);const f=1/(m+v+l);return i=v*f,o=l*f,e.copy(n).addScaledVector(_vab,i).addScaledVector(_vac,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Line3{constructor(t,e){this.start=void 0!==t?t:new Vector3,this.end=void 0!==e?e:new Vector3}set(t,e){return this.start.copy(t),this.end.copy(e),this}clone(){return(new this.constructor).copy(this)}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return void 0===t&&(t=new Vector3),t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return void 0===t&&(t=new Vector3),t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return void 0===e&&(e=new Vector3),this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){_startP.subVectors(t,this.start),_startEnd.subVectors(this.end,this.start);const n=_startEnd.dot(_startEnd);let s=_startEnd.dot(_startP)/n;return e&&(s=MathUtils.clamp(s,0,1)),s}closestPointToPoint(t,e,n){const s=this.closestPointToPointParameter(t,e);return void 0===n&&(n=new Vector3),this.delta(n).multiplyScalar(s).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}}var ConvexHull=function(){var t,e,n,s,r=0,i=new Vector3;function o(){this.tolerance=-1,this.faces=[],this.newFaces=[],this.assigned=new u,this.unassigned=new u,this.vertices=[]}function a(){this.normal=new Vector3,this.midpoint=new Vector3,this.area=0,this.constant=0,this.outside=null,this.mark=r,this.edge=null}function c(t,e){this.vertex=t,this.prev=null,this.next=null,this.twin=null,this.face=e}function h(t){this.point=t,this.prev=null,this.next=null,this.face=null}function u(){this.head=null,this.tail=null}return Object.assign(o.prototype,{setFromPoints:function(t){this.makeEmpty();for(var e=0,n=t.length;e<n;e++)this.vertices.push(new h(t[e]));return this.compute(),this},setFromObject:function(t){var e=[];return t.updateMatrixWorld(!0),t.traverse(function(t){var n,s,r,i=t.geometry;if(void 0!==i)if(i.isGeometry){var o=i.vertices;for(n=0,s=o.length;n<s;n++)(r=o[n].clone()).applyMatrix4(t.matrixWorld),e.push(r)}else if(i.isBufferGeometry){var a=i.attributes.position;if(void 0!==a)for(n=0,s=a.count;n<s;n++)(r=new Vector3).fromBufferAttribute(a,n).applyMatrix4(t.matrixWorld),e.push(r)}}),this.setFromPoints(e)},containsPoint:function(t){for(var e=this.faces,n=0,s=e.length;n<s;n++){if(e[n].distanceToPoint(t)>this.tolerance)return!1}return!0},intersectRay:function(t,e){for(var n=this.faces,s=-1/0,r=1/0,i=0,o=n.length;i<o;i++){var a=n[i],c=a.distanceToPoint(t.origin),h=a.normal.dot(t.direction);if(c>0&&h>=0)return null;var u=0!==h?-c/h:0;if(!(u<=0)&&(h>0?r=Math.min(u,r):s=Math.max(u,s),s>r))return null}return s!==-1/0?t.at(s,e):t.at(r,e),e},intersectsRay:function(t){return null!==this.intersectRay(t,i)},makeEmpty:function(){return this.faces=[],this.vertices=[],this},addVertexToFace:function(t,e){return t.face=e,null===e.outside?this.assigned.append(t):this.assigned.insertBefore(e.outside,t),e.outside=t,this},removeVertexFromFace:function(t,e){return t===e.outside&&(null!==t.next&&t.next.face===e?e.outside=t.next:e.outside=null),this.assigned.remove(t),this},removeAllVerticesFromFace:function(t){if(null!==t.outside){for(var e=t.outside,n=t.outside;null!==n.next&&n.next.face===t;)n=n.next;return this.assigned.removeSubList(e,n),e.prev=n.next=null,t.outside=null,e}},deleteFaceVertices:function(t,e){var n=this.removeAllVerticesFromFace(t);if(void 0!==n)if(void 0===e)this.unassigned.appendChain(n);else{var s=n;do{var r=s.next;e.distanceToPoint(s.point)>this.tolerance?this.addVertexToFace(s,e):this.unassigned.append(s),s=r}while(null!==s)}return this},resolveUnassignedPoints:function(t){if(!1===this.unassigned.isEmpty()){var e=this.unassigned.first();do{for(var n=e.next,s=this.tolerance,i=null,o=0;o<t.length;o++){var a=t[o];if(a.mark===r){var c=a.distanceToPoint(e.point);if(c>s&&(s=c,i=a),s>1e3*this.tolerance)break}}null!==i&&this.addVertexToFace(e,i),e=n}while(null!==e)}return this},computeExtremes:function(){var t,e,n,s=new Vector3,r=new Vector3,i=[],o=[];for(t=0;t<3;t++)i[t]=o[t]=this.vertices[0];for(s.copy(this.vertices[0].point),r.copy(this.vertices[0].point),t=0,e=this.vertices.length;t<e;t++){var a=this.vertices[t],c=a.point;for(n=0;n<3;n++)c.getComponent(n)<s.getComponent(n)&&(s.setComponent(n,c.getComponent(n)),i[n]=a);for(n=0;n<3;n++)c.getComponent(n)>r.getComponent(n)&&(r.setComponent(n,c.getComponent(n)),o[n]=a)}return this.tolerance=3*Number.EPSILON*(Math.max(Math.abs(s.x),Math.abs(r.x))+Math.max(Math.abs(s.y),Math.abs(r.y))+Math.max(Math.abs(s.z),Math.abs(r.z))),{min:i,max:o}},computeInitialHull:function(){void 0===t&&(t=new Line3,e=new Plane,n=new Vector3);var s,r,i,o,c,h,u,l,d,p=this.vertices,v=this.computeExtremes(),m=v.min,f=v.max,x=0,y=0;for(h=0;h<3;h++)(d=f[h].point.getComponent(h)-m[h].point.getComponent(h))>x&&(x=d,y=h);for(r=m[y],i=f[y],x=0,t.set(r.point,i.point),h=0,u=this.vertices.length;h<u;h++)(s=p[h])!==r&&s!==i&&(t.closestPointToPoint(s.point,!0,n),(d=n.distanceToSquared(s.point))>x&&(x=d,o=s));for(x=-1,e.setFromCoplanarPoints(r.point,i.point,o.point),h=0,u=this.vertices.length;h<u;h++)(s=p[h])!==r&&s!==i&&s!==o&&(d=Math.abs(e.distanceToPoint(s.point)))>x&&(x=d,c=s);var g=[];if(e.distanceToPoint(c.point)<0)for(g.push(a.create(r,i,o),a.create(c,i,r),a.create(c,o,i),a.create(c,r,o)),h=0;h<3;h++)l=(h+1)%3,g[h+1].getEdge(2).setTwin(g[0].getEdge(l)),g[h+1].getEdge(1).setTwin(g[l+1].getEdge(0));else for(g.push(a.create(r,o,i),a.create(c,r,i),a.create(c,i,o),a.create(c,o,r)),h=0;h<3;h++)l=(h+1)%3,g[h+1].getEdge(2).setTwin(g[0].getEdge((3-h)%3)),g[h+1].getEdge(0).setTwin(g[l+1].getEdge(1));for(h=0;h<4;h++)this.faces.push(g[h]);for(h=0,u=p.length;h<u;h++)if((s=p[h])!==r&&s!==i&&s!==o&&s!==c){x=this.tolerance;var _=null;for(l=0;l<4;l++)(d=this.faces[l].distanceToPoint(s.point))>x&&(x=d,_=this.faces[l]);null!==_&&this.addVertexToFace(s,_)}return this},reindexFaces:function(){for(var t=[],e=0;e<this.faces.length;e++){var n=this.faces[e];n.mark===r&&t.push(n)}return this.faces=t,this},nextVertexToAdd:function(){if(!1===this.assigned.isEmpty()){var t,e=0,n=this.assigned.first().face,s=n.outside;do{var r=n.distanceToPoint(s.point);r>e&&(e=r,t=s),s=s.next}while(null!==s&&s.face===n);return t}},computeHorizon:function(t,e,n,s){var i;this.deleteFaceVertices(n),n.mark=1,i=null===e?e=n.getEdge(0):e.next;do{var o=i.twin,a=o.face;a.mark===r&&(a.distanceToPoint(t)>this.tolerance?this.computeHorizon(t,o,a,s):s.push(i)),i=i.next}while(i!==e);return this},addAdjoiningFace:function(t,e){var n=a.create(t,e.tail(),e.head());return this.faces.push(n),n.getEdge(-1).setTwin(e.twin),n.getEdge(0)},addNewFaces:function(t,e){this.newFaces=[];for(var n=null,s=null,r=0;r<e.length;r++){var i=e[r],o=this.addAdjoiningFace(t,i);null===n?n=o:o.next.setTwin(s),this.newFaces.push(o.face),s=o}return n.next.setTwin(s),this},addVertexToHull:function(t){var e=[];return this.unassigned.clear(),this.removeVertexFromFace(t,t.face),this.computeHorizon(t.point,null,t.face,e),this.addNewFaces(t,e),this.resolveUnassignedPoints(this.newFaces),this},cleanup:function(){return this.assigned.clear(),this.unassigned.clear(),this.newFaces=[],this},compute:function(){var t;for(this.computeInitialHull();void 0!==(t=this.nextVertexToAdd());)this.addVertexToHull(t);return this.reindexFaces(),this.cleanup(),this}}),Object.assign(a,{create:function(t,e,n){var s=new a,r=new c(t,s),i=new c(e,s),o=new c(n,s);return r.next=o.prev=i,i.next=r.prev=o,o.next=i.prev=r,s.edge=r,s.compute()}}),Object.assign(a.prototype,{getEdge:function(t){for(var e=this.edge;t>0;)e=e.next,t--;for(;t<0;)e=e.prev,t++;return e},compute:function(){void 0===s&&(s=new Triangle);var t=this.edge.tail(),e=this.edge.head(),n=this.edge.next.head();return s.set(t.point,e.point,n.point),s.getNormal(this.normal),s.getMidpoint(this.midpoint),this.area=s.getArea(),this.constant=this.normal.dot(this.midpoint),this},distanceToPoint:function(t){return this.normal.dot(t)-this.constant}}),Object.assign(c.prototype,{head:function(){return this.vertex},tail:function(){return this.prev?this.prev.vertex:null},length:function(){var t=this.head(),e=this.tail();return null!==e?e.point.distanceTo(t.point):-1},lengthSquared:function(){var t=this.head(),e=this.tail();return null!==e?e.point.distanceToSquared(t.point):-1},setTwin:function(t){return this.twin=t,t.twin=this,this}}),Object.assign(u.prototype,{first:function(){return this.head},last:function(){return this.tail},clear:function(){return this.head=this.tail=null,this},insertBefore:function(t,e){return e.prev=t.prev,e.next=t,null===e.prev?this.head=e:e.prev.next=e,t.prev=e,this},insertAfter:function(t,e){return e.prev=t,e.next=t.next,null===e.next?this.tail=e:e.next.prev=e,t.next=e,this},append:function(t){return null===this.head?this.head=t:this.tail.next=t,t.prev=this.tail,t.next=null,this.tail=t,this},appendChain:function(t){for(null===this.head?this.head=t:this.tail.next=t,t.prev=this.tail;null!==t.next;)t=t.next;return this.tail=t,this},remove:function(t){return null===t.prev?this.head=t.next:t.prev.next=t.next,null===t.next?this.tail=t.prev:t.next.prev=t.prev,this},removeSubList:function(t,e){return null===t.prev?this.head=e.next:t.prev.next=e.next,null===e.next?this.tail=t.prev:e.next.prev=t.prev,this},isEmpty:function(){return null===this.head}}),o}(),QuickHull=function(t){for(var e=[],n=0;n<t.length;++n)e[n]=new Vector3(...t[n]);function s(t,e){for(var n=0;n<t.length;++n)if(Math.abs(t[n].x-e.x)<=1e-12&&Math.abs(t[n].y-e.y)<=1e-12&&Math.abs(t[n].z-e.z)<=1e-12)return n;return-1}for(var r=(new ConvexHull).setFromPoints(e).faces,i=[],o=[],a=0;a<r.length;a++){var c=r[a],h=c.edge;o.push([c.normal.x,c.normal.y,c.normal.z]);do{var u=h.head().point;i.push(s(e,u)),h=h.next}while(h!==c.edge)}return{indices:i,normals:o}};

const OBJ=function(){var e;!function(e){e.BYTE="BYTE",e.UNSIGNED_BYTE="UNSIGNED_BYTE",e.SHORT="SHORT",e.UNSIGNED_SHORT="UNSIGNED_SHORT",e.FLOAT="FLOAT"}(e||(e={}));class t extends Error{constructor(e){super("found duplicate attribute: "+e.key)}}class s{constructor(e,t,s,a=!1){switch(this.key=e,this.size=t,this.type=s,this.normalized=a,s){case"BYTE":case"UNSIGNED_BYTE":this.sizeOfType=1;break;case"SHORT":case"UNSIGNED_SHORT":this.sizeOfType=2;break;case"FLOAT":this.sizeOfType=4;break;default:throw new Error("Unknown gl type: "+s)}this.sizeInBytes=this.sizeOfType*t}}class a{constructor(...e){this.attributes=e,this.attributeMap={};let s=0,a=0;for(const r of e){if(this.attributeMap[r.key])throw new t(r);s%r.sizeOfType!=0&&(s+=r.sizeOfType-s%r.sizeOfType,console.warn("Layout requires padding before "+r.key+" attribute")),this.attributeMap[r.key]={attribute:r,size:r.size,type:r.type,normalized:r.normalized,offset:s},s+=r.sizeInBytes,a=Math.max(a,r.sizeOfType)}s%a!=0&&(s+=a-s%a,console.warn("Layout requires padding at the back")),this.stride=s;for(const t of e)this.attributeMap[t.key].stride=this.stride}}a.POSITION=new s("position",3,e.FLOAT),a.POSITION4=new s("position4",4,e.FLOAT),a.NORMAL=new s("normal",3,e.FLOAT),a.TANGENT=new s("tangent",3,e.FLOAT),a.BITANGENT=new s("bitangent",3,e.FLOAT),a.UV=new s("uv",2,e.FLOAT),a.UV4=new s("uv4",4,e.FLOAT),a.MATERIAL_INDEX=new s("materialIndex",1,e.SHORT),a.MATERIAL_ENABLED=new s("materialEnabled",1,e.UNSIGNED_SHORT),a.AMBIENT=new s("ambient",3,e.FLOAT),a.DIFFUSE=new s("diffuse",3,e.FLOAT),a.SPECULAR=new s("specular",3,e.FLOAT),a.SPECULAR_EXPONENT=new s("specularExponent",3,e.FLOAT),a.EMISSIVE=new s("emissive",3,e.FLOAT),a.TRANSMISSION_FILTER=new s("transmissionFilter",3,e.FLOAT),a.DISSOLVE=new s("dissolve",1,e.FLOAT),a.ILLUMINATION=new s("illumination",1,e.UNSIGNED_SHORT),a.REFRACTION_INDEX=new s("refractionIndex",1,e.FLOAT),a.SHARPNESS=new s("sharpness",1,e.FLOAT),a.MAP_DIFFUSE=new s("mapDiffuse",1,e.SHORT),a.MAP_AMBIENT=new s("mapAmbient",1,e.SHORT),a.MAP_SPECULAR=new s("mapSpecular",1,e.SHORT),a.MAP_SPECULAR_EXPONENT=new s("mapSpecularExponent",1,e.SHORT),a.MAP_DISSOLVE=new s("mapDissolve",1,e.SHORT),a.ANTI_ALIASING=new s("antiAliasing",1,e.UNSIGNED_SHORT),a.MAP_BUMP=new s("mapBump",1,e.SHORT),a.MAP_DISPLACEMENT=new s("mapDisplacement",1,e.SHORT),a.MAP_DECAL=new s("mapDecal",1,e.SHORT),a.MAP_EMISSIVE=new s("mapEmissive",1,e.SHORT);class r{constructor(e){this.name=e,this.ambient=[0,0,0],this.diffuse=[0,0,0],this.specular=[0,0,0],this.emissive=[0,0,0],this.transmissionFilter=[0,0,0],this.dissolve=0,this.specularExponent=0,this.transparency=0,this.illumination=0,this.refractionIndex=1,this.sharpness=0,this.mapDiffuse={colorCorrection:!1,horizontalBlending:!0,verticalBlending:!0,boostMipMapSharpness:0,modifyTextureMap:{brightness:0,contrast:1},offset:{u:0,v:0,w:0},scale:{u:1,v:1,w:1},turbulence:{u:0,v:0,w:0},clamp:!1,textureResolution:null,bumpMultiplier:1,imfChan:null,filename:""},this.mapAmbient={colorCorrection:!1,horizontalBlending:!0,verticalBlending:!0,boostMipMapSharpness:0,modifyTextureMap:{brightness:0,contrast:1},offset:{u:0,v:0,w:0},scale:{u:1,v:1,w:1},turbulence:{u:0,v:0,w:0},clamp:!1,textureResolution:null,bumpMultiplier:1,imfChan:null,filename:""},this.mapSpecular={colorCorrection:!1,horizontalBlending:!0,verticalBlending:!0,boostMipMapSharpness:0,modifyTextureMap:{brightness:0,contrast:1},offset:{u:0,v:0,w:0},scale:{u:1,v:1,w:1},turbulence:{u:0,v:0,w:0},clamp:!1,textureResolution:null,bumpMultiplier:1,imfChan:null,filename:""},this.mapSpecularExponent={colorCorrection:!1,horizontalBlending:!0,verticalBlending:!0,boostMipMapSharpness:0,modifyTextureMap:{brightness:0,contrast:1},offset:{u:0,v:0,w:0},scale:{u:1,v:1,w:1},turbulence:{u:0,v:0,w:0},clamp:!1,textureResolution:null,bumpMultiplier:1,imfChan:null,filename:""},this.mapDissolve={colorCorrection:!1,horizontalBlending:!0,verticalBlending:!0,boostMipMapSharpness:0,modifyTextureMap:{brightness:0,contrast:1},offset:{u:0,v:0,w:0},scale:{u:1,v:1,w:1},turbulence:{u:0,v:0,w:0},clamp:!1,textureResolution:null,bumpMultiplier:1,imfChan:null,filename:""},this.antiAliasing=!1,this.mapBump={colorCorrection:!1,horizontalBlending:!0,verticalBlending:!0,boostMipMapSharpness:0,modifyTextureMap:{brightness:0,contrast:1},offset:{u:0,v:0,w:0},scale:{u:1,v:1,w:1},turbulence:{u:0,v:0,w:0},clamp:!1,textureResolution:null,bumpMultiplier:1,imfChan:null,filename:""},this.mapDisplacement={colorCorrection:!1,horizontalBlending:!0,verticalBlending:!0,boostMipMapSharpness:0,modifyTextureMap:{brightness:0,contrast:1},offset:{u:0,v:0,w:0},scale:{u:1,v:1,w:1},turbulence:{u:0,v:0,w:0},clamp:!1,textureResolution:null,bumpMultiplier:1,imfChan:null,filename:""},this.mapDecal={colorCorrection:!1,horizontalBlending:!0,verticalBlending:!0,boostMipMapSharpness:0,modifyTextureMap:{brightness:0,contrast:1},offset:{u:0,v:0,w:0},scale:{u:1,v:1,w:1},turbulence:{u:0,v:0,w:0},clamp:!1,textureResolution:null,bumpMultiplier:1,imfChan:null,filename:""},this.mapEmissive={colorCorrection:!1,horizontalBlending:!0,verticalBlending:!0,boostMipMapSharpness:0,modifyTextureMap:{brightness:0,contrast:1},offset:{u:0,v:0,w:0},scale:{u:1,v:1,w:1},turbulence:{u:0,v:0,w:0},clamp:!1,textureResolution:null,bumpMultiplier:1,imfChan:null,filename:""},this.mapReflections=[]}}const i=new r("sentinel");class n{constructor(e){this.data=e,this.currentMaterial=i,this.materials={},this.parse()}parse_newmtl(e){const t=e[0];this.currentMaterial=new r(t),this.materials[t]=this.currentMaterial}parseColor(e){if("spectral"==e[0])throw new Error("The MTL parser does not support spectral curve files. You will need to convert the MTL colors to either RGB or CIEXYZ.");if("xyz"==e[0])throw new Error("The MTL parser does not currently support XYZ colors. Either convert the XYZ values to RGB or create an issue to add support for XYZ");if(3==e.length){const[t,s,a]=e;return[parseFloat(t),parseFloat(s),parseFloat(a)]}const t=parseFloat(e[0]);return[t,t,t]}parse_Ka(e){this.currentMaterial.ambient=this.parseColor(e)}parse_Kd(e){this.currentMaterial.diffuse=this.parseColor(e)}parse_Ks(e){this.currentMaterial.specular=this.parseColor(e)}parse_Ke(e){this.currentMaterial.emissive=this.parseColor(e)}parse_Tf(e){this.currentMaterial.transmissionFilter=this.parseColor(e)}parse_d(e){this.currentMaterial.dissolve=parseFloat(e.pop()||"0")}parse_illum(e){this.currentMaterial.illumination=parseInt(e[0])}parse_Ni(e){this.currentMaterial.refractionIndex=parseFloat(e[0])}parse_Ns(e){this.currentMaterial.specularExponent=parseInt(e[0])}parse_sharpness(e){this.currentMaterial.sharpness=parseInt(e[0])}parse_cc(e,t){t.colorCorrection="on"==e[0]}parse_blendu(e,t){t.horizontalBlending="on"==e[0]}parse_blendv(e,t){t.verticalBlending="on"==e[0]}parse_boost(e,t){t.boostMipMapSharpness=parseFloat(e[0])}parse_mm(e,t){t.modifyTextureMap.brightness=parseFloat(e[0]),t.modifyTextureMap.contrast=parseFloat(e[1])}parse_ost(e,t,s){for(;e.length<3;)e.push(s.toString());t.u=parseFloat(e[0]),t.v=parseFloat(e[1]),t.w=parseFloat(e[2])}parse_o(e,t){this.parse_ost(e,t.offset,0)}parse_s(e,t){this.parse_ost(e,t.scale,1)}parse_t(e,t){this.parse_ost(e,t.turbulence,0)}parse_texres(e,t){t.textureResolution=parseFloat(e[0])}parse_clamp(e,t){t.clamp="on"==e[0]}parse_bm(e,t){t.bumpMultiplier=parseFloat(e[0])}parse_imfchan(e,t){t.imfChan=e[0]}parse_type(e,t){t.reflectionType=e[0]}parseOptions(e){const t={colorCorrection:!1,horizontalBlending:!0,verticalBlending:!0,boostMipMapSharpness:0,modifyTextureMap:{brightness:0,contrast:1},offset:{u:0,v:0,w:0},scale:{u:1,v:1,w:1},turbulence:{u:0,v:0,w:0},clamp:!1,textureResolution:null,bumpMultiplier:1,imfChan:null,filename:""};let s,a;const r={};for(e.reverse();e.length;){const t=e.pop();t.startsWith("-")?r[s=t.substr(1)]=[]:s&&r[s].push(t)}for(s in r){if(!r.hasOwnProperty(s))continue;a=r[s];const e=this["parse_"+s];e&&e.bind(this)(a,t)}return t}parseMap(e){let t,s="";e[0].startsWith("-")?(s=e.pop(),t=e):[s,...t]=e;const a=this.parseOptions(t);return a.filename=s.replace(/\\/g,"/"),a}parse_map_Ka(e){this.currentMaterial.mapAmbient=this.parseMap(e)}parse_map_Kd(e){this.currentMaterial.mapDiffuse=this.parseMap(e)}parse_map_Ks(e){this.currentMaterial.mapSpecular=this.parseMap(e)}parse_map_Ke(e){this.currentMaterial.mapEmissive=this.parseMap(e)}parse_map_Ns(e){this.currentMaterial.mapSpecularExponent=this.parseMap(e)}parse_map_d(e){this.currentMaterial.mapDissolve=this.parseMap(e)}parse_map_aat(e){this.currentMaterial.antiAliasing="on"==e[0]}parse_map_bump(e){this.currentMaterial.mapBump=this.parseMap(e)}parse_bump(e){this.parse_map_bump(e)}parse_disp(e){this.currentMaterial.mapDisplacement=this.parseMap(e)}parse_decal(e){this.currentMaterial.mapDecal=this.parseMap(e)}parse_refl(e){this.currentMaterial.mapReflections.push(this.parseMap(e))}parse(){const e=this.data.split(/\r?\n/);for(let t of e){if(!(t=t.trim())||t.startsWith("#"))continue;const[e,...s]=t.split(/\s/),a=this["parse_"+e];a?a.bind(this)(s):console.warn("Don't know how to parse the directive: \""+e+'"')}delete this.data,this.currentMaterial=i}}class o{constructor(e,t){this.name="",this.indicesPerMaterial=[],this.materialsByIndex={},this.tangents=[],this.bitangents=[],(t=t||{}).materials=t.materials||{},t.enableWTextureCoord=!!t.enableWTextureCoord,this.vertexNormals=[],this.textures=[],this.indices=[],this.textureStride=t.enableWTextureCoord?3:2;const s=[],a=[],r=[],i=[],n={};let o=-1,c=0;const u={verts:[],norms:[],textures:[],hashindices:{},indices:[[]],materialIndices:[],index:0},h=/^v\s/,p=/^vn\s/,m=/^vt\s/,f=/^f\s/,d=/\s+/,M=/^usemtl/,b=e.split("\n");for(let e of b){if(!(e=e.trim())||e.startsWith("#"))continue;const b=e.split(d);if(b.shift(),h.test(e))s.push(...b);else if(p.test(e))a.push(...b);else if(m.test(e)){let e=b;b.length>2&&!t.enableWTextureCoord?e=b.slice(0,2):2===b.length&&t.enableWTextureCoord&&e.push("0"),r.push(...e)}else if(M.test(e)){const e=b[0];e in n||(i.push(e),n[e]=i.length-1,n[e]>0&&u.indices.push([])),c=o=n[e]}else if(f.test(e)){const e=l(b);for(const i of e)for(let e=0,n=i.length;e<n;e++){const n=i[e]+","+o;if(n in u.hashindices)u.indices[c].push(u.hashindices[n]);else{const l=i[e].split("/"),h=l.length-1;if(u.verts.push(+s[3*(+l[0]-1)+0]),u.verts.push(+s[3*(+l[0]-1)+1]),u.verts.push(+s[3*(+l[0]-1)+2]),r.length){const e=t.enableWTextureCoord?3:2;u.textures.push(+r[(+l[1]-1)*e+0]),u.textures.push(+r[(+l[1]-1)*e+1]),t.enableWTextureCoord&&u.textures.push(+r[(+l[1]-1)*e+2])}u.norms.push(+a[3*(+l[h]-1)+0]),u.norms.push(+a[3*(+l[h]-1)+1]),u.norms.push(+a[3*(+l[h]-1)+2]),u.materialIndices.push(o),u.hashindices[n]=u.index,u.indices[c].push(u.hashindices[n]),u.index+=1}}}}this.vertices=u.verts,this.vertexNormals=u.norms,this.textures=u.textures,this.vertexMaterialIndices=u.materialIndices,this.indices=u.indices[c],this.indicesPerMaterial=u.indices,this.materialNames=i,this.materialIndices=n,this.materialsByIndex={},t.calcTangentsAndBitangents&&this.calculateTangentsAndBitangents()}calculateTangentsAndBitangents(){console.assert(!!(this.vertices&&this.vertices.length&&this.vertexNormals&&this.vertexNormals.length&&this.textures&&this.textures.length),"Missing attributes for calculating tangents and bitangents");const e={tangents:[...new Array(this.vertices.length)].map(e=>0),bitangents:[...new Array(this.vertices.length)].map(e=>0)},t=this.indices,s=this.vertices,a=this.vertexNormals,r=this.textures;for(let i=0;i<t.length;i+=3){const n=t[i+0],o=t[i+1],l=t[i+2],c=s[3*n+0],u=s[3*n+1],h=s[3*n+2],p=r[2*n+0],m=r[2*n+1],f=s[3*o+0],d=s[3*o+1],M=s[3*o+2],b=r[2*o+0],v=r[2*o+1],g=f-c,x=d-u,T=M-h,w=s[3*l+0]-c,I=s[3*l+1]-u,y=s[3*l+2]-h,A=b-p,F=v-m,E=r[2*l+0]-p,S=r[2*l+1]-m,_=A*S-F*E,B=1/Math.abs(_<1e-4?1:_),N=(g*S-w*F)*B,O=(x*S-I*F)*B,R=(T*S-y*F)*B,L=(w*A-g*E)*B,k=(I*A-x*E)*B,D=(y*A-T*E)*B,C=a[3*n+0],P=a[3*n+1],U=a[3*n+2],z=a[3*o+0],H=a[3*o+1],Y=a[3*o+2],G=a[3*l+0],W=a[3*l+1],V=a[3*l+2],X=N*C+O*P+R*U,j=N*z+O*H+R*Y,q=N*G+O*W+R*V,K=N-C*X,Z=O-P*X,J=R-U*X,$=N-z*j,Q=O-H*j,ee=R-Y*j,te=N-G*q,se=O-W*q,ae=R-V*q,re=Math.sqrt(K*K+Z*Z+J*J),ie=Math.sqrt($*$+Q*Q+ee*ee),ne=Math.sqrt(te*te+se*se+ae*ae),oe=L*C+k*P+D*U,le=L*z+k*H+D*Y,ce=L*G+k*W+D*V,ue=L-C*oe,he=k-P*oe,pe=D-U*oe,me=L-z*le,fe=k-H*le,de=D-Y*le,Me=L-G*ce,be=k-W*ce,ve=D-V*ce,ge=Math.sqrt(ue*ue+he*he+pe*pe),xe=Math.sqrt(me*me+fe*fe+de*de),Te=Math.sqrt(Me*Me+be*be+ve*ve);e.tangents[3*n+0]+=K/re,e.tangents[3*n+1]+=Z/re,e.tangents[3*n+2]+=J/re,e.tangents[3*o+0]+=$/ie,e.tangents[3*o+1]+=Q/ie,e.tangents[3*o+2]+=ee/ie,e.tangents[3*l+0]+=te/ne,e.tangents[3*l+1]+=se/ne,e.tangents[3*l+2]+=ae/ne,e.bitangents[3*n+0]+=ue/ge,e.bitangents[3*n+1]+=he/ge,e.bitangents[3*n+2]+=pe/ge,e.bitangents[3*o+0]+=me/xe,e.bitangents[3*o+1]+=fe/xe,e.bitangents[3*o+2]+=de/xe,e.bitangents[3*l+0]+=Me/Te,e.bitangents[3*l+1]+=be/Te,e.bitangents[3*l+2]+=ve/Te}this.tangents=e.tangents,this.bitangents=e.bitangents}makeBufferData(e){const t=this.vertices.length/3,s=new ArrayBuffer(e.stride*t);s.numItems=t;const r=new DataView(s);for(let s=0,i=0;s<t;s++){i=s*e.stride;for(const t of e.attributes){const n=i+e.attributeMap[t.key].offset;switch(t.key){case a.POSITION.key:r.setFloat32(n,this.vertices[3*s],!0),r.setFloat32(n+4,this.vertices[3*s+1],!0),r.setFloat32(n+8,this.vertices[3*s+2],!0);break;case a.POSITION4.key:r.setFloat32(n,this.vertices[3*s],!0),r.setFloat32(n+4,this.vertices[3*s+1],!0),r.setFloat32(n+8,this.vertices[3*s+2],!0),r.setFloat32(n+12,1,!0);break;case a.UV.key:r.setFloat32(n,this.textures[2*s],!0),r.setFloat32(n+4,this.textures[2*s+1],!0);break;case a.UV4.key:r.setFloat32(n,this.textures[2*s],!0),r.setFloat32(n+4,this.textures[2*s+1],!0),r.setFloat32(n+8,0,!0),r.setFloat32(n+12,1,!0);break;case a.NORMAL.key:r.setFloat32(n,this.vertexNormals[3*s],!0),r.setFloat32(n+4,this.vertexNormals[3*s+1],!0),r.setFloat32(n+8,this.vertexNormals[3*s+2],!0);break;case a.MATERIAL_INDEX.key:r.setInt16(n,this.vertexMaterialIndices[s],!0);break;case a.AMBIENT.key:{const e=this.vertexMaterialIndices[s],t=this.materialsByIndex[e];if(!t){console.warn('Material "'+this.materialNames[e]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}r.setFloat32(n,t.ambient[0],!0),r.setFloat32(n+4,t.ambient[1],!0),r.setFloat32(n+8,t.ambient[2],!0);break}case a.DIFFUSE.key:{const e=this.vertexMaterialIndices[s],t=this.materialsByIndex[e];if(!t){console.warn('Material "'+this.materialNames[e]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}r.setFloat32(n,t.diffuse[0],!0),r.setFloat32(n+4,t.diffuse[1],!0),r.setFloat32(n+8,t.diffuse[2],!0);break}case a.SPECULAR.key:{const e=this.vertexMaterialIndices[s],t=this.materialsByIndex[e];if(!t){console.warn('Material "'+this.materialNames[e]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}r.setFloat32(n,t.specular[0],!0),r.setFloat32(n+4,t.specular[1],!0),r.setFloat32(n+8,t.specular[2],!0);break}case a.SPECULAR_EXPONENT.key:{const e=this.vertexMaterialIndices[s],t=this.materialsByIndex[e];if(!t){console.warn('Material "'+this.materialNames[e]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}r.setFloat32(n,t.specularExponent,!0);break}case a.EMISSIVE.key:{const e=this.vertexMaterialIndices[s],t=this.materialsByIndex[e];if(!t){console.warn('Material "'+this.materialNames[e]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}r.setFloat32(n,t.emissive[0],!0),r.setFloat32(n+4,t.emissive[1],!0),r.setFloat32(n+8,t.emissive[2],!0);break}case a.TRANSMISSION_FILTER.key:{const e=this.vertexMaterialIndices[s],t=this.materialsByIndex[e];if(!t){console.warn('Material "'+this.materialNames[e]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}r.setFloat32(n,t.transmissionFilter[0],!0),r.setFloat32(n+4,t.transmissionFilter[1],!0),r.setFloat32(n+8,t.transmissionFilter[2],!0);break}case a.DISSOLVE.key:{const e=this.vertexMaterialIndices[s],t=this.materialsByIndex[e];if(!t){console.warn('Material "'+this.materialNames[e]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}r.setFloat32(n,t.dissolve,!0);break}case a.ILLUMINATION.key:{const e=this.vertexMaterialIndices[s],t=this.materialsByIndex[e];if(!t){console.warn('Material "'+this.materialNames[e]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}r.setInt16(n,t.illumination,!0);break}case a.REFRACTION_INDEX.key:{const e=this.vertexMaterialIndices[s],t=this.materialsByIndex[e];if(!t){console.warn('Material "'+this.materialNames[e]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}r.setFloat32(n,t.refractionIndex,!0);break}case a.SHARPNESS.key:{const e=this.vertexMaterialIndices[s],t=this.materialsByIndex[e];if(!t){console.warn('Material "'+this.materialNames[e]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}r.setFloat32(n,t.sharpness,!0);break}case a.ANTI_ALIASING.key:{const e=this.vertexMaterialIndices[s],t=this.materialsByIndex[e];if(!t){console.warn('Material "'+this.materialNames[e]+'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"');break}r.setInt16(n,t.antiAliasing?1:0,!0);break}}}}return s}makeIndexBufferData(){const e=new Uint16Array(this.indices);return e.numItems=this.indices.length,e}makeIndexBufferDataForMaterials(...e){const t=(new Array).concat(...e.map(e=>this.indicesPerMaterial[e])),s=new Uint16Array(t);return s.numItems=t.length,s}addMaterialLibrary(e){for(const t in e.materials){if(!(t in this.materialIndices))continue;const s=e.materials[t],a=this.materialIndices[s.name];this.materialsByIndex[a]=s}}}function*l(e){if(e.length<=3)yield e;else if(4===e.length)yield[e[0],e[1],e[2]],yield[e[2],e[3],e[0]];else for(let t=1;t<e.length-1;t++)yield[e[0],e[t],e[t+1]]}function c(e,t){const s=["mapDiffuse","mapAmbient","mapSpecular","mapDissolve","mapBump","mapDisplacement","mapDecal","mapEmissive"];t.endsWith("/")||(t+="/");const a=[];for(const r in e.materials){if(!e.materials.hasOwnProperty(r))continue;const i=e.materials[r];for(const e of s){const s=i[e];if(!s||!s.filename)continue;const r=t+s.filename;a.push(fetch(r).then(e=>{if(!e.ok)throw new Error;return e.blob()}).then(function(e){const t=new Image;return t.src=URL.createObjectURL(e),s.texture=t,new Promise(e=>t.onload=e)}).catch(()=>{console.error("Unable to download texture: "+r)}))}}return Promise.all(a)}function u(e,t,s,a){const r=e.createBuffer(),i=t===e.ARRAY_BUFFER?Float32Array:Uint16Array;return e.bindBuffer(t,r),e.bufferData(t,new i(s),e.STATIC_DRAW),r.itemSize=a,r.numItems=s.length/a,r}return{Attribute:s,DuplicateAttributeException:t,Layout:a,Material:r,MaterialLibrary:n,Mesh:o,TYPES:e,downloadModels:function(e){const t=[];for(const a of e){if(!a.obj)throw new Error('"obj" attribute of model object not set. The .obj file is required to be set in order to use downloadModels()');const e={indicesPerMaterial:!!a.indicesPerMaterial,calcTangentsAndBitangents:!!a.calcTangentsAndBitangents};let r=a.name;if(!r){const e=a.obj.split("/");r=e[e.length-1].replace(".obj","")}const i=Promise.resolve(r),l=fetch(a.obj).then(e=>e.text()).then(t=>new o(t,e));let u;if(a.mtl){const e="string"!=typeof(s=a).mtl?s.obj.replace(/\.obj$/,".mtl"):s.mtl;u=fetch(e).then(e=>e.text()).then(t=>{const s=new n(t);if(!1!==a.downloadMtlTextures){let t=a.mtlTextureRoot;return t||(t=e.substr(0,e.lastIndexOf("/"))),Promise.all([Promise.resolve(s),c(s,t)])}return Promise.all([Promise.resolve(s),void 0])}).then(e=>e[0])}const h=[i,l,u];t.push(Promise.all(h))}var s;return Promise.all(t).then(e=>{const t={};for(const s of e){const[e,a,r]=s;a.name=e,r&&a.addMaterialLibrary(r),t[e]=a}return t})},downloadMeshes:function(e,t,s){_checkNULL(s)&&(s={});const a=[];for(const t in e){if(!e.hasOwnProperty(t))continue;const s=e[t];a.push(fetch(s).then(e=>e.text()).then(e=>[t,new o(e)]))}Promise.all(a).then(e=>{for(const[t,a]of e)s[t]=a;return t(s)})},initMeshBuffers:function(e,t){return t.normalBuffer=u(e,e.ARRAY_BUFFER,t.vertexNormals,3),t.textureBuffer=u(e,e.ARRAY_BUFFER,t.textures,t.textureStride),t.vertexBuffer=u(e,e.ARRAY_BUFFER,t.vertices,3),t.indexBuffer=u(e,e.ELEMENT_ARRAY_BUFFER,t.indices,1),t},deleteMeshBuffers:function(e,t){e.deleteBuffer(t.normalBuffer),e.deleteBuffer(t.textureBuffer),e.deleteBuffer(t.vertexBuffer),e.deleteBuffer(t.indexBuffer)}}}();

(function() {'use strict';function q(d){throw d;}var t=void 0,v=!0,ca=this;function B(d,a){var c=d.split("."),b=ca;!(c[0]in b)&&b.execScript&&b.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)!c.length&&a!==t?b[e]=a:b=b[e]?b[e]:b[e]={}};var E="undefined"!==typeof Uint8Array&&"undefined"!==typeof Uint16Array&&"undefined"!==typeof Uint32Array&&"undefined"!==typeof DataView;function H(d,a){this.index="number"===typeof a?a:0;this.m=0;this.buffer=d instanceof(E?Uint8Array:Array)?d:new (E?Uint8Array:Array)(32768);2*this.buffer.length<=this.index&&q(Error("invalid index"));this.buffer.length<=this.index&&this.f()}H.prototype.f=function(){var d=this.buffer,a,c=d.length,b=new (E?Uint8Array:Array)(c<<1);if(E)b.set(d);else for(a=0;a<c;++a)b[a]=d[a];return this.buffer=b};
H.prototype.d=function(d,a,c){var b=this.buffer,e=this.index,f=this.m,g=b[e],k;c&&1<a&&(d=8<a?(J[d&255]<<24|J[d>>>8&255]<<16|J[d>>>16&255]<<8|J[d>>>24&255])>>32-a:J[d]>>8-a);if(8>a+f)g=g<<a|d,f+=a;else for(k=0;k<a;++k)g=g<<1|d>>a-k-1&1,8===++f&&(f=0,b[e++]=J[g],g=0,e===b.length&&(b=this.f()));b[e]=g;this.buffer=b;this.m=f;this.index=e};H.prototype.finish=function(){var d=this.buffer,a=this.index,c;0<this.m&&(d[a]<<=8-this.m,d[a]=J[d[a]],a++);E?c=d.subarray(0,a):(d.length=a,c=d);return c};
var da=new (E?Uint8Array:Array)(256),ea;for(ea=0;256>ea;++ea){for(var M=ea,fa=M,ka=7,M=M>>>1;M;M>>>=1)fa<<=1,fa|=M&1,--ka;da[ea]=(fa<<ka&255)>>>0}var J=da;function la(d,a,c){var b,e="number"===typeof a?a:a=0,f="number"===typeof c?c:d.length;b=-1;for(e=f&7;e--;++a)b=b>>>8^S[(b^d[a])&255];for(e=f>>3;e--;a+=8)b=b>>>8^S[(b^d[a])&255],b=b>>>8^S[(b^d[a+1])&255],b=b>>>8^S[(b^d[a+2])&255],b=b>>>8^S[(b^d[a+3])&255],b=b>>>8^S[(b^d[a+4])&255],b=b>>>8^S[(b^d[a+5])&255],b=b>>>8^S[(b^d[a+6])&255],b=b>>>8^S[(b^d[a+7])&255];return(b^4294967295)>>>0}
var ma=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,853044451,1172266101,3705015759,
2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,4240017532,1658658271,366619977,
2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,225274430,2053790376,3826175755,
2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,2998733608,733239954,1555261956,
3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,2932959818,3654703836,1088359270,
936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],S=E?new Uint32Array(ma):ma;function T(){}T.prototype.getName=function(){return this.name};T.prototype.getData=function(){return this.data};T.prototype.X=function(){return this.Y};function na(d){this.buffer=new (E?Uint16Array:Array)(2*d);this.length=0}na.prototype.getParent=function(d){return 2*((d-2)/4|0)};na.prototype.push=function(d,a){var c,b,e=this.buffer,f;c=this.length;e[this.length++]=a;for(e[this.length++]=d;0<c;)if(b=this.getParent(c),e[c]>e[b])f=e[c],e[c]=e[b],e[b]=f,f=e[c+1],e[c+1]=e[b+1],e[b+1]=f,c=b;else break;return this.length};
na.prototype.pop=function(){var d,a,c=this.buffer,b,e,f;a=c[0];d=c[1];this.length-=2;c[0]=c[this.length];c[1]=c[this.length+1];for(f=0;;){e=2*f+2;if(e>=this.length)break;e+2<this.length&&c[e+2]>c[e]&&(e+=2);if(c[e]>c[f])b=c[f],c[f]=c[e],c[e]=b,b=c[f+1],c[f+1]=c[e+1],c[e+1]=b;else break;f=e}return{index:d,value:a,length:this.length}};function U(d){var a=d.length,c=0,b=Number.POSITIVE_INFINITY,e,f,g,k,h,m,r,p,l,n;for(p=0;p<a;++p)d[p]>c&&(c=d[p]),d[p]<b&&(b=d[p]);e=1<<c;f=new (E?Uint32Array:Array)(e);g=1;k=0;for(h=2;g<=c;){for(p=0;p<a;++p)if(d[p]===g){m=0;r=k;for(l=0;l<g;++l)m=m<<1|r&1,r>>=1;n=g<<16|p;for(l=m;l<e;l+=h)f[l]=n;++k}++g;k<<=1;h<<=1}return[f,c,b]};function oa(d,a){this.k=ra;this.I=0;this.input=E&&d instanceof Array?new Uint8Array(d):d;this.b=0;a&&(a.lazy&&(this.I=a.lazy),"number"===typeof a.compressionType&&(this.k=a.compressionType),a.outputBuffer&&(this.a=E&&a.outputBuffer instanceof Array?new Uint8Array(a.outputBuffer):a.outputBuffer),"number"===typeof a.outputIndex&&(this.b=a.outputIndex));this.a||(this.a=new (E?Uint8Array:Array)(32768))}var ra=2,sa={NONE:0,v:1,o:ra,aa:3},ta=[],V;
for(V=0;288>V;V++)switch(v){case 143>=V:ta.push([V+48,8]);break;case 255>=V:ta.push([V-144+400,9]);break;case 279>=V:ta.push([V-256+0,7]);break;case 287>=V:ta.push([V-280+192,8]);break;default:q("invalid literal: "+V)}
oa.prototype.g=function(){var d,a,c,b,e=this.input;switch(this.k){case 0:c=0;for(b=e.length;c<b;){a=E?e.subarray(c,c+65535):e.slice(c,c+65535);c+=a.length;var f=a,g=c===b,k=t,h=t,m=t,r=t,p=t,l=this.a,n=this.b;if(E){for(l=new Uint8Array(this.a.buffer);l.length<=n+f.length+5;)l=new Uint8Array(l.length<<1);l.set(this.a)}k=g?1:0;l[n++]=k|0;h=f.length;m=~h+65536&65535;l[n++]=h&255;l[n++]=h>>>8&255;l[n++]=m&255;l[n++]=m>>>8&255;if(E)l.set(f,n),n+=f.length,l=l.subarray(0,n);else{r=0;for(p=f.length;r<p;++r)l[n++]=
f[r];l.length=n}this.b=n;this.a=l}break;case 1:var s=new H(E?new Uint8Array(this.a.buffer):this.a,this.b);s.d(1,1,v);s.d(1,2,v);var u=ua(this,e),w,C,x;w=0;for(C=u.length;w<C;w++)if(x=u[w],H.prototype.d.apply(s,ta[x]),256<x)s.d(u[++w],u[++w],v),s.d(u[++w],5),s.d(u[++w],u[++w],v);else if(256===x)break;this.a=s.finish();this.b=this.a.length;break;case ra:var D=new H(E?new Uint8Array(this.a.buffer):this.a,this.b),N,z,O,$,aa,pb=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],ga,La,ha,Ma,pa,xa=Array(19),
Na,ba,qa,F,Oa;N=ra;D.d(1,1,v);D.d(N,2,v);z=ua(this,e);ga=va(this.V,15);La=wa(ga);ha=va(this.U,7);Ma=wa(ha);for(O=286;257<O&&0===ga[O-1];O--);for($=30;1<$&&0===ha[$-1];$--);var Pa=O,Qa=$,L=new (E?Uint32Array:Array)(Pa+Qa),y,P,A,ia,K=new (E?Uint32Array:Array)(316),I,G,Q=new (E?Uint8Array:Array)(19);for(y=P=0;y<Pa;y++)L[P++]=ga[y];for(y=0;y<Qa;y++)L[P++]=ha[y];if(!E){y=0;for(ia=Q.length;y<ia;++y)Q[y]=0}y=I=0;for(ia=L.length;y<ia;y+=P){for(P=1;y+P<ia&&L[y+P]===L[y];++P);A=P;if(0===L[y])if(3>A)for(;0<
A--;)K[I++]=0,Q[0]++;else for(;0<A;)G=138>A?A:138,G>A-3&&G<A&&(G=A-3),10>=G?(K[I++]=17,K[I++]=G-3,Q[17]++):(K[I++]=18,K[I++]=G-11,Q[18]++),A-=G;else if(K[I++]=L[y],Q[L[y]]++,A--,3>A)for(;0<A--;)K[I++]=L[y],Q[L[y]]++;else for(;0<A;)G=6>A?A:6,G>A-3&&G<A&&(G=A-3),K[I++]=16,K[I++]=G-3,Q[16]++,A-=G}d=E?K.subarray(0,I):K.slice(0,I);pa=va(Q,7);for(F=0;19>F;F++)xa[F]=pa[pb[F]];for(aa=19;4<aa&&0===xa[aa-1];aa--);Na=wa(pa);D.d(O-257,5,v);D.d($-1,5,v);D.d(aa-4,4,v);for(F=0;F<aa;F++)D.d(xa[F],3,v);F=0;for(Oa=
d.length;F<Oa;F++)if(ba=d[F],D.d(Na[ba],pa[ba],v),16<=ba){F++;switch(ba){case 16:qa=2;break;case 17:qa=3;break;case 18:qa=7;break;default:q("invalid code: "+ba)}D.d(d[F],qa,v)}var Ra=[La,ga],Sa=[Ma,ha],R,Ta,ja,Aa,Ua,Va,Wa,Xa;Ua=Ra[0];Va=Ra[1];Wa=Sa[0];Xa=Sa[1];R=0;for(Ta=z.length;R<Ta;++R)if(ja=z[R],D.d(Ua[ja],Va[ja],v),256<ja)D.d(z[++R],z[++R],v),Aa=z[++R],D.d(Wa[Aa],Xa[Aa],v),D.d(z[++R],z[++R],v);else if(256===ja)break;this.a=D.finish();this.b=this.a.length;break;default:q("invalid compression type")}return this.a};
function ya(d,a){this.length=d;this.P=a}
var za=function(){function d(a){switch(v){case 3===a:return[257,a-3,0];case 4===a:return[258,a-4,0];case 5===a:return[259,a-5,0];case 6===a:return[260,a-6,0];case 7===a:return[261,a-7,0];case 8===a:return[262,a-8,0];case 9===a:return[263,a-9,0];case 10===a:return[264,a-10,0];case 12>=a:return[265,a-11,1];case 14>=a:return[266,a-13,1];case 16>=a:return[267,a-15,1];case 18>=a:return[268,a-17,1];case 22>=a:return[269,a-19,2];case 26>=a:return[270,a-23,2];case 30>=a:return[271,a-27,2];case 34>=a:return[272,
a-31,2];case 42>=a:return[273,a-35,3];case 50>=a:return[274,a-43,3];case 58>=a:return[275,a-51,3];case 66>=a:return[276,a-59,3];case 82>=a:return[277,a-67,4];case 98>=a:return[278,a-83,4];case 114>=a:return[279,a-99,4];case 130>=a:return[280,a-115,4];case 162>=a:return[281,a-131,5];case 194>=a:return[282,a-163,5];case 226>=a:return[283,a-195,5];case 257>=a:return[284,a-227,5];case 258===a:return[285,a-258,0];default:q("invalid length: "+a)}}var a=[],c,b;for(c=3;258>=c;c++)b=d(c),a[c]=b[2]<<24|b[1]<<
16|b[0];return a}(),Ba=E?new Uint32Array(za):za;
function ua(d,a){function c(a,c){var b=a.P,d=[],e=0,f;f=Ba[a.length];d[e++]=f&65535;d[e++]=f>>16&255;d[e++]=f>>24;var g;switch(v){case 1===b:g=[0,b-1,0];break;case 2===b:g=[1,b-2,0];break;case 3===b:g=[2,b-3,0];break;case 4===b:g=[3,b-4,0];break;case 6>=b:g=[4,b-5,1];break;case 8>=b:g=[5,b-7,1];break;case 12>=b:g=[6,b-9,2];break;case 16>=b:g=[7,b-13,2];break;case 24>=b:g=[8,b-17,3];break;case 32>=b:g=[9,b-25,3];break;case 48>=b:g=[10,b-33,4];break;case 64>=b:g=[11,b-49,4];break;case 96>=b:g=[12,b-
65,5];break;case 128>=b:g=[13,b-97,5];break;case 192>=b:g=[14,b-129,6];break;case 256>=b:g=[15,b-193,6];break;case 384>=b:g=[16,b-257,7];break;case 512>=b:g=[17,b-385,7];break;case 768>=b:g=[18,b-513,8];break;case 1024>=b:g=[19,b-769,8];break;case 1536>=b:g=[20,b-1025,9];break;case 2048>=b:g=[21,b-1537,9];break;case 3072>=b:g=[22,b-2049,10];break;case 4096>=b:g=[23,b-3073,10];break;case 6144>=b:g=[24,b-4097,11];break;case 8192>=b:g=[25,b-6145,11];break;case 12288>=b:g=[26,b-8193,12];break;case 16384>=
b:g=[27,b-12289,12];break;case 24576>=b:g=[28,b-16385,13];break;case 32768>=b:g=[29,b-24577,13];break;default:q("invalid distance")}f=g;d[e++]=f[0];d[e++]=f[1];d[e++]=f[2];var h,k;h=0;for(k=d.length;h<k;++h)l[n++]=d[h];u[d[0]]++;w[d[3]]++;s=a.length+c-1;p=null}var b,e,f,g,k,h={},m,r,p,l=E?new Uint16Array(2*a.length):[],n=0,s=0,u=new (E?Uint32Array:Array)(286),w=new (E?Uint32Array:Array)(30),C=d.I,x;if(!E){for(f=0;285>=f;)u[f++]=0;for(f=0;29>=f;)w[f++]=0}u[256]=1;b=0;for(e=a.length;b<e;++b){f=k=0;
for(g=3;f<g&&b+f!==e;++f)k=k<<8|a[b+f];h[k]===t&&(h[k]=[]);m=h[k];if(!(0<s--)){for(;0<m.length&&32768<b-m[0];)m.shift();if(b+3>=e){p&&c(p,-1);f=0;for(g=e-b;f<g;++f)x=a[b+f],l[n++]=x,++u[x];break}0<m.length?(r=Ca(a,b,m),p?p.length<r.length?(x=a[b-1],l[n++]=x,++u[x],c(r,0)):c(p,-1):r.length<C?p=r:c(r,0)):p?c(p,-1):(x=a[b],l[n++]=x,++u[x])}m.push(b)}l[n++]=256;u[256]++;d.V=u;d.U=w;return E?l.subarray(0,n):l}
function Ca(d,a,c){var b,e,f=0,g,k,h,m,r=d.length;k=0;m=c.length;a:for(;k<m;k++){b=c[m-k-1];g=3;if(3<f){for(h=f;3<h;h--)if(d[b+h-1]!==d[a+h-1])continue a;g=f}for(;258>g&&a+g<r&&d[b+g]===d[a+g];)++g;g>f&&(e=b,f=g);if(258===g)break}return new ya(f,a-e)}
function va(d,a){var c=d.length,b=new na(572),e=new (E?Uint8Array:Array)(c),f,g,k,h,m;if(!E)for(h=0;h<c;h++)e[h]=0;for(h=0;h<c;++h)0<d[h]&&b.push(h,d[h]);f=Array(b.length/2);g=new (E?Uint32Array:Array)(b.length/2);if(1===f.length)return e[b.pop().index]=1,e;h=0;for(m=b.length/2;h<m;++h)f[h]=b.pop(),g[h]=f[h].value;k=Da(g,g.length,a);h=0;for(m=f.length;h<m;++h)e[f[h].index]=k[h];return e}
function Da(d,a,c){function b(c){var d=h[c][m[c]];d===a?(b(c+1),b(c+1)):--g[d];++m[c]}var e=new (E?Uint16Array:Array)(c),f=new (E?Uint8Array:Array)(c),g=new (E?Uint8Array:Array)(a),k=Array(c),h=Array(c),m=Array(c),r=(1<<c)-a,p=1<<c-1,l,n,s,u,w;e[c-1]=a;for(n=0;n<c;++n)r<p?f[n]=0:(f[n]=1,r-=p),r<<=1,e[c-2-n]=(e[c-1-n]/2|0)+a;e[0]=f[0];k[0]=Array(e[0]);h[0]=Array(e[0]);for(n=1;n<c;++n)e[n]>2*e[n-1]+f[n]&&(e[n]=2*e[n-1]+f[n]),k[n]=Array(e[n]),h[n]=Array(e[n]);for(l=0;l<a;++l)g[l]=c;for(s=0;s<e[c-1];++s)k[c-
1][s]=d[s],h[c-1][s]=s;for(l=0;l<c;++l)m[l]=0;1===f[c-1]&&(--g[0],++m[c-1]);for(n=c-2;0<=n;--n){u=l=0;w=m[n+1];for(s=0;s<e[n];s++)u=k[n+1][w]+k[n+1][w+1],u>d[l]?(k[n][s]=u,h[n][s]=a,w+=2):(k[n][s]=d[l],h[n][s]=l,++l);m[n]=0;1===f[n]&&b(n)}return g}
function wa(d){var a=new (E?Uint16Array:Array)(d.length),c=[],b=[],e=0,f,g,k,h;f=0;for(g=d.length;f<g;f++)c[d[f]]=(c[d[f]]|0)+1;f=1;for(g=16;f<=g;f++)b[f]=e,e+=c[f]|0,e<<=1;f=0;for(g=d.length;f<g;f++){e=b[d[f]];b[d[f]]+=1;k=a[f]=0;for(h=d[f];k<h;k++)a[f]=a[f]<<1|e&1,e>>>=1}return a};function Ea(d,a){this.input=d;this.b=this.c=0;this.i={};a&&(a.flags&&(this.i=a.flags),"string"===typeof a.filename&&(this.filename=a.filename),"string"===typeof a.comment&&(this.A=a.comment),a.deflateOptions&&(this.l=a.deflateOptions));this.l||(this.l={})}
Ea.prototype.g=function(){var d,a,c,b,e,f,g,k,h=new (E?Uint8Array:Array)(32768),m=0,r=this.input,p=this.c,l=this.filename,n=this.A;h[m++]=31;h[m++]=139;h[m++]=8;d=0;this.i.fname&&(d|=Fa);this.i.fcomment&&(d|=Ga);this.i.fhcrc&&(d|=Ha);h[m++]=d;a=(Date.now?Date.now():+new Date)/1E3|0;h[m++]=a&255;h[m++]=a>>>8&255;h[m++]=a>>>16&255;h[m++]=a>>>24&255;h[m++]=0;h[m++]=Ia;if(this.i.fname!==t){g=0;for(k=l.length;g<k;++g)f=l.charCodeAt(g),255<f&&(h[m++]=f>>>8&255),h[m++]=f&255;h[m++]=0}if(this.i.comment){g=
0;for(k=n.length;g<k;++g)f=n.charCodeAt(g),255<f&&(h[m++]=f>>>8&255),h[m++]=f&255;h[m++]=0}this.i.fhcrc&&(c=la(h,0,m)&65535,h[m++]=c&255,h[m++]=c>>>8&255);this.l.outputBuffer=h;this.l.outputIndex=m;e=new oa(r,this.l);h=e.g();m=e.b;E&&(m+8>h.buffer.byteLength?(this.a=new Uint8Array(m+8),this.a.set(new Uint8Array(h.buffer)),h=this.a):h=new Uint8Array(h.buffer));b=la(r,t,t);h[m++]=b&255;h[m++]=b>>>8&255;h[m++]=b>>>16&255;h[m++]=b>>>24&255;k=r.length;h[m++]=k&255;h[m++]=k>>>8&255;h[m++]=k>>>16&255;h[m++]=
k>>>24&255;this.c=p;E&&m<h.length&&(this.a=h=h.subarray(0,m));return h};var Ia=255,Ha=2,Fa=8,Ga=16;function W(d,a){this.p=[];this.q=32768;this.e=this.j=this.c=this.u=0;this.input=E?new Uint8Array(d):d;this.w=!1;this.r=Ja;this.L=!1;if(a||!(a={}))a.index&&(this.c=a.index),a.bufferSize&&(this.q=a.bufferSize),a.bufferType&&(this.r=a.bufferType),a.resize&&(this.L=a.resize);switch(this.r){case Ka:this.b=32768;this.a=new (E?Uint8Array:Array)(32768+this.q+258);break;case Ja:this.b=0;this.a=new (E?Uint8Array:Array)(this.q);this.f=this.T;this.B=this.Q;this.s=this.S;break;default:q(Error("invalid inflate mode"))}}
var Ka=0,Ja=1,Ya={N:Ka,M:Ja};
W.prototype.h=function(){for(;!this.w;){var d=X(this,3);d&1&&(this.w=v);d>>>=1;switch(d){case 0:var a=this.input,c=this.c,b=this.a,e=this.b,f=a.length,g=t,k=t,h=b.length,m=t;this.e=this.j=0;c+1>=f&&q(Error("invalid uncompressed block header: LEN"));g=a[c++]|a[c++]<<8;c+1>=f&&q(Error("invalid uncompressed block header: NLEN"));k=a[c++]|a[c++]<<8;g===~k&&q(Error("invalid uncompressed block header: length verify"));c+g>a.length&&q(Error("input buffer is broken"));switch(this.r){case Ka:for(;e+g>b.length;){m=
h-e;g-=m;if(E)b.set(a.subarray(c,c+m),e),e+=m,c+=m;else for(;m--;)b[e++]=a[c++];this.b=e;b=this.f();e=this.b}break;case Ja:for(;e+g>b.length;)b=this.f({F:2});break;default:q(Error("invalid inflate mode"))}if(E)b.set(a.subarray(c,c+g),e),e+=g,c+=g;else for(;g--;)b[e++]=a[c++];this.c=c;this.b=e;this.a=b;break;case 1:this.s(Za,$a);break;case 2:for(var r=X(this,5)+257,p=X(this,5)+1,l=X(this,4)+4,n=new (E?Uint8Array:Array)(ab.length),s=t,u=t,w=t,C=t,x=t,D=t,N=t,z=t,O=t,z=0;z<l;++z)n[ab[z]]=X(this,3);if(!E){z=
l;for(l=n.length;z<l;++z)n[ab[z]]=0}s=U(n);C=new (E?Uint8Array:Array)(r+p);z=0;for(O=r+p;z<O;)switch(x=bb(this,s),x){case 16:for(N=3+X(this,2);N--;)C[z++]=D;break;case 17:for(N=3+X(this,3);N--;)C[z++]=0;D=0;break;case 18:for(N=11+X(this,7);N--;)C[z++]=0;D=0;break;default:D=C[z++]=x}u=E?U(C.subarray(0,r)):U(C.slice(0,r));w=E?U(C.subarray(r)):U(C.slice(r));this.s(u,w);break;default:q(Error("unknown BTYPE: "+d))}}return this.B()};
var cb=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],ab=E?new Uint16Array(cb):cb,db=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,258,258],eb=E?new Uint16Array(db):db,fb=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0],gb=E?new Uint8Array(fb):fb,hb=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],ib=E?new Uint16Array(hb):hb,jb=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,
10,11,11,12,12,13,13],kb=E?new Uint8Array(jb):jb,lb=new (E?Uint8Array:Array)(288),Y,mb;Y=0;for(mb=lb.length;Y<mb;++Y)lb[Y]=143>=Y?8:255>=Y?9:279>=Y?7:8;var Za=U(lb),nb=new (E?Uint8Array:Array)(30),ob,qb;ob=0;for(qb=nb.length;ob<qb;++ob)nb[ob]=5;var $a=U(nb);function X(d,a){for(var c=d.j,b=d.e,e=d.input,f=d.c,g=e.length,k;b<a;)f>=g&&q(Error("input buffer is broken")),c|=e[f++]<<b,b+=8;k=c&(1<<a)-1;d.j=c>>>a;d.e=b-a;d.c=f;return k}
function bb(d,a){for(var c=d.j,b=d.e,e=d.input,f=d.c,g=e.length,k=a[0],h=a[1],m,r;b<h&&!(f>=g);)c|=e[f++]<<b,b+=8;m=k[c&(1<<h)-1];r=m>>>16;r>b&&q(Error("invalid code length: "+r));d.j=c>>r;d.e=b-r;d.c=f;return m&65535}
W.prototype.s=function(d,a){var c=this.a,b=this.b;this.C=d;for(var e=c.length-258,f,g,k,h;256!==(f=bb(this,d));)if(256>f)b>=e&&(this.b=b,c=this.f(),b=this.b),c[b++]=f;else{g=f-257;h=eb[g];0<gb[g]&&(h+=X(this,gb[g]));f=bb(this,a);k=ib[f];0<kb[f]&&(k+=X(this,kb[f]));b>=e&&(this.b=b,c=this.f(),b=this.b);for(;h--;)c[b]=c[b++-k]}for(;8<=this.e;)this.e-=8,this.c--;this.b=b};
W.prototype.S=function(d,a){var c=this.a,b=this.b;this.C=d;for(var e=c.length,f,g,k,h;256!==(f=bb(this,d));)if(256>f)b>=e&&(c=this.f(),e=c.length),c[b++]=f;else{g=f-257;h=eb[g];0<gb[g]&&(h+=X(this,gb[g]));f=bb(this,a);k=ib[f];0<kb[f]&&(k+=X(this,kb[f]));b+h>e&&(c=this.f(),e=c.length);for(;h--;)c[b]=c[b++-k]}for(;8<=this.e;)this.e-=8,this.c--;this.b=b};
W.prototype.f=function(){var d=new (E?Uint8Array:Array)(this.b-32768),a=this.b-32768,c,b,e=this.a;if(E)d.set(e.subarray(32768,d.length));else{c=0;for(b=d.length;c<b;++c)d[c]=e[c+32768]}this.p.push(d);this.u+=d.length;if(E)e.set(e.subarray(a,a+32768));else for(c=0;32768>c;++c)e[c]=e[a+c];this.b=32768;return e};
W.prototype.T=function(d){var a,c=this.input.length/this.c+1|0,b,e,f,g=this.input,k=this.a;d&&("number"===typeof d.F&&(c=d.F),"number"===typeof d.O&&(c+=d.O));2>c?(b=(g.length-this.c)/this.C[2],f=258*(b/2)|0,e=f<k.length?k.length+f:k.length<<1):e=k.length*c;E?(a=new Uint8Array(e),a.set(k)):a=k;return this.a=a};
W.prototype.B=function(){var d=0,a=this.a,c=this.p,b,e=new (E?Uint8Array:Array)(this.u+(this.b-32768)),f,g,k,h;if(0===c.length)return E?this.a.subarray(32768,this.b):this.a.slice(32768,this.b);f=0;for(g=c.length;f<g;++f){b=c[f];k=0;for(h=b.length;k<h;++k)e[d++]=b[k]}f=32768;for(g=this.b;f<g;++f)e[d++]=a[f];this.p=[];return this.buffer=e};
W.prototype.Q=function(){var d,a=this.b;E?this.L?(d=new Uint8Array(a),d.set(this.a.subarray(0,a))):d=this.a.subarray(0,a):(this.a.length>a&&(this.a.length=a),d=this.a);return this.buffer=d};function rb(d){this.input=d;this.c=0;this.t=[];this.D=!1}rb.prototype.W=function(){this.D||this.h();return this.t.slice()};
rb.prototype.h=function(){for(var d=this.input.length;this.c<d;){var a=new T,c=t,b=t,e=t,f=t,g=t,k=t,h=t,m=t,r=t,p=this.input,l=this.c;a.G=p[l++];a.H=p[l++];(31!==a.G||139!==a.H)&&q(Error("invalid file signature:"+a.G+","+a.H));a.z=p[l++];switch(a.z){case 8:break;default:q(Error("unknown compression method: "+a.z))}a.n=p[l++];m=p[l++]|p[l++]<<8|p[l++]<<16|p[l++]<<24;a.Y=new Date(1E3*m);a.ea=p[l++];a.da=p[l++];0<(a.n&4)&&(a.$=p[l++]|p[l++]<<8,l+=a.$);if(0<(a.n&Fa)){h=[];for(k=0;0<(g=p[l++]);)h[k++]=
String.fromCharCode(g);a.name=h.join("")}if(0<(a.n&Ga)){h=[];for(k=0;0<(g=p[l++]);)h[k++]=String.fromCharCode(g);a.A=h.join("")}0<(a.n&Ha)&&(a.R=la(p,0,l)&65535,a.R!==(p[l++]|p[l++]<<8)&&q(Error("invalid header crc16")));c=p[p.length-4]|p[p.length-3]<<8|p[p.length-2]<<16|p[p.length-1]<<24;p.length-l-4-4<512*c&&(f=c);b=new W(p,{index:l,bufferSize:f});a.data=e=b.h();l=b.c;a.ba=r=(p[l++]|p[l++]<<8|p[l++]<<16|p[l++]<<24)>>>0;la(e,t,t)!==r&&q(Error("invalid CRC-32 checksum: 0x"+la(e,t,t).toString(16)+
" / 0x"+r.toString(16)));a.ca=c=(p[l++]|p[l++]<<8|p[l++]<<16|p[l++]<<24)>>>0;(e.length&4294967295)!==c&&q(Error("invalid input size: "+(e.length&4294967295)+" / "+c));this.t.push(a);this.c=l}this.D=v;var n=this.t,s,u,w=0,C=0,x;s=0;for(u=n.length;s<u;++s)C+=n[s].data.length;if(E){x=new Uint8Array(C);for(s=0;s<u;++s)x.set(n[s].data,w),w+=n[s].data.length}else{x=[];for(s=0;s<u;++s)x[s]=n[s].data;x=Array.prototype.concat.apply([],x)}return x};function sb(d){if("string"===typeof d){var a=d.split(""),c,b;c=0;for(b=a.length;c<b;c++)a[c]=(a[c].charCodeAt(0)&255)>>>0;d=a}for(var e=1,f=0,g=d.length,k,h=0;0<g;){k=1024<g?1024:g;g-=k;do e+=d[h++],f+=e;while(--k);e%=65521;f%=65521}return(f<<16|e)>>>0};function tb(d,a){var c,b;this.input=d;this.c=0;if(a||!(a={}))a.index&&(this.c=a.index),a.verify&&(this.Z=a.verify);c=d[this.c++];b=d[this.c++];switch(c&15){case ub:this.method=ub;break;default:q(Error("unsupported compression method"))}0!==((c<<8)+b)%31&&q(Error("invalid fcheck flag:"+((c<<8)+b)%31));b&32&&q(Error("fdict flag is not supported"));this.K=new W(d,{index:this.c,bufferSize:a.bufferSize,bufferType:a.bufferType,resize:a.resize})}
tb.prototype.h=function(){var d=this.input,a,c;a=this.K.h();this.c=this.K.c;this.Z&&(c=(d[this.c++]<<24|d[this.c++]<<16|d[this.c++]<<8|d[this.c++])>>>0,c!==sb(a)&&q(Error("invalid adler-32 checksum")));return a};var ub=8;function vb(d,a){this.input=d;this.a=new (E?Uint8Array:Array)(32768);this.k=Z.o;var c={},b;if((a||!(a={}))&&"number"===typeof a.compressionType)this.k=a.compressionType;for(b in a)c[b]=a[b];c.outputBuffer=this.a;this.J=new oa(this.input,c)}var Z=sa;
vb.prototype.g=function(){var d,a,c,b,e,f,g,k=0;g=this.a;d=ub;switch(d){case ub:a=Math.LOG2E*Math.log(32768)-8;break;default:q(Error("invalid compression method"))}c=a<<4|d;g[k++]=c;switch(d){case ub:switch(this.k){case Z.NONE:e=0;break;case Z.v:e=1;break;case Z.o:e=2;break;default:q(Error("unsupported compression type"))}break;default:q(Error("invalid compression method"))}b=e<<6|0;g[k++]=b|31-(256*c+b)%31;f=sb(this.input);this.J.b=k;g=this.J.g();k=g.length;E&&(g=new Uint8Array(g.buffer),g.length<=
k+4&&(this.a=new Uint8Array(g.length+4),this.a.set(g),g=this.a),g=g.subarray(0,k+4));g[k++]=f>>24&255;g[k++]=f>>16&255;g[k++]=f>>8&255;g[k++]=f&255;return g};function wb(d,a){var c,b,e,f;if(Object.keys)c=Object.keys(a);else for(b in c=[],e=0,a)c[e++]=b;e=0;for(f=c.length;e<f;++e)b=c[e],B(d+"."+b,a[b])};B("Zlib.Inflate",tb);B("Zlib.Inflate.prototype.decompress",tb.prototype.h);wb("Zlib.Inflate.BufferType",{ADAPTIVE:Ya.M,BLOCK:Ya.N});B("Zlib.Deflate",vb);B("Zlib.Deflate.compress",function(d,a){return(new vb(d,a)).g()});B("Zlib.Deflate.prototype.compress",vb.prototype.g);wb("Zlib.Deflate.CompressionType",{NONE:Z.NONE,FIXED:Z.v,DYNAMIC:Z.o});B("Zlib.Gzip",Ea);B("Zlib.Gzip.prototype.compress",Ea.prototype.g);B("Zlib.Gunzip",rb);B("Zlib.Gunzip.prototype.decompress",rb.prototype.h);B("Zlib.Gunzip.prototype.getMembers",rb.prototype.W);B("Zlib.GunzipMember",T);B("Zlib.GunzipMember.prototype.getName",T.prototype.getName);B("Zlib.GunzipMember.prototype.getData",T.prototype.getData);B("Zlib.GunzipMember.prototype.getMtime",T.prototype.X);}).call(this);

var geomByte="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";
var teapotByte="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";
