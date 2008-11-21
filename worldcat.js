
//  =============================================================================================================
// ||	To include this passthrough script in your catalog, Edit the WWWOPTIONS entry for the button directly 	||
// ||   to the left of the spot where you want the passthrough link to appear.					||
// ||  														||
// ||	Example: (This will be all on one line, do not create any line breaks.)					||
// ||	---------------------------------------------------------------------------------------------		||
// ||	BUT_ANOTHER=/screens/another.gif" alt="Another Search" border="0" /></a>				||
// ||	<script language="JavaScript" src="http://allianceharvest.uoregon.edu/pt/worldcat.js"></script> 	||
// ||	<a href="#"><img src="/screens/spacer.gif								||
// ||	---------------------------------------------------------------------------------------------		||
// ||														||
// ||	This writes the III image for the corresponding function and adds the script while using a blank 	||
// ||	image to close the system generated html coding correctly.  (Most III systems have this blank spacer 	||
// ||	image.  If you do not have a blank image on your system, you are welcome to grab a copy of ours from 	||
// ||	"http://griffin.wsu.edu/screens/spacer.gif"  The script will write the "Summit" image from your system	||
// || 	as the link to the passthrough function directly to the right of the "overloaded" image.		||
//  =============================================================================================================

//   ------------------------------------------------------------
//  |             -- THINGS LEFT TO DO --	                 |
//  |                                                            |
//  |   Add Number Searches to readit function for browse list - | --- DONE
//  |   Add Number Searches to string args for No Hits	-------	 | --- DONE
//  |   Individual Record for # Search does not pass   --------  | --- DONE
//  |	Advance Search Parsing   ------------------------------  | --- DONE (? requires more testing - boolean added )
//  |   Language Limits  --------------------------------------- | --- DONE
//  |	Year Limits	 --------------------------------------- | --- DONE
//  |   Combine Limits   --------------------------------------- | --- DONE
//  |   Scopes		 -------- Are these necessary? --------- |
//  |	Limits from SS & AS	-------------------------------- | --- DONE
//  |   Truncate for WC Limit at last white space -------------- | --- DONE
//  |   Intercept Staff Logins more reliably  ------------------ | --- DONE (Requires setting ID for button in WWWOPTIONS)
//  |	Intercept Non-applicable Searches  --------------------- | --- (Ignoring for now.  If there is no WC equiv...)
//  |   Handle Diacritics -------------------------------------- | --- DONE (? requires more testing)
//  |   Pass search correctly if only one record matches ------- | --- DONE
//  |   Button Images for untested libraries   ----------------- | --- Think this is done
//  |   Material Types for untested libraries  ----------------- | --- Think this is done
//  |	Better Comments		                                 |
//  |   Clean up code						 |
//  |   Worldcat does not seem to allow multiple limits.	 |	 
//  |    (Anyone have an idea how to handle this?)		 |	
//   ------------------------------------------------------------

//   ------------------------------------------------------------
//  |                      -- NOTES --	                         |
//  |								 |
//  |  Staff login detection relies on ID set for Public button  |
//  |  - BUT_PUBLIC=/screens/marc_display.gif" id="MARC -        |
//  |    (The III system will close the seemingly open tag.)	 ------------------------
//  |                                                            			 |
//  | Uses "custom_dialog.css" which must reside in the same directory as the script.    |
//  | Images (listed below) used by the CSS must also reside in the same directory       |
//  | dots.gif, dialog_body.gif, dialog_heading.gif, dialog_icon.gif, dialog_button.gif  |
//  |								 			 |
//   ------------------------------------------------------------------------------------

//---------------- Set WC URL & Read in location string from the OPAC ------------------------
var url = "http://summit.worldcat.org/search?q="
var str = location.href;
var wclimit="";
var wclang="";
var sdate1="";
var sdate2="";
var wcdate="";
var LCnopass="";
var summitscope="&scope=0";  //--- Scope to Libraries Worldwide --
var IsStaff = document.getElementById('STAFF');  //--- Requires PUBLIC button have set ID --

//========================== Get Library's Button Image =======================================
var Summit_Img ="";
    if (str.indexOf("griffin.wsu.edu") > -1) {
Summit_Img = "http://www.wsulibs.wsu.edu/Test/OrcaBTN2.gif"; }
    else if (str.indexOf("library.wou.edu") > -1) {
Summit_Img = "http://library.wou.edu/screens/orbiss.gif"; }
    else if (str.indexOf("libsys.ewu.edu") > -1) {
Summit_Img = "http://libsys.ewu.edu/screens/summit.gif"; }
    else if (str.indexOf("clark.up.edu") > -1) {
Summit_Img = "http://clark.up.edu/screens/searchsummit.gif"; }
    else if (str.indexOf("library.pcc.edu") > -1) {
Summit_Img = "http://library.pcc.edu/screens/images/buttons/summit.gif"; }
    else if (str.indexOf("oasis.library.oregonstate.edu") > -1) {
Summit_Img = "http://oasis.library.oregonstate.edu/screens/orbpass.png"; }
    else if (str.indexOf("oasis.orst.edu") > -1) {
Summit_Img = "http://oasis.orst.edu/screens/orbpass.png"; }
    else if (str.indexOf("oasis.oregonstate.edu") > -1) {
Summit_Img = "http://oasis.oregonstate.edu/screens/orbpass.png"; }
    else if (str.indexOf("janus.uoregon.edu") > -1) {
 Summit_Img = "http://janus.uoregon.edu/screens/summit.png"; }
    else if (str.indexOf("library.linfield.edu") > -1) {
 Summit_Img = "http://library.linfield.edu/screens/summit.gif"; }
    else if (str.indexOf("lrc-srv.mhcc.edu") > -1) {
 Summit_Img = "http://lrc-srv.mhcc.edu/screens/but_summit.gif"; }
    else if (str.indexOf("library.cwu.edu") > -1) {
 Summit_Img = "http://library.cwu.edu/screens/summitsearch.gif"; }
    else if (str.indexOf("catalog.ccrls.org") > -1) {
 Summit_Img = "http://catalog.ccrls.org/screens/summitbutton.gif"; }
    else if (str.indexOf("oswald.clark.edu") > -1) {
 Summit_Img = "http://oswald.clark.edu/screens/summit.gif"; }
    else if (str.indexOf("eos.eou.edu") > -1) {
 Summit_Img = "http://eos.eou.edu/screens/images/graysummit.gif"; }
    else if (str.indexOf("catalog.georgefox.edu") > -1) {
 Summit_Img = "http://catalog.georgefox.edu/screens/summit.gif"; }
    else if (str.indexOf("library.lanecc.edu") > -1) {
 Summit_Img = "http://library.lanecc.edu/screens/images/buttons/summit5.gif"; }
    else if (str.indexOf("libcat.lclark.edu") > -1) {
 Summit_Img = "http://libcat.lclark.edu/screens/orbis1.gif"; }
    else if (str.indexOf("shoen.iii.com") > -1) {
 Summit_Img = "http://shoen.iii.com/screens/orbis1.gif"; }
    else if (str.indexOf("catalogs.ohsu.edu") > -1) {
 Summit_Img = "http://catalogs.ohsu.edu/screens/orbis.gif"; }
    else if ((str.indexOf("140.211.132.11") > -1) ||  (str.indexOf("hedgehog.oit.edu")) > -1) {
 Summit_Img = "http://140.211.132.11/screens/orbis2.gif"; }
    else if (str.indexOf("abigail.lib.pacificu.edu") > -1) {
 Summit_Img = "http://abigail.lib.pacificu.edu/screens/summit.gif"; }
    else if (str.indexOf("vikat.pdx.edu") > -1) {
 Summit_Img = "http://vikat.pdx.edu/screens/orbislook.gif"; }
    else if (str.indexOf("library-catalog.reed.edu") > -1) {
 Summit_Img = "http://library-catalog.reed.edu/screens/searchsum.gif"; }
    else if (str.indexOf("cals.evergreen.edu") > -1) {
 Summit_Img = "http://cals.evergreen.edu/screens/repinsum.gif"; }
    else if (str.indexOf("deborah.spu.edu") > -1) {
 Summit_Img = "http://deborah.spu.edu/screens/search_summit.gif"; }
