function acelet(syntax, fontSize, theme, softTabs, tabSize, wrapText, indentGuides, showInvisibles)  {
  function encodeString(string) {
    return encodeURIComponent(string
           .replace(/\\/g,"\\\\")
           .replace(/\"/g, '\\"')
           .replace(/\n\r?/g, '\\n')
           .replace(/%/g, 'U0025')
           .replace(/</g, '\\<')
           .replace(/>/g, '\\>')
           .replace(/script/ig, 'scr\"\+\"ipt')
    );
  }
  var aceletValue = encodeString(window.getSelection().toString());
  return '
    data:text/html;charset=utf-8,
    <title>Acelet</title>
    <link rel="shortcut icon" href="http://tsi.github.com/acelet/favicon.ico"/>
    <style>
      body {margin: 0; background: #000;}
      #editor {font-size: ' + fontSize + '; width: 100%; height: 90%; height: -webkit-calc(100% - 40px); height: -moz-calc(100% - 40px); height: calc(100% - 40px); border: none; outline: none}
      button, #footer, #mode, .mode {border: none; background: none; padding: 0 10px; margin: 0; color: #ccc; font: 13px/20px Arial, sans-serif; text-align: center;}
      button:hover {cursor: pointer; color: #fff;}
      span.mode {float: right;}
      a, a:visited {text-decoration: none; color: crimson;}
      select {cursor: pointer;}
      option {color: black;}
    </style>
    <button onClick="saveToFile()">Save as...</button>
    <span class="mode">Syntax: <select id="mode" onchange="changeMode(this)" size="1"><option value="abap">ABAP</option><option value="asciidoc">AsciiDoc</option><option value="c9search">C9Search</option><option value="coffee">CoffeeScript</option><option value="coldfusion">ColdFusion</option><option value="csharp">C#</option><option value="css">CSS</option><option value="curly">Curly</option><option value="dart">Dart</option><option value="diff">Diff</option><option value="dot">Dot</option><option value="glsl">Glsl</option><option value="golang">Go</option><option value="groovy">Groovy</option><option value="haxe">haXe</option><option value="haml">HAML</option><option value="html">HTML</option><option value="c_cpp">C/C++</option><option value="clojure">Clojure</option><option value="jade">Jade</option><option value="java">Java</option><option value="jsp">JSP</option><option value="javascript">JavaScript</option><option value="json">JSON</option><option value="jsx">JSX</option><option value="latex">LaTeX</option><option value="less">LESS</option><option value="lisp">Lisp</option><option value="liquid">Liquid</option><option value="lua">Lua</option><option value="luapage">LuaPage</option><option value="lucene">Lucene</option><option value="makefile">Makefile</option><option value="markdown">Markdown</option><option value="objectivec">Objective-C</option><option value="ocaml">OCaml</option><option value="perl">Perl</option><option value="pgsql">pgSQL</option><option value="php">PHP</option><option value="powershell">Powershell</option><option value="python">Python</option><option value="r">R</option><option value="rdoc">RDoc</option><option value="rhtml">RHTML</option><option value="ruby">Ruby</option><option value="scad">OpenSCAD</option><option value="scala">Scala</option><option value="scss">SCSS</option><option value="sh">SH</option><option value="sql">SQL</option><option value="stylus">Stylus</option><option value="svg">SVG</option><option value="tcl">Tcl</option><option value="tex">Tex</option><option value="text">Text</option><option value="textile">Textile</option><option value="typescript">Typescript</option><option value="vbscript">VBScript</option><option value="xml">XML</option><option value="xquery">XQuery</option><option value="yaml">YAML</option></select></span>
    <div id="editor"></div>
    <div id="footer"><a href="http://tsi.github.com/acelet/">Acelet</a> - Powered by <a href="http://ace.ajax.org" taget="_blank">Ace</a></div>
    <script src="http://ajaxorg.github.com/ace/build/src/ace.js" type="text/javascript" charset="utf-8"></script>
    <script>
      var e = ace.edit("editor");
      e.setShowInvisibles(' + showInvisibles + ');
      e.setTheme("' + theme + '");
      e.getSession().setMode("ace/mode/" + "' + syntax + '");
      document.getElementById("mode").value = "' + syntax + '";
      e.getSession().setUseWrapMode(' + wrapText + ');
      e.getSession().setUseSoftTabs(' + softTabs + ');
      e.getSession().setTabSize(' + tabSize + ');
      e.setValue(decodeString("' + aceletValue + '"), -1);
      e.focus();
      function decodeString(string) {
        return decodeURIComponent(string)
               .replace(/%C2%A0/ig, "\\%20")
               .replace(/U0025/ig, "\%");
      }
      function saveToFile() {
        window.onbeforeunload = null;
        window.location = "data:application/octet-stream," + escape(e.getSession().getValue());
      }
      function changeMode(mode) {
        e.getSession().setMode("ace/mode/" + mode.options[mode.selectedIndex].value);
      }
      window.onbeforeunload = function(e) {
        e = e || window.event;
        if (e) {
          e.returnValue = "Did you save?";
        }
        return "Did you save?";
      };

      /*
      inspired by the discussion on https://coderwall.com/p/lhsrcq
      Written by Tsachi Shlidor (@shlidor)
      BSD Licenced

      Possible improvements:
      * Improve encoding/decoding
      * New
      * Load
      * Save (not save as)
      * Live HTML preview - https://coderwall.com/p/lhsrcq#comment_3609
      * Files sidebar (drag&drop)
      */

    </script>
  ';
}