//--    else if (str.indexOf("library.seattleu.edu") > -1) {		--- Need to work this out.
//-- Summit_Img = "http://library.seattleu.edu/screens/search_summit.gif"; }
    else if (str.indexOf("lib.sou.edu") > -1) {
 Summit_Img = "http://lib.sou.edu/screens/searchsummit.jpg"; }
    else if (str.indexOf("simon.ups.edu") > -1) {
 Summit_Img = "http://simon.ups.edu/screens/summit.gif"; }
    else if (str.indexOf("catalog.lib.washington.edu") > -1) {
 Summit_Img = "http://catalog.lib.washington.edu/screens/repincas.gif"; }
    else if (str.indexOf("lis.wwu.edu") > -1) {
 Summit_Img = "http://lis.wwu.edu/screens/summit_1.gif"; }
    else if (str.indexOf("library.whitman.edu") > -1) {
 Summit_Img = "http://library.whitman.edu/screens/orbpass.gif"; }
    else if (str.indexOf("marian.law.washington.edu") > -1) {
 Summit_Img = "http://marian.law.washington.edu/screens/summit.gif"; }
    else if (str.indexOf("library.willamette.edu") > -1) {
 Summit_Img = "http://library.willamette.edu/screens/orbis2.gif"; }
    else if (str.indexOf("catalog.willamette.edu") > -1) {
 Summit_Img = "http://catalog.willamette.edu/screens/orbis2.gif"; }
else {
Summit_Img = "http://griffin.wsu.edu/screens/OrcaBTN.gif"; }

//========================== transmogrify Function ==================================================================

function transmogrify(arg) 
 	{
	  arg = arg.replace(/\) and /ig,"\) ");  // --- boolean and
	  arg = arg.replace(/\) or /ig,"\) OR ");  // --- boolean or
	  arg = arg.replace(/\) not /ig,"\) - ");  // --- boolean not
	  arg = arg.replace(/a:/g,"au:");  // --- author 
	  arg = arg.replace(/d:/g,"su:");  // --- subject
	  arg = arg.replace(/t:/g,"ti:");  // --- title
	  arg = arg.replace(/N:/g,"kw:");  // No WC equivalent, so we will try as keyword search
	//  arg = arg.replace(/^\(/g,"");  // --- take out all parens?
	  arg = arg.replace(/([()])+/g,"$1");  // --- take out groups of parens and put just one back in
	  arg = arg.replace(/ (\()/g," kw:$1");  // --- keyword searches
          return (arg);
	}

//========================== Bib Record Function ====================================================================
function BibRecord2()  {	//----------- If we are in a bib.record details page -------------------------

	//----------- check to see if the user is logged in as staff ------------------------------
	//----------- Lots of NEAT STUFF we could do here !! --------------------------------------
	//----------- for now we will just change their view so WC search works accordingly -------

		if (IsStaff) 
			{
//=========== Create a Modal Dialog giving the user a choice to send search terms or record title value =============
//----------- Uses "custom_dialog.css" which must reside in the same directory as the script. ---------------
//----------- Images (listed below) used by the CSS must also reside in the same directory  -----------------
//----------- dots.gif, dialog_body.gif, dialog_heading.gif, dialog_icon.gif, dialog_button.gif -------------

	var v_css  = document.createElement('link');
	v_css.rel = 'stylesheet'
	v_css.type = 'text/css';
	v_css.href = "http://www.wsulibs.wsu.edu/test/custom_dialog.css";
	document.getElementsByTagName('head')[0].appendChild(v_css);

function getEventTarget(event)
{
  var targetElement = null;

  if (typeof event.target != "undefined")
  {
    targetElement = event.target;
  }
  else
  {
    targetElement = event.srcElement;
  }

  while (targetElement.nodeType == 3 && targetElement.parentNode != null)
  {
    targetElement = targetElement.parentNode;
  }
  return targetElement;
}

function closeDialog(dialog)
{
  var dropSheet = document.getElementById("dropSheet");

  dropSheet.parentNode.removeChild(dropSheet);
  dialog.parentNode.removeChild(dialog);

  return true;
}

function dialogClick(event)
{
  if (typeof event == "undefined")
  {
    event = window.event;
  }

  var target = getEventTarget(event);

  while (target.nodeName.toLowerCase() != "input")
  {
    target = target.parentNode;
  }

   value = target.getAttribute("value");

  if (value == "Cancel")
  {
    var dialog = target;

    while (dialog.className != "customDialog")
    {
      dialog = dialog.parentNode;
    }
	SendMe =  value;
    closeDialog(dialog);
  }
  else 
  {
     SendMe =  value;
  }
 if (SendMe == "Find Record") {
			alert('Switching to public view in order to get your record. \n Click the "Search Summit" button on the next screen.');
                          var pubstr = location.href;
                              pubstr = pubstr.replace("frameset&FF","public&FF");
                                   location.href=pubstr;
  }
else if (SendMe == "Send Search") {
	location.href= (url2go2)
  }
}


function attachEventListener(target, eventType, functionRef, capture)
{
  if (typeof target.addEventListener != "undefined")
  {
    target.addEventListener(eventType, functionRef, capture);
  }
  else if (typeof target.attachEvent != "undefined")
  {
    target.attachEvent("on" + eventType, functionRef);
  }
  else
  {
    eventType = "on" + eventType;

    if (typeof target[eventType] == "function")
    {
      var oldListener = target[eventType];

      target[eventType] = function()
      {
        oldListener();

        return functionRef();
      }
    }
    else
    {
      target[eventType] = functionRef;
    }
  }
  return true;
}

function addLoadListener(fn)
{
  if (typeof window.addEventListener != 'undefined')
  {
    window.addEventListener('load', fn, false);
  }
  else if (typeof document.addEventListener != 'undefined')
  {
    document.addEventListener('load', fn, false);
  }
  else if (typeof window.attachEvent != 'undefined')
  {
    window.attachEvent('onload', fn);
  }
  else
  {
    var oldfn = window.onload;
    if (typeof window.onload != 'function')
    {
      window.onload = fn;
    }
    else
    {
      window.onload = function()
      {
        oldfn();
        fn();
      };
    }
  }
}

function getPageDimensions()
{
  var body = document.getElementsByTagName("body")[0];
  var bodyOffsetWidth = 0;
  var bodyOffsetHeight = 0;
  var bodyScrollWidth = 0;
  var bodyScrollHeight = 0;
  var pageDimensions = [0, 0];

  if (typeof document.documentElement != "undefined" &&
      typeof document.documentElement.scrollWidth != "undefined")
  {
    pageDimensions[0] = document.documentElement.scrollWidth;
    pageDimensions[1] = document.documentElement.scrollHeight;
  }

  bodyOffsetWidth = body.offsetWidth;
  bodyOffsetHeight = body.offsetHeight;
  bodyScrollWidth = body.scrollWidth;
  bodyScrollHeight = body.scrollHeight;

  if (bodyOffsetWidth > pageDimensions[0])
  {
    pageDimensions[0] = bodyOffsetWidth;
  }

  if (bodyOffsetHeight > pageDimensions[1])
  {
    pageDimensions[1] = bodyOffsetHeight;
  }

  if (bodyScrollWidth > pageDimensions[0])
  {
    pageDimensions[0] = bodyScrollWidth;
  }

  if (bodyScrollHeight > pageDimensions[1])
  {
    pageDimensions[1] = bodyScrollHeight;
  }
  return pageDimensions;
}

function getScrollingPosition()
{
  var position = [0, 0];

  if (typeof window.pageYOffset != 'undefined')
  {
    position = [
        window.pageXOffset,
        window.pageYOffset
    ];
  }

  else if (typeof document.documentElement.scrollTop != 'undefined'
      && document.documentElement.scrollTop > 0)
  {
    position = [
        document.documentElement.scrollLeft,
        document.documentElement.scrollTop
    ];
  }

  else if (typeof document.body.scrollTop != 'undefined')
  {
    position = [
        document.body.scrollLeft,
        document.body.scrollTop
    ];
  }
  return position;
}

function getViewportSize()
{
  var size = [0,0];

  if (typeof window.innerWidth != 'undefined')
  {
    size = [
        window.innerWidth,
        window.innerHeight
    ];
  }
  else if (typeof document.documentElement != 'undefined'
      && typeof document.documentElement.clientWidth != 'undefined'
      && document.documentElement.clientWidth != 0)
  {
    size = [
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
    ];
  }
  else
  {
    size = [
        document.getElementsByTagName('body')[0].clientWidth,
        document.getElementsByTagName('body')[0].clientHeight
    ];
  }
  return size;
}

function createDialog()
{
  var body = document.getElementsByTagName("body")[0];
  var pageDimensions = getPageDimensions();
  var viewportSize = getViewportSize();

  if (viewportSize[1] > pageDimensions[1])
  {
    pageDimensions[1] = viewportSize[1];
  }

  var dropSheet = document.createElement("div");

  dropSheet.setAttribute("id", "dropSheet");
  dropSheet.style.position = "absolute";
  dropSheet.style.left = "0";
  dropSheet.style.top = "0";
  dropSheet.style.width = pageDimensions[0] + "px";
  dropSheet.style.height = pageDimensions[1] + "px";
  body.appendChild(dropSheet);

  try
  {
    var dialog = document.createElement("div");
    dialog.className = "customDialog";
    dialog.style.visibility = "hidden";
    dialog.style.position = "absolute";

    var dialogTitle = document.createElement("h1");
    dialogTitle.appendChild(document.createTextNode("Change Search Mode"));
    dialog.appendChild(dialogTitle);

    var dialogMessage = document.createElement("p");
    	dialogMessage.innerHTML = "<b>Do you want to send your Original Search to WorldCat or access just This Record?</b> <br>"
    dialog.appendChild(dialogMessage);

    var dialogButton1 = document.createElement("input");
    dialogButton1.setAttribute("type", "button");
    dialogButton1.setAttribute("value", "Send Search");
    attachEventListener(dialogButton1, "click", dialogClick, false);
    dialog.appendChild(dialogButton1);

    var dialogButton2 = document.createElement("input");
    dialogButton2.setAttribute("type", "button");
    dialogButton2.setAttribute("value", "Find Record");
    attachEventListener(dialogButton2, "click", dialogClick, false);
    dialog.appendChild(dialogButton2);

    var dialogButton3 = document.createElement("input");
    dialogButton3.setAttribute("type", "button");
    dialogButton3.setAttribute("value", "Cancel");
    attachEventListener(dialogButton3, "click", dialogClick, false);
    dialog.appendChild(dialogButton3);

    body.appendChild(dialog);

    var scrollingPosition = getScrollingPosition();

    dialog.style.left = scrollingPosition[0] + parseInt(viewportSize[0] / 2) - parseInt(dialog.offsetWidth / 2) + "px";
    dialog.style.top = scrollingPosition[1] + parseInt(viewportSize[1] / 2) - parseInt(dialog.offsetHeight / 2) + "px";
    dialog.style.visibility = "visible";

    dialogButton1.focus();
  }
  catch(error)
  {
    dropSheet.parentNode.removeChild(dropSheet);

    return true;
  }
    return false;
}

function initDialog()
{
 createDialog();

//  var launchit = document.getElementById("SummitBtn");
//  launchit.onclick = createDialog;

  return true;
}

addLoadListener(initDialog);

initDialog();

//========================================== END MODAL DIALOG ===========================================================

			}
                  else  {
		var tr = document.getElementsByTagName('TR');	    // we have to iterate through every TR 
    			for(i = 0; i < tr.length; i++) {	    // for every TR in the document
      			var x=tr[i].getElementsByTagName('TD');	    // get all of the Columns
      		if (x.length == 2 && (x[0].innerHTML.toLowerCase() == "title" || x[0].innerHTML.toLowerCase() == "title:")) {   // if the row has 2 columns and the 1st one has the text Title
		var myNextcel = x[1];
        	title = x[1].innerHTML.replace(/(<([^>]+)>)/ig,""); // strip out all of the HTML 
	      }
	    }
	//----------- check to see if ie || mozilla href text element exists first -----------------

		if (myNextcel.firstChild.nodeName == "A" || (myNextcel.firstChild.nodeName == "#text" && myNextcel.firstChild.nextSibling.nodeName == "A"))
			{
	//----------- if href text element exists get the next line second td contents -------------

			var tr = document.getElementsByTagName('TR');
    				for(i = 0; i < tr.length; i++) {	    
      				var x=tr[i].getElementsByTagName('TD');   
      			if (x.length == 2 &&  x[0].innerHTML == "" && x[1].innerHTML.toLowerCase().indexOf("href=") == -1 && x[1].innerHTML.toLowerCase().indexOf("<strong>") > -1 ) {
        	title = x[1].innerHTML.replace(/(<([^>]+)>)/ig,"");
	      }
	    }
			}
	// -------- Replace diacritics in title with normalized characters ------

function replace(string,title,by) {     
    var strLength = string.length, txtLength = title.length;
    if ((strLength == 0) || (txtLength == 0)) return string;
    var i = string.indexOf(title);
    if ((!i) && (title != string.substring(0,txtLength))) return string;
    if (i == -1) return string;
    var newstr = string.substring(0,i) + by;
    if (i+txtLength < strLength)
        newstr += replace(string.substring(i+txtLength,strLength),title,by);
    return newstr;
}
    title = replace(title,unescape('%C0'),'A');
    title = replace(title,unescape('%C1'),'A');
    title = replace(title,unescape('%C2'),'A');
    title = replace(title,unescape('%C3'),'A');
    title = replace(title,unescape('%C4'),'A');
    title = replace(title,unescape('%C5'),'A');
    title = replace(title,unescape('%C6'),'AE');
    title = replace(title,unescape('%C7'),'C');
    title = replace(title,unescape('%C8'),'E');
    title = replace(title,unescape('%C9'),'E');
    title = replace(title,unescape('%CA'),'E');
    title = replace(title,unescape('%CB'),'E');
    title = replace(title,unescape('%CC'),'I');
    title = replace(title,unescape('%CD'),'I');
    title = replace(title,unescape('%CE'),'I');
    title = replace(title,unescape('%CF'),'I');
    title = replace(title,unescape('%D0'),'D');
    title = replace(title,unescape('%D1'),'N');
    title = replace(title,unescape('%D2'),'O');
    title = replace(title,unescape('%D3'),'O');
    title = replace(title,unescape('%D4'),'O');
    title = replace(title,unescape('%D5'),'O');
    title = replace(title,unescape('%D6'),'O');
    title = replace(title,unescape('%D7'),'O');
    title = replace(title,unescape('%D8'),'O');
    title = replace(title,unescape('%D9'),'U');
    title = replace(title,unescape('%DA'),'U');
    title = replace(title,unescape('%DB'),'U');
    title = replace(title,unescape('%DC'),'U');
    title = replace(title,unescape('%DD'),'Y');
    title = replace(title,unescape('%DE'),'P');
    title = replace(title,unescape('%DF'),'B');
    title = replace(title,unescape('%E0'),'a');
    title = replace(title,unescape('%E1'),'a');
    title = replace(title,unescape('%E2'),'a');
    title = replace(title,unescape('%E3'),'a');
    title = replace(title,unescape('%E4'),'a');
    title = replace(title,unescape('%E5'),'a');
    title = replace(title,unescape('%E6'),'ae');
    title = replace(title,unescape('%E7'),'c');
    title = replace(title,unescape('%E8'),'e');
    title = replace(title,unescape('%E9'),'e');
    title = replace(title,unescape('%EA'),'e');
    title = replace(title,unescape('%EB'),'e');
    title = replace(title,unescape('%EC'),'i');
    title = replace(title,unescape('%ED'),'i');
    title = replace(title,unescape('%EE'),'i');
    title = replace(title,unescape('%EF'),'i');
    title = replace(title,unescape('%F0'),'&');
    title = replace(title,unescape('%F1'),'n');
    title = replace(title,unescape('%F2'),'o');
    title = replace(title,unescape('%F3'),'o');
    title = replace(title,unescape('%F4'),'o');
    title = replace(title,unescape('%F5'),'o');
    title = replace(title,unescape('%F6'),'o');
    title = replace(title,unescape('%F7'),'o');
    title = replace(title,unescape('%F8'),'o');
    title = replace(title,unescape('%F9'),'u');
    title = replace(title,unescape('%FA'),'u');
    title = replace(title,unescape('%FB'),'u');
    title = replace(title,unescape('%FC'),'u');
    title = replace(title,unescape('%FD'),'y');
    title = replace(title,unescape('%FE'),'p');
    title = replace(title,unescape('%FF'),'y');

            	if (title.length > 252) {  		 //--- Title is longer than WC will accept ---
		   title = (title.substr(0,252));  	 //---Truncate for WC Limit --
		   var wsloc = (title.lastIndexOf(" ")); //---Find Last White Space as WC chokes on incomplete words --
		   title = (title.substr(0,wsloc));  	 //---Truncate at last white space --
            	}
		location.href= (url + title + summitscope);
	}
    }
//========================== End Function ====================================================================

		//----- Read Value from Search String if Search Form unavailable (No Hits and/or un-named form element) ------

if (str.indexOf("search/") > -1)
  {
	var s1 = str.indexOf("SEARCH=");
	var s2 = str.indexOf("&searchscope=") ;       
	var sq = str.substring(s1,s2);
        var sqf = sq.replace("SEARCH=","");
        sqf = sqf.replace("&SORT=D","");
        sqf = sqf.replace("&SORT=","");
//	sqf = sqf.replace("+", " ");
           var s3 = str.indexOf("search/");
           var sqi = str.substring(s3,s1);
	   var sqindex = sqi.replace("?","");
	   sqindex = sqindex.replace("search/","");
		if (sqindex == "t") {
            		wcqindex="ti%3A"; }
	   	else if (sqindex == "a") {
           		wcqindex="au%3A"; }
	  	else if (sqindex == "d") {
           		wcqindex="su%3A"; }
	  	else if (sqindex == "s") {      //--- Series Title Index ---
           		wcqindex="ti%3A"; 
                	wclimit="&fq=dt%3Aser"; }
	  	else if (sqindex == "i") {
           		wcqindex= ( /^[\d]{4}-?[\dxX]{4}$/.test(sqf) ? "issn%3A" : "isbn%3A"); }
	   	else  {
                	wcqindex="";  }
  }
	else  {
	wcqindex="";  }

if (str.indexOf("searcharg=") > -1)
  {
	var s1 = str.indexOf("searcharg=");
	var s2 = str.indexOf("&searchscope=") ;       
	var sq = str.substring(s1,s2);
        var sqf = sq.replace("searcharg=","");
        sqf = sqf.replace("&SORT=D","");
        sqf = sqf.replace("&SORT=","");
//	sqf = sqf.replace("+", " ");
           var s3 = str.indexOf("searchtype=");
           var sqi = str.substring(s3,s1);
	   var sqindex = sqi.replace("searchtype=","");
	   sqindex = sqindex.replace("&","");
		if (sqindex == "t") {
            		wcqindex="ti%3A"; }
	   	else if (sqindex == "a") {
           		wcqindex="au%3A"; }
	  	else if (sqindex == "d") {
           		wcqindex="su%3A"; }
	  	else if (sqindex == "s") {      //--- Series Title Index ---
           		wcqindex="ti%3A"; 
                	wclimit="&fq=dt%3Aser"; }
	  	else if (sqindex == "i") {
           		wcqindex= ( /^[\d]{4}-?[\dxX]{4}$/.test(sqf) ? "issn%3A" : "isbn%3A"); }
	   	else  {
                	wcqindex="";  }
  }
	else  {
	wcqindex="";  }

     if (/^[adtN]%3A/.test(sqf) || / [adtN]%3A/.test(sqf) || /\) and \(/.test(sqf)) { //--- advanced keyword search limits selected ? ---
	sqf = transmogrify(sqf);
     }

	//----------- Read Value from Search Form if available ---------------------------------

function readit2()  {	
//========================== Determine if we are in a bib record display =========================================
		var tr = document.getElementsByTagName('TR');	    // we have to iterate through every TR 
    			for(i = 0; i < tr.length; i++) {	    // for every TR in the document
      			var x=tr[i].getElementsByTagName('TD');	    // get all of the Columns
      		if ((x.length == 2 && x[1].getAttribute("class") == "bibInfoData") || (x.length == 2 && x[1].className.indexOf("bibInfoData") > -1))  {   // if the row has this class
		var bib = "Bib Record";				   		      // we are in a bib record
	      }
	    }
//========================== Find the form input fields if the form itself is not named ===========================

	//========================== Find search term if we are in a "No Hits" screen =============================
 			
			var sp = document.getElementsByTagName('span');	     
    			for(i = 0; i < sp.length; i++) {
      			if (((sp[i].getAttribute("class") == "errormessage") || (sp[i].className.indexOf("errormessage") > -1)) && (document.search)) {   
			var nohits = "No Hits";	
			var sfarg = document.search.searchText1.value			   		      
	      		  }
      			if (((sp[i].getAttribute("class") == "errormessage") || (sp[i].className.indexOf("errormessage") > -1)) && (!document.search)) { 
			var stxt = document.getElementsByName("SEARCH");
			var nohits = "No Hits";	
			var sfarg = stxt[0].value;			   		      
	      		  }			
			}
		
			var limit_ar = new Array();
			var fmlimits = document.getElementsByTagName('select');
			for (i=0; i<fmlimits.length; i++) {
				if (fmlimits[i].name == "searchtype") {  //--- Use named select to get index ---
				limit_ar.push(fmlimits[i]);
				var sfindex = limit_ar[0].value;  
 			  }
			}
		if (!sfarg) {
		var fmx = document.getElementsByName("searcharg");  //--- use named form field to get searcharg ---
                if (fmx[0]) {
		var fmxval = fmx[0].value; }
                else { 
		var fmxval = sqf; }
		}

    if ((document.searchtool) || (fmxval) || (sfarg))
    {
     if ((document.searchtool) && (!sfarg)) {
     var sfarg = document.searchtool.searcharg.value; }  //--- in case we didn't get searcharg above ---
	else {
          if (fmxval) { 
	  var sfarg = fmxval; }
		else { 
		sfarg = sfarg; }
}
     if (/^[adtN]:/.test(sfarg) || / [adtN]:/.test(sfarg) || /\) and \(/.test(sfarg)) { //--- advanced keyword search limits selected ? ---
	sfarg = transmogrify(sfarg);
     }

	if (!sfindex) {
           if (document.searchtool) {
     var sfindextmp = document.searchtool.searchtype.selectedIndex;   //--- In case we didn't get index above ---
     var sfindex = document.searchtool.searchtype.options[sfindextmp].value;
       }
	else { var sfindex = sqindex;
       }
     }

     var wcindex="";

	if (sfindex == "t") {
            	wcindex="ti%3A"; }
	   else if (sfindex == "a") {
           	wcindex="au%3A"; }
	   else if ((sfindex == "d") || (sfindex == "g"))  {
           	wcindex="su%3A"; }
	   else if (sfindex == "s") {      //--- Series Title Index ---
           	wcindex="ti%3A" 
                wclimit="&fq=dt%3Aser"; }
	   else if (sfindex == "i") {
           	wcindex= ( /^[\d]{4}-?[\dxX]{4}$/.test(sqf) ? "issn%3A" : "isbn%3A"); }
	   else if (sfindex == "c") {
           	LCnopass="nopass"; }
	   else  {
                wcindex="";  }

//===================== Check to see if limits have been applied ===================================
//===================== Get Limits from the searchtool div  ==================

var clsName = "bibSearchtoolMessage"
var clsName2 = "browseSearchtoolMessage"
var srchlimit = new Array();
    var elements = document.getElementsByTagName("div");
    for(i = 0; i < elements.length; i++){
 	if((elements[i].className == clsName) || (elements[i].className == clsName2))
            srchlimit.push(elements[i]);
    }
		if (srchlimit.length > 0) {
      var limitstr = (srchlimit[0].innerHTML);
          limitstr = limitstr.replace(/(<([^>]+)>)/ig,""); }
		else {
		var limitstr = "";
                }
	if (limitstr.indexOf("Limited to:") > -1 )
    	{
		var m0 = limitstr.toLowerCase().indexOf("material type ");
		var m0 = (m0 + 15);
		var m1 = (limitstr.substr(m0));
		var m2 = m1.indexOf("\"");
                limitstrm = (m1.substr(0,m2).toLowerCase());  //----- Material Type ----
//-----	Dates
		var d0 = limitstr.toLowerCase().indexOf("after ")
		var d0 = (d0 + 6);
		var d1 = (limitstr.substr(d0,4));
		d1 = d1.replace(/[^0-9]/g, '');		//------ 1st Date w/non-numeric removed ----
		var d20 = limitstr.indexOf("before ")
		var d20 = (d20 + 7);
		var d2 = (limitstr.substr(d20,4));
		d2 = d2.replace(/[^0-9]/g, '');		//------ 2nd Date w/non-numeric removed ----
//-----	Language
		if (limitstr.toLowerCase().indexOf("language ") > -1); {
		var la0 = limitstr.toLowerCase().indexOf("language ");
		var la0 = (la0 + 10);
		var la1 = (limitstr.substr(la0));
		var la2 = la1.indexOf("\"");
                var lang = (la1.substr(0,la2).toLowerCase());
		}
	}
		else {
		var limitstrm = "";
		var d1 = "";
		var d2 = "";
		var lang = "";
                }
	
		if ((limitstrm.indexOf("print mat") > -1 || (limitstrm.indexOf("books") > -1 || (limitstrm.indexOf("printed mat") > -1 || (limitstrm.indexOf("large print") > -1 || (limitstrm.indexOf("monograph") > -1))))) && (limitstrm.indexOf("ebooks") == -1 || (limitstrm.indexOf("books on") == -1))) {
		wclimit="&fq=dt%3Abks+%3E"; }
 		else if (limitstrm.indexOf("print music") > -1 || (limitstrm.indexOf("music scores") > -1 || (limitstrm.indexOf("printed music") > -1)))  {
		wclimit="&fq=dt%3Asco+%3E"; }
 		else if (limitstrm.indexOf("manuscript mus") > -1 || (limitstrm.indexOf("music, manus") > -1 || (limitstrm.indexOf("ms music") > -1 || (limitstrm.indexOf("printed music") > -1 || (limitstrm.indexOf("scores") > -1 || (limitstrm.indexOf("sheet music") > -1))))))  {
		wclimit="&fq=dt%3Asco+%3E"; }
 		else if (limitstrm.indexOf("map/gis") > -1 || (limitstrm.indexOf("maps") > -1 || (limitstrm.indexOf("map") > -1))) {
		wclimit="&fq=dt%3Amap+%3E"; }
 		else if (limitstrm.indexOf("dvd") > -1 || (limitstrm.indexOf("video") > -1 || (limitstrm.indexOf("motion") > -1 || (limitstrm.indexOf("vhs") > -1 || (limitstrm.indexOf("film") > -1 || (limitstrm.indexOf("proj") > -1 || (limitstrm.indexOf("visual") > -1)))))))  {
		wclimit="&fq=dt%3Avis+%3E"; }
 		else if (limitstrm.indexOf("nonmusic") > -1 || (limitstrm.indexOf("non music") > -1 || (limitstrm.indexOf("spoken") > -1 || (limitstrm.indexOf("audio recorded") > -1 || (limitstrm.indexOf("books on") > -1 || (limitstrm.indexOf("book on") > -1))))))   {
		wclimit="&fq=fm%3Ansr+%3E"; }
 		else if (limitstrm.indexOf("music") > -1 || (limitstrm.indexOf("music") > -1 || (limitstrm.indexOf("sound record") > -1 || (limitstrm.indexOf("cds") > -1)))) {
		wclimit="&fq=fm%3Amsr+%3E"; }
 		else if (limitstrm.indexOf("graphic") > -1 || (limitstrm.indexOf("chart") > -1 || (limitstrm.indexOf("poster") > -1 || (limitstrm.indexOf("object") > -1 || (limitstrm.indexOf("media various") > -1 || (limitstrm.indexOf("photo") > -1 || (limitstrm.indexOf("artifact") > -1 || (limitstrm.indexOf("realia") > -1)))))))) {
		wclimit="&fq=dt%3Avis+%3E"; }
 		else if (limitstrm.indexOf("computer") > -1 || (limitstrm.indexOf("software") > -1 || (limitstrm.indexOf("cd-rom") > -1 || (limitstrm.indexOf("digital") > -1)))) {
		wclimit="&fq=dt%3Acom+%3E"; }
 		else if (limitstrm.indexOf("mixed") > -1) {
		wclimit="&fq=dt%3Amix+%3E"; }
 		else if (limitstrm.indexOf("kit") > -1) {
		wclimit="&fq=dt%3Amix+%3E"; }
 		else if (limitstrm.indexOf("archive") > -1 || (limitstrm.indexOf("archival") > -1)) {
		wclimit="&fq=dt%3Amix+%3E"; }
 		else if (limitstrm.indexOf("ebooks") > -1 || (limitstrm.indexOf("internet") > -1 || (limitstrm.indexOf("web") > -1 || (limitstrm.indexOf("electronic") > -1 || (limitstrm.indexOf("e-books") > -1))))) {
		wclimit="&fq=dt%3Aurl+%3E"; }
 		else if (limitstrm.indexOf("serial") > -1 || (limitstrm.indexOf("journal") > -1 || (limitstrm.indexOf("periodical") > -1))) {
		wclimit="&fq=dt%3Aser+%3E"; }
 		else if (limitstrm.indexOf("theses") > -1 || (limitstrm.indexOf("thesis") > -1 || (limitstrm.indexOf("dissertation") > -1 || (limitstrm.indexOf("manuscripts") > -1)))) {
		wclimit="&fq=fm%3Adeg+%3E"; }
 		else if (limitstrm.indexOf("cassette") > -1 || (limitstrm.indexOf("tape") > -1)) {
		wclimit="&fq=fm%3Arec+%3E"; }
 		else if (limitstrm.indexOf("phonograph") > -1 || (limitstrm.indexOf("vinyl") > -1)) {
		wclimit="&fq=fm%3Alps+%3E"; }
 		else  {
                wclimit="";  }

		if (lang.indexOf("rabic") > -1) {
		    	wclang="&fq=ln%3Aara+%3E"; }
 		else if (lang.indexOf("hinese") > -1) {
		    	wclang="&fq=ln%3Achi+%3E"; }
 		else if (lang.indexOf("nglish") > -1) {
		    	wclang="&fq=ln%3Aeng+%3E"; }
 		else if (lang.indexOf("rench") > -1) {
		    	wclang="&fq=ln%3Afre+%3E"; }
 		else if (lang.indexOf("erman") > -1) {
		    	wclang="&fq=ln%3Ager+%3E"; }
 		else if (lang.indexOf("talian") > -1) {
		    	wclang="&fq=ln%3Ait+%3E"; }
 		else if (lang.indexOf("atin") > -1) {
		    	wclang="&fq=ln%3Alat+%3E"; }
 		else if (lang.indexOf("apanese") > -1) {
		    	wclang="&fq=ln%3Ajpn+%3E"; }
 		else if (lang.indexOf("ortuguese") > -1) {
		    	wclang="&fq=ln%3Apor+%3E"; }
 		else if (lang.indexOf("ussian") > -1) {
		    	wclang="&fq=ln%3Arus+%3E"; }
 		else if (lang.indexOf("panish") > -1) {
		    	wclang="&fq=ln%3Aspa+%3E"; }
 		else if (lang.indexOf("ebrew") > -1) {
		    	wclang="&fq=ln%3Aheb+%3E"; }
 		else if (lang.indexOf("innish") > -1) {
		    	wclang="&fq=ln%3Afin+%3E"; }
 		else if (lang.indexOf("czech") > -1) {
		    	wclang="&fq=ln%3Acze+%3E"; }
 		else if (lang.indexOf("greek") > -1) {
		    	wclang="&fq=ln%3Agre+%3E"; }
 		else if (lang.indexOf("danish") > -1) {
		    	wclang="&fq=ln%3Adan+%3E"; }
 		else if (lang.indexOf("dutch") > -1) {
		    	wclang="&fq=ln%3Adut+%3E"; }
 		else if (lang.indexOf("hungarian") > -1) {
		    	wclang="&fq=ln%3Ahun+%3E"; }
 		else if (lang.indexOf("polish") > -1) {
		    	wclang="&fq=ln%3Apol+%3E"; }
 		else if (lang.indexOf("korean") > -1) {
		    	wclang="&fq=ln%3Akor+%3E"; }
 		else if (lang.indexOf("swedish") > -1) {
		    	wclang="&fq=ln%3Aswe+%3E"; }
 		else if (lang.indexOf("hindi") > -1) {
		    	wclang="&fq=ln%3Ahin+%3E"; }
 		else if (lang.indexOf("indonesian") > -1) {
		    	wclang="&fq=ln%3Aind+%3E"; }
 		else if (lang.indexOf("turkish") > -1) {
		    	wclang="&fq=ln%3Atur+%3E"; }
 		else  {
                wclang="";  }
//================================= If Limits are applied ===================================================

   if ((d1) || (d2) || (wclimit) || (wclang) || ((str.indexOf("limit?") > -1 || str.indexOf("&m=") > -1 || str.indexOf("&l=") > -1 || str.indexOf("&Da=") > -1 || str.indexOf("&Db=") > -1) && (!(str.indexOf("frameset&FF=") > -1) && !(str.indexOf("public&FF=") > -1))))
    	{

	//------ If Material and Date Limits Only ------

if ((((d1) || (d2)) && (wclimit)) && (!wclang) || (((str.indexOf("&Da=") > -1 || str.indexOf("&Db=") > -1 || str.indexOf("&Ya=") > -1 || str.indexOf("&Yb=") > -1) && ((str.indexOf("&m=a") > -1 || (str.indexOf("?M=a") > -1))) && (!(str.indexOf("&l=") > -1) && !(str.indexOf("?L=") > -1) && !(str.indexOf("&L=") > -1)))))

                       {

	//--------- Dates ---------
                  if (((d1) || (d2)) || ((str.indexOf("&Da=") > -1 || (str.indexOf("&Db=") > -1 || (str.indexOf("&Ya=") > -1 || (str.indexOf("&Yb=") > -1)))))) 
		  {
                		if (!d1) {
				d1 = "1" }	//--- Supply after date for WC if user did not specify ---
                		if (!d2) {
				d2 = "2200" }	//--- Supply before date for WC if user did not specify ---
			if (str.indexOf("&Da=") > -1) {  
				var sdate1=str.indexOf("&Da="); }
		        if (str.indexOf("&Ya=") > -1) {  
				var sdate1=str.indexOf("&Ya="); }
			if (str.indexOf("&Db=") > -1) {  
				   var sdate2=str.indexOf("&Db="); }
			if (str.indexOf("&Yb=") > -1) {  
				   var sdate2=str.indexOf("&Yb="); }

					if (str.indexOf("&Da=") > -1 || (str.indexOf("&Ya=") > -1)) {
			     			sdate1=(str.substr(sdate1,8)); 
			     			sdate1=sdate1.replace("&Da=","");
			     			sdate1=sdate1.replace("&Ya=",""); }
	   		    		else  {
                	    		sdate1=d1;
					}
					if (str.indexOf("&Db=") > -1 || (str.indexOf("&Yb=") > -1)) {
			       			sdate2=(str.substr(sdate2,8));
			       			sdate2=sdate2.replace("&Db=","");
			       			sdate2=sdate2.replace("&Yb=",""); }
	   		    		else  {
                	    		sdate2=d2;
					}

				if ((sdate1 !="") && (sdate2 == "" || sdate2 == "&NAM")) {
				    wcdate=("+yr%3A" + sdate1 + "..+%3E");
				}
				if ((sdate2 !="") && (sdate1 == "" || sdate1 == "&Yb=" || sdate2 !="&NAM")) {
				    wcdate=("+yr%3A" + ".." + sdate2 + "+%3E");
				}
				if (sdate1 !="" && sdate2 !="" && sdate2 != "&NAM" && sdate1 != "&Yb=") {
				    wcdate=("+yr%3A" + sdate1 + ".." + sdate2 + "+%3E");
				}
		  }
          	  else  {
                     wcdate="";  }
				url2go2 = (url + wcindex + sfarg + wclimit + wcdate + summitscope);
        if ((bib) || (IsStaff))
    		{
		BibRecord2();
           }
        else if (LCnopass) {
             alert("Worldcat does not support LC or local number searching.  Try another type of search");
               }
   else    {
  	                    location.href= (url + wcindex + sfarg + wclimit + wcdate + summitscope);
   		      } 
		}
                else  {   
//======================== If Multiple Limits ====================================

  		   if ( ( ((wclimit) && (wclang)) || (((d1) || (d2)) && (wclang)) ) || (((str.indexOf("&m=") > -1 || str.indexOf("?M=") > -1) && ((str.indexOf("&l=") > -1 || str.indexOf("?L=") > -1 || str.indexOf("&L=") > -1))) || ((str.indexOf("&l=") > -1 || str.indexOf("?L=") > -1) || str.indexOf("&L=") > -1 && ((str.indexOf("&Da=") > -1 || str.indexOf("&Db=") > -1 || str.indexOf("&Ya=") > -1 || str.indexOf("&Yb=") > -1)))))
                       {

	//--------- Material Type ---------

        		wclimit=wclimit.replace("&fq=", "+");  

	//--------- Languages ---------
    		            if (str.indexOf("&l=ara") > -1 || (str.indexOf("?L=ara") > -1 || (str.indexOf("&L=ara") > -1))) {
          		    	wclang="&fq=ln%3Aara+%3E"; }
	   		    else if (str.indexOf("&l=chi") > -1 || (str.indexOf("?L=chi") > -1 || (str.indexOf("&L=chi") > -1))) {
          		    	wclang="&fq=ln%3Achi+%3E"; }
	   		    else if (str.indexOf("&l=cze") > -1 || (str.indexOf("?L=cze") > -1 || (str.indexOf("&L=cze") > -1))) {
          		    	wclang="&fq=dt%3Arec+%3E"; }
	   		    else if (str.indexOf("&l=eng") > -1 || (str.indexOf("?L=eng") > -1 || (str.indexOf("&L=eng") > -1))) {
          		    	wclang="&fq=ln%3Aeng+%3E"; }
	   		    else if (str.indexOf("&l=fre") > -1 || (str.indexOf("?L=fre") > -1 || (str.indexOf("&L=fre") > -1))) {
          		    	wclang="&fq=ln%3Afre+%3E"; }
	   		    else if (str.indexOf("&l=ger") > -1 || (str.indexOf("?L=ger") > -1 || (str.indexOf("&L=ger") > -1))) {
          		    	wclang="&fq=ln%3Ager+%3E"; }
	   		    else if (str.indexOf("&l=ita") > -1 || (str.indexOf("?L=ita") > -1 || (str.indexOf("&L=ita") > -1))) {
          		    	wclang="&fq=ln%3Ait+%3E"; }
	   		    else if (str.indexOf("&l=lat") > -1 || (str.indexOf("?L=lat") > -1 || (str.indexOf("&L=lat") > -1))) {
          		    	wclang="&fq=ln%3Alat+%3E"; }
	   		    else if (str.indexOf("&l=jpn") > -1 || (str.indexOf("?L=jpn") > -1 || (str.indexOf("&L=jpn") > -1))) {
          		    	wclang="&fq=ln%3Ajpn+%3E"; }
	   		    else if (str.indexOf("&l=por") > -1 || (str.indexOf("?L=por") > -1 || (str.indexOf("&L=por") > -1))) {
          		    	wclang="&fq=ln%3Apor+%3E"; }
	   		    else if (str.indexOf("&l=rus") > -1 || (str.indexOf("?L=rus") > -1 || (str.indexOf("&L=rus") > -1))) {
          		    	wclang="&fq=ln%3Arus+%3E"; }
	   		    else if (str.indexOf("&l=spa") > -1 || (str.indexOf("?L=spa") > -1 || (str.indexOf("&L=spa") > -1))) {
          		        wclang="&fq=ln%3Aspa+%3E"; } 
	   		    else if (str.indexOf("&l=fin") > -1 || (str.indexOf("?L=fin") > -1 || (str.indexOf("&L=fin") > -1))) {
          		    	wclang="&fq=ln%3Afin+%3E"; }
	   		    else if (str.indexOf("&l=heb") > -1 || (str.indexOf("?L=heb") > -1 || (str.indexOf("&L=heb") > -1))) {
          		    	wclang="&fq=ln%3Aheb+%3E"; }
	   		    else  {
                	    	wclang=wclang;  }

	//--------- Dates ---------
                  if (((d1) || (d2)) || (str.indexOf("&Da=") > -1 || (str.indexOf("&Db=") > -1 || (str.indexOf("&Ya=") > -1 || (str.indexOf("&Yb=") > -1))))) 
		  {
                		if (!d1) {
				d1 = "1" }	//--- Supply after date for WC if user did not specify ---
                		if (!d2) {
				d2 = "2200" }	//--- Supply before date for WC if user did not specify ---
			if (str.indexOf("&Da=") > -1) {  
				var sdate1=str.indexOf("&Da="); }
		        if (str.indexOf("&Ya=") > -1) {  
				var sdate1=str.indexOf("&Ya="); }
			if (str.indexOf("&Db=") > -1) {  
				   var sdate2=str.indexOf("&Db="); }
			if (str.indexOf("&Yb=") > -1) {  
				   var sdate2=str.indexOf("&Yb="); }

					if (str.indexOf("&Da=") > -1 || (str.indexOf("&Ya=") > -1)) {
			     			sdate1=(str.substr(sdate1,8)); 
			     			sdate1=sdate1.replace("&Da=","");
			     			sdate1=sdate1.replace("&Ya=",""); }
	   		    		else  {
                	    		sdate1=d1;
					}
					if (str.indexOf("&Db=") > -1 || (str.indexOf("&Yb=") > -1)) {
			       			sdate2=(str.substr(sdate2,8));
			       			sdate2=sdate2.replace("&Db=","");
			       			sdate2=sdate2.replace("&Yb=",""); }
	   		    		else  {
                	    		sdate2=d2;
					}

				if ((sdate1 !="") && (sdate2 == "" || sdate2 == "&NAM")) {
				    wcdate=("+yr%3A" + sdate1 + "..+%3E");
				}
				if ((sdate2 !="") && (sdate1 == "" || sdate1 == "&Yb=" || sdate2 !="&NAM")) {
				    wcdate=("+yr%3A" + ".." + sdate2 + "+%3E");
				}
				if (sdate1 !="" && sdate2 !="" && sdate2 != "&NAM" && sdate1 != "&Yb=") {
				    wcdate=("+yr%3A" + sdate1 + ".." + sdate2 + "+%3E");
				}
		  	}
          	  	else  {
                     		wcdate="";  }
				url2go2 = (url + wcindex + sfarg + wclang + wclimit + wcdate + summitscope);
        if ((bib) || (IsStaff))
    		{
		BibRecord2();
           }
        else if (LCnopass) {
             alert("Worldcat does not support LC or local number searching.  Try another type of search");
               }
   else    {
  	                    location.href= (url + wcindex + sfarg + wclang + wclimit + wcdate + summitscope);
                     }
		}
                else  {            
//========================== Individual Limits ======================================
         
	//------ If Dates Only ------
 
                  if ((d1) || (d2) || (str.indexOf("&Da=") > -1 || (str.indexOf("&Db=") > -1 || (str.indexOf("?Ya=") > -1 || (str.indexOf("&Yb=") > -1))))) 
		  {
                		if (!d1) {
				d1 = "1" }	//--- Supply after date for WC if user did not specify ---
                		if (!d2) {
				d2 = "2200" }	//--- Supply before date for WC if user did not specify ---
			if (str.indexOf("&Da=") > -1) {  
				var sdate1=str.indexOf("&Da="); }
		        if (str.indexOf("?Ya=") > -1) {  
				var sdate1=str.indexOf("?Ya="); }
			if (str.indexOf("&Db=") > -1) {  
				   var sdate2=str.indexOf("&Db="); }
			if (str.indexOf("&Yb=") > -1) {  
				   var sdate2=str.indexOf("&Yb="); }

					if (str.indexOf("&Da=") > -1 || (str.indexOf("?Ya=") > -1)) {
			     			sdate1=(str.substr(sdate1,8)); 
			     			sdate1=sdate1.replace("&Da=","");
			     			sdate1=sdate1.replace("?Ya=",""); }
	   		    		else  {
                	    		sdate1=d1;
					}
					if (str.indexOf("&Db=") > -1 || (str.indexOf("&Yb=") > -1)) {
			       			sdate2=(str.substr(sdate2,8));
			       			sdate2=sdate2.replace("&Db=","");
			       			sdate2=sdate2.replace("&Yb=",""); }
	   		    		else  {
                	    		sdate2=d2;
					}

				if ((sdate1 !="") && (sdate2 == "" || sdate2 == "&NAM")) {
				    wcdate=("&fq=yr%3A" + sdate1 + "..+%3E");
				}
				if ((sdate2 !="") && (sdate1 == "" || sdate1 == "&Yb=" || sdate2 !="&NAM")) {
				    wcdate=("&fq=yr%3A" + ".." + sdate2 + "+%3E");
				}
				if (sdate1 !="" && sdate2 !="" && sdate2 != "&NAM" && sdate1 != "&Yb=") {
				    wcdate=("&fq=yr%3A" + sdate1 + ".." + sdate2 + "+%3E");
				}
		  }
          	  else  {
                     wcdate="";  }
			url2go2 = (url + wcindex + sfarg + wclang + wclimit + wcdate + summitscope);
        if ((bib) || (IsStaff))
    		{
		BibRecord2();
           }
        else if (LCnopass) {
             alert("Worldcat does not support LC or local number searching.  Try another type of search")
               }
   else    {
  	                    location.href= (url + wcindex + sfarg + wclang + wclimit + wcdate + summitscope);
                         }
   		      } 
   		   }
		}
                else  {            
                
	//----------- check to see if we are in a bib.record details page -------------------------
			url2go2 = (url + wcindex + sfarg + wclimit + summitscope);
        if ((bib) || (IsStaff)) 
    		{
		  BibRecord2();
                   }
        else if (LCnopass) {
             alert("Worldcat does not support LC or local number searching.  Try another type of search");
               }
                else  { 
        		location.href= (url + wcindex + sfarg + wclimit + summitscope);
               }
             }
           }
   else    {

	//----------- check to see if we are in a bib.record details page -------------------------
	//----------- if there is no Search Form available in a record details page ---------------  

        if ((bib) || (IsStaff)) 
    		{
		BibRecord2();
           }
        else if (LCnopass) {
             alert("Worldcat does not support LC or local number searching.  Try another type of search");
               }
   else    {
               location.href= (url + wcqindex + sqf + wclimit + summitscope);  
    }  
  }
}
	if (str.indexOf("library.seattleu.edu") > -1) {		//-- Seattle U does not use an image.
		document.write ("<a href='javascript:readit2();'><span class='summitButton'>Repeat Search in Summit<img src='http://www.seattleu.edu/lemlib/resources/images/summit-favicon.gif' alt=''></a>") }
    else  {		
document.write ("<a href='javascript:readit2();'><img src='" + Summit_Img + "' border=0 id=SummitBtn></a>");
}